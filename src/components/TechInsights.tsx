import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, MessageSquare, Sparkles, Droplets, BatteryCharging, Sun, Wrench, CheckCircle } from 'lucide-react';
import { Language } from '../translations';

interface TechInsightsProps {
  lang: Language;
}

interface Article {
  id: string;
  category: 'battery' | 'ro' | 'solar' | 'electrical';
  title: string;
  tamilTitle: string;
  excerpt: string;
  tamilExcerpt: string;
  readTime: string;
  date: string;
  author: string;
  content: string[];
  tamilContent: string[];
  takeaways: string[];
  tamilTakeaways: string[];
  whatsappPrompt: string;
}

export const TechInsights: React.FC<TechInsightsProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'insight-1',
      category: 'ro',
      title: 'Why Vaniyambadi Borewells Need RO with TDS Controllers (Palar Basin Water Guide)',
      tamilTitle: 'வாணியம்பாடி போர்வெல் தண்ணீருக்கு RO + TDS கன்ட்ரோலர் ஏன் அவசியம்? (முழு வழிகாட்டி)',
      excerpt: 'Groundwater across Muslimpur, Khaderpet, and Newtown often exceeds 850–1200 ppm TDS. Learn how high minerals affect digestion and why TDS control protects essential minerals.',
      tamilExcerpt: 'முஸ்லிம்பூர், காதர்பேட்டை மற்றும் நியூடவுன் பகுதிகளில் போர்வெல் தண்ணீர் 850 முதல் 1200 TDS வரை உள்ளது. இதனை எவ்வாறு பாதுகாப்பாக சுத்திகரிப்பது என்று தெரிந்து கொள்ளுங்கள்.',
      readTime: '4 min read',
      date: 'Sep 2026',
      author: 'Er. Aslam (Senior Water Tech)',
      content: [
        'Vaniyambadi lies along the Palar river basin, where heavy groundwater extraction and geological soil strata cause high Total Dissolved Solids (TDS), typically ranging from 700 ppm to 1400 ppm in local borewells.',
        'Ordinary UV filters can only kill bacteria, but cannot remove dissolved chemical salts, heavy metals, or hard carbonates. This is why residents notice white scaling inside electric kettles and dry skin after bathing.',
        'A multi-stage RO system with an adjustable TDS Controller allows technical fine-tuning: the RO membrane eliminates dangerous impurities, while the controller re-introduces pure sweet water to achieve the ideal drinking TDS of 80 to 150 ppm.',
        'Tip for Vaniyambadi homes: The external 5-micron spun polypropylene pre-filter candle should be replaced every 3–4 months. This inexpensive ₹150 part prevents brown mud from choking the expensive ₹1,800 RO membrane.'
      ],
      tamilContent: [
        'வாணியம்பாடி பாலாற்றுப் படுகை பகுதியில் நிலத்தடி நீரில் TDS அளவு பொதுவாக 700 முதல் 1400 வரை அதிகமாக காணப்படுகிறது.',
        'சாதாரண UV ஃபில்டர்கள் கிருமிகளை மட்டுமே அழிக்கும், ஆனால் நீரில் கரைந்துள்ள உப்பை நீக்காது. இதனால் பாத்திரங்களில் வெள்ளை உப்பு படிவுகள் ஏற்படுகின்றன.',
        'TDS கன்ட்ரோலர் கொண்ட RO அமைப்பு மட்டுமே தண்ணீரின் உப்புத்தன்மையை குறைத்து, உடலுக்கு தேவையான இயற்கை தாதுக்களை தக்கவைத்து 80 முதல் 150 TDS என்ற ஆரோக்கியமான அளவுக்கு கொண்டு வருகிறது.',
        'வாணியம்பாடி மக்களுக்கு முக்கிய குறிப்பு: வெளிப்புற ஸ்பன் கேண்டிலை 3-4 மாதங்களுக்கு ஒருமுறை மாற்றினால் ₹1,800 மதிப்புள்ள முக்கிய RO சவ்வு பழுதடையாமல் பல ஆண்டுகள் நீடிக்கும்.'
      ],
      takeaways: [
        'Ideal drinking water TDS for local health is 80 to 150 ppm',
        'Replace external spun candle every 3 months to prevent membrane choke',
        'Test your borewell TDS free of charge at Hitek Solutions Malang Road'
      ],
      tamilTakeaways: [
        'குடிநீரின் சரியான TDS அளவு 80 முதல் 150 ppm ஆகும்',
        'வெளிப்புற ஸ்பன் கேண்டிலை 3 மாதங்களுக்கு ஒருமுறை மாற்றவும்',
        'மலாங் ரோடு ஹைடெக் கடையில் உங்கள் வீட்டு தண்ணீரை இலவசமாக பரிசோதிக்கலாம்'
      ],
      whatsappPrompt: 'Hello Hitek Solutions! I read your article about Vaniyambadi Borewell TDS. I would like to get my home water sample tested for TDS.'
    },
    {
      id: 'insight-2',
      category: 'battery',
      title: 'How to Double Inverter Battery Lifespan: Summer Distilled Water & Acid Care',
      tamilTitle: 'இன்வெர்ட்டர் பேட்டரியின் ஆயுளை இருமடங்காக்குவது எப்படி? எலக்ட்ரோலைட் பராமரிப்பு',
      excerpt: 'Hot summers in Tamil Nadu accelerate water loss in tall tubular batteries. Discover the exact float indicator levels, safe topping up, and terminal corrosion prevention.',
      tamilExcerpt: 'கோடை காலத்தில் பேட்டரியில் தண்ணீர் வேகமாக வற்றுகிறது. சரியான டிஸ்டில்டு வாட்டர் அளவு மற்றும் டெர்மினல் சுத்தம் செய்யும் எளிய முறைகள்.',
      readTime: '5 min read',
      date: 'Aug 2026',
      author: 'Technical Team Hitek',
      content: [
        'Tubular batteries are the heart of home power backup in Vaniyambadi. During continuous charging in ambient temperatures above 38°C, the water inside the dilute sulfuric acid electrolyte splits into hydrogen and oxygen, causing water levels to drop.',
        'Never top up with tap water, borewell water, or RO reject water! Dissolved salts and iron in tap water permanently poison the lead plates, causing sudden capacity failure.',
        'Only use pure battery-grade de-mineralized or distilled water with zero conductivity. Check the 6 ceramic float indicators once a month: when the red float sinks to the lower green band, top up until the float rises to the top.',
        'White or bluish powder on the battery terminals is lead sulfate corrosion. It causes voltage drop and inverter beeping. Clean it using warm water and a wire brush, then apply petroleum jelly (Vaseline) for lifetime rust protection.'
      ],
      tamilContent: [
        'தமிழ்நாட்டின் கோடை வெப்பத்தில் இன்வெர்ட்டர் பேட்டரியின் நீர் விரைவாக ஆவியாகிறது. எனவே சரியான இடைவெளியில் பராமரிப்பது அவசியம்.',
        'எக்காரணம் கொண்டும் குழாய் தண்ணீர், போர்வெல் தண்ணீர் அல்லது RO கழிவு தண்ணீரை பேட்டரியில் ஊற்றக்கூடாது. இது பேட்டரியை முழுமையாக பாழாக்கிவிடும்.',
        'தூய பேட்டரி டிஸ்டில்டு வாட்டரை மட்டுமே பயன்படுத்த வேண்டும். மாதத்திற்கு ஒருமுறை 6 மிதவை குறிகாட்டிகளை சரிபார்த்து நீர் நிரப்பவும்.',
        'பேட்டரி முனைகளில் படியும் வெள்ளை பவுடரை சுடுதண்ணீர் கொண்டு துடைத்து, வாசலின் தடவினால் மின்சார ஓட்டம் சீராக இருக்கும்.'
      ],
      takeaways: [
        'Always use pure battery-grade distilled water (never tap water)',
        'Check electrolyte floats once every 30 to 45 days in summer',
        'Apply petroleum jelly on terminals to prevent white corrosion build-up'
      ],
      tamilTakeaways: [
        'தூய டிஸ்டில்டு வாட்டரை மட்டுமே ஊற்ற வேண்டும்',
        'கோடை காலத்தில் 30 நாட்களுக்கு ஒருமுறை நீர் அளவை சரிபார்க்கவும்',
        'முனைகளில் வெள்ளை உப்பு படியாமல் வாசலின் தடவவும்'
      ],
      whatsappPrompt: 'Hello Hitek Solutions! I read your article on battery maintenance. I need 5 Liters of battery-grade distilled water delivered in Vaniyambadi.'
    },
    {
      id: 'insight-3',
      category: 'solar',
      title: 'Rooftop Solar in Vaniyambadi: Cutting Monthly Electricity Bills by 65%',
      tamilTitle: 'வாணியம்பாடியில் சோலார் அமைத்து மின் கட்டணத்தை 65% குறைப்பது எப்படி?',
      excerpt: 'With 300+ sunny days in Tirupattur district, discover how on-grid solar and solar water heaters provide a rapid 18 to 24 month payback for local residences.',
      tamilExcerpt: 'திருப்பத்தூர் மாவட்டத்தில் ஆண்டுக்கு 300 நாட்களுக்கு மேல் நல்ல வெயில் கிடைக்கிறது. சோலார் வாட்டர் ஹீட்டர் மற்றும் ரூஃப்டாப் சோலார் மூலம் அதிக மின்சார சேமிப்பு.',
      readTime: '4 min read',
      date: 'Jul 2026',
      author: 'K. Senthil (Solar Projects)',
      content: [
        'Vaniyambadi and the surrounding Jolarpet-Ambur belt receive exceptional solar irradiance of approximately 5.2 to 5.6 kWh/m² per day, making rooftop solar installations extraordinarily productive.',
        'For high hot water consumption families, replacing electric geysers (which draw 2000W to 3000W) with an evacuated tube collector (ETC) solar water heater eliminates 20% to 30% of your bi-monthly TANGEDCO power bill.',
        'For residential daytime loads, a 3kW or 5kW on-grid solar system with net-metering feeds surplus power back to the grid during the day, virtually wiping out daytime air conditioner and refrigerator bills.',
        'Hitek Solutions conducts structural shadow analysis and roof angle audits for homes in Newtown, Khaderpet, and Valayampet before installing genuine MNRE-approved panels.'
      ],
      tamilContent: [
        'வாணியம்பாடி மற்றும் சுற்றுவட்டார பகுதிகளில் ஆண்டு முழுவதும் சிறந்த சூரிய ஒளி கிடைப்பதால் சோலார் அமைப்புகள் அதிக பலன் தருகின்றன.',
        'அதிக மின்சாரம் குடிக்கும் 2000W வாட்டர் கீசர்களுக்கு பதிலாக சோலார் வாட்டர் ஹீட்டர் பயன்படுத்தினால் மின் கட்டணத்தில் 30% வரை மிச்சமாகும்.',
        '3kW அல்லது 5kW சோலார் அமைப்பை வீட்டின் கூரையில் பொருத்தினால் பகல் நேர ஏசி மற்றும் பிரிட்ஜ் செலவு முற்றிலுமாக குறையும்.',
        'ஹைடெக் சொல்யூஷன்ஸ் உங்கள் வீட்டின் மொட்டை மாடியை ஆய்வு செய்து சரியான கோணத்தில் சோலார் பேனல்களை பொருத்தி தருகிறது.'
      ],
      takeaways: [
        'Solar water heaters pay for themselves in under 2 years',
        'Saves up to 65% on bi-monthly household electricity expenses',
        'Government subsidy and net-metering support available'
      ],
      tamilTakeaways: [
        'சோலார் வாட்டர் ஹீட்டர் 2 ஆண்டுகளுக்குள் தன் விலையை ஈடுசெய்கிறது',
        'இரு மாத மின் கட்டணத்தில் 65% வரை சேமிக்கலாம்',
        'அரசு மானியம் மற்றும் நெட்-மீட்டரிங் வழிகாட்டுதல் உண்டு'
      ],
      whatsappPrompt: 'Hello Hitek Solutions! I am interested in a Rooftop Solar or Solar Water Heater assessment for my house in Vaniyambadi.'
    },
    {
      id: 'insight-4',
      category: 'electrical',
      title: '5 Warning Signs Your Home Wiring is Tripping Inverters & Damaging Appliances',
      tamilTitle: 'வீட்டு வயரிங் கோளாறுகளால் இன்வெர்ட்டர் பழுதடைவதை தடுக்கும் 5 வழிகள்',
      excerpt: 'Shared neutral circuits in older Vaniyambadi houses can burn inverter control boards. Learn how an electrician safety check protects your appliances.',
      tamilExcerpt: 'பழைய வீடுகளில் உள்ள பொதுவான நியூட்ரல் வயரிங் இன்வெர்ட்டரை சேதப்படுத்தும். அதனை எவ்வாறு கண்டறிந்து சரிசெய்வது?',
      readTime: '3 min read',
      date: 'Jun 2026',
      author: 'Electrician Team Hitek',
      content: [
        'Inverters are delicate electronic transformers. One of the most common issues our service engineers encounter in Vaniyambadi is shared neutral wiring in older brick homes.',
        'When the inverter switch is active during a blackout, a shared neutral circuit backfeeds current into the inverter motherboard, producing a persistent overload beep or burning the MOSFET switches.',
        'Warning signs include: flickering LED lights when the refrigerator starts, mild shock sensation from tap pipes or washing machine metal bodies (improper earthing), and circuit breakers tripping frequently.',
        'A simple 1-hour home wiring separation with an independent inverter bypass switch protects your ₹20,000+ inverter and battery setup from permanent electrical damage.'
      ],
      tamilContent: [
        'பழைய வீடுகளில் பல அறைகளுக்கு ஒரே நியூட்ரல் கம்பி பயன்படுத்தப்பட்டிருந்தால், மின்வெட்டின் போது இன்வெர்ட்டர் ஓவர்லோடு பீப் சத்தம் எழுப்பும்.',
        'பிரிட்ஜ் இயங்கும் போது விளக்குகள் மங்குவது, வாஷிங் மெஷின் தொட்டால் சிறிய ஷாக் அடிப்பது ஆகியவை எர்த்திங் சரியில்லை என்பதற்கான அறிகுறிகள்.',
        'ஹைடெக் எலக்ட்ரீஷியன்கள் இன்வெர்ட்டருக்கான மின் இணைப்பை முறையாக பிரித்து பைபாஸ் சுவிட்ச் அமைத்து உங்கள் உபகரணங்களை பாதுகாக்கின்றனர்.'
      ],
      takeaways: [
        'Ensure inverter lighting circuits have separated neutral lines',
        'Test household ground earthing resistance annually',
        'Install a dedicated double-pole bypass switch for safety'
      ],
      tamilTakeaways: [
        'இன்வெர்ட்டருக்கு தனி நியூட்ரல் லைன் இருப்பதை உறுதி செய்யவும்',
        'ஆண்டுக்கு ஒருமுறை வீட்டின் எர்த்திங் தரத்தை சோதிக்கவும்',
        'பாதுகாப்பிற்காக பைபாஸ் சுவிட்ச் அமைத்துக் கொள்ளவும்'
      ],
      whatsappPrompt: 'Hello Hitek Solutions! My inverter is beeping / I suspect wiring issues in my home. Please dispatch an electrician for inspection.'
    }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <section id="insights" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#507d38]" />
              <span>{lang === 'ta' ? 'தொழில்நுட்ப ஆலோசனைகள் & வழிகாட்டிகள்' : 'Local Tech Insights & SEO Guides'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              {lang === 'ta' ? 'ஹைடெக் தொழில்நுட்பக் கட்டுரைகள்.' : 'Hitek Tech Insights.'}
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'வாணியம்பாடி மக்களின் பயன்பாட்டிற்கு ஏற்ற இன்வெர்ட்டர் பேட்டரி பராமரிப்பு, குடிநீர் உப்புத்தன்மை (TDS) தீர்வுகள் மற்றும் சோலார் சேமிப்பு குறிப்புகள்.'
                : 'Educational engineering articles covering groundwater TDS management, battery maintenance in tropical climates, and solar rooftop savings for Vaniyambadi homes.'}
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              {lang === 'ta' ? 'அனைத்தும்' : 'All Insights'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('ro')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'ro'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              {lang === 'ta' ? 'RO குடிநீர்' : 'RO Water Safety'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('battery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'battery'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              {lang === 'ta' ? 'பேட்டரி பராமரிப்பு' : 'Battery Care'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('solar')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'solar'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              {lang === 'ta' ? 'சோலார்' : 'Solar Savings'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('electrical')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'electrical'
                  ? 'bg-[#102b2a] text-white shadow-xs'
                  : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a]'
              }`}
            >
              {lang === 'ta' ? 'மின்சார பாதுகாப்பு' : 'Electrical Wiring'}
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-[#f5f7f4] border border-[#d9e1da] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between gap-3 text-xs text-[#526460] mb-3">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#507d38]">
                    {article.category === 'ro' && <Droplets className="w-3.5 h-3.5" />}
                    {article.category === 'battery' && <BatteryCharging className="w-3.5 h-3.5" />}
                    {article.category === 'solar' && <Sun className="w-3.5 h-3.5" />}
                    {article.category === 'electrical' && <Wrench className="w-3.5 h-3.5" />}
                    <span>{article.category.toUpperCase()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-[#102b2a] group-hover:text-[#507d38] transition-colors mb-3 leading-tight">
                  {lang === 'ta' ? article.tamilTitle : article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#526460] leading-relaxed mb-6">
                  {lang === 'ta' ? article.tamilExcerpt : article.excerpt}
                </p>
              </div>

              {/* Bottom trigger row */}
              <div className="pt-4 border-t border-[#dce4de] flex items-center justify-between">
                <span className="text-xs text-[#97aaa1] font-medium">By {article.author}</span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#102b2a] group-hover:text-[#507d38] cursor-pointer"
                >
                  <span>{lang === 'ta' ? 'முழுவதும் படிக்க' : 'Read Article'}</span>
                  <ArrowRight className="w-4 h-4 text-[#507d38] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Read Full Article Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#d9e1da] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#dce4de] mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#507d38] uppercase tracking-wider block mb-1">
                    {activeArticle.category.toUpperCase()} INSIGHT · {activeArticle.readTime}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#102b2a] leading-tight">
                    {lang === 'ta' ? activeArticle.tamilTitle : activeArticle.title}
                  </h3>
                  <p className="text-xs text-[#526460] mt-1">Published by {activeArticle.author} · {activeArticle.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-lg text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5] transition-colors cursor-pointer"
                  aria-label="Close article modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 text-xs sm:text-sm text-[#37474f] leading-relaxed mb-6">
                {(lang === 'ta' ? activeArticle.tamilContent : activeArticle.content).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Actionable Takeaways */}
              <div className="p-4 rounded-xl bg-[#f5f7f4] border border-[#d9e1da] mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#102b2a] mb-2">
                  {lang === 'ta' ? 'முக்கிய குறிப்புகள்:' : 'Key Engineering Takeaways:'}
                </h4>
                <ul className="space-y-2">
                  {(lang === 'ta' ? activeArticle.tamilTakeaways : activeArticle.takeaways).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#37474f]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#507d38] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-[#dce4de] flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`https://wa.me/919150051486?text=${encodeURIComponent(activeArticle.whatsappPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#dcff73]" />
                  <span>{lang === 'ta' ? 'இன்ஜினியரிடம் வாட்ஸ்அப்பில் கேட்க' : 'Discuss with Hitek Engineer'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="text-xs font-bold text-[#526460] hover:text-[#102b2a]"
                >
                  {lang === 'ta' ? 'மூடுக' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
