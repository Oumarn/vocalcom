"use client";

import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { useLanguage } from "../../hooks/useLanguage";
import { getCalendlyConfig, getCalendlyConfigByCountry, mapRegionKeyToCalendly, type CalendlyRegion } from "@/config/calendly-config";
import { resolveRegionFromUTM } from "@/lib/region-resolver";

// Declare dataLayer for GTM and LinkedIn Insight Tag
declare global {
  interface Window {
    dataLayer: any[];
    lintrk: (action: string, options: { conversion_id: number }) => void;
  }
}

interface DemoFormProps {
  customButtonText?: string;
  showHelpField?: boolean;
}

export default function NewDemoFormEs({ showHelpField = false }: DemoFormProps = {}) {
  const { locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [___, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Autocomplete state
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    } else {
      // Block generic/free email providers
      const genericDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
        'aol.com', 'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com',
        'gmx.com', 'yandex.com', 'mail.ru', 'inbox.com', 'fastmail.com',
        'tutanota.com', 'hushmail.com', 'lycos.com', 'rediffmail.com',
        'free.fr', 'orange.fr', 'laposte.net', 'sfr.fr', 'wanadoo.fr',
        'hotmail.fr', 'live.fr', 'msn.com', 'qq.com', '163.com', '126.com',
        'email.com', 'email.fr', 'email.es', 'email.pt',
        // Outlook/Hotmail/Live regional variations
        'outlook.fr', 'outlook.es', 'outlook.pt', 'outlook.co.uk', 'outlook.de',
        'outlook.it', 'outlook.com.br', 'outlook.com.au', 'outlook.com.ar',
        'outlook.com.mx', 'outlook.co.jp', 'outlook.ca', 'outlook.co.in',
        'outlook.com.tr', 'outlook.sa', 'outlook.ae', 'outlook.be', 'outlook.at',
        'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th',
        'outlook.com.pe', 'outlook.com.co', 'outlook.com.vn', 'outlook.dk',
        'outlook.ie', 'outlook.jp', 'outlook.kr', 'outlook.my', 'outlook.ph',
        'outlook.sg', 'outlook.in',
        'hotmail.co.uk', 'hotmail.es', 'hotmail.de', 'hotmail.it', 'hotmail.com.br',
        'hotmail.com.ar', 'hotmail.com.mx', 'hotmail.co.jp', 'hotmail.ca',
        'hotmail.com.au', 'hotmail.co.in', 'hotmail.be', 'hotmail.nl', 'hotmail.pt',
        'hotmail.com.tr', 'hotmail.co.nz', 'hotmail.ch', 'hotmail.at',
        'live.co.uk', 'live.de', 'live.it', 'live.es', 'live.com.br',
        'live.com.ar', 'live.com.mx', 'live.co.jp', 'live.ca', 'live.com.au',
        'live.co.in', 'live.be', 'live.nl', 'live.pt', 'live.at', 'live.ie',
        // Yahoo regional variations
        'yahoo.fr', 'yahoo.co.uk', 'yahoo.es', 'yahoo.pt', 'yahoo.com.br',
        'yahoo.de', 'yahoo.it', 'yahoo.ca', 'yahoo.co.in', 'yahoo.com.au',
        'yahoo.co.jp', 'yahoo.com.mx', 'yahoo.com.ar', 'yahoo.co.id',
        'ymail.com', 'rocketmail.com',
        // Disposable/temporary email providers
        'yopmail.com', 'yopmail.fr', 'guerrillamail.com', 'mailinator.com',
        'tempmail.com', 'throwaway.email', 'sharklasers.com', 'guerrillamailblock.com',
        'grr.la', 'dispostable.com', 'maildrop.cc', 'trashmail.com',
        'io.com', 'yourdomain.com',
        // Gmail typo/spam variations
        'gmaio.com', 'gmile.com', 'gmail.com16', 'gamil.com', 'gamail.com', 'gmaio.coklm',
        'gaiml.com', 'gmial.com', 'gimail.com', 'glmail.com', 'gmaill.com', 'gnail.com',
        'gmal.com', 'gmaul.com', 'gmali.com', 'gaml.com', 'gmill.com', 'gemail.com',
        'gimel.com', 'gmeil.com', 'gmsil.com', 'gmaik.com', 'gmaol.com',
        // Other fake/spam domains
        'google.chrome'
      ];
      const emailLower = formData.email.toLowerCase();
      const emailDomain = emailLower.split('@')[1];
      const emailLocal = emailLower.split('@')[0];

      // Block generic domains
      if (genericDomains.includes(emailDomain)) {
        newErrors.email = 'Please use your professional email address';
      }

      // Block domains containing 'email' (e.g., anything@email.*)
      if (emailDomain && emailDomain.includes('email')) {
        newErrors.email = 'Please use your professional email address';
      }

      // Block domains containing 'gmail', 'gmai', 'hotmail', 'outlook', 'yahoo' or 'live.' anywhere, or starting with 'gm' (catches all typos/variations)
      if (emailDomain && (emailDomain.includes('gmail') || emailDomain.includes('gmai') || emailDomain.includes('hotmail') || emailDomain.includes('outlook') || emailDomain.includes('yahoo') || emailDomain.startsWith('live.') || emailDomain.split('.')[0].startsWith('gm'))) {
        newErrors.email = 'Please use your professional email address';
      }

      // Block gmail anagrams — domain name part that is a rearrangement of 'gmail' letters (catches gaiml, gmial, gimail, etc.)
      if (emailDomain) {
        const domainName = emailDomain.split('.')[0].toLowerCase();
        // Check if domain name (4-6 chars) is a gmail anagram/variation
        if (domainName.length >= 4 && domainName.length <= 6) {
          const sorted = domainName.split('').sort().join('');
          if (sorted === 'agilm' || sorted === 'agiilm' || sorted === 'agillm' || sorted === 'agilmm') {
            newErrors.email = 'Please use your professional email address';
          }
        }
      }

      // Block domains containing numbers (e.g., mail123.com, 163.com, qq123.com) — legitimate business domains don't have numbers
      if (emailDomain && /\d/.test(emailDomain.split('.')[0])) {
        newErrors.email = 'Please use your professional email address';
      }

      // Block test/fake/generic email patterns
      const blockedPatterns = [
        /^test/i, /test$/i, /testing/i,
        /^demo/i, /demo$/i,
        /^fake/i, /fake$/i,
        /^sample/i, /sample$/i,
        /^example/i, /example$/i,
        /^admin/i, /^info/i, /^contact/i, /^support/i,
        /^noreply/i, /^no-reply/i,
        /^temp/i, /temporary/i,
        /^spam/i, /^junk/i,
        /^dummy/i, /^placeholder/i,
        /^asdf/i, /^qwerty/i, /^123/i,
        /^abc/i, /^xyz/i,
        /company/i, /compny/i, /entreprise/i, /empresa/i
      ];

      if (blockedPatterns.some(pattern => pattern.test(emailLocal))) {
        newErrors.email = 'Please use a valid professional email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }
    setIsSubmitting(true);

    try {

      // Persist user data for Enhanced Conversions (Google Ads)
      localStorage.setItem('vocalcom_user_email', formData.email?.toLowerCase().trim() || '');

      // Show Calendly widget immediately
      setTimeout(() => {
        window.location.href = "/es/solicita-una-demo"
      }, 300);

    } catch (error) {
      console.error('[DemoForm] Error processing form:', error);
      setShowCalendly(true);
      setIsSubmitting(false);
    }
  };
  const translations = {
    fr: {
      email: 'Email professionnel',
      emailPlaceholder: 'votre@email.com',
      helpMessage: 'Comment pouvons-nous vous aider ?',
      helpPlaceholder: 'Décrivez brièvement votre besoin...',
      firstName: 'Prénom',
      lastName: 'Nom',
      company: 'Entreprise',
      phone: 'Téléphone',
      country: 'Pays',
      countryPlaceholder: 'Rechercher un pays...',
      jobTitle: 'Poste',
      marketingConsent: 'Oui, j\'accepte de recevoir des communications marketing sur les produits, services et évènements de Vocalcom. Je comprends que je peux me désabonner à tout moment.',
      next: 'Suivant',
      back: 'Retour',
      submit: 'Réserver ma démo',
      submitting: 'Envoi en cours...',
      selectTime: 'Sélectionnez votre créneau',
      selectTimeDesc: 'Choisissez un horaire qui vous convient',
    },
    en: {
      email: 'Business Email',
      emailPlaceholder: 'your@email.com',
      helpMessage: 'How can we help you?',
      helpPlaceholder: 'Briefly describe your need...',
      firstName: 'First Name',
      lastName: 'Last Name',
      company: 'Company',
      phone: 'Phone',
      country: 'Country',
      countryPlaceholder: 'Search for a country...',
      jobTitle: 'Job Title',
      marketingConsent: 'Yes, I agree to receive marketing communications about Vocalcom products, services and events. I understand that I can unsubscribe at any time.',
      next: 'Next',
      back: 'Back',
      submit: 'Book my demo',
      submitting: 'Submitting...',
      selectTime: 'Select your time slot',
      selectTimeDesc: 'Choose a time that works for you',
    },
    es: {
      email: 'Email profesional',
      emailPlaceholder: 'tu@email.com',
      helpMessage: '¿Cómo podemos ayudarte?',
      helpPlaceholder: 'Describe brevemente tu necesidad...',
      firstName: 'Nombre',
      lastName: 'Apellido',
      company: 'Empresa',
      phone: 'Teléfono',
      country: 'País',
      countryPlaceholder: 'Buscar un país...',
      jobTitle: 'Cargo',
      marketingConsent: 'Sí, acepto recibir comunicaciones de marketing sobre productos, servicios y eventos de Vocalcom. Entiendo que puedo darme de baja en cualquier momento.',
      next: 'Siguiente',
      back: 'Volver',
      submit: 'Reservar mi demo',
      submitting: 'Enviando...',
      selectTime: 'Selecciona tu horario',
      selectTimeDesc: 'Elige un horario que te convenga',
    },
    pt: {
      email: 'Email profissional',
      emailPlaceholder: 'seu@email.com',
      helpMessage: 'Como podemos ajudá-lo?',
      helpPlaceholder: 'Descreva brevemente sua necessidade...',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      company: 'Empresa',
      phone: 'Telefone',
      country: 'País',
      countryPlaceholder: 'Pesquisar um país...',
      jobTitle: 'Cargo',
      marketingConsent: 'Sim, concordo em receber comunicações de marketing sobre produtos, serviços e eventos da Vocalcom. Compreendo que posso cancelar a inscrição a qualquer momento.',
      next: 'Próximo',
      back: 'Voltar',
      submit: 'Reservar minha demo',
      submitting: 'Enviando...',
      selectTime: 'Selecione seu horário',
      selectTimeDesc: 'Escolha um horário que funcione para você',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <form className="w-full max-w-md mx-auto space-y-6">
      {/* Step 1: Email */}
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.emailPlaceholder}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-sm font-bold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          style={{ background: 'linear-gradient(90deg, #F6A02E, #f97316)' }}
        >
          {t.next}
          <Icon path={mdiArrowRight} size={0.8} className="transition-transform" />
        </button>
      </div>
    </form>
  );
}
