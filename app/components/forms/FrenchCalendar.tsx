"use client";
import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiArrowRight, mdiClock, mdiCheck, mdiGoogle, mdiMicrosoftOutlook, mdiApple } from '@mdi/js';
import { useLanguage } from '@/app/hooks/useLanguage';
import { getCalendlyConfig } from '@/config/calendly-config';
import { resolveRegionFromUTM, type RegionKey } from '@/lib/region-resolver';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
}

interface SlotWithOwner {
  time: string;
  ownerEmail?: string; // Optional for Calendly (not needed)
}

interface Props {
  form: FormData;
  onBack?: () => void;
  onDateTimeSelect?: (date: string, time: string, ownerEmail?: string) => void;
  selectedDate?: string;
  selectedTime?: string;
  embedded?: boolean;
  country?: string;
  region?: RegionKey; // Accept region from parent
}

const FRENCH_HOLIDAYS = ['01-01', '05-01', '05-08', '07-14', '08-15', '11-01', '11-11', '12-25', '04-01', '05-20'];

const TRANSLATIONS = {
  fr: {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    dayNames: ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'],
    intro: 'Merci ! Prenez rendez-vous avec un de nos experts pour construire votre devis ensemble.',
    minutes: 'min',
    chooseDay: 'Choisissez un jour',
    selectDateTime: 'Sélectionnez la date et l\'heure',
    chooseTime: 'Choisissez un horaire',
    duration: 'Durée',
    weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  },
  en: {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    intro: 'Thank you! Book an appointment with one of our experts to build your quote together.',
    minutes: 'min',
    chooseDay: 'Choose a day',
    selectDateTime: 'Select date and time',
    chooseTime: 'Choose a time slot',
    duration: 'Duration',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  es: {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    dayNames: ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'],
    intro: '¡Gracias! Programa una cita con uno de nuestros expertos para construir tu presupuesto juntos.',
    minutes: 'min',
    chooseDay: 'Elige un día',
    selectDateTime: 'Selecciona fecha y hora',
    chooseTime: 'Elige un horario',
    duration: 'Duración',
    weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  },
  pt: {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    dayNames: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'],
    intro: 'Obrigado! Agende uma reunião com um de nossos especialistas para construir seu orçamento juntos.',
    minutes: 'min',
    chooseDay: 'Escolha um dia',
    selectDateTime: 'Selecione data e hora',
    chooseTime: 'Escolha um horário',
    duration: 'Duração',
    weekdays: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
  }
};

export default function FrenchCalendar({ form, onBack, onDateTimeSelect, selectedDate: initialDate, selectedTime: initialTime, embedded = false, country, region: propRegion }: Props) {
  const { locale } = useLanguage();
  const t = TRANSLATIONS[locale];
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate ? new Date(initialDate) : null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(initialTime || null);
  const [selectedOwnerEmail, setSelectedOwnerEmail] = useState<string | null>(null);
  const [calendlyAvailability, setCalendlyAvailability] = useState<{[key: string]: SlotWithOwner[]}>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [region, setRegion] = useState<RegionKey | null>(propRegion || null);

  // Update region when prop changes (from parent form after country selection)
  useEffect(() => {
    if (propRegion && propRegion !== region) {
      console.log('🔄 Region updated from parent:', propRegion);
      setRegion(propRegion);
    }
  }, [propRegion]);

  // Detect region from UTM parameters on mount (initial detection)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (propRegion) return; // Skip if parent already provided region
    
    const params = new URLSearchParams(window.location.search);
    const detectedRegion = resolveRegionFromUTM({
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_term: params.get('utm_term'),
      lang: locale as 'fr' | 'en' | 'es' | 'pt',
    });
    
    setRegion(detectedRegion);
    console.log('🌍 Calendar region detected from UTM:', detectedRegion, '| Locale:', locale);
  }, [locale, propRegion]);

  // Fetch availability from Calendly when month changes or component mounts
  useEffect(() => {
    if (!region) {
      console.warn('⚠️ No region detected, skipping Calendly availability fetch');
      return;
    }

    const fetchAvailability = async () => {
      setLoadingAvailability(true);
      try {
        // Calendly requires start_time to be in the future
        const now = new Date();
        const startDate = new Date(displayYear, displayMonth, 1);
        
        // If the first day of the month is in the past, start from today
        const effectiveStartDate = startDate < now ? now : startDate;
        
        // Calendly only allows fetching 7 days at a time
        // We'll fetch multiple weeks to cover the month
        const endDate = new Date(displayYear, displayMonth + 1, 0);
        
        // Get Calendly config for this region
        const calendlyConfig = getCalendlyConfig(region);
        
        // Extract event URI from Calendly URL
        const eventUri = calendlyConfig.eventUrl.replace('https://calendly.com/', '');
        
        const formatDate = (date: Date) => date.toISOString().split('T')[0];
        
        console.log('🔍 Fetching Calendly availability for:', {
          region,
          eventUrl: calendlyConfig.eventUrl,
          startDate: formatDate(effectiveStartDate),
          endDate: formatDate(endDate)
        });
        
        // Fetch availability in 7-day chunks (Calendly's limit)
        const allAvailability: {[key: string]: SlotWithOwner[]} = {};
        let currentStart = new Date(effectiveStartDate);
        
        while (currentStart <= endDate) {
          const currentEnd = new Date(currentStart);
          currentEnd.setDate(currentEnd.getDate() + 6); // 7 days total (inclusive)
          
          // Don't go beyond the end of the month
          const chunkEnd = currentEnd > endDate ? endDate : currentEnd;
          
          console.log('📤 Requesting availability chunk:', {
            startDate: formatDate(currentStart),
            endDate: formatDate(chunkEnd),
            eventUri
          });

          const chunkResponse = await fetch('/api/calendly/availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventUri,
              startDate: formatDate(currentStart),
              endDate: formatDate(chunkEnd),
            }),
          });

          console.log('📥 Chunk response status:', chunkResponse.status);

          if (!chunkResponse.ok) {
            const responseText = await chunkResponse.text();
            console.error('❌ Calendly API Error:', {
              status: chunkResponse.status,
              statusText: chunkResponse.statusText,
              responseText: responseText,
              responseTextLength: responseText.length,
              requestParams: {
                eventUri,
                startDate: formatDate(currentStart),
                endDate: formatDate(chunkEnd)
              }
            });
            
            // Try to parse as JSON, otherwise use the text
            let errorData;
            try {
              errorData = responseText ? JSON.parse(responseText) : { error: 'Empty response' };
            } catch (e) {
              errorData = { error: responseText || 'Unknown error' };
            }
            
            const errorMessage = errorData.error || errorData.message || errorData.details?.message || 'Failed to fetch availability';
            console.error('❌ Error message:', errorMessage);
            throw new Error(errorMessage);
          }

          const { availability } = await chunkResponse.json();
          
          // Merge this chunk's availability into the overall map
          availability.forEach((day: any) => {
            allAvailability[day.date] = day.slots.map((time: string) => ({
              time,
              ownerEmail: undefined
            }));
          });
          
          // Move to next week
          currentStart.setDate(currentStart.getDate() + 7);
        }
        
        console.log('✅ Calendly availability received:', {
          totalDays: Object.keys(allAvailability).length,
          totalSlots: Object.values(allAvailability).reduce((acc, slots) => acc + slots.length, 0),
          dateRange: Object.keys(allAvailability).sort()
        });

        setCalendlyAvailability(allAvailability);
      } catch (error) {
        console.error('❌ Failed to fetch Calendly availability:', error);
        setCalendlyAvailability({}); // Clear availability on error
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [displayMonth, displayYear, region]);

  const isHoliday = (date: Date | null) => {
    if (!date) return false;
    const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return FRENCH_HOLIDAYS.includes(monthDay);
  };

  const isWeekend = (date: Date | null) => date ? date.getDay() === 0 || date.getDay() === 6 : false;

  const isPastDay = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(currentYear, currentMonth, currentDate.getDate());
    return date < today && (displayYear < currentYear || (displayYear === currentYear && displayMonth <= currentMonth));
  };

  const isToday = (date: Date | null) =>
    date?.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  // Format date as YYYY-MM-DD for Calendly API
  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isSelectable = (date: Date) => {
    // If Calendly is connected, check availability from Calendly
    if (region && Object.keys(calendlyAvailability).length > 0) {
      const dateStr = formatDateString(date);
      return calendlyAvailability[dateStr] && calendlyAvailability[dateStr].length > 0;
    }

    // Fallback to original logic if no region detected
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);

    const isTodayDate = selectedDay.getTime() === today.getTime();

    const nextBusinessDays: Date[] = [];
    const tempDate = new Date(today);

    while (nextBusinessDays.length < 2) {
      tempDate.setDate(tempDate.getDate() + 1);
      if (!isWeekend(tempDate) && !isHoliday(tempDate)) {
        nextBusinessDays.push(new Date(tempDate));
      }
    }

    const isNextBusinessDay = nextBusinessDays.some(businessDay => {
      const businessDayTime = new Date(businessDay);
      businessDayTime.setHours(0, 0, 0, 0);
      return businessDayTime.getTime() === selectedDay.getTime();
    });

    return (
      !isPastDay(date) &&
      !isHoliday(date) &&
      !isWeekend(date) &&
      (isTodayDate || isNextBusinessDay)
    );
  };

  const generateMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    for (let i = 0; i < (firstDay.getDay() + 6) % 7; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      currentWeek.push(date);

      if (date.getDay() === 0 || day === daysInMonth) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    return weeks;
  };

  const generateTimeSlots = () => {
    // If Calendly is connected and we have a selected date, use Calendly slots
    if (region && selectedDate && Object.keys(calendlyAvailability).length > 0) {
      const dateStr = formatDateString(selectedDate);
      const slotsWithOwner = calendlyAvailability[dateStr] || [];
      // Return just the time strings for display
      return slotsWithOwner.map(s => s.time);
    }

    // Fallback to original logic if no region
    const slots = [];
    const start = 10 * 60;
    const end = 19 * 60;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let time = start; time <= end; time += 15) {
      if (time > currentTime || !selectedDate || selectedDate.toDateString() !== now.toDateString()) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const label = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        slots.push(label);
      }
    }

    return slots;
  };

  const canGoPrevious = () => !(displayMonth === currentMonth && displayYear === currentYear);
  
  const canGoNext = () => {
    const nextMonth = displayMonth + 1;
    const nextYear = displayYear;
    return (nextYear * 12 + nextMonth) <= (currentYear * 12 + currentMonth + 2);
  };

  const goPrevious = () => {
    if (canGoPrevious()) {
      if (displayMonth === 0) {
        setDisplayMonth(11);
        setDisplayYear(prev => prev - 1);
      } else {
        setDisplayMonth(prev => prev - 1);
      }
    }
  };

  const goNext = () => {
    if (canGoNext()) {
      if (displayMonth === 11) {
        setDisplayMonth(0);
        setDisplayYear(prev => prev + 1);
      } else {
        setDisplayMonth(prev => prev + 1);
      }
    }
  };

  const handleDayClick = (date: Date) => {
    if (isSelectable(date)) {
      setSelectedDate(date);
    }
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    
    // For Calendly, we don't need owner email (handled by Calendly)
    let ownerEmail: string | undefined;
    if (region && selectedDate) {
      const dateStr = formatDateString(selectedDate);
      const slotsWithOwner = calendlyAvailability[dateStr] || [];
      const slotData = slotsWithOwner.find(s => s.time === slot);
      
      if (slotData) {
        setSelectedOwnerEmail(slotData.ownerEmail || '');
        ownerEmail = slotData.ownerEmail;
        console.log('📧 Calendly slot selected:', slot);
      } else {
        console.warn('⚠️ No slot data found for:', slot, '(region:', region, ')');
      }
    } else {
      console.warn('⚠️ No region or selectedDate, cannot determine owner email');
    }
    
    if (onDateTimeSelect && selectedDate) {
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      console.log('✅ Calling onDateTimeSelect with:', {
        date: formatDate(selectedDate),
        time: slot,
        ownerEmail
      });
      
      onDateTimeSelect(formatDate(selectedDate), slot, ownerEmail);
    }
  };

  const previousStep = () => {
    if (selectedSlot) {
      setSelectedSlot(null);
      return;
    }
    if (selectedDate) {
      setSelectedDate(null);
      return;
    }
  };

  const weeks = generateMonthData(displayYear, displayMonth);

  return (
    <div className="p-6 font-sans w-full shadow-lg rounded-lg mx-auto bg-white">
      <div className={`${!selectedDate ? 'xl:flex' : 'lg:flex lg:justify-between'} gap-5`}>
        <div className={`${!selectedDate ? 'block xl:w-1/2 xl:flex' : 'hidden xl:w-1/3'} flex flex-col gap-y-3 items-center justify-center xl:pr-5 xl:border-r-[1px] lg:border-gray-200`}>
          <p className='text-center text-sm text-slate-600 lg:text-[13px]'>{t.intro}</p>
          <p className='hidden lg:w-full lg:text-left text-[13px] lg:flex lg:items-center lg:gap-x-1 lg:justify-center'>
            <Icon path={mdiClock} size={0.8} className="text-[#fc5f44]" />
            <strong className='text-gray-600'>15</strong> {t.minutes}
          </p>
          {(selectedDate && selectedSlot) && <p className='hidden lg:w-full lg:text-left text-[13px] lg:flex lg:items-center lg:gap-x-1 lg:justify-center'>
            <svg viewBox="0 0 24 24" className='w-5 h-5' fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V3.26272C8.41203 3.24999 9.1414 3.24999 9.94358 3.25H14.0564C14.8586 3.24999 15.588 3.24999 16.25 3.26272V2.5C16.25 2.08579 16.5858 1.75 17 1.75C17.4142 1.75 17.75 2.08579 17.75 2.5V3.32709C18.0099 3.34691 18.2561 3.37182 18.489 3.40313C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33855 22.5969 7.51098C22.6472 7.88567 22.681 8.29459 22.7037 8.74007C22.7337 8.82106 22.75 8.90861 22.75 9C22.75 9.06932 22.7406 9.13644 22.723 9.20016C22.75 10.0021 22.75 10.9128 22.75 11.9436V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V11.9436C1.24999 10.9127 1.24998 10.0021 1.27701 9.20017C1.25941 9.13645 1.25 9.06932 1.25 9C1.25 8.90862 1.26634 8.82105 1.29627 8.74006C1.31895 8.29458 1.35276 7.88566 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40313C5.7439 3.37182 5.99006 3.34691 6.25 3.32709V2.5C6.25 2.08579 6.58579 1.75 7 1.75ZM2.76309 9.75C2.75032 10.4027 2.75 11.146 2.75 12V14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14V12C21.25 11.146 21.2497 10.4027 21.2369 9.75H2.76309ZM21.1683 8.25H2.83168C2.8477 8.06061 2.86685 7.88123 2.88976 7.71085C3.02502 6.70476 3.27869 6.12511 3.7019 5.7019C4.12511 5.27869 4.70476 5.02502 5.71085 4.88976C6.73851 4.75159 8.09318 4.75 10 4.75H14C15.9068 4.75 17.2615 4.75159 18.2892 4.88976C19.2952 5.02502 19.8749 5.27869 20.2981 5.7019C20.7213 6.12511 20.975 6.70476 21.1102 7.71085C21.1331 7.88123 21.1523 8.06061 21.1683 8.25Z" fill="#fc5f44"/>
            </svg>
            <strong className="text-gray-600">{selectedSlot}</strong>, {t.weekdays[selectedDate.getDay()]} {selectedDate.getDate()} {t.monthNames[selectedDate.getMonth()]}
          </p>}
        </div>

        <div className={`${!selectedDate ? 'xl:w-1/2' : 'xl:w-full'}`}>
          {selectedDate && <button onClick={previousStep} className='cursor-pointer px-3 py-1 mb-3 text-[#7c3aed] hover:text-white duration-300 ease-in-out hover:bg-[#7c3aed]/50 w-11 lg:w-10 h-11 lg:h-10 rounded-full border-gray-100 border-[2px] flex items-center justify-center'>
            <Icon path={mdiArrowLeft} size={0.7} />
          </button>}

          <div className={`${!selectedDate ? '' : 'lg:flex lg:justify-between'} gap-5`}>
            <div className={`${!selectedDate ? 'block' : 'hidden lg:w-2/3'} lg:block`}>
              <p className='font-bold my-3 lg:mt-3 lg:hidden text-center text-lg'>{t.chooseDay}</p>
              <p className='hidden lg:block font-bold my-3 lg:mt-0 text-center text-lg'>{t.selectDateTime}</p>
              <div className="flex justify-between gap-x-2 items-center mb-4 mx-auto">
                <button
                  onClick={goPrevious}
                  disabled={!canGoPrevious()}
                  className={`px-3 py-1 rounded-full duration-300 flex-shrink-0 hover:ease-in-out w-10 h-10 flex items-center justify-center ${canGoPrevious()
                    ? 'bg-[#7c3aed] !text-white hover:bg-[#6b21a8] cursor-pointer'
                    : 'bg-white text-gray-400 cursor-not-allowed'
                    }`}
                >
                  <Icon path={mdiArrowLeft} size={0.7} />
                </button>
                <h2 className="text-lg font-medium lowercase whitespace-nowrap lg:font-light lg:text-gray-900 lg:text-sm text-gray-800">
                  {t.monthNames[displayMonth]} {displayYear}
                </h2>
                <button
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className={`px-3 py-1 rounded-full duration-300 flex-shrink-0 hover:ease-in-out w-10 h-10 flex items-center justify-center ${canGoNext()
                    ? 'bg-[#7c3aed] !text-white hover:bg-[#6b21a8] cursor-pointer'
                    : 'bg-white text-gray-400 cursor-not-allowed'
                    }`}
                >
                  <Icon path={mdiArrowRight} size={0.7} />
                </button>
              </div>
              <div className="bg-white">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {t.dayNames.map((day, i) => (
                    <div key={i} className="text-center text-sm font-medium lg:font-light lg:text-gray-900 lg:text-[13px] text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {weeks.flatMap((week, weekIndex) =>
                    week.map((date, dayIndex) => {
                      if (!date) return <div key={`${weekIndex}-${dayIndex}`} className="h-10" />;
                      const holiday = isHoliday(date);
                      const weekend = isWeekend(date);
                      const today = isToday(date);
                      const past = isPastDay(date);
                      const selected = selectedDate && date.toDateString() === selectedDate.toDateString();
                      return (
                        <div
                          key={date.toString()}
                          onClick={() => handleDayClick(date)}
                          className={`
                            flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
                            text-sm lg:text-[15px] transition-colors duration-150 font-medium
                            ${selected
                              ? 'bg-[#7c3aed] text-white'
                              : today
                                ? 'text-[#7c3aed] font-extrabold border-[1px] cursor-pointer'
                                : past
                                  ? 'text-gray-300'
                                  : holiday
                                    ? 'text-gray-400'
                                    : weekend
                                      ? 'text-gray-400'
                                      : isSelectable(date)
                                        ? 'text-white bg-[#7c3aed]/70 font-bold cursor-pointer hover:bg-[#6b21a8]'
                                        : ''
                            }
                          `}
                        >
                          {date.getDate()}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {selectedDate && (
              <div className='lg:max-h-[400px] lg:overflow-auto lg:w-1/3 2xl:w-1/2'>
                <h2 className='text-center text-lg font-bold lg:font-medium lg:text-sm lg:mb-3 lg:text-gray-900'>{t.weekdays[selectedDate.getDay()]} {selectedDate.getDate()} {t.monthNames[selectedDate.getMonth()]}</h2>
                <p className='font-medium my-3 lg:mt-3 lg:hidden text-center text-[17px]'>{t.chooseTime}</p>
                <p className='text-center text-[15px] mb-3 lg:text-[13px] lg:hidden'>{t.duration} : 15 {t.minutes}</p>
                <div className="grid grid-cols-1 gap-3 text-md font-bold text-gray-500 lg:text-sm">
                  {generateTimeSlots().map(slot => (
                    <div
                      key={slot}
                      onClick={() => handleSlotClick(slot)}
                      className={`border rounded-md py-3.5 lg:py-2.5 lg:rounded text-center lg:font-medium cursor-pointer transition-all ${
                        selectedSlot === slot
                          ? 'bg-[#7c3aed] text-white border-[#7c3aed]'
                          : 'bg-white border-[#7c3aed] hover:border-[#7c3aed] hover:border-[2px]'
                      }`}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
