"use client";

import { useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowRight, mdiCheck, mdiArrowLeft, mdiEmailOutline, mdiAccountOutline, mdiOfficeBuilding, mdiPhone, mdiEarth } from "@mdi/js";

export default function DemoForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sendDatas, setSendDatas] = useState(false);
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
        country: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
        country: ""
    });

    const totalSteps = 3;
    
    const countries = [
        "France", "Belgique", "Suisse", "Canada", "Luxembourg",
        "Maroc", "Tunisie", "Algérie", "Sénégal", "Côte d'Ivoire",
        "Autre"
    ];

    // Vérification du format email
    const isValidEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
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
            if (!form.company.trim()) newErrors.company = "Veuillez entrer le nom de votre société.";
            if (!form.phone.trim()) newErrors.phone = "Veuillez entrer votre téléphone.";
        } else if (currentStep === 3) {
            if (!form.country) newErrors.country = "Veuillez sélectionner votre pays.";
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
            company: "",
            phone: "",
            country: ""
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSendDatas(false);

        if (!validateStep(step)) return;

        if (!validateStep(step)) return;

        console.log("Formulaire valide :", form);
        setLoading(true);

        // Simulation d'envoi API
        setTimeout(() => {
            setLoading(false);
            setSendDatas(true);
        }, 2000);
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

            {/* Step 2: Company Info */}
            {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center mb-4">
                        <h4 className="text-base font-bold text-gray-900">Votre entreprise</h4>
                        <p className="text-xs text-gray-500 mt-1">Pour personnaliser votre démo</p>
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
                            autoFocus
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

            {/* Step 3: Country */}
            {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center mb-4">
                        <h4 className="text-base font-bold text-gray-900">Dernière étape !</h4>
                        <p className="text-xs text-gray-500 mt-1">Où êtes-vous situé ?</p>
                    </div>

                    <div>
                        <label htmlFor="country" className={`block text-xs font-medium mb-2 ml-1 ${errors.country ? "text-red-500" : "text-gray-700"}`}>
                            <div className="flex items-center gap-1.5">
                                <Icon path={mdiEarth} size={0.6} />
                                Pays
                            </div>
                        </label>
                        <select
                            id="country"
                            value={form.country}
                            onChange={handleChange}
                            autoFocus
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm 
                                focus:ring-2 focus:border-transparent outline-none transition-all
                                ${errors.country ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-[#24B7C3]"}
                            `}
                        >
                            <option value="">Sélectionnez votre pays</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {errors.country && (
                            <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {errors.country}</p>
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
