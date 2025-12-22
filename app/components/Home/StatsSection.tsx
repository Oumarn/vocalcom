"use client";
import { mdiTrendingUp, mdiAccountGroup, mdiOfficeBuildingOutline, mdiMessageProcessingOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useCountUp } from '@/app/hooks/useCountUp';

export default function StatsSection() {
    const count1 = useCountUp(25, true, 2000);
    const count2 = useCountUp(550, true, 2000);
    const count3 = useCountUp(1200, true, 2000);
    const count4 = useCountUp(1, true, 2000);

    return (
        <>
            <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-4 group-hover:shadow-lg transition-shadow">
                                <Icon path={mdiTrendingUp} size={1.5} />
                            </div>
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {count1}+
                            </div>
                            <p className="text-gray-600 font-medium">Années d'Expertise</p>
                            <p className="text-sm text-gray-500 mt-1">en relation client</p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white mb-4 group-hover:shadow-lg transition-shadow">
                                <Icon path={mdiAccountGroup} size={1.5} />
                            </div>
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {count2}K+
                            </div>
                            <p className="text-gray-600 font-medium">Utilisateurs Actifs</p>
                            <p className="text-sm text-gray-500 mt-1">dans 47+ pays</p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-4 group-hover:shadow-lg transition-shadow">
                                <Icon path={mdiOfficeBuildingOutline} size={1.5} />
                            </div>
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {count3}+
                            </div>
                            <p className="text-gray-600 font-medium">Clients dans le Monde</p>
                            <p className="text-sm text-gray-500 mt-1">sur 5 continents</p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-4 group-hover:shadow-lg transition-shadow">
                                <Icon path={mdiMessageProcessingOutline} size={1.5} />
                            </div>
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {count4}B
                            </div>
                            <p className="text-gray-600 font-medium">Interactions Annuelles</p>
                            <p className="text-sm text-gray-500 mt-1">traitées par an</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
