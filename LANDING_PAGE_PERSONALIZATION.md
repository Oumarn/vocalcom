# Landing Page Personalization System

## Overview

This system enables **one landing page** to serve **24 different Google Ads ad groups** with personalized messaging, without creating 24 separate pages. It uses UTM parameters from Google Ads campaigns to detect:

1. **Intent** - The buyer's stage (category, problem, competitor, integration, brand)
2. **Angle** - The persona/narrative (ops, cx, ai, automation, reporting, CRM platforms, competitors, etc.)
3. **Region** - Sales team routing (already implemented)

## Architecture

### Detection Layer (`/lib/region-resolver.ts`)

Three core detection functions:

```typescript
resolveIntentFromUTM(utm: UTM): IntentType
resolveAngleFromUTM(utm: UTM): AngleType  
resolveRegionFromUTM(utm: UTM): RegionKey // Already existing
```

**How Intent Detection Works:**
- Extracts from campaign naming: `"GA | EN Europe | EN | Problem | CX Platform"` → `intent=problem`
- Direct parameter: `?intent=competitor` (overrides campaign detection)
- Default: `category`

**How Angle Detection Works:**
- Pattern matching across `utm_campaign`, `utm_content`, `utm_term`
- Priority: Competitors → CRM platforms → Problem/persona angles
- Examples:
  - `"Genesys Alternative"` → `angle=genesys`
  - `"Salesforce Integration"` → `angle=salesforce`
  - `"Operational Performance – Ops"` → `angle=ops`
- Fallback by intent: `problem→ops`, `competitor→enterprise`, `integration→crm`, `brand/category→ai`

### Content Layer (`/lib/region-resolver.ts`)

Three helper functions return personalized content:

```typescript
getLandingPageVariant(intent, angle) // Returns hero, subHero, CTA, section order
getSectionCopy(angle)                 // Returns headline, body, proof line, case study intro
getFormCopy(angle)                    // Returns form title, supporting line, button CTA, trust microcopy
```

### UI Layer (React Components)

#### 1. `DynamicHero` (`/app/components/landing/DynamicHero.tsx`)
- Detects intent and angle on mount
- Switches hero headline and sub-headline
- Adjusts CTA text per intent
- Shows reassurance/value reinforcement for competitor/integration variants

**Usage:**
```tsx
import DynamicHero from '@/components/landing/DynamicHero';

<DynamicHero defaultIntent="category" defaultAngle="ai" />
```

#### 2. `DynamicSections` (`/app/components/landing/DynamicSections.tsx`)
- Detects angle on mount
- Switches section headline, body, proof line
- Personalizes case study intro and description
- Maintains consistent visual structure

**Usage:**
```tsx
import DynamicSections from '@/components/landing/DynamicSections';

<DynamicSections defaultAngle="ai" />
```

#### 3. `DynamicFormSection` (`/app/components/landing/DynamicFormSection.tsx`)
- Detects angle on mount
- Switches form title, supporting line, button CTA, trust microcopy
- Wraps existing `DemoForm` component
- Passes custom button text to form

**Usage:**
```tsx
import DynamicFormSection from '@/components/landing/DynamicFormSection';

<DynamicFormSection defaultFormTitle="Request a Demo" />
```

## URL Parameter Logic

### Google Ads Campaign Structure

**Campaign naming:** `GA | {Region} | {Language} | {Intent} | {Offer}`

Examples:
- `GA | EN Europe | EN | Category | CX Platform`
- `GA | FR Core | FR | Problem | CX Platform`
- `GA | EN Europe | EN | Competitor | CX Platform`
- `GA | EN Europe | EN | Integration | Salesforce`
- `GA | EN Europe | EN | Brand | Vocalcom`

### URL Parameters (Optional Overrides)

You can manually override detection with direct parameters:

```
?intent=problem&angle=ops
?intent=competitor&angle=genesys
?intent=integration&angle=salesforce
```

### Complete URL Examples

**Category (AI-first):**
```
https://ai.vocalcom.com/en?utm_campaign=GA+|+EN+Europe+|+EN+|+Category+|+CX+Platform&utm_source=google&utm_medium=cpc
```

**Problem-led (Ops persona):**
```
https://ai.vocalcom.com/en?utm_campaign=GA+|+EN+Europe+|+EN+|+Problem+|+CX+Platform&utm_content=Operational+Performance+Ops&intent=problem&angle=ops
```

**Competitor (Genesys):**
```
https://ai.vocalcom.com/en?utm_campaign=GA+|+EN+Europe+|+EN+|+Competitor+|+CX+Platform&utm_term=genesys+alternative&intent=competitor&angle=genesys
```

**Integration (Salesforce):**
```
https://ai.vocalcom.com/en?utm_campaign=GA+|+EN+Europe+|+EN+|+Integration+|+Salesforce&intent=integration&angle=salesforce
```

## Content Variants

### Intent-Based Hero Copy

| Intent | Hero | Sub-Hero | CTA |
|--------|------|----------|-----|
| **category/brand** | AI-First Contact Center Platform for Enterprise CX | Unify AI agents and human teams across all channels... | Request a Demo |
| **problem (ops)** | Fix Contact Center Performance Without Disrupting Operations | Reduce costs, improve agent productivity... | See How It Works |
| **problem (cx)** | Transform Customer Experience Across Every Touchpoint | Enable consistent, personalized customer journeys... | See How It Works |
| **competitor** | A Modern Alternative to Genesys, Five9 & Talkdesk | Switch to an AI-native contact center platform... | Compare Platforms |
| **integration** | Your Contact Center, Natively Integrated With Your CRM | Connect voice and digital channels directly... | See CRM Integrations |

### Angle-Based Section Copy

| Angle | Section Headline | Proof Line |
|-------|------------------|------------|
| **ops** | Operational Performance You Can Control — in Real Time | Customers reduce costs by up to €280k within the first year |
| **cx** | Transform Customer Experience Across Every Touchpoint | Organizations see measurable improvements in CSAT, NPS, and retention |
| **ai** | Practical AI That Works With Your Teams — Not Instead of Them | Customers generate up to +35% additional revenue through AI |

### Angle-Based Form Copy

| Angle | Form Title | Button CTA |
|-------|------------|------------|
| **ops/automation/reporting** | See How to Improve Contact Center Performance | See Performance Gains |
| **cx/enterprise/omnichannel** | Discover How to Transform Your Customer Experience | Explore CX Transformation |
| **ai** | See AI Agents in Action — Applied to Real CX Use Cases | See AI in Action |
| **competitors** | Compare Platforms & See the Difference | Compare Solutions |

## Section Ordering Strategy

### Default (Category/Brand/AI)
1. Hero
2. Social Proof (logo billboard)
3. AI Vision section
4. Platform overview
5. Integrations
6. Case Studies
7. Security & Compliance
8. Final CTA + Form

### Problem-led (Ops/Automation/Reporting)
1. Hero
2. Social Proof
3. **Ops section** (prioritized)
4. Metrics/Reporting
5. Automation
6. AI as enabler (secondary)
7. Integrations
8. Case Studies
9. Security
10. Final CTA + Form

### Problem-led (CX-focused)
1. Hero
2. Social Proof
3. **CX section** (prioritized)
4. Omnichannel capabilities
5. AI collaboration (secondary)
6. Integrations
7. Case Studies
8. Security
9. Final CTA + Form

### Competitor
1. Hero (with reassurance)
2. Social Proof
3. **Switching section** (migration ease)
4. **Comparison table**
5. ROI calculator
6. Flexibility/no lock-in
7. Integrations
8. Case Studies
9. Security
10. Final CTA + Form

### Integration
1. Hero (with value reinforcement)
2. Social Proof
3. **CRM integrations showcase**
4. Business value of integration
5. Platform overview
6. Case Studies
7. Security
8. Final CTA + Form

## Implementation Example

### Full Landing Page Setup

```tsx
// /app/ai/page.tsx
import DynamicHero from '@/components/landing/DynamicHero';
import DynamicSections from '@/components/landing/DynamicSections';
import DynamicFormSection from '@/components/landing/DynamicFormSection';
import LogoBillboard from '@/components/Home/LogoBillboard';
import Integrations from '@/components/Home/Integrations';
import SecurityCompliance from '@/components/Home/SecurityCompliance';

export default function AiLandingPage() {
  return (
    <main>
      <DynamicHero />
      <LogoBillboard content={content.logoBillboard} />
      <DynamicSections />
      <Integrations content={content.integrations} />
      <SecurityCompliance content={content.security} />
      
      <section className="py-20 bg-gradient-to-br from-violet-50 to-blue-50">
        <DynamicFormSection />
      </section>
    </main>
  );
}
```

### Testing Different Personas

```bash
# Test AI-first variant
http://localhost:3000/ai?intent=category&angle=ai

# Test Ops persona
http://localhost:3000/ai?intent=problem&angle=ops

# Test CX persona
http://localhost:3000/ai?intent=problem&angle=cx

# Test competitor (Genesys)
http://localhost:3000/ai?intent=competitor&angle=genesys

# Test Salesforce integration
http://localhost:3000/ai?intent=integration&angle=salesforce
```

## Google Ads Campaign Mapping

### 24 Ad Groups → 4 Landing Page Variants

| Campaign Type | Ad Groups | Intent | Primary Angles | Landing Page Variant |
|---------------|-----------|--------|----------------|---------------------|
| **Category** | AI Platform, Contact Center, Omnichannel, Enterprise | category | ai, cx, enterprise, omnichannel | Category/Brand |
| **Problem** | Ops Performance, Reporting, Automation, CX Quality | problem | ops, automation, reporting, cx | Problem-led |
| **Competitor** | Genesys, Five9, Talkdesk, Odigo | competitor | genesys, five9, talkdesk, odigo | Competitor |
| **Integration** | Salesforce, Dynamics, HubSpot, Zendesk, Zoho | integration | salesforce, dynamics, hubspot, zendesk, zoho | Integration |
| **Brand** | Vocalcom Brand Terms | brand | ai, enterprise | Category/Brand |

**Result:** One codebase, 4 visual variants, 24 personalized experiences

## Analytics & Tracking

### GTM DataLayer Events

Add to each component's useEffect:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'landing_page_personalization',
  intent: detectedIntent,
  angle: detectedAngle,
  region: detectedRegion
});
```

### Conversion Tracking by Intent+Angle

Track form submissions with context:

```javascript
// In booking success
window.dataLayer.push({
  event: 'demo_booked',
  intent: intent,
  angle: angle,
  region: region,
  ownerEmail: ownerEmail
});
```

## 90-Day Split Testing Roadmap

### Phase 1 (Days 1-30): Validate Core Personalization
- **Test:** Intent detection accuracy
- **Measure:** Do users engage more with personalized hero copy?
- **KPIs:** Time on page, scroll depth, form start rate
- **Action:** Refine pattern matching if detection < 90% accurate

### Phase 2 (Days 31-60): Optimize Angle Mapping
- **Test:** Section ordering impact per angle
- **Measure:** Do Ops personas engage more when Ops section is first?
- **KPIs:** Section engagement, heatmaps, form completion rate
- **Action:** A/B test section order (default vs persona-first)

### Phase 3 (Days 61-90): Form Copy Optimization
- **Test:** Button CTA variants per angle
- **Measure:** Does "See Performance Gains" convert better for Ops than "Request a Demo"?
- **KPIs:** Form submission rate, booking completion rate
- **Action:** Run multivariate test on form copy combinations

### Success Metrics
- **Baseline:** Current landing page conversion rate
- **Target:** +20-35% improvement in qualified demo bookings
- **Attribution:** Track conversions by intent+angle in CRM

## Troubleshooting

### Intent/Angle Not Detected

**Check console logs:**
```javascript
// Look for:
🎯 Landing Page Personalization: { intent: 'problem', angle: 'ops', utmCampaign: '...' }
```

**Common issues:**
- UTM parameters not present in URL
- Campaign naming structure doesn't match expected format
- Pattern matching not finding keywords

**Solution:** Use direct parameters as override
```
?intent=problem&angle=ops
```

### Wrong Content Displaying

**Debug mode:**
- Development mode shows intent/angle in bottom-right corner
- Check browser console for detection logs

**Content hierarchy:**
1. Direct parameters (`?intent=` and `?angle=`)
2. Pattern matching in UTM fields
3. Fallback defaults

### Form Not Showing Custom Button Text

**Check:**
- `DynamicFormSection` is wrapping `DemoForm`
- `customButtonText` prop is passed to `DemoForm`
- `getFormCopy(angle)` returns expected text

## Next Steps

1. **Create additional sections** for each angle (Ops section, CX section, Competitor comparison)
2. **Implement section ordering logic** based on angle priority
3. **Add more granular case studies** per angle (Ops success stories, CX transformations, etc.)
4. **Build competitor comparison tables** for competitor variant
5. **Create CRM integration showcase** for integration variant
6. **Set up GTM tracking** for intent/angle attribution
7. **Run A/B tests** on hero copy variations
8. **Monitor conversion rates** by intent+angle combination

## Files Modified/Created

### New Components
- `/app/components/landing/DynamicHero.tsx` - Personalized hero section
- `/app/components/landing/DynamicSections.tsx` - Personalized content sections
- `/app/components/landing/DynamicFormSection.tsx` - Personalized form wrapper

### Extended Files
- `/lib/region-resolver.ts` - Added intent/angle detection + content helpers

### Updated Files
- `/app/components/forms/DemoForm.tsx` - Added `customButtonText` prop + angle detection

### New Pages
- `/app/ai/page.tsx` - Example implementation of dynamic landing page

### Documentation
- `/LANDING_PAGE_PERSONALIZATION.md` - This file

## Support

For questions or issues with the landing page personalization system, check:
1. Console logs (🎯 emoji indicates personalization events)
2. Development mode debug display (bottom-right corner)
3. This documentation
4. `/lib/region-resolver.ts` source code for detection logic
