"use client";
import { mdiRobotHappy, mdiAutoFix, mdiSpeedometer, mdiPhoneInTalk, mdiForumOutline, mdiChip, mdiConnection, mdiSalesforce, mdiCloudOutline, mdiLightningBolt } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import type { landingFR } from '@/content/landing.fr';

export default function BenefitsGrid({ content }: { content: typeof landingFR.benefits }) {
    return (
        <>
            <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                            <Icon path={mdiLightningBolt} size={0.6} />
                            {content.badge}
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">{content.title}</h2>
                        <p className="text-lg text-gray-600">{content.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
                        {content.items.map((item, index) => {
                            const colors = [
                                { from: 'from-blue-50', border: 'border-blue-100 hover:border-blue-300', gradient: 'from-blue-400/10', text: 'text-blue-600', bg: 'linear-gradient(193deg, #00bfc3, #4488af)', icon: mdiRobotHappy },
                                { from: 'from-green-50', border: 'border-green-100 hover:border-green-300', gradient: 'from-green-400/10', text: 'text-green-600', bg: 'white', icon: null, image: '/image copy 3.png' },
                                { from: 'from-purple-50', border: 'border-purple-100 hover:border-purple-300', gradient: 'from-purple-400/10', text: 'text-purple-600', bg: '#904b99', icon: mdiSpeedometer },
                                { from: 'from-orange-50', border: 'border-orange-100 hover:border-orange-300', gradient: 'from-orange-400/10', text: 'text-orange-600', bg: 'white', icon: null, image: '/image copy 2.png' }
                            ];
                            const color = colors[index % colors.length];
                            
                            return (
                                <div key={index} className={`group relative p-8 rounded-2xl bg-gradient-to-br ${color.from} to-white border-2 ${color.border} hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color.gradient} to-transparent rounded-full -translate-y-16 translate-x-16`}></div>
                                    <div className="relative">
                                        <div className={`w-14 h-14 rounded-xl ${color.image ? 'bg-white' : 'text-white'} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg ${color.image ? 'p-2' : ''}`} style={color.bg && !color.image ? {background: color.bg} : {}}>
                                            {color.image ? (
                                                <Image src={color.image} alt={item.title} width={48} height={48} className="w-full h-full object-contain" unoptimized />
                                            ) : color.icon && (
                                                <Icon path={color.icon} size={1.2} />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                                        <div className={`flex items-center gap-2 ${color.text} font-semibold text-sm`}>
                                            <span className="text-2xl font-bold">{item.stat.split(' ')[0]}</span>
                                            <span className="text-xs">{item.stat.split(' ').slice(1).join(' ')}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Platform capabilities */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fade-up">
                        {content.features?.map((feature, index) => {
                            const icons = [mdiForumOutline, mdiChip, mdiCloudOutline];
                            const bgColors = ['bg-purple-100', 'bg-indigo-100', 'bg-slate-100'];
                            const textColors = ['text-purple-600', 'text-indigo-600', 'text-slate-600'];
                            
                            return (
                                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                                    <div className={`w-10 h-10 rounded-lg ${bgColors[index % bgColors.length]} flex items-center justify-center flex-shrink-0`}>
                                        <Icon path={icons[index % icons.length]} size={0.9} className={textColors[index % textColors.length]} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                                        <p className="text-xs text-gray-600">{feature.description}</p>
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