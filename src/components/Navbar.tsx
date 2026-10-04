import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowUpRight, Languages, Sun, Moon, Search, Mic, MicOff, Sparkles, ArrowRight, QrCode } from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenEnquiry: (product?: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onToggleSidebar?: () => void;
  activeSection?: string;
  onOpenQrModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenEnquiry,
  isDarkMode = false,
  onToggleTheme,
  onToggleSidebar,
  activeSection,
  onOpenQrModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang].nav;

  const getLinkClass = (id: string, isSpecialGreen: boolean = false) => {
    const isActive = activeSection === id;
    if (isActive) {
      return 'text-[#102b2a] font-black border-b-2 border-[#507d38] pb-0.5 whitespace-nowrap transition-all';
    }
    return isSpecialGreen
      ? 'hover:text-[#102b2a] transition-colors whitespace-nowrap font-bold text-[#507d38]'
      : 'hover:text-[#102b2a] transition-colors whitespace-nowrap text-[#526460]';
  };

  // Check Web Speech API availability
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setVoiceSupported(!!SpeechRecognition);
  }, []);

  const searchIndex = [
    { title: 'Inverters & Home UPS', tamilTitle: 'இன்வெர்ட்டர் & UPS', targetId: 'solutions', keywords: ['inverter', 'inverters', 'ups', 'power', 'sine wave', 'இன்வெர்ட்டர்'] },
    { title: 'Battery Capacity Estimator', tamilTitle: 'பேட்டரி திறன் கணிப்பான்', targetId: 'battery-estimator', keywords: ['battery', 'capacity', 'estimator', 'ah', 'tubular', 'battery service', 'பேட்டரி'] },
    { title: 'Power-Saver Mode Dashboard', tamilTitle: 'பவர்-சேவர் டாஷ்போர்டு', targetId: 'power-saver', keywords: ['power-saver', 'grid', 'saver', 'tneb', 'voltage', 'voltage guard', 'பவர் சேவர்'] },
    { title: 'Solar ROI & Break-Even Calculator', tamilTitle: 'சோலார் ROI & பிரேக்-ஈவன் கணிப்பான்', targetId: 'solar-roi', keywords: ['solar roi', 'solar', 'roi', 'break-even', 'payback', 'bill', 'tneb bill', 'subsidy', 'surya ghar', 'சோலார்'] },
    { title: 'Free Events & Testing Camps', tamilTitle: 'இலவச முகாம்கள் & பயிலரங்கு', targetId: 'events', keywords: ['event', 'camp', 'camps', 'workshop', 'free test', 'tds camp', 'water camp', 'solar workshop', 'முகாம்'] },
    { title: 'RO Water Purifiers & Filters', tamilTitle: 'RO குடிநீர் ஃபில்டர்கள்', targetId: 'water-guide', keywords: ['ro', 'ro filters', 'filter', 'water', 'tds', 'purifier', 'candle', 'ஃபில்டர்'] },
    { title: 'Doorstep Electricians & Plumbers', tamilTitle: 'எலக்ட்ரீஷியன் & பிளம்பர்', targetId: 'engineers', keywords: ['electrician', 'plumber', 'wiring', 'engineer', 'service', 'எலக்ட்ரீஷியன்'] },
    { title: 'Eco-Exchange Battery Recycling', tamilTitle: 'பேட்டரி ஸ்கிராப் மறுசுழற்சி', targetId: 'eco-exchange', keywords: ['scrap', 'disposal', 'recycle', 'eco', 'exchange', 'மறுசுழற்சி'] },
    { title: 'UPI Scan & Pay', tamilTitle: 'UPI ஸ்கேன் & பே', targetId: 'scan-and-pay', keywords: ['pay', 'upi', 'qr', 'scan', 'payment', 'கட்டணம்'] },
    { title: 'Local Solar Yield Simulator', tamilTitle: 'சோலார் மின் கணிப்பு', targetId: 'solar-potential', keywords: ['solar', 'sun', 'irradiance', 'rooftop', 'சோலார்'] },
    { title: 'Store Location on Malang Road', tamilTitle: 'கடை முகவரி & நேரம்', targetId: 'visit', keywords: ['location', 'visit', 'malang', 'address', 'store', 'hours', 'முகவரி'] }
  ];

  const handleStartVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === 'ta' ? 'உங்கள் பிரவுசரில் குரல் தேடல் ஆதரிக்கப்படவில்லை.' : 'Web Speech API is not supported in this browser. Please type your search.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSearchOpen(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        performSearch(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Failed to start voice search:', e);
      setIsListening(false);
    }
  };

  const performSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return;

    // Find best match in search index
    const matched = searchIndex.find(item => 
      item.keywords.some(k => q.includes(k) || k.includes(q))
    );

    if (matched) {
      const el = document.getElementById(matched.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setSearchOpen(false);
      }
    }
  };

  const filteredResults = searchQuery.trim()
    ? searchIndex.filter(item => {
        const q = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) || 
               item.tamilTitle.toLowerCase().includes(q) ||
               item.keywords.some(k => k.includes(q));
      })
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#f5f7f4]/95 backdrop-blur-md border-b border-[#dce4de] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[76px] gap-4 sm:gap-6">
          {/* Zone 1: Sidebar Toggle Button + Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="p-2 rounded-xl border border-[#97aaa1] bg-white text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
                title="Open Sidebar Navigation Menu"
                aria-label="Toggle sidebar menu"
              >
                <Menu className="w-4 h-4 text-[#102b2a]" />
                <span className="hidden sm:inline text-xs font-bold text-[#102b2a]">Menu</span>
              </button>
            )}

            <a 
              href="#" 
              className="flex items-baseline gap-2 font-black tracking-tight text-xl sm:text-2xl text-[#102b2a] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <span>HITEK</span>
              <span className="font-extrabold text-[#507d38] text-sm sm:text-base tracking-widest uppercase">SOLUTIONS</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-4 text-sm font-semibold text-[#526460]">
            <a href="#solutions" className={getLinkClass('solutions')}>{t.solutions}</a>
            <a href="#battery-estimator" className={getLinkClass('battery-estimator', true)}>
              {lang === 'ta' ? 'பேட்டரி கணிப்பான்' : 'Battery Estimator'}
            </a>
            <a href="#power-saver" className={getLinkClass('power-saver', true)}>
              {t.powerSaver}
            </a>
            <a href="#solar-roi" className={getLinkClass('solar-roi', true)}>
              {t.solarRoi}
            </a>
            <a href="#events" className={getLinkClass('events', true)}>
              {t.events}
            </a>
            <a href="#pricing" className={getLinkClass('pricing')}>{t.pricing}</a>
            <a href="#water-guide" className={getLinkClass('water-guide')}>RO Water</a>
            <a href="#calculator" className={getLinkClass('calculator')}>{t.calculator}</a>
            <a href="#eco-exchange" className={getLinkClass('eco-exchange')}>{t.eco}</a>
            <a href="#scan-and-pay" className={getLinkClass('scan-and-pay', true)}>{t.scanPay}</a>
            <a href="#engineers" className={getLinkClass('engineers')}>{t.engineers}</a>
            <a href="#visit" className={getLinkClass('visit')}>{t.location}</a>
          </nav>

          {/* Zone 3: Voice Search Bar + Theme Toggle + Language Toggle + Call CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Voice-Activated Search Button & Container */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen) {
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }
                }}
                className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  searchOpen || isListening
                    ? 'border-[#507d38] bg-[#102b2a] text-[#dcff73]'
                    : 'border-[#97aaa1] bg-white text-[#102b2a] hover:bg-[#e8eee5]'
                }`}
                title="Search or Voice Search (Inverters, RO filters, Battery service)"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-xs font-bold">
                  {lang === 'ta' ? 'தேடல்' : 'Search'}
                </span>
              </button>

              {/* Expandable Voice Search Popup */}
              {searchOpen && (
                <div className="absolute right-0 top-12 w-[calc(100vw-32px)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#d9e1da] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8e0]">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#97aaa1] absolute left-3 top-2.5" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            performSearch(searchQuery);
                          }
                        }}
                        placeholder={
                          isListening
                            ? (lang === 'ta' ? 'கேட்கிறது... பேசவும்' : 'Listening... Speak now')
                            : (lang === 'ta' ? 'எ.கா: inverters, RO filters...' : "Search 'inverters', 'RO filters'...")
                        }
                        className="w-full pl-9 pr-10 py-2 text-xs bg-[#f5f7f4] border border-[#bac9c0] rounded-xl text-[#102b2a] focus:outline-none focus:ring-2 focus:ring-[#507d38]"
                      />

                      {/* Microphone Voice Trigger inside input */}
                      <button
                        type="button"
                        onClick={handleStartVoiceSearch}
                        className={`absolute right-2 top-1.5 p-1 rounded-lg transition-all cursor-pointer ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'text-[#507d38] hover:bg-[#e8eee5]'
                        }`}
                        title="Voice Search using Web Speech API"
                        aria-label="Voice search"
                      >
                        {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-1.5 text-[#526460] hover:text-[#102b2a]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Voice Status Indicator */}
                  {isListening && (
                    <div className="p-2.5 my-2 rounded-xl bg-[#102b2a] text-[#dcff73] text-xs flex items-center justify-between animate-pulse">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span>{lang === 'ta' ? 'குரல் கேட்கிறது... (தமிழ் / English)' : "Listening for 'inverters', 'RO filters', 'battery service'..."}</span>
                      </div>
                      <MicOff className="w-4 h-4 cursor-pointer" onClick={() => setIsListening(false)} />
                    </div>
                  )}

                  {/* Search Results Dropdown */}
                  {filteredResults.length > 0 ? (
                    <div className="pt-3 space-y-1.5 max-h-56 overflow-y-auto">
                      {filteredResults.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(item.targetId);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              setSearchOpen(false);
                            }
                          }}
                          className="w-full p-2.5 rounded-xl hover:bg-[#f0f4ee] flex items-center justify-between text-left text-xs transition-colors cursor-pointer group"
                        >
                          <div>
                            <strong className="text-[#102b2a] group-hover:text-[#507d38] block">
                              {lang === 'ta' ? item.tamilTitle : item.title}
                            </strong>
                            <span className="text-[10px] text-[#526460]">Tap to jump to section</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#507d38]" />
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.trim() ? (
                    <div className="p-4 text-center text-xs text-[#526460]">
                      No exact match found for "{searchQuery}". Try "inverters" or "RO filters".
                    </div>
                  ) : (
                    /* Preset Quick Voice Searches */
                    <div className="pt-3">
                      <span className="text-[10px] font-bold text-[#8fa8a3] uppercase tracking-wider block mb-2">
                        {lang === 'ta' ? 'பிரபலமான குரல் தேடல்கள்:' : 'Popular Voice Searches:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {['inverters', 'RO filters', 'battery service', 'electrician'].map((tag, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSearchQuery(tag);
                              performSearch(tag);
                            }}
                            className="px-2.5 py-1 bg-[#f5f7f4] hover:bg-[#e8eee5] text-[#102b2a] font-medium rounded-lg border border-[#bac9c0] transition-colors"
                          >
                            "{tag}"
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Anti-Glare Dark Mode / Light Mode Theme Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to high-contrast anti-glare dark mode'}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to anti-glare dark mode'}
                className="inline-flex items-center justify-center p-2 text-xs font-bold rounded-lg border border-[#97aaa1] bg-white text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer shadow-2xs"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-[#102b2a]" />
                )}
              </button>
            )}

            {/* Language Switcher Toggle */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label="Switch language between English and Tamil"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-md border border-[#97aaa1] bg-white text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer shadow-2xs"
            >
              <Languages className="w-3.5 h-3.5 text-[#507d38]" />
              <span className="font-semibold">{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Share & Mobile QR Code Button */}
            {onOpenQrModal && (
              <button
                type="button"
                onClick={onOpenQrModal}
                aria-label="Generate QR Code to open or bookmark on mobile"
                title={lang === 'ta' ? 'மொபைலில் திறக்க QR குறியீடு' : 'Generate QR Code to open or share'}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-md border border-[#97aaa1] bg-white text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer shadow-2xs"
              >
                <QrCode className="w-3.5 h-3.5 text-[#507d38]" />
                <span className="hidden md:inline font-semibold">QR</span>
              </button>
            )}

            <a
              href="https://wa.me/919150051486?text=Hello%20Hitek%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%20and%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#102b2a] bg-[#dcff73] rounded-md hover:bg-[#cbe663] transition-colors whitespace-nowrap shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.whatsapp}</span>
            </a>

            <a
              href="tel:+919150051486"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#102b2a] rounded-md hover:bg-[#1a4442] transition-colors whitespace-nowrap shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="tabular-nums">91500 51486</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#526460] hover:text-[#102b2a] rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#dce4de] bg-[#f5f7f4] px-4 pt-4 pb-6 space-y-3">
          {/* Mobile Theme Toggle Item */}
          {onToggleTheme && (
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-[#d9e1da]">
              <span className="text-xs font-bold text-[#102b2a]">
                {isDarkMode ? 'Dark Mode (Anti-Glare Active)' : 'Light Mode'}
              </span>
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-[#f5f7f4] border border-[#bac9c0] rounded-md"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
              </button>
            </div>
          )}

          <nav className="flex flex-col space-y-1 text-sm font-semibold text-[#526460]">
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.solutions}
            </a>
            <a
              href="#battery-estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors font-bold text-[#507d38]"
            >
              {lang === 'ta' ? 'பேட்டரி திறன் கணிப்பான்' : 'Battery Capacity Estimator'}
            </a>
            <a
              href="#power-saver"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors font-bold text-[#507d38]"
            >
              {t.powerSaver}
            </a>
            <a
              href="#solar-roi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors font-bold text-[#507d38]"
            >
              {t.solarRoi}
            </a>
            <a
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors font-bold text-[#507d38]"
            >
              {t.events}
            </a>
            <a
              href="#special-offers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors text-[#507d38] font-bold"
            >
              {t.offers}
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.pricing}
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.compare}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.calculator}
            </a>
            <a
              href="#solar-potential"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.solar}
            </a>
            <a
              href="#eco-exchange"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.eco}
            </a>
            <a
              href="#scan-and-pay"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors font-bold text-[#507d38]"
            >
              {t.scanPay}
            </a>
            <a
              href="#engineers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.engineers}
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#e8eee5] transition-colors"
            >
              {t.location}
            </a>

            {onOpenQrModal && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQrModal();
                }}
                className="w-full text-left px-3 py-2.5 rounded-md bg-[#dcff73]/40 hover:bg-[#dcff73] transition-colors font-bold text-[#102b2a] flex items-center gap-2 mt-2"
              >
                <QrCode className="w-4 h-4 text-[#507d38]" />
                <span>{lang === 'ta' ? 'QR குறியீடு & பகிர்வு' : 'Generate QR Code & Share'}</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
