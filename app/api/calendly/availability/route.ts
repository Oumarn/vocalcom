import { NextResponse } from 'next/server';

// Calendly API endpoint for availability
const CALENDLY_API_BASE = 'https://api.calendly.com';

export async function POST(request: Request) {
  try {
    const { eventUri, startDate, endDate } = await request.json();
    
    const apiKey = process.env.CALENDLY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Calendly API key not configured' },
        { status: 500 }
      );
    }

    // Fetch availability from Calendly API
    // Note: You'll need to get the event type UUID from your Calendly account
    const response = await fetch(
      `${CALENDLY_API_BASE}/event_type_available_times?event_type=${eventUri}&start_time=${startDate}T00:00:00Z&end_time=${endDate}T23:59:59Z`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Calendly API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch availability from Calendly' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform Calendly response to our format
    const availability = transformCalendlyData(data);

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Error in Calendly availability API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
