import { NextResponse } from 'next/server';

const CALENDLY_API_BASE = 'https://api.calendly.com';

export async function POST(request: Request) {
  try {
    const { eventUrl, dateTime, inviteeInfo } = await request.json();
    
    const apiKey = process.env.CALENDLY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Calendly API key not configured' },
        { status: 500 }
      );
    }

    // Create invitee in Calendly
    const response = await fetch(`${CALENDLY_API_BASE}/scheduled_events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventUrl,
        invitee: {
          name: inviteeInfo.name,
          email: inviteeInfo.email,
          phone_number: inviteeInfo.phone,
          text_reminder_number: inviteeInfo.phone,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        start_time: dateTime,
        questions_and_answers: inviteeInfo.notes ? [
          {
            question: 'Additional Notes',
            answer: inviteeInfo.notes,
          },
        ] : [],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Calendly booking error:', errorData);
      return NextResponse.json(
        { error: 'Failed to book appointment with Calendly' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      booking: data,
    });
  } catch (error) {
    console.error('Error in Calendly booking API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
