"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../../hooks/useCountUp";
import { Stat } from "./Stat";
import type { landingFR } from '@/content/landing.fr';

export default function Historic({ content }: { content: typeof landingFR.stats }) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-linear relative py-12 lg:py-16 px-4 lg:px-0"
            id="historics"
        >
            <div className="shape-layer"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 md:gap-16 gap-12 text-white text-xl md:text-lg">
                {content.items.map((stat, index) => (
                    <Stat key={index} value={stat.value} label={stat.label} />
                ))}
            </div>
        </section>
    );
}
