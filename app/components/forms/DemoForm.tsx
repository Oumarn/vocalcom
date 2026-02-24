"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { getCalendlyConfig, getCalendlyConfigByCountry, mapRegionKeyToCalendly, type CalendlyRegion } from "@/config/calendly-config";
import { resolveRegionFromUTM } from "@/lib/region-resolver";

// Declare dataLayer for GTM
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface DemoFormProps {
  customButtonText?: string;
}

export default function DemoForm({ customButtonText }: DemoFormProps = {}) {
  const { locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  
  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    country: "",
    jobTitle: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Autocomplete state
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Array<{ value: string; label: any; phonePrefix: string }>>([]);
  
  // Phone formatting state
  const [phonePrefix, setPhonePrefix] = useState("+33");
  
  // Attribution tracking state
  const [attribution, setAttribution] = useState<{
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_source_platform?: string;
    utm_term?: string;
    utm_content?: string;
    utm_creative?: string;
    utm_matchtype?: string;
    utm_network?: string;
    utm_device?: string;
    campaign_name?: string;
    adgroup_name?: string;
    gclid?: string;
    fbclid?: string;
    calendly_event?: string;
    meeting_date?: string;
  }>({});

  // Capture UTM parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    
    // Helper to get value and persist to localStorage
    const getStored = (key: string): string | undefined => {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(`vocalcom_${key}`, value);
        return value;
      }
      return localStorage.getItem(`vocalcom_${key}`) || undefined;
    };
    
    const fullUtm = {
      utm_source: getStored('utm_source'),
      utm_medium: getStored('utm_medium'),
      utm_campaign: getStored('utm_campaign'),
      utm_source_platform: getStored('utm_source_platform'),
      utm_term: getStored('utm_term'),
      utm_content: getStored('utm_content'),
      utm_creative: getStored('utm_creative'),
      utm_matchtype: getStored('utm_matchtype'),
      utm_network: getStored('utm_network'),
      utm_device: getStored('utm_device'),
      campaign_name: getStored('campaign_name'),
      adgroup_name: getStored('adgroup_name'),
      gclid: getStored('gclid'),
      fbclid: getStored('fbclid'),
    };
    
    setAttribution(fullUtm);
  }, []);

  // Update Calendly URL based on UTM parameters and locale
  useEffect(() => {
    // Use campaign_name first (Google Ads), fallback to utm_campaign
    const campaignValue = attribution.campaign_name || attribution.utm_campaign;
    
    // Only run routing if we have campaign data or this is not the first render
    if (!campaignValue && Object.keys(attribution).length === 0) {
      // First render, no data yet - use default based on locale
      const defaultRegion = locale === 'fr' ? 'france_core' : 
                           locale === 'es' ? 'spain' :
                           locale === 'pt' ? 'brazil_pt' : 'en_europe';
      const calendlyRegion = mapRegionKeyToCalendly(defaultRegion);
      const config = getCalendlyConfig(calendlyRegion);
      setCalendlyUrl(config.eventUrl);
      
      // Store region/language for GTM tracking
      localStorage.setItem('vocalcom_region', defaultRegion);
      localStorage.setItem('vocalcom_landing_language', locale || 'fr');
      localStorage.setItem('vocalcom_calendly_team', calendlyRegion);
      return;
    }
    
    // Resolve region from UTM parameters
    const regionKey = resolveRegionFromUTM({
      utm_campaign: campaignValue,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      lang: locale,
    });
    
    console.log('[DemoForm] Campaign value:', campaignValue);
    console.log('[DemoForm] Resolved region from UTM:', regionKey);
    
    // Map RegionKey to CalendlyRegion
    const calendlyRegion = mapRegionKeyToCalendly(regionKey);
    console.log('[DemoForm] Mapped to Calendly region:', calendlyRegion);
    
    // Get Calendly config for the region
    const config = getCalendlyConfig(calendlyRegion);
    console.log('[DemoForm] Calendly config:', config);
    
    // Set the URL
    setCalendlyUrl(config.eventUrl);
    
    // Store region/language for GTM tracking
    localStorage.setItem('vocalcom_region', regionKey);
    localStorage.setItem('vocalcom_landing_language', locale || 'fr');
    localStorage.setItem('vocalcom_calendly_team', calendlyRegion);
  }, [attribution, locale]);

  // Listen for Calendly booking events and handle Pardot submission
  useEffect(() => {
    if (!showCalendly) return;

    // Track if submission is in progress or completed to prevent duplicates
    let isSubmitting = false;
    let submissionCompleted = false;

    // Function to submit to Pardot
    const submitToPardot = async (bookingData?: any) => {
      // Prevent duplicate submissions
      if (isSubmitting || submissionCompleted) {
        console.log('[DemoForm] Skipping duplicate Pardot submission');
        return;
      }

      isSubmitting = true;

      try {
        const storedData = localStorage.getItem('vocalcom_form_submission');
        if (!storedData) {
          console.error('[DemoForm] No form data found in localStorage');
          isSubmitting = false;
          return;
        }

        const formSubmission = JSON.parse(storedData);
        const pardotUrl = 'https://go.vocalcom.com/l/1029911/2026-01-04/363cd';
        
        const pardotFields: { [key: string]: string } = {
          email: formSubmission.email,
          first_name: formSubmission.firstName,
          last_name: formSubmission.lastName,
          company: formSubmission.company,
          phone: formSubmission.phone,
        };

        // Add booking details if available
        if (bookingData) {
          console.log('[DemoForm] Including booking details:', bookingData);
          
          // Map to Pardot form handler fields
          if (bookingData.event?.start_time) {
            const meetingDate = new Date(bookingData.event.start_time);
            pardotFields.meeting_date = meetingDate.toISOString();
          }
          if (bookingData.event?.uri) {
            pardotFields.calendly_event = bookingData.event.uri;
          }
          if (bookingData.invitee?.uri) {
            pardotFields.calendly_invitee_uri = bookingData.invitee.uri;
          }
          pardotFields.calendly_booking_status = 'completed';
        } else {
          pardotFields.calendly_booking_status = 'form_only';
        }

        // Add optional fields
        if (formSubmission.country) pardotFields.country = formSubmission.country;
        if (formSubmission.jobTitle) pardotFields.job_title = formSubmission.jobTitle;
        
        // Add landing language
        const landingLanguage = localStorage.getItem('vocalcom_landing_language');
        if (landingLanguage) pardotFields.landing_language = landingLanguage;
        
        // Add all UTM and attribution parameters
        if (formSubmission.attribution?.utm_source) pardotFields.utm_source = formSubmission.attribution.utm_source;
        if (formSubmission.attribution?.utm_medium) pardotFields.utm_medium = formSubmission.attribution.utm_medium;
        if (formSubmission.attribution?.utm_campaign) pardotFields.utm_campaign = formSubmission.attribution.utm_campaign;
        if (formSubmission.attribution?.utm_term) pardotFields.utm_term = formSubmission.attribution.utm_term;
        if (formSubmission.attribution?.utm_content) pardotFields.utm_content = formSubmission.attribution.utm_content;
        if (formSubmission.attribution?.utm_creative) pardotFields.utm_creative = formSubmission.attribution.utm_creative;
        if (formSubmission.attribution?.utm_matchtype) pardotFields.utm_matchtype = formSubmission.attribution.utm_matchtype;
        if (formSubmission.attribution?.utm_network) pardotFields.utm_network = formSubmission.attribution.utm_network;
        if (formSubmission.attribution?.utm_device) pardotFields.utm_device = formSubmission.attribution.utm_device;
        if (formSubmission.attribution?.gclid) pardotFields.gclid = formSubmission.attribution.gclid;
        
        // Add Google Ads campaign and adgroup names
        if (formSubmission.attribution?.campaign_name) pardotFields.campaign_name = formSubmission.attribution.campaign_name;
        if (formSubmission.attribution?.adgroup_name) pardotFields.adgroup_name = formSubmission.attribution.adgroup_name;

        const pardotData = new URLSearchParams(pardotFields);

        console.log('[DemoForm] Submitting to Pardot:', Object.fromEntries(pardotData));

        await fetch(pardotUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: pardotData.toString(),
          mode: 'no-cors',
        });

        console.log('[DemoForm] Pardot submission completed');
        
        // Mark as completed and clear the stored data immediately to prevent double submission
        submissionCompleted = true;
        localStorage.removeItem('vocalcom_form_submission');
      } catch (error) {
        console.error('[DemoForm] Error submitting to Pardot:', error);
      } finally {
        isSubmitting = false;
      }
    };

    // Handle Calendly booking event
    const handleMessage = async (e: MessageEvent) => {
      // Only handle events from Calendly
      if (e.origin !== 'https://calendly.com') return;
      
      if (e.data.event === 'calendly.event_scheduled') {
        console.log('[DemoForm] Event scheduled:', e.data);
        
        // Check if already submitted to prevent double submission
        const alreadySubmitted = localStorage.getItem('vocalcom_submission_completed');
        if (alreadySubmitted) {
          console.log('[DemoForm] Already submitted, skipping duplicate');
          return;
        }
        
        // Fire GTM demo_booked event FIRST (before any async operations)
        if (typeof window !== 'undefined') {
          // Check GTM dedupe flag
          if (localStorage.getItem('vocalcom_demo_booked')) {
            console.log('[DemoForm] GTM demo_booked already fired, skipping');
          } else {
            localStorage.setItem('vocalcom_demo_booked', 'true');
            
            // Helper to get localStorage with vocalcom_ prefix
            const ls = (k: string) => localStorage.getItem(`vocalcom_${k}`) || '';
            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'demo_booked',
              
              conversion_type: 'primary',
              booking_status: 'completed',
              
              // Click IDs
              gclid: ls('gclid'),
              fbclid: ls('fbclid'),
              
              // Core UTM parameters
              utm_source: ls('utm_source'),
              utm_medium: ls('utm_medium'),
              utm_source_platform: ls('utm_source_platform'),
              utm_campaign: ls('utm_campaign'),
              
              // Extended UTM tracking
              utm_content: ls('utm_content'),
              utm_term: ls('utm_term'),
              utm_creative: ls('utm_creative'),
              utm_device: ls('utm_device'),
              utm_network: ls('utm_network'),
              utm_matchtype: ls('utm_matchtype'),
              
              // Google Ads specific
              campaign_name: ls('campaign_name'),
              adgroup_name: ls('adgroup_name'),
              
              // Regional routing
              region: localStorage.getItem('vocalcom_region') || '',
              landing_language: localStorage.getItem('vocalcom_landing_language') || '',
              calendly_team: localStorage.getItem('vocalcom_calendly_team') || '',
              
              // Calendly booking details
              calendly_event_uri: e.data.payload?.event?.uri || '',
              meeting_start_time: e.data.payload?.event?.start_time || '',
              
              // Deduplication ID
              event_id: `demo_${Date.now()}`
            });
            
            console.log('[DemoForm] GTM demo_booked event fired');
          }
        }
        
        // Mark as submitted immediately
        localStorage.setItem('vocalcom_submission_completed', 'true');
        
        // Submit to Pardot with booking details
        await submitToPardot(e.data.payload);

        // Store language preference
        localStorage.setItem('vocalcom_landing_language', locale || 'fr');
        
        // Wait 2 seconds before redirecting to thank you page
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 2000);
      }
    };

    // Handle user leaving without booking
    const handleBeforeUnload = () => {
      // Check if booking was completed
      const bookingCompleted = localStorage.getItem('vocalcom_submission_completed');
      if (bookingCompleted) {
        console.log('[DemoForm] Booking completed, skipping beforeunload submission');
        return;
      }
      
      // Fire GTM demo_abandoned event
      if (typeof window !== 'undefined' && !localStorage.getItem('vocalcom_demo_booked')) {
        const ls = (k: string) => localStorage.getItem(`vocalcom_${k}`) || '';
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'demo_abandoned',
          
          booking_status: 'abandoned',
          
          // Click IDs
          gclid: ls('gclid'),
          fbclid: ls('fbclid'),
          
          // Core UTM parameters
          utm_source: ls('utm_source'),
          utm_medium: ls('utm_medium'),
          utm_campaign: ls('utm_campaign'),
          campaign_name: ls('campaign_name'),
          
          // Regional routing
          region: localStorage.getItem('vocalcom_region') || '',
          landing_language: localStorage.getItem('vocalcom_landing_language') || '',
          
          // Deduplication ID
          event_id: `abandoned_${Date.now()}`
        });
        
        console.log('[DemoForm] GTM demo_abandoned event fired');
      }
      
      // Only submit if not already submitted and data still exists
      const storedData = localStorage.getItem('vocalcom_form_submission');
      if (storedData && !submissionCompleted) {
        console.log('[DemoForm] User leaving without booking, submitting to Pardot');
        // Submit synchronously before page unloads
        const formSubmission = JSON.parse(storedData);
        const pardotUrl = 'https://go.vocalcom.com/l/1029911/2026-01-04/363cd';
        
        const pardotFields: { [key: string]: string } = {
          email: formSubmission.email,
          first_name: formSubmission.firstName,
          last_name: formSubmission.lastName,
          company: formSubmission.company,
          phone: formSubmission.phone,
          calendly_booking_status: 'abandoned',
        };

        if (formSubmission.country) pardotFields.country = formSubmission.country;
        if (formSubmission.jobTitle) pardotFields.job_title = formSubmission.jobTitle;
        
        // Add all UTM and attribution parameters
        if (formSubmission.attribution?.utm_source) pardotFields.utm_source = formSubmission.attribution.utm_source;
        if (formSubmission.attribution?.utm_medium) pardotFields.utm_medium = formSubmission.attribution.utm_medium;
        if (formSubmission.attribution?.utm_campaign) pardotFields.utm_campaign = formSubmission.attribution.utm_campaign;
        if (formSubmission.attribution?.utm_source_platform) pardotFields.utm_source_platform = formSubmission.attribution.utm_source_platform;
        if (formSubmission.attribution?.utm_term) pardotFields.utm_term = formSubmission.attribution.utm_term;
        if (formSubmission.attribution?.utm_content) pardotFields.utm_content = formSubmission.attribution.utm_content;
        if (formSubmission.attribution?.utm_creative) pardotFields.utm_creative = formSubmission.attribution.utm_creative;
        if (formSubmission.attribution?.utm_matchtype) pardotFields.utm_matchtype = formSubmission.attribution.utm_matchtype;
        if (formSubmission.attribution?.utm_network) pardotFields.utm_network = formSubmission.attribution.utm_network;
        if (formSubmission.attribution?.utm_device) pardotFields.utm_device = formSubmission.attribution.utm_device;
        if (formSubmission.attribution?.campaign_name) pardotFields.campaign_name = formSubmission.attribution.campaign_name;
        if (formSubmission.attribution?.adgroup_name) pardotFields.adgroup_name = formSubmission.attribution.adgroup_name;
        if (formSubmission.attribution?.gclid) pardotFields.gclid = formSubmission.attribution.gclid;

        const pardotData = new URLSearchParams(pardotFields);

        // Use sendBeacon for reliable submission before unload
        navigator.sendBeacon(pardotUrl, pardotData);
        localStorage.removeItem('vocalcom_form_submission');
      }
    };
    
    window.addEventListener('message', handleMessage);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showCalendly, locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone to maintain format
    if (name === 'phone') {
      // Remove all non-digit and non-space characters except plus at start
      const cleaned = value.replace(/[^\d\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountrySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountrySearch(value);
    setShowCountryDropdown(true);
    
    // Filter countries based on search
    if (value.trim() === '') {
      setFilteredCountries(countries.slice(1)); // Exclude placeholder
    } else {
      const searchLower = value.toLowerCase();
      const filtered = countries.filter((country) => {
        if (country.value === '') return false; // Exclude placeholder
        const labels = Object.values(country.label);
        return labels.some(label => 
          typeof label === 'string' && label.toLowerCase().includes(searchLower)
        ) || country.value.toLowerCase().includes(searchLower);
      });
      setFilteredCountries(filtered);
    }
  };

  const handleCountrySelect = (country: { value: string; label: any; phonePrefix: string }) => {
    setFormData(prev => ({ ...prev, country: country.value }));
    setCountrySearch(country.label[locale as keyof typeof country.label] || country.label.en);
    setShowCountryDropdown(false);
    
    // Update phone prefix when country changes
    if (country.phonePrefix) {
      setPhonePrefix(country.phonePrefix);
      // Clear phone field when country changes to avoid mixing prefixes
      setFormData(prev => ({ ...prev, phone: '' }));
    }
    
    // Update Calendly URL based on selected country (use English value for consistent matching)
    console.log('[DemoForm] Country selected:', country.value);
    
    // Find the appropriate Calendly config for this country
    const calendlyConfig = getCalendlyConfigByCountry(country.value);
    console.log('[DemoForm] Calendly config for country:', calendlyConfig);
    setCalendlyUrl(calendlyConfig.eventUrl);
    
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  const handleCountryBlur = () => {
    // Delay to allow click on dropdown item
    setTimeout(() => {
      setShowCountryDropdown(false);
    }, 200);
  };

  const handleCountryFocus = () => {
    setShowCountryDropdown(true);
    if (countrySearch === '' && filteredCountries.length === 0) {
      setFilteredCountries(countries.slice(1)); // Show all except placeholder
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
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
          'gimel.com', 'gmeil.com', 'gmsil.com', 'gmaik.com', 'gmaol.com'
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
        
        // Block domains containing 'gmail', 'gmai', 'hotmail', or 'yahoo' anywhere, or starting with 'gm' (catches all gmail typos/variations)
        if (emailDomain && (emailDomain.includes('gmail') || emailDomain.includes('gmai') || emailDomain.includes('hotmail') || emailDomain.includes('yahoo') || emailDomain.split('.')[0].startsWith('gm'))) {
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
    }

    if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }

    if (currentStep === 3) {
      if (!formData.company) newErrors.company = 'Company is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.phone) {
        newErrors.phone = 'Phone is required';
      } else {
        // Validate the complete phone number (prefix + user input)
        const fullPhone = `${phonePrefix} ${formData.phone}`.trim();
        if (!fullPhone.match(/^\+\d{1,4}\s?\d{6,14}$/)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
      }
      if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
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
  };

  // Helper to persist all attribution data consistently
  const persistAttribution = () => {
    if (typeof window === 'undefined') return;
    
    const qs = new URLSearchParams(window.location.search);
    const get = (k: string) => qs.get(k) || localStorage.getItem(`vocalcom_${k}`) || '';
    
    const keys = [
      'gclid',
      'fbclid',
      'utm_source',
      'utm_medium',
      'utm_source_platform',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'utm_creative',
      'utm_device',
      'utm_network',
      'utm_matchtype',
      'campaign_name',
      'adgroup_name',
    ];
    
    keys.forEach((k) => {
      const v = get(k);
      if (v) localStorage.setItem(`vocalcom_${k}`, v);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Clear flags to allow new booking
      localStorage.removeItem('vocalcom_submission_completed');
      localStorage.removeItem('vocalcom_demo_booked');
      
      // Persist all attribution data with consistent vocalcom_ prefix
      persistAttribution();
      
      // Store form data in localStorage for later Pardot submission
      const submissionData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: `${phonePrefix}${formData.phone.replace(/\s/g, '')}`,
        country: formData.country,
        jobTitle: formData.jobTitle,
        attribution,
        submittedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('vocalcom_form_submission', JSON.stringify(submissionData));
      console.log('[DemoForm] Form data saved to localStorage');

      // Show Calendly widget immediately
      setTimeout(() => {
        setShowCalendly(true);
        setIsSubmitting(false);
      }, 300);

    } catch (error) {
      console.error('[DemoForm] Error processing form:', error);
      setShowCalendly(true);
      setIsSubmitting(false);
    }
  };

  // Countries list with phone prefixes - values use Salesforce standard naming (English)
  const countries = [
    { value: '', label: { fr: 'Sélectionnez un pays', en: 'Select a country', es: 'Selecciona un país', pt: 'Selecione um país' }, phonePrefix: '' },
    
    // Europe - Western
    { value: 'France', label: { fr: 'France', en: 'France', es: 'Francia', pt: 'França' }, phonePrefix: '+33' },
    { value: 'Spain', label: { fr: 'Espagne', en: 'Spain', es: 'España', pt: 'Espanha' }, phonePrefix: '+34' },
    { value: 'Portugal', label: { fr: 'Portugal', en: 'Portugal', es: 'Portugal', pt: 'Portugal' }, phonePrefix: '+351' },
    { value: 'United Kingdom', label: { fr: 'Royaume-Uni', en: 'United Kingdom', es: 'Reino Unido', pt: 'Reino Unido' }, phonePrefix: '+44' },
    { value: 'Ireland', label: { fr: 'Irlande', en: 'Ireland', es: 'Irlanda', pt: 'Irlanda' }, phonePrefix: '+353' },
    { value: 'Germany', label: { fr: 'Allemagne', en: 'Germany', es: 'Alemania', pt: 'Alemanha' }, phonePrefix: '+49' },
    { value: 'Belgium', label: { fr: 'Belgique', en: 'Belgium', es: 'Bélgica', pt: 'Bélgica' }, phonePrefix: '+32' },
    { value: 'Netherlands', label: { fr: 'Pays-Bas', en: 'Netherlands', es: 'Países Bajos', pt: 'Países Baixos' }, phonePrefix: '+31' },
    { value: 'Luxembourg', label: { fr: 'Luxembourg', en: 'Luxembourg', es: 'Luxemburgo', pt: 'Luxemburgo' }, phonePrefix: '+352' },
    { value: 'Switzerland', label: { fr: 'Suisse', en: 'Switzerland', es: 'Suiza', pt: 'Suíça' }, phonePrefix: '+41' },
    { value: 'Austria', label: { fr: 'Autriche', en: 'Austria', es: 'Austria', pt: 'Áustria' }, phonePrefix: '+43' },
    
    // Europe - Southern
    { value: 'Italy', label: { fr: 'Italie', en: 'Italy', es: 'Italia', pt: 'Itália' }, phonePrefix: '+39' },
    { value: 'Greece', label: { fr: 'Grèce', en: 'Greece', es: 'Grecia', pt: 'Grécia' }, phonePrefix: '+30' },
    { value: 'Malta', label: { fr: 'Malte', en: 'Malta', es: 'Malta', pt: 'Malta' }, phonePrefix: '+356' },
    { value: 'Cyprus', label: { fr: 'Chypre', en: 'Cyprus', es: 'Chipre', pt: 'Chipre' }, phonePrefix: '+357' },
    
    // Europe - Nordic
    { value: 'Sweden', label: { fr: 'Suède', en: 'Sweden', es: 'Suecia', pt: 'Suécia' }, phonePrefix: '+46' },
    { value: 'Norway', label: { fr: 'Norvège', en: 'Norway', es: 'Noruega', pt: 'Noruega' }, phonePrefix: '+47' },
    { value: 'Denmark', label: { fr: 'Danemark', en: 'Denmark', es: 'Dinamarca', pt: 'Dinamarca' }, phonePrefix: '+45' },
    { value: 'Finland', label: { fr: 'Finlande', en: 'Finland', es: 'Finlandia', pt: 'Finlândia' }, phonePrefix: '+358' },
    { value: 'Iceland', label: { fr: 'Islande', en: 'Iceland', es: 'Islandia', pt: 'Islândia' }, phonePrefix: '+354' },
    
    // Europe - Eastern
    { value: 'Poland', label: { fr: 'Pologne', en: 'Poland', es: 'Polonia', pt: 'Polônia' }, phonePrefix: '+48' },
    { value: 'Czech Republic', label: { fr: 'République Tchèque', en: 'Czech Republic', es: 'República Checa', pt: 'República Checa' }, phonePrefix: '+420' },
    { value: 'Hungary', label: { fr: 'Hongrie', en: 'Hungary', es: 'Hungría', pt: 'Hungria' }, phonePrefix: '+36' },
    { value: 'Romania', label: { fr: 'Roumanie', en: 'Romania', es: 'Rumanía', pt: 'Romênia' }, phonePrefix: '+40' },
    { value: 'Bulgaria', label: { fr: 'Bulgarie', en: 'Bulgaria', es: 'Bulgaria', pt: 'Bulgária' }, phonePrefix: '+359' },
    { value: 'Croatia', label: { fr: 'Croatie', en: 'Croatia', es: 'Croacia', pt: 'Croácia' }, phonePrefix: '+385' },
    { value: 'Slovenia', label: { fr: 'Slovénie', en: 'Slovenia', es: 'Eslovenia', pt: 'Eslovênia' }, phonePrefix: '+386' },
    { value: 'Slovakia', label: { fr: 'Slovaquie', en: 'Slovakia', es: 'Eslovaquia', pt: 'Eslováquia' }, phonePrefix: '+421' },
    { value: 'Serbia', label: { fr: 'Serbie', en: 'Serbia', es: 'Serbia', pt: 'Sérvia' }, phonePrefix: '+381' },
    { value: 'Bosnia and Herzegovina', label: { fr: 'Bosnie-Herzégovine', en: 'Bosnia and Herzegovina', es: 'Bosnia y Herzegovina', pt: 'Bósnia e Herzegovina' }, phonePrefix: '+387' },
    { value: 'Montenegro', label: { fr: 'Monténégro', en: 'Montenegro', es: 'Montenegro', pt: 'Montenegro' }, phonePrefix: '+382' },
    { value: 'North Macedonia', label: { fr: 'Macédoine du Nord', en: 'North Macedonia', es: 'Macedonia del Norte', pt: 'Macedônia do Norte' }, phonePrefix: '+389' },
    { value: 'Albania', label: { fr: 'Albanie', en: 'Albania', es: 'Albania', pt: 'Albânia' }, phonePrefix: '+355' },
    { value: 'Kosovo', label: { fr: 'Kosovo', en: 'Kosovo', es: 'Kosovo', pt: 'Kosovo' }, phonePrefix: '+383' },
    { value: 'Moldova', label: { fr: 'Moldavie', en: 'Moldova', es: 'Moldavia', pt: 'Moldávia' }, phonePrefix: '+373' },
    { value: 'Ukraine', label: { fr: 'Ukraine', en: 'Ukraine', es: 'Ucrania', pt: 'Ucrânia' }, phonePrefix: '+380' },
    { value: 'Belarus', label: { fr: 'Biélorussie', en: 'Belarus', es: 'Bielorrusia', pt: 'Bielorrússia' }, phonePrefix: '+375' },
    { value: 'Russia', label: { fr: 'Russie', en: 'Russia', es: 'Rusia', pt: 'Rússia' }, phonePrefix: '+7' },
    { value: 'Georgia', label: { fr: 'Géorgie', en: 'Georgia', es: 'Georgia', pt: 'Geórgia' }, phonePrefix: '+995' },
    { value: 'Armenia', label: { fr: 'Arménie', en: 'Armenia', es: 'Armenia', pt: 'Armênia' }, phonePrefix: '+374' },
    { value: 'Azerbaijan', label: { fr: 'Azerbaïdjan', en: 'Azerbaijan', es: 'Azerbaiyán', pt: 'Azerbaijão' }, phonePrefix: '+994' },
    { value: 'Estonia', label: { fr: 'Estonie', en: 'Estonia', es: 'Estonia', pt: 'Estônia' }, phonePrefix: '+372' },
    { value: 'Latvia', label: { fr: 'Lettonie', en: 'Latvia', es: 'Letonia', pt: 'Letônia' }, phonePrefix: '+371' },
    { value: 'Lithuania', label: { fr: 'Lituanie', en: 'Lithuania', es: 'Lituania', pt: 'Lituânia' }, phonePrefix: '+370' },
    
    // Africa - North
    { value: 'Morocco', label: { fr: 'Maroc', en: 'Morocco', es: 'Marruecos', pt: 'Marrocos' }, phonePrefix: '+212' },
    { value: 'Algeria', label: { fr: 'Algérie', en: 'Algeria', es: 'Argelia', pt: 'Argélia' }, phonePrefix: '+213' },
    { value: 'Tunisia', label: { fr: 'Tunisie', en: 'Tunisia', es: 'Túnez', pt: 'Tunísia' }, phonePrefix: '+216' },
    { value: 'Libya', label: { fr: 'Libye', en: 'Libya', es: 'Libia', pt: 'Líbia' }, phonePrefix: '+218' },
    { value: 'Egypt', label: { fr: 'Égypte', en: 'Egypt', es: 'Egipto', pt: 'Egito' }, phonePrefix: '+20' },
    
    // Africa - West
    { value: 'Senegal', label: { fr: 'Sénégal', en: 'Senegal', es: 'Senegal', pt: 'Senegal' }, phonePrefix: '+221' },
    { value: 'Ivory Coast', label: { fr: 'Côte d\'Ivoire', en: 'Ivory Coast', es: 'Costa de Marfil', pt: 'Costa do Marfim' }, phonePrefix: '+225' },
    { value: 'Ghana', label: { fr: 'Ghana', en: 'Ghana', es: 'Ghana', pt: 'Gana' }, phonePrefix: '+233' },
    { value: 'Nigeria', label: { fr: 'Nigéria', en: 'Nigeria', es: 'Nigeria', pt: 'Nigéria' }, phonePrefix: '+234' },
    { value: 'Cameroon', label: { fr: 'Cameroun', en: 'Cameroon', es: 'Camerún', pt: 'Camarões' }, phonePrefix: '+237' },
    { value: 'Benin', label: { fr: 'Bénin', en: 'Benin', es: 'Benín', pt: 'Benin' }, phonePrefix: '+229' },
    { value: 'Togo', label: { fr: 'Togo', en: 'Togo', es: 'Togo', pt: 'Togo' }, phonePrefix: '+228' },
    { value: 'Mali', label: { fr: 'Mali', en: 'Mali', es: 'Malí', pt: 'Mali' }, phonePrefix: '+223' },
    { value: 'Burkina Faso', label: { fr: 'Burkina Faso', en: 'Burkina Faso', es: 'Burkina Faso', pt: 'Burkina Faso' }, phonePrefix: '+226' },
    { value: 'Niger', label: { fr: 'Niger', en: 'Niger', es: 'Níger', pt: 'Níger' }, phonePrefix: '+227' },
    { value: 'Guinea', label: { fr: 'Guinée', en: 'Guinea', es: 'Guinea', pt: 'Guiné' }, phonePrefix: '+224' },
    { value: 'Liberia', label: { fr: 'Libéria', en: 'Liberia', es: 'Liberia', pt: 'Libéria' }, phonePrefix: '+231' },
    { value: 'Sierra Leone', label: { fr: 'Sierra Leone', en: 'Sierra Leone', es: 'Sierra Leona', pt: 'Serra Leoa' }, phonePrefix: '+232' },
    { value: 'Gambia', label: { fr: 'Gambie', en: 'Gambia', es: 'Gambia', pt: 'Gâmbia' }, phonePrefix: '+220' },
    { value: 'Guinea-Bissau', label: { fr: 'Guinée-Bissau', en: 'Guinea-Bissau', es: 'Guinea-Bisáu', pt: 'Guiné-Bissau' }, phonePrefix: '+245' },
    { value: 'Mauritania', label: { fr: 'Mauritanie', en: 'Mauritania', es: 'Mauritania', pt: 'Mauritânia' }, phonePrefix: '+222' },
    { value: 'Cape Verde', label: { fr: 'Cap-Vert', en: 'Cape Verde', es: 'Cabo Verde', pt: 'Cabo Verde' }, phonePrefix: '+238' },
    
    // Africa - Central
    { value: 'Democratic Republic of the Congo', label: { fr: 'République Démocratique du Congo', en: 'Democratic Republic of the Congo', es: 'República Democrática del Congo', pt: 'República Democrática do Congo' }, phonePrefix: '+243' },
    { value: 'Republic of the Congo', label: { fr: 'République du Congo', en: 'Republic of the Congo', es: 'República del Congo', pt: 'República do Congo' }, phonePrefix: '+242' },
    { value: 'Central African Republic', label: { fr: 'République Centrafricaine', en: 'Central African Republic', es: 'República Centroafricana', pt: 'República Centro-Africana' }, phonePrefix: '+236' },
    { value: 'Chad', label: { fr: 'Tchad', en: 'Chad', es: 'Chad', pt: 'Chade' }, phonePrefix: '+235' },
    { value: 'Gabon', label: { fr: 'Gabon', en: 'Gabon', es: 'Gabón', pt: 'Gabão' }, phonePrefix: '+241' },
    { value: 'Equatorial Guinea', label: { fr: 'Guinée Équatoriale', en: 'Equatorial Guinea', es: 'Guinea Ecuatorial', pt: 'Guiné Equatorial' }, phonePrefix: '+240' },
    
    // Africa - East
    { value: 'Kenya', label: { fr: 'Kenya', en: 'Kenya', es: 'Kenia', pt: 'Quênia' }, phonePrefix: '+254' },
    { value: 'Tanzania', label: { fr: 'Tanzanie', en: 'Tanzania', es: 'Tanzania', pt: 'Tanzânia' }, phonePrefix: '+255' },
    { value: 'Uganda', label: { fr: 'Ouganda', en: 'Uganda', es: 'Uganda', pt: 'Uganda' }, phonePrefix: '+256' },
    { value: 'Ethiopia', label: { fr: 'Éthiopie', en: 'Ethiopia', es: 'Etiopía', pt: 'Etiópia' }, phonePrefix: '+251' },
    { value: 'Rwanda', label: { fr: 'Rwanda', en: 'Rwanda', es: 'Ruanda', pt: 'Ruanda' }, phonePrefix: '+250' },
    { value: 'Burundi', label: { fr: 'Burundi', en: 'Burundi', es: 'Burundi', pt: 'Burundi' }, phonePrefix: '+257' },
    { value: 'Somalia', label: { fr: 'Somalie', en: 'Somalia', es: 'Somalia', pt: 'Somália' }, phonePrefix: '+252' },
    { value: 'Djibouti', label: { fr: 'Djibouti', en: 'Djibouti', es: 'Yibuti', pt: 'Djibuti' }, phonePrefix: '+253' },
    { value: 'Eritrea', label: { fr: 'Érythrée', en: 'Eritrea', es: 'Eritrea', pt: 'Eritreia' }, phonePrefix: '+291' },
    { value: 'South Sudan', label: { fr: 'Soudan du Sud', en: 'South Sudan', es: 'Sudán del Sur', pt: 'Sudão do Sul' }, phonePrefix: '+211' },
    { value: 'Sudan', label: { fr: 'Soudan', en: 'Sudan', es: 'Sudán', pt: 'Sudão' }, phonePrefix: '+249' },
    
    // Africa - Southern
    { value: 'South Africa', label: { fr: 'Afrique du Sud', en: 'South Africa', es: 'Sudáfrica', pt: 'África do Sul' }, phonePrefix: '+27' },
    { value: 'Angola', label: { fr: 'Angola', en: 'Angola', es: 'Angola', pt: 'Angola' }, phonePrefix: '+244' },
    { value: 'Mozambique', label: { fr: 'Mozambique', en: 'Mozambique', es: 'Mozambique', pt: 'Moçambique' }, phonePrefix: '+258' },
    { value: 'Zimbabwe', label: { fr: 'Zimbabwe', en: 'Zimbabwe', es: 'Zimbabue', pt: 'Zimbábue' }, phonePrefix: '+263' },
    { value: 'Zambia', label: { fr: 'Zambie', en: 'Zambia', es: 'Zambia', pt: 'Zâmbia' }, phonePrefix: '+260' },
    { value: 'Malawi', label: { fr: 'Malawi', en: 'Malawi', es: 'Malaui', pt: 'Malawi' }, phonePrefix: '+265' },
    { value: 'Namibia', label: { fr: 'Namibie', en: 'Namibia', es: 'Namibia', pt: 'Namíbia' }, phonePrefix: '+264' },
    { value: 'Botswana', label: { fr: 'Botswana', en: 'Botswana', es: 'Botsuana', pt: 'Botsuana' }, phonePrefix: '+267' },
    { value: 'Lesotho', label: { fr: 'Lesotho', en: 'Lesotho', es: 'Lesoto', pt: 'Lesoto' }, phonePrefix: '+266' },
    { value: 'Eswatini', label: { fr: 'Eswatini', en: 'Eswatini', es: 'Esuatini', pt: 'Essuatíni' }, phonePrefix: '+268' },
    { value: 'Madagascar', label: { fr: 'Madagascar', en: 'Madagascar', es: 'Madagascar', pt: 'Madagascar' }, phonePrefix: '+261' },
    { value: 'Mauritius', label: { fr: 'Maurice', en: 'Mauritius', es: 'Mauricio', pt: 'Maurícia' }, phonePrefix: '+230' },
    { value: 'Seychelles', label: { fr: 'Seychelles', en: 'Seychelles', es: 'Seychelles', pt: 'Seychelles' }, phonePrefix: '+248' },
    { value: 'Comoros', label: { fr: 'Comores', en: 'Comoros', es: 'Comoras', pt: 'Comores' }, phonePrefix: '+269' },
    
    // Middle East
    { value: 'United Arab Emirates', label: { fr: 'Émirats Arabes Unis', en: 'United Arab Emirates', es: 'Emiratos Árabes Unidos', pt: 'Emirados Árabes Unidos' }, phonePrefix: '+971' },
    { value: 'Saudi Arabia', label: { fr: 'Arabie Saoudite', en: 'Saudi Arabia', es: 'Arabia Saudita', pt: 'Arábia Saudita' }, phonePrefix: '+966' },
    { value: 'Qatar', label: { fr: 'Qatar', en: 'Qatar', es: 'Catar', pt: 'Catar' }, phonePrefix: '+974' },
    { value: 'Kuwait', label: { fr: 'Koweït', en: 'Kuwait', es: 'Kuwait', pt: 'Kuwait' }, phonePrefix: '+965' },
    { value: 'Bahrain', label: { fr: 'Bahreïn', en: 'Bahrain', es: 'Baréin', pt: 'Bahrein' }, phonePrefix: '+973' },
    { value: 'Oman', label: { fr: 'Oman', en: 'Oman', es: 'Omán', pt: 'Omã' }, phonePrefix: '+968' },
    { value: 'Yemen', label: { fr: 'Yémen', en: 'Yemen', es: 'Yemen', pt: 'Iêmen' }, phonePrefix: '+967' },
    { value: 'Jordan', label: { fr: 'Jordanie', en: 'Jordan', es: 'Jordania', pt: 'Jordânia' }, phonePrefix: '+962' },
    { value: 'Lebanon', label: { fr: 'Liban', en: 'Lebanon', es: 'Líbano', pt: 'Líbano' }, phonePrefix: '+961' },
    { value: 'Syria', label: { fr: 'Syrie', en: 'Syria', es: 'Siria', pt: 'Síria' }, phonePrefix: '+963' },
    { value: 'Iraq', label: { fr: 'Irak', en: 'Iraq', es: 'Irak', pt: 'Iraque' }, phonePrefix: '+964' },
    { value: 'Iran', label: { fr: 'Iran', en: 'Iran', es: 'Irán', pt: 'Irã' }, phonePrefix: '+98' },
    { value: 'Israel', label: { fr: 'Israël', en: 'Israel', es: 'Israel', pt: 'Israel' }, phonePrefix: '+972' },
    { value: 'Palestine', label: { fr: 'Palestine', en: 'Palestine', es: 'Palestina', pt: 'Palestina' }, phonePrefix: '+970' },
    { value: 'Turkey', label: { fr: 'Turquie', en: 'Turkey', es: 'Turquía', pt: 'Turquia' }, phonePrefix: '+90' },
    
    // Americas - North
    { value: 'United States', label: { fr: 'États-Unis', en: 'United States', es: 'Estados Unidos', pt: 'Estados Unidos' }, phonePrefix: '+1' },
    { value: 'Canada', label: { fr: 'Canada', en: 'Canada', es: 'Canadá', pt: 'Canadá' }, phonePrefix: '+1' },
    { value: 'Mexico', label: { fr: 'Mexique', en: 'Mexico', es: 'México', pt: 'México' }, phonePrefix: '+52' },
    
    // Americas - Central
    { value: 'Costa Rica', label: { fr: 'Costa Rica', en: 'Costa Rica', es: 'Costa Rica', pt: 'Costa Rica' }, phonePrefix: '+506' },
    { value: 'Panama', label: { fr: 'Panama', en: 'Panama', es: 'Panamá', pt: 'Panamá' }, phonePrefix: '+507' },
    { value: 'Guatemala', label: { fr: 'Guatemala', en: 'Guatemala', es: 'Guatemala', pt: 'Guatemala' }, phonePrefix: '+502' },
    { value: 'El Salvador', label: { fr: 'Salvador', en: 'El Salvador', es: 'El Salvador', pt: 'El Salvador' }, phonePrefix: '+503' },
    { value: 'Honduras', label: { fr: 'Honduras', en: 'Honduras', es: 'Honduras', pt: 'Honduras' }, phonePrefix: '+504' },
    { value: 'Nicaragua', label: { fr: 'Nicaragua', en: 'Nicaragua', es: 'Nicaragua', pt: 'Nicarágua' }, phonePrefix: '+505' },
    
    // Americas - South
    { value: 'Brazil', label: { fr: 'Brésil', en: 'Brazil', es: 'Brasil', pt: 'Brasil' }, phonePrefix: '+55' },
    { value: 'Argentina', label: { fr: 'Argentine', en: 'Argentina', es: 'Argentina', pt: 'Argentina' }, phonePrefix: '+54' },
    { value: 'Colombia', label: { fr: 'Colombie', en: 'Colombia', es: 'Colombia', pt: 'Colômbia' }, phonePrefix: '+57' },
    { value: 'Chile', label: { fr: 'Chili', en: 'Chile', es: 'Chile', pt: 'Chile' }, phonePrefix: '+56' },
    { value: 'Peru', label: { fr: 'Pérou', en: 'Peru', es: 'Perú', pt: 'Peru' }, phonePrefix: '+51' },
    { value: 'Venezuela', label: { fr: 'Venezuela', en: 'Venezuela', es: 'Venezuela', pt: 'Venezuela' }, phonePrefix: '+58' },
    { value: 'Ecuador', label: { fr: 'Équateur', en: 'Ecuador', es: 'Ecuador', pt: 'Equador' }, phonePrefix: '+593' },
    { value: 'Bolivia', label: { fr: 'Bolivie', en: 'Bolivia', es: 'Bolivia', pt: 'Bolívia' }, phonePrefix: '+591' },
    { value: 'Paraguay', label: { fr: 'Paraguay', en: 'Paraguay', es: 'Paraguay', pt: 'Paraguai' }, phonePrefix: '+595' },
    { value: 'Uruguay', label: { fr: 'Uruguay', en: 'Uruguay', es: 'Uruguay', pt: 'Uruguai' }, phonePrefix: '+598' },
    
    // Asia - Central
    { value: 'Kazakhstan', label: { fr: 'Kazakhstan', en: 'Kazakhstan', es: 'Kazajistán', pt: 'Cazaquistão' }, phonePrefix: '+7' },
    { value: 'Uzbekistan', label: { fr: 'Ouzbékistan', en: 'Uzbekistan', es: 'Uzbekistán', pt: 'Uzbequistão' }, phonePrefix: '+998' },
    { value: 'Turkmenistan', label: { fr: 'Turkménistan', en: 'Turkmenistan', es: 'Turkmenistán', pt: 'Turcomenistão' }, phonePrefix: '+993' },
    { value: 'Kyrgyzstan', label: { fr: 'Kirghizistan', en: 'Kyrgyzstan', es: 'Kirguistán', pt: 'Quirguistão' }, phonePrefix: '+996' },
    { value: 'Tajikistan', label: { fr: 'Tadjikistan', en: 'Tajikistan', es: 'Tayikistán', pt: 'Tajiquistão' }, phonePrefix: '+992' },
    { value: 'Afghanistan', label: { fr: 'Afghanistan', en: 'Afghanistan', es: 'Afganistán', pt: 'Afeganistão' }, phonePrefix: '+93' },
    
    // Asia - East
    { value: 'China', label: { fr: 'Chine', en: 'China', es: 'China', pt: 'China' }, phonePrefix: '+86' },
    { value: 'Japan', label: { fr: 'Japon', en: 'Japan', es: 'Japón', pt: 'Japão' }, phonePrefix: '+81' },
    { value: 'South Korea', label: { fr: 'Corée du Sud', en: 'South Korea', es: 'Corea del Sur', pt: 'Coreia do Sul' }, phonePrefix: '+82' },
    { value: 'North Korea', label: { fr: 'Corée du Nord', en: 'North Korea', es: 'Corea del Norte', pt: 'Coreia do Norte' }, phonePrefix: '+850' },
    { value: 'Mongolia', label: { fr: 'Mongolie', en: 'Mongolia', es: 'Mongolia', pt: 'Mongólia' }, phonePrefix: '+976' },
    { value: 'Hong Kong', label: { fr: 'Hong Kong', en: 'Hong Kong', es: 'Hong Kong', pt: 'Hong Kong' }, phonePrefix: '+852' },
    { value: 'Macau', label: { fr: 'Macao', en: 'Macau', es: 'Macao', pt: 'Macau' }, phonePrefix: '+853' },
    { value: 'Taiwan', label: { fr: 'Taïwan', en: 'Taiwan', es: 'Taiwán', pt: 'Taiwan' }, phonePrefix: '+886' },
    
    // Asia - Southeast
    { value: 'Singapore', label: { fr: 'Singapour', en: 'Singapore', es: 'Singapur', pt: 'Cingapura' }, phonePrefix: '+65' },
    { value: 'Malaysia', label: { fr: 'Malaisie', en: 'Malaysia', es: 'Malasia', pt: 'Malásia' }, phonePrefix: '+60' },
    { value: 'Thailand', label: { fr: 'Thaïlande', en: 'Thailand', es: 'Tailandia', pt: 'Tailândia' }, phonePrefix: '+66' },
    { value: 'Vietnam', label: { fr: 'Vietnam', en: 'Vietnam', es: 'Vietnam', pt: 'Vietnã' }, phonePrefix: '+84' },
    { value: 'Philippines', label: { fr: 'Philippines', en: 'Philippines', es: 'Filipinas', pt: 'Filipinas' }, phonePrefix: '+63' },
    { value: 'Indonesia', label: { fr: 'Indonésie', en: 'Indonesia', es: 'Indonesia', pt: 'Indonésia' }, phonePrefix: '+62' },
    { value: 'Brunei', label: { fr: 'Brunei', en: 'Brunei', es: 'Brunéi', pt: 'Brunei' }, phonePrefix: '+673' },
    { value: 'Myanmar', label: { fr: 'Myanmar', en: 'Myanmar', es: 'Birmania', pt: 'Mianmar' }, phonePrefix: '+95' },
    { value: 'Cambodia', label: { fr: 'Cambodge', en: 'Cambodia', es: 'Camboya', pt: 'Camboja' }, phonePrefix: '+855' },
    { value: 'Laos', label: { fr: 'Laos', en: 'Laos', es: 'Laos', pt: 'Laos' }, phonePrefix: '+856' },
    { value: 'Timor-Leste', label: { fr: 'Timor Oriental', en: 'Timor-Leste', es: 'Timor Oriental', pt: 'Timor-Leste' }, phonePrefix: '+670' },
    
    // Asia - South
    { value: 'India', label: { fr: 'Inde', en: 'India', es: 'India', pt: 'Índia' }, phonePrefix: '+91' },
    { value: 'Pakistan', label: { fr: 'Pakistan', en: 'Pakistan', es: 'Pakistán', pt: 'Paquistão' }, phonePrefix: '+92' },
    { value: 'Bangladesh', label: { fr: 'Bangladesh', en: 'Bangladesh', es: 'Bangladés', pt: 'Bangladesh' }, phonePrefix: '+880' },
    { value: 'Sri Lanka', label: { fr: 'Sri Lanka', en: 'Sri Lanka', es: 'Sri Lanka', pt: 'Sri Lanka' }, phonePrefix: '+94' },
    { value: 'Nepal', label: { fr: 'Népal', en: 'Nepal', es: 'Nepal', pt: 'Nepal' }, phonePrefix: '+977' },
    { value: 'Bhutan', label: { fr: 'Bhoutan', en: 'Bhutan', es: 'Bután', pt: 'Butão' }, phonePrefix: '+975' },
    { value: 'Maldives', label: { fr: 'Maldives', en: 'Maldives', es: 'Maldivas', pt: 'Maldivas' }, phonePrefix: '+960' },
    
    // Americas - Caribbean
    { value: 'Jamaica', label: { fr: 'Jamaïque', en: 'Jamaica', es: 'Jamaica', pt: 'Jamaica' }, phonePrefix: '+1876' },
    { value: 'Trinidad and Tobago', label: { fr: 'Trinité-et-Tobago', en: 'Trinidad and Tobago', es: 'Trinidad y Tobago', pt: 'Trinidad e Tobago' }, phonePrefix: '+1868' },
    { value: 'Barbados', label: { fr: 'Barbade', en: 'Barbados', es: 'Barbados', pt: 'Barbados' }, phonePrefix: '+1246' },
    { value: 'Bahamas', label: { fr: 'Bahamas', en: 'Bahamas', es: 'Bahamas', pt: 'Bahamas' }, phonePrefix: '+1242' },
    { value: 'Dominican Republic', label: { fr: 'République Dominicaine', en: 'Dominican Republic', es: 'República Dominicana', pt: 'República Dominicana' }, phonePrefix: '+1809' },
    { value: 'Haiti', label: { fr: 'Haïti', en: 'Haiti', es: 'Haití', pt: 'Haiti' }, phonePrefix: '+509' },
    { value: 'Cuba', label: { fr: 'Cuba', en: 'Cuba', es: 'Cuba', pt: 'Cuba' }, phonePrefix: '+53' },
    { value: 'Puerto Rico', label: { fr: 'Porto Rico', en: 'Puerto Rico', es: 'Puerto Rico', pt: 'Porto Rico' }, phonePrefix: '+1787' },
    
    // Oceania
    { value: 'Australia', label: { fr: 'Australie', en: 'Australia', es: 'Australia', pt: 'Austrália' }, phonePrefix: '+61' },
    { value: 'New Zealand', label: { fr: 'Nouvelle-Zélande', en: 'New Zealand', es: 'Nueva Zelanda', pt: 'Nova Zelândia' }, phonePrefix: '+64' },
    { value: 'Fiji', label: { fr: 'Fidji', en: 'Fiji', es: 'Fiyi', pt: 'Fiji' }, phonePrefix: '+679' },
    { value: 'Papua New Guinea', label: { fr: 'Papouasie-Nouvelle-Guinée', en: 'Papua New Guinea', es: 'Papúa Nueva Guinea', pt: 'Papua-Nova Guiné' }, phonePrefix: '+675' },
    
    // Other
    { value: 'Other', label: { fr: 'Autre', en: 'Other', es: 'Otro', pt: 'Outro' }, phonePrefix: '+1' },
  ];

  const translations = {
    fr: {
      email: 'Email professionnel',
      emailPlaceholder: 'votre@email.com',
      firstName: 'Prénom',
      lastName: 'Nom',
      company: 'Entreprise',
      phone: 'Téléphone',
      country: 'Pays',
      countryPlaceholder: 'Rechercher un pays...',
      jobTitle: 'Poste',
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
      firstName: 'First Name',
      lastName: 'Last Name',
      company: 'Company',
      phone: 'Phone',
      country: 'Country',
      countryPlaceholder: 'Search for a country...',
      jobTitle: 'Job Title',
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
      firstName: 'Nombre',
      lastName: 'Apellido',
      company: 'Empresa',
      phone: 'Teléfono',
      country: 'País',
      countryPlaceholder: 'Buscar un país...',
      jobTitle: 'Cargo',
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
      firstName: 'Nome',
      lastName: 'Sobrenome',
      company: 'Empresa',
      phone: 'Telefone',
      country: 'País',
      countryPlaceholder: 'Pesquisar um país...',
      jobTitle: 'Cargo',
      next: 'Próximo',
      back: 'Voltar',
      submit: 'Reservar minha demo',
      submitting: 'Enviando...',
      selectTime: 'Selecione seu horário',
      selectTimeDesc: 'Escolha um horário que funcione para você',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  // If Calendly is showing, display it
  if (showCalendly) {
    // Build pre-filled URL for iframe
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const url = new URL(calendlyUrl);
    url.searchParams.set('name', fullName);
    url.searchParams.set('email', formData.email);
    
    // Add phone for SMS notifications - Calendly expects it in a1 field
    if (formData.phone) {
      const completePhone = `${phonePrefix}${formData.phone}`.trim();
      url.searchParams.set('a1', completePhone); // Primary phone field
      url.searchParams.set('phone_number', completePhone); // Alternative parameter for SMS
    }
    
    // Add UTM parameters for tracking
    if (attribution.utm_source) url.searchParams.set('utm_source', attribution.utm_source);
    if (attribution.utm_medium) url.searchParams.set('utm_medium', attribution.utm_medium);
    if (attribution.utm_campaign) url.searchParams.set('utm_campaign', attribution.utm_campaign);
    
    // Hide Calendly's GDPR banner since we're using GTM for cookie consent
    url.searchParams.set('hide_gdpr_banner', '1');
    url.searchParams.set('embed_domain', window.location.hostname);
    url.searchParams.set('embed_type', 'Inline');
    
    // Don't set redirect URL - we'll handle it via message event
    // This prevents Calendly's security warning page
    
    const iframeUrl = url.toString();
    console.log('[DemoForm] Calendly iframe URL:', iframeUrl);

    return (
      <div className="w-full mx-auto">
        <style jsx>{`
          iframe {
            pointer-events: auto;
          }
          /* Hide Calendly cookie banner */
          :global(.calendly-badge-widget),
          :global(.calendly-overlay),
          :global([class*="cookie"]),
          :global([class*="gdpr"]) {
            display: none !important;
          }
        `}</style>
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t.selectTime}
          </h3>
          <p className="text-gray-600">
            {formData.firstName}, {t.selectTimeDesc.toLowerCase()}
          </p>
        </div>
        <div className="relative w-full" style={{ height: '800px', minHeight: '800px' }}>
          <iframe
            src={iframeUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Scheduling"
            style={{ minWidth: '320px', border: 'none' }}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      {/* Step 1: Email */}
      {step === 1 && (
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="group w-full inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-white rounded-full hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
            style={{background: 'linear-gradient(90deg, #8b5cf6, #a855f7)'}}
          >
            <span className="relative">
              {t.next}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </span>
          </button>
        </div>
      )}

      {/* Step 2: Name */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              {t.firstName} *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              {t.lastName} *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
            >
              {t.back}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="group flex-1 inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-white rounded-full hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
              style={{background: 'linear-gradient(90deg, #8b5cf6, #a855f7)'}}
            >
              <span className="relative">
                {t.next}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Company Details */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              {t.company} *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              {t.country} *
            </label>
            <div className="relative">
              <input
                type="text"
                id="country"
                name="country"
                value={countrySearch}
                onChange={handleCountrySearch}
                onFocus={handleCountryFocus}
                onBlur={handleCountryBlur}
                placeholder={t.countryPlaceholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="off"
              />
              {showCountryDropdown && filteredCountries.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.value}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors"
                    >
                      {country.label[locale as keyof typeof country.label] || country.label.en}
                    </button>
                  ))}
                </div>
              )}
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t.phone} *
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg px-3 text-gray-700 font-medium min-w-[70px]">
                {phonePrefix}
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="6 12 34 56 78"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              {t.jobTitle} *
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.jobTitle ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
            >
              {t.back}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex-1 inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-white rounded-full hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:shadow-none"
              style={{background: 'linear-gradient(90deg, #8b5cf6, #a855f7)'}}
            >
              <span className="relative">
                {isSubmitting ? t.submitting : (customButtonText || t.submit)}
                {!isSubmitting && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              s === step ? 'bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] scale-110' : s < step ? 'bg-[#a855f7]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </form>
  );
}
