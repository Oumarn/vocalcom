# Guide de Style Vocalcom - Landing Page

## Standards de Conception

### CTAs (Boutons d'Action)

**Standard uniforme pour tous les CTAs (RESPONSIVE) :**
```tsx
className="inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-sm font-bold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
style={{background: 'linear-gradient(90deg, #F6A02E, #f97316)'}}
```

**Éléments clés :**
- Padding : `px-4 sm:px-8 py-2 sm:py-4` (responsive)
- Taille de texte : `text-xs sm:text-sm` (responsive)
- Font weight : `font-bold`
- Couleur : Gradient orange `#F6A02E → #f97316`
- Forme : `rounded-full`
- Hover : `hover:shadow-xl hover:-translate-y-1`
- Transition : `transition-all duration-300`

**Comportement responsive :**
- Mobile (< 640px) : Plus petit pour éviter les débordements (`px-4 py-2 text-xs`)
- Tablette/Desktop (≥ 640px) : Taille standard (`px-8 py-4 text-sm`)

### Titres de Section

**Titre principal de section (H2) :**
```tsx
className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900"
```

**Sous-titre de section :**
```tsx
className="text-lg text-gray-600 leading-relaxed"
```

**Titre de carte/feature (H3) :**
```tsx
className="text-xl font-bold text-gray-900"
```

### Badges

**Badge de section standard :**
```tsx
className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 rounded-full px-4 py-2 text-sm font-medium"
```

### Descriptions

**Paragraphe principal :**
```tsx
className="text-lg text-gray-600 leading-relaxed"
```

**Paragraphe secondaire :**
```tsx
className="text-sm text-gray-600"
```

### Statistiques

**Valeur numérique :**
```tsx
className="text-2xl font-bold text-[color]"
```

**Label de statistique :**
```tsx
className="text-xs text-gray-600"
```

## Palette de Couleurs

### Couleurs Principales
- Orange principal : `#F6A02E`
- Orange secondaire : `#f97316`
- Violet : `#8b5cf6`, `#a855f7`
- Cyan : `#24B7C3`
- Pourpre : `#934292`

### Couleurs de Texte
- Titre : `text-gray-900`
- Corps : `text-gray-600`
- Label : `text-gray-500`

### Couleurs de Fond
- Background gradient section : `from-violet-600 via-purple-600 to-fuchsia-600`
- Background léger : `from-gray-50 to-white`

## Espacement

### Padding Section
- Standard : `py-12 lg:py-16`
- Large : `py-16 lg:py-20`

### Gap Grid
- Grille : `gap-12`
- Flex : `gap-6`

## Composants Appliquant ces Standards

- AppHeader.tsx
- ComparisonSection.tsx
- FinalCta.tsx
- CTABanner.tsx
- MidPageCta.tsx
- DemoForm.tsx
- AIHumanSection.tsx
- BenefitsGrid.tsx
