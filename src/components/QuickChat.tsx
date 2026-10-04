import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Phone, CheckCheck, Sparkles, MapPin, Bot, ArrowRight, Clock, Recycle, Droplets, Wrench, Zap } from 'lucide-react';
import { Language } from '../translations';

interface QuickChatProps {
  lang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  action?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
}

export const QuickChat: React.FC<QuickChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-0',
    sender: 'assistant',
    text: lang === 'ta'
      ? 'வணக்கம்! நான் ஹைடெக் ஸ்மார்ட் உதவியாளர். கடையின் வேலை நேரம், பழைய பேட்டரி மறுசுழற்சி, RO ஃபில்டர் மாற்றுதல் அல்லது எலக்ட்ரீஷியன் வருகை பற்றி கேளுங்கள்!'
      : 'Hello! I am Hitek Automated Assistant. Ask me about store service hours, old battery disposal steps, RO filter costs, or doorstep electrician booking!',
    time: 'Just now'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  const quickPills = lang === 'ta' ? [
    { label: '⏰ வேலை நேரம்', query: 'கடை திறக்கும் நேரம் என்ன?' },
    { label: '♻️ பேட்டரி மறுசுழற்சி', query: 'பழைய பேட்டரி மறுசுழற்சி & ஸ்கிராப் விலை என்ன?' },
    { label: '💧 RO ஃபில்டர் சர்வீஸ்', query: 'RO ஃபில்டர் கேண்டில் மாற்றுவதற்கான செலவு எவ்வளவு?' },
    { label: '⚡ எலக்ட்ரீஷியன் கட்டணம்', query: 'எலக்ட்ரீஷியன் விசிட்டிங் சார்ஜ் எவ்வளவு?' }
  ] : [
    { label: '⏰ Service Hours', query: 'What are your store service hours?' },
    { label: '♻️ Battery Disposal', query: 'How does old battery disposal & scrap exchange work?' },
    { label: '💧 RO Filter Cost', query: 'How much does RO filter replacement cost?' },
    { label: '⚡ Electrician Charges', query: 'What is the doorstep electrician visiting charge?' }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Automated Intent Detection & Response Engine
  const generateBotResponse = (userQuery: string): { text: string; action?: { label: string; href: string; isExternal?: boolean } } => {
    const q = userQuery.toLowerCase();

    // Intent 1: Service Hours & Store Timings
    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('sunday') || q.includes('timing') || q.includes('நேரம்') || q.includes('திறக்கும்')) {
      return {
        text: lang === 'ta'
          ? '⏰ ஹைடெக் சொல்யூஷன்ஸ் வேலை நேரம்:\n• திங்கள் - சனி: காலை 9:00 - இரவு 9:00\n• ஞாயிறு: காலை 10:00 - மாலை 6:00\n• அவசர மின் தடை உதவி: 24/7 தொலைபேசி ஆதரவு (+91 91500 51486).'
          : '⏰ Hitek Solutions Showroom Hours:\n• Monday – Saturday: 9:00 AM – 9:00 PM\n• Sunday: 10:00 AM – 6:00 PM\n• 24/7 Emergency Phone Support: +91 91500 51486 (free bypass guidance over phone).',
        action: {
          label: 'Call Showroom (+91 91500 51486)',
          href: 'tel:+919150051486',
          isExternal: true
        }
      };
    }

    // Intent 2: Battery Disposal / Scrap Exchange Steps
    if (q.includes('disposal') || q.includes('scrap') || q.includes('recycle') || q.includes('exchange') || q.includes('dump') || q.includes('old battery') || q.includes('மறுசுழற்சி') || q.includes('பழைய பேட்டரி') || q.includes('விலை')) {
      return {
        text: lang === 'ta'
          ? '♻️ பாதுகாப்பான பேட்டரி மறுசுழற்சி முறைகள்:\n1. பாலாற்றுப் படுகை நிலத்தடி நீரில் அமிலம் கசியாமல் இருக்க குப்பையில் வீச வேண்டாம்.\n2. ஸ்கிராப் விலை: 150Ah டால் டியூபுலர் பேட்டரிக்கு ₹2,200 – ₹2,800 வரை கிடைக்கும்.\n3. இலவச டோர்ஸ்டெப் பிக்-அப்: எங்கள் குழு உங்கள் வீட்டிற்கே வந்து எடையிட்டு எடுத்துச் செல்லும்.\n4. புதிய பேட்டரிக்கு உடனடி தள்ளுபடி அல்லது ரொக்கம் பெறலாம்.'
          : '♻️ Safe Battery Disposal & Scrap Exchange Steps:\n1. Never discard in open ground or Palar basin (lead acid contaminates borewells).\n2. Value Check: Standard 150Ah tall tubular gets ₹2,200 – ₹2,800 scrap credit.\n3. Free Doorstep Pickup: We send transport vans with acid-safe trays.\n4. Receive instant cash or direct invoice reduction on genuine Exide/Amaron batteries.',
        action: {
          label: lang === 'ta' ? 'இலவச பிக்-அப் பதிவு செய்க' : 'Schedule Free Battery Pickup',
          href: '#eco-exchange'
        }
      };
    }

    // Intent 3: RO Filter Maintenance / Replacement & TDS
    if (q.includes('ro') || q.includes('filter') || q.includes('water') || q.includes('candle') || q.includes('tds') || q.includes('purifier') || q.includes('membrane') || q.includes('ஃபில்டர்') || q.includes('குடிநீர்')) {
      return {
        text: lang === 'ta'
          ? '💧 RO குடிநீர் பராமரிப்பு கட்டணங்கள்:\n• 5-மைக்ரான் PP ஸ்பன் கேண்டில்: ₹150 (வீட்டுக்கே வந்து பொருத்த ₹199).\n• 4-நிலை முழுமையான ஃபில்டர் & மெம்ப்ரேன் சர்வீஸ்: ₹1,450.\n• வாணியம்பாடி முழுவதும் இலவச டிஜிட்டல் TDS குடிநீர் பரிசோதனை வழங்கப்படுகிறது.'
          : '💧 RO Water Maintenance & Spare Costs:\n• 5-Micron Polypropylene Spun Candle: ₹150 (Doorstep replacement ₹199).\n• Complete 4-Stage Filter & Membrane Overhaul: ₹1,450.\n• Free Doorstep Digital TDS Water Quality Testing across Vaniyambadi homes.',
        action: {
          label: lang === 'ta' ? 'RO வழிகாட்டி பார்க்க' : 'View RO Water & TDS Guide',
          href: '#water-guide'
        }
      };
    }

    // Intent 4: Electrician & Plumber Doorstep Visits
    if (q.includes('electrician') || q.includes('plumber') || q.includes('wiring') || q.includes('visit') || q.includes('charge') || q.includes('pipe') || q.includes('leak') || q.includes('எலக்ட்ரீஷியன்') || q.includes('பிளம்பர்')) {
      return {
        text: lang === 'ta'
          ? '🛠️ டோர்ஸ்டெப் எலக்ட்ரீஷியன் & பிளம்பர் சேவை:\n• ஆய்வுக் கட்டணம்: வாணியம்பாடியில் நிலையான ₹199.\n• முஸ்லிம்பூர், காதர்பேட்டை, நியூடவுன், வளையம்பேட்டைக்கு அன்றைய தினமே உடனடி வருகை.\n• வயரிங், MCB ட்ரிப் சரிசெய்தல், மோட்டார் பம்ப் மற்றும் பிளம்பிங் வேலைகள்.'
          : '🛠️ Doorstep Electrician & Plumber Visits:\n• Fixed Diagnostic Visit: ₹199 across Vaniyambadi.\n• Same-day doorstep attendance for Muslimpur, Khaderpet, Newtown, Valayampet.\n• Certified wiring, short-circuit recovery, MCB trips, motor pumps, and leak repairs.',
        action: {
          label: lang === 'ta' ? 'இன்ஜினியர்களை பார்க்க' : 'Meet Service Engineers',
          href: '#engineers'
        }
      };
    }

    // Intent 5: Location & Landmark
    if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('landmark') || q.includes('bank') || q.includes('malang') || q.includes('road') || q.includes('முகவரி') || q.includes('எங்கே')) {
      return {
        text: lang === 'ta'
          ? '📍 கடை அமைவிடம்:\nஹைடெக் சொல்யூஷன்ஸ், மலாங் ரோடு, முஸ்லிம்பூர், வாணியம்பாடி - 635751.\nஅடையாளம்: கரூர் வைஸ்யா வங்கி (KVB) எதிரில்.'
          : '📍 Store Address & Landmark:\nHitek Solutions, Malang Road, Muslimpur, Vaniyambadi - 635751.\nLandmark: Directly opposite Karur Vysya Bank (KVB). Dedicated parking available.',
        action: {
          label: lang === 'ta' ? 'கூகுள் மேப்பில் பார்க்க' : 'View Map & Directions',
          href: '#visit'
        }
      };
    }

    // Default Fallback
    return {
      text: lang === 'ta'
        ? 'உங்கள் கேள்விக்கு நன்றி! தயாரிப்பு மாதிரிகள், விலைப்பட்டியல் மற்றும் உடனடி முன்பதிவுக்கு எங்கள் நேரடி வாட்ஸ்அப்பில் தொடர்பு கொள்ளலாம் (+91 91500 51486).'
        : 'Thank you for your enquiry! For model catalogs, customized quotes, or same-day technician dispatch in Vaniyambadi, connect directly with our Malang Road store on WhatsApp.',
      action: {
        label: lang === 'ta' ? 'வாட்ஸ்அப்பில் பேசவும்' : 'Chat on WhatsApp with Hitek',
        href: `https://wa.me/919150051486?text=${encodeURIComponent(userQuery)}`,
        isExternal: true
      }
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural response latency (450ms)
    setTimeout(() => {
      const response = generateBotResponse(textToSend);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div ref={containerRef} className="fixed z-40 bottom-20 md:bottom-6 right-4 sm:right-6">
      {/* Mini-Window Chat Popup */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="Quick FAQ & Automated Assistant"
          className="mb-3 w-[calc(100vw-32px)] sm:w-[390px] bg-white rounded-3xl shadow-2xl border border-[#d9e1da] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#102b2a] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center font-bold font-mono text-sm">
                  <Bot className="w-5 h-5 text-[#102b2a]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#102b2a]" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>Hitek Smart Assistant</span>
                  <span className="text-[10px] font-mono text-[#dcff73] bg-[#dcff73]/20 px-1.5 py-0.2 rounded">
                    Instant AI
                  </span>
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[#bbceca]">
                  <MapPin className="w-3 h-3 text-[#dcff73]" />
                  <span>Malang Road · Instant FAQ Answers</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#bbceca] hover:text-white rounded-lg hover:bg-[#1a4442] transition-colors cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 bg-[#f5f7f4] flex-1 max-h-[380px] min-h-[260px] overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] text-xs leading-relaxed shadow-2xs whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-[#102b2a] text-white rounded-tr-xs'
                      : 'bg-white text-[#102b2a] border border-[#e2e8e0] rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Attached Action Button */}
                  {m.action && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100">
                      <a
                        href={m.action.href}
                        target={m.action.isExternal ? '_blank' : undefined}
                        rel={m.action.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={() => {
                          if (!m.action?.isExternal) {
                            setIsOpen(false);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#507d38] hover:bg-[#102b2a] text-white font-bold rounded-lg text-[11px] transition-colors"
                      >
                        <span>{m.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  <div className={`flex items-center gap-1 mt-1 text-[10px] ${m.sender === 'user' ? 'text-[#8fa8a3] justify-end' : 'text-[#97aaa1]'}`}>
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#dcff73]" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-white border border-[#e2e8e0] rounded-2xl rounded-tl-xs text-xs text-[#526460] w-fit shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#507d38] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#507d38] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#507d38] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Hitek Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Pills */}
          <div className="p-2.5 bg-white border-t border-[#e2e8e0] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {quickPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(pill.query)}
                className="px-2.5 py-1 bg-[#f0f4ee] hover:bg-[#e1eae0] text-[#102b2a] font-semibold rounded-lg shrink-0 border border-[#bac9c0] transition-colors cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-[#e2e8e0] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={lang === 'ta' ? 'கேள்வி கேளுங்கள் (எ.கா: வேலை நேரம்)...' : 'Type your question (e.g. Service hours)...'}
              className="flex-1 px-3.5 py-2 text-xs bg-[#f5f7f4] border border-[#bac9c0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#507d38] text-[#102b2a]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Transfer to WhatsApp Footer */}
          <div className="px-3 py-1.5 bg-[#f5f7f4] border-t border-[#e2e8e0] flex items-center justify-between text-[10px] text-[#526460]">
            <span>Need human engineer?</span>
            <a
              href="https://wa.me/919150051486"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#507d38] hover:underline"
            >
              Transfer to WhatsApp &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open instant FAQ assistant"
        className="w-14 h-14 rounded-full bg-[#102b2a] text-[#dcff73] hover:bg-[#1a4442] border-2 border-[#dcff73] shadow-2xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer relative"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 fill-current" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center border-2 border-white">
              1
            </span>
          </>
        )}
      </button>
    </div>
  );
};
