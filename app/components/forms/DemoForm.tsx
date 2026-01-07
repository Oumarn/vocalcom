"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@mdi/react";
import { mdiArrowRight, mdiCheck, mdiArrowLeft, mdiEmailOutline, mdiAccountOutline, mdiOfficeBuilding, mdiPhone, mdiEarth } from "@mdi/js";

export default function DemoForm() {
    const router = useRouter();
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
        country: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        company: "",
        phone: "",
        country: ""
    });

    const totalSteps = 3;
    
    // Country code mapping
    const countryCodeMap: {[key: string]: string} = {
        "Afghanistan": "+93", "Afrique du Sud": "+27", "Albanie": "+355", "Algérie": "+213", "Allemagne": "+49", "Andorre": "+376", "Angola": "+244", "Antigua-et-Barbuda": "+1-268", "Arabie Saoudite": "+966", "Argentine": "+54", "Arménie": "+374", "Australie": "+61", "Autriche": "+43", "Azerbaïdjan": "+994",
        "Bahamas": "+1-242", "Bahreïn": "+973", "Bangladesh": "+880", "Barbade": "+1-246", "Belgique": "+32", "Belize": "+501", "Bénin": "+229", "Bhoutan": "+975", "Biélorussie": "+375", "Birmanie": "+95", "Bolivie": "+591", "Bosnie-Herzégovine": "+387", "Botswana": "+267", "Brésil": "+55", "Brunei": "+673", "Bulgarie": "+359", "Burkina Faso": "+226", "Burundi": "+257",
        "Cambodge": "+855", "Cameroun": "+237", "Canada": "+1", "Cap-Vert": "+238", "Chili": "+56", "Chine": "+86", "Chypre": "+357", "Colombie": "+57", "Comores": "+269", "Congo": "+242", "Corée du Nord": "+850", "Corée du Sud": "+82", "Costa Rica": "+506", "Côte d'Ivoire": "+225", "Croatie": "+385", "Cuba": "+53",
        "Danemark": "+45", "Djibouti": "+253", "Dominique": "+1-767",
        "Égypte": "+20", "Émirats Arabes Unis": "+971", "Équateur": "+593", "Érythrée": "+291", "Espagne": "+34", "Estonie": "+372", "Eswatini": "+268", "États-Unis": "+1", "Éthiopie": "+251",
        "Fidji": "+679", "Finlande": "+358", "France": "+33",
        "Gabon": "+241", "Gambie": "+220", "Géorgie": "+995", "Ghana": "+233", "Grèce": "+30", "Grenade": "+1-473", "Guatemala": "+502", "Guinée": "+224", "Guinée-Bissau": "+245", "Guinée Équatoriale": "+240", "Guyana": "+592",
        "Haïti": "+509", "Honduras": "+504", "Hongrie": "+36",
        "Îles Marshall": "+692", "Îles Salomon": "+677", "Inde": "+91", "Indonésie": "+62", "Irak": "+964", "Iran": "+98", "Irlande": "+353", "Islande": "+354", "Israël": "+972", "Italie": "+39",
        "Jamaïque": "+1-876", "Japon": "+81", "Jordanie": "+962",
        "Kazakhstan": "+7", "Kenya": "+254", "Kirghizistan": "+996", "Kiribati": "+686", "Koweït": "+965",
        "Laos": "+856", "Lesotho": "+266", "Lettonie": "+371", "Liban": "+961", "Liberia": "+231", "Libye": "+218", "Liechtenstein": "+423", "Lituanie": "+370", "Luxembourg": "+352",
        "Macédoine du Nord": "+389", "Madagascar": "+261", "Malaisie": "+60", "Malawi": "+265", "Maldives": "+960", "Mali": "+223", "Malte": "+356", "Maroc": "+212", "Maurice": "+230", "Mauritanie": "+222", "Mexique": "+52", "Micronésie": "+691", "Moldavie": "+373", "Monaco": "+377", "Mongolie": "+976", "Monténégro": "+382", "Mozambique": "+258",
        "Namibie": "+264", "Nauru": "+674", "Népal": "+977", "Nicaragua": "+505", "Niger": "+227", "Nigeria": "+234", "Norvège": "+47", "Nouvelle-Zélande": "+64",
        "Oman": "+968", "Ouganda": "+256", "Ouzbékistan": "+998",
        "Pakistan": "+92", "Palaos": "+680", "Palestine": "+970", "Panama": "+507", "Papouasie-Nouvelle-Guinée": "+675", "Paraguay": "+595", "Pays-Bas": "+31", "Pérou": "+51", "Philippines": "+63", "Pologne": "+48", "Portugal": "+351",
        "Qatar": "+974",
        "République Centrafricaine": "+236", "République Démocratique du Congo": "+243", "République Dominicaine": "+1-809", "République Tchèque": "+420", "Roumanie": "+40", "Royaume-Uni": "+44", "Russie": "+7", "Rwanda": "+250",
        "Saint-Christophe-et-Niévès": "+1-869", "Sainte-Lucie": "+1-758", "Saint-Marin": "+378", "Saint-Vincent-et-les-Grenadines": "+1-784", "Salvador": "+503", "Samoa": "+685", "São Tomé-et-Principe": "+239", "Sénégal": "+221", "Serbie": "+381", "Seychelles": "+248", "Sierra Leone": "+232", "Singapour": "+65", "Slovaquie": "+421", "Slovénie": "+386", "Somalie": "+252", "Soudan": "+249", "Soudan du Sud": "+211", "Sri Lanka": "+94", "Suède": "+46", "Suisse": "+41", "Suriname": "+597", "Syrie": "+963",
        "Tadjikistan": "+992", "Tanzanie": "+255", "Tchad": "+235", "Thaïlande": "+66", "Timor Oriental": "+670", "Togo": "+228", "Tonga": "+676", "Trinité-et-Tobago": "+1-868", "Tunisie": "+216", "Turkménistan": "+993", "Turquie": "+90", "Tuvalu": "+688",
        "Ukraine": "+380", "Uruguay": "+598",
        "Vanuatu": "+678", "Vatican": "+39", "Venezuela": "+58", "Viêt Nam": "+84",
        "Yémen": "+967",
        "Zambie": "+260", "Zimbabwe": "+263"
    };
    
    const countries = [
        "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan",
        "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi",
        "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba",
        "Danemark", "Djibouti", "Dominique",
        "Égypte", "Émirats Arabes Unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie",
        "Fidji", "Finlande", "France",
        "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guinée Équatoriale", "Guyana",
        "Haïti", "Honduras", "Hongrie",
        "Îles Marshall", "Îles Salomon", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie",
        "Jamaïque", "Japon", "Jordanie",
        "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït",
        "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg",
        "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique",
        "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande",
        "Oman", "Ouganda", "Ouzbékistan",
        "Pakistan", "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal",
        "Qatar",
        "République Centrafricaine", "République Démocratique du Congo", "République Dominicaine", "République Tchèque", "Roumanie", "Royaume-Uni", "Russie", "Rwanda",
        "Saint-Christophe-et-Niévès", "Sainte-Lucie", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Salvador", "Samoa", "São Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie",
        "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande", "Timor Oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu",
        "Ukraine", "Uruguay",
        "Vanuatu", "Vatican", "Venezuela", "Viêt Nam",
        "Yémen",
        "Zambie", "Zimbabwe"
    ];

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

    const handleCountrySearch = (value: string) => {
        setCountrySearch(value);
        setShowCountryDropdown(true);
        // Clear country selection if user is typing
        if (form.country && !countries.includes(value)) {
            setForm(prev => ({ ...prev, country: "" }));
        }
    };

    const handleCountrySelect = (country: string) => {
        const countryCode = countryCodeMap[country] || "";
        setForm(prev => ({ 
            ...prev, 
            country,
            phone: countryCode ? `${countryCode} ` : prev.phone
        }));
        setCountrySearch(country);
        setShowCountryDropdown(false);
        setErrors(prev => ({ ...prev, country: "" }));
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [id]: value
        }));

        // Validation en direct
        if (id === "email") {
            if (!value.trim()) {
                setErrors((prev) => ({ ...prev, email: "Ce champ est obligatoire." }));
            } else if (!isValidEmail(value)) {
                setErrors((prev) => ({ ...prev, email: "Format email invalide." }));
            } else {
                setErrors((prev) => ({ ...prev, email: "" }));
            }
            return;
        }

        // Effacer l’erreur au fur et à mesure
        setErrors((prev) => ({
            ...prev,
            [id]: value.trim() === "" ? "Ce champ est obligatoire." : ""
        }));
    };

    const validateStep = (currentStep: number) => {
        const newErrors: any = {};

        if (currentStep === 1) {
            if (!form.email.trim()) newErrors.email = "Veuillez entrer votre email professionnel.";
            else if (!isValidEmail(form.email)) newErrors.email = "Format email invalide.";
            if (!form.firstName.trim()) newErrors.firstName = "Veuillez entrer votre prénom.";
            if (!form.lastName.trim()) newErrors.lastName = "Veuillez entrer votre nom.";
        } else if (currentStep === 2) {
            if (!form.jobTitle.trim()) newErrors.jobTitle = "Veuillez entrer votre fonction.";
            if (!form.company.trim()) newErrors.company = "Veuillez entrer le nom de votre société.";
            if (!form.country) newErrors.country = "Veuillez sélectionner votre pays.";
        } else if (currentStep === 3) {
            const phoneDigits = form.phone.replace(/\D/g, ''); // Remove all non-digits
            if (!form.phone.trim() || phoneDigits.length < 8) {
                newErrors.phone = "Veuillez entrer un numéro de téléphone valide.";
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

        if (!validateStep(step)) return;

        setLoading(true);

        try {
            // Submit to our Next.js API route which forwards to Pardot
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    jobTitle: form.jobTitle,
                    company: form.company,
                    country: form.country,
                    phone: form.phone,
                }),
            });

            const result = await response.json();

            console.log('API Response:', result);

            if (result.ok) {
                setLoading(false);
                setSendDatas(true);
                // Redirect to success page
                window.location.href = 'https://vocalcom.vercel.app/thank-you';
            } else {
                console.error('Submission failed:', result);
                throw new Error(result.error || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            setLoading(false);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-700">Étape {step}/{totalSteps}</span>
                    <span className="text-xs font-medium text-[#24B7C3]">{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-[#1E75D9] to-[#24B7C3] h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center mb-4">
                        <h4 className="text-base font-bold text-gray-900">Vos informations</h4>
                        <p className="text-xs text-gray-500 mt-1">Pour vous identifier</p>
                    </div>

                    <div>
                        <label htmlFor="email" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.email ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiEmailOutline} size={0.6} />
                                E-mail professionnel
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
                                ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                            placeholder="jean@entreprise.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="firstName" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.firstName ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiAccountOutline} size={0.6} />
                                Prénom
                            </div>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.firstName ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                            placeholder="Jean"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.lastName ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiAccountOutline} size={0.6} />
                                Nom
                            </div>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.lastName ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                            placeholder="Dupont"
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
                        <h4 className="text-base font-bold text-gray-900">Votre entreprise</h4>
                        <p className="text-xs text-gray-500 mt-1">Pour personnaliser votre démo</p>
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.jobTitle ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiAccountOutline} size={0.6} />
                                Fonction
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
                                ${errors.jobTitle ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                            placeholder="Directeur Service Client"
                        />
                        {errors.jobTitle && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.jobTitle}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="company" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.company ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiOfficeBuilding} size={0.6} />
                                Nom de la société
                            </div>
                        </label>
                        <input
                            type="text"
                            id="company"
                            value={form.company}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.company ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                            placeholder="Votre Société"
                        />
                        {errors.company && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.company}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="country" className={`block text-xs font-medium mb-2 ml-1 ${errors.country ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiEarth} size={0.6} />
                                Pays
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
                                    ${errors.country ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                                `}
                                placeholder="Rechercher votre pays..."
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
                        <h4 className="text-base font-bold text-gray-900">Dernière étape !</h4>
                        <p className="text-xs text-gray-500 mt-1">Comment vous joindre ?</p>
                    </div>

                    <div>
                        <label htmlFor="phone" className={`block text-xs font-medium mb-1.5 ml-1 ${errors.phone ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiPhone} size={0.6} />
                                Téléphone
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
                                ${errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                            placeholder="+33 6 12 34 56 78"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.phone}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
                {step > 1 && !sendDatas && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                        <Icon path={mdiArrowLeft} size={0.7} />
                        Retour
                    </button>
                )}

                {step < totalSteps ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-3 bg-gradient-to-r from-[#1E75D9] to-[#24B7C3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                    >
                        Suivant
                        <Icon path={mdiArrowRight} size={0.7} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 py-3 bg-gradient-to-r from-[#1E75D9] to-[#24B7C3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group text-sm
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
                        {sendDatas ? "Demande envoyée ✓" : loading ? "Envoi..." : "Obtenir ma démo"}
                        {!loading && !sendDatas && <Icon path={mdiArrowRight} size={0.7} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                )}
            </div>

            {sendDatas && (
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                    <p className="text-green-700 font-semibold text-xs">✅ Merci ! Nous vous contactons sous 2h ouvrées.</p>
                </div>
            )}
        </form>
    );
}
