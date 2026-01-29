# Campaign Routing Test Results

## Test Each Campaign with Form

### How to Test
1. Navigate to: `http://localhost:3000/?utm_campaign=[CAMPAIGN_NAME]`
2. Fill out the demo form (3 steps)
3. Check console logs for: `[DemoForm] Routing via UTM: [REGION]`
4. Verify the correct Calendly team URL is selected

---

## Campaign → Region Mapping

| Campaign | Expected Region | Calendly Team | Test URL |
|----------|----------------|---------------|----------|
| `GA \| SPAIN \| ES \| Categoría \| Plataforma de Contact Center` | **es_latam** → spain | vocalcom-spain | `http://localhost:3000/?utm_campaign=GA%20%7C%20SPAIN%20%7C%20ES%20%7C%20Categoría%20%7C%20Plataforma%20de%20Contact%20Center` |
| `GA \| EN MEA \| EN \| Category \| Contact Center #1` | **mea_english** → mea | vocalcom-mea | `http://localhost:3000/?utm_campaign=GA%20%7C%20EN%20MEA%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center%20%231` |
| `GA \| AFRICA \| FR \| Categorie \| Plataforma de Contact Center` | **africa_francophone** → africa | vocalcom-africa | `http://localhost:3000/?utm_campaign=GA%20%7C%20AFRICA%20%7C%20FR%20%7C%20Categorie%20%7C%20Plataforma%20de%20Contact%20Center` |
| `GA \| FRANCE \| FR` | **france_core** → france_core | vocalcom-france | `http://localhost:3000/?utm_campaign=GA%20%7C%20FRANCE%20%7C%20FR` |
| `GA \| SPAIN \| ES \| Coeur Metier` | **es_latam** → spain | vocalcom-spain | `http://localhost:3000/?utm_campaign=GA%20%7C%20SPAIN%20%7C%20ES%20%7C%20Coeur%20Metier` |
| `GA \| FRANCE \| FR \| Coeur Metier` | **france_core** → france_core | vocalcom-france | `http://localhost:3000/?utm_campaign=GA%20%7C%20FRANCE%20%7C%20FR%20%7C%20Coeur%20Metier` |
| `GA \| AFRICA \| FR` | **africa_francophone** → africa | vocalcom-africa | `http://localhost:3000/?utm_campaign=GA%20%7C%20AFRICA%20%7C%20FR` |
| `GA \| LATAM \| Mexico y Colombia \| ES \| Categoría \| Plataforma de Contact Center` | **es_latam** → latam | vocalcom-latam | `http://localhost:3000/?utm_campaign=GA%20%7C%20LATAM%20%7C%20Mexico%20y%20Colombia%20%7C%20ES%20%7C%20Categoría%20%7C%20Plataforma%20de%20Contact%20Center` |
| `GA \| FRANCE \| VOCALCOM \| FR` | **france_core** → france_core | vocalcom-france | `http://localhost:3000/?utm_campaign=GA%20%7C%20FRANCE%20%7C%20VOCALCOM%20%7C%20FR` |
| `GA \| LATAM \| ES \| Categoría \| Plataforma de Contact Center` | **es_latam** → latam | vocalcom-latam | `http://localhost:3000/?utm_campaign=GA%20%7C%20LATAM%20%7C%20ES%20%7C%20Categoría%20%7C%20Plataforma%20de%20Contact%20Center` |
| `GA \| FRANCE \| FR CORE \| Category \| Contact Center` | **france_core** → france_core | vocalcom-france | `http://localhost:3000/?utm_campaign=GA%20%7C%20FRANCE%20%7C%20FR%20CORE%20%7C%20Category%20%7C%20Contact%20Center` |
| `GA \| FRANCE \| FR Core \| Brand \| Demo` | **france_core** → france_core | vocalcom-france | `http://localhost:3000/?utm_campaign=GA%20%7C%20FRANCE%20%7C%20FR%20Core%20%7C%20Brand%20%7C%20Demo` |
| `GA \| AFRICA \| EN \| Category \| Contact Center` | **africa_english** → africa | vocalcom-africa | `http://localhost:3000/?utm_campaign=GA%20%7C%20AFRICA%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center` |
| `GA \| NORTH EUROPE \| EN \| Category \| Contact Center` | **en_europe** → france_core | vocalcom-france | `http://localhost:3000/?utm_campaign=GA%20%7C%20NORTH%20EUROPE%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center` |
| `GA \| AFRICA \| FR \| Category \| Contact Center` | **africa_francophone** → africa | vocalcom-africa | `http://localhost:3000/?utm_campaign=GA%20%7C%20AFRICA%20%7C%20FR%20%7C%20Category%20%7C%20Contact%20Center` |
| `GA \| LATAM \| ES \| Categoría \| Contact Center` | **es_latam** → latam | vocalcom-latam | `http://localhost:3000/?utm_campaign=GA%20%7C%20LATAM%20%7C%20ES%20%7C%20Categoría%20%7C%20Contact%20Center` |
| `GA \| EN MEA \| EN \| Category \| Contact Center` | **mea_english** → mea | vocalcom-mea | `http://localhost:3000/?utm_campaign=GA%20%7C%20EN%20MEA%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center` |
| `GA \| LATAM \| ES I ARGENTINA` | **es_latam** → latam | vocalcom-latam | `http://localhost:3000/?utm_campaign=GA%20%7C%20LATAM%20%7C%20ES%20I%20ARGENTINA` |

---

## Region to Calendly URL Mapping

The code maps internal regions to Calendly teams:

```typescript
// In DemoForm.tsx - needs to map RegionKey → CalendlyRegion

RegionKey              → CalendlyRegion    → Calendly URL
─────────────────────────────────────────────────────────────────────────
france_core            → france_core        → calendly.com/vocalcom-france/demo-vocalcom
africa_francophone     → africa             → calendly.com/vocalcom-africa/demo-vocalcom
africa_english         → africa             → calendly.com/vocalcom-africa/demo-vocalcom
en_europe              → france_core        → calendly.com/vocalcom-france/demo-vocalcom
mea_english            → mea                → calendly.com/vocalcom-mea/new-meeting
es_latam (Spain)       → spain              → calendly.com/vocalcom-spain/demo-vocalcom
es_latam (LATAM)       → latam              → calendly.com/vocalcom-latam/new-meeting
brazil_pt              → latam              → calendly.com/vocalcom-latam/new-meeting
```

**Issue Found:** The region-resolver returns `RegionKey` types but `calendly-config` uses different region names. Need to add a mapping function.

---

## Fix Required in DemoForm.tsx

Current code issue:
```typescript
// resolveRegionFromUTM returns: "france_core" | "africa_francophone" | "mea_english" etc.
// But getCalendlyConfig expects: "france_core" | "africa" | "mea" | "spain" | "latam"
```

Need to add mapping:
```typescript
const mapRegionToCalendly = (region: RegionKey): CalendlyRegion => {
  const mapping: Record<RegionKey, CalendlyRegion> = {
    france_core: 'france_core',
    africa_francophone: 'africa',
    africa_english: 'africa',
    en_europe: 'france_core',
    mea_english: 'mea',
    es_latam: 'latam', // or 'spain' based on country
    brazil_pt: 'latam'
  };
  return mapping[region] || 'france_core';
};
```

---

## Testing Checklist

For each campaign:
- [ ] Copy test URL
- [ ] Open in browser
- [ ] Open browser console (F12)
- [ ] Fill form to step 3
- [ ] Look for log: `[DemoForm] Routing via UTM: [REGION]`
- [ ] Verify it matches expected region in table above
- [ ] Click "Book Demo" button
- [ ] Verify correct Calendly team calendar loads

---

## Quick Test (All Campaigns)

```bash
# Start dev server
npm run dev

# Test Spain
open "http://localhost:3000/?utm_campaign=GA%20%7C%20SPAIN%20%7C%20ES%20%7C%20Categoría%20%7C%20Plataforma%20de%20Contact%20Center"

# Test MEA
open "http://localhost:3000/?utm_campaign=GA%20%7C%20EN%20MEA%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center"

# Test Africa FR
open "http://localhost:3000/?utm_campaign=GA%20%7C%20AFRICA%20%7C%20FR%20%7C%20Category%20%7C%20Contact%20Center"

# Test Africa EN
open "http://localhost:3000/?utm_campaign=GA%20%7C%20AFRICA%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center"

# Test LATAM
open "http://localhost:3000/?utm_campaign=GA%20%7C%20LATAM%20%7C%20ES%20%7C%20Categoría%20%7C%20Contact%20Center"

# Test France
open "http://localhost:3000/?utm_campaign=GA%20%7C%20FRANCE%20%7C%20FR"

# Test North Europe
open "http://localhost:3000/?utm_campaign=GA%20%7C%20NORTH%20EUROPE%20%7C%20EN%20%7C%20Category%20%7C%20Contact%20Center"
```

---

## Console Logs to Watch

When form loads:
```
[DemoForm] Detected region from UTM: france_core
[DemoForm] Calendly config for region: { eventUrl: "https://calendly.com/vocalcom-france/demo-vocalcom", ... }
```

When country selected (step 3):
```
[DemoForm] Country selected: Morocco
[DemoForm] Calendly config for country: { eventUrl: "https://calendly.com/vocalcom-africa/demo-vocalcom", ... }
```

This helps verify the routing logic is working correctly at each stage.
