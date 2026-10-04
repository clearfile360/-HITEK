import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Award, CheckCircle2, Droplets, Sun, Battery, ArrowRight, Share2, MessageSquare, X, Sparkles } from 'lucide-react';
import { Language } from '../translations';

interface EventsAndCampsProps {
  lang: Language;
}

interface CommunityEvent {
  id: string;
  category: 'water' | 'solar' | 'battery';
  title: string;
  tamilTitle: string;
  date: string;
  tamilDate: string;
  time: string;
  location: string;
  tamilLocation: string;
  landmark: string;
  description: string;
  tamilDescription: string;
  capacity: string;
  badge: string;
  perks: string[];
  tamilPerks: string[];
  icon: 'water' | 'solar' | 'battery';
}

export const EventsAndCamps: React.FC<EventsAndCampsProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'water' | 'solar' | 'battery'>('all');
  const [registeredEvent, setRegisteredEvent] = useState<CommunityEvent | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeEventForModal, setActiveEventForModal] = useState<CommunityEvent | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Muslimpur');
  const [attendees, setAttendees] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const events: CommunityEvent[] = [
    {
      id: 'event-water-tds',
      category: 'water',
      title: 'Free Groundwater TDS & Potability Testing Camp',
      tamilTitle: 'இலவச நிலத்தடி நீர் TDS & குடிநீர் பரிசோதனை முகாம்',
      date: 'Saturday, Oct 17, 2026',
      tamilDate: 'சனிக்கிழமை, அக் 17, 2026',
      time: '10:00 AM – 4:00 PM',
      location: 'Hitek Solutions Showroom, Malang Road, Muslimpur',
      tamilLocation: 'ஹைடெக் சொல்யூஷன்ஸ், மலாங் ரோடு, முஸ்லிம்பூர்',
      landmark: 'Directly Opposite Karur Vysya Bank (KVB)',
      description: 'Bring a 500ml sample of water from your home borewell or Kaveri tap. Get instant digital TDS, pH, hardness analysis on-the-spot with free expert advice.',
      tamilDescription: 'உங்கள் வீட்டு போர்வெல் அல்லது குடிநீர் குழாயில் இருந்து 500ml நீர் கொண்டு வாருங்கள். உடனடியாக டிஜிட்டல் TDS, pH மற்றும் கடினத்தன்மை அளவு இலவசமாக பரிசோதிக்கப்படும்.',
      capacity: '60 Household Slots',
      badge: 'Free Digital Testing',
      perks: [
        'Free digital TDS & Mineral ppm reading in 2 minutes',
        'Free ₹150 Pre-Filter Spun Candle voucher for every attendee',
        'Demonstration of 1:1 Eco-Reject Water Saving Valves'
      ],
      tamilPerks: [
        '2 நிமிடங்களில் இலவச டிஜிட்டல் TDS & மினரல் அளவு அறிக்கை',
        'பங்கேற்பாளர்கள் அனைவருக்கும் ₹150 மதிப்புள்ள இலவச ஃபில்டர் கூப்பன்',
        '1:1 சுற்றுச்சூழல் நீர் சேமிப்பு வால்வு செயல்முறை விளக்கம்'
      ],
      icon: 'water'
    },
    {
      id: 'event-solar-workshop',
      category: 'solar',
      title: 'PM Surya Ghar Rooftop Solar & ₹78,000 Subsidy Workshop',
      tamilTitle: 'PM சூர்ய கர் ரூஃப்டாப் சோலார் & ₹78,000 மானிய பயிற்சி பட்டறை',
      date: 'Sunday, Oct 25, 2026',
      tamilDate: 'ஞாயிற்றுக்கிழமை, அக் 25, 2026',
      time: '11:00 AM – 1:30 PM',
      location: 'Khaderpet Community Center / Malang Road Solar Demo Terrace',
      tamilLocation: 'காதர்பேட்டை சமுதாய கூடம் / மலாங் ரோடு சோலார் டெமோ கூரை',
      landmark: 'Near Khaderpet Big Mosque',
      description: 'Hands-on educational seminar on cutting domestic and tannery electricity bills to zero using TNEB bi-directional net-metering and claiming direct bank subsidies.',
      tamilDescription: 'TNEB நெட் மீட்டரிங் மூலம் மின் கட்டணத்தை பூஜ்ஜியமாக குறைப்பது மற்றும் ₹78,000 மத்திய அரசு மானியம் பெறுவது குறித்த நேரடி பயிற்சி மற்றும் வழிகாட்டுதல்.',
      capacity: '45 Seats Reserved',
      badge: 'Govt Subsidy Assistance',
      perks: [
        'Live demonstration of grid-tied bi-directional net meters',
        'Free on-the-spot structural rooftop shadow evaluation',
        '1-on-1 assistance with National Portal PM Surya Ghar registration'
      ],
      tamilPerks: [
        'நெட் மீட்டர் மற்றும் சோலார் பேனல் நேரடி செயல்முறை விளக்கம்',
        'இலவச கூரை அமைப்பு மற்றும் நிழல் விழுதல் மதிப்பீடு',
        'தேசிய போர்ட்டலில் மத்திய அரசு மானியம் பதிவு செய்ய உடனடி உதவி'
      ],
      icon: 'solar'
    },
    {
      id: 'event-battery-health',
      category: 'battery',
      title: 'Tubular Battery Health & Acid Gravity Check-Up Drive',
      tamilTitle: 'இன்வெர்ட்டர் பேட்டரி அமில அடர்த்தி & இலவச நீர் நிரப்பும் முகாம்',
      date: 'Saturday, Nov 07, 2026',
      tamilDate: 'சனிக்கிழமை, நவ 07, 2026',
      time: '9:30 AM – 2:00 PM',
      location: 'Newtown Clock Tower Service Hub & Valayampet Mobile Van',
      tamilLocation: 'நியூடவுன் கடிகார கோபுரம் சர்வீஸ் மையம் & மொபைல் வேன்',
      landmark: 'Newtown Commercial Junction',
      description: 'Free specific gravity hydrometer testing for domestic inverter batteries to detect sulfation early. Free terminal corrosion cleaning and electrolyte top-up.',
      tamilDescription: 'பேட்டரியின் அமில அடர்த்தியை ஹைட்ரோமீட்டர் மூலம் சோதித்து, டெர்மினல் துருவை நீக்கி ஆயுளை அதிகரிக்கும் இலவச பராமரிப்பு முகாம்.',
      capacity: '80 Batteries Serviced',
      badge: 'Battery Life Booster',
      perks: [
        'Free 6-cell acid gravity hydrometer health report',
        'Free anti-corrosion petroleum jelly terminal coating',
        'Complimentary 1-Liter battery-grade distilled water top-up'
      ],
      tamilPerks: [
        '6 செல்களுக்கும் இலவச அமில அடர்த்தி ஆரோக்கிய அறிக்கை',
        'டெர்மினல் துரு தடுப்பு பாதுகாப்பு பூச்சு இலவசம்',
        'இலவச 1 லிட்டர் பேட்டரி கிரேடு டிஸ்டில்டு வாட்டர்'
      ],
      icon: 'battery'
    }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const handleOpenRegister = (ev: CommunityEvent) => {
    setActiveEventForModal(ev);
    setIsRegisterModalOpen(true);
    setRegistrationSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !activeEventForModal) return;

    setRegisteredEvent(activeEventForModal);
    setRegistrationSuccess(true);
  };

  const getWhatsAppShareUrl = (ev: CommunityEvent) => {
    const text = encodeURIComponent(
      `Hello! Hitek Solutions is hosting a ${ev.title} in Vaniyambadi on ${ev.date} at ${ev.location}. Entry is completely free! Register here or call 91500 51486.`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <section id="events" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'வாணியம்பாடி சமூக நிகழ்வுகள் & பயிற்சி' : 'Community Events & Free Camps'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'இலவச முகாம்கள் & பயிலரங்குகள்.' : 'Events & Free Camps.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'வாணியம்பாடி பகுதி மக்களுக்காக ஹைடெக் சொல்யூஷன்ஸ் நடத்தும் இலவச குடிநீர் பரிசோதனை முகாம்கள், சோலார் மானிய பயிலரங்குகள் மற்றும் பேட்டரி பராமரிப்பு விழிப்புணர்வு முகாம்கள்.'
                : 'Join free hands-on water quality testing camps, PM Surya Ghar solar subsidy workshops, and tubular battery health check-ups hosted across Vaniyambadi.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {[
              { id: 'all', label: 'All Camps', tamilLabel: 'அனைத்து முகாம்கள்' },
              { id: 'water', label: 'Water Testing', tamilLabel: 'குடிநீர் பரிசோதனை' },
              { id: 'solar', label: 'Solar Workshops', tamilLabel: 'சோலார் பயிற்சி' },
              { id: 'battery', label: 'Battery Health', tamilLabel: 'பேட்டரி முகாம்' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#102b2a] text-[#dcff73] border-[#102b2a] shadow-xs'
                    : 'bg-[#f5f7f4] text-[#526460] border-[#bac9c0] hover:bg-[#e8eee5]'
                }`}
              >
                {lang === 'ta' ? tab.tamilLabel : tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#f5f7f4] rounded-3xl border border-[#d9e1da] p-6 sm:p-7 flex flex-col justify-between hover:border-[#507d38] transition-all hover:shadow-md group"
            >
              <div className="space-y-4">
                {/* Badge & Category Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#102b2a] text-[#dcff73] flex items-center justify-center font-bold">
                      {ev.icon === 'water' && <Droplets className="w-4 h-4 text-sky-400" />}
                      {ev.icon === 'solar' && <Sun className="w-4 h-4 text-[#dcff73]" />}
                      {ev.icon === 'battery' && <Battery className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#507d38]">
                      {ev.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#526460] bg-white px-2.5 py-0.5 rounded-lg border border-[#dce4de]">
                    {ev.capacity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-[#102b2a] group-hover:text-[#507d38] transition-colors leading-snug">
                  {lang === 'ta' ? ev.tamilTitle : ev.title}
                </h3>

                {/* Date & Time */}
                <div className="space-y-1.5 text-xs text-[#526460] pt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#507d38] shrink-0" />
                    <strong className="text-[#102b2a] font-bold">
                      {lang === 'ta' ? ev.tamilDate : ev.date}
                    </strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#507d38] shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#507d38] shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      {lang === 'ta' ? ev.tamilLocation : ev.location}
                      <span className="block text-[11px] text-[#8fa8a3]">({ev.landmark})</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#526460] leading-relaxed pt-1">
                  {lang === 'ta' ? ev.tamilDescription : ev.description}
                </p>

                {/* Perks Checklist */}
                <div className="pt-2 border-t border-[#e2e8e0] space-y-1.5">
                  {(lang === 'ta' ? ev.tamilPerks : ev.perks).map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#37474f]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#507d38] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#e2e8e0] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenRegister(ev)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <span>{lang === 'ta' ? 'இலவச அனுமதி பெற' : 'Register Free Pass'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#dcff73]" />
                </button>

                <a
                  href={getWhatsAppShareUrl(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-[#bac9c0] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5] rounded-xl transition-colors cursor-pointer"
                  title="Share event on WhatsApp"
                  aria-label="Share event on WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Free Pass Registration Modal */}
        {isRegisterModalOpen && activeEventForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-[#d9e1da] max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-[#526460] hover:text-[#102b2a] rounded-lg hover:bg-[#f5f7f4]"
                aria-label="Close registration modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!registrationSuccess ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#507d38] bg-[#dcff73]/40 px-2 py-0.5 rounded">
                      Free Entry · Vaniyambadi
                    </span>
                    <h3 className="text-lg font-black text-[#102b2a]">
                      {lang === 'ta' ? 'முகாம் அனுமதிச் சீட்டு முன்பதிவு' : 'Reserve Your Free Camp Pass'}
                    </h3>
                    <p className="text-xs text-[#526460]">
                      {lang === 'ta' ? activeEventForModal.tamilTitle : activeEventForModal.title}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#102b2a] mb-1">
                        {lang === 'ta' ? 'உங்கள் பெயர்:' : 'Full Name:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mohammed Tariq"
                        className="w-full px-3.5 py-2 text-xs bg-[#f5f7f4] border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102b2a] mb-1">
                        {lang === 'ta' ? 'வாட்ஸ்அப் எண்:' : 'Mobile / WhatsApp Number:'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98420 XXXXX"
                        className="w-full px-3.5 py-2 text-xs bg-[#f5f7f4] border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#102b2a] mb-1">
                          {lang === 'ta' ? 'பகுதி / ஊர்:' : 'Vaniyambadi Area:'}
                        </label>
                        <select
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#f5f7f4] border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38]"
                        >
                          <option value="Muslimpur">Muslimpur</option>
                          <option value="Khaderpet">Khaderpet</option>
                          <option value="Newtown">Newtown</option>
                          <option value="Valayampet">Valayampet</option>
                          <option value="Noorullahpet">Noorullahpet</option>
                          <option value="Gandhinagar">Gandhinagar</option>
                          <option value="Other">Other nearby area</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102b2a] mb-1">
                          {lang === 'ta' ? 'நபர்கள் எண்ணிக்கை:' : 'Attendees:'}
                        </label>
                        <select
                          value={attendees}
                          onChange={(e) => setAttendees(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs bg-[#f5f7f4] border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38]"
                        >
                          <option value={1}>1 Person</option>
                          <option value={2}>2 Persons</option>
                          <option value={3}>3 Persons</option>
                          <option value={4}>4+ Family Members</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs mt-2"
                  >
                    {lang === 'ta' ? 'உடனடி அனுமதிச் சீட்டை உறுதி செய்க' : 'Confirm Free Registration'}
                  </button>
                </form>
              ) : (
                /* Success Pass */
                <div className="text-center space-y-4 py-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#102b2a]">
                      {lang === 'ta' ? 'அனுமதிச் சீட்டு பதிவு செய்யப்பட்டது!' : 'Registration Confirmed!'}
                    </h3>
                    <p className="text-xs text-[#526460] mt-1">
                      {lang === 'ta'
                        ? `${name}, உங்கள் அனுமதிச் சீட்டு எண்: #HS-CAMP-${Math.floor(1000 + Math.random() * 9000)}`
                        : `${name}, your Pass Code is #HS-CAMP-${Math.floor(1000 + Math.random() * 9000)}`}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f5f7f4] border border-[#d9e1da] text-left text-xs space-y-1.5">
                    <div className="font-bold text-[#102b2a]">
                      {lang === 'ta' ? activeEventForModal.tamilTitle : activeEventForModal.title}
                    </div>
                    <div className="text-[#526460]">
                      <strong>Date:</strong> {activeEventForModal.date} ({activeEventForModal.time})
                    </div>
                    <div className="text-[#526460]">
                      <strong>Venue:</strong> {activeEventForModal.location}
                    </div>
                    <div className="text-[#507d38] font-mono font-bold pt-1">
                      Attendees: {attendees} | Area: {area}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/919150051486?text=${encodeURIComponent(
                        `Hello Hitek Solutions! I registered for the ${activeEventForModal.title} on ${activeEventForModal.date}. Name: ${name}, Area: ${area}. Please send location map.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#102b2a] text-white text-xs font-bold rounded-xl"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#dcff73]" />
                      <span>Get Map on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsRegisterModalOpen(false)}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#102b2a] text-xs font-bold rounded-xl"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
