import React, { useState } from 'react';
import { Tag, ShieldCheck, Check, ArrowRight, MessageSquare, Sparkles, RefreshCw, Zap, Battery, Droplets, Wrench, Bell, X, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../translations';

interface PriceEstimatorProps {
  lang: Language;
  onSelectProduct: (productName: string) => void;
}

interface PackageOption {
  id: string;
  name: string;
  tamilName: string;
  capacity: string;
  backupNote: string;
  tamilBackupNote: string;
  priceRange: string;
  scrapSaving?: string;
  popular?: boolean;
  warranty: string;
  included: string[];
  tamilIncluded: string[];
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ lang, onSelectProduct }) => {
  const t = translations[lang].estimator;
  const [activeTab, setActiveTab] = useState<'combos' | 'inverters' | 'batteries' | 'ro' | 'services'>('combos');

  // Price Drop Alert States
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertPkg, setAlertPkg] = useState<PackageOption | null>(null);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertPhone, setAlertPhone] = useState('');
  const [alertThreshold, setAlertThreshold] = useState('any');
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  const combos: PackageOption[] = [
    {
      id: 'combo-1',
      name: 'Starter Home Backup (700VA + 100Ah)',
      tamilName: 'ஆரம்ப நிலை ஹோம் பேக்கப் (700VA + 100Ah)',
      capacity: '700VA Sine Wave + 100Ah Tubular',
      backupNote: 'Runs 2 Fans + 2 LED Lights for ~3 to 4 hours',
      tamilBackupNote: '2 மின்விசிறி + 2 LED விளக்குகள் (~3 முதல் 4 மணி நேரம்)',
      priceRange: '₹14,500 – ₹17,200',
      scrapSaving: '₹1,500 off with old battery',
      warranty: '36 Months Battery Warranty',
      included: ['Pure Sine Wave Inverter', '100Ah Tubular Battery', 'Free Delivery in Vaniyambadi', 'Wiring Setup'],
      tamilIncluded: ['பியூர் சைன் வேவ் இன்வெர்ட்டர்', '100Ah டியூபுலர் பேட்டரி', 'வாணியம்பாடியில் இலவச டெலிவரி', 'வயரிங் இணைப்பு']
    },
    {
      id: 'combo-2',
      name: 'Most Popular 2-3 BHK Combo (900VA + 150Ah)',
      tamilName: 'அதிகம் விரும்பப்படும் 2-3 BHK காம்போ (900VA + 150Ah)',
      capacity: '900VA Pure Sine Wave + 150Ah Tall Tubular',
      backupNote: 'Runs 3 Fans + 4 LEDs + Wi-Fi + TV for ~4 to 6 hours',
      tamilBackupNote: '3 மின்விசிறி + 4 விளக்கு + வைஃபை + டிவி (~4 முதல் 6 மணி நேரம்)',
      priceRange: '₹18,500 – ₹22,500',
      scrapSaving: '₹2,500 off with old battery',
      popular: true,
      warranty: '36 to 60 Months Warranty (Exide/Amaron)',
      included: ['900VA Pure Sine Wave UPS', '150Ah Heavy Duty Tall Tubular', 'Inverter Battery Trolley', 'Official Warranty Registration'],
      tamilIncluded: ['900VA பியூர் சைன் வேவ் UPS', '150Ah ஹெவி டியூட்டி டால் டியூபுலர்', 'இன்வெர்ட்டர் பேட்டரி ட்ராலி', 'அதிகாரப்பூர்வ உத்தரவாத அட்டை']
    },
    {
      id: 'combo-3',
      name: 'Extended Backup & Refrigerator (1150VA + 200Ah)',
      tamilName: 'நீண்ட நேர பேக்கப் & பிரிட்ஜ் (1150VA + 200Ah)',
      capacity: '1150VA Sine Wave + 200Ah Tall Tubular',
      backupNote: 'Runs Fans, Lights, Wi-Fi + Inverter Refrigerator ~6 to 8 hours',
      tamilBackupNote: 'மின்விசிறிகள், விளக்குகள் + இன்வெர்ட்டர் பிரிட்ஜ் (~6 முதல் 8 மணி நேரம்)',
      priceRange: '₹24,000 – ₹28,500',
      scrapSaving: '₹3,200 off with old battery',
      warranty: '60 Months Warranty',
      included: ['High Capacity 1150VA Inverter', '200Ah Deep Cycle Tubular Battery', 'Heavy-Duty Bypass Switch', 'Doorstep Complete Testing'],
      tamilIncluded: ['அதிக திறன் 1150VA இன்வெர்ட்டர்', '200Ah டீப் சைக்கிள் பேட்டரி', 'ஹெவி-டியூட்டி பைபாஸ் சுவிட்ச்', 'முழுமையான சோதனை & பொருத்துதல்']
    },
    {
      id: 'combo-4',
      name: 'Commercial & Multi-Floor (2kVA + 2x 150Ah 24V)',
      tamilName: 'வணிக & பல மாடி அமைப்புகள் (2kVA + 2x 150Ah)',
      capacity: '2000VA (2kVA) / 24V + 2x 150Ah Batteries',
      backupNote: 'Clinics, Offices, Supermarket billing counters & servers',
      tamilBackupNote: 'மருத்துவமனைகள், அலுவலகங்கள், பில்லிங் கவுண்டர்கள் & சர்வர்கள்',
      priceRange: '₹36,000 – ₹44,500',
      scrapSaving: 'Up to ₹5,000 off for 2 old batteries',
      warranty: '36 to 60 Months Warranty',
      included: ['2kVA Heavy Commercial UPS', '2x 150Ah Tubular Battery Bank', 'Double Battery Metal Rack', 'Phase Load Balancing'],
      tamilIncluded: ['2kVA ஹெவி கமர்ஷியல் UPS', '2x 150Ah பேட்டரி வங்கி', 'இரட்டை பேட்டரி மெட்டல் ரேக்', 'பேஸ் லோடு சமநிலைப்படுத்துதல்']
    }
  ];

  const batteries: PackageOption[] = [
    {
      id: 'bat-1',
      name: '100Ah Short Tubular Battery',
      tamilName: '100Ah ஷார்ட் டியூபுலர் பேட்டரி',
      capacity: '100Ah / 12V',
      backupNote: 'Ideal for 1 BHK or small backup requirements',
      tamilBackupNote: '1 BHK அல்லது சிறிய பயன்பாட்டிற்கு ஏற்றது',
      priceRange: '₹8,500 – ₹10,200',
      scrapSaving: '₹1,500 scrap buyback deduction',
      warranty: '36 Months Warranty',
      included: ['Factory Charged Electrolyte', 'Acid Level Indicators', 'Warranty Card'],
      tamilIncluded: ['ஃபேக்டரி சார்ஜ் செய்யப்பட்ட எலக்ட்ரோலைட்', 'அமில அளவு காட்டி', 'வாரண்டி கார்டு']
    },
    {
      id: 'bat-2',
      name: '150Ah Tall Tubular Battery (Bestseller)',
      tamilName: '150Ah டால் டியூபுலர் பேட்டரி (அதிக விற்பனை)',
      capacity: '150Ah / 12V Tall Tubular',
      backupNote: 'Deep cycle backup for 2–3 BHK homes (Exide/Amaron)',
      tamilBackupNote: '2–3 BHK வீடுகளுக்கான சிறந்த டீப் சைக்கிள் பேக்கப்',
      priceRange: '₹12,800 – ₹15,500',
      scrapSaving: '₹2,500 scrap buyback deduction',
      popular: true,
      warranty: '36 to 60 Months Warranty',
      included: ['Low Maintenance Alloy Grid', 'Ceramic Vent Plugs', 'Free Delivery in Town'],
      tamilIncluded: ['குறைந்த பராமரிப்பு அலாய் கிரிட்', 'செராமிக் வென்ட் பிளக்', 'இலவச டெலிவரி']
    },
    {
      id: 'bat-3',
      name: '200Ah Jumbo Tall Tubular Battery',
      tamilName: '200Ah ஜம்போ டால் டியூபுலர் பேட்டரி',
      capacity: '200Ah / 12V Jumbo',
      backupNote: 'Maximum run-time for villas, inverter fridge & power cuts',
      tamilBackupNote: 'நீண்ட மின்வெட்டுகள் மற்றும் பிரிட்ஜிற்கு அதிக பேக்கப்',
      priceRange: '₹16,800 – ₹19,500',
      scrapSaving: '₹3,200 scrap buyback deduction',
      warranty: '60 to 66 Months Warranty',
      included: ['Heavy Plate Construction', 'High Charge Acceptance', 'Priority Service Call'],
      tamilIncluded: ['தடிமனான லெட் தகடுகள்', 'வேகமாக சார்ஜ் ஆகும் திறன்', 'முன்னுரிமை சர்வீஸ் ஆதரவு']
    }
  ];

  const inverters: PackageOption[] = [
    {
      id: 'inv-1',
      name: '700VA Pure Sine Wave Home UPS',
      tamilName: '700VA பியூர் சைன் வேவ் ஹோம் UPS',
      capacity: '700VA / 12V Single Battery',
      backupNote: 'Powers 2 fans, 2 lights & router with zero humming sound',
      tamilBackupNote: '2 விசிறிகள், விளக்குகள் மற்றும் வைஃபைக்கு சத்தமில்லாத இயக்கம்',
      priceRange: '₹4,800 – ₹5,800',
      warranty: '24 Months Replacement Guarantee',
      included: ['Pure Sine Wave Inverter', 'Smart Battery Charging', 'Overload Cut-off'],
      tamilIncluded: ['பியூர் சைன் வேவ் இன்வெர்ட்டர்', 'ஸ்மார்ட் பேட்டரி சார்ஜிங்', 'ஓவர்லோட் பாதுகாப்பு']
    },
    {
      id: 'inv-2',
      name: '900VA–1100VA Sine Wave Home UPS',
      tamilName: '900VA–1100VA சைன் வேவ் ஹோம் UPS',
      capacity: '900VA–1100VA / 12V',
      backupNote: 'Standard workhorse for modern Indian households',
      tamilBackupNote: 'அனைத்து நடுத்தர வீடுகளுக்கும் மிகவும் நம்பகமானது',
      priceRange: '₹5,800 – ₹7,400',
      popular: true,
      warranty: '24 Months On-site Warranty',
      included: ['Supports Tubular & Flat Plate', 'Eco & UPS Modes', 'Fast Microcontroller'],
      tamilIncluded: ['டியூபுலர் பேட்டரி ஆதரவு', 'Eco மற்றும் UPS மோடு', 'வேகமான மைக்ரோகன்ட்ரோலர்']
    },
    {
      id: 'inv-3',
      name: '1500VA–2000VA High-Capacity UPS',
      tamilName: '1500VA–2000VA அதிக திறன் கொண்ட UPS',
      capacity: '1500VA–2kVA (12V or 24V)',
      backupNote: 'Runs home appliances, computer systems, and commercial load',
      tamilBackupNote: 'அதிக உபகரணங்கள் மற்றும் அலுவலக பயன்பாட்டிற்கு ஏற்றது',
      priceRange: '₹9,800 – ₹14,500',
      warranty: '24 to 36 Months Warranty',
      included: ['Heavy Transformer Core', 'Bypass Switch Compatible', 'Dual Fan Cooling'],
      tamilIncluded: ['ஹெவி டிரான்ஸ்பார்மர் கோர்', 'பைபாஸ் சுவிட்ச் வசதி', 'இரட்டை கூலிங் ஃபேன்']
    }
  ];

  const roSystems: PackageOption[] = [
    {
      id: 'ro-1',
      name: '7L Classic UV + UF Purifier',
      tamilName: '7L கிளாசிக் UV + UF பியூரிஃபையர்',
      capacity: '7-8 Liters Storage Tank',
      backupNote: 'Best for municipal / Kaveri river water (TDS under 250)',
      tamilBackupNote: 'நகராட்சி / காவிரி குடிநீருக்கு மிகவும் பொருத்தமானது (TDS < 250)',
      priceRange: '₹6,500 – ₹7,800',
      warranty: '1 Year Warranty',
      included: ['Sediment + Carbon + UV + UF', 'Food Grade Plastic Tank', 'Free Wall Mounting'],
      tamilIncluded: ['செடிமென்ட், கார்பன், UV, UF', 'உணவு தர பிளாஸ்டிக் தொட்டி', 'சுவர் பொருத்துதல் இலவசம்']
    },
    {
      id: 'ro-2',
      name: '10L Multi-Stage RO + UV + TDS Controller',
      tamilName: '10L மல்டி-ஸ்டேஜ் RO + UV + TDS கன்ட்ரோலர்',
      capacity: '10 Liters Storage Tank',
      backupNote: 'Ideal for Vaniyambadi borewells (TDS 300 to 1200)',
      tamilBackupNote: 'வாணியம்பாடி போர்வெல் தண்ணீருக்கு மிகச் சிறந்தது (TDS 300 முதல் 1200)',
      priceRange: '₹8,999 – ₹10,800',
      popular: true,
      warranty: '1 Year Comprehensive Warranty',
      included: ['100 GPD Booster Pump', 'TDS Controller for Sweet Taste', 'Pre-Filter Housing Kit'],
      tamilIncluded: ['100 GPD பூஸ்டர் பம்ப்', 'சுவைக்கான TDS கன்ட்ரோலர்', 'ப்ரீ-ஃபில்டர் ஹவுசிங் கிட்']
    },
    {
      id: 'ro-3',
      name: '12L Copper + Alkaline Mineral RO',
      tamilName: '12L காப்பர் + ஆல்கலைன் மினரல் RO',
      capacity: '12 Liters Heavy Storage',
      backupNote: 'High TDS borewells with active Copper and Alkaline enrichment',
      tamilBackupNote: 'அதிக உப்புத்தன்மை நீர் & காப்பர் ஆல்கலைன் தாதுக்கள் நிறைந்தது',
      priceRange: '₹11,999 – ₹13,500',
      warranty: '1 Year Warranty + 1 Free Service Kit',
      included: ['Active Copper Cartridge', 'Alkaline Mineralizer (pH 8.0)', 'High Rejection Membrane'],
      tamilIncluded: ['ஆக்டிவ் காப்பர் கார்ட்ரிட்ஜ்', 'ஆல்கலைன் தாதுக்கள் (pH 8.0)', 'ஹை-ரிஜெக்ஷன் மெம்ப்ரேன்']
    }
  ];

  const serviceOptions: PackageOption[] = [
    {
      id: 'serv-1',
      name: 'Doorstep Electrician Diagnostic & Repair',
      tamilName: 'எலக்ட்ரீஷியன் ஆய்வு & பழுது நீக்குதல்',
      capacity: 'Single Visit / Inspection',
      backupNote: 'Home wiring check, MCB tripping fix, switch replacement',
      tamilBackupNote: 'வீட்டு வயரிங் ஆய்வு, MCB பழுது, சுவிட்ச் மாற்றுதல்',
      priceRange: '₹199 – ₹350 (Visit Charge)',
      warranty: 'Verified Local Technician',
      included: ['Phase & Neutral Inspection', 'Earthing Test', 'Transparent Estimate Before Work'],
      tamilIncluded: ['பேஸ் & நியூட்ரல் ஆய்வு', 'எர்த்திங் சோதனை', 'முன்கூட்டியே விலை மதிப்பீடு']
    },
    {
      id: 'serv-2',
      name: 'Inverter Home Wiring & Bypass Setup',
      tamilName: 'இன்வெர்ட்டர் வயரிங் & பைபாஸ் சுவிட்ச் பொருத்துதல்',
      capacity: 'Complete Installation',
      backupNote: 'Independent wiring so inverter failure never cuts main power',
      tamilBackupNote: 'இன்வெர்ட்டர் பழுதானாலும் மெயின் பவர் தடைபடாத பைபாஸ் இணைப்பு',
      priceRange: '₹450 – ₹850',
      warranty: '100% Tested Safety Setup',
      included: ['Rotary Bypass Switch Installation', 'Battery Terminal Greasing', 'Load Balancing'],
      tamilIncluded: ['பைபாஸ் சுவிட்ச் பொருத்துதல்', 'டெர்மினல் கிரீசிங்', 'லோடு பேலன்சிங்']
    },
    {
      id: 'serv-3',
      name: 'RO Periodic Filter Service & TDS Tuning',
      tamilName: 'RO வழக்கமான சர்வீஸ் & TDS டியூனிங்',
      capacity: 'Periodic Maintenance',
      backupNote: 'Pre-filter candle replacement, membrane flush & TDS check',
      tamilBackupNote: 'ஸ்பன் கேண்டில் மாற்றுதல், மெம்ப்ரேன் வாஷ் & TDS செக்',
      priceRange: '₹450 – ₹950 (Includes Spun Candle)',
      warranty: '30 Days Service Guarantee',
      included: ['Digital Water TDS Testing', 'New Sediment Pre-Filter Candle', 'Tank Sanitization'],
      tamilIncluded: ['டிஜிட்டல் TDS சோதனை', 'புதிய செடிமென்ட் கேண்டில்', 'தொட்டி கிருமி நீக்கம்']
    }
  ];

  const currentList =
    activeTab === 'combos'
      ? combos
      : activeTab === 'batteries'
      ? batteries
      : activeTab === 'inverters'
      ? inverters
      : activeTab === 'ro'
      ? roSystems
      : serviceOptions;

  const handleWhatsAppQuote = (pkg: PackageOption) => {
    onSelectProduct(pkg.name);
    const msg = `Hello Hitek Solutions!\nI am interested in: ${pkg.name} (${pkg.capacity}).\nPrice Range: ${pkg.priceRange}.\nPlease confirm latest stock and doorstep delivery time in Vaniyambadi.`;
    window.open(`https://wa.me/919150051486?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenAlertModal = (pkg?: PackageOption) => {
    setAlertPkg(pkg || combos[1]); // Default to popular combo if opened from banner
    setAlertSubmitted(false);
    setIsAlertModalOpen(true);
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;

    // Save alert to localStorage
    try {
      const existingAlerts = JSON.parse(localStorage.getItem('hitek_price_drop_alerts') || '[]');
      const newAlert = {
        id: `alert-${Date.now()}`,
        model: alertPkg?.name || 'Inverter/RO Model',
        email: alertEmail.trim(),
        phone: alertPhone.trim(),
        threshold: alertThreshold,
        date: new Date().toISOString()
      };
      localStorage.setItem('hitek_price_drop_alerts', JSON.stringify([newAlert, ...existingAlerts]));
    } catch (err) {
      // Ignore storage error
    }

    setAlertSubmitted(true);
  };

  return (
    <section id="pricing" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Tag className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{t.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Price Drop Alert Trigger Button in Header */}
          <div className="self-start md:self-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenAlertModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f5f7f4] hover:bg-[#e8eee5] text-[#102b2a] border border-[#bac9c0] text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <Bell className="w-4 h-4 text-[#507d38] animate-bounce" />
              <span>{lang === 'ta' ? 'விலை குறைவு எச்சரிக்கை அமைக்க' : 'Set Price Drop Alert'}</span>
            </button>
          </div>
        </div>

        {/* Promotional Price Drop Alert Banner Strip */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#f0f4ee] border border-[#bac9c0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#dcff73] text-[#102b2a] flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#102b2a] block">
                {lang === 'ta' ? 'பண்டிகை கால சிறப்பு தள்ளுபடி எச்சரிக்கை' : 'Festival & Seasonal Price Drop Notifications'}
              </strong>
              <span className="text-[#526460]">
                {lang === 'ta'
                  ? 'உங்கள் விருப்பமான இன்வெர்ட்டர் அல்லது RO விலை குறையும் போது மின்னஞ்சல் மூலம் உடனே அறியலாம்.'
                  : 'Subscribe for instant email alerts whenever prices drop on top inverters, tall tubular batteries, or RO systems.'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenAlertModal()}
            className="px-4 py-2 bg-[#102b2a] text-white font-bold rounded-lg hover:bg-[#1a4442] transition-colors cursor-pointer shrink-0"
          >
            {lang === 'ta' ? 'எச்சரிக்கை பெறுக' : 'Get Price Alerts'}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('combos')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'combos'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dcff73]" />
            <span>{t.tabs.combos}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inverters')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'inverters'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{t.tabs.inverters}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batteries')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'batteries'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            <Battery className="w-3.5 h-3.5" />
            <span>{t.tabs.batteries}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ro')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'ro'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{t.tabs.ro}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.tabs.services}</span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentList.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-[#f5f7f4] border rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md ${
                pkg.popular
                  ? 'border-[#507d38] ring-1 ring-[#507d38]/30 bg-[#f9fbf8]'
                  : 'border-[#d9e1da]'
              }`}
            >
              <div>
                {/* Popular / Capacity Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#507d38] uppercase">
                    {pkg.capacity}
                  </span>
                  {pkg.popular && (
                    <span className="text-[11px] font-bold text-[#102b2a] bg-[#dcff73] px-2 py-0.5 rounded">
                      {lang === 'ta' ? 'அதிக விற்பனை' : 'Most Popular'}
                    </span>
                  )}
                </div>

                {/* Package Name */}
                <h3 className="text-lg font-black text-[#102b2a] mb-1">
                  {lang === 'ta' ? pkg.tamilName : pkg.name}
                </h3>

                {/* Backup / Usage Note */}
                <p className="text-xs text-[#526460] mb-4 font-medium">
                  {lang === 'ta' ? pkg.tamilBackupNote : pkg.backupNote}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-white border border-[#e2e8e0] mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-[#526460] uppercase tracking-wider">
                      {t.estimatedPrice}
                    </span>

                    {/* Quick Price Drop Bell on Card */}
                    <button
                      type="button"
                      onClick={() => handleOpenAlertModal(pkg)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#507d38] hover:text-[#102b2a] cursor-pointer"
                      title="Set alert if price drops"
                    >
                      <Bell className="w-3 h-3" />
                      <span>{lang === 'ta' ? 'விலை குறைவு எச்சரிக்கை' : 'Alert on Drop'}</span>
                    </button>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-[#102b2a] font-mono tabular-nums">
                    {pkg.priceRange}
                  </div>

                  {pkg.scrapSaving && (
                    <div className="mt-2 pt-2 border-t border-[#f0f4f0] flex items-center gap-1.5 text-[11px] font-semibold text-[#507d38]">
                      <RefreshCw className="w-3 h-3 shrink-0" />
                      <span>{pkg.scrapSaving}</span>
                    </div>
                  )}

                  <div className="text-[10px] text-[#526460] mt-1">
                    {pkg.warranty}
                  </div>
                </div>

                {/* Included Checklist */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#102b2a] block mb-2">
                    {t.included}
                  </span>
                  <ul className="space-y-1.5">
                    {(lang === 'ta' ? pkg.tamilIncluded : pkg.included).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#37474f]">
                        <Check className="w-3.5 h-3.5 text-[#507d38] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Quote & Price Drop Alert */}
              <div className="pt-4 border-t border-[#d9e1da] space-y-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote(pkg)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#102b2a] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#1a4442] transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#dcff73]" />
                  <span>{t.whatsappQuote}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer footer */}
        <p className="text-xs text-[#526460] leading-relaxed max-w-4xl">
          {t.disclaimer}
        </p>

        {/* Price Drop Alert Modal */}
        {isAlertModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 border border-[#d9e1da] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between pb-4 border-b border-[#dce4de] mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#102b2a]">
                      {lang === 'ta' ? 'விலை குறைவு எச்சரிக்கை' : 'Price Drop Alert'}
                    </h3>
                    <p className="text-xs text-[#526460]">
                      {lang === 'ta' ? 'விலை குறையும் போது உடனடியாக அறியுங்கள்' : 'Get notified as soon as prices decrease'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAlertModalOpen(false)}
                  className="p-1.5 text-[#526460] hover:text-[#102b2a] rounded-lg hover:bg-[#e8eee5] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!alertSubmitted ? (
                <form onSubmit={handleAlertSubmit} className="space-y-4">
                  {/* Selected Model */}
                  <div>
                    <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட தயாரிப்பு' : 'Selected Model / Package'}
                    </label>
                    <div className="p-3 rounded-xl bg-[#f5f7f4] border border-[#dce4de] text-xs">
                      <strong className="text-[#102b2a] block">
                        {lang === 'ta' ? alertPkg?.tamilName : alertPkg?.name}
                      </strong>
                      <div className="flex items-center justify-between text-[#507d38] font-mono font-bold mt-1">
                        <span>{alertPkg?.capacity}</span>
                        <span>{alertPkg?.priceRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="alert-email" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'உங்கள் மின்னஞ்சல் முகவரி' : 'Your Email Address'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#97aaa1] absolute left-3 top-3" />
                      <input
                        id="alert-email"
                        type="email"
                        required
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        placeholder="e.g. customer@gmail.com"
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                      />
                    </div>
                  </div>

                  {/* Optional Phone / WhatsApp */}
                  <div>
                    <label htmlFor="alert-phone" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'வாட்ஸ்அப் எண் (தேவையெனில்)' : 'WhatsApp Number (Optional)'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#97aaa1] absolute left-3 top-3" />
                      <input
                        id="alert-phone"
                        type="tel"
                        value={alertPhone}
                        onChange={(e) => setAlertPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                      />
                    </div>
                  </div>

                  {/* Price Drop Threshold Preference */}
                  <div>
                    <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'எப்போது அறிவிக்க வேண்டும்?' : 'When to notify?'}
                    </label>
                    <select
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    >
                      <option value="any">{lang === 'ta' ? 'எந்த விலை குறைவு அல்லது பண்டிகை சலுகைக்கும்' : 'Any price drop or festival discount'}</option>
                      <option value="500">{lang === 'ta' ? 'விலை ₹500 அல்லது அதற்கு மேல் குறையும் போது' : 'When price drops by ₹500 or more'}</option>
                      <option value="1500">{lang === 'ta' ? 'விலை ₹1,500 அல்லது அதற்கு மேல் குறையும் போது' : 'When price drops by ₹1,500 or more (Mega discount)'}</option>
                    </select>
                  </div>

                  <div className="pt-3 border-t border-[#dce4de] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAlertModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-bold text-[#526460] hover:text-[#102b2a]"
                    >
                      {lang === 'ta' ? 'ரத்து' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Bell className="w-4 h-4 text-[#dcff73]" />
                      <span>{lang === 'ta' ? 'எச்சரிக்கையை செயல்படுத்த' : 'Set Alert'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Success View */
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#102b2a]">
                      {lang === 'ta' ? 'விலை குறைவு எச்சரிக்கை பதிவு செய்யப்பட்டது!' : 'Price Drop Alert Activated!'}
                    </h4>
                    <p className="text-xs text-[#526460] mt-1 leading-relaxed">
                      {lang === 'ta'
                        ? `${alertEmail} என்ற மின்னஞ்சலுக்கு இந்த மாடலின் விலை குறையும் போது உடனடியாக தகவல் அனுப்பப்படும்.`
                        : `We have subscribed ${alertEmail}. We will notify you the moment ${alertPkg?.name} drops in price at our Malang Road store.`}
                    </p>
                  </div>

                  <div className="p-3 bg-[#f5f7f4] rounded-xl border border-[#dce4de] text-xs text-[#37474f] font-medium">
                    {lang === 'ta' ? 'இன்றைய நேரடி டீல் பற்றி அறிய விரும்புகிறீர்களா?' : 'Need an instant offline festival quote today?'}
                    <a
                      href={`https://wa.me/919150051486?text=${encodeURIComponent(
                        `Hello Hitek Solutions! I subscribed for a price drop alert on ${alertPkg?.name}. Do you have any current showroom clearance or exchange discount today?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-1 text-[#507d38] font-bold hover:underline"
                    >
                      {lang === 'ta' ? 'வாட்ஸ்அப்பில் உடனே கேட்க' : 'Chat with store manager on WhatsApp'} &rarr;
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAlertModalOpen(false)}
                    className="w-full py-2.5 bg-[#102b2a] text-white font-bold text-xs rounded-xl hover:bg-[#1a4442] transition-colors"
                  >
                    {lang === 'ta' ? 'சரி' : 'Done'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
