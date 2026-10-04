import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, X, MessageSquare, Copy, Check, BatteryCharging, Zap, ShieldCheck, Flame } from 'lucide-react';
import { Language } from '../translations';

interface LimitedTimeOfferModalProps {
  lang: Language;
}

export const LimitedTimeOfferModal: React.FC<LimitedTimeOfferModalProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 35 });

  // 30-second automated trigger
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('hitek_limited_offer_dismissed');
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // Exactly 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Ticking countdown clock
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const promoCode = 'VNB-BATTERY-199';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('hitek_limited_offer_dismissed', 'true');
    setIsOpen(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Hitek Solutions Malang Road!\nI would like to claim the Vaniyambadi Seasonal Battery Discount.\n- Promo Code: ${promoCode}\n- Offer: ₹199 Doorstep Health Audit & Extra ₹500 Scrap Bonus\nPlease book an appointment for my home.`
  );

  if (!isOpen) {
    return (
      /* Discreet Floating Trigger when closed so user can reopen if desired */
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 z-40 bg-[#102b2a] text-[#dcff73] hover:bg-[#1a4442] border border-[#38504d] px-3.5 py-2 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all cursor-pointer hover:scale-105"
        title="View Vaniyambadi seasonal battery discount"
      >
        <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
        <span className="hidden sm:inline">Seasonal Offer:</span>
        <span>₹199 Battery Service</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-[#102b2a] text-white rounded-3xl max-w-lg w-full border-2 border-[#dcff73]/40 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Decorative Top Accent Bar */}
        <div className="h-2 bg-linear-to-r from-[#dcff73] via-[#507d38] to-[#dcff73]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-[#bbceca] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
          aria-label="Close offer modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcff73] text-[#102b2a] text-xs font-black uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-current" />
              <span>{lang === 'ta' ? 'வாணியம்பாடி பருவகால சலுகை' : 'Vaniyambadi Exclusive Deal'}</span>
            </span>

            {/* Live Ticking Countdown */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-[#dcff73] border border-[#38504d]">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            {lang === 'ta' ? 'கோடைகால பேட்டரி பராமரிப்பு சிறப்பு தள்ளுபடி!' : 'Beat Power Cuts: Seasonal Battery Care Discount!'}
          </h3>

          <p className="text-xs sm:text-sm text-[#bbceca] leading-relaxed mb-6">
            {lang === 'ta'
              ? 'வாணியம்பாடி முஸ்லிம்பூர், காதர்பேட்டை மற்றும் நியூடவுன் பகுதி மக்களுக்கு பிரத்யேக சலுகை. உங்கள் பேட்டரியின் ஆயுளை நீட்டிக்க இப்போதே பதிவு செய்யுங்கள்!'
              : 'Special seasonal package for residents across Muslimpur, Khaderpet, Newtown & Vaniyambadi. Prepare your backup system before summer power cuts!'}
          </p>

          {/* 3 Offer Perks Highlights */}
          <div className="space-y-3 mb-6">
            {/* Perk 1 */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0a1c1b] border border-[#23423f]">
              <div className="w-8 h-8 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ₹199
              </div>
              <div className="flex-1">
                <strong className="text-sm font-bold text-white block">
                  {lang === 'ta' ? 'முழுமையான வீட்டு ஆய்வு (வழக்கம் ₹499)' : 'Doorstep Battery Health & Acid Audit (Reg. ₹499)'}
                </strong>
                <span className="text-xs text-[#8fa8a3]">
                  {lang === 'ta'
                    ? 'ஸ்பெசிபிக் கிராவிட்டி அமில சோதனை, டெர்மினல் சுத்தம் மற்றும் லோடு பரிசோதனை.'
                    : 'Hydrometer specific gravity test, terminal corrosion cleaning & load test.'}
                </span>
              </div>
            </div>

            {/* Perk 2 */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0a1c1b] border border-[#23423f]">
              <div className="w-8 h-8 rounded-xl bg-orange-400 text-[#102b2a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                +₹500
              </div>
              <div className="flex-1">
                <strong className="text-sm font-bold text-white block">
                  {lang === 'ta' ? 'பழைய பேட்டரிக்கு கூடுதல் ₹500 போனஸ் தள்ளுபடி' : 'Extra ₹500 Bonus on Old Dead Battery Exchange'}
                </strong>
                <span className="text-xs text-[#8fa8a3]">
                  {lang === 'ta'
                    ? 'வழக்கமான ஸ்கிராப் விலையுடன் கூடுதலாக ₹500 தள்ளுபடி கிடைக்கும்.'
                    : 'Over and above the standard ₹1,500–₹3,200 scrap deduction on tall tubular batteries.'}
                </span>
              </div>
            </div>

            {/* Perk 3 */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0a1c1b] border border-[#23423f]">
              <div className="w-8 h-8 rounded-xl bg-sky-400 text-[#102b2a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                Free
              </div>
              <div className="flex-1">
                <strong className="text-sm font-bold text-white block">
                  {lang === 'ta' ? 'இலவச 5L பேட்டரி டிஸ்டில்டு வாட்டர் கேன்' : 'Free 5-Liter Battery Distilled Water Can'}
                </strong>
                <span className="text-xs text-[#8fa8a3]">
                  {lang === 'ta'
                    ? 'இன்வெர்ட்டர் சர்வீஸ் முன்பதிவு செய்யும் போது இலவசமாக வழங்கப்படும்.'
                    : 'Delivered free with your on-site doorstep service engineer visit.'}
                </span>
              </div>
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="p-3 bg-[#0a1c1b] rounded-2xl border border-[#38504d] flex items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8fa8a3] block">
                {lang === 'ta' ? 'கூப்பன் குறியீடு:' : 'Promo Code:'}
              </span>
              <span className="font-mono text-base font-black text-[#dcff73] tracking-widest">
                {promoCode}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (lang === 'ta' ? 'நகலெடு' : 'Copy')}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={`https://wa.me/919150051486?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-sm rounded-2xl transition-colors shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் சலுகையை பெறுக' : 'Claim Offer on WhatsApp Now'}</span>
            </a>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-2 text-xs text-[#8fa8a3] hover:text-white font-medium transition-colors"
            >
              {lang === 'ta' ? 'வேண்டாம், தொடர்ந்து பார்க்க' : 'No thanks, I will pay full price later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
