/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SidebarNavigation, NavCategory } from './components/SidebarNavigation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { SpecialOffers } from './components/SpecialOffers';
import { SolutionsGrid } from './components/SolutionsGrid';
import { PriceEstimator } from './components/PriceEstimator';
import { ProductComparison } from './components/ProductComparison';
import { ApplianceFinderQuiz } from './components/ApplianceFinderQuiz';
import { ServiceEngineersSection } from './components/ServiceEngineersSection';
import { PowerCalculator } from './components/PowerCalculator';
import { BatteryCapacityEstimator } from './components/BatteryCapacityEstimator';
import { PowerSaverDashboard } from './components/PowerSaverDashboard';
import { LocalSolarPotential } from './components/LocalSolarPotential';
import { SolarRoiCalculator } from './components/SolarRoiCalculator';
import { RoWaterGuide } from './components/RoWaterGuide';
import { ReferralRewards } from './components/ReferralRewards';
import { EcoExchange } from './components/EcoExchange';
import { CustomerSuccessStories } from './components/CustomerSuccessStories';
import { ServiceReminder } from './components/ServiceReminder';
import { PushNotificationCenter } from './components/PushNotificationCenter';
import { ServiceHistoryDashboard } from './components/ServiceHistoryDashboard';
import { WarrantyLookup } from './components/WarrantyLookup';
import { TechInsights } from './components/TechInsights';
import { EnquiryForm } from './components/EnquiryForm';
import { GallerySection } from './components/GallerySection';
import { StoreVisit } from './components/StoreVisit';
import { EventsAndCamps } from './components/EventsAndCamps';
import { ShareQrModal } from './components/ShareQrModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { QuickChat } from './components/QuickChat';
import { LimitedTimeOfferModal } from './components/LimitedTimeOfferModal';
import { WeeklyEnergySavingToast } from './components/WeeklyEnergySavingToast';
import { OfflineStatusNotifier } from './components/OfflineStatusNotifier';
import { AccessibilityChecker } from './components/AccessibilityChecker';
import { Home, Calculator, Wrench, Calendar, MapPin, Layers } from 'lucide-react';
import { Language } from './translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedProduct, setSelectedProduct] = useState<string>('Inverters & UPS');
  const [currentCategory, setCurrentCategory] = useState<NavCategory>('home');
  const [activeCategory, setActiveCategory] = useState<NavCategory>('home');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const isAutoScrollingRef = useRef(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('hitek_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  // Apply dark mode class to html document and persist in storage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hitek_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hitek_theme', 'light');
    }
  }, [isDarkMode]);

  // SCROLL-SPY: Automatically updates the active navigation state based on what section is in viewport
  useEffect(() => {
    const sectionCategoryMap: { id: string; category: NavCategory }[] = [
      // Category 1: Home
      { id: 'hero', category: 'home' },
      { id: 'special-offers', category: 'home' },
      { id: 'solutions', category: 'home' },
      { id: 'pricing', category: 'home' },
      { id: 'comparison', category: 'home' },
      { id: 'quiz', category: 'home' },
      // Category 2: Calculators & Solar
      { id: 'calculator', category: 'calculators' },
      { id: 'battery-estimator', category: 'calculators' },
      { id: 'power-saver', category: 'calculators' },
      { id: 'solar-potential', category: 'calculators' },
      { id: 'solar-roi', category: 'calculators' },
      { id: 'water-guide', category: 'calculators' },
      // Category 3: Services & Maintenance
      { id: 'engineers', category: 'services' },
      { id: 'service-history', category: 'services' },
      { id: 'warranty', category: 'services' },
      { id: 'service-reminder', category: 'services' },
      { id: 'eco-exchange', category: 'services' },
      // Category 4: Community & Events
      { id: 'events', category: 'community' },
      { id: 'rewards', category: 'community' },
      { id: 'stories', category: 'community' },
      { id: 'insights', category: 'community' },
      { id: 'gallery', category: 'community' },
      // Category 5: Store & Booking
      { id: 'visit', category: 'contact' },
      { id: 'enquire', category: 'contact' },
      { id: 'faq', category: 'contact' }
    ];

    let ticking = false;

    const handleScrollSpy = () => {
      if (isAutoScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;

          // Bottom of page activates contact
          if (scrollY + windowHeight >= docHeight - 120) {
            setActiveCategory('contact');
            setActiveSection('enquire');
            ticking = false;
            return;
          }

          // Top of page activates home
          if (scrollY < 120) {
            setActiveCategory('home');
            setActiveSection('hero');
            ticking = false;
            return;
          }

          // Trigger reading threshold (e.g. 180px below sticky header)
          const triggerLine = 180;
          let matchedCategory: NavCategory | null = null;
          let matchedSection: string | null = null;

          for (const item of sectionCategoryMap) {
            const el = document.getElementById(item.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerLine && rect.bottom > triggerLine) {
                matchedCategory = item.category;
                matchedSection = item.id;
                break;
              }
            }
          }

          // Fallback: check category block containers
          if (!matchedCategory) {
            const categoryBlocks: { id: string; category: NavCategory }[] = [
              { id: 'category-contact', category: 'contact' },
              { id: 'category-community', category: 'community' },
              { id: 'category-services', category: 'services' },
              { id: 'category-calculators', category: 'calculators' },
              { id: 'category-home', category: 'home' }
            ];

            for (const cat of categoryBlocks) {
              const el = document.getElementById(cat.id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= triggerLine && rect.bottom > triggerLine) {
                  matchedCategory = cat.category;
                  break;
                }
              }
            }
          }

          if (matchedCategory) {
            setActiveCategory(matchedCategory);
          }
          if (matchedSection) {
            setActiveSection(matchedSection);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initial check

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentCategory]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const handleCategoryChange = (category: NavCategory) => {
    if (category === 'all') {
      setCurrentCategory('all');
      return;
    }

    if (currentCategory === 'all') {
      // In all-in-one view, smoothly scroll down to target category block
      const targetEl = document.getElementById(`category-${category}`);
      if (targetEl) {
        isAutoScrollingRef.current = true;
        setActiveCategory(category);
        targetEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 800);
      }
    } else {
      // Switch view and scroll smoothly to top
      setCurrentCategory(category);
      setActiveCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSolution = (productName: string) => {
    setSelectedProduct(productName);
    // Switch to contact & booking view or scroll to enquire
    if (currentCategory !== 'all' && currentCategory !== 'contact') {
      setCurrentCategory('contact');
    }
    setTimeout(() => {
      const el = document.getElementById('enquire');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const topCategoryPills: { id: NavCategory; label: string; tamilLabel: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Products & Deals', tamilLabel: 'தயாரிப்புகள் & சலுகைகள்', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'calculators', label: 'Power & Solar Tools', tamilLabel: 'மின் & சோலார் கணிப்பான்', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'services', label: 'Service & Maintenance', tamilLabel: 'சர்வீஸ் & பராமரிப்பு', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'community', label: 'Events & Community', tamilLabel: 'முகாம்கள் & சமூகம்', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Store Visit & Booking', tamilLabel: 'கடை முகவரி & முன்பதிவு', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'all', label: 'All Sections', tamilLabel: 'அனைத்து பிரிவுகள்', icon: <Layers className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className={`min-h-screen bg-[#f5f7f4] text-[#102b2a] selection:bg-[#dcff73] selection:text-[#102b2a] transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Offline Status & Cached Emergency Directory for Vaniyambadi */}
      <OfflineStatusNotifier lang={lang} />

      {/* Modern Left Sidebar Navigation */}
      <SidebarNavigation
        currentCategory={currentCategory}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        lang={lang}
        onToggleLang={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Main Content Area (Offset by left sidebar width on large screens) */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
      }`}>
        {/* Top Bar Navigation (With Scroll-Spy Active Indicator & Voice Search) */}
        <Navbar
          lang={lang}
          onToggleLang={toggleLanguage}
          onOpenEnquiry={() => handleSelectSolution('Inverters & UPS')}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
          activeSection={activeSection}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />

        {/* Scroll-Spy Category Selection Tab Strip (Quick horizontal switcher) */}
        <nav aria-label="Category Navigation" className="bg-[#f0f4ee] border-b border-[#dce4de] py-2 px-4 sm:px-6 sticky top-[76px] z-30 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-bold text-[#526460] uppercase tracking-wider mr-1 hidden sm:inline">
              {lang === 'ta' ? 'பிரிவு:' : 'View:'}
            </span>
            {topCategoryPills.map((pill) => {
              const isPillActive = (currentCategory === 'all')
                ? (activeCategory === pill.id || (pill.id === 'all'))
                : (currentCategory === pill.id);

              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => handleCategoryChange(pill.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPillActive
                      ? 'bg-[#102b2a] text-[#dcff73] shadow-md ring-2 ring-[#507d38]/50 scale-[1.02]'
                      : 'bg-white text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5] border border-[#d9e1da]'
                  }`}
                >
                  {isPillActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dcff73] animate-pulse shrink-0" />
                  )}
                  {pill.icon}
                  <span>{lang === 'ta' ? pill.tamilLabel : pill.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* DYNAMIC CONTENT ROUTING / CATEGORY VIEWS WITH SCROLL-SPY ANCHORS */}
        <main className="flex-1">
          {/* CATEGORY 1: Home, Products & Deals */}
          {(currentCategory === 'home' || currentCategory === 'all') && (
            <div id="category-home" className="scroll-mt-28">
              <Hero lang={lang} onSelectSolution={handleSelectSolution} />
              <TrustStrip lang={lang} />
              <SpecialOffers lang={lang} onClaimOffer={handleSelectSolution} />
              <SolutionsGrid lang={lang} onSelectSolution={handleSelectSolution} />
              <PriceEstimator lang={lang} onSelectProduct={handleSelectSolution} />
              <ProductComparison lang={lang} onSelectProduct={handleSelectSolution} />
              <ApplianceFinderQuiz lang={lang} onSelectProduct={handleSelectSolution} />
            </div>
          )}

          {/* CATEGORY 2: Power Calculators & Solar Tools */}
          {(currentCategory === 'calculators' || currentCategory === 'all') && (
            <div id="category-calculators" className="scroll-mt-28">
              <PowerCalculator />
              <BatteryCapacityEstimator lang={lang} />
              <PowerSaverDashboard lang={lang} />
              <LocalSolarPotential lang={lang} />
              <SolarRoiCalculator lang={lang} />
              <RoWaterGuide onSelectSolution={handleSelectSolution} />
            </div>
          )}

          {/* CATEGORY 3: Service, Maintenance & Ledger */}
          {(currentCategory === 'services' || currentCategory === 'all') && (
            <div id="category-services" className="scroll-mt-28">
              <ServiceEngineersSection onSelectSolution={handleSelectSolution} />
              <ServiceHistoryDashboard lang={lang} />
              <WarrantyLookup lang={lang} />
              <ServiceReminder />
              <PushNotificationCenter lang={lang} />
              <EcoExchange lang={lang} />
            </div>
          )}

          {/* CATEGORY 4: Community, Events & Rewards */}
          {(currentCategory === 'community' || currentCategory === 'all') && (
            <div id="category-community" className="scroll-mt-28">
              <EventsAndCamps lang={lang} />
              <ReferralRewards lang={lang} />
              <CustomerSuccessStories />
              <TechInsights lang={lang} />
              <GallerySection />
            </div>
          )}

          {/* CATEGORY 5: Contact, Store Visit & Booking */}
          {(currentCategory === 'contact' || currentCategory === 'all') && (
            <div id="category-contact" className="scroll-mt-28">
              <StoreVisit lang={lang} onOpenQrModal={() => setIsQrModalOpen(true)} />
              <EnquiryForm
                lang={lang}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
              <FaqSection />
            </div>
          )}
        </main>

        {/* Global Footer */}
        <Footer lang={lang} />

        {/* Mobile Quick Action Bar */}
        <MobileActionBar onOpenEnquiry={() => handleSelectSolution(selectedProduct)} />

        {/* Floating WhatsApp & FAQ Assistant */}
        <QuickChat lang={lang} />

        {/* Weekly Actionable Energy Saving Toast */}
        <WeeklyEnergySavingToast lang={lang} />

        {/* Seasonal Limited Time Offers Modal */}
        <LimitedTimeOfferModal lang={lang} />

        {/* Accessibility & Contrast Checker */}
        <AccessibilityChecker lang={lang} />

        {/* Share & Mobile Bookmark QR Code Modal */}
        <ShareQrModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          lang={lang}
        />
      </div>
    </div>
  );
}
