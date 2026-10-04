import React, { useState, useMemo } from 'react';
import { Calculator, Battery, Zap, Clock, ShieldCheck, ArrowRight, Plus, Minus, RotateCcw, TrendingUp, IndianRupee, BarChart3, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface ApplianceConfig {
  id: string;
  name: string;
  watts: number;
  count: number;
  max: number;
}

export const PowerCalculator: React.FC = () => {
  const [appliances, setAppliances] = useState<ApplianceConfig[]>([
    { id: 'fans', name: 'Ceiling Fans', watts: 75, count: 2, max: 8 },
    { id: 'lights', name: 'LED Lights / Bulbs', watts: 15, count: 4, max: 12 },
    { id: 'tv', name: 'Smart TV (43"–55")', watts: 90, count: 1, max: 3 },
    { id: 'wifi', name: 'Wi-Fi Router & Setup', watts: 20, count: 1, max: 4 },
    { id: 'fridge', name: 'Inverter Refrigerator', watts: 180, count: 0, max: 2 },
    { id: 'laptop', name: 'Laptop / PC Charger', watts: 65, count: 1, max: 4 }
  ]);

  const [backupHours, setBackupHours] = useState<number>(4);
  const [chartView, setChartView] = useState<'cumulative' | 'comparison'>('cumulative');

  // Update appliance count
  const updateCount = (id: string, delta: number) => {
    setAppliances(prev =>
      prev.map(app => {
        if (app.id === id) {
          const nextCount = Math.max(0, Math.min(app.max, app.count + delta));
          return { ...app, count: nextCount };
        }
        return app;
      })
    );
  };

  const resetDefaults = () => {
    setAppliances([
      { id: 'fans', name: 'Ceiling Fans', watts: 75, count: 2, max: 8 },
      { id: 'lights', name: 'LED Lights / Bulbs', watts: 15, count: 4, max: 12 },
      { id: 'tv', name: 'Smart TV (43"–55")', watts: 90, count: 1, max: 3 },
      { id: 'wifi', name: 'Wi-Fi Router & Setup', watts: 20, count: 1, max: 4 },
      { id: 'fridge', name: 'Inverter Refrigerator', watts: 180, count: 0, max: 2 },
      { id: 'laptop', name: 'Laptop / PC Charger', watts: 65, count: 1, max: 4 }
    ]);
    setBackupHours(4);
  };

  // Calculations
  const totalWatts = useMemo(() => {
    return appliances.reduce((sum, item) => sum + item.count * item.watts, 0);
  }, [appliances]);

  // Recommended Inverter VA = Total Watts / Power Factor (0.8) with 25% safety margin
  const recommendedVA = useMemo(() => {
    if (totalWatts === 0) return 0;
    const vaNeeded = (totalWatts / 0.8) * 1.2;
    if (vaNeeded <= 700) return 700;
    if (vaNeeded <= 900) return 900;
    if (vaNeeded <= 1150) return 1150;
    if (vaNeeded <= 1500) return 1500;
    if (vaNeeded <= 2000) return 2000;
    return 3500;
  }, [totalWatts]);

  // Battery Ah = (Total Watts * Backup Hours) / (12 Volts * 0.8 efficiency)
  const recommendedAh = useMemo(() => {
    if (totalWatts === 0) return 0;
    const requiredEnergy = totalWatts * backupHours;
    const ahRaw = requiredEnergy / (12 * 0.8);
    if (ahRaw <= 120) return 150; // Standard starter tubular
    if (ahRaw <= 165) return 180;
    if (ahRaw <= 210) return 200;
    if (ahRaw <= 240) return 220;
    return 300; // Double battery setup
  }, [totalWatts, backupHours]);

  // Recharts Financial Projections in INR
  const financialData = useMemo(() => {
    const effectiveWatts = Math.max(totalWatts, 150);
    // Baseline annual cost including grid tariff, appliance voltage damage risk & generator fallback
    const baseAnnualCost = Math.round((effectiveWatts / 1000) * 8 * 365 * 7.5 + 4500);
    // Hitek solar / high efficiency inverter cost (reduces peak grid reliance by ~65-75%)
    const hitekAnnualCost = Math.round(baseAnnualCost * 0.32);
    const annualSavings = baseAnnualCost - hitekAnnualCost;

    return [
      {
        year: 'Year 1',
        standardCost: baseAnnualCost,
        hitekCost: hitekAnnualCost,
        cumulativeSavings: annualSavings,
        annualSavings: annualSavings
      },
      {
        year: 'Year 2',
        standardCost: Math.round(baseAnnualCost * 2.08),
        hitekCost: Math.round(hitekAnnualCost * 2.05),
        cumulativeSavings: Math.round(annualSavings * 2.05 + 1200),
        annualSavings: Math.round(annualSavings * 1.05)
      },
      {
        year: 'Year 3',
        standardCost: Math.round(baseAnnualCost * 3.25),
        hitekCost: Math.round(hitekAnnualCost * 3.12),
        cumulativeSavings: Math.round(annualSavings * 3.15 + 2800),
        annualSavings: Math.round(annualSavings * 1.10)
      },
      {
        year: 'Year 4',
        standardCost: Math.round(baseAnnualCost * 4.50),
        hitekCost: Math.round(hitekAnnualCost * 4.25),
        cumulativeSavings: Math.round(annualSavings * 4.30 + 4900),
        annualSavings: Math.round(annualSavings * 1.15)
      },
      {
        year: 'Year 5',
        standardCost: Math.round(baseAnnualCost * 5.85),
        hitekCost: Math.round(hitekAnnualCost * 5.40),
        cumulativeSavings: Math.round(annualSavings * 5.50 + 7500),
        annualSavings: Math.round(annualSavings * 1.20)
      }
    ];
  }, [totalWatts]);

  const activeApplianceSummary = appliances
    .filter(a => a.count > 0)
    .map(a => `${a.count}x ${a.name}`)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Hello Hitek Solutions!\nI calculated my home backup need on your website:\n- Total Load: ~${totalWatts} Watts (${activeApplianceSummary || 'None selected'})\n- Desired Backup: ${backupHours} hours\n- Recommended: ${recommendedVA}VA Inverter + ${recommendedAh}Ah Tubular Battery\n- 5-Year Projected Savings: ₹${financialData[4].cumulativeSavings.toLocaleString('en-IN')}\nPlease share models, pricing, and installation availability in Vaniyambadi.`
  );

  return (
    <section id="calculator" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#507d38] uppercase block mb-2">
              Smart Power Backup Sizing &amp; Financial ROI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              Inverter &amp; Battery<br />Power Planner.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#526460] bg-white border border-[#bac9c0] rounded-md hover:bg-[#e8eee5] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <p className="text-xs sm:text-sm text-[#526460] max-w-sm">
              Select your appliances to see the ideal inverter capacity and battery size needed for your family.
            </p>
          </div>
        </div>

        {/* Interactive Grid: Load Input (7 Cols) + Sizing Recommendation (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Appliance Selection (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#d9e1da] p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-[#102b2a] mb-1">
              1. What appliances do you want to run?
            </h3>
            <p className="text-xs text-[#526460] mb-6">
              Adjust counts of gadgets you need during power cuts in Vaniyambadi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {appliances.map(app => (
                <div
                  key={app.id}
                  className={`p-4 rounded-xl border transition-all ${
                    app.count > 0
                      ? 'border-[#507d38] bg-[#f9fbf8]'
                      : 'border-[#e2e8e0] bg-[#fafafa]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-[#102b2a]">
                      {app.name}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#507d38] bg-[#dcff73]/40 px-2 py-0.5 rounded">
                      {app.watts}W
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#526460]">
                      {app.count > 0 ? `${app.count * app.watts}W total` : 'Not running'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCount(app.id, -1)}
                        disabled={app.count === 0}
                        className="w-7 h-7 rounded-lg border border-[#bac9c0] bg-white flex items-center justify-center text-[#102b2a] hover:bg-[#e8eee5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label={`Decrease ${app.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-6 text-center text-sm font-bold text-[#102b2a] font-mono">
                        {app.count}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateCount(app.id, 1)}
                        disabled={app.count >= app.max}
                        className="w-7 h-7 rounded-lg border border-[#bac9c0] bg-white flex items-center justify-center text-[#102b2a] hover:bg-[#e8eee5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label={`Increase ${app.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2: Backup Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#102b2a]">
                  2. Desired Continuous Backup Runtime:
                </h3>
                <span className="text-sm font-bold text-[#507d38] bg-[#dcff73]/40 px-2.5 py-0.5 rounded font-mono">
                  {backupHours} Hours
                </span>
              </div>

              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={backupHours}
                onChange={e => setBackupHours(Number(e.target.value))}
                className="w-full accent-[#507d38] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-[#526460] mt-1 font-mono">
                <span>2 Hrs (Basic blackout)</span>
                <span>4–6 Hrs (Standard)</span>
                <span>10 Hrs (Overnight)</span>
              </div>
            </div>
          </div>

          {/* Results & Recommendation Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#102b2a] text-white rounded-2xl border border-[#38504d] p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-[#38504d] mb-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#dcff73]" />
                <h3 className="font-bold text-base text-white">Recommended Setup</h3>
              </div>
              <span className="text-[11px] font-mono text-[#dcff73] uppercase tracking-wider">
                Vaniyambadi Spec
              </span>
            </div>

            {/* Total Load */}
            <div className="mb-6 p-4 rounded-xl bg-[#0e2423] border border-[#2b4441]">
              <span className="text-xs text-[#bbceca] block mb-1">Total Running Load</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {totalWatts}
                </span>
                <span className="text-sm text-[#dcff73] font-bold">Watts</span>
              </div>
              <span className="text-[11px] text-[#bbceca] block mt-1">
                {totalWatts > 0 ? activeApplianceSummary : 'No appliances selected'}
              </span>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#0e2423] border border-[#2b4441]">
                <div className="flex items-center gap-1.5 text-xs text-[#bbceca] mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#dcff73]" />
                  <span>Inverter Size</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#dcff73] tabular-nums">
                  {recommendedVA} VA
                </div>
                <span className="text-[10px] text-[#bbceca] block mt-0.5">
                  Pure Sine Wave UPS
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0e2423] border border-[#2b4441]">
                <div className="flex items-center gap-1.5 text-xs text-[#bbceca] mb-1">
                  <Battery className="w-3.5 h-3.5 text-[#dcff73]" />
                  <span>Battery Ah</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#dcff73] tabular-nums">
                  {recommendedAh >= 300 ? '2x 150Ah' : `${recommendedAh} Ah`}
                </div>
                <span className="text-[10px] text-[#bbceca] block mt-0.5">
                  Tall Tubular Heavy Duty
                </span>
              </div>
            </div>

            {/* Features check */}
            <div className="space-y-2 mb-8 text-xs text-[#bbceca]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dcff73] shrink-0" />
                <span>Exide, Amaron &amp; Luminous genuine warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dcff73] shrink-0" />
                <span>Free doorstep delivery &amp; expert installation in Vaniyambadi</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dcff73] shrink-0" />
                <span>Scrap buyback value deducted for old battery</span>
              </div>
            </div>

            {/* Direct WhatsApp Quote CTA */}
            <a
              href={`https://wa.me/919150051486?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#dcff73] text-[#102b2a] font-black text-sm rounded-xl hover:bg-[#cbe663] transition-colors shadow-md"
            >
              <span>Get WhatsApp Quote for this Setup</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* RECHARTS-BASED VISUAL SAVINGS DASHBOARD */}
        <div className="bg-white rounded-3xl border border-[#d9e1da] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#507d38] uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Projected Financial Return on Investment (INR)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#102b2a] tracking-tight">
                Projected Annual Savings Dashboard
              </h3>
              <p className="text-xs text-[#526460] mt-0.5">
                Estimates cumulative INR savings when switching from unstable grid &amp; inefficient generators to Hitek’s pure sine wave and solar-ready setups.
              </p>
            </div>

            {/* Chart Mode Toggle */}
            <div className="flex items-center gap-2 bg-[#f5f7f4] p-1.5 rounded-xl border border-[#d9e1da] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setChartView('cumulative')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  chartView === 'cumulative'
                    ? 'bg-[#102b2a] text-white shadow-xs'
                    : 'text-[#526460] hover:text-[#102b2a]'
                }`}
              >
                Cumulative Savings (₹)
              </button>

              <button
                type="button"
                onClick={() => setChartView('comparison')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  chartView === 'comparison'
                    ? 'bg-[#102b2a] text-white shadow-xs'
                    : 'text-[#526460] hover:text-[#102b2a]'
                }`}
              >
                Cost Comparison
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-[#f0f4ee] border border-[#bac9c0]">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider block mb-1">
                Year 1 Net Savings
              </span>
              <div className="text-2xl font-black text-[#102b2a] font-mono">
                ₹{financialData[0].annualSavings.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#507d38] font-semibold mt-1 block">
                Immediate power bill &amp; fuel reduction
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#f0f4ee] border border-[#bac9c0]">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider block mb-1">
                5-Year Cumulative Savings
              </span>
              <div className="text-2xl font-black text-[#507d38] font-mono">
                ₹{financialData[4].cumulativeSavings.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#526460] font-semibold mt-1 block">
                Total ROI on energy-efficient setup
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#f0f4ee] border border-[#bac9c0]">
              <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider block mb-1">
                Estimated Payback Period
              </span>
              <div className="text-2xl font-black text-[#102b2a] font-mono">
                ~16 Months
              </div>
              <span className="text-[10px] text-[#526460] font-semibold mt-1 block">
                Covers system cost via electricity savings
              </span>
            </div>
          </div>

          {/* Recharts Visual Container */}
          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === 'cumulative' ? (
                <AreaChart data={financialData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#507d38" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#507d38" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8e0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#526460' }} axisLine={{ stroke: '#d9e1da' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#526460' }}
                    axisLine={{ stroke: '#d9e1da' }}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Cumulative Savings']}
                    contentStyle={{ backgroundColor: '#102b2a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#dcff73', fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeSavings"
                    name="Cumulative Savings (₹)"
                    stroke="#507d38"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#savingsGradient)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={financialData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8e0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#526460' }} axisLine={{ stroke: '#d9e1da' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#526460' }}
                    axisLine={{ stroke: '#d9e1da' }}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `₹${Number(value).toLocaleString('en-IN')}`,
                      name === 'standardCost' ? 'Old Grid / Breakdown Expense' : 'Hitek Optimized Setup'
                    ]}
                    contentStyle={{ backgroundColor: '#102b2a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#dcff73', fontWeight: 'bold' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    formatter={(value) => (value === 'standardCost' ? 'Old Grid & Breakdown Cost' : 'Hitek Optimized Solar / Inverter')}
                  />
                  <Bar dataKey="standardCost" fill="#97aaa1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hitekCost" fill="#507d38" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
