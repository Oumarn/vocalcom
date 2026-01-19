// Microsoft Graph API utilities for Outlook Calendar integration
// Documentation: https://learn.microsoft.com/en-us/graph/api/calendar-getschedule

import { getWorkingHours, getRegionConfig, type OutlookRegionConfig } from '@/config/outlook-config';
import type { RegionKey } from './region-resolver';

interface TimeSlot {
  start: string;
  end: string;
  status: 'free' | 'busy';
  ownerEmail?: string;
}

interface SlotWithOwner {
  time: string;
  ownerEmail: string;
}

interface AvailabilityResponse {
  date: string;
  slots: SlotWithOwner[];
}

/**
 * Get Microsoft Graph API access token using client credentials flow
 * This requires an Azure AD app registration with Calendar.Read permissions
 */
async function getGraphAccessToken(): Promise<string> {
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

  console.log('🔐 Checking credentials:', {
    tenantId: tenantId ? '✅ Set' : '❌ Missing',
    clientId: clientId ? '✅ Set' : '❌ Missing',
    clientSecret: clientSecret ? '✅ Set' : '❌ Missing'
  });

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Microsoft Graph API credentials not configured');
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  console.log('🔑 Requesting access token...');

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Token request failed:', response.status, errorText);
    throw new Error(`Failed to get access token: ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  console.log('✅ Access token obtained');
  return data.access_token;
}

/**
 * Fetch availability from multiple Outlook calendars (multi-region support)
 * Returns merged slots with ownerEmail for each slot (for round-robin booking)
 * 
 * @param region - Region key (determines which sales team calendars to check)
 * @param startDate - Start date (YYYY-MM-DD)
 * @param endDate - End date (YYYY-MM-DD)
 */
export async function fetchOutlookAvailabilityByRegion(
  region: RegionKey,
  startDate: string,
  endDate: string
): Promise<AvailabilityResponse[]> {
  const config = getRegionConfig(region);
  
  console.log(`📅 Fetching availability for region: ${region}`);
  console.log(`📧 Calendars: ${config.calendarEmails.join(', ')}`);
  
  return fetchOutlookAvailability(
    config.calendarEmails,
    startDate,
    endDate,
    config.timezone,
    config.duration
  );
}

/**
 * Fetch availability from Outlook calendar using Microsoft Graph API
 * Now returns slots with ownerEmail for proper booking attribution
 * 
 * @param calendarEmails - Email addresses of the calendars to check
 * @param startDate - Start date (YYYY-MM-DD)
 * @param endDate - End date (YYYY-MM-DD)
 * @param timezone - Timezone (e.g., 'Europe/Paris')
 * @param duration - Meeting duration in minutes
 */
export async function fetchOutlookAvailability(
  calendarEmails: string[],
  startDate: string,
  endDate: string,
  timezone: string,
  duration: number = 15,
  workingHoursConfig?: any
): Promise<AvailabilityResponse[]> {
  try {
    console.log('📅 Fetching availability for:', calendarEmails);
    const accessToken = await getGraphAccessToken();

    // For application permissions, we need to use /users/{email}/calendar/getSchedule
    // not /me/calendar/getSchedule (which is for delegated permissions)
    
    const primaryEmail = calendarEmails[0];
    const scheduleUrl = `https://graph.microsoft.com/v1.0/users/${primaryEmail}/calendar/getSchedule`;
    
    const requestBody = {
      schedules: calendarEmails,
      startTime: {
        dateTime: `${startDate}T00:00:00`,
        timeZone: timezone,
      },
      endTime: {
        dateTime: `${endDate}T23:59:59`,
        timeZone: timezone,
      },
      availabilityViewInterval: duration,
    };
    
    console.log('📤 Sending request to Graph API:', scheduleUrl);
    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(scheduleUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Prefer': `outlook.timezone="${timezone}"`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Graph API error:', response.status, errorText);
      throw new Error(`Graph API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('📥 Graph API response:', JSON.stringify(data, null, 2));

    // Process the schedule data to find free slots with owner information
    return processScheduleDataWithOwners(data, startDate, endDate, duration, timezone, workingHoursConfig);
  } catch (error) {
    console.error('❌ Error fetching Outlook availability:', error);
    throw error;
  }
}

/**
 * Process Microsoft Graph schedule data into available time slots WITH owner tracking
 * This enables round-robin booking across multiple sales reps
 */
function processScheduleDataWithOwners(
  scheduleData: any,
  startDate: string,
  endDate: string,
  duration: number,
  timezone: string,
  workingHoursConfig?: any
): AvailabilityResponse[] {
  const availabilityByDate: { [key: string]: SlotWithOwner[] } = {};

  // Get working hours - use provided config or fallback to default
  const workingHours = workingHoursConfig || getWorkingHours('default');

  // Generate all possible time slots within working hours
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = formatDate(d);
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][d.getDay()];
    
    // Check if this day has working hours
    const dayHours = workingHours[dayName];
    if (!dayHours) continue; // Skip non-working days

    // Generate time slots for this day and find available owners for each slot
    const slotsWithOwners = findAvailableOwnersForDay(
      d,
      dayHours,
      duration,
      scheduleData,
      dateStr
    );
    
    if (slotsWithOwners.length > 0) {
      availabilityByDate[dateStr] = slotsWithOwners;
    }
  }

  // Convert to array format and sort slots by time
  return Object.entries(availabilityByDate).map(([date, slots]) => ({
    date,
    slots: slots.sort((a, b) => a.time.localeCompare(b.time)),
  }));
}

/**
 * Find all available owners for each time slot on a given day
 * Returns array of {time, ownerEmail} for all free slots
 */
function findAvailableOwnersForDay(
  date: Date,
  workingHours: { start: string; end: string },
  duration: number,
  scheduleData: any,
  dateStr: string
): SlotWithOwner[] {
  const slotsWithOwners: SlotWithOwner[] = [];
  const [startHour, startMin] = workingHours.start.split(':').map(Number);
  const [endHour, endMin] = workingHours.end.split(':').map(Number);

  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;

  // For each possible time slot in the day
  for (let time = startTime; time + duration <= endTime; time += duration) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    // Skip past times if it's today
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      const currentTime = now.getHours() * 60 + now.getMinutes();
      if (time <= currentTime) continue;
    }
    
    // Find which sales reps are available for this slot
    const availableOwners = findAvailableOwnersForSlot(
      timeStr,
      dateStr,
      duration,
      scheduleData
    );
    
    // Add one entry per available owner (for round-robin)
    // Frontend will pick the first one, ensuring earliest availability
    if (availableOwners.length > 0) {
      // Just add the first available owner (natural round-robin when sorted by time)
      slotsWithOwners.push({
        time: timeStr,
        ownerEmail: availableOwners[0],
      });
    }
  }

  return slotsWithOwners;
}

/**
 * Find which calendar owners are free during a specific time slot
 */
function findAvailableOwnersForSlot(
  timeStr: string,
  dateStr: string,
  duration: number,
  scheduleData: any
): string[] {
  if (!scheduleData.value || scheduleData.value.length === 0) {
    return []; // No calendar data
  }

  const slotDateTime = `${dateStr}T${timeStr}:00`;
  const slotStart = new Date(slotDateTime);
  const slotEnd = new Date(slotStart.getTime() + duration * 60000);

  const availableOwners: string[] = [];

  // Check each calendar
  for (const calendar of scheduleData.value) {
    const ownerEmail = calendar.scheduleId;
    
    // Check if this calendar is free during the slot
    const isFree = !calendar.scheduleItems?.some((item: any) => {
      if (item.status !== 'busy' && item.status !== 'tentative') return false;
      
      const busyStart = new Date(item.start.dateTime);
      const busyEnd = new Date(item.end.dateTime);
      
      // Check if slot overlaps with busy period
      return slotStart < busyEnd && slotEnd > busyStart;
    });
    
    if (isFree) {
      availableOwners.push(ownerEmail);
    }
  }

  return availableOwners;
}

/**
 * Legacy function for backwards compatibility (without owner tracking)
 */
function processScheduleData(
  scheduleData: any,
  startDate: string,
  endDate: string,
  duration: number,
  timezone: string,
  workingHoursConfig?: any
): { date: string; slots: string[] }[] {
  const withOwners = processScheduleDataWithOwners(
    scheduleData,
    startDate,
    endDate,
    duration,
    timezone,
    workingHoursConfig
  );
  
  // Strip owner info for legacy compatibility
  return withOwners.map(day => ({
    date: day.date,
    slots: day.slots.map(s => s.time),
  }));
}

/**
 * Book a meeting in Outlook calendar
 */
export async function bookOutlookAppointment(
  organizerEmail: string,
  appointmentData: {
    subject: string;
    startDateTime: string;
    endDateTime: string;
    timezone: string;
    attendees: Array<{
      name: string;
      email: string;
    }>;
    body?: string;
    location?: string;
  }
) {
  try {
    const accessToken = await getGraphAccessToken();

    // Create event in the organizer's calendar
    const createEventUrl = `https://graph.microsoft.com/v1.0/users/${organizerEmail}/events`;

    const response = await fetch(createEventUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: appointmentData.subject,
        start: {
          dateTime: appointmentData.startDateTime,
          timeZone: appointmentData.timezone,
        },
        end: {
          dateTime: appointmentData.endDateTime,
          timeZone: appointmentData.timezone,
        },
        attendees: appointmentData.attendees.map(att => ({
          emailAddress: {
            address: att.email,
            name: att.name,
          },
          type: 'required',
        })),
        body: {
          contentType: 'HTML',
          content: appointmentData.body || '',
        },
        location: {
          displayName: appointmentData.location || 'Teams Meeting',
        },
        isOnlineMeeting: true,
        onlineMeetingProvider: 'teamsForBusiness',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error booking Outlook appointment:', error);
    throw error;
  }
}

/**
 * Helper: Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Helper: Format date for API (YYYY-MM-DD)
 */
export function formatDateForOutlook(date: Date): string {
  return formatDate(date);
}

/**
 * Helper: Calculate end time based on start time and duration
 */
export function calculateEndTime(startDateTime: string, durationMinutes: number): string {
  const start = new Date(startDateTime);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return end.toISOString();
}
