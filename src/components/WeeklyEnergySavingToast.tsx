import React, { useState, useEffect } from 'react';
import { Lightbulb, X, ArrowRight, ShieldCheck, Check, Sparkles, Zap } from 'lucide-react';
import { Language } from '../translations';

interface WeeklyEnergySavingToastProps {
  lang: Language;
}

interface EnergyTip {
  id: string;
  category: string;
  tamilCategory: string;
  tip: string;
  tamilTip: string;
  savingEstimate: string;
  tamilSavingEstimate: string;
  actionHref: string;
  actionText: string;
  tamilActionText: string;
}

export const WeeklyEnergySavingToast: React.FC<WeeklyEnergySavingToastProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips: EnergyTip[] = [
    {
      id: 'tip-inverter-eco',
      category: 'Inverter & Battery',
      tamilCategory: 'இன்வெர்ட்டர் & பேட்டரி',
      tip: 'Turn off your inverter or switch to Eco Mode during long grid-stable hours (11 PM - 6 AM) to reduce standby battery float consumption and extend battery plate life.',
      tamilTip: 'மின்சாரம் சீராக இருக்கும் இரவு நேரங்களில் இன்வெர்ட்டரை Eco Mode-க்கு மாற்றினால், தேவையற்ற ஸ்டாண்ட்பை மின் நுகர்வு குறைந்து பேட்டரி ஆயுள் நீடிக்கும்.',
      savingEstimate: 'Saves ~18 units/month (₹120–₹180)',
      tamilSavingEstimate: 'மாதம் ~18 யூனிட் சேமிப்பு (₹120–₹180)',
      actionHref: '#power-saver',
      actionText: 'View Power-Saver Settings',
      tamilActionText: 'பவர்-சேவர் அமைப்புகளை பார்க்க'
    },
    {
      id: 'tip-battery-water',
      category: 'Battery Water Maintenance',
      tamilCategory: 'பேட்டரி நீர் பராமரிப்பு',
      tip: 'Check your tubular battery electrolyte float indicator every 45 days. Running on low distilled water increases internal resistance and heats up charging transformers.',
      tamilTip: '45 நாட்களுக்கு ஒருமுறை பேட்டரியில் டிஸ்டில்டு வாட்டர் அளவை பரிசோதிக்கவும். குறைந்த நீர் மட்டம் மின் கட்டணத்தை 12% அதிகரிக்கும்.',
      savingEstimate: 'Prevents ₹2,500 premature battery dry-out',
      tamilSavingEstimate: '₹2,500 பேட்டரி சேதத்தை தடுக்கிறது',
      actionHref: '#battery-estimator',
      actionText: 'Check Battery Sizing',
      tamilActionText: 'பேட்டரி திறன் சரிபார்க்க'
    },
    {
      id: 'tip-ro-solar-hour',
      category: 'RO Water Purification',
      tamilCategory: 'RO குடிநீர் சேமிப்பு',
      tip: 'Run your RO water purifier between 11 AM and 3 PM when municipal Kaveri tank pressure and solar power are at their peak to minimize booster pump electrical stress.',
      tamilTip: 'காலை 11 மணி முதல் மதியம் 3 மணி வரை RO பியூரிஃபையரை இயக்கினால், அதிக நீர் அழுத்தம் காரணமாக மோட்டார் குறைந்த மின்சாரத்தில் வேகமாக தொட்டியை நிரப்பும்.',
      savingEstimate: 'Cuts motor runtime by 22%',
      tamilSavingEstimate: 'மோட்டார் இயங்கும் நேரத்தை 22% குறைக்கும்',
      actionHref: '#water-guide',
      actionText: 'Read RO Water Guide',
      tamilActionText: 'RO வழிகாட்டி பார்க்க'
    },
    {
      id: 'tip-fan-capacitor',
      category: 'Ceiling Fan Efficiency',
      tamilCategory: 'மின்விசிறி சிக்கனம்',
      tip: 'If your ceiling fan produces humming noise on inverter power, check the motor capacitor. A healthy Pure Sine Wave feed saves up to 25W per fan during summer blackouts.',
      tamilTip: 'இன்வெர்ட்டரில் ஓடும்போது விசிறி சத்தம் எழுப்பினால் கெபாசிட்டரை மாற்றவும். சுத்தமான சைன் வேவ் விசிறிக்கு 25W வரை மின்சாரத்தை சேமிக்கும்.',
      savingEstimate: 'Saves up to 1.5 hours extra backup',
      tamilSavingEstimate: 'கூடுதலாக 1.5 மணி நேர பேக்கப் தரும்',
      actionHref: '#calculator',
      actionText: 'Calculate Fan Backup',
      tamilActionText: 'பேக்கப் நேரம் கணக்கிட'
    }
  ];

  useEffect(() => {
    try {
      const storageKey = 'hitek_weekly_energy_toast_timestamp';
      const lastShown = localStorage.getItem(storageKey);
      const now = Date.now();
      const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

      // Check if a week has passed or never shown
      if (!lastShown || now - parseInt(lastShown, 10) > ONE_WEEK_MS) {
        // Pick rotating tip based on the current calendar week number
        const currentWeekNumber = Math.floor(now / ONE_WEEK_MS);
        setCurrentTipIndex(currentWeekNumber % tips.length);

        // Show toast after 2.5 seconds delay
        const timer = setTimeout(() => {
          setIsVisible(true);
          localStorage.setItem(storageKey, now.toString());
        }, 2500);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Storage unavailable fallback
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  if (!isVisible) return null;

  const currentTip = tips[currentTipIndex];

  return (
    <aside 
      aria-label={lang === 'ta' ? 'வாராந்திர ஆற்றல் சேமிப்பு குறிப்பு' : 'Weekly Energy Saving Tip'}
      className="fixed bottom-24 left-4 sm:left-6 z-40 max-w-sm w-[calc(100vw-32px)] bg-[#102b2a] text-white rounded-3xl border border-[#38504d] shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#23423f]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center font-bold">
            <Lightbulb className="w-4 h-4 text-[#102b2a]" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase text-[#dcff73] tracking-wider">
              {lang === 'ta' ? 'வாராந்திர ஆற்றல் சேமிப்பு குறிப்பு' : 'Weekly Energy Saving Tip'}
            </div>
            <div className="text-xs font-bold text-white">
              {lang === 'ta' ? currentTip.tamilCategory : currentTip.category}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 text-[#8fa8a3] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Dismiss energy tip"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tip Content */}
      <div className="py-3 space-y-2">
        <p className="text-xs text-[#d3e2de] leading-relaxed">
          {lang === 'ta' ? currentTip.tamilTip : currentTip.tip}
        </p>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0a1c1b] border border-[#23423f] text-[11px] font-mono text-[#dcff73]">
          <Zap className="w-3 h-3 text-[#dcff73]" />
          <span>{lang === 'ta' ? currentTip.tamilSavingEstimate : currentTip.savingEstimate}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-2 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleNextTip}
          className="text-[11px] text-[#8fa8a3] hover:text-[#dcff73] underline cursor-pointer"
        >
          {lang === 'ta' ? 'அடுத்த குறிப்பு →' : 'Next tip →'}
        </button>

        <a
          href={currentTip.actionHref}
          onClick={handleDismiss}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-bold rounded-xl text-xs transition-colors"
        >
          <span>{lang === 'ta' ? currentTip.tamilActionText : currentTip.actionText}</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
