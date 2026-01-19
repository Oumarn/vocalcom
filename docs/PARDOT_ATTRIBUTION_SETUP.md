# Pardot Form Handler Attribution Fields Integration

## Contexte
La landing page "Paid Acquisition Landing Page 2026" utilise un **Pardot Form Handler** pour capturer les leads et les envoyer à Salesforce. Ce document détaille comment configurer les champs d'attribution pour tracker les paramètres Google Ads (GCLID + UTM).

---

## 🎯 Architecture

```
Google Ads
    ↓
Landing Page (Next.js) ← captures GCLID + UTM via URL
    ↓
Pardot Form Handler (hidden fields)
    ↓
Salesforce Lead (champs d'attribution remplis)
    ↓
Reporting & Attribution dans Salesforce/Marketo
```

---

## ✅ ÉTAPE 1 : Configuration Pardot Form Handler

**Lieu** : Pardot > Lead Management > Landing Pages > Paid Acquisition Landing Page 2026 > Edit Form Handler

### Ajouter les champs manquants

Cliquez sur **"Add New Field"** pour chaque ligne et mappez exactement comme suit :

| External Field Name | Maps to Salesforce Field | Type | Requis ? |
|---|---|---|---|
| `GCLID` | `Google_Click_ID__c` | Texte | ❌ Non |
| `UTM_Source` | `UTM_Source__c` | Texte | ❌ Non |
| `UTM_Medium` | `UTM_Medium__c` | Texte | ❌ Non |
| `UTM_Campaign` | `UTM_Campaign__c` | Texte | ❌ Non |
| `UTM_Content` | `UTM_Content__c` | Texte | ❌ Non |
| `UTM_Term` | `UTM_Term__c` | Texte | ❌ Non |
| `Landing_Language` | `Landing_Language__c` | Texte | ❌ Non |
| `Content_Group` | `Content_Group__c` | Texte | ❌ Non |

⚠️ **Important** : Respectez la casse exacte (majuscules/minuscules) des External Field Names.

---

## ✅ ÉTAPE 2 : Vérifier les champs Salesforce

Assurez-vous que les champs custom existent dans Salesforce :

1. Allez dans **Setup > Object Manager > Lead**
2. Vérifiez que ces champs existent :
   - `Google_Click_ID__c`
   - `UTM_Source__c`
   - `UTM_Medium__c`
   - `UTM_Campaign__c`
   - `UTM_Content__c`
   - `UTM_Term__c`
   - `Landing_Language__c`
   - `Content_Group__c`

Si les champs n'existent pas, créez-les comme champs Texte (Text).

---

## ✅ ÉTAPE 3 : Configurer la Landing Page Next.js

### A) Hidden inputs dans le formulaire

✅ **Déjà implémenté** dans `/app/components/forms/DemoForm.tsx`

Le composant `DemoForm` ajoute automatiquement ces hidden inputs :

```tsx
<input type="hidden" name="GCLID" value={attribution.gclid || ''} />
<input type="hidden" name="UTM_Source" value={attribution.utm_source || ''} />
<input type="hidden" name="UTM_Medium" value={attribution.utm_medium || ''} />
<input type="hidden" name="UTM_Campaign" value={attribution.utm_campaign || ''} />
<input type="hidden" name="UTM_Content" value={attribution.utm_content || ''} />
<input type="hidden" name="UTM_Term" value={attribution.utm_term || ''} />
<input type="hidden" name="Landing_Language" value={attribution.landing_language || ''} />
<input type="hidden" name="Content_Group" value="landing" />
```

### B) Capture automatique des paramètres

✅ **Déjà implémenté** dans le `useEffect` de `DemoForm.tsx`

Le formulaire capture automatiquement :
- Tous les paramètres URL (`?gclid=...&utm_source=...` etc.)
- La langue du site (`content.locale`)
- Les stocke dans l'état `attribution`

---

## ✅ ÉTAPE 4 : GTM Custom HTML Tag

### Configuration GTM

1. Allez dans **Google Tag Manager > Tags > New**
2. Choisissez **Custom HTML**
3. Collez le code de `/public/gtm-attribution-fields.js`

### Paramètres du Tag

**Trigger** :
- Type : Page View
- Conditions : Page URL contains `ai.vocalcom.com`
- Timing : DOM Ready (avant submit)

**Paramètres** :
- Aucun paramètre requis (le script lit directement la page et dataLayer)

### Code du Tag (simplifié pour GTM)

```html
<script>
(function () {
  function setField(name, value) {
    var el = document.querySelector('input[name="' + name + '"]');
    if (el && !el.value) el.value = value || '';
  }

  function getUrlParam(name) {
    var regex = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
  }

  // Populate from URL params
  setField('GCLID', getUrlParam('gclid'));
  setField('UTM_Source', getUrlParam('utm_source'));
  setField('UTM_Medium', getUrlParam('utm_medium'));
  setField('UTM_Campaign', getUrlParam('utm_campaign'));
  setField('UTM_Content', getUrlParam('utm_content'));
  setField('UTM_Term', getUrlParam('utm_term'));
  setField('Landing_Language', getUrlParam('landing_language') || 'fr');
  setField('Content_Group', 'landing');
})();
</script>
```

---

## 🧪 Validation Checklist

### A) En navigateur (Local ou Preview)

1. **Ouvrir l'URL de test avec paramètres** :
   ```
   https://ai.vocalcom.com/?gclid=abc123&utm_source=google&utm_medium=cpc&utm_campaign=Paid_Lead_Gen_2026&utm_content=contact-center-ai&utm_term=centre+de+contact+ia
   ```

2. **Ouvrir DevTools (F12) > Console** et vérifier :
   ```javascript
   // Should see
   ✅ Set field "GCLID" = "abc123..."
   ✅ Set field "UTM_Source" = "google"
   etc.
   ```

3. **Inspecter le formulaire** (F12 > Elements) et vérifier que les inputs sont remplis :
   ```html
   <input type="hidden" name="GCLID" value="abc123" />
   <input type="hidden" name="UTM_Source" value="google" />
   <!-- etc -->
   ```

4. **Soumettre le formulaire** et attendre la redirection vers `/thank-you`

### B) Dans Pardot

1. Allez dans **Pardot > Prospects**
2. Recherchez le prospect créé (par email)
3. Vérifiez que les champs sont remplis :
   - `GCLID` ✅
   - `UTM_Source` ✅
   - `UTM_Campaign` ✅
   - `Landing_Language` ✅

### C) Dans Salesforce

1. Allez dans **Salesforce > Leads**
2. Ouvrez le Lead créé
3. Vérifiez les champs (scroll down) :
   - `Google_Click_ID__c` ✅
   - `UTM_Source__c` ✅
   - `UTM_Campaign__c` ✅
   - `UTM_Term__c` ✅
   - `Landing_Language__c` ✅

---

## 🚨 Gotchas & Dépannage

### ❌ Les champs sont vides dans Salesforce

**Causes possibles** :
1. Les champs n'existent pas dans Salesforce → les créer
2. Le nom du champ Salesforce ne correspond pas exactement → vérifier la casse
3. GCLID n'est pas présent dans l'URL → vérifier que l'auto-tagging Google est activé
4. Le formulaire HTML n'a pas les inputs cachés → vérifier que DemoForm.tsx est utilisé

**Solution** :
- Vérifier la console du navigateur pour les logs ✅/❌
- Tester d'abord sans GTM (URL params seuls)

### ❌ GCLID est toujours vide

**Causes possibles** :
1. Auto-tagging Google Ads n'est pas activé
2. Le lien de destination n'utilise pas le domaine `go.vocalcom.com`

**Solution** :
- Aller dans Google Ads > Settings > Account settings > Auto-tagging
- Activer "Track clicks using Google's ValueTrack parameters"
- Vérifier que le domaine de tracker Pardot est `go.vocalcom.com`

### ❌ UTMs ne sont pas capturés

**Causes possibles** :
1. URL sans paramètres UTM
2. Google Ads n'ajoute pas les UTM aux URLs

**Solution** :
- Vérifier que les URLs de destination dans Google Ads incluent les UTM manuellement
- Ex : `https://go.vocalcom.com?utm_source=google&utm_medium=cpc&utm_campaign=...`

---

## 📊 Vérification en production

### Avant de lancer le trafic

1. ✅ Tous les champs Salesforce existent
2. ✅ Pardot Form Handler a les 8 champs mappés
3. ✅ Landing page DemoForm.tsx a les hidden inputs
4. ✅ GTM tag est publié et actif
5. ✅ Test complet : URL → Form → Pardot → Salesforce → Champs remplis

### Après lancer le trafic (J+1)

1. Vérifier qu'au moins 10 leads ont été créés
2. Vérifier que les champs sont remplis dans Salesforce
3. Si GCLID est vide : vérifier l'auto-tagging Google Ads
4. Si UTM vides : vérifier les URLs de destination dans Google Ads

---

## 📝 Notes techniques

### Ordre de priorité pour les valeurs (GCLID)

1. URL parameter : `?gclid=...` (plus de contrôle)
2. dataLayer GTM : `{{gclid}}` (si injecté par GTM)
3. Window variable : `window._gclid` (fallback)

### Pourquoi Content_Group est toujours "landing"

Pour différencier entre :
- `landing` = formulaire sur landing page
- `email` = formulaire dans email
- `webinar` = formulaire après webinaire
- etc.

Vous pouvez l'ajuster selon votre stratégie.

### Timing d'exécution

- **GTM tag** : DOM Ready (avant que le formulaire soit prêt)
- **React useEffect** : Immédiatement après montage (capture URL + dataLayer)
- **Submit** : Les values des inputs sont envoyées à Pardot

L'ordre garantit que les valeurs sont définies avant le submit.

---

## 🔄 Maintenance

### Si vous changez les noms de champs

1. Mettre à jour dans **Pardot Form Handler** mapping
2. Mettre à jour dans **DemoForm.tsx** (noms des inputs)
3. Mettre à jour dans **GTM tag** (noms des inputs)
4. Mettre à jour dans **Salesforce** (noms des champs)

### Si vous ajoutez de nouveaux champs

Suivre le même pattern :
1. Créer le champ Salesforce (`Custom_Field__c`)
2. Mapper dans Pardot Form Handler
3. Ajouter `<input type="hidden" name="Custom_Field">` dans DemoForm.tsx
4. Ajouter `setField('Custom_Field', value)` dans GTM tag

---

## 📞 Support

Pour toute question :
1. Vérifier les logs console du navigateur (`console.log('✅...')`)
2. Vérifier que le formulaire est bien `DemoForm` (pas un autre formulaire)
3. Vérifier que GTM tag est actif (pas en draft)
4. Valider dans Salesforce que les champs existent

---

**Date de création** : 19 janvier 2026
**Statut** : Production Ready ✅
