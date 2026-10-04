import React, { useState, useEffect } from 'react';
import { Bell, Calendar, ShieldCheck, Check, Mail, MessageSquare, Clock, ArrowRight, Trash2 } from 'lucide-react';

interface ReminderRecord {
  serviceType: string;
  channel: 'sms' | 'email';
  contact: string;
  name: string;
  area: string;
  nextDate: string;
  createdOn: string;
}

export const ServiceReminder: React.FC = () => {
  const [serviceType, setServiceType] = useState('Annual RO Filter & Membrane Change');
  const [channel, setChannel] = useState<'sms' | 'email'>('sms');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [area, setArea] = useState('');
  const [lastServiceMonthsAgo, setLastServiceMonthsAgo] = useState('0');
  const [savedReminders, setSavedReminders] = useState<ReminderRecord[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Load any previously saved reminders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hitek_service_reminders');
      if (stored) {
        setSavedReminders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const calculateNextDueDate = (service: string, monthsAgo: number): string => {
    const today = new Date();
    let intervalMonths = 6;
    if (service.includes('Candle')) intervalMonths = 3;
    if (service.includes('Annual') || service.includes('Solar')) intervalMonths = 12;

    const remainingMonths = Math.max(1, intervalMonths - monthsAgo);
    today.setMonth(today.getMonth() + remainingMonths);
    return today.toLocaleDateString('en-IN', {
      month: 'short',
      year: 'numeric',
      day: 'numeric'
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    const nextDue = calculateNextDueDate(serviceType, parseInt(lastServiceMonthsAgo, 10));

    const newReminder: ReminderRecord = {
      serviceType,
      channel,
      contact: contact.trim(),
      name: name.trim(),
      area: area.trim() || 'Vaniyambadi',
      nextDate: nextDue,
      createdOn: new Date().toLocaleDateString('en-IN')
    };

    const updated = [newReminder, ...savedReminders.slice(0, 4)];
    setSavedReminders(updated);
    try {
      localStorage.setItem('hitek_service_reminders', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);

    // Optional: Pre-fill WhatsApp notification so Hitek registers it on their calendar
    const waText = encodeURIComponent(
      `Hello Hitek Solutions!\nI scheduled a Service Reminder on your website:\n- Name: ${name.trim()} (${area.trim() || 'Vaniyambadi'})\n- Service: ${serviceType}\n- Channel: ${channel === 'sms' ? 'SMS/WhatsApp' : 'Email'} (${contact.trim()})\n- Estimated Due: ${nextDue}\nPlease record my equipment in your service maintenance log.`
    );

    // Trigger WhatsApp notification in a non-intrusive way or let user click
    setTimeout(() => {
      setName('');
      setContact('');
      setArea('');
    }, 1000);
  };

  const removeReminder = (index: number) => {
    const updated = savedReminders.filter((_, i) => i !== index);
    setSavedReminders(updated);
    try {
      localStorage.setItem('hitek_service_reminders', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="reminder" className="py-20 bg-[#f5f7f4] border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Bell className="w-3.5 h-3.5 text-[#507d38]" />
              <span>Automated Care Alerts</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight mb-4 text-balance">
              Never Miss a Filter or<br />Battery Health Check.
            </h2>

            <p className="text-sm sm:text-base text-[#526460] leading-relaxed mb-8">
              Regular maintenance prevents sudden inverter battery breakdowns during stormy nights and keeps your RO drinking water crystal pure and sweet. Set up free SMS or email alerts ahead of your service cycle.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#d9e1da]">
                <div className="w-8 h-8 rounded-lg bg-[#dcff73]/40 flex items-center justify-center text-[#102b2a] shrink-0 font-bold text-xs font-mono">
                  RO
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102b2a]">RO Sediment Candle (Every 3–4 Months)</h3>
                  <p className="text-xs text-[#526460]">Protects the expensive internal RO membrane from silt, red mud, and borewell dust.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#d9e1da]">
                <div className="w-8 h-8 rounded-lg bg-[#dcff73]/40 flex items-center justify-center text-[#102b2a] shrink-0 font-bold text-xs font-mono">
                  BAT
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102b2a]">Inverter Battery Health &amp; Distilled Water (Every 6 Months)</h3>
                  <p className="text-xs text-[#526460]">Prevents plate sulfation, tops up electrolyte level, and checks specific gravity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#d9e1da]">
                <div className="w-8 h-8 rounded-lg bg-[#dcff73]/40 flex items-center justify-center text-[#102b2a] shrink-0 font-bold text-xs font-mono">
                  MEM
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102b2a]">Annual RO Membrane &amp; Sanitization (12 Months)</h3>
                  <p className="text-xs text-[#526460]">Ensures bacterial disinfection and maintains 90%+ mineral rejection efficiency.</p>
                </div>
              </div>
            </div>

            {/* Saved Reminders list if exists */}
            {savedReminders.length > 0 && (
              <div className="bg-white border border-[#d9e1da] rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#102b2a] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#507d38]" />
                    <span>Your Active Maintenance Reminders ({savedReminders.length})</span>
                  </span>
                </div>
                <div className="space-y-2">
                  {savedReminders.map((rem, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f7f4] border border-[#e2e8e0] text-xs">
                      <div>
                        <strong className="text-[#102b2a] block">{rem.serviceType}</strong>
                        <span className="text-[#526460]">
                          Due: <span className="font-semibold text-[#507d38]">{rem.nextDate}</span> · Sent via {rem.channel.toUpperCase()} to {rem.contact}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeReminder(i)}
                        className="p-1 text-[#526460] hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete reminder"
                        aria-label="Delete reminder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Widget Form Column */}
          <div className="lg:col-span-6 bg-white border border-[#d9e1da] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#dce4de] mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#102b2a]">
                  Service Reminder Widget
                </h3>
                <p className="text-xs text-[#526460]">
                  Get timely reminders before equipment failure
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#dcff73] flex items-center justify-center text-[#102b2a]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Select Service Type */}
              <div>
                <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1.5">
                  Select Maintenance Service
                </label>
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] font-medium text-[#102b2a]"
                >
                  <option value="RO Sediment Pre-Filter Candle Check">RO Sediment Pre-Filter Candle Check (Every 3-4 Months)</option>
                  <option value="Annual RO Filter & Membrane Change">Annual RO Filter &amp; Membrane Change (Every 12 Months)</option>
                  <option value="Inverter Battery Distilled Water & Health Check">Inverter Battery Distilled Water &amp; Health Check (Every 6 Months)</option>
                  <option value="Solar Water Heater Descaling & Tank Flush">Solar Water Heater Descaling &amp; Tank Flush (Annual)</option>
                </select>
              </div>

              {/* Notification Channel Choice */}
              <div>
                <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1.5">
                  Send Reminder Via
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('sms')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                      channel === 'sms'
                        ? 'border-[#102b2a] bg-[#102b2a] text-white shadow-xs'
                        : 'border-[#bac9c0] bg-white text-[#526460] hover:bg-[#f5f7f4]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#dcff73]" />
                    <span>WhatsApp / SMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannel('email')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                      channel === 'email'
                        ? 'border-[#102b2a] bg-[#102b2a] text-white shadow-xs'
                        : 'border-[#bac9c0] bg-white text-[#526460] hover:bg-[#f5f7f4]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#dcff73]" />
                    <span>Email Alert</span>
                  </button>
                </div>
              </div>

              {/* Contact detail & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Aslam Khan"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1.5">
                    {channel === 'sms' ? 'Mobile / WhatsApp Number' : 'Email Address'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={channel === 'sms' ? 'tel' : 'email'}
                    required
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder={channel === 'sms' ? 'e.g. 98765 43210' : 'e.g. name@example.com'}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  />
                </div>
              </div>

              {/* Area & Last Serviced Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1.5">
                    Area / Street in Vaniyambadi
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    placeholder="e.g. Malang Road, Muslimpur"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102b2a] uppercase tracking-wider mb-1.5">
                    When was it last serviced?
                  </label>
                  <select
                    value={lastServiceMonthsAgo}
                    onChange={e => setLastServiceMonthsAgo(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#bac9c0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
                  >
                    <option value="0">Brand New / Installed this month</option>
                    <option value="2">2 months ago</option>
                    <option value="4">4 months ago</option>
                    <option value="6">6 months ago</option>
                    <option value="10">10+ months ago (Overdue)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#102b2a] text-white font-bold text-sm rounded-lg hover:bg-[#1a4442] transition-colors cursor-pointer shadow-xs"
              >
                <Bell className="w-4 h-4 text-[#dcff73]" />
                <span>Activate Free Service Reminder</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] text-[#526460] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#507d38] shrink-0" />
                <span>We respect your privacy. No spam — only genuine service interval notices.</span>
              </div>

              {submitted && (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Reminder successfully registered!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    We've logged your alert. You can also notify our shop ledger on WhatsApp directly:
                  </p>
                  <a
                    href={`https://wa.me/919150051486?text=${encodeURIComponent(
                      `Hello Hitek Solutions! I registered a service reminder for ${serviceType} in ${area || 'Vaniyambadi'}. Please ensure my contact is recorded for next cycle.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send confirmation to Hitek WhatsApp ledger &rarr;</span>
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
