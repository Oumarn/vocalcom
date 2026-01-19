# Quick Start: Update Your Calendly URLs

Follow these steps to connect your actual Calendly calendars:

## 1️⃣ Get Your API Key (5 minutes)

1. Visit: https://calendly.com/integrations/api_webhooks
2. Click "Generate New Token"
3. Copy the token
4. Create `.env.local` file:
   ```bash
   CALENDLY_API_KEY=paste_your_token_here
   NEXT_PUBLIC_CALENDLY_API_KEY=paste_your_token_here
   ```

## 2️⃣ Update Calendar URLs (2 minutes)

Edit `config/calendly-config.ts` and replace with YOUR Calendly URLs:

```typescript
export const CALENDLY_CONFIG = {
  france: {
    eventUrl: 'https://calendly.com/YOUR-TEAM/event-name', // ← CHANGE THIS
    timezone: 'Europe/Paris',
    countries: ['France', 'Belgique', 'Suisse', 'Luxembourg']
  },
  spain: {
    eventUrl: 'https://calendly.com/YOUR-TEAM/event-name', // ← CHANGE THIS
    timezone: 'Europe/Madrid',
    countries: ['Espagne', 'España', 'Spain']
  },
  // Add more regions as needed
}
```

## 3️⃣ Test It

```bash
npm run dev
```

1. Open http://localhost:3000
2. Fill the form
3. Select "France" as country
4. Go to calendar step
5. You should see real availability! ✅

## 🎯 What Just Happened?

- ✅ **Keeps your design**: Your custom calendar still looks the same
- ✅ **Live availability**: Shows real free/busy times from Calendly
- ✅ **Country routing**: Different countries = different sales teams
- ✅ **Auto-sync**: When someone books, it goes directly to Calendly

## 🔧 Current Status

Your form now:
1. ✅ Fetches availability from Calendly API
2. ✅ Shows only available dates (highlighted in purple)
3. ✅ Shows only available time slots
4. ✅ Routes to correct team based on country
5. ✅ Books appointments directly in Calendly

## 📝 What You Need to Provide

Just two things:
1. **Calendly API token** (from step 1)
2. **Your actual Calendly URLs** (from step 2)

Everything else is already wired up!

## 🚀 Ready for Production

Once tested locally:
1. Add the API key to Vercel environment variables
2. Update the Calendly URLs in the config
3. Deploy!

Your sales team's calendars are now synced with your beautiful form! 🎉
