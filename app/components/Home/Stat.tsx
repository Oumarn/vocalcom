"use client";

import { useEffect, useState } from "react";

type StatProps = {
  value: string;
  label: string;
  isVisible?: boolean;
};

function useCountAnimation(end: number, start: number = 0, duration: number = 2000, isVisible: boolean = false) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(start + (end - start) * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, start, duration, isVisible]);

  return count;
}

export function Stat({ value, label, isVisible = false }: StatProps) {
  // Parse the value to extract number and suffix
  const parseValue = (val: string) => {
    // Handle different formats: "25+", "300 000+", "1200+", "1 Milliard"
    const match = val.match(/^([\d\s]+)(.*)/);
    if (match) {
      const numStr = match[1].replace(/\s/g, '');
      const suffix = match[2].trim();
      const number = parseInt(numStr, 10);
      
      // For "Milliard", no animation needed
      if (suffix.toLowerCase().includes('milliard')) {
        return { number, suffix, startValue: 0, skipAnimation: true };
      }
      
      return { number, suffix, startValue: 0, skipAnimation: false };
    }
    return { number: 0, suffix: val, startValue: 0, skipAnimation: false };
  };

  const { number, suffix, startValue, skipAnimation } = parseValue(value);
  const animatedValue = useCountAnimation(number, startValue, 2000, isVisible && !skipAnimation);

  // Format the number with spaces for thousands
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // For Milliard, display static value
  const displayValue = skipAnimation ? number : animatedValue;

  return (
    <div className="flex flex-col gap-3 items-center">
      <span className="text-center text-5xl font-bold">
        {formatNumber(displayValue)}{suffix ? ' ' : ''}{suffix}
      </span>
      <span className="text-center">{label}</span>
    </div>
  );
}
