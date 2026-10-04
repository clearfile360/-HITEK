import React, { useState, useMemo } from 'react';
import { Battery, Zap, Clock, ShieldCheck, CheckCircle2, RotateCcw, MessageSquare, ArrowRight, Info, AlertTriangle, Sparkles, Sliders } from 'lucide-react';
import { Language } from '../translations';

interface BatteryCapacityEstimatorProps {
  lang: Language;
}

interface ApplianceItem {
  id: string;
  name: string;
  tamilName: string;
  watts: number;
  count: number;
  max: number;
  category: 'cooling' | 'lighting' | 'electronics' | 'kitchen';
}

export const BatteryCapacityEstimator: React.FC<BatteryCapacityEstimatorProps> = ({ lang }) => {
  const [appliances, setAppliances] = useState<ApplianceItem[]>([
    { id: 'fans', name: 'Ceiling Fans', tamilName: 'மின் விசிறி', watts: 75, count: 2, max: 6, category: 'cooling' },
    { id: 'lights', name: 'LED Tube / Bulbs', tamilName: 'LED விளக்குகள்', watts: 15, count: 4, max: 10, category: 'lighting' },
    { id: 'fridge', name: 'Inverter Refrigerator', tamilName: 'பிரிட்ஜ் (இன்வெர்ட்டர்)', watts: 180, count: 1, max: 2, category: 'kitchen' },
    { id: 'tv', name: 'Smart TV (43"–55")', tamilName: 'ஸ்மார்ட் டிவி', watts: 95, count: 1, max: 3, category: 'electronics' },
    { id: 'wifi', name: 'Wi-Fi Router & Setup', tamilName: 'வைஃபை ரூட்டர்', watts: 20, count: 1, max: 4, category: 'electronics' },
    { id: 'laptop', name: 'Laptop / Mobile Chargers', tamilName: 'லேப்டாப் / சார்ஜர்', watts: 65, count: 1, max: 4, category: 'electronics' },
    { id: 'mixer', name: 'Mixer Grinder (Short Surge)', tamilName: 'மிக்ஸி கிரைண்டர்', watts: 450, count: 0, max: 1, category: 'kitchen' }
  ]);

  const [desiredHours, setDesiredHours] = useState<number>(4);
  const [batteryType, setBatteryType] = useState<'tall-tubular' | 'short-tubular' | 'lithium'>('tall-tubular');

  const updateCount = (id: string, delta: number) => {
    setAppliances(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextCount = Math.max(0, Math.min(item.max, item.count + delta));
          return { ...item, count: nextCount };
        }
        return item;
      })
    );
  };

  const resetAll = () => {
    setAppliances([
      { id: 'fans', name: 'Ceiling Fans', tamilName: 'மின் விசிறி', watts: 75, count: 2, max: 6, category: 'cooling' },
      { id: 'lights', name: 'LED Tube / Bulbs', tamilName: 'LED விளக்குகள்', watts: 15, count: 4, max: 10, category: 'lighting' },
      { id: 'fridge', name: 'Inverter Refrigerator', tamilName: 'பிரிட்ஜ் (இன்வெர்ட்டர்)', watts: 180, count: 1, max: 2, category: 'kitchen' },
      { id: 'tv', name: 'Smart TV (43"–55")', tamilName: 'ஸ்மார்ட் டிவி', watts: 95, count: 1, max: 3, category: 'electronics' },
      { id: 'wifi', name: 'Wi-Fi Router & Setup', tamilName: 'வைஃபை ரூட்டர்', watts: 20, count: 1, max: 4, category: 'electronics' },
      { id: 'laptop', name: 'Laptop / Mobile Chargers', tamilName: 'லேப்டாப் / சார்ஜர்', watts: 65, count: 1, max: 4, category: 'electronics' },
      { id: 'mixer', name: 'Mixer Grinder (Short Surge)', tamilName: 'மிக்ஸி கிரைண்டர்', watts: 450, count: 0, max: 1, category: 'kitchen' }
    ]);
    setDesiredHours(4);
    setBatteryType('tall-tubular');
  };

  // Calculations
  const totalWatts = useMemo(() => {
    return appliances.reduce((sum, item) => sum + item.count * item.watts, 0);
  }, [appliances]);

  // Recommended Inverter VA = (Total Watts / 0.8 power factor) * 1.25 safety margin
  const recommendedInverter = useMemo(() => {
    if (totalWatts === 0) return { va: 700, label: '700 VA Pure Sine Wave' };
    const rawVA = (totalWatts / 0.8) * 1.25;

    if (rawVA <= 750) return { va: 750, label: '750 VA (12V Pure Sine Wave)' };
    if (rawVA <= 950) return { va: 900, label: '900 VA (12V Pure Sine Wave)' };
    if (rawVA <= 1250) return { va: 1150, label: '1150 VA (12V Heavy Duty)' };
    if (rawVA <= 1650) return { va: 1500, label: '1500 VA (12V/24V)' };
    if (rawVA <= 2200) return { va: 2000, label: '2000 VA (24V Double Battery)' };
    return { va: 3500, label: '3500 VA (36V/48V Multi-Battery System)' };
  }, [totalWatts]);

  // Depth of Discharge (DoD) & Inverter Efficiency Factor
  const batterySpecs = useMemo(() => {
    if (batteryType === 'tall-tubular') {
      return {
        dod: 0.75, // 75% safe discharge
        efficiency: 0.85,
        lifespan: '5 – 6 Years',
        waterInterval: '60 – 75 Days',
        idealFor: 'Vaniyambadi summer climate (handles high ambient heat)'
      };
    } else if (batteryType === 'short-tubular') {
      return {
        dod: 0.65, // 65% safe discharge
        efficiency: 0.82,
        lifespan: '3 – 4 Years',
        waterInterval: '45 Days',
        idealFor: 'Compact urban homes with space restrictions'
      };
    } else {
      return {
        dod: 0.92, // 92% deep discharge
        efficiency: 0.95,
        lifespan: '10+ Years',
        waterInterval: 'Zero Maintenance (Sealed LiFePO4)',
        idealFor: 'Modern maintenance-free fast charging setup'
      };
    }
  }, [batteryType]);

  // Required Ah Calculation:
  // Total Energy Needed = Total Watts * Hours
  // Usable Wh per 12V Ah = 12 * DoD * Efficiency
  // Ah needed = Total Energy / Usable Wh per Ah
  const calculationResult = useMemo(() => {
    const energyNeededWh = totalWatts * desiredHours;
    const usableWhPerAh = 12 * batterySpecs.dod * batterySpecs.efficiency;
    const rawAh = energyNeededWh / usableWhPerAh;

    let standardAh = 150;
    let batteryCount = 1;
    let recommendationText = '150 Ah Tall Tubular';

    if (rawAh <= 110) {
      standardAh = 100;
      recommendationText = '100 Ah Standard Tubular';
    } else if (rawAh <= 160) {
      standardAh = 150;
      recommendationText = '150 Ah Tall Tubular (Most Recommended)';
    } else if (rawAh <= 195) {
      standardAh = 180;
      recommendationText = '180 Ah Extended Backup Tubular';
    } else if (rawAh <= 230) {
      standardAh = 200;
      recommendationText = '200 Ah Jumbo Tubular';
    } else if (rawAh <= 260) {
      standardAh = 220;
      recommendationText = '220 Ah Heavy Duty Tubular';
    } else {
      standardAh = 300;
      batteryCount = 2;
      recommendationText = '2x 150 Ah (300 Ah Total 24V System)';
    }

    return {
      rawAh: Math.round(rawAh),
      standardAh,
      batteryCount,
      recommendationText,
      energyNeededWh: Math.round(energyNeededWh)
    };
  }, [totalWatts, desiredHours, batterySpecs]);

  const activeAppliancesSummary = appliances
    .filter(a => a.count > 0)
    .map(a => `${a.count}x ${lang === 'ta' ? a.tamilName : a.name}`)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Hello Hitek Solutions Malang Road!\nI used your Battery Capacity Estimator for my home in Vaniyambadi:\n- Total Running Load: ${totalWatts} Watts (${activeAppliancesSummary})\n- Desired Backup: ${desiredHours} Hours\n- Recommended Inverter: ${recommendedInverter.label}\n- Recommended Battery: ${calculationResult.recommendationText} (${batteryType.toUpperCase()})\nPlease provide model availability and quotation.`
  );

  return (
    <section id="battery-estimator" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Battery className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'துல்லியமான பேட்டரி திறன் கணிப்பான்' : 'Precision Battery AH & Sizing Estimator'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'வீட்டு பேட்டரி AH கணிப்பான்.' : 'Battery Capacity Estimator.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் வீட்டில் இயங்கும் மின்விசிறிகள், விளக்குகள் மற்றும் பிரிட்ஜ் தேவைகளுக்கு ஏற்ற சரியான இன்வெர்ட்டர் VA மற்றும் பேட்டரி AH அளவை அறிவியல் முறைப்படி கணக்கிடுங்கள்.'
                : 'Determine the exact inverter VA and battery Ah rating needed to run your fans, lights, and refrigerator smoothly during Vaniyambadi power cuts without overloading.'}
            </p>
          </div>

          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#526460] bg-white border border-[#bac9c0] rounded-xl hover:bg-[#e8eee5] transition-colors cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'மீட்டமைக்க' : 'Reset Defaults'}</span>
          </button>
        </div>

        {/* 2-Column Grid: Load Adjuster (7 Cols) + Scientific Sizing Matrix (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Appliance Adjustments & Duration */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#d9e1da] p-6 sm:p-8 shadow-xs space-y-8">
            {/* Step 1: Select Appliances */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-black text-[#102b2a]">
                  {lang === 'ta' ? '1. மின் உபகரணங்களின் எண்ணிக்கையை தேர்வு செய்யவும்' : '1. Configure Household Electrical Load'}
                </h3>
                <span className="text-xs font-mono font-bold text-[#507d38] bg-[#dcff73]/40 px-2.5 py-1 rounded-lg">
                  Total: {totalWatts} W
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appliances.map(app => (
                  <div
                    key={app.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      app.count > 0 ? 'border-[#507d38] bg-[#f9fbf8]' : 'border-[#e2e8e0] bg-[#fafafa]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-xs sm:text-sm font-bold text-[#102b2a]">
                        {lang === 'ta' ? app.tamilName : app.name}
                      </strong>
                      <span className="text-[11px] font-mono text-[#526460]">{app.watts}W each</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-[#526460]">
                        {app.count > 0 ? `${app.count * app.watts} Watts` : 'Off'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateCount(app.id, -1)}
                          disabled={app.count === 0}
                          className="w-7 h-7 rounded-lg border border-[#bac9c0] bg-white flex items-center justify-center text-xs font-bold hover:bg-[#e8eee5] disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label={`Decrease ${app.name}`}
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-mono font-bold text-[#102b2a]">
                          {app.count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCount(app.id, 1)}
                          disabled={app.count >= app.max}
                          className="w-7 h-7 rounded-lg border border-[#bac9c0] bg-white flex items-center justify-center text-xs font-bold hover:bg-[#e8eee5] disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label={`Increase ${app.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Desired Backup Runtime Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#102b2a]">
                  {lang === 'ta' ? '2. மின்தடை காப்பு நேரம் (மணிநேரம்)' : '2. Desired Continuous Power Cut Backup (Hours)'}
                </h3>
                <span className="text-sm font-mono font-bold text-[#102b2a] bg-[#dcff73] px-3 py-0.5 rounded-lg">
                  {desiredHours} Hours
                </span>
              </div>

              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={desiredHours}
                onChange={(e) => setDesiredHours(Number(e.target.value))}
                className="w-full accent-[#507d38] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-mono text-[#526460] mt-1">
                <span>2 Hrs (Short cut)</span>
                <span>4–6 Hrs (Standard)</span>
                <span>8–10 Hrs (Overnight)</span>
              </div>
            </div>

            {/* Step 3: Battery Chemistry Selection */}
            <div>
              <h3 className="text-sm font-bold text-[#102b2a] mb-2">
                {lang === 'ta' ? '3. பேட்டரி வகை (Chemistry):' : '3. Battery Technology Type:'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'tall-tubular',
                    title: 'Tall Tubular C10',
                    tamilTitle: 'டால் டியூபுலர் C10',
                    desc: '75% DoD · 5-6 Yrs · Best for Vaniyambadi'
                  },
                  {
                    id: 'short-tubular',
                    title: 'Short Tubular C20',
                    tamilTitle: 'ஷார்ட் டியூபுலர் C20',
                    desc: '65% DoD · 3-4 Yrs · Compact footprint'
                  },
                  {
                    id: 'lithium',
                    title: 'Lithium LiFePO4',
                    tamilTitle: 'லித்தியம் LiFePO4',
                    desc: '92% DoD · 10 Yrs · Zero Water Top-up'
                  }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setBatteryType(type.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      batteryType === type.id
                        ? 'border-[#507d38] bg-[#f0f4ee] shadow-xs ring-1 ring-[#507d38]'
                        : 'border-[#dce4de] bg-white hover:bg-[#fafafa]'
                    }`}
                  >
                    <strong className="text-xs font-bold text-[#102b2a] block">
                      {lang === 'ta' ? type.tamilTitle : type.title}
                    </strong>
                    <span className="text-[10px] text-[#526460] block mt-1">{type.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Scientific Recommendation Matrix (5 Cols) */}
          <div className="lg:col-span-5 bg-[#102b2a] text-white rounded-3xl border border-[#38504d] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2b4441]">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#dcff73]" />
                <h3 className="font-black text-lg text-white">
                  {lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட அமைப்பு' : 'Recommended Sizing'}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#dcff73] uppercase tracking-wider bg-[#dcff73]/10 px-2 py-0.5 rounded border border-[#dcff73]/20">
                Formula Verified
              </span>
            </div>

            {/* Inverter Capacity Card */}
            <div className="p-4 rounded-2xl bg-[#0a1c1b] border border-[#23423f] space-y-1">
              <span className="text-[11px] uppercase font-bold text-[#8fa8a3] block">
                {lang === 'ta' ? 'இன்வெர்ட்டர் VA அளவு:' : 'Recommended Inverter Capacity:'}
              </span>
              <div className="text-2xl font-black text-[#dcff73] font-mono">
                {recommendedInverter.label}
              </div>
              <p className="text-[11px] text-[#bbceca]">
                Handles {totalWatts}W running load + 25% startup surge headroom for refrigerator compressors.
              </p>
            </div>

            {/* Battery Ah Capacity Card */}
            <div className="p-4 rounded-2xl bg-[#0a1c1b] border border-[#23423f] space-y-1">
              <span className="text-[11px] uppercase font-bold text-[#8fa8a3] block">
                {lang === 'ta' ? 'பேட்டரி AH அளவு (12V):' : 'Recommended Battery Ah Capacity:'}
              </span>
              <div className="text-2xl font-black text-white font-mono flex items-baseline gap-2">
                <span>{calculationResult.standardAh} Ah</span>
                {calculationResult.batteryCount > 1 && (
                  <span className="text-xs text-[#dcff73] font-bold">({calculationResult.batteryCount} Units)</span>
                )}
              </div>
              <p className="text-[11px] text-[#bbceca]">
                Calculated raw need: {calculationResult.rawAh} Ah based on {calculationResult.energyNeededWh} Watt-Hours storage.
              </p>
            </div>

            {/* Vaniyambadi Climate & Care Specs */}
            <div className="p-4 rounded-2xl bg-[#0e2423] border border-[#223936] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8fa8a3]">Expected Battery Lifespan:</span>
                <strong className="text-white font-mono">{batterySpecs.lifespan}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8fa8a3]">Distilled Water Cycle:</span>
                <strong className="text-[#dcff73] font-mono">{batterySpecs.waterInterval}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8fa8a3]">Vaniyambadi Climate Fit:</span>
                <strong className="text-emerald-400">High Heat Resilient</strong>
              </div>
            </div>

            {/* WhatsApp Quote Action */}
            <a
              href={`https://wa.me/919150051486?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-sm rounded-2xl transition-colors shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் விலைப்பட்டியல் பெறுக' : 'Get Price Quote for this Setup'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
