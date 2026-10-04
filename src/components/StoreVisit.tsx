import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle, Copy, Check, ExternalLink, Compass, QrCode } from 'lucide-react';
import { Language } from '../translations';
import { CoverageMap } from './CoverageMap';

interface StoreVisitProps {
  lang?: Language;
  onOpenQrModal?: () => void;
}

export const StoreVisit: React.FC<StoreVisitProps> = ({ lang = 'en', onOpenQrModal }) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = 'Hitek Solutions, No.33, 325, Malang Road, Muslimpur, Opposite Karur Vysya Bank, Vaniyambadi, Tamil Nadu 635751';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="visit" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#507d38] uppercase block mb-2">
              {lang === 'ta' ? 'எங்களை நேரில் சந்திக்க' : 'Come say hello'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'மலாங் ரோட்டில் உள்ள கடை.' : 'Right here.\nOn Malang Road.'}
            </h2>
            <p className="text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {lang === 'ta'
                ? 'இன்வெர்ட்டர், பேட்டரி, RO குடிநீர் பியூரிஃபையர்களை நேரில் பார்க்கவும், குடிநீர் உப்புத்தன்மையை இலவசமாக பரிசோதிக்கவும் எங்கள் கடைக்கு வாருங்கள்.'
                : 'Visit Hitek Solutions to see inverters and RO purifiers in person, test your water sample, check battery stock, or speak directly with our service engineers.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {onOpenQrModal && (
              <button
                type="button"
                onClick={onOpenQrModal}
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#102b2a] text-[#102b2a] bg-[#dcff73] hover:bg-[#cbe663] font-bold text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>{lang === 'ta' ? 'மொபைல் QR குறியீடு' : 'Scan Page QR'}</span>
              </button>
            )}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Hitek+Solutions+Malang+Road+Vaniyambadi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#97aaa1] text-[#102b2a] bg-white font-bold text-sm rounded-xl hover:bg-[#e8eee5] transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4 text-[#507d38]" />
              <span>{lang === 'ta' ? 'கூகிள் வரைபடத்தில் திறக்க' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#526460]" />
            </a>
          </div>
        </div>

        {/* 2 Columns: Address & Contact (Top) + Full Interactive Map (Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Left Column: Address & Landmark Details (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#d9e1da] p-6 sm:p-8 shadow-xs">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-6 h-6 text-[#102b2a]" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-[#507d38] uppercase tracking-wider block mb-1">
                  {lang === 'ta' ? 'முக்கிய அடையாளம்: கரூர் வைஸ்யா வங்கி எதிரில்' : 'Prominent Landmark: Opposite Karur Vysya Bank'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#102b2a] mb-1">
                  Hitek Solutions
                </h3>
                <address className="not-italic text-sm text-[#526460] leading-relaxed">
                  No.33, 325, Malang Road, Muslimpur,<br />
                  Vaniyambadi, Tamil Nadu 635751, India.
                </address>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#507d38] hover:text-[#102b2a] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Address Copied!') : (lang === 'ta' ? 'முகவரியை நகலெடு' : 'Copy Full Address')}</span>
                  </button>
                  <span className="text-[#bac9c0]">•</span>
                  <span className="text-xs text-[#526460]">{lang === 'ta' ? 'இலவச பைக் & கார் பார்க்கிங் வசதி உண்டு' : 'Easy bike & auto parking in front'}</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#dce4de] text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f5f7f4] border border-[#e2e8e0]">
                <Clock className="w-4 h-4 text-[#507d38] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#102b2a] block">
                    {lang === 'ta' ? 'திங்கள் – சனிக்கிழமை:' : 'Monday – Saturday:'}
                  </strong>
                  <span className="text-[#526460]">9:00 AM – 9:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f5f7f4] border border-[#e2e8e0]">
                <Clock className="w-4 h-4 text-[#507d38] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#102b2a] block">
                    {lang === 'ta' ? 'ஞாயிற்றுக்கிழமை:' : 'Sunday:'}
                  </strong>
                  <span className="text-[#526460]">9:30 AM – 2:00 PM (Emergency on-call)</span>
                </div>
              </div>
            </div>

            {/* Nearby Transit Distances */}
            <div className="mt-4 pt-4 border-t border-[#dce4de] flex flex-wrap items-center gap-4 text-xs text-[#526460]">
              <div className="flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-[#507d38]" />
                <span>0.8 km from Vaniyambadi New Bus Stand</span>
              </div>
              <span className="text-[#bac9c0] hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-[#507d38]" />
                <span>1.4 km from Vaniyambadi Railway Station</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact & Hotline (5 cols) */}
          <div className="lg:col-span-5 bg-[#102b2a] text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <span className="text-xs font-extrabold tracking-widest text-[#dcff73] uppercase block mb-3">
              {lang === 'ta' ? 'நேரடி அழைப்பு & வாட்ஸ்அப்' : 'Direct Call & WhatsApp Support'}
            </span>

            <div className="mb-6">
              <a
                href="tel:+919150051486"
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight hover:text-[#dcff73] transition-colors block tabular-nums"
              >
                +91 91500 51486
              </a>
              <p className="text-xs sm:text-sm text-[#bbceca] mt-2 leading-relaxed">
                {lang === 'ta'
                  ? 'கடைக்கு வருவதற்கு முன் தற்போதைய ஸ்டாக், விலை அல்லது இன்ஜினியர் வருகையை உறுதி செய்ய அழைக்கலாம்.'
                  : 'Call ahead for stock availability, immediate engineer dispatch, or old battery exchange valuation.'}
              </p>
            </div>

            {/* Reassurance points */}
            <div className="space-y-2.5 mb-8 text-xs text-[#bbceca]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#dcff73] shrink-0" />
                <span>Immediate phone assistance &amp; WhatsApp query support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#dcff73] shrink-0" />
                <span>Free doorstep inspection for inverter &amp; RO setups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#dcff73] shrink-0" />
                <span>Genuine warranty card stamped directly at shop</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919150051486?text=Hello%20Hitek%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%20at%20Malang%20Road%20store."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#dcff73] text-[#102b2a] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#cbe663] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+919150051486"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#38504d] hover:bg-[#1d3c3a] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-[#dcff73]" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="bg-white rounded-2xl border border-[#d9e1da] overflow-hidden shadow-sm">
          {/* Map Top Bar */}
          <div className="px-6 py-4 bg-[#f9fbf8] border-b border-[#dce4de] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-xs sm:text-sm font-black text-[#102b2a]">
                Interactive Map Location: Malang Road, Muslimpur, Vaniyambadi
              </strong>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hitek+Solutions+Malang+Road+Vaniyambadi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#507d38] hover:text-[#102b2a] flex items-center gap-1"
              >
                <span>Navigate via Google Maps App</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Map Viewport iframe */}
          <div className="relative w-full h-[380px] sm:h-[440px] bg-[#e5e3df]">
            <iframe
              title="Hitek Solutions Malang Road Vaniyambadi Interactive Map"
              src="https://maps.google.com/maps?q=Malang+Road+Muslimpur+Vaniyambadi+Tamil+Nadu+635751&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* In-Map Floating Marker Card */}
            <div className="absolute top-4 left-4 max-w-xs bg-white/95 backdrop-blur-md border border-[#d9e1da] p-3.5 rounded-xl shadow-lg hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <h4 className="text-xs font-black text-[#102b2a]">Hitek Solutions</h4>
              </div>
              <p className="text-[11px] text-[#526460] leading-snug">
                Opposite Karur Vysya Bank, Malang Road, Vaniyambadi 635751
              </p>
              <div className="mt-2 pt-2 border-t border-[#eef2ec] flex items-center justify-between text-[10px]">
                <span className="text-[#507d38] font-bold">Open Mon–Sat until 9:30 PM</span>
                <a
                  href="tel:+919150051486"
                  className="font-bold text-[#102b2a] hover:underline"
                >
                  91500 51486
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Interactive SVG Service Coverage Map of Vaniyambadi */}
        <div className="mt-12">
          <CoverageMap lang={lang} />
        </div>
      </div>
    </section>
  );
};
