import { NextResponse } from 'next/server';

const CALENDLY_API_BASE = 'https://api.calendly.com';

export async function POST(request: Request) {
  try {
    const { eventTypeUri, startTime, inviteeInfo } = await request.json();
    
    const apiKey = process.env.CALENDLY_API_KEY;
    
    if (!apiKey) {
      console.error('❌ Calendly API key not configured');
      return NextResponse.json(
        { error: 'Calendly API key not configured' },
        { status: 500 }
      );
    }

    console.log('📅 Booking Calendly appointment:', {
      eventTypeUri,
      startTime,
      inviteeName: inviteeInfo.name,
      inviteeEmail: inviteeInfo.email
    });

    // If eventTypeUri is a booking page path (d/xxx/yyy), we need to get the full Event Type URI
    let fullEventTypeUri = eventTypeUri;
    
    if (!eventTypeUri.startsWith('https://api.calendly.com/event_types/')) {
      console.log('🔍 Event URI is booking page path, looking up full URI...');
      
      // Get user info first
      const userResponse = await fetch(`${CALENDLY_API_BASE}/users/me`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Calendly user API error:', userResponse.status, errorData);
        return NextResponse.json(
          { error: 'Failed to fetch Calendly user', details: errorData },
          { status: userResponse.status }
        );
      }

      const userData = await userResponse.json();
      const userUri = userData.resource.uri;
      
      // Fetch event types
      const eventTypesResponse = await fetch(`${CALENDLY_API_BASE}/event_types?user=${userUri}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!eventTypesResponse.ok) {
        const errorData = await eventTypesResponse.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Calendly event types API error:', eventTypesResponse.status, errorData);
        return NextResponse.json(
          { error: 'Failed to fetch event types', details: errorData },
          { status: eventTypesResponse.status }
        );
      }

      const eventTypesData = await eventTypesResponse.json();
      
      // Find matching event type
      const bookingUrl = `https://calendly.com/${eventTypeUri}`;
      const matchingEventType = eventTypesData.collection.find((et: any) => 
        et.scheduling_url === bookingUrl || 
        et.scheduling_url.includes(eventTypeUri) ||
        et.slug === eventTypeUri.split('/').pop()
      );

      if (!matchingEventType) {
        console.error('❌ No matching event type found for:', eventTypeUri);
        return NextResponse.json(
          { error: 'Event type not found', availableEventTypes: eventTypesData.collection.map((et: any) => et.scheduling_url) },
          { status: 404 }
        );
      }

      fullEventTypeUri = matchingEventType.uri;
      console.log('✅ Found full event type URI:', fullEventTypeUri);
    }

    // Create a scheduling link with pre-filled data
    const response = await fetch(`${CALENDLY_API_BASE}/scheduling_links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        max_event_count: 1,
        owner: fullEventTypeUri,
        owner_type: 'EventType'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ Calendly booking error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to create Calendly booking link', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    console.log('✅ Calendly scheduling link created:', data.resource.booking_url);

    // Build URL with pre-filled parameters
    const bookingUrl = new URL(data.resource.booking_url);
    bookingUrl.searchParams.set('name', inviteeInfo.name);
    bookingUrl.searchParams.set('email', inviteeInfo.email);
    if (inviteeInfo.phone) {
      bookingUrl.searchParams.set('a1', inviteeInfo.phone); // Custom question answer
    }
    if (startTime) {
      bookingUrl.searchParams.set('date', startTime.split('T')[0]);
      bookingUrl.searchParams.set('time', startTime.split('T')[1]);
    }

    return NextResponse.json({
      success: true,
      bookingUrl: bookingUrl.toString(),
      schedulingLink: data.resource
    });
  } catch (error) {
    console.error('Error in Calendly booking API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
