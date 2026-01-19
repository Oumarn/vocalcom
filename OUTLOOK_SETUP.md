# Microsoft Outlook Calendar Integration Setup

## 🎯 Overview

Your form now syncs directly with Microsoft Outlook/Office 365 calendars! This is perfect for enterprise setups where your sales team already uses Outlook.

### ✅ Advantages over Calendly:
- **No third-party service** - Direct integration with your existing Outlook
- **Enterprise-ready** - Uses Microsoft Graph API
- **Team calendars** - Check availability across multiple team members
- **Automatic Teams meetings** - Creates Teams links automatically
- **Free** - No Calendly subscription needed
- **Full control** - You manage everything in your Outlook admin

## 📋 Prerequisites

1. **Microsoft 365 Business Account** (not personal Outlook.com)
2. **Azure AD Admin Access** (to create app registration)
3. **Sales team Outlook calendars** (individual or shared calendars)

## 🔧 Step 1: Create Azure AD App Registration (10 minutes)

### 1.1 Go to Azure Portal
Visit: https://portal.azure.com

### 1.2 Navigate to App Registrations
- Click "Azure Active Directory" (left sidebar)
- Click "App registrations"
- Click "New registration"

### 1.3 Register the App
- **Name**: `Vocalcom Calendar Integration`
- **Supported account types**: "Accounts in this organizational directory only"
- **Redirect URI**: Leave empty for now (we're using service-to-service auth)
- Click "Register"

### 1.4 Get Your Credentials
After registration, you'll see the overview page:

**Copy these 3 values:**
1. **Application (client) ID** → This is your `MICROSOFT_CLIENT_ID`
2. **Directory (tenant) ID** → This is your `MICROSOFT_TENANT_ID`

### 1.5 Create Client Secret
- Click "Certificates & secrets" (left menu)
- Click "New client secret"
- Description: "Calendar API Access"
- Expires: Choose 24 months (maximum)
- Click "Add"
- **IMPORTANT**: Copy the **Value** immediately (you can't see it again!)
- This is your `MICROSOFT_CLIENT_SECRET`

### 1.6 Set API Permissions
- Click "API permissions" (left menu)
- Click "Add a permission"
- Choose "Microsoft Graph"
- Choose "Application permissions" (not Delegated)
- Add these permissions:
  - ✅ `Calendars.Read` - Read calendar availability
  - ✅ `Calendars.ReadWrite` - Create calendar events
  - ✅ `User.Read.All` - Read user information
- Click "Add permissions"
- **CRITICAL**: Click "Grant admin consent for [Your Organization]"
- Click "Yes" to confirm

## 🔐 Step 2: Configure Environment Variables (2 minutes)

Create `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
MICROSOFT_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MICROSOFT_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MICROSOFT_CLIENT_SECRET=your_secret_value_here
```

## 📧 Step 3: Configure Sales Team Calendars (5 minutes)

Edit `/config/outlook-config.ts`:

### Option A: Shared Team Calendar (Recommended)
```typescript
france: {
  calendarEmails: ['sales-france@vocalcom.com'], // ← Shared calendar
  timezone: 'Europe/Paris',
  countries: ['France', 'Belgique', 'Suisse'],
  duration: 15,
},
```

### Option B: Individual Rep Calendars
```typescript
france: {
  calendarEmails: [
    'o.ndiaye@vocalcom.com',
  ],
  timezone: 'Europe/Paris',
  countries: ['France', 'Belgique', 'Suisse'],
  duration: 15,
},
```

### Setting up Shared Calendars

**In Outlook:**
1. Right-click "My Calendars"
2. Click "Add calendar" → "Create blank calendar"
3. Name it "Sales France Team"
4. Share with all France team members (Editor permission)
5. Use the calendar email in config

**In Exchange Admin Center:**
1. Go to https://admin.microsoft.com
2. Teams & groups → Shared mailboxes
3. Create shared mailbox: `sales-france@vocalcom.com`
4. Add team members as members
5. Use this email in config

## 🕐 Step 4: Configure Working Hours (Optional)

Edit working hours in `/config/outlook-config.ts`:

```typescript
export const WORKING_HOURS = {
  default: {
    monday: { start: '09:00', end: '18:00' },
    tuesday: { start: '09:00', end: '18:00' },
    // ... customize per team
  }
};
```

## 🧪 Step 5: Test the Integration

```bash
npm run dev
```

1. Open http://localhost:3000
2. Fill the form
3. Select "France" as country
4. Go to calendar (step 4)
5. ✨ See real availability from Outlook!

### Test Checklist:
- ✅ Available dates show in purple
- ✅ Only dates with free slots are selectable
- ✅ Time slots match team's free/busy
- ✅ Booking creates event in Outlook
- ✅ Team receives meeting invitation
- ✅ Teams meeting link is created

## 📊 How It Works

```
User selects country: "France"
    ↓
API fetches availability from:
    sales-france@vocalcom.com
    ↓
Checks free/busy for next 30 days
    ↓
Shows only available time slots
    ↓
User books appointment
    ↓
Creates event in Outlook:
    ├── Subject: "Demo Vocalcom - John Doe"
    ├── Attendees: User + Sales Team
    ├── Teams meeting link (auto-generated)
    └── Calendar event with all details
    ↓
Everyone receives invitation email
```

## 🔒 Security & Permissions

### What the App Can Do:
- ✅ Read calendar free/busy information
- ✅ Create calendar events
- ✅ Read user profile info (name, email)

### What the App CANNOT Do:
- ❌ Read email messages
- ❌ Access files or documents
- ❌ Modify user settings
- ❌ Act as a user

### Best Practices:
1. **Use service accounts** - Dedicated accounts for calendar access
2. **Shared calendars** - Better than accessing personal calendars
3. **Audit logs** - Azure AD logs all API access
4. **Regular review** - Check permissions quarterly

## 🎨 Features

### Intelligent Scheduling:
- ✅ Checks multiple team members' calendars
- ✅ Only shows times when ALL are available
- ✅ Respects working hours per timezone
- ✅ Filters out holidays and weekends
- ✅ Buffer time between meetings (configurable)

### Automatic Meeting Creation:
- ✅ Creates Teams meeting link
- ✅ Sends invitations to all attendees
- ✅ Adds to everyone's calendar
- ✅ Includes customer details in description
- ✅ Sets proper timezone

### Multi-Region Support:
- ✅ Different teams per country
- ✅ Proper timezone handling
- ✅ Localized working hours
- ✅ Regional holidays support

## 🚀 Production Deployment

### Vercel/Netlify:
Add environment variables in dashboard:
```
MICROSOFT_TENANT_ID=xxx
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx
```

### Azure:
If hosting on Azure, use Managed Identity instead of secrets!

## 🐛 Troubleshooting

### "Failed to get access token"
- ✅ Check tenant ID, client ID, secret are correct
- ✅ Verify secret hasn't expired (they expire!)
- ✅ Check app permissions are granted

### "No available slots showing"
- ✅ Verify calendar emails are correct
- ✅ Check team has availability in Outlook
- ✅ Ensure working hours are configured
- ✅ Check timezone settings

### "Failed to create event"
- ✅ Verify `Calendars.ReadWrite` permission
- ✅ Check admin consent was granted
- ✅ Ensure calendar email exists

### API Rate Limits:
- Microsoft Graph: 10,000 requests per 10 minutes
- More than enough for typical usage
- Use caching if needed

## 📱 Mobile & Sync

Works automatically with:
- ✅ Outlook mobile app
- ✅ iOS Calendar (if synced)
- ✅ Android Calendar (if synced)
- ✅ Gmail (if you sync Outlook to Gmail)

## 💡 Advanced Features

### Round-Robin Assignment:
Modify `/lib/outlook-api.ts` to distribute leads evenly across team members.

### Priority Scheduling:
Give certain team members priority for specific regions or company sizes.

### Custom Availability Rules:
Override Outlook availability with business logic (VIP customers, etc.)

### CRM Integration:
Sync appointments to your CRM after booking.

## 📚 Resources

- [Microsoft Graph API Docs](https://learn.microsoft.com/en-us/graph/)
- [Calendar API Reference](https://learn.microsoft.com/en-us/graph/api/resources/calendar)
- [getSchedule API](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule)
- [Azure AD App Registration](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

## ✨ Benefits Summary

Compared to Calendly:
- 💰 **Free** - No subscription costs
- 🔒 **Secure** - Enterprise-grade Microsoft security
- 🏢 **Integrated** - Works with existing Outlook setup
- ⚡ **Fast** - Direct API, no third-party
- 🎯 **Flexible** - Full control over logic
- 📊 **Insights** - Your data stays in your tenant

You're now using enterprise-grade calendar scheduling! 🎉
