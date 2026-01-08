import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  // Get accept-language header from the request
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Simple language detection
  // Accept-Language format: "en-US,en;q=0.9,es;q=0.8,pt;q=0.7,fr;q=0.6"
  const lowerLang = acceptLanguage.toLowerCase();
  
  // Check for Portuguese first (pt or pt-*)
  if (lowerLang.includes('pt')) {
    redirect('/pt');
  }
  
  // Check for Spanish (es or es-*)
  if (lowerLang.includes('es')) {
    redirect('/es');
  }
  
  // Check for English
  if (lowerLang.includes('en')) {
    redirect('/en');
  }
  
  // Check for French
  if (lowerLang.includes('fr')) {
    redirect('/fr');
  }
  
  // Default to French for all other cases
  redirect('/fr');
}
