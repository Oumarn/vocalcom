import { mdiTrendingUp, mdiCheckCircle, mdiStarOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import type { landingFR } from '@/content/landing.fr';

export default function SocialProof({ content }: { content: typeof landingFR.socialProof }) {
    const industryColors = [
        { bg: 'from-blue-50 via-white to-white', border: 'border-blue-100 hover:border-blue-300', badge: 'bg-blue-500' },
        { bg: 'from-purple-50 via-white to-white', border: 'border-purple-100 hover:border-purple-300', badge: 'bg-purple-500' },
        { bg: 'from-green-50 via-white to-white', border: 'border-green-100 hover:border-green-300', badge: 'bg-green-500' }
    ];

    const avatarColors = [
        'from-blue-400 to-purple-500',
        'from-purple-400 to-pink-500',
        'from-green-400 to-teal-500'
    ];

    const statColors = [
        ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600'],
        ['bg-green-50 text-green-600', 'bg-purple-50 text-purple-600'],
        ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600']
    ];

    return (
        <>
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                            <Icon path={mdiTrendingUp} size={0.6} />
                            {content.title}
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">{content.subtitle}</h2>
                        <p className="text-lg text-gray-600">{content.description}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-up">
                        {content.testimonials.map((testimonial, index) => {
                            const colors = industryColors[index % industryColors.length];
                            const avatarColor = avatarColors[index % avatarColors.length];
                            const stats = statColors[index % statColors.length];
                            const initials = testimonial.author.split(' ').map(n => n[0]).join('');
                            
                            const logoMap: { [key: string]: string } = {
                                'CNM Prévoyance': '/CNM_Prevoyance_logo.png',
                                'ENGIE Solutions': '/Logo_Engie.png',
                                'Sage Spain': '/logo_Sage.png'
                            };

                            return (
                                <div key={index} className={`relative bg-gradient-to-br ${colors.bg} p-8 rounded-2xl border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 group`}>
                                    <div className={`absolute top-4 right-4 ${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                        {testimonial.industry}
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center p-2">
                                            <Image src={logoMap[testimonial.company] || '/logo_Sage.png'} alt={testimonial.company} width={48} height={48} className="object-contain" unoptimized />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">{testimonial.company}</div>
                                            <div className="text-xs text-gray-500">{testimonial.industry}</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                                        "{testimonial.quote}"
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {testimonial.stats.map((stat, statIndex) => (
                                            <div key={statIndex} className={`flex items-center justify-between p-3 ${stats[statIndex % stats.length]} rounded-lg`}>
                                                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                                                <span className="text-2xl font-bold">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                                            {initials}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">{testimonial.author}</div>
                                            <div className="text-xs text-gray-500">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </>
    );
}