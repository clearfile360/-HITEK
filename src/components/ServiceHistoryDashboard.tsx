import React, { useState, useEffect } from 'react';
import { History, Plus, Calendar, Clock, AlertTriangle, CheckCircle, CheckCircle2, Trash2, MessageSquare, Wrench, RefreshCw, X, Award, Crown, ShieldCheck, Sparkles, Download } from 'lucide-react';
import { Language } from '../translations';

interface ServiceHistoryDashboardProps {
  lang: Language;
}

export interface ServiceRecord {
  id: string;
  appliance: string;
  tamilAppliance: string;
  serviceType: string;
  tamilServiceType: string;
  lastServiceDate: string;
  intervalMonths: number;
  nextDueDate: string;
  notes: string;
  tamilNotes: string;
}

export const ServiceHistoryDashboard: React.FC<ServiceHistoryDashboardProps> = ({ lang }) => {
  const defaultRecords: ServiceRecord[] = [
    {
      id: 'rec-1',
      appliance: 'Exide 150Ah Tall Tubular Battery',
      tamilAppliance: 'எக்ஸைட் 150Ah டால் டியூபுலர் பேட்டரி',
      serviceType: 'Distilled Water Top-up & Terminal Clean',
      tamilServiceType: 'டிஸ்டில்டு வாட்டர் நிரப்புதல் & டெர்மினல் சுத்தம்',
      lastServiceDate: '2026-06-10',
      intervalMonths: 6,
      nextDueDate: '2026-12-10',
      notes: 'Topped up 1.5L battery-grade distilled water. Applied petroleum jelly on positive terminal.',
      tamilNotes: '1.5 லிட்டர் பேட்டரி நீர் நிரப்பப்பட்டது. டெர்மினல் முனைகள் சுத்தம் செய்யப்பட்டது.'
    },
    {
      id: 'rec-2',
      appliance: '10L Multi-Stage RO Water Purifier',
      tamilAppliance: '10L மல்டி-ஸ்டேஜ் RO குடிநீர் ஃபில்டர்',
      serviceType: 'Pre-Filter Candle Replacement & TDS Test',
      tamilServiceType: 'ப்ரீ-ஃபில்டர் கேண்டில் மாற்றம் & TDS பரிசோதனை',
      lastServiceDate: '2026-07-20',
      intervalMonths: 3,
      nextDueDate: '2026-10-20',
      notes: 'New 5-micron sediment candle installed. Borewell TDS 890 ppm calibrated to 105 ppm.',
      tamilNotes: 'புதிய 5-மைக்ரான் ஸ்பன் கேண்டில் மாற்றப்பட்டது. குடிநீர் TDS 105 ppm ஆக வைக்கப்பட்டது.'
    },
    {
      id: 'rec-3',
      appliance: 'Luminous 900VA Pure Sine Wave UPS',
      tamilAppliance: 'லுமினஸ் 900VA பியூர் சைன் வேவ் UPS',
      serviceType: 'Annual Load Test & Internal Dusting',
      tamilServiceType: 'வருடாந்திர லோடு டெஸ்ட் & டஸ்டிங் சர்வீஸ்',
      lastServiceDate: '2025-10-01',
      intervalMonths: 12,
      nextDueDate: '2026-10-01',
      notes: 'Annual diagnostic check. Verified charging cut-off voltage at 14.4V.',
      tamilNotes: 'வருடாந்திர ஆய்வு. சார்ஜிங் வோல்டேஜ் 14.4V சரியாக உள்ளது.'
    }
  ];

  const [records, setRecords] = useState<ServiceRecord[]>(() => {
    try {
      const stored = localStorage.getItem('hitek_service_history_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // Ignore storage read error
    }
    return defaultRecords;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [appliance, setAppliance] = useState('');
  const [serviceType, setServiceType] = useState('RO Pre-Filter Candle Change');
  const [lastDate, setLastDate] = useState(new Date().toISOString().split('T')[0]);
  const [intervalMonths, setIntervalMonths] = useState(3);
  const [notes, setNotes] = useState('');
  const [maintenanceTenure, setMaintenanceTenure] = useState<'1yr' | '2yr' | '3yr'>('2yr');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hitek_service_history_v1', JSON.stringify(records));
    } catch (e) {
      // Ignore storage write error
    }
  }, [records]);

  // Calculate next due date
  const computeNextDate = (baseDateStr: string, monthsToAdd: number): string => {
    const d = new Date(baseDateStr);
    d.setMonth(d.getMonth() + monthsToAdd);
    return d.toISOString().split('T')[0];
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appliance.trim()) return;

    const calculatedNext = computeNextDate(lastDate, intervalMonths);
    const newEntry: ServiceRecord = {
      id: `rec-${Date.now()}`,
      appliance: appliance.trim(),
      tamilAppliance: appliance.trim(),
      serviceType,
      tamilServiceType: serviceType,
      lastServiceDate: lastDate,
      intervalMonths,
      nextDueDate: calculatedNext,
      notes: notes.trim() || 'Logged by customer in Vaniyambadi',
      tamilNotes: notes.trim() || 'வாடிக்கையாளரால் பதிவு செய்யப்பட்டது'
    };

    setRecords([newEntry, ...records]);
    setIsAddModalOpen(false);
    setAppliance('');
    setNotes('');
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleResetDefaults = () => {
    setRecords(defaultRecords);
  };

  // Determine status (overdue, due soon within 30 days, or on schedule)
  const getStatus = (dueDateStr: string): { label: string; tamilLabel: string; type: 'overdue' | 'due_soon' | 'active' } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDateStr);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: `Overdue by ${Math.abs(diffDays)} days`,
        tamilLabel: `${Math.abs(diffDays)} நாட்கள் தாமதம்`,
        type: 'overdue'
      };
    } else if (diffDays <= 30) {
      return {
        label: `Due Soon (in ${diffDays} days)`,
        tamilLabel: `விரைவில் (${diffDays} நாட்களில்)`,
        type: 'due_soon'
      };
    } else {
      return {
        label: `On Schedule (${diffDays} days left)`,
        tamilLabel: `சரியான நிலையில் (${diffDays} நாட்கள் மீதம்)`,
        type: 'active'
      };
    }
  };

  const handleBookServiceOnWhatsApp = (rec: ServiceRecord) => {
    const text = encodeURIComponent(
      `Hello Hitek Solutions!\nI am checking my service history dashboard for my ${rec.appliance}.\n- Required Service: ${rec.serviceType}\n- Last Serviced: ${rec.lastServiceDate}\n- Next Due: ${rec.nextDueDate}\nPlease dispatch a technician to my address in Vaniyambadi.`
    );
    window.open(`https://wa.me/919150051486?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="service-history" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <History className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'வாடிக்கையாளர் சர்வீஸ் வரலாறு & அட்டவணை' : 'Personal Appliance Ledger'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'எனது சர்வீஸ் வரலாறு.' : 'My Service History.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் வீட்டில் உள்ள இன்வெர்ட்டர், பேட்டரி அல்லது RO குடிநீர் சுத்திகரிப்பின் முந்தைய சர்வீஸ் தேதிகளை பதிவு செய்து, அடுத்த பராமரிப்பு அட்டவணையை எளிதாக கண்காணிக்கவும்.'
                : 'Track past maintenance dates, check automated upcoming schedules, and book timely servicing before appliances breakdown.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#dcff73]" />
              <span>{lang === 'ta' ? '+ புதிய சர்வீஸ் சேர்க்க' : '+ Log Service Date'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="p-3 bg-white border border-[#bac9c0] text-[#526460] hover:text-[#102b2a] rounded-xl hover:bg-[#e8eee5] transition-colors cursor-pointer"
              title="Reset sample records"
              aria-label="Reset sample records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Service Milestone & Hitek Loyalty Card */}
        <div className="mb-10 bg-gradient-to-br from-[#102b2a] via-[#163a38] to-[#0a1c1b] text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left 8 Cols: Badge & Perks */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-[#102b2a] text-xs font-black uppercase tracking-wider shadow-sm">
                  <Crown className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {maintenanceTenure === '3yr'
                      ? (lang === 'ta' ? 'டைமண்ட் மாஸ்டர் லாயல்டி' : 'Diamond Master Milestone')
                      : maintenanceTenure === '2yr'
                      ? (lang === 'ta' ? 'கோல்டன் கார்டியன் லாயல்டி' : 'Golden Guardian Milestone (> 2 Yrs)')
                      : (lang === 'ta' ? 'புரோ ஆக்டிவ் கேர்' : 'Pro Caretaker Milestone')}
                  </span>
                </span>
                <span className="text-xs font-mono text-[#bbceca]">
                  ID: #HS-LOYALTY-VNB-9214 · Verified Household
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>
                    {maintenanceTenure === '2yr' || maintenanceTenure === '3yr'
                      ? (lang === 'ta' ? 'வாணியம்பாடி தங்கப் பாதுகாவலர் அந்தஸ்து' : 'Vaniyambadi Golden Guardian Status')
                      : (lang === 'ta' ? 'செயலில் உள்ள வாடிக்கையாளர் அந்தஸ்து' : 'Active Caretaker Status')}
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </h3>
                <p className="text-xs sm:text-sm text-[#bbceca] mt-1 leading-relaxed">
                  {lang === 'ta'
                    ? '2+ வருடங்களாக உங்கள் வீட்டு இன்வெர்ட்டர் மற்றும் RO சாதனங்களை தவறாமல் முறையாக பராமரித்து வருவதால் உங்களுக்கு பிரத்யேக முன்னுரிமை சேவை சலுகைகள் வழங்கப்பட்டுள்ளன.'
                    : 'Recognizing over 2 years of consistent, uninterrupted domestic appliance maintenance with Hitek Solutions across Vaniyambadi.'}
                </p>
              </div>

              {/* 4 Unlocked Loyalty Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">
                    {lang === 'ta' ? 'அவசர 2 மணி நேர உடனடி டெக்னீசியன் வருகை' : 'Priority 2-Hour Emergency Dispatch'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">
                    {lang === 'ta' ? 'இலவச ஆண்டுதோறும் TDS & RO சுத்திகரிப்பு' : 'Free Annual TDS Calibration & Flush'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">
                    {lang === 'ta' ? 'ஸ்பேர் பார்ட்ஸ் & வாட்டரில் 10% நேரடி தள்ளுபடி' : '10% Flat Discount on Spares & Water'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">
                    {lang === 'ta' ? 'கூடுதல் 6 மாத உத்தரவாத நீட்டிப்பு' : '+6 Months Complimentary Warranty Extension'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Tenure Switcher & Certificate Trigger */}
            <div className="lg:col-span-4 bg-[#0a1c1b]/80 backdrop-blur-xs p-5 rounded-2xl border border-amber-400/30 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#102b2a] flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
                <Award className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 block">
                  {lang === 'ta' ? 'பராமரிப்பு கால அளவு:' : 'Verified Care Tenure:'}
                </span>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {[
                    { id: '1yr', label: '1 Year' },
                    { id: '2yr', label: '2+ Years (Active)' },
                    { id: '3yr', label: '3+ Years' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setMaintenanceTenure(t.id as any)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                        maintenanceTenure === t.id
                          ? 'bg-amber-400 text-[#102b2a]'
                          : 'bg-white/10 text-[#bbceca] hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{lang === 'ta' ? 'லாயல்டி சான்றிதழை பார்க்க' : 'View Loyalty Certificate'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {isCertificateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[#f5f7f4] text-[#102b2a] rounded-3xl border-4 border-amber-400 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-[#102b2a] rounded-lg hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 border-b border-[#dce4de] pb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#102b2a] text-[#dcff73] flex items-center justify-center mx-auto mb-2">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[#507d38]">
                  Hitek Solutions · Vaniyambadi
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#102b2a] tracking-tight">
                  Certificate of Appliance Excellence
                </h3>
                <p className="text-xs text-[#526460]">
                  Presented to verified household in recognition of consistent, 2+ year proactive maintenance.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#dce4de] text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">Certificate No:</span>
                  <strong className="text-[#102b2a]">HS-LOYALTY-VNB-9214</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Loyalty Status:</span>
                  <strong className="text-amber-600 font-bold">Golden Guardian (Level II)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Area:</span>
                  <span className="text-[#102b2a]">Muslimpur / Khaderpet, Vaniyambadi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">VIP Emergency Dispatch:</span>
                  <span className="text-emerald-700 font-bold">Guaranteed within 2 Hours</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/919150051486?text=${encodeURIComponent(
                    'Hello Hitek Solutions! I am a verified Golden Guardian customer (ID: HS-LOYALTY-VNB-9214) with over 2 years of appliance care. I would like to book my priority maintenance check.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 bg-[#102b2a] hover:bg-[#1a4442] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#dcff73]" />
                  <span>Claim VIP Service via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="px-4 py-3 bg-white hover:bg-gray-100 text-[#102b2a] text-xs font-bold rounded-xl border border-[#bac9c0]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((rec) => {
            const status = getStatus(rec.nextDueDate);

            return (
              <div
                key={rec.id}
                className="bg-white border border-[#d9e1da] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Header: Status Badge & Delete button */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {status.type === 'overdue' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        <span>{lang === 'ta' ? status.tamilLabel : status.label}</span>
                      </span>
                    )}
                    {status.type === 'due_soon' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{lang === 'ta' ? status.tamilLabel : status.label}</span>
                      </span>
                    )}
                    {status.type === 'active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'ta' ? status.tamilLabel : status.label}</span>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(rec.id)}
                      className="p-1 text-[#97aaa1] hover:text-red-600 rounded transition-colors cursor-pointer"
                      title="Remove this log"
                      aria-label="Remove this log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Appliance Name */}
                  <h3 className="text-lg font-black text-[#102b2a] mb-1 leading-snug">
                    {lang === 'ta' ? rec.tamilAppliance : rec.appliance}
                  </h3>

                  {/* Service Type Tag */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#507d38] mb-4">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? rec.tamilServiceType : rec.serviceType}</span>
                  </div>

                  {/* Timeline Dates Box */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#f5f7f4] border border-[#e2e8e0] mb-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#526460] block mb-0.5">
                        {lang === 'ta' ? 'கடந்த சர்வீஸ்' : 'Last Service'}
                      </span>
                      <strong className="text-[#102b2a] font-mono">{rec.lastServiceDate}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#526460] block mb-0.5">
                        {lang === 'ta' ? 'அடுத்த பராமரிப்பு' : 'Next Due'}
                      </span>
                      <strong className="text-[#507d38] font-mono">{rec.nextDueDate}</strong>
                    </div>
                  </div>

                  {/* Service Notes */}
                  <p className="text-xs text-[#526460] leading-relaxed mb-6 italic">
                    "{lang === 'ta' ? rec.tamilNotes : rec.notes}"
                  </p>
                </div>

                {/* Bottom WhatsApp Booking CTA */}
                <div className="pt-4 border-t border-[#dce4de]">
                  <button
                    type="button"
                    onClick={() => handleBookServiceOnWhatsApp(rec)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#dcff73]" />
                    <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் சர்வீஸ் புக் செய்ய' : 'Schedule Doorstep Service'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Log New Service */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#d9e1da] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#dce4de] mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#102b2a]">
                    {lang === 'ta' ? 'புதிய சர்வீஸ் விவரத்தை பதிவு செய்க' : 'Log Appliance Service'}
                  </h3>
                  <p className="text-xs text-[#526460]">
                    {lang === 'ta' ? 'உங்கள் உபகரணத்தின் முந்தைய சர்வீஸ் தேதியை உள்ளிடவும்' : 'Enter past maintenance details to compute your next schedule'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-[#526460] hover:text-[#102b2a] rounded-lg hover:bg-[#e8eee5] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                    {lang === 'ta' ? 'உபகரணம் / மாடல் பெயர்' : 'Appliance / Model Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={appliance}
                    onChange={(e) => setAppliance(e.target.value)}
                    placeholder="e.g. Exide 150Ah Inverter Battery, or Kent RO Water Purifier"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                    {lang === 'ta' ? 'சர்வீஸ் வகை' : 'Service Type'}
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  >
                    <option value="RO Pre-Filter Candle Change">RO Pre-Filter Candle Change</option>
                    <option value="RO Annual Membrane & Carbon Filter Service">RO Annual Membrane & Carbon Filter Service</option>
                    <option value="Inverter Battery Distilled Water & Terminal Clean">Inverter Battery Distilled Water & Terminal Clean</option>
                    <option value="Inverter Board Diagnostic & Dusting">Inverter Board Diagnostic & Dusting</option>
                    <option value="Solar Water Heater Descaling">Solar Water Heater Descaling</option>
                    <option value="Washing Machine / Appliance Checkup">Washing Machine / Appliance Checkup</option>
                    <option value="Electrician Wiring Audit">Electrician Wiring Audit</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'சர்வீஸ் செய்யப்பட்ட தேதி' : 'Last Service Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={lastDate}
                      onChange={(e) => setLastDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                      {lang === 'ta' ? 'பராமரிப்பு இடைவெளி' : 'Service Frequency'}
                    </label>
                    <select
                      value={intervalMonths}
                      onChange={(e) => setIntervalMonths(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                    >
                      <option value={3}>Every 3 Months (RO Spun Candle)</option>
                      <option value={6}>Every 6 Months (Battery Water Check)</option>
                      <option value={12}>Every 12 Months (Annual Overhaul)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1">
                    {lang === 'ta' ? 'குறிப்புகள் (தேவையெனில்)' : 'Service Notes / Observations (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Changed pre-filter candle; measured TDS at 110 ppm"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a] resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-[#dce4de] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-[#526460] hover:text-[#102b2a]"
                  >
                    {lang === 'ta' ? 'ரத்து' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    {lang === 'ta' ? 'பதிவு செய்க' : 'Save Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
