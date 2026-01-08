'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Client-side language detection
    const userLang = navigator.language.toLowerCase();
    
    // Check for Portuguese first (pt or pt-*)
    if (userLang.includes('pt')) {
      router.replace('/pt');
      return;
    }
    
    // Check for Spanish (es or es-*)
    if (userLang.includes('es')) {
      router.replace('/es');
      return;
    }
    
    // Check for English
    if (userLang.includes('en')) {
      router.replace('/en');
      return;
    }
    
    // Check for French
    if (userLang.includes('fr')) {
      router.replace('/fr');
      return;
    }
    
    // Default to French for all other cases
    router.replace('/fr');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
