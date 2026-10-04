import React, { useState } from 'react';
import { Gift, Share2, Copy, Check, MessageSquare, Users, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../translations';

interface ReferralRewardsProps {
  lang: Language;
}

export const ReferralRewards: React.FC<ReferralRewardsProps> = ({ lang }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [locality, setLocality] = useState('Muslimpur');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const cleanName = customerName.trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5) || 'VNB';
    const lastDigits = customerPhone.trim().replace(/[^0-9]/g, '').slice(-4) || '2026';
    const code = `HS-${cleanName}-${lastDigits}`;
    setGeneratedCode(code);

    // Save referral to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('hitek_referrals_v1') || '[]');
      const entry = {
        code,
        name: customerName.trim(),
        phone: customerPhone.trim(),
        locality,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('hitek_referrals_v1', JSON.stringify([entry, ...existing]));
    } catch (err) {
      // Ignore storage error
    }
  };

  const referralUrl = generatedCode
    ? `${window.location.origin}${window.location.pathname}?ref=${generatedCode}#special-offers`
    : '';

  const handleCopy = () => {
    if (!referralUrl) return;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!generatedCode) return;
    const shareText = lang === 'ta'
      ? `வணக்கம்! வாணியம்பாடி மலாங் ரோட்டில் உள்ள 'ஹைடெக் சொல்யூஷன்ஸ்' கடையில் இன்வெர்ட்டர், பேட்டரி அல்லது RO பியூரிஃபையர் வாங்கும்போது என் ரெஃபரல் கோட் [${generatedCode}] பயன்படுத்தினால் ₹500 உடனடி தள்ளுபடி கிடைக்கும்! விபரம்: ${referralUrl}`
      : `Hello neighbor! If you are looking for an inverter, tubular battery, or RO water purifier in Vaniyambadi, use my referral code [${generatedCode}] at Hitek Solutions (Malang Road, Opp. Karur Vysya Bank) to get an instant ₹500 discount on your installation!\nCheck offers here: ${referralUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  const rewardTiers = [
    {
      level: '1st Referral',
      tamilLevel: '1-வது பரிந்துரை',
      reward: 'Free Doorstep RO Pre-Filter Candle & TDS Check (Worth ₹450)',
      tamilReward: 'இலவச RO ப்ரீ-ஃபில்டர் கேண்டில் மாற்றம் & TDS பரிசோதனை (மதிப்பு ₹450)',
      badge: 'Unlocked Immediately',
      tamilBadge: 'உடனடி பலன்'
    },
    {
      level: '3 Referrals',
      tamilLevel: '3 பரிந்துரைகள்',
      reward: '1-Year Distilled Water Kit (10L) + Complete Home Electrical Safety Audit',
      tamilReward: '1 வருடத்திற்கான பேட்டரி நீர் (10L) + முழுமையான வீட்டு வயரிங் ஆய்வு',
      badge: 'Silver Ambassador',
      tamilBadge: 'சில்வர் பார்ட்னர்'
    },
    {
      level: '5+ Referrals',
      tamilLevel: '5+ பரிந்துரைகள்',
      reward: '₹1,500 Cash Discount Voucher on any Exide/Amaron Battery or Annual AMC',
      tamilReward: 'புதிய பேட்டரி வாங்கும் போது ₹1,500 நேரடி ரொக்க தள்ளுபடி கூப்பன்',
      badge: 'Gold VIP Champion',
      tamilBadge: 'கோல்ட் VIP உறுப்பினர்'
    }
  ];

  return (
    <section id="referrals" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Gift className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'வாணியம்பாடி அக்கம்பக்கத்தினர் திட்டம்' : 'Community Neighbor Rewards'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'பரிந்துரை நன்மைகள் & சலுகைகள்.' : 'Referral Rewards Program.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் நண்பர்கள் மற்றும் அண்டை வீட்டாருக்கு ஹைடெக் சொல்யூஷன்ஸை பரிந்துரைக்கவும். உங்கள் நண்பருக்கு ₹500 தள்ளுபடி, உங்களுக்கு இலவச சர்வீஸ் மற்றும் ரொக்க சலுகைகள்!'
                : 'Share your personal referral link with relatives and neighbors in Vaniyambadi. They get ₹500 off their new inverter or RO, and you unlock free service maintenance and cash vouchers!'}
            </p>
          </div>

          <div className="bg-[#f0f4ee] border border-[#bac9c0] px-4 py-3 rounded-2xl flex items-center gap-3 self-start md:self-auto">
            <div className="w-8 h-8 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center font-bold font-mono text-sm shrink-0">
              ₹
            </div>
            <div className="text-xs">
              <strong className="text-[#102b2a] block">Win-Win Neighbor Benefit</strong>
              <span className="text-[#526460]">Friend saves ₹500 · You get Free Services</span>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Generator Card (Left) + Reward Tiers (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Generator Form & Unique Link (7 Cols) */}
          <div className="lg:col-span-7 bg-[#f5f7f4] border border-[#d9e1da] rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#102b2a] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#dcff73]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#102b2a]">
                  {lang === 'ta' ? 'உங்கள் பிரத்யேக ரெஃபரல் லிங்க் பெறுக' : 'Generate Your Personal Referral Link'}
                </h3>
                <p className="text-xs text-[#526460]">
                  {lang === 'ta' ? 'வாணியம்பாடியில் உங்கள் பெயர் மற்றும் எண்ணை உள்ளிடவும்' : 'Enter your details to generate an instant code and link'}
                </p>
              </div>
            </div>

            {!generatedCode ? (
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ref-name" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'உங்கள் பெயர்' : 'Your Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ref-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Mohammed Arshad"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-phone" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'வாட்ஸ்அப் எண்' : 'WhatsApp Number'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ref-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ref-locality" className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                    {lang === 'ta' ? 'வாணியம்பாடியில் நீங்கள் வசிக்கும் பகுதி' : 'Your Area in Vaniyambadi'}
                  </label>
                  <select
                    id="ref-locality"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  >
                    <option value="Muslimpur">Muslimpur (Near Shop / Malang Road)</option>
                    <option value="Khaderpet">Khaderpet</option>
                    <option value="Newtown">Newtown</option>
                    <option value="Noorullahpet">Noorullahpet</option>
                    <option value="Perumalpet">Perumalpet</option>
                    <option value="Valayampet">Valayampet</option>
                    <option value="Other Area">Other Vaniyambadi Locality</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#dcff73]" />
                  <span>{lang === 'ta' ? 'ரெஃபரல் கோட் உருவாக்குக' : 'Generate My Referral Code & Link'}</span>
                </button>
              </form>
            ) : (
              /* Generated Code Display */
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-5 rounded-2xl bg-white border-2 border-[#507d38] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#526460]">
                      {lang === 'ta' ? 'உங்கள் பிரத்யேக ரெஃபரல் குறியீடு:' : 'Your Unique Referral Code:'}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-[#102b2a] font-mono tracking-wider mb-2">
                    {generatedCode}
                  </div>

                  <p className="text-xs text-[#526460] leading-relaxed">
                    {lang === 'ta'
                      ? `உங்கள் நண்பர்கள் மலாங் ரோடு கடையில் இந்த குறியீட்டைச் சொன்னால் அவர்களுக்கு ₹500 தள்ளுபடி கிடைக்கும்.`
                      : `Tell your neighbors to show this code at Hitek Solutions Malang Road store or share the direct link below.`}
                  </p>
                </div>

                {/* Copy Link Input */}
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#bac9c0]">
                  <input
                    type="text"
                    readOnly
                    value={referralUrl}
                    className="flex-1 px-2 py-1 text-xs text-[#102b2a] bg-transparent outline-none truncate font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f4ee] hover:bg-[#e8eee5] text-[#102b2a] font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (lang === 'ta' ? 'நகலெடு' : 'Copy Link')}</span>
                  </button>
                </div>

                {/* Share Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் நண்பர்களுக்கு பகிர்க' : 'Share with Neighbors on WhatsApp'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGeneratedCode(null)}
                    className="px-4 py-3 text-xs font-bold text-[#526460] hover:text-[#102b2a] bg-white border border-[#bac9c0] rounded-xl"
                  >
                    {lang === 'ta' ? 'புதிய குறியீடு' : 'Generate New'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Reward Tiers (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-black text-[#102b2a] mb-2">
              {lang === 'ta' ? 'பரிந்துரை பரிசுகள் & நிலைகள்:' : 'Referral Reward Tiers:'}
            </h3>

            {rewardTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-[#f5f7f4] border border-[#d9e1da] rounded-2xl p-5 hover:border-[#507d38] transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#507d38] uppercase">
                    {lang === 'ta' ? tier.tamilLevel : tier.level}
                  </span>
                  <span className="text-[10px] font-bold text-[#102b2a] bg-[#dcff73] px-2 py-0.5 rounded">
                    {lang === 'ta' ? tier.tamilBadge : tier.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#102b2a] leading-snug">
                  {lang === 'ta' ? tier.tamilReward : tier.reward}
                </h4>
              </div>
            ))}

            <div className="p-4 rounded-2xl bg-[#102b2a] text-white text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#dcff73] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified by Hitek Store Ledger</span>
              </div>
              <p className="text-[#bbceca] leading-relaxed">
                When your friend visits our shop at Malang Road and quotes your code or mobile number, your rewards are logged immediately and applied to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
