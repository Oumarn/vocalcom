"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@mdi/react";
import { mdiArrowRight, mdiCheck, mdiArrowLeft, mdiEmailOutline, mdiAccountOutline, mdiOfficeBuilding, mdiPhone, mdiEarth, mdiClock, mdiGoogle, mdiMicrosoftOutlook, mdiApple } from "@mdi/js";
import { useLanguage } from "../../hooks/useLanguage";
import FrenchCalendar from "./FrenchCalendar";
import { getRegionConfig } from "@/config/outlook-config";
import { resolveRegionFromUTM, resolveAngleFromUTM, getFormCopy, type RegionKey, type AngleType } from "@/lib/region-resolver";

export default function DemoForm({ customButtonText }: { customButtonText?: string } = {}) {
    const router = useRouter();
    const { content, locale } = useLanguage();
    const t = content.form; // Translation object
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sendDatas, setSendDatas] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const countryInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        company: "",
        phone: "",
        country: "",
        appointmentDate: "",
        appointmentTime: "",
        ownerEmail: "",
        region: "" as RegionKey | ""
    });
    const [utmParams, setUtmParams] = useState<{
        campaign?: string;
        source?: string;
        medium?: string;
        content?: string;
        term?: string;
    }>({});
    const [attribution, setAttribution] = useState<{
        gclid?: string;
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        utm_content?: string;
        utm_term?: string;
        landing_language?: string;
    }>({});
    const [angle, setAngle] = useState<AngleType>('ai');
    const [formCopy, setFormCopy] = useState(getFormCopy('ai'));

    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        company: "",
        phone: "",
        country: ""
    });

    const totalSteps = 4;

    // Capture UTM parameters and detect region on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const params = new URLSearchParams(window.location.search);
        const utmData = {
            campaign: params.get('utm_campaign') || undefined,
            source: params.get('utm_source') || undefined,
            medium: params.get('utm_medium') || undefined,
            content: params.get('utm_content') || undefined,
            term: params.get('utm_term') || undefined,
        };
        
        setUtmParams(utmData);
        
        // Build full UTM object
        const fullUtm = {
            utm_campaign: utmData.campaign,
            utm_source: utmData.source,
            utm_medium: utmData.medium,
            utm_content: utmData.content,
            utm_term: utmData.term,
            intent: params.get('intent'),
            angle: params.get('angle'),
            lang: (locale || 'fr') as 'fr' | 'en' | 'es' | 'pt',
        };
        
        // Detect region and angle from UTMs
        const detectedRegion = resolveRegionFromUTM(fullUtm);
        const detectedAngle = resolveAngleFromUTM(fullUtm);
        
        setForm(prev => ({ ...prev, region: detectedRegion }));
        setAngle(detectedAngle);
        setFormCopy(getFormCopy(detectedAngle));
        
        // Capture attribution data (both from URL and from window.dataLayer if GTM already ran)
        const attributionData: any = {
            gclid: params.get('gclid') || (window as any)._gclid || '',
            utm_source: utmData.source || '',
            utm_medium: utmData.medium || '',
            utm_campaign: utmData.campaign || '',
            utm_content: utmData.content || '',
            utm_term: utmData.term || '',
            landing_language: (locale || 'fr'),
        };
        
        setAttribution(attributionData);
        
        console.log('🌍 Region & Angle detected from UTMs:', {
            region: detectedRegion,
            angle: detectedAngle,
            utmData,
            attribution: attributionData
        });
    }, []);
    
    // Country data with French display names and English normalized values for Salesforce
    const countryData: {[key: string]: { code: string; en: string }} = {
        "Afghanistan": { code: "+93", en: "Afghanistan" },
        "Afrique du Sud": { code: "+27", en: "South Africa" },
        "Albanie": { code: "+355", en: "Albania" },
        "Algérie": { code: "+213", en: "Algeria" },
        "Allemagne": { code: "+49", en: "Germany" },
        "Andorre": { code: "+376", en: "Andorra" },
        "Angola": { code: "+244", en: "Angola" },
        "Antigua-et-Barbuda": { code: "+1-268", en: "Antigua and Barbuda" },
        "Arabie Saoudite": { code: "+966", en: "Saudi Arabia" },
        "Argentine": { code: "+54", en: "Argentina" },
        "Arménie": { code: "+374", en: "Armenia" },
        "Australie": { code: "+61", en: "Australia" },
        "Autriche": { code: "+43", en: "Austria" },
        "Azerbaïdjan": { code: "+994", en: "Azerbaijan" },
        "Bahamas": { code: "+1-242", en: "Bahamas" },
        "Bahreïn": { code: "+973", en: "Bahrain" },
        "Bangladesh": { code: "+880", en: "Bangladesh" },
        "Barbade": { code: "+1-246", en: "Barbados" },
        "Belgique": { code: "+32", en: "Belgium" },
        "Belize": { code: "+501", en: "Belize" },
        "Bénin": { code: "+229", en: "Benin" },
        "Bhoutan": { code: "+975", en: "Bhutan" },
        "Biélorussie": { code: "+375", en: "Belarus" },
        "Birmanie": { code: "+95", en: "Myanmar" },
        "Bolivie": { code: "+591", en: "Bolivia" },
        "Bosnie-Herzégovine": { code: "+387", en: "Bosnia and Herzegovina" },
        "Botswana": { code: "+267", en: "Botswana" },
        "Brésil": { code: "+55", en: "Brazil" },
        "Brunei": { code: "+673", en: "Brunei" },
        "Bulgarie": { code: "+359", en: "Bulgaria" },
        "Burkina Faso": { code: "+226", en: "Burkina Faso" },
        "Burundi": { code: "+257", en: "Burundi" },
        "Cambodge": { code: "+855", en: "Cambodia" },
        "Cameroun": { code: "+237", en: "Cameroon" },
        "Canada": { code: "+1", en: "Canada" },
        "Cap-Vert": { code: "+238", en: "Cape Verde" },
        "Chili": { code: "+56", en: "Chile" },
        "Chine": { code: "+86", en: "China" },
        "Chypre": { code: "+357", en: "Cyprus" },
        "Colombie": { code: "+57", en: "Colombia" },
        "Comores": { code: "+269", en: "Comoros" },
        "Congo": { code: "+242", en: "Congo" },
        "Corée du Nord": { code: "+850", en: "North Korea" },
        "Corée du Sud": { code: "+82", en: "South Korea" },
        "Costa Rica": { code: "+506", en: "Costa Rica" },
        "Côte d'Ivoire": { code: "+225", en: "Ivory Coast" },
        "Croatie": { code: "+385", en: "Croatia" },
        "Cuba": { code: "+53", en: "Cuba" },
        "Danemark": { code: "+45", en: "Denmark" },
        "Djibouti": { code: "+253", en: "Djibouti" },
        "Dominique": { code: "+1-767", en: "Dominica" },
        "Égypte": { code: "+20", en: "Egypt" },
        "Émirats Arabes Unis": { code: "+971", en: "United Arab Emirates" },
        "Équateur": { code: "+593", en: "Ecuador" },
        "Érythrée": { code: "+291", en: "Eritrea" },
        "Espagne": { code: "+34", en: "Spain" },
        "Estonie": { code: "+372", en: "Estonia" },
        "Eswatini": { code: "+268", en: "Eswatini" },
        "États-Unis": { code: "+1", en: "United States" },
        "Éthiopie": { code: "+251", en: "Ethiopia" },
        "Fidji": { code: "+679", en: "Fiji" },
        "Finlande": { code: "+358", en: "Finland" },
        "France": { code: "+33", en: "France" },
        "Gabon": { code: "+241", en: "Gabon" },
        "Gambie": { code: "+220", en: "Gambia" },
        "Géorgie": { code: "+995", en: "Georgia" },
        "Ghana": { code: "+233", en: "Ghana" },
        "Grèce": { code: "+30", en: "Greece" },
        "Grenade": { code: "+1-473", en: "Grenada" },
        "Guatemala": { code: "+502", en: "Guatemala" },
        "Guinée": { code: "+224", en: "Guinea" },
        "Guinée-Bissau": { code: "+245", en: "Guinea-Bissau" },
        "Guinée Équatoriale": { code: "+240", en: "Equatorial Guinea" },
        "Guyana": { code: "+592", en: "Guyana" },
        "Haïti": { code: "+509", en: "Haiti" },
        "Honduras": { code: "+504", en: "Honduras" },
        "Hongrie": { code: "+36", en: "Hungary" },
        "Îles Marshall": { code: "+692", en: "Marshall Islands" },
        "Îles Salomon": { code: "+677", en: "Solomon Islands" },
        "Inde": { code: "+91", en: "India" },
        "Indonésie": { code: "+62", en: "Indonesia" },
        "Irak": { code: "+964", en: "Iraq" },
        "Iran": { code: "+98", en: "Iran" },
        "Irlande": { code: "+353", en: "Ireland" },
        "Islande": { code: "+354", en: "Iceland" },
        "Israël": { code: "+972", en: "Israel" },
        "Italie": { code: "+39", en: "Italy" },
        "Jamaïque": { code: "+1-876", en: "Jamaica" },
        "Japon": { code: "+81", en: "Japan" },
        "Jordanie": { code: "+962", en: "Jordan" },
        "Kazakhstan": { code: "+7", en: "Kazakhstan" },
        "Kenya": { code: "+254", en: "Kenya" },
        "Kirghizistan": { code: "+996", en: "Kyrgyzstan" },
        "Kiribati": { code: "+686", en: "Kiribati" },
        "Koweït": { code: "+965", en: "Kuwait" },
        "Laos": { code: "+856", en: "Laos" },
        "Lesotho": { code: "+266", en: "Lesotho" },
        "Lettonie": { code: "+371", en: "Latvia" },
        "Liban": { code: "+961", en: "Lebanon" },
        "Liberia": { code: "+231", en: "Liberia" },
        "Libye": { code: "+218", en: "Libya" },
        "Liechtenstein": { code: "+423", en: "Liechtenstein" },
        "Lituanie": { code: "+370", en: "Lithuania" },
        "Luxembourg": { code: "+352", en: "Luxembourg" },
        "Macédoine du Nord": { code: "+389", en: "North Macedonia" },
        "Madagascar": { code: "+261", en: "Madagascar" },
        "Malaisie": { code: "+60", en: "Malaysia" },
        "Malawi": { code: "+265", en: "Malawi" },
        "Maldives": { code: "+960", en: "Maldives" },
        "Mali": { code: "+223", en: "Mali" },
        "Malte": { code: "+356", en: "Malta" },
        "Maroc": { code: "+212", en: "Morocco" },
        "Maurice": { code: "+230", en: "Mauritius" },
        "Mauritanie": { code: "+222", en: "Mauritania" },
        "Mexique": { code: "+52", en: "Mexico" },
        "Micronésie": { code: "+691", en: "Micronesia" },
        "Moldavie": { code: "+373", en: "Moldova" },
        "Monaco": { code: "+377", en: "Monaco" },
        "Mongolie": { code: "+976", en: "Mongolia" },
        "Monténégro": { code: "+382", en: "Montenegro" },
        "Mozambique": { code: "+258", en: "Mozambique" },
        "Namibie": { code: "+264", en: "Namibia" },
        "Nauru": { code: "+674", en: "Nauru" },
        "Népal": { code: "+977", en: "Nepal" },
        "Nicaragua": { code: "+505", en: "Nicaragua" },
        "Niger": { code: "+227", en: "Niger" },
        "Nigeria": { code: "+234", en: "Nigeria" },
        "Norvège": { code: "+47", en: "Norway" },
        "Nouvelle-Zélande": { code: "+64", en: "New Zealand" },
        "Oman": { code: "+968", en: "Oman" },
        "Ouganda": { code: "+256", en: "Uganda" },
        "Ouzbékistan": { code: "+998", en: "Uzbekistan" },
        "Pakistan": { code: "+92", en: "Pakistan" },
        "Palaos": { code: "+680", en: "Palau" },
        "Palestine": { code: "+970", en: "Palestine" },
        "Panama": { code: "+507", en: "Panama" },
        "Papouasie-Nouvelle-Guinée": { code: "+675", en: "Papua New Guinea" },
        "Paraguay": { code: "+595", en: "Paraguay" },
        "Pays-Bas": { code: "+31", en: "Netherlands" },
        "Pérou": { code: "+51", en: "Peru" },
        "Philippines": { code: "+63", en: "Philippines" },
        "Pologne": { code: "+48", en: "Poland" },
        "Portugal": { code: "+351", en: "Portugal" },
        "Qatar": { code: "+974", en: "Qatar" },
        "République Centrafricaine": { code: "+236", en: "Central African Republic" },
        "République Démocratique du Congo": { code: "+243", en: "Democratic Republic of the Congo" },
        "République Dominicaine": { code: "+1-809", en: "Dominican Republic" },
        "République Tchèque": { code: "+420", en: "Czech Republic" },
        "Roumanie": { code: "+40", en: "Romania" },
        "Royaume-Uni": { code: "+44", en: "United Kingdom" },
        "Russie": { code: "+7", en: "Russia" },
        "Rwanda": { code: "+250", en: "Rwanda" },
        "Saint-Christophe-et-Niévès": { code: "+1-869", en: "Saint Kitts and Nevis" },
        "Sainte-Lucie": { code: "+1-758", en: "Saint Lucia" },
        "Saint-Marin": { code: "+378", en: "San Marino" },
        "Saint-Vincent-et-les-Grenadines": { code: "+1-784", en: "Saint Vincent and the Grenadines" },
        "Salvador": { code: "+503", en: "El Salvador" },
        "Samoa": { code: "+685", en: "Samoa" },
        "São Tomé-et-Principe": { code: "+239", en: "Sao Tome and Principe" },
        "Sénégal": { code: "+221", en: "Senegal" },
        "Serbie": { code: "+381", en: "Serbia" },
        "Seychelles": { code: "+248", en: "Seychelles" },
        "Sierra Leone": { code: "+232", en: "Sierra Leone" },
        "Singapour": { code: "+65", en: "Singapore" },
        "Slovaquie": { code: "+421", en: "Slovakia" },
        "Slovénie": { code: "+386", en: "Slovenia" },
        "Somalie": { code: "+252", en: "Somalia" },
        "Soudan": { code: "+249", en: "Sudan" },
        "Soudan du Sud": { code: "+211", en: "South Sudan" },
        "Sri Lanka": { code: "+94", en: "Sri Lanka" },
        "Suède": { code: "+46", en: "Sweden" },
        "Suisse": { code: "+41", en: "Switzerland" },
        "Suriname": { code: "+597", en: "Suriname" },
        "Syrie": { code: "+963", en: "Syria" },
        "Tadjikistan": { code: "+992", en: "Tajikistan" },
        "Tanzanie": { code: "+255", en: "Tanzania" },
        "Tchad": { code: "+235", en: "Chad" },
        "Thaïlande": { code: "+66", en: "Thailand" },
        "Timor Oriental": { code: "+670", en: "East Timor" },
        "Togo": { code: "+228", en: "Togo" },
        "Tonga": { code: "+676", en: "Tonga" },
        "Trinité-et-Tobago": { code: "+1-868", en: "Trinidad and Tobago" },
        "Tunisie": { code: "+216", en: "Tunisia" },
        "Turkménistan": { code: "+993", en: "Turkmenistan" },
        "Turquie": { code: "+90", en: "Turkey" },
        "Tuvalu": { code: "+688", en: "Tuvalu" },
        "Ukraine": { code: "+380", en: "Ukraine" },
        "Uruguay": { code: "+598", en: "Uruguay" },
        "Vanuatu": { code: "+678", en: "Vanuatu" },
        "Vatican": { code: "+39", en: "Vatican City" },
        "Venezuela": { code: "+58", en: "Venezuela" },
        "Viêt Nam": { code: "+84", en: "Vietnam" },
        "Yémen": { code: "+967", en: "Yemen" },
        "Zambie": { code: "+260", en: "Zambia" },
        "Zimbabwe": { code: "+263", en: "Zimbabwe" }
    };
    
    const countries = Object.keys(countryData);

    // Filter countries based on search
    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(countrySearch.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryInputRef.current && !countryInputRef.current.contains(event.target as Node)) {
                setShowCountryDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Vérification du format email
    const isValidEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // List of blocked generic email domains
    const genericEmailDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
        'msn.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com',
        'yandex.com', 'zoho.com', 'gmx.com', 'mail.ru', 'inbox.com',
        'fastmail.com', 'tutanota.com', 'hushmail.com', 'rediffmail.com',
        'yahoo.fr', 'yahoo.co.uk', 'yahoo.es', 'yahoo.de', 'yahoo.it',
        'hotmail.fr', 'hotmail.co.uk', 'hotmail.es', 'hotmail.de', 'hotmail.it',
        'outlook.fr', 'outlook.es', 'outlook.de', 'outlook.it', 'outlook.co.uk',
        'live.fr', 'live.co.uk', 'live.es', 'live.de', 'live.it',
        'laposte.net', 'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr',
        'bbox.fr', 'aliceadsl.fr', 'club-internet.fr', 'neuf.fr', 'numericable.fr'
    ];

    // Generic/test keywords to block in email addresses
    const genericKeywords = [
        'test', 'example', 'sample', 'demo', 'temp', 'temporary',
        'fake', 'dummy', 'invalid', 'noemail', 'no-reply', 'noreply',
        'admin', 'info', 'contact', 'hello', 'support', 'mail',
        'email', 'user', 'username', 'nom', 'prenom', 'name'
    ];

    // Check if email is professional (not generic)
    const isProfessionalEmail = (email: string) => {
        const emailLower = email.toLowerCase();
        const domain = emailLower.split('@')[1];
        const localPart = emailLower.split('@')[0];
        
        if (!domain || !localPart) return false;
        
        // Block generic email providers
        if (genericEmailDomains.includes(domain)) return false;
        
        // Block domains containing generic keywords
        if (genericKeywords.some(keyword => domain.includes(keyword))) return false;
        
        // Block local parts that are exactly generic keywords
        if (genericKeywords.includes(localPart)) return false;
        
        // Block local parts that start or end with generic keywords
        if (genericKeywords.some(keyword => 
            localPart.startsWith(keyword) || 
            localPart.endsWith(keyword) ||
            localPart.includes(`.${keyword}`) ||
            localPart.includes(`${keyword}.`)
        )) return false;
        
        return true;
    };

    // Enhanced phone validation for French numbers
    const isValidPhone = (phone: string) => {
        const digits = phone.replace(/\D/g, '');
        
        // Check for repetitive patterns
        const repetitivePatterns = [
            '00000000', '11111111', '22222222', '33333333', '44444444',
            '55555555', '66666666', '77777777', '88888888', '99999999',
            '01010101', '02020202', '03030303', '04040404', '05050505',
            '06060606', '07070707', '08080808', '09090909', '10101010'
        ];
        
        const sequential = '12345678';
        
        if (repetitivePatterns.some(pattern => digits.includes(pattern))) {
            return false;
        }
        
        if (digits.includes(sequential)) {
            return false;
        }
        
        // French mobile numbers validation
        // Accept: 06, 07, +336, +337 prefixes
        if (digits.startsWith('336') || digits.startsWith('337')) {
            return digits.length === 11; // +33 6 12 34 56 78
        } else if (digits.startsWith('06') || digits.startsWith('07')) {
            return digits.length === 10; // 06 12 34 56 78
        }
        
        // Allow other international formats
        return digits.length >= 8 && digits.length <= 15;
    };

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');
        
        // Format French mobile numbers
        if (digits.startsWith('336') || digits.startsWith('337')) {
            // +33 6 12 34 56 78
            return digits.replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5 $6');
        } else if (digits.startsWith('06') || digits.startsWith('07')) {
            // 06 12 34 56 78
            return digits.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
        }
        
        return value;
    };

    const handleCountrySearch = (value: string) => {
        setCountrySearch(value);
        setShowCountryDropdown(true);
        // Clear country selection if user is typing
        if (form.country && !countries.includes(value)) {
            setForm(prev => ({ ...prev, country: "" }));
        }
    };

    const handleCountrySelect = (country: string) => {
        const countryInfo = countryData[country];
        const countryCode = countryInfo?.code || "";
        setForm(prev => ({ 
            ...prev, 
            country: countryInfo?.en || country, // Store English name for Salesforce
            phone: countryCode ? `${countryCode} ` : prev.phone
        }));
        setCountrySearch(country);
        setShowCountryDropdown(false);
        setErrors(prev => ({ ...prev, country: "" }));
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;

        // Format phone number on change
        if (id === 'phone') {
            const formatted = formatPhoneNumber(value);
            setForm((prev) => ({
                ...prev,
                [id]: formatted
            }));
            
            // Validate phone
            if (!formatted.trim()) {
                setErrors((prev) => ({ ...prev, phone: t.required }));
            } else if (!isValidPhone(formatted)) {
                setErrors((prev) => ({ ...prev, phone: 'Numéro de téléphone invalide' }));
            } else {
                setErrors((prev) => ({ ...prev, phone: "" }));
            }
            return;
        }

        setForm((prev) => ({
            ...prev,
            [id]: value
        }));

        // Validation en direct
        if (id === "email") {
            if (!value.trim()) {
                setErrors((prev) => ({ ...prev, email: t.required }));
            } else if (!isValidEmail(value)) {
                setErrors((prev) => ({ ...prev, email: t.fields.email.errorFormat }));
            } else if (!isProfessionalEmail(value)) {
                setErrors((prev) => ({ ...prev, email: "Veuillez utiliser une adresse email professionnelle" }));
            } else {
                setErrors((prev) => ({ ...prev, email: "" }));
            }
            return;
        }

        // Effacer l'erreur au fur et à mesure
        setErrors((prev) => ({
            ...prev,
            [id]: value.trim() === "" ? t.required : ""
        }));
    };

    const validateStep = (currentStep: number) => {
        const newErrors: any = {};

        if (currentStep === 1) {
            if (!form.email.trim()) newErrors.email = t.fields.email.error;
            else if (!isValidEmail(form.email)) newErrors.email = t.fields.email.errorFormat;
            else if (!isProfessionalEmail(form.email)) newErrors.email = "Veuillez utiliser une adresse email professionnelle";
            if (!form.firstName.trim()) newErrors.firstName = t.fields.firstName.error;
            if (!form.lastName.trim()) newErrors.lastName = t.fields.lastName.error;
        } else if (currentStep === 2) {
            if (!form.jobTitle.trim()) newErrors.jobTitle = t.fields.jobTitle.error;
            if (!form.company.trim()) newErrors.company = t.fields.company.error;
            if (!form.country) newErrors.country = t.fields.country.error;
        } else if (currentStep === 3) {
            if (!form.phone.trim()) {
                newErrors.phone = t.fields.phone.error;
            } else if (!isValidPhone(form.phone)) {
                newErrors.phone = 'Format de téléphone invalide. Utilisez un numéro français mobile (06/07 ou +336/+337)';
            }
        } else if (currentStep === 4) {
            // For step 4, require date and time to be selected before final submission
            if (!form.appointmentDate || !form.appointmentTime) {
                // Don't show error, just return false - calendar handles the selection
                return false;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        // If on final confirmation (step 4 with appointment), clear appointment and show calendar again
        if (step === 4 && form.appointmentDate) {
            setForm(prev => ({
                ...prev,
                appointmentDate: '',
                appointmentTime: ''
            }));
            return;
        }
        
        setStep(step - 1);
        setErrors({
            email: "",
            firstName: "",
            lastName: "",
            jobTitle: "",
            company: "",
            phone: "",
            country: ""
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        // Only submit if we're on the last step
        if (step !== totalSteps) {
            return;
        }
        
        setSendDatas(false);

        if (!validateStep(step)) return;

        setLoading(true);

        try {
            // Create appointment datetime
            const appointmentDateTime = `${form.appointmentDate}T${form.appointmentTime}:00`;
            
            // Submit to all systems: Pardot, internal API, and Outlook
            const [pardotResponse, appointmentResponse, outlookResponse] = await Promise.all([
                fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: form.email,
                        firstName: form.firstName,
                        lastName: form.lastName,
                        jobTitle: form.jobTitle,
                        company: form.company,
                        country: form.country,
                        phone: form.phone,
                    }),
                }),
                fetch('/api/save-lead/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        date: form.appointmentDate,
                        hour: form.appointmentTime,
                        firstname: form.firstName,
                        lastname: form.lastName,
                        email: form.email,
                        phone: form.phone,
                        company: form.company
                    })
                }),
                // Book in Outlook calendar
                fetch('/api/outlook/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        region: form.region,
                        ownerEmail: form.ownerEmail,
                        dateTime: appointmentDateTime,
                        inviteeInfo: {
                            name: `${form.firstName} ${form.lastName}`,
                            email: form.email,
                            phone: form.phone,
                            company: form.company,
                            notes: `Job Title: ${form.jobTitle}\nCountry: ${form.country}`
                        },
                        utmParams
                    })
                }).catch(err => {
                    console.error('Outlook booking failed:', err);
                    return { ok: false }; // Don't fail entire submission if Outlook fails
                })
            ]);

            const pardotResult = await pardotResponse.json();
            console.log('Pardot Response:', pardotResult);

            setLoading(false);
            setSendDatas(true);
            
            // Redirect to thank you page after successful submission
            setTimeout(() => {
                window.location.href = '/thank-you?date=' + encodeURIComponent(form.appointmentDate) + '&time=' + encodeURIComponent(form.appointmentTime);
            }, 1000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            setLoading(false);
            alert(t.error);
        }
    };

    const handleDateTimeSelect = (date: string, time: string, ownerEmail?: string) => {
        setForm(prev => ({
            ...prev,
            appointmentDate: date,
            appointmentTime: time,
            ownerEmail: ownerEmail || prev.ownerEmail
        }));
        console.log('📅 Slot selected:', { date, time, ownerEmail });
        // Don't change step, the calendar component being inside step 4 will show confirmation
    };

    // Calendar export helpers
    const getCalendarEventData = () => {
        if (!form.appointmentDate || !form.appointmentTime) return null;
        
        const [hours, minutes] = form.appointmentTime.split(':');
        const startDate = new Date(form.appointmentDate);
        startDate.setHours(parseInt(hours), parseInt(minutes), 0);
        
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 15);
        
        const formatGoogleDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        return {
            title: t.calendar.eventTitle,
            description: t.calendar.eventDescription,
            location: t.calendar.eventLocation,
            startDate,
            endDate,
            googleStart: formatGoogleDate(startDate),
            googleEnd: formatGoogleDate(endDate)
        };
    };

    const getGoogleCalendarLink = () => {
        const event = getCalendarEventData();
        if (!event) return '';
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.googleStart}/${event.googleEnd}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    };

    const getOutlookLink = () => {
        const event = getCalendarEventData();
        if (!event) return '';
        return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.startDate.toISOString()}&enddt=${event.endDate.toISOString()}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    };

    const downloadICS = () => {
        const event = getCalendarEventData();
        if (!event) return;
        
        const formatICSDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vocalcom//Demo Meeting//EN
BEGIN:VEVENT
UID:${Date.now()}@vocalcom.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(event.startDate)}
DTEND:${formatICSDate(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
        
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vocalcom-demo.ics';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Hidden attribution fields for Pardot Form Handler */}
            <input type="hidden" name="GCLID" value={attribution.gclid || ''} />
            <input type="hidden" name="UTM_Source" value={attribution.utm_source || ''} />
            <input type="hidden" name="UTM_Medium" value={attribution.utm_medium || ''} />
            <input type="hidden" name="UTM_Campaign" value={attribution.utm_campaign || ''} />
            <input type="hidden" name="UTM_Content" value={attribution.utm_content || ''} />
            <input type="hidden" name="UTM_Term" value={attribution.utm_term || ''} />
            <input type="hidden" name="Landing_Language" value={attribution.landing_language || ''} />
            <input type="hidden" name="Content_Group" value="landing" />
            
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-700">{t.steps.current} {step}/{totalSteps}</span>
                    <span className="text-xs font-medium text-[#8b5cf6]">{Math.round((step / totalSteps) * 100)}{t.steps.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center mb-4">
                        <h4 className="text-base font-bold text-gray-900">{t.step1.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{t.step1.subtitle}</p>
                    </div>

                    <div>
                        <label htmlFor="email" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.email ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiEmailOutline} size={0.6} />
                                {t.fields.email.label}
                            </div>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            autoFocus
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                            `}
                            placeholder={t.fields.email.placeholder}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="firstName" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.firstName ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiAccountOutline} size={0.6} />
                                {t.fields.firstName.label}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.firstName ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                            `}
                            placeholder={t.fields.firstName.placeholder}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.lastName ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiAccountOutline} size={0.6} />
                                {t.fields.lastName.label}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.lastName ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                            `}
                            placeholder={t.fields.lastName.placeholder}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.lastName}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Step 2: Job Title, Company & Country */}
            {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center mb-4">
                        <h4 className="text-base font-bold text-gray-900">{t.step2.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{t.step2.subtitle}</p>
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.jobTitle ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiAccountOutline} size={0.6} />
                                {t.fields.jobTitle.label}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={form.jobTitle}
                            onChange={handleChange}
                            autoFocus
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.jobTitle ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                            `}
                            placeholder={t.fields.jobTitle.placeholder}
                        />
                        {errors.jobTitle && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.jobTitle}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="company" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.company ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiOfficeBuilding} size={0.6} />
                                {t.fields.company.label}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="company"
                            value={form.company}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.company ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                            `}
                            placeholder={t.fields.company.placeholder}
                        />
                        {errors.company && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.company}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="country" className={`block text-xs font-medium mb-2 ml-1 ${errors.country ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiEarth} size={0.6} />
                                {t.fields.country.label}
                            </div>
                        </label>
                        <div className="relative" ref={countryInputRef}>
                            <input
                                type="text"
                                id="country"
                                value={countrySearch}
                                onChange={(e) => handleCountrySearch(e.target.value)}
                                onFocus={() => setShowCountryDropdown(true)}
                                autoComplete="off"
                                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                    focus:ring-2 focus:border-transparent outline-none transition-all
                                    ${errors.country ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                                `}
                                placeholder={t.fields.country.placeholder}
                            />
                            {showCountryDropdown && filteredCountries.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                    {filteredCountries.map((country) => (
                                        <div
                                            key={country}
                                            onClick={() => handleCountrySelect(country)}
                                            className="px-4 py-2.5 text-sm hover:bg-cyan-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                        >
                                            {country}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.country && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.country}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Step 3: Phone */}
            {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center mb-4">
                        <h4 className="text-base font-bold text-gray-900">{t.step3.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{t.step3.subtitle}</p>
                    </div>

                    <div>
                        <label htmlFor="phone" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.phone ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiPhone} size={0.6} />
                                {t.fields.phone.label}
                            </div>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={form.phone}
                            onChange={handleChange}
                            autoFocus
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#8b5cf6]"}
                            `}
                            placeholder={t.fields.phone.placeholder}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.phone}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Step 3.5: Calendar - Step 4 is calendar */}
            {step === 4 && !form.appointmentDate && (
                <div className="animate-fade-in -mx-6 mb-6">
                    <FrenchCalendar 
                        form={{
                            firstname: form.firstName,
                            lastname: form.lastName,
                            email: form.email,
                            phone: form.phone,
                            company: form.company
                        }}
                        onDateTimeSelect={handleDateTimeSelect}
                        selectedDate={form.appointmentDate}
                        selectedTime={form.appointmentTime}
                        embedded={true}
                        country={form.country}
                    />
                </div>
            )}

            {/* Step 5: Final confirmation before submit */}
            {step === 4 && form.appointmentDate && (
                <div className="space-y-6 animate-fade-in">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon path={mdiCheck} size={1.5} className="text-blue-600" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{t.calendar.confirmTitle}</h4>
                        <p className="text-sm text-gray-600">{t.calendar.confirmSubtitle}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t.fields.firstName.label} & {t.fields.lastName.label}</p>
                                <p className="text-sm font-medium text-gray-900">{form.firstName} {form.lastName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Email</p>
                                <p className="text-sm font-medium text-gray-900">{form.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t.fields.company.label}</p>
                                <p className="text-sm font-medium text-gray-900">{form.company}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t.fields.phone.label}</p>
                                <p className="text-sm font-medium text-gray-900">{form.phone}</p>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-500">{t.calendar.appointmentScheduled}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(prev => ({
                                            ...prev,
                                            appointmentDate: '',
                                            appointmentTime: ''
                                        }));
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    {t.calendar.modify}
                                </button>
                            </div>
                            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                                <Icon path={mdiClock} size={1} className="text-blue-600" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {new Date(form.appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <p className="text-sm text-gray-600">{form.appointmentTime} • 15 {t.calendar.minutes}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">{t.calendar.addToCalendar}</p>
                            <div className="space-y-2">
                                <a
                                    href={getGoogleCalendarLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-lg hover:shadow-sm transition-all border border-gray-200 hover:border-gray-300"
                                >
                                    <Icon path={mdiGoogle} size={0.8} className="text-blue-600" />
                                    <span className="text-xs font-medium text-gray-900">{t.calendar.googleCalendar}</span>
                                </a>

                                <a
                                    href={getOutlookLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-lg hover:shadow-sm transition-all border border-gray-200 hover:border-gray-300"
                                >
                                    <Icon path={mdiMicrosoftOutlook} size={0.8} className="text-blue-600" />
                                    <span className="text-xs font-medium text-gray-900">{t.calendar.outlookCalendar}</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={downloadICS}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white rounded-lg hover:shadow-sm transition-all border border-gray-200 hover:border-gray-300"
                                >
                                    <Icon path={mdiApple} size={0.8} className="text-gray-700" />
                                    <span className="text-xs font-medium text-gray-900">{t.calendar.appleCalendar}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className={`flex gap-3 ${step === 4 ? 'pt-6' : 'pt-2'}`}>
                {step > 1 && !sendDatas && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                        <Icon path={mdiArrowLeft} size={0.7} />
                        {t.buttons.previous}
                    </button>
                )}

                {step < totalSteps || (step === totalSteps && !form.appointmentDate) ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-3 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                    >
                        {t.buttons.next}
                        <Icon path={mdiArrowRight} size={0.7} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 py-3 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group text-sm
                            ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} 
                            ${sendDatas ? "!bg-gradient-to-r !from-green-500 !to-green-600" : ""}
                        `}
                    >
                        {loading && (
                            <svg aria-hidden="true" className="w-4 h-4 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="rgba(255,255,255,0.3)" />
                            </svg>
                        )}
                        {sendDatas && <Icon path={mdiCheck} size={0.7} />}
                        {sendDatas ? t.buttons.sent : loading ? t.buttons.sending : (customButtonText || t.buttons.submit)}
                        {!loading && !sendDatas && <Icon path={mdiArrowRight} size={0.7} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                )}
            </div>

            {sendDatas && (
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                    <p className="text-green-700 font-semibold text-xs">{t.success}</p>
                </div>
            )}
        </form>
    );
}
