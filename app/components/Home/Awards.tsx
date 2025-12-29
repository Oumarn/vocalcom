import Image from 'next/image';
import { mdiTrophy } from '@mdi/js';
import Icon from '@mdi/react';

export default function Awards() {
    return (
        <>
            <section className="py-16 lg:py-20 bg-white opacity-60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 animate-fade-up">
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4" style={{background: 'rgba(0, 191, 195, 0.1)', color: '#24B7C3'}}>
                            <Icon path={mdiTrophy} size={0.6} />
                            Reconnaissances & Awards
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                            Reconnus par les Leaders de l'Industrie
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Notre excellence reconnue par les analystes et organisations mondiales
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-center animate-fade-up">
                        <div className="flex items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl">
                            <Image 
                                src="/image copy 4.png" 
                                alt="Award" 
                                width={150} 
                                height={90} 
                                className="object-contain w-full h-auto max-h-20" 
                                unoptimized 
                            />
                        </div>
                        
                        <div className="flex items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl">
                            <Image 
                                src="/image copy 5.png" 
                                alt="Award" 
                                width={150} 
                                height={90} 
                                className="object-contain w-full h-auto max-h-20" 
                                unoptimized 
                            />
                        </div>
                        
                        <div className="flex items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl">
                            <Image 
                                src="/assets/Global 100 - 2026 - VOCALCOM.png" 
                                alt="Global 100 2026" 
                                width={150} 
                                height={90} 
                                className="object-contain w-full h-auto max-h-20" 
                                unoptimized 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
