import React, { useState } from 'react';
import { Recycle, ShieldAlert, Award, Truck, CheckCircle2, MessageSquare, ArrowRight, Battery, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';
import { Language } from '../translations';

interface EcoExchangeProps {
  lang: Language;
}

export const EcoExchange: React.FC<EcoExchangeProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Muslimpur');
  const [batteryCapacity, setBatteryCapacity] = useState('150Ah Tall Tubular');
  const [condition, setCondition] = useState('Dead & Discharge');
  const [pickupSlot, setPickupSlot] = useState('Morning (10 AM - 1 PM)');
  const [isScheduled, setIsScheduled] = useState(false);

  const scrapRates = [
    {
      type: 'Two-Wheeler / Small UPS',
      tamilType: 'இருசக்கர வாகனம் / சிறிய UPS',
      capacity: '7Ah – 35Ah',
      value: '₹200 – ₹500',
      bonus: 'Instant Cash'
    },
    {
      type: 'Car / Short Tubular Battery',
      tamilType: 'கார் / ஷார்ட் டியூபுலர் பேட்டரி',
      capacity: '60Ah – 100Ah',
      value: '₹1,200 – ₹1,800',
      bonus: 'On-the-spot Weighing'
    },
    {
      type: 'Standard Tall Tubular (Most Common)',
      tamilType: 'டால் டியூபுலர் பேட்டரி (அதிகம் உள்ளது)',
      capacity: '150Ah Tall Tubular',
      value: '₹2,200 – ₹2,800',
      bonus: 'Popular Home Inverter'
    },
    {
      type: 'Jumbo Deep Cycle Heavy Battery',
      tamilType: 'ஜம்போ ஹெவி டியூபுலர் பேட்டரி',
      capacity: '200Ah Jumbo',
      value: '₹3,000 – ₹3,600',
      bonus: 'Highest Scrap Payout'
    }
  ];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Save scheduled pickup to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('hitek_eco_pickups') || '[]');
      const newPickup = {
        id: `pickup-${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        area,
        batteryCapacity,
        condition,
        pickupSlot,
        date: new Date().toISOString()
      };
      localStorage.setItem('hitek_eco_pickups', JSON.stringify([newPickup, ...existing]));
    } catch (err) {
      // Ignore storage write error
    }

    setIsScheduled(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Hitek Solutions!\nI am requesting a FREE Doorstep Battery Scrap Pickup & Recycling in Vaniyambadi:\n- Name: ${name}\n- Phone: ${phone}\n- Area: ${area}\n- Battery: ${batteryCapacity} (${condition})\n- Preferred Slot: ${pickupSlot}\nPlease confirm technician pickup timing and valuation.`
  );

  return (
    <section id="eco-exchange" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Recycle className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'சுற்றுச்சூழல் பாதுகாப்பு & மறுசுழற்சி' : 'Eco-Exchange & Green Recycling'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'பழைய பேட்டரி இலவச பிக்-அப் & மறுசுழற்சி.' : 'Safe Battery Eco-Exchange.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'பழைய லெட்-ஆசிட் பேட்டரிகளில் உள்ள நச்சு அமிலங்கள் பாலாற்றுப் படுகை நிலத்தடி நீரை மாசுபடுத்தாமல் பாதுகாப்போம். உங்கள் பழைய பேட்டரியை உரிய முறையில் மறுசுழற்சி செய்து அதிகபட்ச ஸ்கிராப் விலையைப் பெறுங்கள்.'
                : 'Lead-acid batteries contain toxic lead oxides and corrosive sulfuric acid. Never dump dead batteries in open landfills. Hitek Solutions provides free doorstep pickup and eco-certified recycling with maximum scrap exchange value.'}
            </p>
          </div>

          <div className="bg-[#f0f4ee] border border-[#bac9c0] p-4 rounded-2xl flex items-center gap-3 self-start md:self-auto">
            <Award className="w-6 h-6 text-[#507d38] shrink-0" />
            <div className="text-xs">
              <strong className="text-[#102b2a] block">TNPCB Compliant Recycling</strong>
              <span className="text-[#526460]">98% Lead Closed-Loop Smelted</span>
            </div>
          </div>
        </div>

        {/* 3-Column Educational Danger Awareness Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#fef6f6] border border-red-200">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-red-950 mb-1">
              {lang === 'ta' ? 'நிலத்தடி நீர் நச்சு ஆபத்து' : 'Groundwater Lead Poisoning'}
            </h3>
            <p className="text-xs text-red-800/80 leading-relaxed">
              {lang === 'ta'
                ? 'முறையற்ற முறையில் வீசப்படும் பேட்டரிகள் பாலாற்றுப் படுகை நிலத்தடி நீரில் நச்சு லெட்டை கலக்கச் செய்து குடிநீரை பாழாக்குகிறது.'
                : 'Improperly dumped dead batteries leak corrosive acid and soluble lead into Vaniyambadi soil, permanently poisoning deep borewells.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f0f9f3] border border-emerald-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-emerald-950 mb-1">
              {lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட மறுசுழற்சி' : 'Authorized Clean Smelting'}
            </h3>
            <p className="text-xs text-emerald-800/80 leading-relaxed">
              {lang === 'ta'
                ? 'ஹைடெக் நிறுவனம் பழைய பேட்டரிகளை அரசு அனுமதி பெற்ற ஆலைகளுக்கு அனுப்பி புதிய பேட்டரி தயாரிப்பிற்கு மறுசுழற்சி செய்கிறது.'
                : '100% of collected batteries are neutralized and transferred to government-approved smelters to manufacture new genuine Exide/Amaron units.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#fbfdf7] border border-[#bac9c0]">
            <div className="w-9 h-9 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center font-black mb-3">
              ₹
            </div>
            <h3 className="text-sm font-bold text-[#102b2a] mb-1">
              {lang === 'ta' ? 'அதிகபட்ச ஸ்கிராப் ரொக்க மதிப்பு' : 'Highest Guaranteed Scrap Cash'}
            </h3>
            <p className="text-xs text-[#526460] leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் வீட்டு வாசலிலேயே எடையிட்டு உடனடி ரொக்கம் அல்லது புதிய பேட்டரி வாங்கும் போது தள்ளுபடியாக கழித்துக் கொள்ளலாம்.'
                : 'Get accurate weight-based scrap valuation at your doorstep with instant cash payment or upfront new battery invoice deduction.'}
            </p>
          </div>
        </div>

        {/* 2-Column Split: Scrap Rate Matrix (Left 5 Cols) + Pickup Scheduler (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Scrap Rate Matrix */}
          <div className="lg:col-span-5 bg-[#f5f7f4] border border-[#d9e1da] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-4 h-4 text-[#507d38]" />
              <h3 className="text-base font-black text-[#102b2a]">
                {lang === 'ta' ? 'பழைய பேட்டரி ஸ்கிராப் விலை பட்டியல்' : 'Transparent Scrap Buyback Chart'}
              </h3>
            </div>
            <p className="text-xs text-[#526460] mb-6">
              {lang === 'ta' ? 'வாணியம்பாடி வீடுகளுக்கான நேரடி எக்ஸ்சேஞ்ச் மதிப்பு:' : 'Estimated doorstep buyback value in Vaniyambadi:'}
            </p>

            <div className="space-y-3 mb-6">
              {scrapRates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#dce4de] flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                      {lang === 'ta' ? item.tamilType : item.type}
                    </strong>
                    <span className="text-[11px] text-[#526460] font-mono">{item.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-[#507d38] font-mono tabular-nums block">
                      {item.value}
                    </span>
                    <span className="text-[10px] text-[#526460] font-medium">{item.bonus}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#dce4de] text-xs text-[#37474f] space-y-1">
              <span className="font-bold text-[#102b2a] block">
                {lang === 'ta' ? 'இலவச பிக்-அப் உத்தரவாதம்:' : 'Zero Transportation Fee:'}
              </span>
              <p className="text-[#526460] text-[11px] leading-relaxed">
                {lang === 'ta'
                  ? 'கனமான பேட்டரியை கடைக்கு தூக்கி வர வேண்டாம். எங்கள் வண்டி உங்கள் வீட்டிற்கே வந்து இலவசமாக தூக்கிச் செல்லும்.'
                  : 'Never lift heavy 55kg+ batteries yourself. Our trained technicians arrive with acid-safe trays and transport vehicles.'}
              </p>
            </div>
          </div>

          {/* Schedule Doorstep Pickup Form */}
          <div className="lg:col-span-7 bg-[#f5f7f4] border border-[#d9e1da] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#102b2a] text-[#dcff73] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#102b2a]">
                  {lang === 'ta' ? 'இலவச டோர்ஸ்டெப் பிக்-அப் பதிவு' : 'Schedule Free Doorstep Battery Pickup'}
                </h3>
                <p className="text-xs text-[#526460]">
                  {lang === 'ta' ? 'தேதியை தேர்வு செய்யுங்கள், எங்கள் குழு நேரில் வரும்' : 'Book a convenient pickup slot in Vaniyambadi'}
                </p>
              </div>
            </div>

            {!isScheduled ? (
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eco-name" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'உங்கள் பெயர்' : 'Your Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="eco-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aslam Basha"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="eco-phone" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'வாட்ஸ்அப் எண்' : 'WhatsApp Phone'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="eco-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 91500 51486"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eco-area" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'வாணியம்பாடி பகுதி' : 'Vaniyambadi Area'}
                    </label>
                    <select
                      id="eco-area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    >
                      <option value="Muslimpur">Muslimpur (Malang Road)</option>
                      <option value="Khaderpet">Khaderpet</option>
                      <option value="Newtown">Newtown</option>
                      <option value="Valayampet">Valayampet</option>
                      <option value="Noorullahpet">Noorullahpet</option>
                      <option value="Perumalpet">Perumalpet</option>
                      <option value="Jolarpet / Nearby">Jolarpet / Nearby</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="eco-capacity" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'பேட்டரி மாடல் / திறன்' : 'Battery Capacity'}
                    </label>
                    <select
                      id="eco-capacity"
                      value={batteryCapacity}
                      onChange={(e) => setBatteryCapacity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    >
                      <option value="150Ah Tall Tubular">150Ah Tall Tubular (Exide/Amaron/Luminous)</option>
                      <option value="100Ah Short Tubular">100Ah Short Tubular</option>
                      <option value="200Ah Jumbo Tubular">200Ah Jumbo Tubular</option>
                      <option value="Car Battery (35Ah - 80Ah)">Car Battery (35Ah - 80Ah)</option>
                      <option value="Two-Wheeler Battery">Two-Wheeler / UPS Battery</option>
                      <option value="Multiple Batteries (2+ units)">Multiple Batteries (2+ units)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eco-condition" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'பேட்டரி நிலை' : 'Battery Condition'}
                    </label>
                    <select
                      id="eco-condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    >
                      <option value="Dead & Discharged">Dead / Not holding charge</option>
                      <option value="Leaking Acid or Corroded">Leaking Acid / Heavy Corrosion</option>
                      <option value="Swollen Body">Swollen Container Body</option>
                      <option value="Working but Old">Still working but replacing</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="eco-slot" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'விரும்பும் பிக்-அப் நேரம்' : 'Preferred Pickup Slot'}
                    </label>
                    <select
                      id="eco-slot"
                      value={pickupSlot}
                      onChange={(e) => setPickupSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10:00 AM - 01:00 PM)</option>
                      <option value="Afternoon (2 PM - 5 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (05:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4 text-[#dcff73]" />
                  <span>{lang === 'ta' ? 'இலவச பிக்-அப் முன்பதிவு செய்க' : 'Confirm Free Doorstep Pickup'}</span>
                </button>
              </form>
            ) : (
              /* Success View */
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 rounded-2xl bg-white border-2 border-[#507d38] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h4 className="text-xl font-black text-[#102b2a]">
                    {lang === 'ta' ? 'பிக்-அப் முன்பதிவு பதிவு செய்யப்பட்டது!' : 'Pickup Request Confirmed!'}
                  </h4>

                  <p className="text-xs text-[#526460] leading-relaxed max-w-md mx-auto">
                    {lang === 'ta'
                      ? `வணக்கம் ${name}, உங்கள் ${batteryCapacity} பேட்டரியை பிக்-அப் செய்ய ஹைடெக் குழு ${area} பகுதிக்கு விரைவில் வரும்.`
                      : `Thank you ${name}! Our collection van will arrive in ${area} during the ${pickupSlot} slot.`}
                  </p>

                  <div className="p-3 bg-[#f5f7f4] rounded-xl border border-[#dce4de] text-xs font-mono text-[#507d38] font-bold">
                    Estimated Scrap Cash: ₹2,200 – ₹2,800
                  </div>
                </div>

                {/* Instant WhatsApp Dispatch */}
                <a
                  href={`https://wa.me/919150051486?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-sm rounded-xl transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் பிக்-அப் நிலையை உறுதி செய்ய' : 'Dispatch via WhatsApp to Hitek'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsScheduled(false)}
                  className="w-full py-2 text-xs text-[#526460] hover:text-[#102b2a] font-bold text-center block"
                >
                  {lang === 'ta' ? 'மற்றொரு பேட்டரி சேர்க்க' : 'Schedule Another Battery Pickup'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
