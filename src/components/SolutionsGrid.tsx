import React from 'react';
import { Zap, BatteryMedium, Droplets, Sun, ArrowRight, Check } from 'lucide-react';
import { Language, translations } from '../translations';

interface SolutionsGridProps {
  lang: Language;
  onSelectSolution: (productName: string) => void;
}

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({ lang, onSelectSolution }) => {
  const t = translations[lang].solutions;
  const solutions = [
    {
      num: '01 / POWER',
      icon: Zap,
      title: 'Inverters & Home UPS',
      tamil: 'இன்வெர்ட்டர் & UPS',
      description: 'Explore reliable power backup options for your home, shop, or clinic. Sine wave inverters that keep lights, fans, Wi-Fi, and refrigerators running smoothly.',
      points: [
        'Pure Sine Wave technology (safe for sensitive appliances)',
        'Home UPS capacities from 700VA to 3.5kVA+',
        'Heavy duty commercial backup systems available',
        'Top brands: Luminous, Microtek, Exide, Livguard'
      ],
      enquiryTag: 'Inverters & UPS',
      badge: 'Bestseller'
    },
    {
      num: '02 / BACKUP',
      icon: BatteryMedium,
      title: 'Tubular & Inverter Batteries',
      tamil: 'இன்வெர்ட்டர் பேட்டரி',
      description: 'Looking for a new battery or replacement? Long-lasting deep cycle tall tubular batteries engineered for Indian power cuts and hot summers.',
      points: [
        'Tall Tubular technology with ultra-low water loss',
        '100Ah, 150Ah, 200Ah & 220Ah capacities in stock',
        '36 to 60+ months manufacturer warranty with card',
        'Best scrap value for old battery buyback / exchange'
      ],
      enquiryTag: 'Batteries',
      badge: 'Best Warranty'
    },
    {
      num: '03 / WATER',
      icon: Droplets,
      title: 'RO Water Purifiers & Service',
      tamil: 'RO வாட்டர் ஃபில்டர்',
      description: 'Find out about multi-stage water purification systems and timely service. Tested against Vaniyambadi high-TDS groundwater and municipal supply.',
      points: [
        'Multi-stage RO + UV + UF + Alkaline TDS controller',
        'Removes dissolved salts, heavy metals, and bacteria',
        'Pre-filter candle replacement & genuine membrane change',
        'Annual Maintenance Contract (AMC) & emergency repair'
      ],
      enquiryTag: 'RO water filters',
      badge: 'Health Essential'
    },
    {
      num: '04 / SOLAR',
      icon: Sun,
      title: 'Solar Water Heaters & Rooftop',
      tamil: 'சோலார் வாட்டர் ஹீட்டர்',
      description: 'Explore rooftop solar water heating and solar power systems. Slash electric geyser bills and produce sustainable green electricity for your home.',
      points: [
        'ETC & FPC stainless steel pressurized solar water tanks',
        '100 LPD to 500 LPD domestic & hotel systems',
        'On-grid & hybrid solar inverter installations',
        'All-weather durable construction with high thermal efficiency'
      ],
      enquiryTag: 'Solar solutions',
      badge: 'Eco Savings'
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-white border-b border-[#dce4de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#507d38] uppercase block mb-2">
              {t.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight whitespace-pre-line">
              {t.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#526460] max-w-md leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={idx}
                className="bg-[#f5f7f4] border border-[#d9e1da] rounded-xl p-6 flex flex-col justify-between hover:border-[#102b2a]/30 transition-all hover:shadow-md group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono text-[#507d38]">
                      {item.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#d9e1da] flex items-center justify-center text-[#102b2a] group-hover:bg-[#102b2a] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-[#102b2a] mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#526460] block mb-3">
                    {item.tamil}
                  </span>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#526460] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2 mb-6">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-[#37474f]">
                        <Check className="w-3.5 h-3.5 text-[#507d38] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#d9e1da]">
                  <button
                    onClick={() => onSelectSolution(item.enquiryTag)}
                    className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#102b2a] hover:text-[#507d38] py-1 cursor-pointer transition-colors group/btn"
                  >
                    <span>Enquire about {item.enquiryTag}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
