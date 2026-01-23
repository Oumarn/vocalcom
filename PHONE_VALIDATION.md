# Phone Number Validation - Supported Formats

This document describes the phone number validation and formatting implemented in the demo form.

## Supported Country Formats

### France (+33)
- **International Format**: +33 X XX XX XX XX
- **Local Format**: 0X XX XX XX XX
- **Valid Prefixes**: 01-09 (all French regions and mobile)
- **Examples**:
  - `+33 6 12 34 56 78` (mobile)
  - `06 12 34 56 78` (mobile local)
  - `+33 1 23 45 67 89` (Paris landline)
  - `01 23 45 67 89` (Paris landline local)

### Spain (+34)
- **International Format**: +34 XXX XXX XXX
- **Local Format**: XXX XXX XXX
- **Valid Prefixes**: 6, 7, 8, 9
- **Examples**:
  - `+34 612 345 678` (mobile)
  - `612 345 678` (mobile local)
  - `+34 912 345 678` (Madrid)

### Portugal (+351)
- **International Format**: +351 XXX XXX XXX
- **Local Format**: XXX XXX XXX
- **Valid Prefixes**: 9 (mobile), 2 (landline)
- **Examples**:
  - `+351 912 345 678` (mobile)
  - `912 345 678` (mobile local)
  - `+351 212 345 678` (Lisbon landline)

### United Kingdom (+44)
- **International Format**: +44 XXXX XXXXXX
- **Local Format**: 07XXX XXXXXX (mobile)
- **Examples**:
  - `+44 7123 456789` (mobile)
  - `07123 456789` (mobile local)

### United States / Canada (+1)
- **Format**: +1 (XXX) XXX-XXXX
- **Validation**: Area code cannot start with 0 or 1
- **Examples**:
  - `+1 (415) 555-0123` (San Francisco)
  - `+1 (416) 555-0123` (Toronto)

### Germany (+49)
- **Format**: +49 XXX XXXXXXXX
- **Examples**:
  - `+49 151 23456789` (mobile)
  - `+49 30 12345678` (Berlin)

### Italy (+39)
- **Format**: +39 XXX XXX XXXX
- **Examples**:
  - `+39 312 345 6789` (mobile)
  - `+39 06 1234 5678` (Rome)

### Belgium (+32)
- **Format**: +32 XXX XX XX XX
- **Valid Mobile Prefix**: 4XX
- **Examples**:
  - `+32 412 34 56 78` (mobile)

### Switzerland (+41)
- **Format**: +41 XX XXX XX XX
- **Examples**:
  - `+41 76 123 45 67` (mobile)

### Netherlands (+31)
- **Format**: +31 X XX XX XX XX
- **Examples**:
  - `+31 6 12 34 56 78` (mobile)

### Brazil (+55)
- **Format**: +55 XX XXXXX-XXXX (mobile) or +55 XX XXXX-XXXX (landline)
- **Examples**:
  - `+55 11 98765-4321` (São Paulo mobile)
  - `+55 11 3456-7890` (São Paulo landline)

### Mexico (+52)
- **Format**: +52 XX XXXX XXXX
- **Examples**:
  - `+52 55 1234 5678` (Mexico City)

## Validation Rules

### Pattern Detection (Invalid)
The following patterns are automatically rejected:
- Repetitive digits: `00000000`, `11111111`, `22222222`, etc.
- Alternating patterns: `01010101`, `12121212`, etc.
- Sequential numbers: `12345678`
- Common test patterns: `12341234`

### Length Requirements
- **Minimum**: 8 digits (for international numbers)
- **Maximum**: 15 digits (ITU-T E.164 standard)
- Country-specific lengths enforced when detected

### International Format Detection
The system automatically detects phone numbers starting with country codes (+XX) and applies country-specific validation rules.

## Generic International Support
For countries not explicitly listed above, the form accepts any phone number with:
- 8-15 digits
- Valid international format starting with +
- No repetitive or sequential patterns

## Implementation Notes

### Auto-Formatting
- Phone numbers are automatically formatted as users type
- Format is applied based on detected country code
- Spaces and hyphens are added for readability

### Country Selection Integration
When a user selects a country from the dropdown, the system prepares to validate phone numbers according to that country's format rules.

### Error Messages
Users receive clear validation feedback if:
- Number is too short or too long for the selected country
- Number contains invalid patterns
- Number doesn't match the country's expected format

## Testing

To test phone validation:

1. **France**: Try `0612345678` or `+33612345678`
2. **Spain**: Try `612345678` or `+34612345678`
3. **Portugal**: Try `912345678` or `+351912345678`
4. **UK**: Try `07123456789` or `+447123456789`
5. **US**: Try `4155551234` or `+14155551234`

Invalid patterns to test:
- `1111111111` (repetitive)
- `0123456789` (sequential)
- `1234` (too short)
