import React, { useState, useEffect } from 'react';
import { Bell, BellRing, CheckCircle2, ShieldCheck, Tag, Wrench, Sparkles, Smartphone, AlertCircle } from 'lucide-react';
import { Language } from '../translations';

interface PushNotificationCenterProps {
  lang: Language;
}

export const PushNotificationCenter: React.FC<PushNotificationCenterProps> = ({ lang }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [serviceRemindersEnabled, setServiceRemindersEnabled] = useState(true);
  const [priceAlertsEnabled, setPriceAlertsEnabled] = useState(true);
  const [notificationSentMessage, setNotificationSentMessage] = useState<string | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support Web Push Notifications.');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        showSampleNotification(
          '🔔 Push Notifications Activated!',
          'You will now receive service appointment reminders and local Vaniyambadi price drop alerts from Hitek Solutions.',
          '/#service-history'
        );
      }
    } catch (e) {
      console.warn('Notification permission error:', e);
    }
  };

  const showSampleNotification = async (title: string, body: string, url: string) => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, {
          body,
          icon: '/batteries.svg',
          badge: '/batteries.svg',
          tag: 'hitek-service-worker-push',
          data: { url }
        } as NotificationOptions);
      } else {
        new Notification(title, {
          body,
          icon: '/batteries.svg'
        });
      }
    } else {
      requestPermission();
    }
  };

  const triggerServiceReminderPush = () => {
    showSampleNotification(
      lang === 'ta' ? '🔧 சர்வீஸ் நினைவூட்டல்: பேட்டரி & RO பராமரிப்பு' : '🔧 Hitek Solutions: Service Appointment Reminder',
      lang === 'ta'
        ? 'உங்கள் இன்வெர்ட்டர் பேட்டரிக்கு டிஸ்டில்டு வாட்டர் ஊற்றுதல் மற்றும் RO ஃபில்டர் கேண்டில் மாற்றுவதற்கான நேரம் வந்துவிட்டது.'
        : 'Your household 150Ah Tubular Battery distilled water check and RO pre-filter spun candle change are due in Vaniyambadi.',
      '/#service-history'
    );
    setNotificationSentMessage(lang === 'ta' ? 'சர்வீஸ் நினைவூட்டல் அறிவிப்பு அனுப்பப்பட்டது!' : 'Service reminder push notification dispatched via Service Worker!');
    setTimeout(() => setNotificationSentMessage(null), 4000);
  };

  const triggerPriceAlertPush = () => {
    showSampleNotification(
      lang === 'ta' ? '⚡ வாணியம்பாடி விலை குறைப்பு எச்சரிக்கை!' : '⚡ Vaniyambadi Local Price Alert!',
      lang === 'ta'
        ? 'மலாங் ரோடு கடையில் பழைய பேட்டரிக்கு கூடுதல் ₹500 ஸ்கிராப் போனஸ் & 1150VA இன்வெர்ட்டருக்கு ₹1,000 தள்ளுபடி!'
        : 'Malang Road Store: Extra ₹500 scrap bonus on dead batteries + ₹1,000 festive discount on Pure Sine Wave Inverter combos.',
      '/#special-offers'
    );
    setNotificationSentMessage(lang === 'ta' ? 'விலை குறைப்பு அறிவிப்பு அனுப்பப்பட்டது!' : 'Price alert push notification dispatched via Service Worker!');
    setTimeout(() => setNotificationSentMessage(null), 4000);
  };

  return (
    <section id="push-notifications" className="py-12 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102b2a] text-white rounded-3xl border border-[#2b4441] p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: Info & Permission Request */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#dcff73] uppercase tracking-wider">
                <BellRing className="w-4 h-4 text-[#dcff73] animate-pulse" />
                <span>{lang === 'ta' ? 'சர்வீஸ் ஒர்க்கர் புஷ் அறிவிப்புகள்' : 'Service Worker Web Push Alerts'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {lang === 'ta' ? 'சர்வீஸ் நினைவூட்டல்கள் & வாணியம்பாடி விலை தள்ளுபடிகள்' : 'Instant Service Reminders & Local Price Drop Alerts.'}
              </h3>

              <p className="text-xs sm:text-sm text-[#bbceca] leading-relaxed">
                {lang === 'ta'
                  ? 'எங்கள் சர்வீஸ் ஒர்க்கர் உங்கள் போனில் நேரடியாக அறிவிப்புகளை அனுப்பும். பேட்டரி நீர் குறைவு, RO ஃபில்டர் மாற்றுதல் மற்றும் மலாங் ரோடு கடையின் பிரத்யேக தள்ளுபடிகளை உடனடியாக அறியலாம்.'
                  : 'Leverages browser Service Worker technology to notify you before power cuts occur—alerting when routine battery electrolyte top-up or RO filter change is due, plus exclusive flash discounts for Vaniyambadi residents.'}
              </p>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#0e2423] border border-[#223936] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceRemindersEnabled}
                    onChange={(e) => setServiceRemindersEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#dcff73] rounded"
                  />
                  <div className="text-xs">
                    <strong className="text-white block flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#dcff73]" />
                      <span>{lang === 'ta' ? 'சர்வீஸ் நினைவூட்டல்' : 'Service Reminders'}</span>
                    </strong>
                    <span className="text-[11px] text-[#8fa8a3]">Distilled water &amp; filter cycle</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#0e2423] border border-[#223936] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={priceAlertsEnabled}
                    onChange={(e) => setPriceAlertsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#dcff73] rounded"
                  />
                  <div className="text-xs">
                    <strong className="text-white block flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-orange-400" />
                      <span>{lang === 'ta' ? 'விலை தள்ளுபடி எச்சரிக்கை' : 'Local Price Drop Alerts'}</span>
                    </strong>
                    <span className="text-[11px] text-[#8fa8a3]">Scrap bonus &amp; festival deals</span>
                  </div>
                </label>
              </div>

              {/* Permission Button / Status */}
              <div className="pt-2">
                {permission !== 'granted' ? (
                  <button
                    type="button"
                    onClick={requestPermission}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'புஷ் அறிவிப்புகளை அனுமதிக்க' : 'Enable Service Worker Push Notifications'}</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ta' ? 'புஷ் அறிவிப்புகள் அனுமதிக்கப்பட்டுள்ளன' : 'Web Push Notifications Active & Subscribed'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Cols: Live Interactive Test Simulator */}
            <div className="lg:col-span-5 bg-[#0a1c1b] rounded-2xl border border-[#23423f] p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#dcff73]" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dcff73]">
                  {lang === 'ta' ? 'அறிவிப்பு சோதனை சிமுலேட்டர்' : 'Live Notification Simulator'}
                </h4>
              </div>

              <p className="text-xs text-[#8fa8a3] leading-relaxed">
                {lang === 'ta'
                  ? 'கீழே உள்ள பட்டன்களை அழுத்தி உங்கள் சாதனத்தில் அறிவிப்பு எவ்வாறு தோன்றும் என்பதை சோதிக்கலாம்:'
                  : 'Test how your browser and operating system display real-time push alerts from Hitek Solutions:'}
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={triggerServiceReminderPush}
                  className="w-full text-left p-3.5 rounded-xl bg-[#0e2423] border border-[#223936] hover:border-[#507d38] transition-colors flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <strong className="text-white block group-hover:text-[#dcff73] transition-colors">
                      {lang === 'ta' ? '🔧 சர்வீஸ் நினைவூட்டலை சோதிக்க' : '🔧 Test Service Reminder Push'}
                    </strong>
                    <span className="text-[11px] text-[#8fa8a3]">Triggers 150Ah battery water &amp; RO check</span>
                  </div>
                  <Bell className="w-4 h-4 text-[#dcff73] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={triggerPriceAlertPush}
                  className="w-full text-left p-3.5 rounded-xl bg-[#0e2423] border border-[#223936] hover:border-orange-500 transition-colors flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <strong className="text-white block group-hover:text-orange-400 transition-colors">
                      {lang === 'ta' ? '⚡ விலை குறைப்பு எச்சரிக்கையை சோதிக்க' : '⚡ Test Vaniyambadi Price Drop Alert'}
                    </strong>
                    <span className="text-[11px] text-[#8fa8a3]">Triggers ₹500 scrap bonus flash deal</span>
                  </div>
                  <Tag className="w-4 h-4 text-orange-400 shrink-0" />
                </button>
              </div>

              {notificationSentMessage && (
                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{notificationSentMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
