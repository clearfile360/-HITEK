import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Play, Pause, ExternalLink, Video, CheckCircle2, Clock, Sparkles, Volume2, VolumeX, X, MessageSquare, Wrench, Droplets, BatteryCharging, AlertCircle } from 'lucide-react';

interface InstructionalClip {
  id: string;
  title: string;
  tamilTitle: string;
  category: 'ro' | 'battery' | 'inverter';
  duration: string;
  badge: string;
  summary: string;
  tamilSummary: string;
  keySteps: { time: string; title: string; tamilTitle: string }[];
  whatsappPrompt: string;
}

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'veo-videos' | 'reels'>('veo-videos');
  const [selectedClip, setSelectedClip] = useState<InstructionalClip | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progressSec, setProgressSec] = useState(18);

  const instructionalClips: InstructionalClip[] = [
    {
      id: 'clip-ro-filter',
      title: 'How to Replace RO Pre-Filter Spun Candle in 5 Minutes',
      tamilTitle: 'RO ப்ரீ-ஃபில்டர் ஸ்பன் கேண்டில் 5 நிமிடத்தில் மாற்றுவது எப்படி?',
      category: 'ro',
      duration: '02:45',
      badge: 'Veo AI Generated · 1080p HD',
      summary: 'Step-by-step guide for Vaniyambadi homes on unscrewing the external bowl, removing mud sediment, and fitting a clean ₹150 PP spun cartridge.',
      tamilSummary: 'வெளிப்புற ஃபில்டர் கிண்ணத்தை கழற்றி, சேற்றுப் படிவை நீக்கி, புதிய ₹150 ஸ்பன் ஃபில்டரை பொருத்தும் எளிய முறை.',
      keySteps: [
        { time: '0:00', title: 'Turn off raw water inlet tap & turn off purifier power switch', tamilTitle: 'இன்லெட் வால்வை மூடி RO சுவிட்சை ஆஃப் செய்யவும்' },
        { time: '0:45', title: 'Press blue pressure-release button on top of housing cap', tamilTitle: 'ஹவுசிங் மூடியில் உள்ள பிரஷர் ரிலீஸ் பட்டனை அழுத்தவும்' },
        { time: '1:15', title: 'Use plastic spanner wrench to unscrew housing clockwise', tamilTitle: 'ஸ்பேனர் கொண்டு ஃபில்டர் கிண்ணத்தை கழற்றவும்' },
        { time: '1:50', title: 'Discard brown sediment candle and rinse bowl with clean water', tamilTitle: 'பழைய கேண்டிலை அகற்றி கிண்ணத்தை கழுவவும்' },
        { time: '2:25', title: 'Insert new 5-micron PP spun candle & tighten rubber O-ring', tamilTitle: 'புதிய ஸ்பன் கேண்டில் பொருத்தி O-ரிங்கை இறுக்கவும்' }
      ],
      whatsappPrompt: 'Hello Hitek Solutions! I watched your Veo video tutorial on RO Pre-Filter Candle Replacement. Please send 2 fresh 5-micron spun candles to my address in Vaniyambadi.'
    },
    {
      id: 'clip-battery-water',
      title: 'Tubular Battery Distilled Water & Terminal Acid Care Guide',
      tamilTitle: 'இன்வெர்ட்டர் பேட்டரி டிஸ்டில்டு வாட்டர் & டெர்மினல் சுத்தம் செய்யும் முறை',
      category: 'battery',
      duration: '03:15',
      badge: 'Veo AI Generated · 1080p HD',
      summary: 'Learn how to read the 6 ceramic float indicators, top up battery-grade distilled water without overfilling, and clean white sulfate corrosion.',
      tamilSummary: '6 மிதவை குறிகாட்டிகளை சரிபார்த்து, தூய பேட்டரி நீர் நிரப்பி, டெர்மினல்களில் வெள்ளை உப்பு படியாமல் தடுக்கும் வழி.',
      keySteps: [
        { time: '0:00', title: 'Turn Inverter to BYPASS or OFF mode for complete electrical safety', tamilTitle: 'முழு பாதுகாப்பிற்காக இன்வெர்ட்டரை ஆஃப் அல்லது பைபாஸ் செய்யவும்' },
        { time: '0:50', title: 'Inspect 6 float indicators: Red indicator sinking below green notch means low water', tamilTitle: 'மிதவையில் சிவப்பு குறி கீழே இறங்கியுள்ளதை சரிபார்க்கவும்' },
        { time: '1:40', title: 'Unscrew vent caps and pour battery-grade distilled water (never tap water)', tamilTitle: 'தூய டிஸ்டில்டு வாட்டரை மட்டுமே கவனமாக ஊற்றவும்' },
        { time: '2:30', title: 'Fill until float rises back to the upper green level notch', tamilTitle: 'மிதவை மேல் பச்சை நிற கோடு வரை வரும் வரை நீர் நிரப்பவும்' },
        { time: '3:00', title: 'Wipe terminals with warm water and coat with petroleum jelly (Vaseline)', tamilTitle: 'முனைகளில் சுடுதண்ணீர் ஊற்றி துடைத்து வாசலின் தடவவும்' }
      ],
      whatsappPrompt: 'Hello Hitek Solutions! I watched your Veo video guide on battery distilled water care. I need a 5-Liter battery water can delivered in Vaniyambadi.'
    },
    {
      id: 'clip-inverter-beep',
      title: 'Inverter Overload Beeping & Rotary Bypass Diagnostic',
      tamilTitle: 'இன்வெர்ட்டர் ஓவர்லோட் பீப் சத்தம் & பைபாஸ் சுவிட்ச் சரிசெய்யும் முறை',
      category: 'inverter',
      duration: '01:50',
      badge: 'Veo AI Generated · 1080p HD',
      summary: 'How to differentiate between low battery beep and overload tripping, disconnect high-wattage surges, and restore grid power via bypass switch.',
      tamilSummary: 'பீப் சத்தத்திற்கான காரணத்தை அறிந்து அதிக சுமை கொண்ட உபகரணங்களை அகற்றி இன்வெர்ட்டரை ரீசெட் செய்யும் வழி.',
      keySteps: [
        { time: '0:00', title: 'Identify continuous beep (overload) vs intermittent beep (low battery)', tamilTitle: 'தொடர் பீப் (ஓவர்லோட்) vs இடைவெளி பீப் (பேட்டரி குறைவு) அறியவும்' },
        { time: '0:35', title: 'Switch off sudden surge appliances (refrigerator, grinder, immersion heater)', tamilTitle: 'அதிக வாட்ஸ் எடுக்கும் கிரைண்டர் அல்லது கீசரை ஆஃப் செய்யவும்' },
        { time: '1:05', title: 'Locate overload reset push-button at the back panel and press firmly', tamilTitle: 'பின்பக்க பேனலில் உள்ள ரீசெட் பட்டனை அழுத்தவும்' },
        { time: '1:35', title: 'Switch rotary bypass switch to "Mains" if unit requires repair', tamilTitle: 'அவசரத்திற்கு ரோட்டரி பைபாஸ் சுவிட்சை மெயின்ஸ் மோடுக்கு மாற்றவும்' }
      ],
      whatsappPrompt: 'Hello Hitek Solutions! I watched your Veo clip on inverter overload. My inverter is still beeping continuously. Please send an electrician for inspection.'
    }
  ];

  const reels = [
    {
      title: 'The shop on Malang Road',
      caption: 'Exide inverter batteries showroom, RO water purifier kiosk, and service center.',
      imgSrc: '/batteries.svg',
      reelUrl: 'https://www.instagram.com/hitek.solutions.vaniyambadi/reel/DbEPxr_isaO/',
      tag: 'Showroom & Kiosk'
    },
    {
      title: 'Find us in Vaniyambadi',
      caption: 'Street view on Malang Road, Muslimpur right opposite Karur Vysya Bank.',
      imgSrc: '/shop.svg',
      reelUrl: 'https://www.instagram.com/hitek.solutions.vaniyambadi/reel/DYDKfqtDLSD/',
      tag: 'Location & Landmark'
    },
    {
      title: 'Sales & service updates',
      caption: 'Doorstep technicians for Appliances Service, Electricians & Plumbers on demand.',
      imgSrc: '/products.svg',
      reelUrl: 'https://www.instagram.com/hitek.solutions.vaniyambadi/reel/Daqg_58jkv9/',
      tag: 'Service Engineers'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <Video className="w-3.5 h-3.5 text-[#507d38]" />
              <span>Instructional Media &amp; Showroom Reels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              Video Guides &amp; Store Reels.
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl leading-relaxed">
              Watch high-definition instructional clips on performing basic maintenance for your RO water purifiers and inverter batteries, plus authentic reels from our Malang Road shop.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-[#f5f7f4] p-1.5 rounded-xl border border-[#d9e1da] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('veo-videos')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'veo-videos'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#dcff73]" />
              <span>Veo Maintenance Clips</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reels')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reels'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
              <span>Instagram Shop Reels</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Veo AI Instructional Video Clips */}
        {activeTab === 'veo-videos' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instructionalClips.map((clip) => (
                <div
                  key={clip.id}
                  className="bg-[#f5f7f4] border border-[#d9e1da] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#507d38] transition-all hover:shadow-md group"
                >
                  {/* Video Thumbnail Screen */}
                  <div className="relative aspect-16/9 bg-[#0e2423] overflow-hidden flex items-center justify-center p-6">
                    {/* Simulated High-Res Video Frame Graphics */}
                    <div className="absolute inset-0 bg-linear-to-tr from-[#102b2a] via-[#1a4442] to-[#2b5855] opacity-90" />

                    <div className="relative z-10 text-center space-y-2">
                      <div className="w-14 h-14 rounded-full bg-white/90 text-[#102b2a] flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:bg-[#dcff73] transition-all cursor-pointer">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#dcff73] block">
                        Watch Full Clip
                      </span>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 bg-[#102b2a]/90 backdrop-blur-xs text-[#dcff73] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-[#38504d] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{clip.badge}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#dcff73]" />
                      <span>{clip.duration}</span>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {clip.category === 'ro' && (
                          <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <Droplets className="w-3 h-3" /> RO Filter Guide
                          </span>
                        )}
                        {clip.category === 'battery' && (
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <BatteryCharging className="w-3 h-3" /> Battery Care
                          </span>
                        )}
                        {clip.category === 'inverter' && (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <Wrench className="w-3 h-3" /> Inverter Troubleshooting
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-[#102b2a] mb-2 leading-tight group-hover:text-[#507d38] transition-colors">
                        {clip.title}
                      </h3>

                      <p className="text-xs text-[#526460] leading-relaxed mb-4">
                        {clip.summary}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[#dce4de] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedClip(clip)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#102b2a] group-hover:text-[#507d38] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Video Lesson</span>
                      </button>

                      <span className="text-[11px] font-mono text-[#526460]">5 Chapters</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Helper Note for Local Residents */}
            <div className="p-4 rounded-2xl bg-[#f0f4ee] border border-[#bac9c0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#507d38] shrink-0" />
                <span className="text-[#37474f]">
                  Prefer an expert to do it for you? Our service engineers deliver original spun candles &amp; battery water with doorstep servicing in Vaniyambadi for ₹199.
                </span>
              </div>
              <a
                href="https://wa.me/919150051486?text=Hello%20Hitek%20Solutions!%20I%20would%20like%20to%20book%20a%20technician%20for%20routine%20battery%20or%20RO%20filter%20maintenance."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold rounded-xl transition-colors shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#dcff73]" />
                <span>Book Service Technician</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: Instagram Shop Reels */}
        {activeTab === 'reels' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
            {reels.map((post, idx) => (
              <div
                key={idx}
                className="group bg-[#f5f7f4] border border-[#d9e1da] rounded-2xl overflow-hidden hover:border-[#102b2a]/40 transition-all hover:shadow-lg flex flex-col"
              >
                <div className="relative aspect-3/4 sm:aspect-4/5 overflow-hidden bg-[#1e293b]">
                  <img
                    src={post.imgSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#102b2a]/80 backdrop-blur-xs text-[#dcff73] text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {post.tag}
                  </div>
                  <a
                    href={post.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-[#102b2a]/20 group-hover:bg-[#102b2a]/40 transition-colors flex items-center justify-center"
                    aria-label={`View ${post.title} on Instagram`}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#102b2a] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </a>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#102b2a] mb-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#526460] leading-relaxed mb-4">
                      {post.caption}
                    </p>
                  </div>
                  <a
                    href={post.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#507d38] hover:text-[#102b2a] transition-colors mt-auto pt-2 border-t border-[#d9e1da]"
                  >
                    <span>Watch reel on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Video Player Modal */}
        {selectedClip && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0e2423] text-white rounded-3xl max-w-3xl w-full border border-[#2b4441] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-[#0a1b1a] border-b border-[#223936] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#dcff73] uppercase tracking-wider">
                    {selectedClip.badge}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedClip(null)}
                  className="p-1.5 text-[#bbceca] hover:text-white rounded-lg hover:bg-[#1a3835] transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Simulated Video Display Screen */}
              <div className="relative aspect-16/9 bg-[#081514] flex flex-col items-center justify-center overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d4642] via-[#0d2624] to-[#051110] opacity-80" />

                {/* Central Animation / Illustration */}
                <div className="relative z-10 text-center space-y-3 max-w-md px-4">
                  <div className="w-16 h-16 rounded-full bg-[#dcff73] text-[#102b2a] flex items-center justify-center mx-auto shadow-2xl">
                    {selectedClip.category === 'ro' && <Droplets className="w-8 h-8 text-[#102b2a]" />}
                    {selectedClip.category === 'battery' && <BatteryCharging className="w-8 h-8 text-[#102b2a]" />}
                    {selectedClip.category === 'inverter' && <Wrench className="w-8 h-8 text-[#102b2a]" />}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedClip.title}
                  </h3>
                  <p className="text-xs text-[#bbceca] font-mono">
                    Filmed &amp; Rendered with Veo Video Generation Engine for Hitek Solutions
                  </p>
                </div>

                {/* Video Scrubber & Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 to-transparent">
                  <div className="w-full h-1.5 bg-white/20 rounded-full mb-3 overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-[#dcff73] rounded-full transition-all duration-300"
                      style={{ width: `${(progressSec / 165) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#bbceca]">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span>00:18 / {selectedClip.duration}</span>
                    </div>

                    <span className="text-[11px] text-[#dcff73] font-bold">1080p 60fps</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Chapters List */}
              <div className="p-6 bg-[#0a1b1a] max-h-56 overflow-y-auto border-t border-[#223936]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dcff73] mb-3">
                  Step-by-Step Chapters &amp; Timestamps:
                </h4>
                <div className="space-y-2">
                  {selectedClip.keySteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0e2423] border border-[#223936] text-xs hover:border-[#507d38] transition-colors"
                    >
                      <span className="font-mono text-[#dcff73] font-bold shrink-0">{step.time}</span>
                      <div className="flex-1">
                        <strong className="text-white block">{step.title}</strong>
                        <span className="text-[11px] text-[#8fa8a3]">{step.tamilTitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 bg-[#0e2423] border-t border-[#223936] flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`https://wa.me/919150051486?text=${encodeURIComponent(selectedClip.whatsappPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-xs sm:text-sm rounded-xl transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order Parts / Request Doorstep Help on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedClip(null)}
                  className="text-xs font-bold text-[#bbceca] hover:text-white"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
