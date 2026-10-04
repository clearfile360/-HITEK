import React, { useState } from 'react';
import { Layers, Check, Minus, Zap, Droplets, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Language } from '../translations';

interface ProductComparisonProps {
  lang: Language;
  onSelectProduct: (productName: string) => void;
}

interface SpecRow {
  label: string;
  tamilLabel: string;
  values: string[];
  tamilValues?: string[];
  highlight?: boolean;
}

interface ModelColumn {
  name: string;
  tamilName: string;
  badge?: string;
  tamilBadge?: string;
  capacity: string;
  price: string;
  enquiryTag: string;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({ lang, onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<'inverters' | 'ro'>('inverters');

  // Inverter Models
  const inverterColumns: ModelColumn[] = [
    {
      name: 'Starter 700VA',
      tamilName: 'ஆரம்ப நிலை 700VA',
      capacity: '700VA / 100Ah',
      price: '₹14,500',
      enquiryTag: 'Inverters & UPS'
    },
    {
      name: 'Standard 900VA - 1100VA',
      tamilName: 'ஸ்டாண்டர்ட் 900VA - 1100VA',
      badge: 'Most Popular',
      tamilBadge: 'அதிக விற்பனை',
      capacity: '900VA–1100VA / 150Ah',
      price: '₹18,500',
      enquiryTag: 'Inverters & UPS'
    },
    {
      name: 'Heavy-Duty 1150VA - 1500VA',
      tamilName: 'ஹெவி-டியூட்டி 1150VA - 1500VA',
      capacity: '1150VA–1500VA / 200Ah',
      price: '₹23,999',
      enquiryTag: 'Inverters & UPS'
    },
    {
      name: 'Commercial 2kVA / 24V',
      tamilName: 'வணிக முறை 2kVA / 24V',
      capacity: '2000VA / 2x 150Ah',
      price: '₹36,000',
      enquiryTag: 'Inverters & UPS'
    }
  ];

  const inverterSpecs: SpecRow[] = [
    {
      label: 'Recommended Home Size',
      tamilLabel: 'பரிந்துரைக்கப்படும் வீடு',
      values: ['1 BHK / Small Shop', '2–3 BHK Family Home', '3–4 BHK / Villa', 'Clinics / Commercial Office'],
      tamilValues: ['1 BHK / சிறிய கடை', '2–3 BHK குடும்ப வீடு', '3–4 BHK / தனி வீடு', 'மருத்துவமனை / அலுவலகம்']
    },
    {
      label: 'Maximum Running Load',
      tamilLabel: 'அதிகபட்ச இயங்கும் லோடு',
      values: ['560 Watts', '720W – 880 Watts', '920W – 1200 Watts', '1600 Watts']
    },
    {
      label: 'Supported Appliances',
      tamilLabel: 'இயக்கக்கூடிய உபகரணங்கள்',
      values: [
        '2 Fans + 2 LED Lights + Wi-Fi',
        '3 Fans + 4 LEDs + TV + Wi-Fi + Laptop',
        'Fans, Lights, TV + Inverter Fridge',
        'Computers, Billing Counters, Lights & CCTV'
      ],
      tamilValues: [
        '2 மின்விசிறி + 2 விளக்கு + வைஃபை',
        '3 மின்விசிறி + 4 விளக்கு + டிவி + மடிக்கணினி',
        'விசிறி, விளக்கு + இன்வெர்ட்டர் பிரிட்ஜ்',
        'கணினிகள், பில்லிங், விளக்குகள் & CCTV'
      ]
    },
    {
      label: 'Backup Duration',
      tamilLabel: 'பேக்கப் நேரம்',
      values: ['3 to 4 Hours', '4 to 6 Hours', '6 to 8+ Hours', '8 to 12 Hours'],
      tamilValues: ['3 முதல் 4 மணி நேரம்', '4 முதல் 6 மணி நேரம்', '6 முதல் 8+ மணி நேரம்', '8 முதல் 12 மணி நேரம்'],
      highlight: true
    },
    {
      label: 'Waveform Technology',
      tamilLabel: 'வேவ்ஃபார்ம் தொழில்நுட்பம்',
      values: ['Pure Sine Wave', 'Pure Sine Wave', 'Pure Sine Wave', 'Heavy Duty Sine Wave']
    },
    {
      label: 'Inverter Refrigerator Support',
      tamilLabel: 'பிரிட்ஜ் இயங்கும் வசதி',
      values: ['No', 'Compact Only', 'Yes (Up to 350L)', 'Yes (Multiple / Commercial)']
    },
    {
      label: 'Battery Technology',
      tamilLabel: 'பேட்டரி வகை',
      values: ['100Ah Short Tubular', '150Ah Tall Tubular', '200Ah Jumbo Tubular', '2x 150Ah (24V Bank)'],
      tamilValues: ['100Ah ஷார்ட் டியூபுலர்', '150Ah டால் டியூபுலர்', '200Ah ஜம்போ டியூபுலர்', '2x 150Ah (24V வங்கி)']
    },
    {
      label: 'Warranty Coverage',
      tamilLabel: 'உத்தரவாத காலம்',
      values: ['2 Yrs UPS + 3 Yrs Battery', '2 Yrs UPS + 5 Yrs Battery', '2 Yrs UPS + 5.5 Yrs Battery', '3 Yrs UPS + 5 Yrs Battery'],
      highlight: true
    },
    {
      label: 'Free Doorstep Delivery & Setup',
      tamilLabel: 'இலவச டெலிவரி & பொருத்துதல்',
      values: ['Included', 'Included', 'Included', 'Included'],
      tamilValues: ['உண்டு', 'உண்டு', 'உண்டு', 'உண்டு']
    }
  ];

  // RO Models
  const roColumns: ModelColumn[] = [
    {
      name: 'UV + UF Purifier',
      tamilName: 'UV + UF பியூரிஃபையர்',
      capacity: '7-8 Liters Storage',
      price: '₹6,500',
      enquiryTag: 'RO water filters'
    },
    {
      name: 'RO + UV + TDS Controller',
      tamilName: 'RO + UV + TDS கன்ட்ரோலர்',
      badge: 'Best for Vaniyambadi',
      tamilBadge: 'வாணியம்பாடிக்கு ஏற்றது',
      capacity: '10 Liters Storage',
      price: '₹8,999',
      enquiryTag: 'RO water filters'
    },
    {
      name: 'Copper + Alkaline RO',
      tamilName: 'காப்பர் + ஆல்கலைன் RO',
      badge: 'Immunity Boost',
      tamilBadge: 'நோய் எதிர்ப்பு சக்தி',
      capacity: '12 Liters Premium',
      price: '₹12,500',
      enquiryTag: 'RO water filters'
    }
  ];

  const roSpecs: SpecRow[] = [
    {
      label: 'Suitable Water Source',
      tamilLabel: 'பொருத்தமான தண்ணீர் வகை',
      values: [
        'Municipal / Soft River Water',
        'Borewell & Well Water (TDS 300–1200)',
        'Hard Groundwater (TDS up to 1800+)'
      ],
      tamilValues: [
        'நகராட்சி / காவிரி குடிநீர்',
        'போர்வெல் & கிணற்று நீர் (TDS 300–1200)',
        'அதிக உப்புத்தன்மை நீர் (TDS 1800+)'
      ]
    },
    {
      label: 'Filtration Stages',
      tamilLabel: 'சுத்திகரிப்பு நிலைகள்',
      values: [
        '4 Stages (Sediment + Carbon + UV + UF)',
        '6 Stages (Sediment + Carbon + RO + UV + TDS)',
        '8 Stages (RO + UV + Alkaline + Copper + Zinc)'
      ],
      tamilValues: [
        '4 நிலைகள் (செடிமென்ட், கார்பன், UV, UF)',
        '6 நிலைகள் (செடிமென்ட், கார்பன், RO, UV, TDS)',
        '8 நிலைகள் (RO, UV, ஆல்கலைன், காப்பர், ஜிங்க்)'
      ]
    },
    {
      label: 'Mineral & pH Balance',
      tamilLabel: 'தாதுக்கள் & pH சமநிலை',
      values: ['Natural Minerals Intact', 'Adjustable TDS Controller', 'Alkaline Mineralizer (pH 8.0–8.5)'],
      tamilValues: ['இயற்கை தாதுக்கள் மாறாது', 'TDS கன்ட்ரோலர் வசதி', 'ஆல்கலைன் தாதுக்கள் (pH 8.0–8.5)'],
      highlight: true
    },
    {
      label: 'Purification Speed',
      tamilLabel: 'சுத்திகரிப்பு வேகம்',
      values: ['30–45 Liters / Hour', '15 Liters / Hour', '18 Liters / Hour']
    },
    {
      label: 'Storage Capacity',
      tamilLabel: 'தொட்டி சேமிப்பு கொள்ளளவு',
      values: ['7–8 Liters', '10 Liters', '12 Liters']
    },
    {
      label: 'Booster Pump Spec',
      tamilLabel: 'பூஸ்டர் பம்ப் திறன்',
      values: ['Not required (Gravity flow)', '100 GPD High Pressure', '125 GPD Heavy Duty']
    },
    {
      label: 'Annual Filter Maintenance Cost',
      tamilLabel: 'ஆண்டு பராமரிப்பு செலவு',
      values: ['Low (~₹450 / year)', 'Moderate (~₹850 / year)', 'Standard (~₹950 / year)'],
      tamilValues: ['குறைவு (~₹450 / வருடம்)', 'மிதமானது (~₹850 / வருடம்)', 'வழக்கமானது (~₹950 / வருடம்)'],
      highlight: true
    },
    {
      label: 'Free Doorstep Water Testing',
      tamilLabel: 'இலவச வீட்டு குடிநீர் பரிசோதனை',
      values: ['Included', 'Included', 'Included'],
      tamilValues: ['உண்டு', 'உண்டு', 'உண்டு']
    }
  ];

  const columns = activeCategory === 'inverters' ? inverterColumns : roColumns;
  const specs = activeCategory === 'inverters' ? inverterSpecs : roSpecs;

  return (
    <section id="comparison" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Layers className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'நேருக்கு நேர் ஒப்பீடு' : 'Side-by-Side Model Comparison'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'தயாரிப்பு ஒப்பீடு & வழிகாட்டி.' : 'Product Comparison.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் வீட்டிற்கு சரியான இன்வெர்ட்டர் அல்லது RO குடிநீர் ஃபில்டரை தேர்வு செய்ய முக்கிய விவரங்களை ஒப்பிட்டுப் பாருங்கள்.'
                : 'Compare key specifications, appliance capacities, backup hours, and warranty terms to find the perfect match for your household.'}
            </p>
          </div>

          {/* Category Toggle Tabs */}
          <div className="bg-[#f5f7f4] border border-[#d9e1da] p-1.5 rounded-xl flex items-center gap-1 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveCategory('inverters')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'inverters'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#dcff73]" />
              <span>{lang === 'ta' ? 'இன்வெர்ட்டர் & பேட்டரி' : 'Inverters & Batteries'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('ro')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'ro'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>{lang === 'ta' ? 'RO வாட்டர் பியூரிஃபையர்' : 'RO Water Purifiers'}</span>
            </button>
          </div>
        </div>

        {/* Comparison Table Container */}
        <div className="border border-[#d9e1da] rounded-2xl overflow-x-auto bg-white shadow-xs">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-[#dce4de] bg-[#f9fbf8]">
                <th className="p-5 text-xs font-bold text-[#526460] uppercase tracking-wider w-[240px]">
                  {lang === 'ta' ? 'அம்சங்கள் & விவரங்கள்' : 'Specifications & Details'}
                </th>
                {columns.map((col, idx) => (
                  <th key={idx} className="p-5 align-top min-w-[200px]">
                    {col.badge && (
                      <span className="text-[11px] font-bold text-[#102b2a] bg-[#dcff73] px-2.5 py-0.5 rounded-md inline-block mb-2">
                        {lang === 'ta' ? col.tamilBadge : col.badge}
                      </span>
                    )}
                    <h3 className="text-base font-black text-[#102b2a] mb-1">
                      {lang === 'ta' ? col.tamilName : col.name}
                    </h3>
                    <div className="text-xs font-mono text-[#507d38] font-bold mb-2">
                      {col.capacity}
                    </div>
                    <div className="text-lg font-black text-[#102b2a] font-mono tabular-nums mb-3">
                      {col.price} <span className="text-xs font-normal text-[#526460]">Starting</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(col.enquiryTag)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#102b2a] hover:bg-[#1a4442] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
                    >
                      <span>{lang === 'ta' ? 'தேர்வு செய்க' : 'Choose Model'}</span>
                      <ArrowRight className="w-3 h-3 text-[#dcff73]" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2ec] text-xs sm:text-sm">
              {specs.map((row, rIdx) => (
                <tr 
                  key={rIdx} 
                  className={`transition-colors hover:bg-[#f5f7f4]/60 ${row.highlight ? 'bg-[#fcfdfa]' : ''}`}
                >
                  <td className="p-4 font-bold text-[#102b2a] bg-[#f9fbf8]/50 border-r border-[#eef2ec]">
                    <span>{lang === 'ta' ? row.tamilLabel : row.label}</span>
                  </td>
                  {row.values.map((val, vIdx) => {
                    const displayVal = lang === 'ta' && row.tamilValues ? row.tamilValues[vIdx] : val;
                    const isYes = displayVal === 'Yes' || displayVal === 'Included' || displayVal === 'உண்டு';
                    const isNo = displayVal === 'No';

                    return (
                      <td key={vIdx} className="p-4 text-[#37474f] font-medium">
                        {isYes ? (
                          <div className="flex items-center gap-1.5 text-[#507d38] font-bold">
                            <Check className="w-4 h-4" />
                            <span>{displayVal}</span>
                          </div>
                        ) : isNo ? (
                          <div className="flex items-center gap-1.5 text-[#97aaa1]">
                            <Minus className="w-4 h-4" />
                            <span>{displayVal}</span>
                          </div>
                        ) : (
                          <span>{displayVal}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison Footnote */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526460]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#507d38] shrink-0" />
            <span>
              {lang === 'ta'
                ? 'அனைத்து தயாரிப்புகளும் முழுமையான அதிகாரப்பூர்வ பிராண்ட் உத்தரவாதத்துடன் மலாங் ரோடு கடையில் கிடைக்கும்.'
                : 'All products are available with official manufacturer warranty and installation across Vaniyambadi.'}
            </span>
          </div>

          <a
            href="tel:+919150051486"
            className="font-bold text-[#102b2a] hover:underline"
          >
            {lang === 'ta' ? 'சந்தேகம் உள்ளதா? அழைக்க: 91500 51486' : 'Need help deciding? Call an expert: 91500 51486'} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
