# ✅ Implémentation : Pardot Form Handler Attribution Fields

## Résumé exécutif

J'ai implémenté la capture et l'envoi des champs d'attribution (GCLID + UTM) vers Salesforce via Pardot Form Handler pour la landing page "Paid Acquisition Landing Page 2026".

---

## 📋 Ce qui a été fait

### 1️⃣ Mise à jour du composant `DemoForm.tsx`

**Fichier** : `/app/components/forms/DemoForm.tsx`

**Changements** :
- ✅ Ajouté état `attribution` pour stocker GCLID + UTM + langue
- ✅ Capture automatique des paramètres URL (gclid, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
- ✅ Ajouté 8 hidden inputs pour les champs Pardot Form Handler
- ✅ Les inputs sont remplis automatiquement lors du chargement de la page

**Code ajouté** :
```tsx
// État pour attribution
const [attribution, setAttribution] = useState<{
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_language?: string;
}>({});

// Hidden inputs avant le formulaire
<input type="hidden" name="GCLID" value={attribution.gclid || ''} />
<input type="hidden" name="UTM_Source" value={attribution.utm_source || ''} />
<input type="hidden" name="UTM_Medium" value={attribution.utm_medium || ''} />
<input type="hidden" name="UTM_Campaign" value={attribution.utm_campaign || ''} />
<input type="hidden" name="UTM_Content" value={attribution.utm_content || ''} />
<input type="hidden" name="UTM_Term" value={attribution.utm_term || ''} />
<input type="hidden" name="Landing_Language" value={attribution.landing_language || ''} />
<input type="hidden" name="Content_Group" value="landing" />
```

### 2️⃣ Création du GTM Custom HTML Tag

**Fichier** : `/public/gtm-attribution-fields.js`

**Fonctionnalité** :
- ✅ Script autonome qui peuple les hidden inputs depuis les URL parameters
- ✅ Lecture des valeurs depuis dataLayer GTM
- ✅ Fallback sur `window._gclid` si GCLID pas en URL
- ✅ Exécution multiple (immédiat + 500ms + 1500ms) pour assurer la capture même si formulaire charge asynchrone

**Utilisation** :
1. Copier le code dans GTM > New Tag > Custom HTML
2. Trigger : DOM Ready, Page URL contains `ai.vocalcom.com`

### 3️⃣ Documentation complète

**Fichier** : `/docs/PARDOT_ATTRIBUTION_SETUP.md`

**Contient** :
- ✅ Architecture complète (Google Ads → Landing Page → Pardot → Salesforce)
- ✅ Instructions Pardot : comment mapper les 8 champs dans Form Handler
- ✅ Vérification Salesforce : quels champs créer/vérifier
- ✅ Configuration GTM : comment installer le tag
- ✅ Checklist de validation : browser, Pardot, Salesforce
- ✅ Dépannage : causes communes et solutions
- ✅ Notes techniques : priorités, timing, maintenance

---

## 🎯 Flux de données

```
Google Ads URL
├─ gclid=abc123
├─ utm_source=google
├─ utm_medium=cpc
├─ utm_campaign=Paid_Lead_Gen_2026
├─ utm_content=contact-center-ai
└─ utm_term=centre+de+contact+ia

         ↓ (captured by React useEffect)

DemoForm.tsx state.attribution
├─ gclid: "abc123"
├─ utm_source: "google"
├─ utm_medium: "cpc"
├─ utm_campaign: "Paid_Lead_Gen_2026"
├─ utm_content: "contact-center-ai"
├─ utm_term: "centre de contact ia"
└─ landing_language: "fr"

         ↓ (rendered in hidden inputs)

HTML hidden inputs
├─ <input name="GCLID" value="abc123">
├─ <input name="UTM_Source" value="google">
├─ <input name="UTM_Campaign" value="Paid_Lead_Gen_2026">
└─ ...

         ↓ (submitted to Pardot Form Handler)

Pardot Form Handler
├─ Maps "GCLID" → Salesforce field "Google_Click_ID__c"
├─ Maps "UTM_Source" → Salesforce field "UTM_Source__c"
├─ Maps "UTM_Campaign" → Salesforce field "UTM_Campaign__c"
└─ ...

         ↓ (creates Lead in Salesforce)

Salesforce Lead
├─ Google_Click_ID__c: "abc123"
├─ UTM_Source__c: "google"
├─ UTM_Campaign__c: "Paid_Lead_Gen_2026"
└─ ... (all fields populated)
```

---

## ✅ Checklist avant lancement

### Pardot Setup
- [ ] **Form Handler "Paid Acquisition Landing Page 2026" ouvert**
- [ ] **8 champs mappés** (voir table dans doc)
  - [ ] GCLID → Google_Click_ID__c
  - [ ] UTM_Source → UTM_Source__c
  - [ ] UTM_Medium → UTM_Medium__c
  - [ ] UTM_Campaign → UTM_Campaign__c
  - [ ] UTM_Content → UTM_Content__c
  - [ ] UTM_Term → UTM_Term__c
  - [ ] Landing_Language → Landing_Language__c
  - [ ] Content_Group → Content_Group__c

### Salesforce Setup
- [ ] **Tous les 8 champs custom existent** dans Lead object
- [ ] **Noms de champs exacts** (avec `__c` suffix)
- [ ] **Champs visibles** dans la mise en page Lead

### Landing Page
- [ ] **DemoForm.tsx utilise les hidden inputs**
- [ ] **Vérifier en local** : URL + console logs ✅
- [ ] **Tester en preview** : form submission → redirect thank-you

### Google Tag Manager
- [ ] **Tag Custom HTML créé**
- [ ] **Code `/public/gtm-attribution-fields.js` copié dans GTM**
- [ ] **Trigger configuré** : DOM Ready + Page URL contains `ai.vocalcom.com`
- [ ] **Tag publié** (pas en draft)

### Google Ads
- [ ] **Auto-tagging activé** dans Account settings
- [ ] **Tracker domain est `go.vocalcom.com`**
- [ ] **URLs de destination** incluent `?utm_campaign=Paid_Lead_Gen_2026` etc.

### Test final
- [ ] **Ouvrir URL** : `https://ai.vocalcom.com/?gclid=test123&utm_source=google&utm_campaign=test`
- [ ] **Console** : vérifier logs ✅
- [ ] **Soumettre form**
- [ ] **Pardot** : prospect créé avec champs
- [ ] **Salesforce** : Lead créé avec tous les champs
- [ ] **GCLID** : doit être présent

---

## 📊 Mesure de succès

**Métrique** : % de Leads avec champs d'attribution remplis dans Salesforce

- ✅ **75%+** : succès
- ⚠️ **25-75%** : vérifier Google Ads auto-tagging
- ❌ **<25%** : problème de configuration, vérifier checklist

---

## 🔗 Fichiers modifiés

1. `/app/components/forms/DemoForm.tsx` - Ajout state + hidden inputs
2. `/public/gtm-attribution-fields.js` - GTM tag script (nouveau)
3. `/docs/PARDOT_ATTRIBUTION_SETUP.md` - Documentation (nouveau)

---

## 🚀 Prochaines étapes

1. **Vérifier Pardot Form Handler** → ajouter 8 champs (5 min)
2. **Vérifier Salesforce** → créer champs si besoin (5 min)
3. **GTM** → ajouter Custom HTML tag (5 min)
4. **Test local** : `http://localhost:3000/?gclid=test&utm_source=google`
5. **Deploy en production**
6. **Monitoring** : vérifier les leads pendant 24h

---

**Status** : ✅ Prêt pour la production
**Date** : 19 janvier 2026
