# Multi-Region Outlook Calendar Integration

## 🎯 Overview

Your Vocalcom landing pages now support **automatic region detection** based on Google Ads UTM parameters, with intelligent routing to the appropriate sales team calendars. This system supports **7 regions** with **15+ sales representatives** across multiple continents.

## 🌍 Supported Regions

| Region | Timezone | Duration | Sales Team | UTM Campaign Pattern |
|--------|----------|----------|------------|---------------------|
| **France Core** | Europe/Paris | 15 min | Pierrick, Oumar | `FR Core` |
| **Africa Francophone** | Africa/Dakar | 30 min | Chiheb, Dalel, Rym, Issam | `FR Africa` |
| **Spain & LATAM** | America/Mexico_City | 30 min | Jorge, Luis, Andrés, Angelo, Mauro, Romina, Juan Carlos | `ES Spain & LATAM` |
| **Middle East & Arabia** | Asia/Dubai | 30 min | Mohammad, Mohamed Karim | `EN MEA` |
| **Europe (EN)** | Europe/London | 15 min | Pierrick, Oumar (temp) | `EN Europe` |
| **Africa English** | Africa/Lagos | 30 min | Chiheb (temp) | `EN Africa` |
| **Brazil** | America/Sao_Paulo | 30 min | Mauro | `PT Brazil` |

## 🔧 How It Works

### 1. UTM-Based Region Detection

The system automatically detects the region from your Google Ads campaign naming convention:

**Campaign Structure:** `GA | Region | Language | Intent | Offer`

**Examples:**
- `GA | FR Core | FR | Brand | Demo` → **france_core**
- `GA | FR Africa | FR | Category | Contact Center Software` → **africa_francophone**
- `GA | EN MEA | EN | Problem | CX Platform` → **mea_english**
- `GA | ES Spain & LATAM | ES | Category | Contact Center Software` → **es_latam**

### 2. Fallback Logic

If UTM parameters are not available or incomplete:

1. **Primary:** Extract region from `utm_campaign` parameter
2. **Fallback:** Use landing page language (`fr` → france_core, `en` → mea_english, etc.)
3. **Ultimate:** Default to `france_core`

### 3. Calendar Availability (Pool Model)

For each region, the system:

1. **Queries all sales reps' calendars** simultaneously via Microsoft Graph API
2. **Merges available slots** from all team members
3. **Tracks `ownerEmail`** for each slot (for attribution)
4. **Sorts by time** → Shows earliest available slots first
5. **Natural round-robin** → First slot = earliest available rep

### 4. Booking Flow

When a user selects a slot:

1. Slot includes `ownerEmail` of the available sales rep
2. Appointment is created in **that specific rep's Outlook calendar**
3. Teams meeting link is auto-generated
4. All attendees receive invitations
5. UTM parameters are stored in the meeting description (for CRM sync)

## 📁 File Structure

```
/lib
  ├── region-resolver.ts         # UTM → Region mapping logic
  └── outlook-api.ts             # Microsoft Graph API integration

/config
  └── outlook-config.ts          # Region configurations & sales teams

/app/api/outlook
  ├── availability/route.ts      # GET availability by region
  └── book/route.ts              # POST create appointment

/app/components/forms
  ├── FrenchCalendar.tsx         # Calendar UI (region-aware)
  └── DemoForm.tsx               # Main form (captures UTMs + region)
```

## 🔑 Key Files Explained

### `/lib/region-resolver.ts`

Converts UTM parameters to internal region keys:

```typescript
resolveRegionFromUTM({
  utm_campaign: "GA | FR Africa | FR | Brand | Demo",
  lang: "fr"
}) 
// → Returns: "africa_francophone"
```

### `/config/outlook-config.ts`

Defines all regions with their sales teams:

```typescript
export const REGIONS = {
  france_core: {
    timezone: 'Europe/Paris',
    duration: 15,
    calendarEmails: [
      'p.hollocou@vocalcom.com',
      'o.ndiaye@vocalcom.com'
    ]
  },
  // ... other regions
}
```

### `/lib/outlook-api.ts`

Core functions:

- `fetchOutlookAvailabilityByRegion()` - Get merged availability for a region
- `bookOutlookAppointment()` - Create event in specific rep's calendar

**Returns slots with owner:**
```typescript
{
  date: "2026-01-20",
  slots: [
    { time: "09:00", ownerEmail: "p.hollocou@vocalcom.com" },
    { time: "09:15", ownerEmail: "o.ndiaye@vocalcom.com" }
  ]
}
```

## 🚀 Usage Examples

### Example 1: French Campaign for France

**URL:** `https://vocalcom.com/fr?utm_campaign=GA+|+FR+Core+|+FR+|+Brand+|+Demo`

**Result:**
- Region: `france_core`
- Calendars checked: Pierrick + Oumar
- Shows earliest available slot from either rep
- Books with the rep who owns that slot

### Example 2: French Campaign for Africa

**URL:** `https://vocalcom.com/fr?utm_campaign=GA+|+FR+Africa+|+FR+|+Category+|+Contact+Center+Software`

**Result:**
- Region: `africa_francophone`
- Calendars checked: Chiheb + Dalel + Rym + Issam (4 reps)
- Shows merged availability
- Books with first available rep

### Example 3: Spanish Campaign

**URL:** `https://vocalcom.com/es?utm_campaign=GA+|+ES+Spain+%26+LATAM+|+ES+|+Problem+|+CX+Platform`

**Result:**
- Region: `es_latam`
- Calendars checked: Jorge + Luis + Andrés + Angelo + Mauro + Romina + Juan Carlos (7 reps!)
- Shows earliest slots from entire LATAM team
- Books with the rep who has that slot free

## 📊 API Reference

### POST `/api/outlook/availability`

**Request:**
```json
{
  "region": "france_core",
  "startDate": "2026-01-16",
  "endDate": "2026-02-16"
}
```

**Response:**
```json
{
  "availability": [
    {
      "date": "2026-01-20",
      "slots": [
        { "time": "09:00", "ownerEmail": "p.hollocou@vocalcom.com" },
        { "time": "09:15", "ownerEmail": "o.ndiaye@vocalcom.com" }
      ]
    }
  ],
  "timezone": "Europe/Paris",
  "duration": 15
}
```

### POST `/api/outlook/book`

**Request:**
```json
{
  "region": "france_core",
  "ownerEmail": "p.hollocou@vocalcom.com",
  "dateTime": "2026-01-20T09:00:00",
  "inviteeInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+33123456789",
    "company": "ACME Corp"
  },
  "utmParams": {
    "campaign": "GA | FR Core | FR | Brand | Demo",
    "source": "google",
    "medium": "paid_search"
  }
}
```

**Response:**
```json
{
  "success": true,
  "appointment": {
    "id": "AAMkAG...",
    "organizer": "p.hollocou@vocalcom.com",
    "subject": "Demo Vocalcom - John Doe (ACME Corp)",
    "start": { "dateTime": "2026-01-20T09:00:00", "timeZone": "Europe/Paris" },
    "end": { "dateTime": "2026-01-20T09:15:00", "timeZone": "Europe/Paris" }
  },
  "meetingLink": "https://teams.microsoft.com/l/meetup-join/..."
}
```

## 🎨 UX Highlights

### What the User Sees

1. **Same Calendly-like interface** for all regions
2. **Earliest available slots** highlighted first
3. **Transparent experience** - no mention of region routing
4. **Automatic Teams meeting** link generation

### Behind the Scenes

1. UTM parameters captured on page load
2. Region detected automatically
3. Multiple calendars queried in parallel
4. Slots merged and sorted by time
5. Owner tracked for each slot
6. Booking routes to correct rep's calendar

## 🔒 Security & Permissions

The Azure AD app requires these **Application permissions**:

- `Calendars.Read` - Read calendar free/busy
- `Calendars.ReadWrite` - Create calendar events
- `User.Read.All` - Read user information

**What the app CANNOT do:**
- ❌ Read emails
- ❌ Access files
- ❌ Modify user settings
- ❌ Act on behalf of users

## 🐛 Troubleshooting

### "No available slots showing"

**Check:**
1. Verify region was detected: Check browser console for `🌍 Region detected: ...`
2. Verify UTM campaign matches pattern: `GA | {Region} | {Lang} | ...`
3. Ensure sales reps have availability in their Outlook calendars
4. Check working hours configuration (9:00-18:00 by default)

### "Failed to book appointment"

**Check:**
1. `ownerEmail` was captured correctly (console log: `📅 Slot selected: ...`)
2. Environment variables are set (`.env.local`)
3. Azure AD permissions granted (admin consent required)
4. Sales rep email exists in Microsoft 365

### Debugging Commands

**Check region detection:**
```javascript
// In browser console on landing page
const params = new URLSearchParams(window.location.search);
console.log('UTM Campaign:', params.get('utm_campaign'));
```

**Check API response:**
```bash
curl -X POST http://localhost:3000/api/outlook/availability \
  -H "Content-Type: application/json" \
  -d '{"region":"france_core","startDate":"2026-01-16","endDate":"2026-02-16"}'
```

## 📈 Scaling to More Sales Reps

To add new sales reps to a region:

1. **Update `/config/outlook-config.ts`:**
   ```typescript
   france_core: {
     calendarEmails: [
       'p.hollocou@vocalcom.com',
       'o.ndiaye@vocalcom.com',
       'new.rep@vocalcom.com',  // ← Add here
     ],
     // ...
   }
   ```

2. **Ensure Azure AD permissions:**
   - The new rep's calendar must be readable by the Azure AD app
   - No code changes needed - system auto-scales

3. **Restart the server:**
   ```bash
   npm run dev
   ```

## 🎯 Benefits Summary

### Compared to "Country-Based" Routing:
- ✅ **More accurate** - UTM campaign = exact region intent
- ✅ **Same landing = multiple regions** - French landing serves France + Africa
- ✅ **Campaign attribution** - Track which campaigns drive bookings
- ✅ **Scalable** - Easy to add new regions or reps

### Compared to Calendly:
- ✅ **No third-party service** - Direct Microsoft integration
- ✅ **Enterprise-grade security** - Your tenant, your control
- ✅ **Free** - No subscription costs
- ✅ **Full customization** - Round-robin, priority routing, CRM sync

### Compared to "Shared Calendar" Model:
- ✅ **Individual attribution** - Know which rep got which lead
- ✅ **Round-robin** - Natural load balancing
- ✅ **Personal calendars** - Reps keep their own schedules
- ✅ **Better UX** - Shows earliest available time across entire team

## 🔗 Related Documentation

- [OUTLOOK_SETUP.md](./OUTLOOK_SETUP.md) - Azure AD setup instructions
- [Microsoft Graph Calendar API](https://learn.microsoft.com/en-us/graph/api/resources/calendar)
- [getSchedule API Reference](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule)

## ✨ What's Next?

**Potential Enhancements:**
1. **Priority scheduling** - VIP customers go to senior reps
2. **Regional holidays** - Automatically skip regional public holidays
3. **CRM sync** - Push appointments to Salesforce/HubSpot
4. **Analytics dashboard** - Track bookings by region, campaign, rep
5. **SMS reminders** - Send appointment reminders via Twilio
6. **Lead scoring** - Route qualified leads to senior reps

---

**Your calendar integration is now enterprise-ready! 🎉**

The system handles 7 regions, 15+ sales reps, UTM attribution, and automatic booking - all while keeping your Calendly-like UX intact.
