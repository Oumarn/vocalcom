# Simplified Booking Flow - Implementation Guide

## Current Issues
- Multiple `calendlyUrl` updates (UTM → locale → country)
- Race conditions between `calendly.event_scheduled` and `beforeunload`
- Complex listener management
- `showCalendly` state triggers re-renders
- localStorage persistence causing confusion

## Simplified Architecture (Option A)

### Flow
```
1. User fills 3-step form
2. User clicks "Book Demo" → Form submits to Pardot immediately
3. Pardot receives lead with all UTM data
4. Redirect user to Calendly URL (determined once, never changes)
5. User books meeting in Calendly
6. Calendly redirects back to /thank-you page
```

### Key Changes

#### 1. Single Routing Function
```typescript
const determineCalendlyUrl = (): string => {
  // Priority 1: UTM override
  const utmRegion = resolveRegionFromUTM(attribution, locale);
  if (utmRegion) {
    return getCalendlyConfig(utmRegion).eventUrl;
  }
  
  // Priority 2: Country (if provided)
  if (formData.country) {
    const countryName = getCountryName(formData.country, locale);
    return getCalendlyConfigByCountry(countryName).eventUrl;
  }
  
  // Priority 3: Language fallback
  const localeMap = { fr: 'france_core', es: 'spain', pt: 'portugal', en: 'france_core' };
  return getCalendlyConfig(localeMap[locale] || 'france_core').eventUrl;
};
```

#### 2. Simplified Submit Handler
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateStep(3)) return;
  
  setIsSubmitting(true);
  
  // Submit to Pardot immediately
  await submitToPardot(formData, attribution);
  
  // Determine Calendly URL once
  const calendlyUrl = determineCalendlyUrl();
  
  // Build prefilled Calendly URL
  const prefilled = new URLSearchParams({
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    a1: formData.company, // Custom question 1
    a2: formData.phone,   // Custom question 2
  });
  
  // Redirect to Calendly
  window.location.href = `${calendlyUrl}?${prefilled.toString()}`;
};
```

#### 3. No More Listeners
- ❌ Remove `useEffect` with `showCalendly` dependency
- ❌ Remove `window.addEventListener('message')`
- ❌ Remove `beforeunload` listener
- ❌ Remove localStorage form data (only keep UTM params)

#### 4. Pardot Submission (Fire-and-Forget)
```typescript
const submitToPardot = async (formData, attribution) => {
  const pardotUrl = 'https://go.vocalcom.com/l/1029911/2026-01-04/363cd';
  
  const pardotFields = {
    email: formData.email,
    first_name: formData.firstName,
    last_name: formData.lastName,
    company: formData.company,
    phone: `${phonePrefix}${formData.phone}`,
    country: formData.country,
    job_title: formData.jobTitle,
    // UTM fields
    ...attribution,
  };
  
  const body = new URLSearchParams(pardotFields);
  
  await fetch(pardotUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    mode: 'no-cors',
  });
};
```

#### 5. Calendly Configuration
In Calendly settings:
- Set "What happens after a booking?" → **Redirect to URL**
- URL: `https://ai.vocalcom.com/thank-you`
- This eliminates the need to listen for `event_scheduled` messages

### Benefits
✅ **No race conditions** - Pardot submits before redirect  
✅ **No duplicate submissions** - Only one Pardot call  
✅ **No complex listeners** - Calendly handles redirect  
✅ **Deterministic routing** - URL decided once  
✅ **Simpler debugging** - Linear flow  
✅ **No localStorage pollution** - Only UTM params persist  

### Migration Steps
1. Update Calendly accounts to redirect to `/thank-you`
2. Implement `determineCalendlyUrl()` function
3. Update `handleSubmit` to call Pardot then redirect
4. Remove all `useEffect` listeners
5. Remove `showCalendly` state
6. Test with each region's Calendly link

### Testing
- ✅ UTM routing: `?utm_campaign=france_demo`
- ✅ Country routing: Select Morocco → vocalcom-africa
- ✅ Locale fallback: Spanish page → vocalcom-spain
- ✅ Pardot receives lead before booking
- ✅ Calendly redirects to thank-you after booking
