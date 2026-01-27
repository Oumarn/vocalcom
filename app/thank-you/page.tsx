'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiArrowLeft, mdiEmail, mdiCalendar } from '@mdi/js';

const translations = {
    fr: {
        title: "Merci pour votre demande !",
        subtitle: "Votre demande de démo a été reçue avec succès.",
        nextSteps: "Prochaines étapes",
        step1Title: "1. Vérifiez votre email",
        step1Desc: "Vous recevrez un email de confirmation dans les prochaines minutes avec les détails de votre demande.",
        step2Title: "2. Rendez-vous avec notre équipe",
        step2Desc: "Un membre de notre équipe vous contactera sous 24h pour planifier une démo personnalisée de notre plateforme.",
        backHome: "Retour à l'accueil",
        questions: "Des questions ? Contactez-nous à",
    },
    en: {
        title: "Thank you for your request!",
        subtitle: "Your demo request has been successfully received.",
        nextSteps: "Next Steps",
        step1Title: "1. Check your email",
        step1Desc: "You will receive a confirmation email in the next few minutes with the details of your request.",
        step2Title: "2. Meeting with our team",
        step2Desc: "A member of our team will contact you within 24 hours to schedule a personalized demo of our platform.",
        backHome: "Back to home",
        questions: "Questions? Contact us at",
    },
    es: {
        title: "¡Gracias por tu solicitud!",
        subtitle: "Tu solicitud de demo ha sido recibida con éxito.",
        nextSteps: "Próximos Pasos",
        step1Title: "1. Revisa tu correo electrónico",
        step1Desc: "Recibirás un correo de confirmación en los próximos minutos con los detalles de tu solicitud.",
        step2Title: "2. Reunión con nuestro equipo",
        step2Desc: "Un miembro de nuestro equipo te contactará en 24 horas para programar una demo personalizada de nuestra plataforma.",
        backHome: "Volver al inicio",
        questions: "¿Preguntas? Contáctanos en",
    },
    pt: {
        title: "Obrigado pela sua solicitação!",
        subtitle: "Sua solicitação de demonstração foi recebida com sucesso.",
        nextSteps: "Próximos Passos",
        step1Title: "1. Verifique seu e-mail",
        step1Desc: "Você receberá um e-mail de confirmação nos próximos minutos com os detalhes de sua solicitação.",
        step2Title: "2. Reunião com nossa equipe",
        step2Desc: "Um membro de nossa equipe entrará em contato em 24 horas para agendar uma demonstração personalizada de nossa plataforma.",
        backHome: "Voltar ao início",
        questions: "Perguntas? Entre em contato conosco em",
    }
};

export default function ThankYou() {
    const [locale, setLocale] = useState<'fr' | 'en' | 'es' | 'pt'>('fr');

    useEffect(() => {
        // Get the language from localStorage (saved during form submission)
        const savedLang = localStorage.getItem('vocalcom_landing_language');
        if (savedLang && ['fr', 'en', 'es', 'pt'].includes(savedLang)) {
            setLocale(savedLang as 'fr' | 'en' | 'es' | 'pt');
        }
    }, []);

    const t = translations[locale];

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
            <div className="max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}>
                    <Icon path={mdiCheckCircle} size={3} className="text-white" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {t.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                    {t.subtitle}
                </p>

                {/* Next Steps */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8 text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.nextSteps}</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                <Icon path={mdiEmail} size={1} style={{color: '#24B7C3'}} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">{t.step1Title}</h3>
                                <p className="text-gray-600 text-sm">{t.step1Desc}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                <Icon path={mdiCalendar} size={1} style={{color: '#24B7C3'}} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">{t.step2Title}</h3>
                                <p className="text-gray-600 text-sm">{t.step2Desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                        href="https://vocalcom.com" 
                        className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}
                    >
                        <Icon path={mdiArrowLeft} size={0.8} />
                        {t.backHome}
                    </a>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        {t.questions}{' '}
                        <a href="mailto:contact@vocalcom.com" className="font-semibold hover:underline" style={{color: '#24B7C3'}}>
                            contact@vocalcom.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
