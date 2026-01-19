# Calendly Integration Setup Guide

This guide explains how to integrate your Vocalcom form with Calendly to show live availability from your sales team calendars.

## 🎯 Overview

The integration keeps your custom calendar design while syncing availability and bookings with Calendly. Different sales team calendars are displayed based on the user's selected country.

## 📋 Prerequisites

1. **Calendly Account** (Pro, Premium, or Enterprise plan for API access)
2. **Multiple Calendly Event Types** (one per region/sales team)
3. **Calendly API Key** (Personal Access Token)

## 🔧 Step 1: Get Your Calendly API Key

1. Log in to your Calendly account
2. Go to **Integrations** → **API & Webhooks**: https://calendly.com/integrations/api_webhooks
3. Click **"Get a token"** or **"Generate New Token"**
4. Copy the Personal Access Token
5. Create a `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

6. Add your API key to `.env.local`:

```env
CALENDLY_API_KEY=your_personal_access_token_here
NEXT_PUBLIC_CALENDLY_API_KEY=your_personal_access_token_here
```

## 📅 Step 2: Set Up Your Calendly Event Types

Create separate event types for each sales team/region:

### Example Event Types:

1. **France Team** - https://calendly.com/vocalcom-france/demo-15min
2. **Spain Team** - https://calendly.com/vocalcom-spain/demo-15min  
3. **UK Team** - https://calendly.com/vocalcom-uk/demo-15min
4. **Germany Team** - https://calendly.com/vocalcom-germany/demo-15min
5. **USA Team** - https://calendly.com/vocalcom-usa/demo-15min

### Event Type Settings:
- **Duration**: 15 minutes
- **Location**: Video conference (Zoom, Google Meet, Teams, etc.)
- **Availability**: Set your team's working hours
- **Buffer time**: Optional (e.g., 15 min between meetings)

## 🗺️ Step 3: Configure Country-to-Calendar Mapping

Edit `/config/calendly-config.ts` and update with your actual Calendly URLs:

```typescript
export const CALENDLY_CONFIG = {
  france: {
    eventUrl: 'https://calendly.com/vocalcom-france/demo-15min', // ← YOUR URL
    timezone: 'Europe/Paris',
    countries: ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Monaco']
  },
  spain: {
    eventUrl: 'https://calendly.com/vocalcom-spain/demo-15min', // ← YOUR URL
    timezone: 'Europe/Madrid',
    countries: ['Espagne', 'España', 'Spain']
  },
  // ... add more regions
};
```

### Tips:
- Add all country name variations (French, English, Spanish, etc.)
- Use consistent timezones for each region
- The first matching country will be used

## 🔗 Step 4: Get Event Type UUID (Required for API)

The Calendly API requires event type UUIDs instead of URLs. To get them:

1. Go to https://calendly.com/app/event_types
2. Click on an event type
3. The UUID is in the URL: `calendly.com/event_types/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
4. Copy each UUID

Update `/app/api/calendly/availability/route.ts`:

```typescript
// Map your event URLs to UUIDs
const EVENT_URL_TO_UUID: {[key: string]: string} = {
  'vocalcom-france/demo-15min': 'YOUR-UUID-HERE',
  'vocalcom-spain/demo-15min': 'YOUR-UUID-HERE',
  // ... add all your event types
};
```

## 🧪 Step 5: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Open the form: http://localhost:3000

3. Test the flow:
   - Fill in personal information (steps 1-2)
   - **Select a country** (e.g., "France")
   - Go to step 4 (calendar)
   - You should see:
     - ✅ Real available dates from Calendly (highlighted)
     - ✅ Real time slots when you click a date
     - ✅ Loading state while fetching availability

4. Check browser console for any errors

## 🎨 How It Works

1. **User selects a country** → System determines which Calendly calendar to use
2. **User reaches calendar step** → Frontend fetches availability from `/api/calendly/availability`
3. **API calls Calendly** → Gets available time slots for the next 30 days
4. **Calendar updates** → Shows only available dates/times in your custom design
5. **User books a slot** → Creates appointment in Calendly via `/api/calendly/book`

## 🔒 Security Notes

- ✅ API key is stored server-side (`.env.local`)
- ✅ Never commit `.env.local` to git
- ✅ API routes handle authentication
- ✅ Frontend only gets availability data, not API keys

## 📊 Monitoring

Check your Calendly dashboard to monitor:
- Bookings created through the form
- API usage/limits
- No-shows and cancellations

## 🐛 Troubleshooting

### "Failed to fetch availability"
- ✅ Check API key is correct in `.env.local`
- ✅ Verify event URLs in `calendly-config.ts`
- ✅ Ensure Event Types are public and active

### Calendar shows no available slots
- ✅ Check team calendar has availability set
- ✅ Verify timezone configuration
- ✅ Check console for API errors

### Wrong calendar showing
- ✅ Verify country name matches exactly in config
- ✅ Check country variations (French/English names)

## 🚀 Production Deployment

1. Add environment variables to Vercel/hosting:
```bash
CALENDLY_API_KEY=your_key
NEXT_PUBLIC_CALENDLY_API_KEY=your_key
```

2. Test thoroughly before launch
3. Monitor API rate limits (Calendly free tier: 60 requests/minute)

## 📚 Resources

- [Calendly API Docs](https://developer.calendly.com/)
- [Event Types API](https://developer.calendly.com/api-docs/a602e9453e-list-event-types)
- [Scheduling API](https://developer.calendly.com/api-docs/d8a0c8f3e-create-single-use-scheduling-link)

## 💡 Advanced Features (Optional)

### Multi-team routing
- Route based on company size, industry, or language
- Use form data to determine best sales team

### Custom availability rules
- Override Calendly availability with business logic
- Block specific dates (company holidays)
- Prioritize certain time slots

### Booking confirmation
- Send custom emails after booking
- Add to internal CRM
- Trigger Slack/Teams notifications
