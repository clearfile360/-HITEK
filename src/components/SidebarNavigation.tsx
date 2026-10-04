import React from 'react';
import { 
  Home, 
  Calculator, 
  Wrench, 
  Calendar, 
  MapPin, 
  Layers, 
  MessageSquare, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Languages, 
  Sparkles,
  Zap,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  X,
  QrCode
} from 'lucide-react';
import { Language } from '../translations';

export type NavCategory = 'home' | 'calculators' | 'services' | 'community' | 'contact' | 'all';

interface SidebarNavigationProps {
  currentCategory: NavCategory;
  activeCategory?: NavCategory;
  onSelectCategory: (category: NavCategory) => void;
  lang: Language;
  onToggleLang: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenQrModal?: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  currentCategory,
  activeCategory,
  onSelectCategory,
  lang,
  onToggleLang,
  isDarkMode,
  onToggleTheme,
  isOpenMobile,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  onOpenQrModal
}) => {
  const categories: {
    id: NavCategory;
    name: string;
    tamilName: string;
    description: string;
    tamilDescription: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'home',
      name: 'Products & Deals',
      tamilName: 'தயாரிப்புகள் & சலுகைகள்',
      description: 'Inverters, Batteries, RO & Combos',
      tamilDescription: 'இன்வெர்ட்டர், பேட்டரி, RO ஃபில்டர்கள்',
      icon: <Home className="w-5 h-5 shrink-0" />
    },
    {
      id: 'calculators',
      name: 'Power & Solar Tools',
      tamilName: 'மின் & சோலார் கணிப்பான்',
      description: 'Battery Ah, Grid Status & Solar ROI',
      tamilDescription: 'பேட்டரி AH, கிரிட் நிலை, சோலார் ROI',
      icon: <Calculator className="w-5 h-5 shrink-0" />,
      badge: '5 Tools'
    },
    {
      id: 'services',
      name: 'Service & Maintenance',
      tamilName: 'சர்வீஸ் & பராமரிப்பு',
      description: 'Engineers, History, Loyalty & Eco',
      tamilDescription: 'இன்ஜினியர்கள், வரலாறு, லாயல்டி',
      icon: <Wrench className="w-5 h-5 shrink-0" />
    },
    {
      id: 'community',
      name: 'Events & Community',
      tamilName: 'முகாம்கள் & சமூகம்',
      description: 'Free TDS Camps, Solar Workshops',
      tamilDescription: 'இலவச முகாம்கள், பயிற்சிகள்',
      icon: <Calendar className="w-5 h-5 shrink-0" />,
      badge: 'Free'
    },
    {
      id: 'contact',
      name: 'Store Visit & Booking',
      tamilName: 'கடை முகவரி & முன்பதிவு',
      description: 'Malang Road Map, Quotes & FAQ',
      tamilDescription: 'மலாங் ரோடு வரைபடம் & முன்பதிவு',
      icon: <MapPin className="w-5 h-5 shrink-0" />
    },
    {
      id: 'all',
      name: 'All-in-One Full View',
      tamilName: 'முழுமையான பார்வை',
      description: 'Everything on one long page',
      tamilDescription: 'அனைத்து பிரிவுகளும் ஒரே பக்கத்தில்',
      icon: <Layers className="w-5 h-5 shrink-0" />
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#102b2a] text-white border-r border-[#223e3b] transition-all duration-300 shadow-2xl ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isOpenMobile 
            ? 'translate-x-0' 
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Brand Wordmark */}
        <div className="flex items-center justify-between p-4 border-b border-[#223e3b] min-h-[76px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#dcff73] text-[#102b2a] font-black flex items-center justify-center shrink-0 shadow-sm text-lg">
              H
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <span className="font-black text-lg tracking-tight block text-white">HITEK</span>
                <span className="text-[10px] font-extrabold tracking-widest text-[#dcff73] uppercase block">
                  SOLUTIONS · VNB
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-xl hover:bg-white/10 text-[#8fa8a3] hover:text-white transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-xl hover:bg-white/10 text-[#8fa8a3] hover:text-white"
            aria-label="Close sidebar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Category Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          <div className="px-3 py-1.5">
            {!isCollapsed ? (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8fa8a3]">
                {lang === 'ta' ? 'பிரிவுகள் தேர்வு' : 'Navigation Menu'}
              </span>
            ) : (
              <div className="w-full h-0.5 bg-white/10 my-1" />
            )}
          </div>

          {categories.map((cat) => {
            const isActive = (currentCategory === 'all' && activeCategory)
              ? activeCategory === cat.id
              : currentCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3.5 p-3 rounded-2xl transition-all cursor-pointer group text-left ${
                  isActive
                    ? 'bg-[#dcff73] text-[#102b2a] shadow-lg font-bold'
                    : 'text-[#d3e2de] hover:bg-white/10 hover:text-white'
                }`}
                title={isCollapsed ? (lang === 'ta' ? cat.tamilName : cat.name) : undefined}
              >
                <div className={`${isActive ? 'text-[#102b2a]' : 'text-[#8fa8a3] group-hover:text-[#dcff73]'} transition-colors`}>
                  {cat.icon}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-black truncate block">
                        {lang === 'ta' ? cat.tamilName : cat.name}
                      </span>
                      {cat.badge && (
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isActive 
                            ? 'bg-[#102b2a] text-[#dcff73]' 
                            : 'bg-white/10 text-[#dcff73]'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] truncate block ${
                      isActive ? 'text-[#102b2a]/80' : 'text-[#8fa8a3]'
                    }`}>
                      {lang === 'ta' ? cat.tamilDescription : cat.description}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions & Controls */}
        <div className="p-3 border-t border-[#223e3b] space-y-2 bg-[#0c2221]">
          {/* Language & Theme toggles & QR Share */}
          <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between gap-2'}`}>
            <button
              type="button"
              onClick={onToggleLang}
              className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isCollapsed ? 'w-full' : 'flex-1'
              }`}
              title="Switch Language"
            >
              <Languages className="w-4 h-4 text-[#dcff73]" />
              {!isCollapsed && <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>}
            </button>

            {onOpenQrModal && (
              <button
                type="button"
                onClick={onOpenQrModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-10"
                title="Scan QR Code on Mobile"
                aria-label="Generate QR Code"
              >
                <QrCode className="w-4 h-4 text-[#dcff73]" />
              </button>
            )}

            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isCollapsed ? 'w-full' : 'w-10'
              }`}
              title={isDarkMode ? 'Light mode' : 'Anti-glare dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#bbceca]" />}
            </button>
          </div>

          {/* Quick WhatsApp & Call Buttons */}
          {!isCollapsed ? (
            <div className="space-y-1.5 pt-1">
              <a
                href="https://wa.me/919150051486?text=Hello%20Hitek%20Solutions%2C%20I%20am%20enquiring%20via%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-xs rounded-xl transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Malang Rd</span>
              </a>

              <a
                href="tel:+919150051486"
                className="w-full inline-flex items-center justify-center gap-2 py-1.5 px-3 bg-white/5 hover:bg-white/10 text-white font-mono text-xs rounded-xl border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#dcff73]" />
                <span>91500 51486</span>
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://wa.me/919150051486?text=Hello%20Hitek%20Solutions%2C%20I%20am%20enquiring%20via%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] flex items-center justify-center rounded-xl"
                title="WhatsApp Hitek Solutions"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </a>

              <a
                href="tel:+919150051486"
                className="w-full p-2 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center rounded-xl border border-white/10"
                title="Call 91500 51486"
              >
                <Phone className="w-4 h-4 text-[#dcff73]" />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
