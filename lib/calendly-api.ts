// Utility functions to interact with Calendly API
// Documentation: https://developer.calendly.com/api-docs

const CALENDLY_API_KEY = process.env.NEXT_PUBLIC_CALENDLY_API_KEY || '';

interface CalendlyTimeSlot {
  start_time: string;
  end_time: string;
  status: 'available' | 'busy';
}

interface CalendlyAvailability {
  date: string;
  slots: string[];
}

/**
 * Fetch available time slots from Calendly
 * @param eventUrl - The Calendly event URL (e.g., 'https://calendly.com/team/event')
 * @param startDate - Start date for availability check (YYYY-MM-DD)
 * @param endDate - End date for availability check (YYYY-MM-DD)
 */
export async function fetchCalendlyAvailability(
  eventUrl: string,
  startDate: string,
  endDate: string
): Promise<CalendlyAvailability[]> {
  try {
    // Extract the event URI from the full URL
    const eventUri = eventUrl.replace('https://calendly.com/', '');
    
    const response = await fetch(`/api/calendly/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventUri,
        startDate,
        endDate,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch availability: ${response.statusText}`);
    }

    const data = await response.json();
    return data.availability || [];
  } catch (error) {
    console.error('Error fetching Calendly availability:', error);
    return [];
  }
}

/**
 * Book an appointment through Calendly
 * @param eventUrl - The Calendly event URL
 * @param dateTime - Selected date and time (ISO format)
 * @param inviteeInfo - User information
 */
export async function bookCalendlyAppointment(
  eventUrl: string,
  dateTime: string,
  inviteeInfo: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  }
) {
  try {
    const response = await fetch(`/api/calendly/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventUrl,
        dateTime,
        inviteeInfo,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to book appointment: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error booking Calendly appointment:', error);
    throw error;
  }
}

/**
 * Format date for Calendly API (YYYY-MM-DD)
 */
export function formatDateForCalendly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse time slots from Calendly response
 */
export function parseCalendlyTimeSlots(slots: CalendlyTimeSlot[]): string[] {
  return slots
    .filter(slot => slot.status === 'available')
    .map(slot => {
      const date = new Date(slot.start_time);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    });
}
