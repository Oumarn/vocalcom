'use client';

import type { landingFR } from '@/content/landing.fr';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

export default function Hero() {

    return (
        <>
            <section className="relative pt-32 px-6 pb-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/hero.webp" alt="AI Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-[#f0f3ff]"></div>
                </div>

                <div className="relative flex flex-col items-center justify-center gap-6 lg:gap-4 max-w-4xl mx-auto z-10 text-[#333]">
                    <h1
                        className={`${raleway.className} text-3xl text-center lg:text-5xl font-bold tracking-tight leading-[1.05]`}
                    >
                        Centraliza toda tu CX en un contact <br className='hidden lg:block' /> center omnicanal
                    </h1>
                    <p className={`${raleway.className} text-sm lg:text-base leading-7 text-center font-normal`}>Gestiona todos tus canales de atención al cliente desde una única plataforma y <br className='hidden lg:block' /> aumenta la productividad de tus agentes con IA.</p>
                    <div className="flex items-center justify-center w-full lg:mt-4">
                        <button className="w-2/3 md:w-[300px] cursor-pointer
                            inline-flex items-center justify-center gap-2
                            px-4 sm:px-8 py-4 sm:py-4
                            text-sm
                            text-white font-bold rounded-full
                        
                            transition-all duration-300 transform
                        
                            hover:-translate-y-0.5
                            hover:shadow-[0_0_25px_rgba(246,160,46,0.6),0_0_35px_rgba(249,115,22,0.4)]
                        
                            active:scale-[0.97]
                            active:translate-y-[1px]
                            active:shadow-[0_0_25px_rgba(246,160,46,0.8),0_0_35px_rgba(249,115,22,0.6)]
                            "
                            style={{
                                background: 'linear-gradient(90deg, #F6A02E, #f97316)'
                            }}>
                            Solicita una demo
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center w-[350px] lg:w-[400px] relative">
                        <div className="relative w-[255px] min-h-[371px] bg-white rounded-xl"></div>
                        <div className="flex items-center justify-between bg-gray-300 p-2 w-1/2 absolute bottom-22 left-1/2 rounded-xl"><div className="text-[13px]">Actividad de equipo</div><div className="w-9 h-9 flex items-center justify-center p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 31" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                            <rect x="0.5" y="0.25" width="30.7539" height="30.754" rx="7.68853" fill="white"></rect>
                            <path d="M20.2358 16.1967L13.8287 22.6038C13.7692 22.6633 13.6985 22.7105 13.6208 22.7428C13.543 22.775 13.4596 22.7916 13.3754 22.7916C13.2913 22.7916 13.2079 22.775 13.1301 22.7428C13.0523 22.7105 12.9817 22.6633 12.9221 22.6038C12.8626 22.5443 12.8154 22.4736 12.7832 22.3958C12.751 22.318 12.7344 22.2347 12.7344 22.1505C12.7344 22.0663 12.751 21.9829 12.7832 21.9052C12.8154 21.8274 12.8626 21.7567 12.9221 21.6972L18.8767 15.7434L12.9221 9.78967C12.8019 9.66945 12.7344 9.50639 12.7344 9.33637C12.7344 9.16635 12.8019 9.0033 12.9221 8.88308C13.0424 8.76285 13.2054 8.69531 13.3754 8.69531C13.5455 8.69531 13.7085 8.76285 13.8287 8.88308L20.2358 15.2901C20.2954 15.3496 20.3426 15.4203 20.3749 15.4981C20.4071 15.5759 20.4237 15.6592 20.4237 15.7434C20.4237 15.8276 20.4071 15.911 20.3749 15.9888C20.3426 16.0666 20.2954 16.1372 20.2358 16.1967Z" fill="black"></path>
                        </svg></div></div>
                    </div>
                </div>
            </section>

        </>
    );
}