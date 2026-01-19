# Landing Page Personalization - Test URLs

## Quick Test Links

### Test on localhost:3000

#### 1. Category/Brand Variant (AI-first)
```
http://localhost:3000/ai?intent=category&angle=ai
```
**Expected:**
- Hero: "AI-First Contact Center Platform for Enterprise CX"
- Section: Practical AI That Works With Your Teams
- Form: "See AI Agents in Action"

#### 2. Problem-led Variant (Ops Persona)
```
http://localhost:3000/ai?intent=problem&angle=ops
```
**Expected:**
- Hero: "Fix Contact Center Performance Without Disrupting Operations"
- Section: Operational Performance You Can Control
- Form: "See How to Improve Contact Center Performance" / Button: "See Performance Gains"

#### 3. Problem-led Variant (CX Persona)
```
http://localhost:3000/ai?intent=problem&angle=cx
```
**Expected:**
- Hero: "Transform Customer Experience Across Every Touchpoint"
- Section: Transform Customer Experience Across Every Touchpoint
- Form: "Discover How to Transform Your Customer Experience" / Button: "Explore CX Transformation"

#### 4. Competitor Variant (Genesys Alternative)
```
http://localhost:3000/ai?intent=competitor&angle=genesys
```
**Expected:**
- Hero: "A Modern Alternative to Genesys, Five9 & Talkdesk"
- Reassurance: "Seamless migration. Enterprise-grade security. Proven at scale."
- Form: "Compare Platforms & See the Difference" / Button: "Compare Solutions"

#### 5. Integration Variant (Salesforce)
```
http://localhost:3000/ai?intent=integration&angle=salesforce
```
**Expected:**
- Hero: "Your Contact Center, Natively Integrated With Your CRM"
- Value Reinforcement: "One unified customer view for agents, supervisors, and CX leaders."
- Form: Default (maps to AI variant)

---

## Full Google Ads URL Examples

### Category Campaign
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Category+|+CX+Platform&utm_source=google&utm_medium=cpc&utm_content=AI+Platform&utm_term=ai+contact+center
```

### Problem Campaign (Ops)
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Problem+|+CX+Platform&utm_source=google&utm_medium=cpc&utm_content=Operational+Performance+Ops&utm_term=improve+contact+center+performance
```

### Problem Campaign (CX)
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Problem+|+CX+Platform&utm_source=google&utm_medium=cpc&utm_content=Customer+Experience&utm_term=improve+customer+experience
```

### Competitor Campaign (Genesys)
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Competitor+|+CX+Platform&utm_source=google&utm_medium=cpc&utm_content=Genesys+Alternative&utm_term=genesys+alternative
```

### Competitor Campaign (Five9)
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Competitor+|+CX+Platform&utm_source=google&utm_medium=cpc&utm_content=Five9+Alternative&utm_term=five9+vs+vocalcom
```

### Integration Campaign (Salesforce)
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Integration+|+Salesforce&utm_source=google&utm_medium=cpc&utm_content=Salesforce+Integration&utm_term=contact+center+salesforce+integration
```

### Integration Campaign (Dynamics 365)
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Integration+|+Dynamics&utm_source=google&utm_medium=cpc&utm_content=Dynamics+365&utm_term=dynamics+365+contact+center
```

### Brand Campaign
```
http://localhost:3000/ai?utm_campaign=GA+|+EN+Europe+|+EN+|+Brand+|+Vocalcom&utm_source=google&utm_medium=cpc&utm_content=Vocalcom&utm_term=vocalcom
```

---

## What to Look For

### 1. Console Logs
Open browser console and look for:
```
🎯 Landing Page Personalization: {
  intent: "problem",
  angle: "ops",
  utmCampaign: "GA | EN Europe | EN | Problem | CX Platform",
  utmContent: "Operational Performance Ops",
  utmTerm: "..."
}

🌍 Region & Angle detected from UTMs: {
  region: "en_europe",
  angle: "ops",
  utmData: {...}
}

📝 Form copy personalized for angle: ops
```

### 2. Development Debug Display
Bottom-right corner should show:
```
Intent: problem
Angle: ops
```

### 3. Visual Changes

**Hero Section:**
- Main headline changes based on intent
- Sub-headline changes based on intent + angle
- CTA button text changes based on intent
- Reassurance line appears for competitor variant
- Value reinforcement appears for integration variant

**Content Section:**
- Section headline matches angle (ops, cx, ai)
- Body copy reflects persona needs
- Proof line shows relevant metrics
- Case study intro aligns with angle

**Form Section:**
- Form title changes based on angle
- Supporting line changes based on angle
- Submit button text changes based on angle
- Trust microcopy changes based on angle

---

## Testing Checklist

- [ ] Category variant loads with correct hero
- [ ] Problem (ops) variant shows ops-focused content
- [ ] Problem (cx) variant shows cx-focused content
- [ ] Competitor variant shows reassurance line
- [ ] Integration variant shows value reinforcement
- [ ] Form title changes per angle
- [ ] Form button text changes per angle
- [ ] Console logs show correct detection
- [ ] Debug display shows correct intent/angle (dev mode)
- [ ] Region detection still works (multi-region system)
- [ ] Calendar booking still works with correct sales rep

---

## Known Limitations (Phase 1)

1. **Section ordering** - Not yet implemented (all pages show default order)
2. **Ops/CX specific sections** - Using placeholder content
3. **Competitor comparison table** - Not yet built
4. **CRM integration showcase** - Not yet built
5. **Multilingual support** - Copy only in English currently
6. **Analytics tracking** - GTM events not yet implemented

## Next Phase

- [ ] Build Ops-specific section component
- [ ] Build CX-specific section component
- [ ] Build competitor comparison table
- [ ] Build CRM integration showcase
- [ ] Implement section ordering logic
- [ ] Add multilingual copy for FR/ES/PT
- [ ] Add GTM tracking events
- [ ] Create A/B test variants
