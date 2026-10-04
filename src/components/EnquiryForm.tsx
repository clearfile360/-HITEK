import React, { useState } from 'react';
import { Send, MessageSquare, Copy, Check, Sparkles, ArrowRight, ArrowLeft, User, MapPin, Phone, Layers, FileText } from 'lucide-react';
import { Language, translations } from '../translations';

interface EnquiryFormProps {
  lang: Language;
  selectedProduct: string;
  setSelectedProduct: (val: string) => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  lang,
  selectedProduct,
  setSelectedProduct
}) => {
  const t = translations[lang].enquiry;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState('');

  const productOptions = [
    { id: 'Inverters & UPS', label: 'Inverters & UPS', desc: 'Sine Wave Home Backup' },
    { id: 'Batteries', label: 'Batteries', desc: 'Exide, Amaron, Tubular' },
    { id: 'RO water filters', label: 'RO water filters', desc: 'Water Purifiers & Service' },
    { id: 'Solar solutions', label: 'Solar solutions', desc: 'Water Heaters & PV' },
    { id: 'Service enquiry - Appliances', label: 'Appliances Service', desc: 'Washing Machine, Fridge' },
    { id: 'Service enquiry - Electrician', label: 'Electrician & Wiring', desc: 'Doorstep Power Repair' },
    { id: 'Service enquiry - Plumber', label: 'Plumber & Piping', desc: 'Leaks, Taps & Tank' }
  ];

  const currentProduct = selectedProduct || 'Inverters & UPS';

  const constructedMessage = `Hello Hitek Solutions!\nI am ${name.trim() || '[Your Name]'} from ${area.trim() || 'Vaniyambadi'}.\nInterested in: ${currentProduct}${phone.trim() ? `\nContact: ${phone.trim()}` : ''}\n${need.trim() ? `Requirement: ${need.trim()}\n` : ''}Please share availability and details.`;

  const handleNextToStep2 = () => {
    setStepError('');
    setCurrentStep(2);
  };

  const handleNextToStep3 = () => {
    if (!name.trim()) {
      setStepError(lang === 'ta' ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்' : 'Please enter your name');
      return;
    }
    if (!area.trim()) {
      setStepError(lang === 'ta' ? 'தயவுசெய்து உங்கள் பகுதியை உள்ளிடவும்' : 'Please enter your area in Vaniyambadi');
      return;
    }
    setStepError('');
    setCurrentStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !area.trim()) {
      setCurrentStep(2);
      return;
    }

    setSubmitted(true);
    const finalMsg = `Hello Hitek Solutions!\nI am ${name.trim()} from ${area.trim()}.\nInterested in: ${currentProduct}${phone.trim() ? `\nContact: ${phone.trim()}` : ''}\n${need.trim() ? `Requirement: ${need.trim()}\n` : ''}Please share availability and details.`;
    
    const url = `https://wa.me/919150051486?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(constructedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercentage = Math.round((currentStep / 3) * 100);

  return (
    <section id="enquire" className="py-20 bg-[#102b2a] text-white border-b border-[#38504d] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Guidance & Local Reassurance */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#dcff73] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#dcff73]" />
                <span>{t.eyebrow}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-balance whitespace-pre-line">
                {t.title}
              </h2>

              <p className="text-sm sm:text-base text-[#bbceca] leading-relaxed mb-8">
                {t.subtitle}
              </p>

              {/* Steps Guide */}
              <ol className="space-y-4 mb-8">
                <li className={`flex items-center gap-4 py-3 border-t border-[#38504d] text-sm transition-colors ${currentStep === 1 ? 'text-[#dcff73] font-bold' : 'text-[#e2ece9]'}`}>
                  <span className="font-mono text-sm font-bold text-[#dcff73]">01</span>
                  <span>{lang === 'ta' ? 'தேவையான தயாரிப்பு அல்லது சேவையைத் தேர்வு செய்யவும்.' : 'Choose your product or service requirement.'}</span>
                </li>
                <li className={`flex items-center gap-4 py-3 border-t border-[#38504d] text-sm transition-colors ${currentStep === 2 ? 'text-[#dcff73] font-bold' : 'text-[#e2ece9]'}`}>
                  <span className="font-mono text-sm font-bold text-[#dcff73]">02</span>
                  <span>{lang === 'ta' ? 'வாணியம்பாடியில் உங்கள் இருப்பிடத்தை பகிரவும்.' : 'Share your location in or around Vaniyambadi.'}</span>
                </li>
                <li className={`flex items-center gap-4 py-3 border-t border-[#38504d] text-sm transition-colors ${currentStep === 3 ? 'text-[#dcff73] font-bold' : 'text-[#e2ece9]'}`}>
                  <span className="font-mono text-sm font-bold text-[#dcff73]">03</span>
                  <span>{lang === 'ta' ? 'உடனடி ஸ்டாக் மற்றும் விலையை அறிய வாட்ஸ்அப்பில் பேசவும்.' : 'Ask Hitek for instant stock availability & quote.'}</span>
                </li>
              </ol>
            </div>

            {/* Tamil Reassurance Callout */}
            <div className="p-4 rounded-xl bg-[#091a19] border border-[#23423f] mt-4">
              <p className="text-sm font-bold text-[#dcff73] mb-1">
                {lang === 'ta' ? 'எளிதான வாட்ஸ்அப் பதிவு' : 'Quick WhatsApp Booking'}
              </p>
              <p className="text-xs text-[#bbceca] whitespace-pre-line">
                {t.tamilNote}
              </p>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form with Stepper */}
          <div className="lg:col-span-7 bg-white text-[#102b2a] rounded-2xl p-6 sm:p-8 border border-[#d9e1da] shadow-xl">
            {/* Header: Title & Step Count */}
            <div className="flex items-center justify-between pb-4 border-b border-[#dce4de] mb-6">
              <div>
                <h3 className="text-xl font-black text-[#102b2a]">
                  {lang === 'ta' ? 'ஹைடெக் உதவி & விலை கோரல்' : 'Ask Hitek'}
                </h3>
                <p className="text-xs text-[#526460]">
                  {lang === 'ta' ? `படிநிலை ${currentStep} / 3 (${progressPercentage}% முடிந்தது)` : `Step ${currentStep} of 3 (${progressPercentage}% Completed)`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#dcff73] flex items-center justify-center text-[#102b2a]">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            {/* Visual Stepper Bar Component */}
            <div className="mb-6">
              {/* Step Badges Row */}
              <div className="grid grid-cols-3 gap-2 mb-2 text-center text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`flex items-center justify-center gap-1.5 py-1 rounded transition-colors cursor-pointer ${
                    currentStep === 1
                      ? 'text-[#102b2a] font-extrabold'
                      : currentStep > 1
                      ? 'text-[#507d38]'
                      : 'text-[#97aaa1]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep > 1 ? 'bg-[#507d38] text-white' : currentStep === 1 ? 'bg-[#102b2a] text-white' : 'bg-[#e2e8e0] text-[#526460]'
                  }`}>
                    {currentStep > 1 ? '✓' : '1'}
                  </span>
                  <span className="hidden sm:inline">{lang === 'ta' ? 'தயாரிப்பு' : 'Product'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className={`flex items-center justify-center gap-1.5 py-1 rounded transition-colors cursor-pointer ${
                    currentStep === 2
                      ? 'text-[#102b2a] font-extrabold'
                      : currentStep > 2
                      ? 'text-[#507d38]'
                      : 'text-[#97aaa1]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep > 2 ? 'bg-[#507d38] text-white' : currentStep === 2 ? 'bg-[#102b2a] text-white' : 'bg-[#e2e8e0] text-[#526460]'
                  }`}>
                    {currentStep > 2 ? '✓' : '2'}
                  </span>
                  <span className="hidden sm:inline">{lang === 'ta' ? 'விவரங்கள்' : 'Details'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (name.trim() && area.trim()) setCurrentStep(3);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1 rounded transition-colors cursor-pointer ${
                    currentStep === 3
                      ? 'text-[#102b2a] font-extrabold'
                      : 'text-[#97aaa1]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep === 3 ? 'bg-[#102b2a] text-white' : 'bg-[#e2e8e0] text-[#526460]'
                  }`}>
                    3
                  </span>
                  <span className="hidden sm:inline">{lang === 'ta' ? 'சரிபார்த்தல்' : 'Review'}</span>
                </button>
              </div>

              {/* Animated Progress Track */}
              <div className="w-full h-2 bg-[#e2e8e0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#507d38] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Error Message if any */}
            {stepError && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {stepError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Select Product / Service */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-2">
                      {lang === 'ta' ? '1. உங்களுக்கு தேவையானதை தேர்வு செய்யவும்' : '1. What are you looking for?'}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {productOptions.map((opt) => {
                        const isSelected = currentProduct === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedProduct(opt.id)}
                            className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'border-[#507d38] bg-[#f9fbf8] shadow-xs'
                                : 'border-[#dce4de] bg-white hover:bg-[#f5f7f4]'
                            }`}
                          >
                            <div>
                              <strong className={`block text-xs sm:text-sm ${isSelected ? 'text-[#507d38]' : 'text-[#102b2a]'}`}>
                                {opt.label}
                              </strong>
                              <span className="text-[11px] text-[#526460]">{opt.desc}</span>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                              isSelected ? 'border-[#507d38] bg-[#507d38] text-white' : 'border-[#bac9c0]'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 1 Actions */}
                  <div className="pt-4 border-t border-[#dce4de] flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextToStep2}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#102b2a] text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-[#1a4442] transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{lang === 'ta' ? 'அடுத்த படி: உங்கள் விவரங்கள்' : 'Next: Your Details'}</span>
                      <ArrowRight className="w-4 h-4 text-[#dcff73]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Name, Phone & Locality */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                    {lang === 'ta' ? '2. உங்கள் தொடர்பு விவரங்கள்' : '2. Your Contact & Area in Vaniyambadi'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-bold text-[#102b2a] mb-1">
                        {lang === 'ta' ? 'உங்கள் பெயர்' : 'Your Name'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#97aaa1] absolute left-3 top-3" />
                        <input
                          id="name-input"
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Farooq / Rajesh"
                          maxLength={80}
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone-input" className="block text-xs font-bold text-[#102b2a] mb-1">
                        {lang === 'ta' ? 'தொலைபேசி / வாட்ஸ்அப்' : 'Phone / WhatsApp'} (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#97aaa1] absolute left-3 top-3" />
                        <input
                          id="phone-input"
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="e.g. 98765 43210"
                          maxLength={15}
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="area-input" className="block text-xs font-bold text-[#102b2a] mb-1">
                      {lang === 'ta' ? 'உங்கள் தெரு / பகுதி' : 'Your Street / Locality in Vaniyambadi'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#97aaa1] absolute left-3 top-3" />
                      <input
                        id="area-input"
                        type="text"
                        required
                        value={area}
                        onChange={e => setArea(e.target.value)}
                        placeholder="e.g. Muslimpur, Khaderpet, Newtown, Malang Road"
                        maxLength={120}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                      />
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 border-t border-[#dce4de] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#526460] hover:text-[#102b2a] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === 'ta' ? 'பின்செல்ல' : 'Back'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextToStep3}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#102b2a] text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-[#1a4442] transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{lang === 'ta' ? 'அடுத்த படி: சரிபார்த்தல்' : 'Next: Review & Send'}</span>
                      <ArrowRight className="w-4 h-4 text-[#dcff73]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Notes & WhatsApp Preview */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                    {lang === 'ta' ? '3. தேவைகள் & உறுதிசெய்தல்' : '3. Specific Requirements & Final Review'}
                  </div>

                  <div>
                    <label htmlFor="need-input" className="block text-xs font-bold text-[#102b2a] mb-1">
                      {lang === 'ta' ? 'கூடுதல் விவரங்கள் (தேவையெனில்)' : 'Additional Notes / Appliances to Run (Optional)'}
                    </label>
                    <textarea
                      id="need-input"
                      rows={2}
                      value={need}
                      onChange={e => setNeed(e.target.value)}
                      placeholder="e.g. Need 150Ah battery replacement, or RO filter membrane service, or technician visit"
                      maxLength={1000}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a] resize-none"
                    />
                  </div>

                  {/* Live WhatsApp Message Preview Card */}
                  <div className="p-3.5 rounded-xl bg-[#f5f7f4] border border-[#d9e1da]">
                    <span className="text-[11px] font-bold text-[#507d38] uppercase tracking-wider block mb-1">
                      {lang === 'ta' ? 'வாட்ஸ்அப் செய்தி முன்னோட்டம்:' : 'WhatsApp Message Preview:'}
                    </span>
                    <p className="text-xs text-[#37474f] font-mono whitespace-pre-line leading-relaxed">
                      {constructedMessage}
                    </p>
                  </div>

                  {/* Scan & Pay Deposit Quick Banner */}
                  <div className="p-3 rounded-xl bg-[#f0f4ee] border border-[#bac9c0] flex items-center justify-between gap-3 text-xs">
                    <div>
                      <strong className="text-[#102b2a] block">
                        {lang === 'ta' ? 'சர்வீஸ் அட்வான்ஸ் அல்லது கட்டணம் செலுத்த வேண்டுமா?' : 'Need to pay booking deposit or visit fee?'}
                      </strong>
                      <span className="text-[#526460]">
                        {lang === 'ta' ? 'அதிகாரப்பூர்வ Hitek UPI QR குறியீட்டைப் பயன்படுத்தி உடனடியாக செலுத்தலாம்.' : 'Use official Hitek UPI Scan & Pay for zero-fee payment.'}
                      </span>
                    </div>
                    <a
                      href="#scan-and-pay"
                      className="px-3 py-1.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold rounded-lg shrink-0 transition-colors"
                    >
                      {lang === 'ta' ? 'Scan & Pay' : 'Scan & Pay'}
                    </a>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="pt-2 border-t border-[#dce4de] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#526460] hover:text-[#102b2a] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === 'ta' ? 'பின்செல்ல' : 'Back'}</span>
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#dcff73] text-[#102b2a] font-black text-sm rounded-lg hover:bg-[#cbe663] transition-colors cursor-pointer shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் அனுப்பவும்' : 'Continue on WhatsApp'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#526460] pt-1">
                    <span>{lang === 'ta' ? 'உங்கள் விவரங்களுடன் வாட்ஸ்அப் திறக்கும்.' : 'Opens WhatsApp with your enquiry pre-filled.'}</span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 font-semibold text-[#102b2a] hover:underline cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {submitted && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{lang === 'ta' ? 'வாட்ஸ்அப் திறக்கப்பட்டது! அழைப்புக்கு: 91500 51486' : 'WhatsApp opened! If blocked, call us at 91500 51486.'}</span>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
