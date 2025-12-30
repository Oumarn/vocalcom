import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiArrowLeft, mdiEmail, mdiCalendar } from '@mdi/js';

export default function ThankYou() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
            <div className="max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}>
                    <Icon path={mdiCheckCircle} size={3} className="text-white" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Merci pour votre demande !
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                    Votre demande de démo a été reçue avec succès.
                </p>

                {/* Next Steps */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8 text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Prochaines étapes</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                <Icon path={mdiEmail} size={1} style={{color: '#24B7C3'}} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">1. Vérifiez votre email</h3>
                                <p className="text-gray-600 text-sm">Vous recevrez un email de confirmation dans les prochaines minutes avec les détails de votre demande.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                <Icon path={mdiCalendar} size={1} style={{color: '#24B7C3'}} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">2. Rendez-vous avec notre équipe</h3>
                                <p className="text-gray-600 text-sm">Un membre de notre équipe vous contactera sous 24h pour planifier une démo personnalisée de notre plateforme.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}
                    >
                        <Icon path={mdiArrowLeft} size={0.8} />
                        Retour à l'accueil
                    </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Des questions ? Contactez-nous à{' '}
                        <a href="mailto:contact@vocalcom.com" className="font-semibold hover:underline" style={{color: '#24B7C3'}}>
                            contact@vocalcom.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
