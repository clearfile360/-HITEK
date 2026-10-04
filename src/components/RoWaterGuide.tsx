import React, { useState } from 'react';
import { Droplet, Shield, Sparkles, AlertCircle, Check, ArrowRight } from 'lucide-react';

interface RoWaterGuideProps {
  onSelectSolution: (productName: string) => void;
}

export const RoWaterGuide: React.FC<RoWaterGuideProps> = ({ onSelectSolution }) => {
  const [tdsLevel, setTdsLevel] = useState<number>(650);

  const getWaterAdvice = (tds: number) => {
    if (tds < 250) {
      return {
        level: 'Low to Moderate TDS (Soft / Municipal Water)',
        recommendation: 'UV + UF Water Purifier with Carbon Polish',
        detail: 'Maintains essential natural minerals while neutralizing 99.9% bacteria and cysts.',
        badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      };
    } else if (tds <= 900) {
      return {
        level: 'Medium TDS (Typical Vaniyambadi Borewell & Tap Blend)',
        recommendation: 'Multi-stage RO + UV + TDS Controller + Mineralizer',
        detail: 'Reduces excessive hardness and salts while restoring healthy calcium & magnesium balance.',
        badgeColor: 'text-[#102b2a] bg-[#dcff73]/40 border-[#cbe663]'
      };
    } else {
      return {
        level: 'High to Very High TDS (Hard Groundwater / Industrial Belt)',
        recommendation: 'Heavy-Duty Commercial RO + Antiscalant + Alkaline Filter',
        detail: 'High-rejection RO membrane (up to 2500 ppm capability) to stop scaling and ensure sweet-tasting water.',
        badgeColor: 'text-amber-800 bg-amber-50 border-amber-200'
      };
    }
  };

  const advice = getWaterAdvice(tdsLevel);

  return (
    <section className="py-20 bg-white border-b border-[#dce4de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-6">
            <span className="text-xs font-extrabold tracking-widest text-[#507d38] uppercase block mb-2">
              Clean Water Health Guide
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight mb-4 text-balance">
              Pure Drinking Water for Your Family.
            </h2>
            <p className="text-sm sm:text-base text-[#526460] leading-relaxed mb-6">
              Groundwater across Vaniyambadi and Malang Road varies significantly in Total Dissolved Solids (TDS) and hardness. Hitek Solutions provides water testing, custom RO installations, and filter servicing.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f5f7f4] border border-[#dce4de]">
                <Droplet className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102b2a]">Free Doorstep Water TDS Testing</h4>
                  <p className="text-xs text-[#526460]">We will measure the exact TDS and hardness of your borewell or tap water at no cost.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f5f7f4] border border-[#dce4de]">
                <Sparkles className="w-5 h-5 text-[#507d38] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102b2a]">Copper &amp; Alkaline Mineral Cartridge</h4>
                  <p className="text-xs text-[#526460]">Infuses essential copper, zinc, and alkaline electrolytes to boost immunity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f5f7f4] border border-[#dce4de]">
                <Shield className="w-5 h-5 text-[#102b2a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102b2a]">Filter &amp; Membrane Service on Call</h4>
                  <p className="text-xs text-[#526460]">Spun polypropylene pre-filters, carbon blocks, booster pumps and RO membranes replaced same day.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectSolution('RO water filters')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#102b2a] text-white font-bold text-xs sm:text-sm rounded-md hover:bg-[#1a4442] transition-colors cursor-pointer"
            >
              <span>Book Free Water Test or Service</span>
              <ArrowRight className="w-4 h-4 text-[#dcff73]" />
            </button>
          </div>

          {/* Right Interactive TDS Sizer */}
          <div className="lg:col-span-6 bg-[#f5f7f4] rounded-2xl border border-[#dce4de] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-[#102b2a]">
                Vaniyambadi Water TDS Selector
              </h3>
              <span className="text-xs font-mono font-bold text-[#507d38] bg-white border border-[#dce4de] px-2.5 py-1 rounded">
                Interactive Tool
              </span>
            </div>

            <p className="text-xs text-[#526460] mb-6">
              Drag the slider to your estimated water salinity / TDS reading:
            </p>

            {/* Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#526460]">Water TDS Reading:</span>
                <span className="text-xl font-black text-[#102b2a] font-mono tabular-nums">
                  {tdsLevel} <span className="text-xs font-normal text-[#526460]">ppm (mg/L)</span>
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1800"
                step="50"
                value={tdsLevel}
                onChange={e => setTdsLevel(Number(e.target.value))}
                className="w-full h-2.5 bg-[#dce4de] rounded-lg appearance-none cursor-pointer accent-[#507d38]"
              />
              <div className="flex justify-between text-[10px] text-[#526460] font-mono mt-2">
                <span>100 (River / Municipal)</span>
                <span>700 (Average Well)</span>
                <span>1800+ (Hard Borewell)</span>
              </div>
            </div>

            {/* Advice Box */}
            <div className="bg-white rounded-xl border border-[#d9e1da] p-5 shadow-xs mb-6">
              <div className="inline-block px-2.5 py-1 rounded text-xs font-bold border mb-3">
                {advice.level}
              </div>
              <h4 className="text-base font-extrabold text-[#102b2a] mb-1">
                {advice.recommendation}
              </h4>
              <p className="text-xs text-[#526460] leading-relaxed">
                {advice.detail}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#526460] pt-2 border-t border-[#dce4de]">
              <span>Don't know your TDS reading?</span>
              <a
                href="tel:+919150051486"
                className="font-bold text-[#102b2a] hover:underline"
              >
                Call for Free Home Water Test &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
