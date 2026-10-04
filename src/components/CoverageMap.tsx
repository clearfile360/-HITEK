import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Zap, 
  Droplets, 
  Sun, 
  ShieldCheck, 
  Search, 
  MessageSquare, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Language } from '../translations';

interface CoverageMapProps {
  lang: Language;
}

interface ServiceZone {
  id: string;
  name: string;
  tamilName: string;
  cx: number;
  cy: number;
  radiusKm: number;
  eta: string;
  tamilEta: string;
  deliveryType: string;
  tamilDeliveryType: string;
  vansActive: number;
  services: string[];
  tamilServices: string[];
  landmark: string;
  tamilLandmark: string;
  description: string;
  tamilDescription: string;
  isHub?: boolean;
}

export const CoverageMap: React.FC<CoverageMapProps> = ({ lang }) => {
  const zones: ServiceZone[] = [
    {
      id: 'malang-road',
      name: 'Muslimpur & Malang Road',
      tamilName: 'முஸ்லிம்பூர் & மலாங் ரோடு',
      cx: 250,
      cy: 190,
      radiusKm: 0.8,
      eta: '10–15 Mins',
      tamilEta: '10–15 நிமிடங்கள்',
      deliveryType: 'Free 15-Min Express Doorstep',
      tamilDeliveryType: 'இலவச 15 நிமிட உடனடி சேவை',
      vansActive: 3,
      services: ['Inverter Walk-in & Repair', 'Battery Testing Lab', 'RO Filter Parts', 'Solar Demo'],
      tamilServices: ['இன்வெர்ட்டர் சர்வீஸ் மையம்', 'பேட்டரி ஆய்வகம்', 'RO உதிரிபாகங்கள்', 'சோலார் டெமோ'],
      landmark: 'Opposite Karur Vysya Bank / Near Big Mosque',
      tamilLandmark: 'கரூர் வைஸ்யா வங்கி எதிரில் / பெரிய பள்ளிவாசல் அருகில்',
      description: 'Hitek Solutions flagship center with fully-stocked inventory of Exide/Amaron batteries, Luminous inverters, and RO membrane parts.',
      tamilDescription: 'ஹைடெக் சொல்யூஷன்ஸ் முதன்மை கடை. எக்ஸைட்/அமரோன் பேட்டரி, லுமினஸ் இன்வெர்ட்டர் மற்றும் RO குடிநீர் உபகரணங்கள் உடனடியாக கிடைக்கும்.',
      isHub: true
    },
    {
      id: 'khaderpet',
      name: 'Khaderpet & Commercial Area',
      tamilName: 'காதர்பேட்டை & வணிக பகுதி',
      cx: 240,
      cy: 105,
      radiusKm: 1.5,
      eta: '15–20 Mins',
      tamilEta: '15–20 நிமிடங்கள்',
      deliveryType: 'Free Same-Hour Delivery',
      tamilDeliveryType: 'இலவச 1 மணி நேர டெலிவரி',
      vansActive: 2,
      services: ['Industrial UPS', 'Tannery Heavy Power Backup', 'Commercial RO', 'Electrician Wiring'],
      tamilServices: ['தொழில்துறை UPS', 'டேனரி மின் பேக்கப்', 'வணிக RO அமைப்புகள்', 'வயரிங் சர்வீஸ்'],
      landmark: 'Khaderpet Main Bazaar & Mosque',
      tamilLandmark: 'காதர்பேட்டை பஜார் & பள்ளிவாசல்',
      description: 'Dedicated high-capacity industrial inverter response team for leather processing hubs and commercial offices.',
      tamilDescription: 'டேனரி மற்றும் வணிக வளாகங்களுக்கான ஹெவி-டியூட்டி இன்வெர்ட்டர் & UPS பராமரிப்பு சேவை.',
      isHub: false
    },
    {
      id: 'newtown',
      name: 'Newtown & Clock Tower',
      tamilName: 'நியூடவுன் & கடிகார கோபுரம்',
      cx: 370,
      cy: 165,
      radiusKm: 2.6,
      eta: '20–25 Mins',
      tamilEta: '20–25 நிமிடங்கள்',
      deliveryType: 'Free Doorstep Delivery',
      tamilDeliveryType: 'இலவச வீட்டு வாசல் டெலிவரி',
      vansActive: 2,
      services: ['Home UPS Sizing', 'Tubular Battery Top-up', 'RO Filter Candle Service', 'Water TDS Test'],
      tamilServices: ['வீட்டு UPS பொருத்துதல்', 'பேட்டரி நீர் நிரப்புதல்', 'RO கேண்டில் மாற்றம்', 'TDS பரிசோதனை'],
      landmark: 'Newtown Clock Tower Junction & Bus Stand',
      tamilLandmark: 'கடிகார கோபுரம் சந்திப்பு & பேருந்து நிலையம்',
      description: 'Primary residential corridor. Fast battery jumpstarts and doorstep drinking water TDS verification.',
      tamilDescription: 'குடியிருப்பு பகுதி. அவசர பேட்டரி பராமரிப்பு மற்றும் வீட்டு வாசலிலேயே குடிநீர் உப்புத்தன்மை பரிசோதனை.',
      isHub: false
    },
    {
      id: 'valayampet',
      name: 'Valayampet & Railway Colony',
      tamilName: 'வலையம்பேட்டை & ரயில்வே காலனி',
      cx: 350,
      cy: 285,
      radiusKm: 3.2,
      eta: '25–30 Mins',
      tamilEta: '25–30 நிமிடங்கள்',
      deliveryType: 'Free Doorstep Technician',
      tamilDeliveryType: 'இலவச டெக்னீசியன் வருகை',
      vansActive: 2,
      services: ['Doorstep Battery Fitment', 'RO Booster Pump Repair', 'Emergency Plumber', 'Old Battery Scrap'],
      tamilServices: ['பேட்டரி பொருத்துதல்', 'RO மோட்டார் பழுது நீக்குதல்', 'பிளம்பர் சேவை', 'பழைய பேட்டரி எக்ஸ்சேஞ்ச்'],
      landmark: 'Railway Station Road / Valayampet High School',
      tamilLandmark: 'ரயில்வே ஸ்டேஷன் ரோடு / மேல்நிலைப் பள்ளி அருகில்',
      description: 'Full electrical and plumbing support. Free doorstep collection for old scrap battery eco-exchange.',
      tamilDescription: 'முழு மின் மற்றும் பிளம்பிங் பராமரிப்பு. பழைய பேட்டரிகளை வீட்டு வாசலிலேயே பெற்றுக்கொள்ளும் வசதி.',
      isHub: false
    },
    {
      id: 'noorullahpet',
      name: 'Noorullahpet & Gandhinagar',
      tamilName: 'நூருல்லாபேட்டை & காந்திநகர்',
      cx: 125,
      cy: 215,
      radiusKm: 2.0,
      eta: '20–25 Mins',
      tamilEta: '20–25 நிமிடங்கள்',
      deliveryType: 'Free Doorstep Delivery',
      tamilDeliveryType: 'இலவச வீட்டு வாசல் டெலிவரி',
      vansActive: 1,
      services: ['Domestic Inverters', 'Low Maintenance Batteries', 'Alkaline RO Filters', 'Inverter Trolleys'],
      tamilServices: ['வீட்டு இன்வெர்ட்டர்', 'குறைந்த பராமரிப்பு பேட்டரி', 'ஆல்கலைன் RO', 'இன்வெர்ட்டர் ட்ராலி'],
      landmark: 'Gandhinagar Residential Main Road',
      tamilLandmark: 'காந்திநகர் குடியிருப்பு மெயின் ரோடு',
      description: 'Swift residential technician response for fan humming and inverter overload diagnosis.',
      tamilDescription: 'மின்விசிறி சத்தம் மற்றும் இன்வெர்ட்டர் ஓவர்லோடு பிரச்சனைகளை உடனடியாக சரிசெய்யும் சேவை.',
      isHub: false
    },
    {
      id: 'jaffrabad',
      name: 'Jaffrabad & Perumalpet',
      tamilName: 'ஜாப்ராபாத் & பெருமாள்பேட்டை',
      cx: 140,
      cy: 310,
      radiusKm: 4.0,
      eta: '30–35 Mins',
      tamilEta: '30–35 நிமிடங்கள்',
      deliveryType: 'Free Service for Orders > ₹500',
      tamilDeliveryType: '₹500க்கு மேற்பட்ட ஆர்டர்களுக்கு இலவசம்',
      vansActive: 1,
      services: ['Rooftop Solar Survey', 'Solar Water Heaters', 'Heavy-Duty Tubular Battery', 'Main DB Earthing'],
      tamilServices: ['ரூஃப்டாப் சோலார் ஆய்வு', 'சோலார் வாட்டர் ஹீட்டர்', 'டால் டியூபுலர் பேட்டரி', 'எர்த்திங் ஆய்வு'],
      landmark: 'Jaffrabad Panchayat Road',
      tamilLandmark: 'ஜாப்ராபாத் பஞ்சாயத்து சாலை',
      description: 'Extended coverage area with specialized solar roof shadow mapping and high-power home UPS.',
      tamilDescription: 'சூரிய ஒளி கூரை அமைப்பு ஆய்வு மற்றும் வீட்டு மின் பயன்பாட்டிற்கான சோலார் வழிகாட்டுதல்.',
      isHub: false
    },
    {
      id: 'alangayam-rd',
      name: 'Alangayam Road & Suburbs',
      tamilName: 'ஆலங்காயம் ரோடு & புறநகர்',
      cx: 250,
      cy: 360,
      radiusKm: 5.8,
      eta: '35–45 Mins',
      tamilEta: '35–45 நிமிடங்கள்',
      deliveryType: 'Daily Scheduled Service Van',
      tamilDeliveryType: 'தினசரி மொபைல் சர்வீஸ் வேன்',
      vansActive: 1,
      services: ['Solar Off-Grid Plants', 'Farmhouse Inverter Systems', 'Pressure Water Tanks', 'Borewell RO'],
      tamilServices: ['சோலார் மின் உற்பத்தி', 'தோட்டத்து வீடு இன்வெர்ட்டர்', 'பிரஷர் வாட்டர் டேங்க்', 'போர்வெல் RO'],
      landmark: 'Alangayam Bypass Radial Road',
      tamilLandmark: 'ஆலங்காயம் பைபாஸ் சாலை',
      description: 'Dedicated rural and farmhouse coverage van running twice daily for scheduled installations.',
      tamilDescription: 'தோட்டத்து வீடுகள் மற்றும் புறநகர் பகுதிகளுக்கு தினசரி இருமுறை செல்லும் மொபைல் வேன் சேவை.',
      isHub: false
    }
  ];

  const [activeZoneId, setActiveZoneId] = useState<string>('malang-road');
  const [filterRadius, setFilterRadius] = useState<'all' | 'central' | 'suburb'>('all');

  const activeZone = zones.find(z => z.id === activeZoneId) || zones[0];

  const filteredZones = zones.filter(z => {
    if (filterRadius === 'central') return z.radiusKm <= 2.0;
    if (filterRadius === 'suburb') return z.radiusKm > 2.0;
    return true;
  });

  const getWhatsAppBookingUrl = (zone: ServiceZone) => {
    const text = encodeURIComponent(
      `Hello Hitek Solutions! I need doorstep service in ${zone.name}, Vaniyambadi (Landmark: ${zone.landmark}). Please dispatch a technician to my address.`
    );
    return `https://wa.me/919150051486?text=${text}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-[#d9e1da] p-6 sm:p-8 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#dce4de] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-1">
            <Truck className="w-3.5 h-3.5 text-[#507d38]" />
            <span>{lang === 'ta' ? 'வாணியம்பாடி பகுதி சேவை வரைபடம்' : 'Doorstep Service Coverage Area'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#102b2a] tracking-tight">
            {lang === 'ta' ? 'வாணியம்பாடி முழுவதும் 15-30 நிமிடங்களில்.' : 'Covering All Corners of Vaniyambadi.'}
          </h3>
          <p className="text-xs sm:text-sm text-[#526460] mt-1 max-w-xl">
            {lang === 'ta'
              ? 'மலாங் ரோடு முதன்மை மையத்திலிருந்து வாணியம்பாடியின் அனைத்து பகுதிகளுக்கும் தினசரி நடமாடும் சர்வீஸ் வேன்கள் மூலம் விரைவான வீட்டு வாசல் சேவை.'
              : 'Our fleet of 6 mobile service units provides rapid doorstep battery installation, RO maintenance, and inverter diagnosis across all municipal wards.'}
          </p>
        </div>

        {/* Locality Quick Selector & Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={activeZoneId}
              onChange={(e) => setActiveZoneId(e.target.value)}
              className="px-3.5 py-2 text-xs font-bold bg-[#f5f7f4] border border-[#bac9c0] rounded-xl text-[#102b2a] focus:outline-none focus:ring-2 focus:ring-[#507d38] cursor-pointer"
              aria-label="Select your neighborhood in Vaniyambadi"
            >
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {lang === 'ta' ? z.tamilName : z.name} ({z.eta})
                </option>
              ))}
            </select>
          </div>

          <div className="inline-flex bg-[#f5f7f4] p-1 rounded-xl border border-[#bac9c0]">
            {[
              { id: 'all', label: 'All Vaniyambadi', tamilLabel: 'அனைத்து பகுதிகள்' },
              { id: 'central', label: '< 20 Mins', tamilLabel: '< 20 நிமிடம்' },
              { id: 'suburb', label: 'Suburbs', tamilLabel: 'புறநகர்' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterRadius(tab.id as any)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filterRadius === tab.id
                    ? 'bg-[#102b2a] text-[#dcff73]'
                    : 'text-[#526460] hover:text-[#102b2a]'
                }`}
              >
                {lang === 'ta' ? tab.tamilLabel : tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive SVG Radar Map (Left 7 cols) + Selected Locality Specs (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Interactive Mini SVG Coordinate Map */}
        <div className="lg:col-span-7 bg-[#102b2a] rounded-2xl p-4 sm:p-6 border border-[#223e3b] relative overflow-hidden shadow-inner">
          {/* Subtle Grid Coordinates Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#223e3b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Map Top Bar Controls */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#bbceca] mb-2 relative z-10">
            <span className="flex items-center gap-1.5 text-[#dcff73]">
              <span className="w-2 h-2 rounded-full bg-[#dcff73] animate-ping" />
              <span>LIVE GPS RADAR · VANIYAMBADI (12.68° N, 78.61° E)</span>
            </span>
            <span className="hidden sm:inline text-gray-400">Click any marker to inspect</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative aspect-[4/3] w-full">
            <svg
              viewBox="0 0 500 400"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
            >
              {/* Concentric Radar Distance Rings */}
              <circle cx="250" cy="190" r="70" fill="none" stroke="#223e3b" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="250" cy="190" r="130" fill="none" stroke="#223e3b" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="250" cy="190" r="190" fill="none" stroke="#1d3835" strokeWidth="1.5" strokeDasharray="6 6" />

              {/* Distance Labels */}
              <text x="250" y="115" fill="#526460" fontSize="9" fontFamily="monospace" textAnchor="middle">2 KM RADIUS</text>
              <text x="250" y="55" fill="#526460" fontSize="9" fontFamily="monospace" textAnchor="middle">4 KM RADIUS</text>

              {/* Palar River Path Simulation */}
              <path
                d="M 20 80 Q 140 130 230 150 T 400 230 T 480 270"
                fill="none"
                stroke="#1b4946"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.7"
              />
              <text x="70" y="95" fill="#4d7773" fontSize="8" fontFamily="sans-serif" fontStyle="italic">Palar River Basin</text>

              {/* Major Roads / Highway simulation */}
              {/* NH-48 / Bypass */}
              <line x1="30" y1="350" x2="470" y2="70" stroke="#2a4542" strokeWidth="2.5" strokeDasharray="6 3" />
              <text x="440" y="85" fill="#66827e" fontSize="7" fontFamily="sans-serif">NH-48 Bypass</text>

              {/* Malang Road Spine */}
              <line x1="250" y1="100" x2="250" y2="370" stroke="#3d615c" strokeWidth="3" />
              <text x="255" y="145" fill="#dcff73" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Malang Road</text>

              {/* Central Hub Pulsing Zone Aura */}
              <circle cx="250" cy="190" r="28" fill="#dcff73" fillOpacity="0.12" className="animate-pulse" />
              <circle cx="250" cy="190" r="45" fill="#dcff73" fillOpacity="0.06" />

              {/* Zone Connection Radial Lines */}
              {zones.map((z) => (
                <line
                  key={`line-${z.id}`}
                  x1="250"
                  y1="190"
                  x2={z.cx}
                  y2={z.cy}
                  stroke={activeZoneId === z.id ? '#dcff73' : '#223e3b'}
                  strokeWidth={activeZoneId === z.id ? 2 : 1}
                  strokeDasharray={z.isHub ? 'none' : '3 3'}
                  opacity={activeZoneId === z.id ? 0.9 : 0.4}
                />
              ))}

              {/* Interactive Zone Markers */}
              {filteredZones.map((z) => {
                const isSelected = activeZoneId === z.id;

                return (
                  <g
                    key={z.id}
                    onClick={() => setActiveZoneId(z.id)}
                    className="cursor-pointer transition-transform hover:scale-110"
                    style={{ transformOrigin: `${z.cx}px ${z.cy}px` }}
                  >
                    {/* Active Halo */}
                    {isSelected && (
                      <circle
                        cx={z.cx}
                        cy={z.cy}
                        r={z.isHub ? 22 : 18}
                        fill={z.isHub ? '#dcff73' : '#507d38'}
                        fillOpacity="0.3"
                        className="animate-ping"
                      />
                    )}

                    {/* Node Dot / Pin */}
                    <circle
                      cx={z.cx}
                      cy={z.cy}
                      r={z.isHub ? 12 : 9}
                      fill={z.isHub ? '#dcff73' : isSelected ? '#507d38' : '#1e3c39'}
                      stroke={isSelected ? '#ffffff' : '#2e524d'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {/* Node Inner Symbol */}
                    {z.isHub ? (
                      <circle cx={z.cx} cy={z.cy} r="4" fill="#102b2a" />
                    ) : (
                      <circle cx={z.cx} cy={z.cy} r="3" fill={isSelected ? '#dcff73' : '#8fa8a3'} />
                    )}

                    {/* Text Label on SVG */}
                    <text
                      x={z.cx}
                      y={z.cy + (z.isHub ? 24 : 18)}
                      fill={isSelected ? '#ffffff' : '#bbceca'}
                      fontSize={z.isHub ? '10' : '8.5'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                      className="transition-colors pointer-events-none"
                    >
                      {z.name.split('&')[0].trim()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* SVG Map Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-[#223e3b] text-[10px] font-mono text-[#bbceca]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dcff73] inline-block" />
                <span>Malang Road HQ</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#507d38] inline-block" />
                <span>Mobile Dispatch Node</span>
              </span>
            </div>
            <span className="text-[#8fa8a3]">6 Technicians Live on Grid</span>
          </div>
        </div>

        {/* Right Column: Selected Zone Specs & Fast Booking Card */}
        <div className="lg:col-span-5 bg-[#f5f7f4] rounded-2xl border border-[#d9e1da] p-5 sm:p-6 space-y-4">
          {/* Header of Active Zone */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md ${
                activeZone.isHub 
                  ? 'bg-[#102b2a] text-[#dcff73]' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeZone.isHub ? 'Primary HQ & Showroom' : 'Doorstep Dispatch Zone'}
              </span>
              <span className="text-xs font-mono font-bold text-[#507d38] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? activeZone.tamilEta : activeZone.eta} ETA</span>
              </span>
            </div>

            <h4 className="text-xl font-black text-[#102b2a] pt-1">
              {lang === 'ta' ? activeZone.tamilName : activeZone.name}
            </h4>

            <div className="flex items-center gap-1.5 text-xs text-[#526460]">
              <MapPin className="w-3.5 h-3.5 text-[#507d38] shrink-0" />
              <span>{lang === 'ta' ? activeZone.tamilLandmark : activeZone.landmark}</span>
            </div>
          </div>

          <p className="text-xs text-[#526460] leading-relaxed">
            {lang === 'ta' ? activeZone.tamilDescription : activeZone.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-[#d9e1da]">
              <span className="text-[10px] text-[#526460] block font-mono">Delivery & Visit</span>
              <strong className="text-[#102b2a] font-bold text-[11px] leading-tight block mt-0.5">
                {lang === 'ta' ? activeZone.tamilDeliveryType : activeZone.deliveryType}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#d9e1da]">
              <span className="text-[10px] text-[#526460] block font-mono">Service Fleet</span>
              <strong className="text-emerald-700 font-bold text-[11px] leading-tight block mt-0.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{activeZone.vansActive} Active Vans</span>
              </strong>
            </div>
          </div>

          {/* Available Services in This Area */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono font-bold uppercase text-[#526460] block">
              {lang === 'ta' ? 'இப்பகுதியில் கிடைக்கும் சேவைகள்:' : 'Guaranteed Services in This Zone:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {(lang === 'ta' ? activeZone.tamilServices : activeZone.services).map((srv, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#102b2a] bg-white p-1.5 rounded-lg border border-[#e2e8e0]">
                  <CheckCircle2 className="w-3 h-3 text-[#507d38] shrink-0" />
                  <span className="truncate">{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <a
              href={getWhatsAppBookingUrl(activeZone)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#dcff73]" />
              <span>
                {lang === 'ta'
                  ? `வாட்ஸ்அப்பில் ${activeZone.name.split('&')[0].trim()} டெக்னீசியனை அழைக்க`
                  : `Dispatch Technician to ${activeZone.name.split('&')[0].trim()}`}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
