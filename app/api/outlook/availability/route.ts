import { NextResponse } from 'next/server';
import { fetchOutlookAvailabilityByRegion } from '@/lib/outlook-api';
import { getRegionConfig } from '@/config/outlook-config';
import type { RegionKey } from '@/lib/region-resolver';

/**
 * POST /api/outlook/availability
 * 
 * Fetch calendar availability for a specific region
 * 
 * Body: { region: RegionKey, startDate: string, endDate: string }
 * Returns: { availability: Array<{ date, slots: Array<{ time, ownerEmail }> }> }
 */
export async function POST(request: Request) {
  try {
    const { region, startDate, endDate } = await request.json();
    
    if (!region || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters: region, startDate, endDate' },
        { status: 400 }
      );
    }

    // Validate region
    const config = getRegionConfig(region as RegionKey);
    if (!config || !config.calendarEmails || config.calendarEmails.length === 0) {
      return NextResponse.json(
        { error: `No calendars configured for region: ${region}` },
        { status: 400 }
      );
    }
    
    console.log('🔍 Outlook Availability Request:', {
      region,
      calendarEmails: config.calendarEmails,
      timezone: config.timezone,
      duration: config.duration,
      startDate,
      endDate
    });

    // Fetch availability from Microsoft Graph API (with owner tracking)
    const availability = await fetchOutlookAvailabilityByRegion(
      region as RegionKey,
      startDate,
      endDate
    );
    
    console.log(`✅ Availability fetched for ${region}:`, {
      totalDays: availability.length,
      totalSlots: availability.reduce((sum, day) => sum + day.slots.length, 0),
      firstSlot: availability[0]?.slots[0]
    });

    return NextResponse.json({ 
      availability,
      timezone: config.timezone,
      duration: config.duration 
    });
  } catch (error: any) {
    console.error('❌ Error in Outlook availability API:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: error.message || 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
