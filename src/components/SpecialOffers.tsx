import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Clock, ArrowRight, ChevronLeft, ChevronRight, Check, ShieldCheck, Percent, MessageSquare } from 'lucide-react';
import { Language } from '../translations';

interface SpecialOffersProps {
  lang: Language;
  onClaimOffer: (offerName: string) => void;
}

interface Offer {
  id: string;
  badge: string;
  tamilBadge: string;
  title: string;
  tamilTitle: string;
  subtitle: string;
  tamilSubtitle: string;
  originalPrice: string;
  offerPrice: string;
  savings: string;
  tamilSavings: string;
  perks: string[];
  tamilPerks: string[];
  validity: string;
  tamilValidity: string;
  whatsappMessage: string;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ lang, onClaimOffer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const offers: Offer[] = [
    {
      id: 'offer-1',
      badge: 'Season Bestseller Combo',
      tamilBadge: 'பருவகால சிறந்த காம்போ',
      title: 'Complete 2-3 BHK Inverter + 150Ah Tall Tubular Battery + Trolley',
      tamilTitle: '2-3 BHK இன்வெர்ட்டர் + 150Ah டால் டியூபுலர் பேட்டரி + ட்ராலி காம்போ',
      subtitle: 'Pure Sine Wave 900VA Home UPS with 150Ah heavy duty battery and shockproof trolley',
      tamilSubtitle: 'பியூர் சைன் வேவ் 900VA UPS, 150Ah பேட்டரி மற்றும் பாதுகாப்பான ட்ராலி',
      originalPrice: '₹22,500',
      offerPrice: '₹18,999',
      savings: 'Save ₹3,501 (15% Off)',
      tamilSavings: '₹3,501 சேமிப்பு (15% தள்ளுபடி)',
      perks: [
        'Free doorstep delivery & installation in Vaniyambadi',
        'Official 36 to 60 Months Warranty Registration Card',
        'Extra scrap buyback discount for old dead battery',
        'Shockproof 4-wheel inverter battery trolley included'
      ],
      tamilPerks: [
        'வாணியம்பாடியில் இலவச வீட்டு டெலிவரி & பொருத்துதல்',
        '36 முதல் 60 மாதங்கள் அதிகாரப்பூர்வ உத்தரவாத அட்டை',
        'பழைய பேட்டரிக்கு கூடுதல் எக்ஸ்சேஞ்ச் தள்ளுபடி',
        '4 சக்கர அதிர்வு தாங்கும் ட்ராலி இலவசம்'
      ],
      validity: 'Limited stock at Malang Road store',
      tamilValidity: 'மலாங் ரோடு கடையில் குறிப்பிட்ட இருப்பு மட்டுமே',
      whatsappMessage: 'Hello Hitek Solutions! I want to claim the Season Bestseller Combo (900VA Inverter + 150Ah Battery + Trolley) for the special price of ₹18,999. Please confirm stock and delivery.'
    },
    {
      id: 'offer-2',
      badge: 'Healthy Water Bundle',
      tamilBadge: 'ஆரோக்கிய குடிநீர் சலுகை',
      title: '12L Copper + Alkaline Mineral RO Purifier + 1 Year Free Service Kit',
      tamilTitle: '12L காப்பர் + ஆல்கலைன் மினரல் RO பியூரிஃபையர் + 1 வருட இலவச கிட்',
      subtitle: 'Multi-stage RO+UV with active Copper-Zinc enrichment and free extra pre-filter candle',
      tamilSubtitle: 'காப்பர்-ஜிங்க் தாதுக்கள் மற்றும் இலவச ப்ரீ-ஃபில்டர் கேண்டிலுடன் கூடிய RO அமைப்பு',
      originalPrice: '₹15,499',
      offerPrice: '₹11,999',
      savings: 'Save ₹3,500 (22% Off)',
      tamilSavings: '₹3,500 சேமிப்பு (22% தள்ளுபடி)',
      perks: [
        'Free digital water TDS test before & after installation',
        'High rejection membrane for borewell water up to 1500 ppm',
        '1 extra spun polypropylene pre-filter candle included free',
        'Free wall mounting & food-grade pipe plumbing'
      ],
      tamilPerks: [
        'பொருத்துவதற்கு முன்பும் பின்பும் இலவச டிஜிட்டல் TDS சோதனை',
        '1500 ppm வரை உள்ள போர்வெல் தண்ணீருக்கும் ஏற்றது',
        '1 கூடுதல் ஸ்பன் ப்ரீ-ஃபில்டர் கேண்டில் இலவசம்',
        'சுவர் பொருத்துதல் மற்றும் உணவு தர குழாய் இணைப்பு இலவசம்'
      ],
      validity: 'Valid for first 20 bookings this month',
      tamilValidity: 'இந்த மாதத்தின் முதல் 20 முன்பதிவுகளுக்கு மட்டும்',
      whatsappMessage: 'Hello Hitek Solutions! I want to claim the Healthy Water Bundle (12L Copper Alkaline RO at ₹11,999 with Free Service Kit). Please schedule doorstep testing.'
    },
    {
      id: 'offer-3',
      badge: 'Extended Heavy-Duty Backup',
      tamilBadge: 'நீண்ட நேர ஹெவி-டியூட்டி பேக்கப்',
      title: '1150VA Inverter + 200Ah Jumbo Tubular Battery (Runs Inverter Fridge)',
      tamilTitle: '1150VA இன்வெர்ட்டர் + 200Ah ஜம்போ டியூபுலர் பேட்டரி (பிரிட்ஜ் உட்பட இயங்கும்)',
      subtitle: 'Engineered for storm blackouts: runs fans, lights, TV, Wi-Fi & refrigerator for 7+ hours',
      tamilSubtitle: 'புயல் மற்றும் மின்வெட்டுகளுக்கு ஏற்றது: பிரிட்ஜ், மின்விசிறிகள் மற்றும் விளக்குகள் 7+ மணி நேரம் இயங்கும்',
      originalPrice: '₹28,500',
      offerPrice: '₹23,999',
      savings: 'Save ₹4,501 (16% Off)',
      tamilSavings: '₹4,501 சேமிப்பு (16% தள்ளுபடி)',
      perks: [
        'Heavy-duty bypass switch wiring included',
        'Ultra-low maintenance tall tubular alloy technology',
        'Supports high surge load of modern inverter refrigerators',
        'Free priority service visit warranty for 3 years'
      ],
      tamilPerks: [
        'ஹெவி-டியூட்டி பைபாஸ் சுவிட்ச் வயரிங் இலவசம்',
        'குறைந்த பராமரிப்பு தேவைப்படும் டால் டியூபுலர் தொழில்நுட்பம்',
        'நவீன இன்வெர்ட்டர் பிரிட்ஜின் சுமையைத் தாங்கும் திறன்',
        '3 வருட இலவச முன்னுரிமை சர்வீஸ் ஆதரவு'
      ],
      validity: 'Valid across Vaniyambadi town',
      tamilValidity: 'வாணியம்பாடி பகுதி முழுவதும் பொருந்தும்',
      whatsappMessage: 'Hello Hitek Solutions! I want to claim the 1150VA + 200Ah Jumbo Heavy Backup offer at ₹23,999. Please share brand availability.'
    },
    {
      id: 'offer-4',
      badge: 'Home Health & Safety Special',
      tamilBadge: 'வீட்டு பாதுகாப்பு & சர்வீஸ் சலுகை',
      title: 'Electrician Home Safety Audit + RO TDS Check & Filter Candle Change',
      tamilTitle: 'எலக்ட்ரீஷியன் பாதுகாப்பு ஆய்வு + RO ஃபில்டர் கேண்டில் மாற்றம்',
      subtitle: 'Complete electrical MCB/earthing test + RO pre-filter service to prevent expensive breakdowns',
      tamilSubtitle: 'மின்சார MCB/எர்த்திங் ஆய்வு மற்றும் புதிய RO கேண்டில் மாற்றம் ஒரே வருகையில்',
      originalPrice: '₹1,200',
      offerPrice: '₹599',
      savings: 'Save ₹601 (50% Off)',
      tamilSavings: '₹601 சேமிப்பு (50% தள்ளுபடி)',
      perks: [
        'Main distribution board, earthing & phase voltage check',
        'New spun polypropylene pre-filter candle installed',
        'Full digital water TDS & pressure test',
        'Technician visit included in Muslimpur, Khaderpet & Newtown'
      ],
      tamilPerks: [
        'மெயின் சுவிட்ச்போர்டு, எர்த்திங் மற்றும் வோல்டேஜ் பரிசோதனை',
        'புதிய ஸ்பன் ப்ரீ-ஃபில்டர் கேண்டில் பொருத்துதல்',
        'டிஜிட்டல் குடிநீர் TDS & பிரஷர் பரிசோதனை',
        'வாணியம்பாடியில் இன்ஜினியர் வருகை கட்டணம் இதில் அடங்கும்'
      ],
      validity: 'Limited daily service slots',
      tamilValidity: 'தினசரி குறிப்பிட்ட முன்பதிவுகள் மட்டுமே',
      whatsappMessage: 'Hello Hitek Solutions! I want to book the Home Safety & RO Service Combo for ₹599. Please schedule an engineer visit.'
    }
  ];

  // Auto rotation effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, offers.length]);

  const currentOffer = offers[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleClaim = (offer: Offer) => {
    onClaimOffer(offer.title);
    window.open(`https://wa.me/919150051486?text=${encodeURIComponent(offer.whatsappMessage)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="special-offers" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'சிறப்பு சலுகைகள் & பண்டல்' : 'Limited-Time Seasonal Specials'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'வாணியம்பாடி சிறப்பு தள்ளுபடிகள்.' : 'Special Offers & Bundles.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {lang === 'ta'
                ? 'நேரடி சேமிப்புடன் கூடிய இன்வெர்ட்டர் + பேட்டரி காம்போ மற்றும் RO குடிநீர் சுத்திகரிப்பு சிறப்பு தொகுப்புகள்.'
                : 'Curated promotional bundles offering maximum savings on complete backup systems, water purifiers, and home engineering visits.'}
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-mono font-bold text-[#526460]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(offers.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous promotional offer"
                className="w-9 h-9 rounded-lg border border-[#bac9c0] bg-white flex items-center justify-center text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next promotional offer"
                className="w-9 h-9 rounded-lg border border-[#bac9c0] bg-white flex items-center justify-center text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Promotional Banner Card */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-white border border-[#d9e1da] rounded-2xl overflow-hidden shadow-sm transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Main Offer Details (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Badge & Validity Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold text-[#102b2a] bg-[#dcff73] px-3 py-1 rounded-md">
                    {lang === 'ta' ? currentOffer.tamilBadge : currentOffer.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#526460]">
                    <Clock className="w-3.5 h-3.5 text-[#507d38]" />
                    <span>{lang === 'ta' ? currentOffer.tamilValidity : currentOffer.validity}</span>
                  </div>
                </div>

                {/* Offer Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#102b2a] mb-2 leading-tight">
                  {lang === 'ta' ? currentOffer.tamilTitle : currentOffer.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-[#526460] leading-relaxed mb-6">
                  {lang === 'ta' ? currentOffer.tamilSubtitle : currentOffer.subtitle}
                </p>

                {/* Perks Checklist */}
                <div className="space-y-2.5 mb-8">
                  {(lang === 'ta' ? currentOffer.tamilPerks : currentOffer.perks).map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#37474f]">
                      <Check className="w-4 h-4 text-[#507d38] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Micro Trust */}
              <div className="pt-4 border-t border-[#f0f4f0] flex items-center justify-between text-xs text-[#526460]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#507d38]" />
                  <span>100% Genuine Branded Equipment</span>
                </div>
                <span>Malang Road Showroom</span>
              </div>
            </div>

            {/* Right Deal Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-[#102b2a] text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#38504d] relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#205047]/40 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs font-mono font-bold text-[#dcff73] tracking-widest uppercase block mb-2">
                  {lang === 'ta' ? 'சிறப்பு தள்ளுபடி விலை' : 'Discounted Bundle Price'}
                </span>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums">
                    {currentOffer.offerPrice}
                  </span>
                  <span className="text-lg text-[#bbceca] line-through font-mono">
                    {currentOffer.originalPrice}
                  </span>
                </div>

                {/* Savings Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#dcff73]/20 text-[#dcff73] text-xs font-bold mb-6">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? currentOffer.tamilSavings : currentOffer.savings}</span>
                </div>

                <p className="text-xs text-[#bbceca] leading-relaxed mb-6">
                  {lang === 'ta'
                    ? 'வாணியம்பாடியில் இலவச வீட்டு டெலிவரி மற்றும் பொருத்துதல் இதில் அடங்கும். பழைய பேட்டரியை கொடுத்து மேலும் கூடுதல் கழிவு பெறலாம்.'
                    : 'Includes full manufacturer warranty, standard wiring installation in Vaniyambadi, and transparent scrap exchange buyback.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 space-y-3">
                <button
                  type="button"
                  onClick={() => handleClaim(currentOffer)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#dcff73] text-[#102b2a] font-black text-sm rounded-lg hover:bg-[#cbe663] transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'இந்த சலுகையை வாட்ஸ்அப்பில் பெற' : 'Claim Offer on WhatsApp'}</span>
                </button>

                <div className="text-center">
                  <a
                    href="tel:+919150051486"
                    className="text-xs text-[#bbceca] hover:text-white transition-colors"
                  >
                    {lang === 'ta' ? 'அல்லது நேரடியாக அழைக்க:' : 'Or speak to our store:'} <strong className="text-white font-mono">91500 51486</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots & All Offers Quick Select */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {offers.map((offer, idx) => (
            <button
              key={offer.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#102b2a]' : 'w-2 bg-[#bac9c0] hover:bg-[#526460]'
              }`}
              aria-label={`Go to offer ${idx + 1}: ${offer.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
