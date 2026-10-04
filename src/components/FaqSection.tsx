import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you offer buyback / scrap exchange discount for old batteries?',
      a: 'Yes, absolutely! We offer top scrap market value for your old inverter or automotive battery. When purchasing a new Exide, Amaron, or Livguard battery, the exchange discount is deducted immediately from your bill with zero hassle.'
    },
    {
      q: 'Which inverter and battery brands do you carry in stock?',
      a: 'We are authorized dealers for Exide, Amaron, Luminous, and Microtek. All units come factory-fresh with official serial numbers and warranty registration cards valid across India.'
    },
    {
      q: 'How frequently does an RO water filter need service in Vaniyambadi?',
      a: 'Given the higher mineral content in local borewell water, we recommend replacing the external spun pre-filter candle every 3 to 4 months. The internal sediment, activated carbon, and post-carbon filters should be serviced every 9 to 12 months, and the RO membrane typically lasts 2 to 3 years.'
    },
    {
      q: 'How soon can an electrician or plumber visit my house?',
      a: 'For urgent breakdowns (such as main switchboard short-circuits, inverter tripping, or heavy pipe leaks), we dispatch our experienced service engineers within 30 to 60 minutes across Vaniyambadi town including Muslimpur, Khaderpet, Newtown, and Valayampet.'
    },
    {
      q: 'Do you provide on-site delivery and installation?',
      a: 'Yes! All inverters, batteries, and RO purifiers purchased from Hitek Solutions include prompt doorstep delivery and safe installation by our qualified technicians.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-b border-[#dce4de]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold tracking-widest text-[#507d38] uppercase block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#102b2a] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#526460] mt-2">
            Have questions before choosing your inverter, battery, or service engineer?
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-[#d9e1da] rounded-xl overflow-hidden bg-[#f5f7f4] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#102b2a] hover:bg-[#eef2ec] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#526460] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#507d38]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#526460] leading-relaxed border-t border-[#e2e8e0] bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
