import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  // Get accept-language header from the request
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Simple language detection: check if English is preferred
  // Accept-Language format: "en-US,en;q=0.9,fr;q=0.8"
  const isEnglish = acceptLanguage.toLowerCase().includes('en');
  const isFrench = acceptLanguage.toLowerCase().includes('fr');
  
  // Redirect based on detected language
  // If both are present, check which has higher priority (comes first)
  if (isEnglish && !isFrench) {
    redirect('/en');
  } else if (isFrench || acceptLanguage.includes('fr')) {
    redirect('/fr');
  } else if (isEnglish) {
    redirect('/en');
  }
  
  // Default to French for all other cases
  redirect('/fr');
}
