"use client";
import Icon from '@mdi/react';
import { mdiAccountGroup, mdiRobotHappy, mdiHandshake, mdiTrendingUp } from '@mdi/js';
import Image from 'next/image';
import type { landingFR } from '@/content/landing.fr';

export default function AIHumanSection({ content }: { content: typeof landingFR.aiHuman }) {
    return (
        <>
            <section className="py-12 lg:py-16 bg-gradient-to-b from-white via-cyan-50/30 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image Side */}
                        <div className="relative animate-fade-up order-2 lg:order-1">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
                                <Image 
                                    src="/assets/AIHumanAgent.jpg" 
                                    alt="AI Agents collaborating with humans" 
                                    width={500} 
                                    height={350}
                                    className="w-full h-auto object-contain bg-white"
                                    unoptimized
                                />
                            </div>
                            
                            {/* Floating stats */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border-2 border-cyan-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                        <Icon path={mdiTrendingUp} size={1} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-cyan-600">{content.roiStat.value}</div>
                                        <div className="text-xs text-gray-600">{content.roiStat.label}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="space-y-6 animate-fade-up order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 rounded-full px-4 py-2 text-sm font-medium">
                                <Icon path={mdiHandshake} size={0.6} />
                                {content.badge}
                            </div>
                            
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                                {content.title}
                            </h2>
                            
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {content.description}
                            </p>

                            <div className="space-y-4 pt-4">
                                {content.features.map((feature, index) => (
                                    <div key={index} className={`flex gap-4 items-start p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all ${
                                        index === 0 ? 'hover:border-cyan-300' : index === 1 ? 'hover:border-purple-300' : 'hover:border-orange-300'
                                    }`}>
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            index === 0 ? 'bg-gradient-to-br from-cyan-500 to-blue-500' : 
                                            index === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 
                                            'bg-gradient-to-br from-orange-500 to-red-500'
                                        }`}>
                                            <Icon path={index === 0 ? mdiRobotHappy : index === 1 ? mdiAccountGroup : mdiTrendingUp} size={1} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                                            <p className="text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
