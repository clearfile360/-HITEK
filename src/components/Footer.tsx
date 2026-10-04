import React from 'react';
import { Phone, MessageSquare, MapPin, Instagram, QrCode } from 'lucide-react';
import { ScanAndPay } from './ScanAndPay';
import { Language } from '../translations';

interface FooterProps {
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang = 'en' }) => {
  return (
    <footer className="bg-[#102b2a] text-white pt-14 pb-24 md:pb-14 border-t border-[#38504d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive Scan & Pay Section in Footer */}
        <div className="mb-14">
          <ScanAndPay lang={lang} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#203a38]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5">
            <a href="#" className="inline-block text-xl font-black tracking-tight mb-3">
              HITEK <span className="text-[#dcff73] text-sm tracking-widest uppercase">SOLUTIONS</span>
            </a>
            <p className="text-xs text-[#bbceca] leading-relaxed max-w-sm mb-4">
              Your trusted neighborhood destination on Malang Road, Vaniyambadi for inverter power backup, genuine batteries, RO pure water systems, solar equipment, and experienced home service engineers.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#dcff73]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Opp. Karur Vysya Bank, Malang Road, Muslimpur</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dcff73] mb-3">
              Solutions &amp; Services
            </h4>
            <ul className="space-y-2 text-xs text-[#bbceca]">
              <li><a href="#solutions" className="hover:text-white transition-colors">Inverters &amp; Home UPS</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Tubular &amp; Car Batteries</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">RO Water Purifiers</a></li>
              <li><a href="#solar-potential" className="hover:text-white transition-colors">Solar Irradiance Calculator</a></li>
              <li><a href="#eco-exchange" className="hover:text-white transition-colors">Battery Eco-Exchange</a></li>
              <li><a href="#scan-and-pay" className="hover:text-white transition-colors">UPI Scan &amp; Pay</a></li>
              <li><a href="#engineers" className="hover:text-white transition-colors">Electricians &amp; Plumbers</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Power Backup Calculator</a></li>
            </ul>
          </div>

          {/* Direct Contact (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dcff73] mb-3">
              Contact &amp; Emergency Service
            </h4>
            <p className="text-xs text-[#bbceca] mb-3">
              For new setups, battery replacement, or engineer home visits in Vaniyambadi:
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="tel:+919150051486"
                className="flex items-center gap-2 font-mono font-bold text-white hover:text-[#dcff73] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#dcff73]" />
                <span>+91 91500 51486</span>
              </a>
              <a
                href="https://wa.me/919150051486"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#bbceca] hover:text-[#dcff73] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#dcff73]" />
                <span>WhatsApp: 91500 51486</span>
              </a>
              <a
                href="https://www.instagram.com/hitek.solutions.vaniyambadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#bbceca] hover:text-[#dcff73] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#dcff73]" />
                <span>@hitek.solutions.vaniyambadi</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8ca39f]">
          <span>&copy; 2026 Hitek Solutions · Vaniyambadi</span>
          <span>Website crafted by Unikorn360 Business Intelligences</span>
        </div>
      </div>
    </footer>
  );
};
