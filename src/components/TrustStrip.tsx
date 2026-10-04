import React from 'react';
import { BatteryCharging, Droplet, Sun, Wrench, Shield } from 'lucide-react';
import { Language, translations } from '../translations';

interface TrustStripProps {
  lang: Language;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ lang }) => {
  const t = translations[lang].strip;

  return (
    <div className="bg-[#dcff73] text-[#102b2a] border-y border-[#cbe663] py-4 overflow-x-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-w-max gap-8 lg:gap-12 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-[#102b2a]" />
            <span>{t.invertersBatteries}</span>
          </div>
          <span className="text-[#a0c242]" aria-hidden="true">•</span>

          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-[#102b2a]" />
            <span>{t.roFilters}</span>
          </div>
          <span className="text-[#a0c242]" aria-hidden="true">•</span>

          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#102b2a]" />
            <span>{t.solar}</span>
          </div>
          <span className="text-[#a0c242]" aria-hidden="true">•</span>

          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#102b2a]" />
            <span>{t.engineers}</span>
          </div>
          <span className="text-[#a0c242]" aria-hidden="true">•</span>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#102b2a]" />
            <span>{t.genuine}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
