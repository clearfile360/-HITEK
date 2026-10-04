import React, { useState, useEffect } from 'react';
import { WifiOff, Phone, CheckCircle2, ChevronRight, X, Database, MapPin, Zap } from 'lucide-react';
import { Language } from '../translations';

interface OfflineStatusNotifierProps {
  lang: Language;
}

export const OfflineStatusNotifier: React.FC<OfflineStatusNotifierProps> = ({ lang }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showModal, setShowModal] = useState(false);
  const [cachedData, setCachedData] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Preload offline data
    fetch('/offline-data.json')
      .then((res) => res.json())
      .then((data) => setCachedData(data))
      .catch((err) => {
        // Fallback local memory data if fetch fails
        setCachedData({
          brand: 'Hitek Solutions',
          location: {
            address: 'Malang Road, Muslimpur, Vaniyambadi',
            primaryPhone: '+91 91500 51486',
            hours: '9:00 AM - 9:00 PM'
          }
        });
      });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !showModal) {
    return null;
  }

  return (
    <>
      {/* Offline Alert Sticky Banner */}
      {isOffline && (
        <div className="bg-[#102b2a] text-[#dcff73] px-4 py-2.5 border-b border-[#38504d] text-xs font-medium sticky top-0 z-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 max-w-2xl truncate">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span className="text-white truncate">
              {lang === 'ta'
                ? 'இணைப்பு இல்லை: வாணியம்பாடிக்கான ஆஃப்லைன் தகவல் பயன்முறையில் உள்ளீர்கள்.'
                : 'Offline Mode: Browsing cached catalog & contacts for Vaniyambadi.'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-xs font-bold text-[#dcff73] underline hover:text-white"
            >
              {lang === 'ta' ? 'ஆஃப்லைன் தொடர்பு விவரங்கள்' : 'View Offline Directory'}
            </button>

            <a
              href="tel:+919150051486"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#dcff73] text-[#102b2a] font-bold rounded text-[11px]"
            >
              <Phone className="w-3 h-3" />
              <span>Call 91500 51486</span>
            </a>
          </div>
        </div>
      )}

      {/* Offline Directory Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#102b2a] text-white rounded-3xl max-w-2xl w-full border border-[#38504d] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#2b4441] mb-6">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#dcff73]" />
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {lang === 'ta' ? 'சேமிக்கப்பட்ட அவசர தொடர்பு & தயாரிப்புகள்' : 'Service Worker Cached Emergency Directory'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#bbceca] hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs text-[#bbceca]">
              {/* Store Address & Direct Phone */}
              <div className="p-4 rounded-2xl bg-[#0a1c1b] border border-[#23423f] space-y-2">
                <div className="flex items-center gap-2 text-[#dcff73] font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Hitek Solutions · Vaniyambadi Showroom</span>
                </div>
                <p className="text-white">
                  Malang Road, Muslimpur (Opposite Karur Vysya Bank), Vaniyambadi - 635751.
                </p>
                <div className="flex flex-wrap gap-4 pt-1 font-mono">
                  <a href="tel:+919150051486" className="text-[#dcff73] font-bold hover:underline">
                    📞 Direct Call: +91 91500 51486
                  </a>
                  <span>⏰ 9:00 AM – 9:00 PM</span>
                </div>
              </div>

              {/* Emergency Service Roster */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dcff73] mb-3">
                  Offline On-Call Technicians (No Internet Needed):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#0a1c1b] border border-[#23423f]">
                    <strong className="text-white block">Inverter &amp; Battery Failure</strong>
                    <span className="text-[11px] text-[#8fa8a3] block mb-2">24/7 Phone Guidance &amp; Bypass Support</span>
                    <a href="tel:+919150051486" className="text-[#dcff73] font-bold font-mono">
                      Call 91500 51486 &rarr;
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0a1c1b] border border-[#23423f]">
                    <strong className="text-white block">Doorstep Electrician / Plumber</strong>
                    <span className="text-[11px] text-[#8fa8a3] block mb-2">Fixed ₹199 Visiting Inspection</span>
                    <a href="tel:+919150051486" className="text-[#dcff73] font-bold font-mono">
                      Call 91500 51486 &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Offline Inverter Price Quick Ref */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dcff73] mb-3">
                  Essential Inverter Packages Reference:
                </h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-[#0a1c1b] border border-[#23423f] flex items-center justify-between">
                    <div>
                      <strong className="text-white block">700VA + 100Ah Starter</strong>
                      <span className="text-[11px] text-[#8fa8a3]">3-4 Hours (Fans + Lights + TV)</span>
                    </div>
                    <span className="font-mono text-sm text-[#dcff73] font-bold">₹14,500 – ₹16,500</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0a1c1b] border border-[#23423f] flex items-center justify-between">
                    <div>
                      <strong className="text-white block">900VA–1100VA + 150Ah Tall Tubular</strong>
                      <span className="text-[11px] text-[#8fa8a3]">5-6 Hours (Standard 2–3 BHK)</span>
                    </div>
                    <span className="font-mono text-sm text-[#dcff73] font-bold">₹19,000 – ₹22,500</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0a1c1b] border border-[#23423f] flex items-center justify-between">
                    <div>
                      <strong className="text-white block">1150VA + 200Ah Jumbo</strong>
                      <span className="text-[11px] text-[#8fa8a3]">7-8 Hours (Runs Inverter Fridge)</span>
                    </div>
                    <span className="font-mono text-sm text-[#dcff73] font-bold">₹24,500 – ₹28,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#2b4441] flex items-center justify-between">
              <span className="text-[11px] text-[#8fa8a3]">
                Cached locally by Hitek Service Worker
              </span>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#dcff73] text-[#102b2a] font-bold text-xs rounded-xl"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
