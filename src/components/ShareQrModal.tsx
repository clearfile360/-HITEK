import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  MessageSquare, 
  X, 
  Smartphone, 
  ExternalLink,
  Sparkles,
  Zap,
  Droplets,
  Sun,
  MapPin,
  Calendar
} from 'lucide-react';
import { Language } from '../translations';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ShareQrModal: React.FC<ShareQrModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [selectedHash, setSelectedHash] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // Compute base URL (fallback gracefully if inside iframe or non-standard port)
  const getFullUrl = (hash: string) => {
    try {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      return `${origin}${pathname}${hash ? '#' + hash : ''}`;
    } catch (e) {
      return `https://hiteksolutions.in/${hash ? '#' + hash : ''}`;
    }
  };

  const currentShareUrl = getFullUrl(selectedHash);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.share) {
      setCanShare(true);
    }
  }, []);

  // Generate QR Code data URL whenever selected URL changes
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(currentShareUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#102b2a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('QR generation error:', err);
      });
  }, [currentShareUrl, isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `hitek-solutions-vaniyambadi-qr${selectedHash ? '-' + selectedHash : ''}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hitek Solutions · Inverters, Batteries & RO Water Vaniyambadi',
          text: 'Official website of Hitek Solutions on Malang Road, Vaniyambadi. Power backup, batteries, and RO water purifiers.',
          url: currentShareUrl
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const quickLinks = [
    { id: '', label: 'Full Website', tamilLabel: 'முழு இணையதளம்', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'battery-estimator', label: 'Battery Capacity Tool', tamilLabel: 'பேட்டரி கால்குலேட்டர்', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'solar-roi', label: 'Solar ROI Engine', tamilLabel: 'சோலார் ROI கணிப்பான்', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'water-guide', label: 'RO Water Guide', tamilLabel: 'RO குடிநீர் ஃபில்டர்', icon: <Droplets className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Free TDS Camps', tamilLabel: 'இலவச குடிநீர் முகாம்', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'visit', label: 'Malang Road Store', tamilLabel: 'கடை முகவரி & மேப்', icon: <MapPin className="w-3.5 h-3.5" /> }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#d9e1da] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150 text-[#102b2a]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#526460] hover:text-[#102b2a] rounded-xl hover:bg-[#f5f7f4] transition-colors cursor-pointer"
          aria-label="Close QR Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcff73]/50 text-[#102b2a] text-xs font-black uppercase tracking-wider mb-1">
            <QrCode className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'QR குறியீடு & பகிர்வு' : 'Instant QR Code & Share'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#102b2a] tracking-tight">
            {lang === 'ta' ? 'மொபைலில் திறக்க ஸ்கேன் செய்க' : 'Scan to Open on Mobile'}
          </h3>
          <p className="text-xs sm:text-sm text-[#526460]">
            {lang === 'ta'
              ? 'உங்கள் ஸ்மார்ட்போன் கேமரா மூலம் இந்த QR குறியீட்டை ஸ்கேன் செய்து உடனடியாக சேமிக்கவும் அல்லது நண்பர்களுக்கு பகிரவும்.'
              : 'Point your mobile phone camera to scan, bookmark, or share Hitek Solutions with neighbors in Vaniyambadi.'}
          </p>
        </div>

        {/* Target Page Selector Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#526460] block text-center">
            {lang === 'ta' ? 'குறிப்பிட்ட பக்கத்திற்கான QR குறியீடு:' : 'Generate QR For Specific Tool:'}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-h-24 overflow-y-auto">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => setSelectedHash(link.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedHash === link.id
                    ? 'bg-[#102b2a] text-[#dcff73] shadow-xs'
                    : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] border border-[#d9e1da]'
                }`}
              >
                {link.icon}
                <span>{lang === 'ta' ? link.tamilLabel : link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Presentation Box */}
        <div className="flex flex-col items-center justify-center p-5 bg-[#f5f7f4] rounded-2xl border border-[#d9e1da] text-center space-y-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#d9e1da] relative group">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Hitek Solutions Page QR Code"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-400">Generating QR...</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={handleDownload}
                className="px-3.5 py-1.5 bg-[#dcff73] text-[#102b2a] text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PNG</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#526460] font-mono">
            <Smartphone className="w-3.5 h-3.5 text-[#507d38]" />
            <span>Works with Google Lens, iPhone Camera & WhatsApp Scanner</span>
          </div>
        </div>

        {/* Copy Link Bar */}
        <div className="flex items-center gap-2 bg-[#f5f7f4] border border-[#d9e1da] p-2 rounded-xl">
          <input
            type="text"
            readOnly
            value={currentShareUrl}
            className="flex-1 bg-transparent text-xs font-mono text-[#526460] px-2 outline-none truncate"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#102b2a] hover:bg-[#1a4442] text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (lang === 'ta' ? 'நகல்' : 'Copy')}</span>
          </button>
        </div>

        {/* Share Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Check out Hitek Solutions Vaniyambadi (Inverters, Batteries & RO Water on Malang Road):\n${currentShareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#bac9c0] hover:bg-[#e8eee5] text-[#102b2a] font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#507d38]" />
            <span>Download PNG</span>
          </button>

          {canShare ? (
            <button
              type="button"
              onClick={handleNativeShare}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#dcff73]" />
              <span>Share...</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="col-span-2 sm:col-span-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-[#102b2a] font-bold text-xs rounded-xl"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
