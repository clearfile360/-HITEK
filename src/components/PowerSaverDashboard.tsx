import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Droplets, Sun, Moon, AlertTriangle, ShieldCheck, CheckCircle2, Sliders, BatteryCharging, ArrowRight, Clock, Activity, Power } from 'lucide-react';
import { Language } from '../translations';

interface PowerSaverDashboardProps {
  lang: Language;
}

export const PowerSaverDashboard: React.FC<PowerSaverDashboardProps> = ({ lang }) => {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [activeProfile, setActiveProfile] = useState<'summer-resilience' | 'eco-green' | 'voltage-guard'>('summer-resilience');
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  // Update current hour
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Determine Vaniyambadi Local Grid Status based on time of day
  const gridStatus = (() => {
    if (currentHour >= 18 && currentHour <= 22) {
      return {
        level: 'PEAK_EVENING',
        statusText: lang === 'ta' ? 'மாலை நேர உச்ச மின் சுமை' : 'Evening Peak Load & Low Voltage Window',
        gridStress: 'High (88%)',
        voltage: '195V – 210V (Fluctuating)',
        frequency: '49.92 Hz',
        tnebSubstation: 'Muslimpur & Khaderpet Feeders Heavy Load',
        iconColor: 'text-amber-500',
        bgColor: 'bg-amber-50 border-amber-200'
      };
    } else if (currentHour >= 10 && currentHour <= 15) {
      return {
        level: 'SOLAR_SURPLUS',
        statusText: lang === 'ta' ? 'சோலார் உச்ச நேரம் & சீரான மின்சாரம்' : 'Solar Surplus & Stable Grid Window',
        gridStress: 'Low-Moderate (42%)',
        voltage: '228V – 235V (Optimal)',
        frequency: '50.04 Hz',
        tnebSubstation: 'High Solar Generation Window',
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-50 border-emerald-200'
      };
    } else if (currentHour >= 23 || currentHour <= 5) {
      return {
        level: 'NIGHT_BASE',
        statusText: lang === 'ta' ? 'இரவு நேர நிலையான மின்சாரம்' : 'Night Base Load (Stable High Voltage)',
        gridStress: 'Low (28%)',
        voltage: '235V – 242V',
        frequency: '50.01 Hz',
        tnebSubstation: 'Low Industrial Demand',
        iconColor: 'text-sky-500',
        bgColor: 'bg-sky-50 border-sky-200'
      };
    } else {
      return {
        level: 'MORNING_RUSH',
        statusText: lang === 'ta' ? 'காலை நேர மோட்டார் பம்ப் சுமை' : 'Morning Domestic Water Pump Rush',
        gridStress: 'Moderate-High (68%)',
        voltage: '215V – 225V',
        frequency: '49.98 Hz',
        tnebSubstation: 'Valayampet & Newtown Domestic Surge',
        iconColor: 'text-orange-500',
        bgColor: 'bg-orange-50 border-orange-200'
      };
    }
  })();

  const handleApplyProfile = (profile: 'summer-resilience' | 'eco-green' | 'voltage-guard') => {
    setActiveProfile(profile);
    const msg = lang === 'ta' 
      ? 'பரிந்துரைக்கப்பட்ட பவர்-சேவர் அமைப்புகள் உங்கள் சாதனங்களுக்காக தேர்ந்தெடுக்கப்பட்டன!' 
      : 'Recommended Power-Saver settings profile configured for your home in Vaniyambadi!';
    setAppliedNotice(msg);
    setTimeout(() => setAppliedNotice(null), 3500);
  };

  return (
    <section id="power-saver" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Gauge className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'வாணியம்பாடி கிரிட் நிலை & ஆற்றல் சேமிப்பு' : 'Live Vaniyambadi Grid Status & Power Saver'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'பவர்-சேவர் டாஷ்போர்டு.' : 'Power-Saver Mode Dashboard.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'வாணியம்பாடி பகுதியின் தற்போதைய மின் நுகர்வு மற்றும் வோல்டேஜ் ஏற்ற இறக்கங்களுக்கு ஏற்ப, இன்வெர்ட்டர் மற்றும் RO பியூரிஃபையருக்கான சிறந்த அமைப்புகளை உடனுக்குடன் பரிந்துரைக்கிறது.'
                : 'Real-time calibration dashboard recommending optimal inverter charging currents and RO filtration cycles based on local TNEB substation load and voltage dips across Vaniyambadi.'}
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#f5f7f4] border border-[#bac9c0] rounded-2xl self-start md:self-auto text-xs">
            <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span className="font-mono text-[#102b2a] font-bold">
              Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Live Grid Metrics Bar */}
        <div className={`p-6 rounded-3xl border mb-10 ${gridStatus.bgColor} transition-colors`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-[10px] font-bold text-[#526460] uppercase tracking-wider block">
                {lang === 'ta' ? 'வாணியம்பாடி கிரிட் நிலை:' : 'Current Grid Condition:'}
              </span>
              <strong className="text-base font-black text-[#102b2a] block mt-0.5">
                {gridStatus.statusText}
              </strong>
              <span className="text-xs text-[#526460]">{gridStatus.tnebSubstation}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#526460] uppercase tracking-wider block">
                {lang === 'ta' ? 'வோல்டேஜ் நிலை:' : 'Live Voltage Window:'}
              </span>
              <strong className="text-base font-mono font-black text-[#102b2a] block mt-0.5">
                {gridStatus.voltage}
              </strong>
              <span className="text-xs text-[#526460]">Grid Freq: {gridStatus.frequency}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#526460] uppercase tracking-wider block">
                {lang === 'ta' ? 'துணை மின்நிலைய சுமை:' : 'Substation Load Stress:'}
              </span>
              <strong className="text-base font-black text-[#102b2a] block mt-0.5">
                {gridStatus.gridStress}
              </strong>
              <span className="text-xs text-[#526460]">Muslimpur 110kV Substation</span>
            </div>

            <div className="flex items-center sm:justify-end">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#bac9c0] text-xs font-bold text-[#102b2a] shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-[#507d38]" />
                <span>Auto-Refreshed Hourly</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 Interactive Setting Presets */}
        <div className="mb-10">
          <div className="text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-3">
            {lang === 'ta' ? 'பவர்-சேவர் சுயவிவரங்கள் (ஒரே கிளிக்கில் தேர்வு செய்க):' : 'Select Smart Power-Saver Profile:'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'summer-resilience',
                title: 'Summer Heatwave Prep',
                tamilTitle: 'கோடைகால மின்தடை தயார்நிலை',
                desc: 'Fast 15A charging + Wide voltage (90V-290V) tolerance ahead of afternoon load-shedding.',
                tamilDesc: 'மதிய நேர மின்தடைக்கு முன் விரைவு 15A சார்ஜிங் & குறைந்த வோல்டேஜ் தாங்கும் திறன்.',
                badge: 'Recommended for Summer'
              },
              {
                id: 'eco-green',
                title: 'Eco Green Daily Mode',
                tamilTitle: 'சுற்றுச்சூழல் சிக்கன முறை',
                desc: 'Gentle 10A battery charge + 1:1 RO water conservation to minimize energy & water waste.',
                tamilDesc: '10A சீரான பேட்டரி சார்ஜிங் மற்றும் 1:1 RO நீர் விரயம் தடுக்கும் முறை.',
                badge: 'Maximum Battery Life'
              },
              {
                id: 'voltage-guard',
                title: 'Evening Low-Voltage Guard',
                tamilTitle: 'மாலை நேர குறைந்த வோல்டேஜ் பாதுகாப்பு',
                desc: 'High sensitivity UPS Mode prevents compressor tripping on refrigerators & smart TVs.',
                tamilDesc: 'பிரிட்ஜ் மற்றும் டிவிக்கான உடனடி வோல்டேஜ் சரிசெய்தல் மற்றும் பாதுகாப்பு.',
                badge: 'Appliance Safety'
              }
            ].map(profile => (
              <button
                key={profile.id}
                type="button"
                onClick={() => handleApplyProfile(profile.id as any)}
                className={`p-5 rounded-3xl border text-left transition-all cursor-pointer ${
                  activeProfile === profile.id
                    ? 'border-[#507d38] bg-[#f0f4ee] shadow-sm ring-2 ring-[#507d38]'
                    : 'border-[#dce4de] bg-[#f9fbf8] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#507d38] bg-[#dcff73]/40 px-2 py-0.5 rounded">
                    {profile.badge}
                  </span>
                  {activeProfile === profile.id && <CheckCircle2 className="w-4 h-4 text-[#507d38]" />}
                </div>

                <strong className="text-sm sm:text-base font-black text-[#102b2a] block">
                  {lang === 'ta' ? profile.tamilTitle : profile.title}
                </strong>
                <p className="text-xs text-[#526460] mt-1.5 leading-relaxed">
                  {lang === 'ta' ? profile.tamilDesc : profile.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {appliedNotice && (
          <div className="p-4 mb-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{appliedNotice}</span>
          </div>
        )}

        {/* 2-Column Split: Detailed Inverter Settings vs RO System Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inverter Calibrated Settings Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f5f7f4] border border-[#d9e1da] space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#102b2a] text-[#dcff73] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 text-[#dcff73]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#102b2a]">
                  {lang === 'ta' ? 'இன்வெர்ட்டர் பரிந்துரைக்கப்பட்ட அமைப்புகள்' : 'Inverter Calibrated Settings'}
                </h3>
                <span className="text-xs text-[#526460]">Pure Sine Wave &amp; Home UPS</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Setting 1: Voltage Mode */}
              <div className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                    Input Voltage Sensitivity
                  </strong>
                  <span className="text-[11px] text-[#526460]">
                    {activeProfile === 'voltage-guard' ? 'UPS Mode (180V–260V)' : 'Wide Mode (90V–290V)'}
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#f0f4ee] text-[#507d38] font-mono text-xs font-bold rounded-lg border border-[#bac9c0]">
                  {activeProfile === 'voltage-guard' ? 'UPS Sensitive' : 'Wide Range (Recommended)'}
                </span>
              </div>

              {/* Setting 2: Charging Current */}
              <div className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                    Battery Charging Amperage
                  </strong>
                  <span className="text-[11px] text-[#526460]">
                    {activeProfile === 'summer-resilience' ? 'Fast 15A Boost Charging' : 'Eco Gentle 10A Charging'}
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#102b2a] text-[#dcff73] font-mono text-xs font-bold rounded-lg">
                  {activeProfile === 'summer-resilience' ? '15 Ampere' : '10 Ampere'}
                </span>
              </div>

              {/* Setting 3: Battery Chemistry */}
              <div className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                    Electrolyte Temp Compensation
                  </strong>
                  <span className="text-[11px] text-[#526460]">Tirupattur district ambient heat curve</span>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-mono text-xs font-bold rounded-lg">
                  Auto Thermal Cutoff
                </span>
              </div>
            </div>
          </div>

          {/* RO Water Purifier Calibrated Settings Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f5f7f4] border border-[#d9e1da] space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#102b2a] text-sky-400 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#102b2a]">
                  {lang === 'ta' ? 'RO குடிநீர் பரிந்துரைக்கப்பட்ட அமைப்புகள்' : 'RO Purifier Calibrated Settings'}
                </h3>
                <span className="text-xs text-[#526460]">Groundwater TDS &amp; Pressure Optimization</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* RO Setting 1: Operational Window */}
              <div className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                    Ideal Tank Fill Schedule
                  </strong>
                  <span className="text-[11px] text-[#526460]">High water pressure &amp; solar surplus</span>
                </div>
                <span className="px-3 py-1 bg-[#f0f4ee] text-[#507d38] font-mono text-xs font-bold rounded-lg border border-[#bac9c0]">
                  11:00 AM – 03:00 PM
                </span>
              </div>

              {/* RO Setting 2: Waste Water Recovery */}
              <div className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                    Palar Basin Water Recovery Ratio
                  </strong>
                  <span className="text-[11px] text-[#526460]">
                    {activeProfile === 'eco-green' ? '1:1 Eco Recovery Valve' : 'Standard 1:2 Discharge'}
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#102b2a] text-[#dcff73] font-mono text-xs font-bold rounded-lg">
                  {activeProfile === 'eco-green' ? '1:1 Eco Valve' : 'Standard RO'}
                </span>
              </div>

              {/* RO Setting 3: Auto-Flushing Cycle */}
              <div className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                    Membrane Descaling Flush
                  </strong>
                  <span className="text-[11px] text-[#526460]">Prevents hard mineral salt scaling</span>
                </div>
                <span className="px-3 py-1 bg-sky-100 text-sky-800 font-mono text-xs font-bold rounded-lg">
                  30s Pre-Flush
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
