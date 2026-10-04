import React from 'react';
import { Phone, ArrowRight, ShieldCheck, MapPin, Zap, Droplets, Wrench } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroProps {
  lang: Language;
  onSelectSolution: (productName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onSelectSolution }) => {
  const t = translations[lang].hero;

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#dce4de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Location Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{t.eyebrow}</span>
              <span className="text-[#97aaa1]">/</span>
              <span className="text-[#526460]">{t.landmark}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102b2a] tracking-tight leading-[1.08] mb-6 text-balance">
              {t.title1}<br />
              <span className="text-[#507d38] font-normal italic">{t.title2}</span>
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-[#526460] leading-relaxed max-w-xl mb-8">
              {t.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#enquire"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#dcff73] text-[#102b2a] font-bold text-sm sm:text-base rounded-md hover:bg-[#cbe663] transition-all shadow-xs cursor-pointer"
              >
                <span>{t.findSolution}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+919150051486"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#97aaa1] text-[#102b2a] bg-white font-bold text-sm sm:text-base rounded-md hover:bg-[#e8eee5] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#507d38]" />
                <span className="tabular-nums">91500 51486</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#dce4de] max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102b2a]">
                  <Zap className="w-3.5 h-3.5 text-[#507d38]" />
                  <span>{lang === 'ta' ? 'மின் பேக்கப்' : 'Backup Power'}</span>
                </div>
                <span className="text-xs text-[#526460] mt-0.5">Exide &amp; UPS</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#102b2a]">
                <Droplets className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>{lang === 'ta' ? 'தூய குடிநீர்' : 'Pure Water'}</span>
              </div>
              <span className="text-xs text-[#526460] mt-0.5">RO Filter Service</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102b2a]">
                  <Wrench className="w-3.5 h-3.5 text-[#eab308]" />
                  <span>{lang === 'ta' ? 'இன்ஜினியர்கள்' : 'Engineers'}</span>
                </div>
                <span className="text-xs text-[#526460] mt-0.5">Doorstep Visit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="bg-[#102b2a] rounded-xl overflow-hidden border border-[#38504d] shadow-xl relative">
              {/* Header Ribbon */}
              <div className="bg-[#0e2929] px-4 py-3 border-b border-[#38504d] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dcff73] animate-pulse"></span>
                  <span className="text-xs font-bold text-white tracking-wide">{t.openToday}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#dcff73] uppercase tracking-wider">
                  {lang === 'ta' ? 'வாணியம்பாடி' : 'Vaniyambadi'}
                </span>
              </div>

              {/* Main Graphic / Photo Frame */}
              <div className="relative aspect-4/3 bg-[#1e3a39] flex items-center justify-center p-3">
                <img
                  src="/batteries.svg"
                  alt="Hitek Solutions showroom on Malang Road, Vaniyambadi"
                  className="w-full h-full object-cover rounded-lg border border-[#38504d]"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.endsWith('/batteries.svg')) {
                      target.src = '/batteries.svg';
                    }
                  }}
                />

                {/* Subtle Floating Verified Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#102b2a]/90 backdrop-blur-md border border-[#38504d] p-3 rounded-lg flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-bold text-[#dcff73]">No.33, 325, Malang Road</p>
                    <p className="text-[11px] text-[#bbceca]">{t.landmark}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#dcff73] block">{t.callStore}</span>
                    <a href="tel:+919150051486" className="text-xs font-bold text-white hover:underline tabular-nums">91500 51486</a>
                  </div>
                </div>
              </div>

              {/* Footer strip in card */}
              <div className="bg-[#091a19] px-4 py-2.5 flex items-center justify-between text-xs text-[#bbceca] border-t border-[#38504d]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#dcff73]" />
                  <span>{t.authorized}</span>
                </div>
                <button
                  onClick={() => onSelectSolution('Inverters & UPS')}
                  className="text-[#dcff73] font-bold text-xs hover:underline cursor-pointer"
                >
                  {t.requestVisit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
