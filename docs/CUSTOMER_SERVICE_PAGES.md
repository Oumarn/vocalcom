# Customer Service Landing Pages

## Overview
Multi-language landing pages for **Customer Service Software** product, created in 4 languages following the same architecture as the existing Call Center pages.

## Live Routes

### French
- **URL**: `/fr/logiciel-service-client`
- **Title**: Logiciel Service Client Omnicanal pour Expériences Client Performantes
- **Content File**: `content/customer-service.fr.ts`

### English  
- **URL**: `/en/customer-service-software`
- **Title**: Omnichannel Customer Service Software for Modern Support Teams
- **Content File**: `content/customer-service.en.ts`

### Spanish
- **URL**: `/es/software-atencion-cliente`
- **Title**: Software de Atención al Cliente Omnicanal para Equipos Modernos
- **Content File**: `content/customer-service.es.ts`

### Portuguese
- **URL**: `/pt/software-atendimento-cliente`
- **Title**: Software de Atendimento ao Cliente Omnicanal para Equipas Modernas
- **Content File**: `content/customer-service.pt.ts`

## Architecture

### Reusable Component
All 4 pages use the same `CallCenterPage.tsx` component with language-specific content:

```typescript
// Example: app/fr/logiciel-service-client/page.tsx
import { CallCenterPage } from "@/app/components/CallCenterPage";
import { customerServiceFR } from "@/content/customer-service.fr";

export const metadata = {
  title: customerServiceFR.meta.title,
  description: customerServiceFR.meta.description,
  keywords: customerServiceFR.meta.keywords
};

export default function LogicielServiceClientPage() {
  return <CallCenterPage content={customerServiceFR} />;
}
```

### Content Structure (CallCenterContent Type)
Each content file follows strict TypeScript interface with these sections:

#### 1. Meta
```typescript
meta: {
  title: string;
  description: string;
  keywords: string;
}
```

#### 2. Hero
```typescript
hero: {
  title: string;
  subtitle: string;
  benefits: string[];
  formTitle: string;
  formSubtitle: string;
  formButtonText: string;
}
```

#### 3. Results
```typescript
results: {
  title: string;
  subtitle: string;
  metrics: Array<{ metric: string; label: string; }>;
  disclaimer: string;
}
```

#### 4. Solution Features
```typescript
solution: {
  title: string;
  subtitle: string;
  features: Array<{
    badge: { emoji: string; label: string; };
    title: string;
    description: string;
    items: string[];
    objective: string;
    visual: {
      type: "screenshot" | "ai-assistant" | "workflow";
      // Type-specific fields
    };
  }>;
}
```

**Customer Service Features** (with emojis):
1. 💬 **Omnicanal** - Centralize all interactions
2. 🤖 **IA** - AI for improved productivity
3. 📊 **Analytics** - Supervision and performance
4. 🏢 **Enterprise** - Designed for large teams

#### 5. Salesforce Integration
```typescript
salesforce: {
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  quote: string;
  image: string;
  imageAlt: string;
  appExchange: { label: string; value: string; };
}
```

#### 6. Security
```typescript
security: {
  title: string;
  subtitle: string;
  certifications: Array<{ logo: string; title: string; }>;
  features: Array<{
    icon: string; // emoji
    color: string;
    title: string;
    description: string;
  }>;
}
```

**Certifications Used**:
- AICPA SOC 2 Type II
- GDPR Compliant
- ISO/IEC 27001:2022

#### 7. Integrations
```typescript
integrations: {
  badge: string;
  title: string;
  subtitle: string;
  count: string; // e.g., "+200"
  countLabel: string; // e.g., "integrations available"
}
```

#### 8. Customer Logos
```typescript
customerLogos: {
  badge: string;
  title: string;
}
```

#### 9. Use Cases
```typescript
useCases: {
  title: string;
  subtitle: string;
  cases: string[]; // Simple array of use case names
}
```

**Customer Service Use Cases**:
- Multichannel customer support
- After-sales service
- Technical assistance
- BPO customer service
- Sales and qualification
- Public sector hotlines

#### 10. Testimonials
```typescript
testimonials: {
  badge: string;
  title: string;
  subtitle: string;
  items: Array<{
    company: string;
    industry: string;
    logo: string;
    quote: string;
    author: string;
    role: string;
    stats: Array<{ label: string; value: string; }>;
    color: string;
  }>;
}
```

#### 11. Final CTA
```typescript
finalCta: {
  title: string;
  subtitle: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}
```

## Key Differentiators from Call Center Pages

### Content Focus
- **Call Center**: High-volume contact center operations, agent productivity, omnichannel routing
- **Customer Service**: Customer experience, support quality, satisfaction metrics, after-sales service

### Target Audience
- **Call Center**: Large contact centers, BPOs, telemarketing teams
- **Customer Service**: Support teams, helpdesk operations, after-sales service departments

### Metrics Emphasized
- **Call Center**: Call volume, AHT, agent utilization
- **Customer Service**: Customer satisfaction, CSAT scores, resolution time

### Visual Examples
Both use the same visual component types but with customer service-focused screenshots and workflows.

## Attribution & Tracking
All pages include comprehensive attribution tracking with 13 parameters:
- 10 Google Ads parameters (gclid, utm_source, utm_medium, utm_campaign, utm_content, utm_term, utm_matchtype, utm_network, utm_device, utm_creative)
- 1 LinkedIn parameter (li_fat_id)  
- 2 internal parameters (content_group, landing_language)

See `ATTRIBUTION_TRACKING.md` for complete details.

## Phone Validation
Forms include country-specific phone validation for 12+ countries with auto-formatting.
See `PHONE_VALIDATION.md` for supported formats.

## SEO Optimization
Each page has unique:
- Title optimized for search ("Logiciel Service Client", "Customer Service Software", etc.)
- Meta description highlighting omnichannel capabilities and modern support
- Keywords targeting customer service, support platform, helpdesk, service management

## Build Information
- **Build Status**: ✅ Successful
- **Total Routes**: 22 (18 existing + 4 new customer service pages)
- **TypeScript**: Strict type checking passed
- **Generation Time**: ~1.5s compilation, ~400ms static generation per page

## Testing Checklist
- [x] French page renders correctly
- [x] English page renders correctly
- [x] Spanish page renders correctly
- [x] Portuguese page renders correctly
- [x] Form submission works with attribution tracking
- [x] Phone validation works for all supported countries
- [x] Metadata (title, description) correct for each language
- [x] Build generates all 4 routes successfully
- [x] TypeScript compilation passes with no errors

## Future Enhancements
- Add real customer logos instead of placeholders
- Create customer-specific testimonials with actual company data
- Add case study pages for detailed success stories
- Implement A/B testing for CTA button variations
- Add video testimonials section
