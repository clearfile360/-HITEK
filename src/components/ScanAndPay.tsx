import React, { useState } from 'react';
import { QrCode, Copy, Check, ExternalLink, ShieldCheck, IndianRupee, MessageSquare, Smartphone, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface ScanAndPayProps {
  lang: Language;
}

export const ScanAndPay: React.FC<ScanAndPayProps> = ({ lang }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(199);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const effectiveAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;
  const upiId = '9150051486@okbizaxis';
  const merchantName = 'HITEK SOLUTIONS';

  // Standard UPI deep link format supported across GPay, PhonePe, Paytm, and BHIM
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent('Hitek Service Vaniyambadi')}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}&margin=10`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenUpiApp = () => {
    window.location.href = upiLink;
  };

  const handleWhatsAppReceipt = () => {
    const text = encodeURIComponent(
      `Hello Hitek Solutions!\nI have completed an online UPI payment of ₹${effectiveAmount} to ${upiId}.\nMerchant: HITEK SOLUTIONS (Vaniyambadi)\nAttached is my payment screenshot for booking confirmation.`
    );
    window.open(`https://wa.me/919150051486?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="scan-and-pay" className="bg-[#0b1a19] text-white rounded-3xl border border-[#2b4441] p-6 sm:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Details & Amount Selector (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#dcff73] uppercase tracking-wider mb-2">
              <QrCode className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'உடனடி UPI கட்டணம்' : 'Instant UPI Scan & Pay'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'ta' ? 'ஹைடெக் சொல்யூஷன்ஸ் QR குறியீடு' : 'Official Hitek Solutions UPI QR'}
            </h3>
            <p className="text-xs sm:text-sm text-[#bbceca] mt-1 leading-relaxed">
              {lang === 'ta'
                ? 'சர்வீஸ் கட்டணம், அட்வான்ஸ் முன்பதிவு அல்லது உதிரிபாகங்களுக்கான தொகையை கூகுள் பே, போன்பே அல்லது பேடிஎம் மூலம் நேரடியாக செலுத்தலாம்.'
                : 'Pay for doorstep electrician/plumber visits, RO service deposits, or battery maintenance directly from any mobile banking app with zero transaction charges.'}
            </p>
          </div>

          {/* Preset Amount Chips */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#8fa8a3] block mb-2">
              {lang === 'ta' ? 'தொகையைத் தேர்ந்தெடுக்கவும்:' : 'Select Service Amount:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '₹199', sub: lang === 'ta' ? 'ஆய்வு கட்டணம்' : 'Visit Charge', amount: 199 },
                { label: '₹450', sub: lang === 'ta' ? 'RO / பேட்டரி சர்வீஸ்' : 'RO/Battery AMC', amount: 450 },
                { label: '₹1,000', sub: lang === 'ta' ? 'முன்பதிவு அட்வான்ஸ்' : 'Booking Deposit', amount: 1000 },
                { label: 'Custom', sub: lang === 'ta' ? 'விருப்பத் தொகை' : 'Other Amount', amount: 0 }
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (item.amount === 0) {
                      setIsCustom(true);
                    } else {
                      setIsCustom(false);
                      setSelectedAmount(item.amount);
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    (item.amount === 0 && isCustom) || (!isCustom && selectedAmount === item.amount)
                      ? 'border-[#dcff73] bg-[#122e2c] text-white ring-1 ring-[#dcff73]/40'
                      : 'border-[#233d3a] bg-[#0e2423] text-[#bbceca] hover:bg-[#132c2a]'
                  }`}
                >
                  <strong className="text-sm font-bold text-white block">{item.label}</strong>
                  <span className="text-[10px] text-[#8fa8a3]">{item.sub}</span>
                </button>
              ))}
            </div>

            {/* Custom Amount Input if selected */}
            {isCustom && (
              <div className="mt-3 animate-in fade-in duration-200">
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-[#8fa8a3]">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount (e.g. 2500)"
                    className="w-full pl-8 pr-4 py-2.5 text-sm bg-[#0e2423] border border-[#2b4441] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#dcff73]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* UPI ID Copy Row */}
          <div className="p-3.5 rounded-2xl bg-[#0e2423] border border-[#2b4441] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8fa8a3] block">
                Official Merchant UPI ID:
              </span>
              <strong className="text-sm font-mono text-[#dcff73]">{upiId}</strong>
            </div>

            <button
              type="button"
              onClick={handleCopyUpi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Mobile Direct Pay Action */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleOpenUpiApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-md"
            >
              <Smartphone className="w-4 h-4" />
              <span>{lang === 'ta' ? 'UPI செயலியில் திறக்க' : `Pay ₹${effectiveAmount} via Any UPI App`}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppReceipt}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#dcff73]" />
              <span>Share Receipt</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Contrast Dynamic QR Code Display (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="bg-white p-5 rounded-3xl shadow-2xl text-center border-4 border-[#dcff73]/40">
            <img
              src={qrCodeUrl}
              alt="Scan and Pay UPI QR Code - Hitek Solutions"
              className="w-52 h-52 mx-auto rounded-xl object-contain mb-3"
              loading="lazy"
            />

            <div className="text-[#102b2a] space-y-0.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#507d38] uppercase block">
                Verified Merchant QR
              </span>
              <strong className="text-base font-black tracking-tight block">
                HITEK SOLUTIONS
              </strong>
              <span className="text-xs font-bold font-mono text-[#526460]">
                Paying: ₹{effectiveAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Supported App Logos Text */}
            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <span>GPay</span> · <span>PhonePe</span> · <span>Paytm</span> · <span>BHIM</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#8fa8a3] mt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Encrypted Bank-to-Bank Transfer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
