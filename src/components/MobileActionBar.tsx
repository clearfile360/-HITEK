import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface MobileActionBarProps {
  onOpenEnquiry: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenEnquiry }) => {
  return (
    <aside 
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#ccd6cc] p-2.5 px-4 shadow-lg"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="tel:+919150051486"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#102b2a] text-white font-bold text-xs rounded-md shadow-xs active:bg-[#1a4442] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#dcff73]" />
          <span>Call Hitek</span>
        </a>

        <a
          href="#enquire"
          onClick={onOpenEnquiry}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#dcff73] text-[#102b2a] font-bold text-xs rounded-md shadow-xs active:bg-[#cbe663] transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </aside>
  );
};
