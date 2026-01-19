import { NextResponse } from 'next/server';
import { bookOutlookAppointment, calculateEndTime } from '@/lib/outlook-api';
import { getRegionConfig } from '@/config/outlook-config';
import type { RegionKey } from '@/lib/region-resolver';

/**
 * POST /api/outlook/book
 * 
 * Book a calendar appointment with the designated sales rep
 * 
 * Body: {
 *   region: RegionKey,
 *   ownerEmail: string,  // Sales rep who owns this slot
 *   dateTime: string,    // ISO datetime
 *   inviteeInfo: { name, email, phone?, company?, notes? },
 *   utmParams?: { campaign, source, medium, content, term }
 * }
 */
export async function POST(request: Request) {
  try {
    const { region, ownerEmail, dateTime, inviteeInfo, utmParams } = await request.json();
    
    if (!region || !ownerEmail || !dateTime || !inviteeInfo) {
      return NextResponse.json(
        { error: 'Missing required parameters: region, ownerEmail, dateTime, inviteeInfo' },
        { status: 400 }
      );
    }

    // Get region config for duration and timezone
    const config = getRegionConfig(region as RegionKey);

    console.log('📅 Booking appointment:', {
      region,
      ownerEmail,
      dateTime,
      timezone: config.timezone,
      duration: config.duration,
      invitee: inviteeInfo.name
    });

    // Calculate end time based on region's meeting duration
    const endDateTime = calculateEndTime(dateTime, config.duration);

    // Build meeting description with all details (useful for CRM sync)
    const meetingBody = `
      <h2>Demo Vocalcom</h2>
      <p><strong>Client:</strong> ${inviteeInfo.name}</p>
      <p><strong>Email:</strong> ${inviteeInfo.email}</p>
      <p><strong>Phone:</strong> ${inviteeInfo.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${inviteeInfo.company || 'N/A'}</p>
      <p><strong>Region:</strong> ${region}</p>
      ${utmParams ? `
        <hr/>
        <h3>Campaign Attribution</h3>
        <p><strong>Campaign:</strong> ${utmParams.campaign || 'N/A'}</p>
        <p><strong>Source:</strong> ${utmParams.source || 'N/A'}</p>
        <p><strong>Medium:</strong> ${utmParams.medium || 'N/A'}</p>
        <p><strong>Content:</strong> ${utmParams.content || 'N/A'}</p>
        <p><strong>Term:</strong> ${utmParams.term || 'N/A'}</p>
      ` : ''}
      ${inviteeInfo.notes ? `
        <hr/>
        <h3>Additional Notes</h3>
        <p>${inviteeInfo.notes}</p>
      ` : ''}
    `;

    // Create appointment in the sales rep's Outlook calendar
    const appointment = await bookOutlookAppointment(ownerEmail, {
      subject: `Demo Vocalcom - ${inviteeInfo.name}${inviteeInfo.company ? ` (${inviteeInfo.company})` : ''}`,
      startDateTime: dateTime,
      endDateTime: endDateTime,
      timezone: config.timezone,
      attendees: [
        {
          name: inviteeInfo.name,
          email: inviteeInfo.email,
        },
      ],
      body: meetingBody,
      location: 'Microsoft Teams',
    });

    console.log('✅ Appointment booked successfully:', {
      id: appointment.id,
      organizer: ownerEmail,
      meetingLink: appointment.onlineMeeting?.joinUrl
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        organizer: ownerEmail,
        subject: appointment.subject,
        start: appointment.start,
        end: appointment.end,
      },
      meetingLink: appointment.onlineMeeting?.joinUrl,
    });
  } catch (error: any) {
    console.error('❌ Error in Outlook booking API:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: error.message || 'Failed to book appointment' },
      { status: 500 }
    );
  }
}
