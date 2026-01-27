import { NextResponse } from 'next/server';

// Calendly API endpoint for availability
const CALENDLY_API_BASE = 'https://api.calendly.com';

export async function POST(request: Request) {
  try {
    const { eventUri, startDate, endDate } = await request.json();
    
    const apiKey = process.env.CALENDLY_API_KEY;
    
    if (!apiKey) {
      console.error('❌ Calendly API key not configured');
      return NextResponse.json(
        { error: 'Calendly API key not configured' },
        { status: 500 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('❌ Invalid date format:', { startDate, endDate });
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }
    
    // Check if start is in the future
    if (start < now) {
      console.warn('⚠️ Start date is in the past, adjusting to now:', { startDate, now: now.toISOString() });
      // Adjust to current time
      const adjustedStart = now.toISOString().split('T')[0];
      console.log('📅 Adjusted start date:', adjustedStart);
    }
    
    // Check if date range is within 7 days
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 7) {
      console.error('❌ Date range too large:', { startDate, endDate, daysDiff });
      return NextResponse.json(
        { error: `Date range too large (${daysDiff} days). Maximum is 7 days.` },
        { status: 400 }
      );
    }

    console.log('🔍 Fetching Calendly availability:', {
      eventUri,
      startDate,
      endDate,
      daysDiff
    });

    // First, get the user's URI to fetch event types
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
    
    console.log('👤 Calendly user URI:', userUri);

    // Fetch all event types for this user
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
    
    console.log('📅 Found event types:', eventTypesData.collection.map((et: any) => ({
      name: et.name,
      uri: et.uri,
      scheduling_url: et.scheduling_url
    })));

    // Find the event type that matches the eventUri (booking page URL)
    const bookingUrl = `https://calendly.com/${eventUri}`;
    const matchingEventType = eventTypesData.collection.find((et: any) => 
      et.scheduling_url === bookingUrl || 
      et.scheduling_url.includes(eventUri) ||
      et.slug === eventUri.split('/').pop()
    );

    if (!matchingEventType) {
      console.error('❌ No matching event type found for:', eventUri);
      console.log('Available event types:', eventTypesData.collection.map((et: any) => et.scheduling_url));
      return NextResponse.json(
        { error: 'Event type not found', availableEventTypes: eventTypesData.collection.map((et: any) => et.scheduling_url) },
        { status: 404 }
      );
    }

    const eventTypeUri = matchingEventType.uri;
    console.log('✅ Found matching event type:', {
      name: matchingEventType.name,
      uri: eventTypeUri,
      scheduling_url: matchingEventType.scheduling_url
    });

    // Fetch availability from Calendly API using the event type URI
    // Need to URL encode the event_type parameter
    const encodedEventTypeUri = encodeURIComponent(eventTypeUri);
    
    // Convert dates to ISO with proper time - ensure start is in future
    const startDateObj = new Date(startDate + 'T00:00:00Z');
    const endDateObj = new Date(endDate + 'T23:59:59Z');
    
    // If start is in the past, use current time + 1 hour
    const currentTime = new Date();
    const effectiveStart = startDateObj < currentTime ? new Date(currentTime.getTime() + 60 * 60 * 1000) : startDateObj;
    
    const startTimeISO = effectiveStart.toISOString();
    const endTimeISO = endDateObj.toISOString();
    
    console.log('📅 Date conversion:', {
      originalStart: startDate,
      originalEnd: endDate,
      effectiveStartISO: startTimeISO,
      endTimeISO: endTimeISO,
      isStartInFuture: effectiveStart > currentTime
    });
    
    const availabilityUrl = `${CALENDLY_API_BASE}/event_type_available_times?event_type=${encodedEventTypeUri}&start_time=${startTimeISO}&end_time=${endTimeISO}`;
    
    console.log('🔗 Fetching availability from:', availabilityUrl);
    
    const response = await fetch(availabilityUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ Calendly availability API error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to fetch availability from Calendly', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    console.log('✅ Calendly raw response:', {
      collection_length: data.collection?.length || 0,
      first_slot: data.collection?.[0]
    });
    
    // Transform Calendly response to our format
    const availability = transformCalendlyData(data);

    console.log('✅ Transformed availability:', {
      total_days: availability.length,
      total_slots: availability.reduce((acc, day) => acc + day.slots.length, 0)
    });

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Error in Calendly availability API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function transformCalendlyData(calendlyResponse: any) {
  // Group available times by date
  const availabilityByDate: { [key: string]: string[] } = {};

  if (calendlyResponse.collection) {
    calendlyResponse.collection.forEach((slot: any) => {
      const startTime = new Date(slot.start_time);
      const date = startTime.toISOString().split('T')[0];
      const time = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;

      if (!availabilityByDate[date]) {
        availabilityByDate[date] = [];
      }
      availabilityByDate[date].push(time);
    });
  }

  // Convert to array format
  return Object.entries(availabilityByDate).map(([date, slots]) => ({
    date,
    slots: slots.sort(),
  }));
}
