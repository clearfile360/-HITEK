import React, { useState } from 'react';
import { Sun, CloudSun, CloudRain, Zap, TrendingUp, Trees, Building, MapPin, ArrowRight, MessageSquare, Compass, Info } from 'lucide-react';
import { Language } from '../translations';

interface LocalSolarPotentialProps {
  lang: Language;
}

type WeatherCondition = 'sunny' | 'summer' | 'cloudy' | 'rainy';

export const LocalSolarPotential: React.FC<LocalSolarPotentialProps> = ({ lang }) => {
  const [systemCapacityKw, setSystemCapacityKw] = useState<number>(3); // 3 kW default
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('sunny');

  // Vaniyambadi solar climate parameters (Tirupattur district, Tamil Nadu)
  const weatherFactors: Record<WeatherCondition, { name: string; tamilName: string; factor: number; sunHours: number; desc: string; tamilDesc: string }> = {
    sunny: {
      name: 'Normal Sunny Day',
      tamilName: 'வழக்கமான வெயில் நாள்',
      factor: 4.8, // Units (kWh) per kW per day
      sunHours: 5.4,
      desc: '300+ days typical Vaniyambadi weather with clear bright skies',
      tamilDesc: 'வாணியம்பாடியில் ஆண்டுக்கு 300 நாட்களுக்கு மேல் இருக்கும் வழக்கமான வெயில்'
    },
    summer: {
      name: 'Peak Summer (Mar–Jun)',
      tamilName: 'கோடைக்காலம் (மார்ச்–ஜூன்)',
      factor: 5.6,
      sunHours: 6.2,
      desc: 'High ambient temperature & maximum daily solar irradiance',
      tamilDesc: 'அதிக வெயில் மற்றும் மிக உயர்ந்த மின் உற்பத்தி திறன்'
    },
    cloudy: {
      name: 'Partly Cloudy Sky',
      tamilName: 'மேகமூட்டமான வானிலை',
      factor: 3.5,
      sunHours: 4.0,
      desc: 'Diffused sunlight with passing cloud cover',
      tamilDesc: 'பரவலான சூரிய ஒளி மற்றும் மேகங்கள் சூழ்ந்த நிலை'
    },
    rainy: {
      name: 'Monsoon Overcast',
      tamilName: 'பருவமழை / கனமழை நாள்',
      factor: 2.2,
      sunHours: 2.5,
      desc: 'Monsoon showers in Palar basin with lower generation',
      tamilDesc: 'பருவமழை காலங்களில் குறைந்தபட்ச மின் உற்பத்தி'
    }
  };

  const currentCondition = weatherFactors[weatherCondition];

  // Daily units (kWh) = Capacity (kW) * Weather factor
  const dailyUnits = Number((systemCapacityKw * currentCondition.factor).toFixed(1));
  const monthlyUnits = Math.round(dailyUnits * 30);
  const annualUnits = Math.round(dailyUnits * 365);

  // TANGEDCO power tariff saving estimate (~₹7.20/unit average domestic slab)
  const monthlySavingsRs = Math.round(monthlyUnits * 7.2);
  const annualSavingsRs = Math.round(annualUnits * 7.2);
  const lifetimeSavingsRs = Math.round(annualSavingsRs * 25);

  // Environmental impact
  const treesEquivalent = Math.round(annualUnits * 0.04); // ~0.04 trees per kWh generated
  const roofAreaSqFt = systemCapacityKw * 75; // ~75 sq ft per kW

  // Hour-by-hour solar curve generation (6 AM to 6 PM)
  const hourlyOutput = [
    { hour: '6 AM', intensity: 0.05 },
    { hour: '7 AM', intensity: 0.20 },
    { hour: '8 AM', intensity: 0.45 },
    { hour: '9 AM', intensity: 0.70 },
    { hour: '10 AM', intensity: 0.88 },
    { hour: '11 AM', intensity: 0.98 },
    { hour: '12 PM', intensity: 1.00 },
    { hour: '1 PM', intensity: 0.96 },
    { hour: '2 PM', intensity: 0.85 },
    { hour: '3 PM', intensity: 0.65 },
    { hour: '4 PM', intensity: 0.40 },
    { hour: '5 PM', intensity: 0.15 },
    { hour: '6 PM', intensity: 0.02 }
  ];

  return (
    <section id="solar-potential" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Sun className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'வாணியம்பாடி சூரிய மின் உற்பத்தி கால்குலேட்டர்' : 'Regional Solar Irradiance Simulator'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'சூரிய மின் உற்பத்தி கணிப்பு.' : 'Local Solar Potential.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {lang === 'ta'
                ? 'வாணியம்பாடி வானிலை மற்றும் சூரிய கதிர்வீச்சு தரவுகளைக் கொண்டு, உங்கள் வீட்டு மொட்டை மாடியில் பொருத்தப்படும் சோலார் பேனல்கள் தினசரி எவ்வளவு யூனிட் மின்சாரம் உற்பத்தி செய்யும் என்பதைக் கண்டறியுங்கள்.'
                : 'Simulate realistic daily and monthly solar energy yield based on Vaniyambadi geographic coordinates (12.68° N, 78.61° E) and seasonal weather patterns.'}
            </p>
          </div>

          {/* Regional Geo Badge */}
          <div className="bg-white border border-[#bac9c0] px-4 py-3 rounded-2xl flex items-center gap-3 self-start md:self-auto shadow-2xs">
            <MapPin className="w-4 h-4 text-[#507d38] shrink-0" />
            <div className="text-xs">
              <strong className="text-[#102b2a] block">Vaniyambadi, Tirupattur Dt.</strong>
              <span className="text-[#526460]">Avg. 5.4 Peak Sun Hours / Day</span>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white rounded-3xl border border-[#d9e1da] p-6 sm:p-8 shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* System Size Selector (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#102b2a]">
                  {lang === 'ta' ? 'சோலார் பேனல் திறன் (kW):' : 'Rooftop Solar System Capacity (kW):'}
                </label>
                <span className="text-base font-black text-[#507d38] font-mono">
                  {systemCapacityKw} kW System
                </span>
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[1, 2, 3, 5, 10].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSystemCapacityKw(kw)}
                    className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                      systemCapacityKw === kw
                        ? 'bg-[#102b2a] text-white border-[#102b2a] shadow-xs'
                        : 'bg-[#f5f7f4] text-[#526460] border-[#dce4de] hover:bg-[#e8eee5]'
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-[#526460]">
                <span>Requires ~{roofAreaSqFt} sq.ft shadow-free rooftop</span>
                <span>{systemCapacityKw <= 2 ? 'Small Home' : systemCapacityKw <= 3 ? 'Standard 2–3 BHK' : 'Villa / Commercial'}</span>
              </div>
            </div>

            {/* Weather / Season Selector (5 Cols) */}
            <div className="lg:col-span-5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#102b2a] block mb-3">
                {lang === 'ta' ? 'வானிலை / பருவ நிலை:' : 'Seasonal Weather Simulation:'}
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWeatherCondition('sunny')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    weatherCondition === 'sunny'
                      ? 'border-[#507d38] bg-[#f0f4ee] text-[#102b2a] ring-1 ring-[#507d38]'
                      : 'border-[#dce4de] bg-[#f5f7f4] text-[#526460] hover:bg-[#e8eee5]'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{lang === 'ta' ? 'வெயில் நாள்' : 'Sunny Day'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWeatherCondition('summer')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    weatherCondition === 'summer'
                      ? 'border-[#507d38] bg-[#f0f4ee] text-[#102b2a] ring-1 ring-[#507d38]'
                      : 'border-[#dce4de] bg-[#f5f7f4] text-[#526460] hover:bg-[#e8eee5]'
                  }`}
                >
                  <Sun className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{lang === 'ta' ? 'கோடை காலம்' : 'Peak Summer'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWeatherCondition('cloudy')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    weatherCondition === 'cloudy'
                      ? 'border-[#507d38] bg-[#f0f4ee] text-[#102b2a] ring-1 ring-[#507d38]'
                      : 'border-[#dce4de] bg-[#f5f7f4] text-[#526460] hover:bg-[#e8eee5]'
                  }`}
                >
                  <CloudSun className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{lang === 'ta' ? 'மேகமூட்டம்' : 'Partly Cloudy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWeatherCondition('rainy')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    weatherCondition === 'rainy'
                      ? 'border-[#507d38] bg-[#f0f4ee] text-[#102b2a] ring-1 ring-[#507d38]'
                      : 'border-[#dce4de] bg-[#f5f7f4] text-[#526460] hover:bg-[#e8eee5]'
                  }`}
                >
                  <CloudRain className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{lang === 'ta' ? 'பருவமழை' : 'Monsoon Rain'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Daily Generation */}
          <div className="bg-white p-5 rounded-2xl border border-[#d9e1da] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider">
                {lang === 'ta' ? 'தினசரி உற்பத்தி' : 'Daily Output'}
              </span>
              <Zap className="w-4 h-4 text-[#507d38]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#102b2a] font-mono tabular-nums">
              {dailyUnits} <span className="text-xs font-normal text-[#526460]">Units / Day</span>
            </div>
            <span className="text-[11px] text-[#526460] mt-1 block">
              {monthlyUnits} kWh per month
            </span>
          </div>

          {/* Monthly Bill Savings */}
          <div className="bg-white p-5 rounded-2xl border border-[#d9e1da] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider">
                {lang === 'ta' ? 'மாதாந்திர சேமிப்பு' : 'Monthly Savings'}
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#507d38] font-mono tabular-nums">
              ₹{monthlySavingsRs.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-[#526460] mt-1 block">
              TANGEDCO power bill reduction
            </span>
          </div>

          {/* 25-Year Cumulative Savings */}
          <div className="bg-white p-5 rounded-2xl border border-[#d9e1da] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider">
                {lang === 'ta' ? '25 ஆண்டு மொத்த சேமிப்பு' : '25-Yr Lifetime Value'}
              </span>
              <Building className="w-4 h-4 text-[#102b2a]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#102b2a] font-mono tabular-nums">
              ₹{(lifetimeSavingsRs / 100000).toFixed(1)} Lakhs
            </div>
            <span className="text-[11px] text-[#526460] mt-1 block">
              Long-term clean asset
            </span>
          </div>

          {/* Carbon Offset */}
          <div className="bg-white p-5 rounded-2xl border border-[#d9e1da] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider">
                {lang === 'ta' ? 'சுற்றுச்சூழல் பலன்' : 'Eco Impact'}
              </span>
              <Trees className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono tabular-nums">
              ~{treesEquivalent} Trees
            </div>
            <span className="text-[11px] text-[#526460] mt-1 block">
              CO2 absorption equivalent / yr
            </span>
          </div>
        </div>

        {/* Visual Hour-by-Hour Solar Generation Curve */}
        <div className="bg-white rounded-3xl border border-[#d9e1da] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-black text-[#102b2a] flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>
                  {lang === 'ta' ? 'காலை 6 மணி முதல் மாலை 6 மணி வரையிலான மின் உற்பத்தி வளைவு' : 'Hourly Solar Generation Curve (Vaniyambadi Direct Sun Exposure)'}
                </span>
              </h3>
              <p className="text-xs text-[#526460] mt-0.5">
                {lang === 'ta' ? currentCondition.tamilDesc : currentCondition.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#507d38] bg-[#f0f4ee] px-3 py-1.5 rounded-lg self-start sm:self-auto">
              <span>Peak: ~{Math.round(systemCapacityKw * 1000 * 0.85 * (currentCondition.factor / 4.8))} Watts</span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-44 sm:h-52 w-full flex items-end justify-between gap-1.5 sm:gap-3 pt-6 border-b border-[#dce4de] pb-2">
            {hourlyOutput.map((item, idx) => {
              const adjustedHeight = Math.round(item.intensity * (currentCondition.factor / 5.6) * 100);
              const barHeightPct = Math.max(adjustedHeight, 4);
              const estWatts = Math.round(systemCapacityKw * 1000 * 0.85 * (item.intensity * (currentCondition.factor / 5.6)));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#102b2a] text-white text-[10px] font-mono py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                    {item.hour}: {estWatts}W
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${barHeightPct}%` }}
                    className="w-full bg-[#102b2a] group-hover:bg-[#507d38] rounded-t-md transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="w-full h-full bg-linear-to-t from-transparent to-[#dcff73]/40" />
                  </div>

                  {/* Hour Label */}
                  <span className="text-[10px] text-[#526460] font-mono mt-2 transform -rotate-45 sm:rotate-0 origin-center truncate">
                    {item.hour}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Strip */}
        <div className="p-6 rounded-3xl bg-[#102b2a] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-black text-white">
              {lang === 'ta' ? 'உங்கள் வீட்டிற்கு இலவச சோலார் நிழல் ஆய்வு வேண்டுமா?' : 'Want a Free Rooftop Solar Shadow & Feasibility Survey?'}
            </h4>
            <p className="text-xs text-[#bbceca]">
              {lang === 'ta'
                ? 'ஹைடெக் சோலார் இன்ஜினியர்கள் உங்கள் மொட்டை மாடியை நேரில் பார்வையிட்டு சரியான மதிப்பீடு வழங்குகின்றனர்.'
                : 'Our engineers in Vaniyambadi will inspect your roof angle, shadow profile, and provide a government-subsidy estimate.'}
            </p>
          </div>

          <a
            href={`https://wa.me/919150051486?text=${encodeURIComponent(
              `Hello Hitek Solutions!\nI simulated a ${systemCapacityKw} kW rooftop solar system for my home in Vaniyambadi on your website.\n- Estimated Output: ${dailyUnits} Units/Day\n- Monthly Bill Saving: ₹${monthlySavingsRs}\nPlease schedule a free rooftop shadow inspection.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் இலவச ஆய்வு புக் செய்ய' : 'Book Free Solar Roof Survey'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
