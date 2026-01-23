# Attribution Tracking - Complete Implementation Guide

## Overview
Comprehensive UTM and attribution tracking system for Vocalcom landing pages with localStorage persistence and support for Google Ads, LinkedIn, and multi-touch attribution.

## Captured Parameters (13 Total)

### Google Ads Parameters (10)
1. **gclid** - Google Click Identifier (primary tracking)
2. **utm_source** - Traffic source (e.g., google, linkedin, facebook)
3. **utm_medium** - Marketing medium (e.g., cpc, email, social)
4. **utm_campaign** - Campaign name or ID
5. **utm_content** - Ad group ID or content variation
6. **utm_term** - Search term / keyword
7. **utm_matchtype** - Match type (exact, phrase, broad)
8. **utm_network** - Ad network (Search, Display, Shopping)
9. **utm_device** - Device type (mobile, desktop, tablet)
10. **utm_creative** - Creative ID for ad tracking

### LinkedIn Parameters (1)
11. **li_fat_id** - LinkedIn First-Party Ad Tracking ID

### Internal Parameters (2)
12. **content_group** - Content grouping (default: "landing")
13. **landing_language** - Landing page language (fr, en, es, pt)

## Implementation Architecture

### 1. Client-Side Capture (DemoForm.tsx)

#### localStorage Persistence
```typescript
// Persist UTMs to prevent loss on navigation/refresh
const saveIfPresent = (key: string) => {
    const value = params.get(key);
    if (value) {
        localStorage.setItem(`vocalcom_${key}`, value);
    }
};

['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 
 'utm_matchtype', 'utm_network', 'utm_device', 'utm_creative', 
 'gclid', 'li_fat_id', 'content_group'].forEach(saveIfPresent);
```

#### Fallback Strategy
```typescript
// Get from URL first, then localStorage if missing
const getStored = (key: string): string => {
    return params.get(key) || localStorage.getItem(`vocalcom_${key}`) || '';
};
```

**Why This Matters:**
- User arrives with UTMs → Saved immediately
- User refreshes page → UTMs preserved from localStorage
- User navigates between steps → Attribution maintained
- Production SSL redirect → No UTM loss

### 2. Hidden Form Fields (Pardot Submission)

All 13 parameters are sent as hidden fields with Pardot-compatible naming:

```tsx
<input type="hidden" name="GCLID" value={attribution.gclid || ''} />
<input type="hidden" name="UTM_Source" value={attribution.utm_source || ''} />
<input type="hidden" name="UTM_Medium" value={attribution.utm_medium || ''} />
<input type="hidden" name="UTM_Campaign" value={attribution.utm_campaign || ''} />
<input type="hidden" name="UTM_Content" value={attribution.utm_content || ''} />
<input type="hidden" name="UTM_Term" value={attribution.utm_term || ''} />
<input type="hidden" name="UTM_Matchtype" value={attribution.utm_matchtype || ''} />
<input type="hidden" name="UTM_Network" value={attribution.utm_network || ''} />
<input type="hidden" name="UTM_Device" value={attribution.utm_device || ''} />
<input type="hidden" name="UTM_Creative" value={attribution.utm_creative || ''} />
<input type="hidden" name="Content_Group" value={attribution.content_group || ''} />
<input type="hidden" name="Li_Fat_Id" value={attribution.li_fat_id || ''} />
<input type="hidden" name="Landing_Language" value={attribution.landing_language || ''} />
```

### 3. API Submission Payload

All parameters are sent to `/api/submit` endpoint:

```typescript
fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify({
        // Form data
        email, firstName, lastName, jobTitle, company, country, phone,
        
        // Attribution (13 fields)
        gclid: attribution.gclid,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        utm_term: attribution.utm_term,
        utm_matchtype: attribution.utm_matchtype,
        utm_network: attribution.utm_network,
        utm_device: attribution.utm_device,
        utm_creative: attribution.utm_creative,
        content_group: attribution.content_group,
        li_fat_id: attribution.li_fat_id,
        landing_language: attribution.landing_language,
        
        // Appointment details
        appointmentDate, appointmentTime, region, ownerEmail, bookingId, meetingLink
    })
})
```

## Google Ads URL Structure

### Auto-Tagging (Recommended)
Enable auto-tagging in Google Ads to automatically append gclid:
```
https://vocalcom.com/fr?gclid={gclid}
```

### Manual Tagging with ValueTrack Parameters
For full granular tracking, use this URL suffix in Google Ads:

```
utm_campaign={campaignid}&utm_content={adgroupid}&utm_creative={creative}&utm_device={device}&utm_network={network}&utm_matchtype={matchtype}&utm_source=google&utm_medium=cpc&utm_term={keyword}&gclid={gclid}
```

**ValueTrack Parameters Explained:**
- `{campaignid}` → Campaign ID (e.g., 123456789)
- `{adgroupid}` → Ad Group ID
- `{creative}` → Ad Creative ID
- `{device}` → m (mobile), c (computer), t (tablet)
- `{network}` → g (Google Search), s (Search Partner), d (Display)
- `{matchtype}` → e (exact), p (phrase), b (broad)
- `{keyword}` → Search keyword that triggered ad
- `{gclid}` → Google Click Identifier

### Example Real URL
```
https://vocalcom.com/fr?utm_campaign=987654321&utm_content=112233445&utm_creative=556677889&utm_device=m&utm_network=g&utm_matchtype=e&utm_source=google&utm_medium=cpc&utm_term=logiciel+centre+contact&gclid=EAIaIQobChMI...
```

## LinkedIn Campaign Manager Setup

Add `li_fat_id={lpurl}?li_fat_id={ad.id}` to your LinkedIn ad URLs:

```
https://vocalcom.com/en?li_fat_id={ad.id}&utm_source=linkedin&utm_medium=paid_social&utm_campaign=q1_2026_campaign
```

## Pardot Form Handler Configuration

### Required Custom Fields in Pardot

Create these fields with **exact External Field Names**:

| Pardot Field Label | External Field Name | Type | Length |
|-------------------|---------------------|------|--------|
| GCLID | GCLID | Text | 255 |
| UTM Source | UTM_Source | Text | 100 |
| UTM Medium | UTM_Medium | Text | 100 |
| UTM Campaign | UTM_Campaign | Text | 255 |
| UTM Content | UTM_Content | Text | 255 |
| UTM Term | UTM_Term | Text | 255 |
| UTM Match Type | UTM_Matchtype | Text | 50 |
| UTM Network | UTM_Network | Text | 50 |
| UTM Device | UTM_Device | Text | 50 |
| UTM Creative | UTM_Creative | Text | 255 |
| Content Group | Content_Group | Text | 100 |
| LinkedIn Fat ID | Li_Fat_Id | Text | 255 |
| Landing Language | Landing_Language | Text | 10 |

### Field Mapping Rules
1. **Always on** - Update on every submission
2. **Sync to SFDC** - Map to Lead/Contact custom fields
3. **Hidden fields** - Don't show in forms

## Salesforce Field Mapping

Map Pardot fields to Salesforce Lead/Contact objects:

### Lead Object Custom Fields
```
- GCLID__c (Text 255)
- UTM_Source__c (Text 100)
- UTM_Medium__c (Text 100)
- UTM_Campaign__c (Text 255)
- UTM_Content__c (Text 255)
- UTM_Term__c (Text 255)
- UTM_Matchtype__c (Text 50)
- UTM_Network__c (Text 50)
- UTM_Device__c (Text 50)
- UTM_Creative__c (Text 255)
- Content_Group__c (Text 100)
- LinkedIn_Fat_ID__c (Text 255)
- Landing_Language__c (Picklist: fr, en, es, pt)
```

## Testing & Validation

### Test URLs by Language

**French:**
```
https://vocalcom.com/fr?utm_source=google&utm_medium=cpc&utm_campaign=test_campaign&utm_term=test_keyword&utm_matchtype=exact&utm_network=search&utm_device=mobile&gclid=test123
```

**English:**
```
https://vocalcom.com/en?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q1_demo&li_fat_id=456789&content_group=call_center
```

**Spanish:**
```
https://vocalcom.com/es/software-call-center?utm_source=facebook&utm_medium=social&utm_campaign=latam_2026&utm_content=video_ad
```

**Portuguese:**
```
https://vocalcom.com/pt/software-call-center?utm_source=google&utm_medium=display&utm_campaign=brazil_awareness
```

### Validation Checklist

1. **Browser Console Logs**
   - Open DevTools → Console
   - Look for: `🌍 Region & Angle detected from UTMs:`
   - Verify all 13 attribution fields are captured

2. **localStorage Inspection**
   - DevTools → Application → Local Storage → https://vocalcom.com
   - Should see: `vocalcom_utm_source`, `vocalcom_gclid`, etc.

3. **Network Tab**
   - DevTools → Network → Filter: `submit`
   - Click on `/api/submit` request
   - Payload tab → Verify all 13 fields present

4. **Pardot Form Handler**
   - Check Pardot → Marketing → Forms → Form Handlers
   - View Submissions → Verify custom fields populated

5. **Salesforce Records**
   - Open Lead/Contact record created from form
   - Scroll to attribution fields
   - All 13 should be populated (if present in URL)

## Common Issues & Solutions

### Issue: UTMs Lost After Page Refresh
**Cause:** Browser cleared localStorage or user in incognito mode  
**Solution:** localStorage automatically saves on first visit. If user is in private browsing, UTMs must remain in URL throughout session.

### Issue: Empty Fields in Salesforce
**Cause:** Field mapping not configured in Pardot  
**Solution:** 
1. Go to Pardot → Admin → Configure Fields
2. For each custom field, click Edit
3. Under "Field Mappings" tab, map to Salesforce Lead/Contact fields
4. Enable "Always sync" option

### Issue: GCLID Not Captured
**Cause:** Google Ads auto-tagging disabled  
**Solution:**
1. Google Ads → Settings → Account Settings
2. Enable "Auto-tagging"
3. Or manually add `gclid={gclid}` to URL suffix

### Issue: Localhost Works, Production Fails
**Cause:** SSL redirect or CDN stripping query parameters  
**Solution:** localStorage persistence (already implemented) solves this. UTMs saved before any redirect.

### Issue: Multiple Form Submissions Overwrite Attribution
**Cause:** Using "always update" instead of "first touch" in Salesforce  
**Solution:** 
1. Create formula fields for "First Touch" attribution
2. Use `ISBLANK(First_Touch_Source__c)` to preserve initial values
3. Current implementation updates on every submit (last touch)

## Best Practices

### 1. Consistent Naming
- Always use lowercase for utm parameters
- Use underscores for multi-word values: `utm_campaign=q1_demo_2026`
- Avoid special characters except hyphen and underscore

### 2. Campaign Taxonomy
```
utm_source=<platform>
utm_medium=<channel_type>
utm_campaign=<period>_<region>_<goal>
utm_content=<variation>
utm_term=<keyword>
```

Example: `google/cpc/q1_2026_france_demo/variation_a/logiciel+crm`

### 3. Attribution Window
- Default: 90 days in localStorage
- Can be adjusted by clearing `vocalcom_*` keys after X days
- Consider implementing cookie expiry if needed

### 4. Data Privacy (GDPR)
- UTM parameters are not personal data
- GCLID and li_fat_id are pseudonymous identifiers
- Include in privacy policy: "We collect marketing attribution data"
- No consent required for legitimate interest (B2B marketing)

## GTM Integration (Optional)

While React handles form submission, GTM is still useful for:

### GA4 Events
```javascript
// Track form step completion
dataLayer.push({
    'event': 'form_step_completed',
    'form_step': 3,
    'utm_source': attribution.utm_source,
    'utm_campaign': attribution.utm_campaign
});
```

### Google Ads Enhanced Conversions
```javascript
// Send conversion with attribution
gtag('event', 'conversion', {
    'send_to': 'AW-123456789/abc123',
    'value': 1.0,
    'currency': 'EUR',
    'transaction_id': bookingId,
    'gclid': attribution.gclid
});
```

## Monitoring & Analytics

### Key Metrics to Track

1. **Attribution Coverage** - % of leads with attribution data
2. **Top UTM Sources** - Which channels drive most conversions
3. **Device Performance** - Desktop vs mobile conversion rates
4. **Match Type ROI** - Exact vs phrase vs broad performance
5. **Network Performance** - Search vs Display effectiveness

### Salesforce Reports

Create reports with these fields:
- Lead Source (Campaign Name)
- UTM Campaign → Group by campaign
- UTM Device → Filter by mobile/desktop
- UTM Network → Compare search vs display
- Landing Language → Regional performance

## Next Steps

1. ✅ **Phone validation by country** - Already implemented
2. ✅ **localStorage persistence** - Already implemented
3. ✅ **13 attribution parameters** - Already implemented
4. ⏳ **Pardot field mapping** - Admin task (see above)
5. ⏳ **Salesforce custom fields** - Admin task (see above)
6. ⏳ **Google Ads URL suffix** - Marketing team task
7. ⏳ **LinkedIn campaign URLs** - Marketing team task
8. 🔄 **Test end-to-end** - Submit test forms with full UTMs

## Support & Documentation

- **Pardot Forms:** https://help.salesforce.com/s/articleView?id=sf.pardot_forms_overview.htm
- **Google Ads Auto-tagging:** https://support.google.com/google-ads/answer/3095550
- **ValueTrack Parameters:** https://support.google.com/google-ads/answer/6305348
- **LinkedIn Campaign Manager:** https://www.linkedin.com/help/lms/answer/a419945
