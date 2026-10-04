import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Check, ArrowRight, ArrowLeft, RefreshCw, MessageSquare, Zap, Droplets, ShieldCheck, Sparkles, Volume2, VolumeX, Mic, MicOff, Radio } from 'lucide-react';
import { Language } from '../translations';

interface ApplianceFinderQuizProps {
  lang: Language;
  onSelectProduct: (productName: string) => void;
}

interface QuizAnswers {
  category: 'inverter' | 'ro' | 'combo';
  applianceLoad: 'basic' | 'standard' | 'heavy';
  waterSource: 'municipal' | 'borewell' | 'hard';
  familySize: 'small' | 'medium' | 'large';
  priority: 'budget' | 'reliable' | 'heavyduty';
}

interface RecommendationResult {
  title: string;
  tamilTitle: string;
  badge: string;
  tamilBadge: string;
  specs: string;
  estimatedPrice: string;
  scrapSaving?: string;
  matchReasons: string[];
  tamilMatchReasons: string[];
  productTag: string;
  whatsappMessage: string;
}

export const ApplianceFinderQuiz: React.FC<ApplianceFinderQuizProps> = ({ lang, onSelectProduct }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    category: 'inverter',
    applianceLoad: 'standard',
    waterSource: 'borewell',
    familySize: 'medium',
    priority: 'reliable'
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const speakPrompt = (text: string, onDone?: () => void) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onDone) onDone();
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startListeningForAnswer = (step: number) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceFeedback(lang === 'ta' ? 'குரல் உள்ளீடு ஆதரிக்கப்படவில்லை' : 'Voice input not supported in this browser');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceFeedback(lang === 'ta' ? 'கேட்கிறது... உங்கள் பதிலை கூறவும்' : 'Listening... Speak your choice now');
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        setVoiceFeedback(`Heard: "${spoken}"`);
        handleSpokenAnswer(spoken, step);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const promptCurrentQuestion = (step: number) => {
    let questionText = '';
    if (step === 1) {
      questionText = lang === 'ta'
        ? 'கேள்வி 1: உங்கள் வீட்டிற்கு என்ன தேவை? இன்வெர்ட்டர் என்றால் ஒன்று, RO என்றால் இரண்டு, காம்போ என்றால் மூன்று என்று கூறவும்.'
        : 'Question 1: What is your primary need? Say Inverter for option one, RO for option two, or Combo for option three.';
    } else if (step === 2) {
      if (answers.category === 'ro') {
        questionText = lang === 'ta'
          ? 'கேள்வி 2: குடிநீர் ஆதாரம் என்ன? காவிரி என்றால் ஒன்று, போர்வெல் என்றால் இரண்டு, உப்பு நீர் என்றால் மூன்று என்று கூறவும்.'
          : 'Question 2: What is your water source? Say Municipal for one, Borewell for two, or Hard water for three.';
      } else {
        questionText = lang === 'ta'
          ? 'கேள்வி 2: உங்கள் வீட்டு மின் சுமை என்ன? சிறியது என்றால் ஒன்று, டிவி உட்பட என்றால் இரண்டு, பிரிட்ஜ் என்றால் மூன்று என்று கூறவும்.'
          : 'Question 2: What is your electrical load? Say Basic for one, Standard for two, or Heavy with fridge for three.';
      }
    } else if (step === 3) {
      questionText = lang === 'ta'
        ? 'கேள்வி 3: குடும்பத்தின் அளவு என்ன? சிறியது என்றால் ஒன்று, நடுத்தரம் என்றால் இரண்டு, பெரியது என்றால் மூன்று என்று கூறவும்.'
        : 'Question 3: What is your family size? Say Small for one, Medium for two, or Large for three.';
    } else if (step === 4) {
      questionText = lang === 'ta'
        ? 'கேள்வி 4: உங்கள் முக்கிய நோக்கம் என்ன? பட்ஜெட் என்றால் ஒன்று, நம்பகத்தன்மை என்றால் இரண்டு, அதிக செயல்திறன் என்றால் மூன்று என்று கூறவும்.'
        : 'Question 4: What is your priority? Say Budget for one, Reliable for two, or Heavy duty for three.';
    }

    speakPrompt(questionText, () => {
      startListeningForAnswer(step);
    });
  };

  const handleSpokenAnswer = (transcript: string, step: number) => {
    const t = transcript.toLowerCase();

    if (step === 1) {
      if (t.includes('inverter') || t.includes('one') || t.includes('1') || t.includes('ஒன்று') || t.includes('இன்வெர்ட்டர்')) {
        setAnswers(prev => ({ ...prev, category: 'inverter' }));
        speakPrompt(lang === 'ta' ? 'இன்வெர்ட்டர் தேர்வு செய்யப்பட்டது.' : 'Inverter selected.', () => {
          setCurrentStep(2);
        });
      } else if (t.includes('ro') || t.includes('water') || t.includes('two') || t.includes('2') || t.includes('இரண்டு') || t.includes('குடிநீர்')) {
        setAnswers(prev => ({ ...prev, category: 'ro' }));
        speakPrompt(lang === 'ta' ? 'RO பியூரிஃபையர் தேர்வு செய்யப்பட்டது.' : 'RO Purifier selected.', () => {
          setCurrentStep(2);
        });
      } else if (t.includes('combo') || t.includes('both') || t.includes('three') || t.includes('3') || t.includes('மூன்று') || t.includes('காம்போ')) {
        setAnswers(prev => ({ ...prev, category: 'combo' }));
        speakPrompt(lang === 'ta' ? 'ஹோம் காம்போ தேர்வு செய்யப்பட்டது.' : 'Home Duo Combo selected.', () => {
          setCurrentStep(2);
        });
      } else {
        speakPrompt(lang === 'ta' ? 'மீண்டும் கூறவும்: இன்வெர்ட்டர், RO அல்லது காம்போ.' : 'Please say Inverter, RO, or Combo.', () => {
          startListeningForAnswer(1);
        });
      }
    } else if (step === 2) {
      if (answers.category === 'ro') {
        if (t.includes('municipal') || t.includes('kaveri') || t.includes('one') || t.includes('1')) {
          setAnswers(prev => ({ ...prev, waterSource: 'municipal' }));
          speakPrompt('Municipal water selected.', () => setCurrentStep(3));
        } else if (t.includes('borewell') || t.includes('well') || t.includes('two') || t.includes('2')) {
          setAnswers(prev => ({ ...prev, waterSource: 'borewell' }));
          speakPrompt('Borewell water selected.', () => setCurrentStep(3));
        } else {
          setAnswers(prev => ({ ...prev, waterSource: 'hard' }));
          speakPrompt('Hard water selected.', () => setCurrentStep(3));
        }
      } else {
        if (t.includes('basic') || t.includes('light') || t.includes('one') || t.includes('1')) {
          setAnswers(prev => ({ ...prev, applianceLoad: 'basic' }));
          speakPrompt('Basic load selected.', () => setCurrentStep(3));
        } else if (t.includes('heavy') || t.includes('fridge') || t.includes('three') || t.includes('3')) {
          setAnswers(prev => ({ ...prev, applianceLoad: 'heavy' }));
          speakPrompt('Heavy load with fridge selected.', () => setCurrentStep(3));
        } else {
          setAnswers(prev => ({ ...prev, applianceLoad: 'standard' }));
          speakPrompt('Standard load selected.', () => setCurrentStep(3));
        }
      }
    } else if (step === 3) {
      if (t.includes('small') || t.includes('1') || t.includes('one')) {
        setAnswers(prev => ({ ...prev, familySize: 'small' }));
        speakPrompt('Small family selected.', () => setCurrentStep(4));
      } else if (t.includes('large') || t.includes('3') || t.includes('three')) {
        setAnswers(prev => ({ ...prev, familySize: 'large' }));
        speakPrompt('Large family selected.', () => setCurrentStep(4));
      } else {
        setAnswers(prev => ({ ...prev, familySize: 'medium' }));
        speakPrompt('Medium family selected.', () => setCurrentStep(4));
      }
    } else if (step === 4) {
      if (t.includes('budget') || t.includes('1') || t.includes('one')) {
        setAnswers(prev => ({ ...prev, priority: 'budget' }));
      } else if (t.includes('heavy') || t.includes('3') || t.includes('three')) {
        setAnswers(prev => ({ ...prev, priority: 'heavyduty' }));
      } else {
        setAnswers(prev => ({ ...prev, priority: 'reliable' }));
      }
      setIsCompleted(true);
      speakPrompt(lang === 'ta' ? 'வினாடி வினா நிறைவடைந்தது! உங்கள் பரிந்துரை தயார்.' : 'Quiz completed! Here is your custom recommendation.');
    }
  };

  // Trigger prompt when voice mode is activated or step changes
  useEffect(() => {
    if (isVoiceMode && !isCompleted) {
      promptCurrentQuestion(currentStep);
    }
  }, [currentStep, isVoiceMode]);

  const toggleVoiceMode = () => {
    const next = !isVoiceMode;
    setIsVoiceMode(next);
    if (!next) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsSpeaking(false);
      setIsListening(false);
      setVoiceFeedback('');
    }
  };

  // Compute recommendation based on user answers
  const getRecommendation = (): RecommendationResult => {
    if (answers.category === 'combo') {
      return {
        title: 'Complete Home Duo: 900VA Inverter + 150Ah Battery + 10L RO Purifier',
        tamilTitle: 'முழுமையான ஹோம் காம்போ: 900VA இன்வெர்ட்டர் + 150Ah பேட்டரி + 10L RO பியூரிஃபையர்',
        badge: 'Best Value Bundle',
        tamilBadge: 'சிறந்த மதிப்பு காம்போ',
        specs: '900VA Pure Sine Wave UPS · 150Ah Tall Tubular · 10L 6-Stage RO System',
        estimatedPrice: '₹27,499 – ₹30,500 (Combo Special)',
        scrapSaving: 'Save up to ₹3,500 with old dead battery exchange',
        matchReasons: [
          'Guarantees 4–6 hours uninterrupted backup for fans, lights, TV, and Wi-Fi',
          'Supplies clean, sweet drinking water calibrated for Vaniyambadi groundwater TDS',
          'Free installation and trolley included in Vaniyambadi'
        ],
        tamilMatchReasons: [
          'மின்விசிறிகள், விளக்குகள் மற்றும் டிவிக்கு 4–6 மணி நேர தொடர் மின்சாரம்',
          'வாணியம்பாடி நிலத்தடி நீரின் உப்புத்தன்மையை நீக்கி சுவையான பாதுகாப்பான குடிநீர்',
          'வாணியம்பாடியில் இலவச பொருத்துதல் மற்றும் பேட்டரி ட்ராலி இலவசம்'
        ],
        productTag: 'Inverters & UPS',
        whatsappMessage: 'Hello Hitek Solutions! I completed the Appliance Finder Quiz. I got recommended the Complete Home Duo (900VA + 150Ah Battery + 10L RO). Please share combo availability and quote.'
      };
    }

    if (answers.category === 'ro') {
      if (answers.waterSource === 'municipal') {
        return {
          title: 'Classic UV + UF 7L Water Purifier',
          tamilTitle: 'கிளாசிக் UV + UF 7L குடிநீர் பியூரிஃபையர்',
          badge: 'Ideal for Low TDS Water',
          tamilBadge: 'குறைந்த உப்புத்தன்மை நீருக்கு ஏற்றது',
          specs: '4-Stage UV+UF Purification · 100% Minerals Retained · 7L Storage',
          estimatedPrice: '₹6,500 – ₹7,800',
          matchReasons: [
            'Perfect for municipal and Kaveri supply water with TDS under 250 ppm',
            'Zero water wastage with low electricity consumption (24W)',
            'Low annual filter maintenance cost (~₹450/year)'
          ],
          tamilMatchReasons: [
            '250 ppm க்கும் குறைவான நகராட்சி மற்றும் காவிரி குடிநீருக்கு மிகவும் பொருத்தமானது',
            'தண்ணீர் விரயம் இல்லை, மிகக் குறைந்த மின் நுகர்வு',
            'ஆண்டு பராமரிப்பு செலவு மிகக் குறைவு (~₹450/வருடம்)'
          ],
          productTag: 'RO water filters',
          whatsappMessage: 'Hello Hitek Solutions! I took the Appliance Quiz. I need the Classic UV+UF 7L Purifier for municipal water in Vaniyambadi.'
        };
      }

      if (answers.waterSource === 'hard' || answers.priority === 'heavyduty') {
        return {
          title: 'Premium Copper + Alkaline 12L Mineral RO Purifier',
          tamilTitle: 'பிரீமியம் காப்பர் + ஆல்கலைன் 12L மினரல் RO பியூரிஃபையர்',
          badge: 'Heavy TDS & Immunity Boost',
          tamilBadge: 'அதிக உப்புத்தன்மை & ஆரோக்கிய குடிநீர்',
          specs: '8-Stage RO+UV+Copper+Alkaline · 125 GPD Heavy Booster Pump · pH 8.0 Balanced',
          estimatedPrice: '₹11,999 – ₹13,500',
          matchReasons: [
            'Formulated for deep borewells in Palar basin with high TDS exceeding 1000 ppm',
            'Active Copper and Alkaline mineralizer restores immune-boosting minerals',
            'Large 12-liter tank ensures abundant safe drinking water for larger families'
          ],
          tamilMatchReasons: [
            'பாலாற்றுப் படுகையில் 1000 ppm க்கும் அதிகமான போர்வெல் தண்ணீருக்கும் ஏற்றது',
            'காப்பர் மற்றும் ஆல்கலைன் தாதுக்கள் மூலம் நோய் எதிர்ப்பு சக்தியை அதிகரிக்கும் குடிநீர்',
            'பெரிய குடும்பங்களுக்கு தேவையான 12 லிட்டர் பெரிய சேமிப்பு தொட்டி'
          ],
          productTag: 'RO water filters',
          whatsappMessage: 'Hello Hitek Solutions! I took the Appliance Quiz. I need the Premium Copper + Alkaline 12L RO for high TDS borewell water.'
        };
      }

      // Default Standard RO
      return {
        title: 'Standard Multi-Stage RO + UV + TDS Controller (10L)',
        tamilTitle: 'ஸ்டாண்டர்ட் RO + UV + TDS கன்ட்ரோலர் (10L)',
        badge: 'Vaniyambadi Bestseller',
        tamilBadge: 'வாணியம்பாடியில் அதிகம் விற்பனையாகும் மாடல்',
        specs: '6-Stage RO+UV · 100 GPD Booster Pump · Adjustable TDS Controller',
        estimatedPrice: '₹8,999 – ₹10,500',
        matchReasons: [
          'Best balance for moderate borewell and well water (300 to 1000 ppm TDS)',
          'TDS Controller fine-tunes pure sweet taste between 80 to 150 ppm',
          'Free digital TDS water testing and standard wall mounting included'
        ],
        tamilMatchReasons: [
          '300 முதல் 1000 ppm உள்ள நடுத்தர போர்வெல் தண்ணீருக்கு மிகச் சிறந்த தேர்வு',
          'TDS கன்ட்ரோலர் மூலம் தண்ணீரின் சுவையை 80–150 ppm அளவில் சுவையாக மாற்றலாம்',
          'இலவச டிஜிட்டல் TDS பரிசோதனை மற்றும் சுவரில் பொருத்துதல் இலவசம்'
        ],
        productTag: 'RO water filters',
        whatsappMessage: 'Hello Hitek Solutions! I took the Appliance Quiz. I need the Standard 10L Multi-Stage RO with TDS Controller.'
      };
    }

    // Category Inverter
    if (answers.applianceLoad === 'heavy' || answers.familySize === 'large' || answers.priority === 'heavyduty') {
      return {
        title: 'Heavy-Duty 1150VA Inverter + 200Ah Jumbo Tubular Battery',
        tamilTitle: 'ஹெவி-டியூட்டி 1150VA இன்வெர்ட்டர் + 200Ah ஜம்போ டியூபுலர் பேட்டரி',
        badge: 'Runs Inverter Refrigerator',
        tamilBadge: 'பிரிட்ஜ் உட்பட இயங்கும் அமைப்பு',
        specs: '1150VA Sine Wave UPS · 200Ah Deep Cycle Tubular · 60 Months Warranty',
        estimatedPrice: '₹23,999 – ₹27,500',
        scrapSaving: '₹3,200 off with old battery exchange',
        matchReasons: [
          'Easily handles high-surge startup load of modern inverter refrigerators',
          'Delivers 6 to 8+ hours backup for fans, lights, TV, and Wi-Fi simultaneously',
          'Includes heavy-duty bypass switch wiring for safe storm blackout operation'
        ],
        tamilMatchReasons: [
          'நவீன இன்வெர்ட்டர் பிரிட்ஜின் ஸ்டார்ட்டிங் சுமையை எளிதாக தாங்கும் திறன்',
          'விசிறிகள், விளக்குகள், டிவி மற்றும் வைஃபை 6 முதல் 8+ மணி நேரம் தடையின்றி இயங்கும்',
          'புயல் மின்வெட்டு காலங்களில் பாதுகாப்பாக இயங்க பைபாஸ் சுவிட்ச் வசதி'
        ],
        productTag: 'Inverters & UPS',
        whatsappMessage: 'Hello Hitek Solutions! I took the Appliance Quiz. I need the Heavy-Duty 1150VA + 200Ah Jumbo Battery Combo to run my refrigerator and home.'
      };
    }

    if (answers.applianceLoad === 'basic' || answers.familySize === 'small' || answers.priority === 'budget') {
      return {
        title: 'Starter Home Backup: 700VA UPS + 100Ah Tubular Battery',
        tamilTitle: 'ஆரம்ப நிலை ஹோம் பேக்கப்: 700VA UPS + 100Ah டியூபுலர் பேட்டரி',
        badge: 'Budget Friendly',
        tamilBadge: 'குறைந்த பட்ஜெட் சிறந்த தேர்வு',
        specs: '700VA Pure Sine Wave · 100Ah Tubular Battery · 36 Months Warranty',
        estimatedPrice: '₹14,500 – ₹16,800',
        scrapSaving: '₹1,500 off with old battery exchange',
        matchReasons: [
          'Budget-friendly investment for 1 BHK or small shops',
          'Provides 3 to 4 hours backup for 2 fans, 2 LED lights, and Wi-Fi router',
          'Low space footprint with clean, silent sine wave output'
        ],
        tamilMatchReasons: [
          '1 BHK அல்லது சிறிய கடைகளுக்கு ஏற்ற குறைந்த பட்ஜெட் முதலீடு',
          '2 விசிறிகள், 2 விளக்குகள் மற்றும் வைஃபைக்கு 3 முதல் 4 மணி நேர பேக்கப்',
          'குறைந்த இடம் பிடிக்கும் சிறிய வடிவமைப்பு, சத்தமில்லாத இயக்கம்'
        ],
        productTag: 'Inverters & UPS',
        whatsappMessage: 'Hello Hitek Solutions! I took the Appliance Quiz. I am looking for the Starter 700VA + 100Ah backup system in Vaniyambadi.'
      };
    }

    // Default Popular Inverter
    return {
      title: 'Popular 2–3 BHK: 900VA–1100VA Sine Wave + 150Ah Tall Tubular',
      tamilTitle: 'அதிகம் விரும்பப்படும் 2–3 BHK: 900VA–1100VA + 150Ah டால் டியூபுலர்',
      badge: 'Most Popular Choice',
      tamilBadge: 'அதிக மக்களால் தேர்ந்தெடுக்கப்பட்டது',
      specs: '900VA–1100VA Pure Sine Wave · 150Ah Tall Tubular · Up to 60M Warranty',
      estimatedPrice: '₹18,500 – ₹21,999',
      scrapSaving: '₹2,500 off with old battery exchange',
      matchReasons: [
        'The #1 recommended setup for standard 2 to 3 BHK homes in Vaniyambadi',
        'Powers 3–4 fans, 4–6 LED bulbs, TV, Wi-Fi, and laptop for 4 to 6 hours',
        'Comes with shockproof trolley, official warranty card, and doorstep installation'
      ],
      tamilMatchReasons: [
        'வாணியம்பாடியில் உள்ள 2 முதல் 3 BHK வீடுகளுக்கு மிகவும் பரிந்துரைக்கப்படும் அமைப்பு',
        '3–4 விசிறிகள், விளக்குகள், டிவி மற்றும் வைஃபை 4 முதல் 6 மணி நேரம் தடையின்றி இயங்கும்',
        'பாதுகாப்பான ட்ராலி, அசல் வாரண்டி அட்டை மற்றும் இலவச பொருத்துதல் இதில் அடங்கும்'
      ],
      productTag: 'Inverters & UPS',
      whatsappMessage: 'Hello Hitek Solutions! I took the Appliance Quiz. I was recommended the Popular 900VA + 150Ah Tall Tubular combo.'
    };
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsCompleted(false);
    setAnswers({
      category: 'inverter',
      applianceLoad: 'standard',
      waterSource: 'borewell',
      familySize: 'medium',
      priority: 'reliable'
    });
  };

  const recommendation = getRecommendation();

  return (
    <section id="quiz" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-[#507d38] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#507d38]" />
            <span>{lang === 'ta' ? 'ஸ்மார்ட் தேர்வு வழிகாட்டி' : 'Interactive Recommendation'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#102b2a] tracking-tight">
            {lang === 'ta' ? 'சரியான தயாரிப்பை கண்டறியும் வினாடி வினா.' : 'Appliance Finder Quiz.'}
          </h2>
          <p className="text-sm sm:text-base text-[#526460] mt-2 leading-relaxed">
            {lang === 'ta'
              ? 'உங்கள் வீட்டு உபயோகம் மற்றும் குடிநீர் தேவைகள் குறித்த 4 எளிய கேள்விகளுக்கு பதிலளித்து, உங்களுக்கு மிகவும் பொருத்தமான இன்வெர்ட்டர் அல்லது RO அமைப்பை கண்டறியவும்.'
              : 'Answer 4 simple questions about your household load and water needs to get a tailored inverter or RO recommendation with transparent local pricing.'}
          </p>
        </div>

        {/* Quiz Container Box */}
        <div className="bg-[#f5f7f4] border border-[#d9e1da] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Hands-Free Voice Assistant Top Bar */}
              <div className="mb-6 p-4 rounded-2xl bg-white border border-[#dce4de] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isVoiceMode ? 'bg-[#102b2a] text-[#dcff73]' : 'bg-[#f0f4ee] text-[#526460]'
                  }`}>
                    {isVoiceMode ? <Radio className="w-5 h-5 animate-pulse text-[#dcff73]" /> : <Volume2 className="w-5 h-5 text-[#507d38]" />}
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#102b2a] block">
                      {lang === 'ta' ? 'குரல் வழி வழிகாட்டி (ஹேண்ட்ஸ்-ஃப்ரீ)' : 'Voice-Guided Assistant (Hands-Free)'}
                    </strong>
                    <span className="text-[11px] text-[#526460]">
                      {isVoiceMode
                        ? (isSpeaking ? (lang === 'ta' ? 'கேள்வி பேசப்படுகிறது...' : 'Speaking question aloud...') : (isListening ? (lang === 'ta' ? 'உங்கள் பதிலை கேட்கிறது...' : 'Listening for your voice...') : (voiceFeedback || 'Voice mode active')))
                        : (lang === 'ta' ? 'பேசி பதிலளிக்க குரல் பயன்முறையை இயக்கவும்' : 'Speak answers naturally without tapping')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {isVoiceMode && (
                    <button
                      type="button"
                      onClick={() => promptCurrentQuestion(currentStep)}
                      className="px-2.5 py-1.5 text-[11px] font-bold bg-[#f5f7f4] hover:bg-[#e8eee5] text-[#102b2a] rounded-lg border border-[#bac9c0] transition-colors"
                      title="Repeat Question Aloud"
                    >
                      {lang === 'ta' ? 'மீண்டும் கேள்' : 'Repeat'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={toggleVoiceMode}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isVoiceMode
                        ? 'bg-[#102b2a] text-[#dcff73] shadow-xs'
                        : 'bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a]'
                    }`}
                  >
                    {isVoiceMode ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isVoiceMode ? (lang === 'ta' ? 'குரல் பயன்முறையை நிறுத்த' : 'Turn Off Voice') : (lang === 'ta' ? 'குரல் பயன்முறையை தொடங்கு' : 'Start Voice Mode')}</span>
                  </button>
                </div>
              </div>

              {/* Stepper Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold text-[#526460] mb-2">
                  <span>{lang === 'ta' ? `கேள்வி ${currentStep} / 4` : `Question ${currentStep} of 4`}</span>
                  <span className="font-mono text-[#507d38]">{Math.round((currentStep / 4) * 100)}% Completed</span>
                </div>
                <div className="w-full h-2 bg-[#dce4de] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#507d38] transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* QUESTION 1: Category Need */}
              {currentStep === 1 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-lg sm:text-xl font-black text-[#102b2a] mb-2">
                    {lang === 'ta' ? '1. உங்கள் வீட்டிற்கு என்ன தேவை?' : '1. What is your primary household need?'}
                  </h3>
                  <p className="text-xs text-[#526460] mb-6">
                    {lang === 'ta' ? 'உங்கள் பிரதான தேவையைத் தேர்ந்தெடுக்கவும்:' : 'Choose the main solution you are planning for:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setAnswers({ ...answers, category: 'inverter' })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        answers.category === 'inverter'
                          ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                          : 'border-[#dce4de] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#dcff73]/40 flex items-center justify-center text-[#102b2a] mb-3">
                        <Zap className="w-5 h-5 text-[#507d38]" />
                      </div>
                      <strong className="text-sm text-[#102b2a] block mb-1">
                        {lang === 'ta' ? 'இன்வெர்ட்டர் & பேட்டரி' : 'Inverter & Battery'}
                      </strong>
                      <span className="text-xs text-[#526460]">
                        {lang === 'ta' ? 'மின்வெட்டின் போது தொடர் மின்சாரம்' : 'Blackout power backup for home'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAnswers({ ...answers, category: 'ro' })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        answers.category === 'ro'
                          ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                          : 'border-[#dce4de] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#102b2a] mb-3">
                        <Droplets className="w-5 h-5 text-sky-600" />
                      </div>
                      <strong className="text-sm text-[#102b2a] block mb-1">
                        {lang === 'ta' ? 'RO குடிநீர் சுத்திகரிப்பு' : 'RO Water Purifier'}
                      </strong>
                      <span className="text-xs text-[#526460]">
                        {lang === 'ta' ? 'உப்புத்தன்மை நீக்கிய தூய குடிநீர்' : 'Pure drinking water for family'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAnswers({ ...answers, category: 'combo' })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        answers.category === 'combo'
                          ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                          : 'border-[#dce4de] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#102b2a] mb-3">
                        <Sparkles className="w-5 h-5 text-amber-700" />
                      </div>
                      <strong className="text-sm text-[#102b2a] block mb-1">
                        {lang === 'ta' ? 'இரண்டும் சேர்ந்த காம்போ' : 'Complete Home Duo'}
                      </strong>
                      <span className="text-xs text-[#526460]">
                        {lang === 'ta' ? 'இன்வெர்ட்டர் + RO சிறப்பு தொகுப்பு' : 'Power backup + Drinking water combo'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* QUESTION 2: Load or Water Quality */}
              {currentStep === 2 && (
                <div className="animate-in fade-in duration-200">
                  {answers.category === 'ro' ? (
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#102b2a] mb-2">
                        {lang === 'ta' ? '2. உங்கள் வீட்டு குடிநீர் ஆதாரம் மற்றும் சுவை என்ன?' : '2. What is your primary water source & taste?'}
                      </h3>
                      <p className="text-xs text-[#526460] mb-6">
                        {lang === 'ta' ? 'நீர் வகையைத் தேர்வு செய்யவும்:' : 'Select your water quality in Vaniyambadi:'}
                      </p>

                      <div className="space-y-3">
                        {[
                          {
                            key: 'municipal',
                            title: lang === 'ta' ? 'நகராட்சி / காவிரி குடிநீர்' : 'Municipal / River Kaveri Supply',
                            desc: lang === 'ta' ? 'குறைந்த உப்புத்தன்மை, சுவை நன்றாக உள்ளது (TDS < 250 ppm)' : 'Soft water with low salinity and good taste (TDS < 250 ppm)'
                          },
                          {
                            key: 'borewell',
                            title: lang === 'ta' ? 'நடுத்தர போர்வெல் / கிணற்று நீர்' : 'Borewell / Well Groundwater',
                            desc: lang === 'ta' ? 'பாத்திரங்களில் வெள்ளை உப்பு படிகிறது, சுவை சற்று கடினம் (TDS 300–1000 ppm)' : 'Moderate hardness, white scaling in vessels (TDS 300–1000 ppm)'
                          },
                          {
                            key: 'hard',
                            title: lang === 'ta' ? 'அதிக உப்புத்தன்மை கொண்ட போர்வெல் நீர்' : 'High Saline / Hard Groundwater',
                            desc: lang === 'ta' ? 'உப்புத்தன்மை அல்லது இரும்பு சுவை அதிகம் (TDS 1000+ ppm)' : 'Very hard or brackish taste, high Palar basin minerals (TDS 1000+ ppm)'
                          }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setAnswers({ ...answers, waterSource: opt.key as any })}
                            className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              answers.waterSource === opt.key
                                ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                                : 'border-[#dce4de] bg-white/70 hover:bg-white'
                            }`}
                          >
                            <div>
                              <strong className="text-sm text-[#102b2a] block">{opt.title}</strong>
                              <span className="text-xs text-[#526460]">{opt.desc}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                              answers.waterSource === opt.key ? 'border-[#507d38] bg-[#507d38] text-white' : 'border-[#bac9c0]'
                            }`}>
                              {answers.waterSource === opt.key && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#102b2a] mb-2">
                        {lang === 'ta' ? '2. மின்வெட்டின் போது எவற்றை இயக்க வேண்டும்?' : '2. What appliances must run during blackouts?'}
                      </h3>
                      <p className="text-xs text-[#526460] mb-6">
                        {lang === 'ta' ? 'உங்கள் தேவையான மின்சுமையைத் தேர்ந்தெடுக்கவும்:' : 'Select your essential power load:'}
                      </p>

                      <div className="space-y-3">
                        {[
                          {
                            key: 'basic',
                            title: lang === 'ta' ? 'அடிப்படை சுமை (1 BHK / சிறிய பயன்பாடு)' : 'Basic Essentials (1 BHK / Compact)',
                            desc: lang === 'ta' ? '2 மின்விசிறிகள், 2 LED விளக்குகள், வைஃபை ரூட்டர்' : '2 Fans + 2 LED Bulbs + Wi-Fi Router (~3 to 4 hours)'
                          },
                          {
                            key: 'standard',
                            title: lang === 'ta' ? 'வழக்கமான குடும்ப சுமை (2–3 BHK)' : 'Standard Family Setup (2–3 BHK)',
                            desc: lang === 'ta' ? '3–4 விசிறிகள், 4–6 விளக்குகள், டிவி, லேப்டாப், வைஃபை' : '3–4 Fans + 4–6 LEDs + TV + Laptop + Wi-Fi (~4 to 6 hours)'
                          },
                          {
                            key: 'heavy',
                            title: lang === 'ta' ? 'அதிக சுமை & இன்வெர்ட்டர் பிரிட்ஜ் (3–4 BHK)' : 'Heavy Duty Backup (Runs Inverter Fridge)',
                            desc: lang === 'ta' ? 'விசிறிகள், விளக்குகள், டிவி மற்றும் இன்வெர்ட்டர் பிரிட்ஜ்' : 'All Fans, Lights, TV + Inverter Refrigerator (~6 to 8+ hours)'
                          }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setAnswers({ ...answers, applianceLoad: opt.key as any })}
                            className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              answers.applianceLoad === opt.key
                                ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                                : 'border-[#dce4de] bg-white/70 hover:bg-white'
                            }`}
                          >
                            <div>
                              <strong className="text-sm text-[#102b2a] block">{opt.title}</strong>
                              <span className="text-xs text-[#526460]">{opt.desc}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                              answers.applianceLoad === opt.key ? 'border-[#507d38] bg-[#507d38] text-white' : 'border-[#bac9c0]'
                            }`}>
                              {answers.applianceLoad === opt.key && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* QUESTION 3: Household Size */}
              {currentStep === 3 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-lg sm:text-xl font-black text-[#102b2a] mb-2">
                    {lang === 'ta' ? '3. உங்கள் வீட்டில் எத்தனை நபர்கள் உள்ளனர்?' : '3. How many people live in your household?'}
                  </h3>
                  <p className="text-xs text-[#526460] mb-6">
                    {lang === 'ta' ? 'குடும்ப அளவைத் தேர்ந்தெடுக்கவும்:' : 'Select your household size:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        key: 'small',
                        title: lang === 'ta' ? '1 – 3 நபர்கள்' : '1 to 3 Members',
                        sub: lang === 'ta' ? 'சிறிய வீடு / 1 BHK' : 'Compact daily usage'
                      },
                      {
                        key: 'medium',
                        title: lang === 'ta' ? '4 – 6 நபர்கள்' : '4 to 6 Members',
                        sub: lang === 'ta' ? 'வழக்கமான குடும்பம் / 2–3 BHK' : 'Standard family load'
                      },
                      {
                        key: 'large',
                        title: lang === 'ta' ? '7+ நபர்கள் / கூட்டு குடும்பம்' : '7+ Members / Joint Family',
                        sub: lang === 'ta' ? 'அதிக தினசரி பயன்பாடு' : 'High volume & multiple rooms'
                      }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setAnswers({ ...answers, familySize: opt.key as any })}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          answers.familySize === opt.key
                            ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                            : 'border-[#dce4de] bg-white/70 hover:bg-white'
                        }`}
                      >
                        <strong className="text-sm text-[#102b2a] block mb-1">{opt.title}</strong>
                        <span className="text-xs text-[#526460]">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUESTION 4: Priority & Budget */}
              {currentStep === 4 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-lg sm:text-xl font-black text-[#102b2a] mb-2">
                    {lang === 'ta' ? '4. உங்கள் முக்கிய முன்னுரிமை என்ன?' : '4. What is your priority & preference?'}
                  </h3>
                  <p className="text-xs text-[#526460] mb-6">
                    {lang === 'ta' ? 'உங்களுக்கு எது முக்கியம் என்பதைத் தேர்ந்தெடுக்கவும்:' : 'Select your primary decision factor:'}
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        key: 'budget',
                        title: lang === 'ta' ? 'குறைந்த பட்ஜெட் & சிறந்த மதிப்பு' : 'Value for Money / Budget Saver',
                        desc: lang === 'ta' ? 'குறைந்த ஆரம்ப முதலீட்டில் நம்பகமான சேவை' : 'Lowest upfront cost with reliable essential performance'
                      },
                      {
                        key: 'reliable',
                        title: lang === 'ta' ? 'நீண்ட உத்தரவாதம் & அதிக விற்பனை (பிராண்டட்)' : 'Maximum Reliability & Long Warranty (Bestseller)',
                        desc: lang === 'ta' ? '36 முதல் 60 மாத உத்தரவாதம் கொண்ட முன்னணி பிராண்ட்' : '36 to 60 Months official warranty with top customer rating'
                      },
                      {
                        key: 'heavyduty',
                        title: lang === 'ta' ? 'அதிக சுமை தாங்கும் திறன் & பிரீமியம் தரம்' : 'Heavy-Duty Performance & Deep Protection',
                        desc: lang === 'ta' ? 'அதிக ஆயுள், அதிக சேமிப்பு மற்றும் தீவிர பயன்பாடு' : 'High surge capacity, jumbo capacity, and zero-compromise build'
                      }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setAnswers({ ...answers, priority: opt.key as any })}
                        className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          answers.priority === opt.key
                            ? 'border-[#507d38] bg-white ring-2 ring-[#507d38]/20 shadow-xs'
                            : 'border-[#dce4de] bg-white/70 hover:bg-white'
                        }`}
                      >
                        <div>
                          <strong className="text-sm text-[#102b2a] block">{opt.title}</strong>
                          <span className="text-xs text-[#526460]">{opt.desc}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                          answers.priority === opt.key ? 'border-[#507d38] bg-[#507d38] text-white' : 'border-[#bac9c0]'
                        }`}>
                          {answers.priority === opt.key && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-[#dce4de] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#526460] hover:text-[#102b2a] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'முந்தையது' : 'Back'}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#102b2a] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#1a4442] transition-colors cursor-pointer shadow-xs"
                >
                  <span>{currentStep === 4 ? (lang === 'ta' ? 'பரிந்துரையை பார்க்க' : 'See My Recommendation') : (lang === 'ta' ? 'அடுத்த கேள்வி' : 'Next Question')}</span>
                  <ArrowRight className="w-4 h-4 text-[#dcff73]" />
                </button>
              </div>
            </div>
          ) : (
            /* COMPLETED RECOMMENDATION RESULT SCREEN */
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold text-[#102b2a] bg-[#dcff73] px-3 py-1 rounded-md">
                  {lang === 'ta' ? recommendation.tamilBadge : recommendation.badge}
                </span>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526460] hover:text-[#102b2a] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'மீண்டும் வினாடி வினா எடுக்க' : 'Retake Quiz'}</span>
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#102b2a] mb-2 leading-tight">
                {lang === 'ta' ? recommendation.tamilTitle : recommendation.title}
              </h3>

              <div className="text-xs sm:text-sm font-mono font-bold text-[#507d38] mb-6">
                {recommendation.specs}
              </div>

              {/* Price & Scrap Savings Box */}
              <div className="bg-white p-5 rounded-2xl border border-[#dce4de] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#526460] block mb-1">
                    {lang === 'ta' ? 'மதிப்பிடப்பட்ட விலை (வாணியம்பாடி)' : 'Estimated Vaniyambadi Price'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#102b2a] font-mono tabular-nums">
                    {recommendation.estimatedPrice}
                  </div>
                </div>

                {recommendation.scrapSaving && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{recommendation.scrapSaving}</span>
                  </div>
                )}
              </div>

              {/* Why This Matches You */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#102b2a] mb-3">
                  {lang === 'ta' ? 'இது உங்கள் வீட்டிற்கு எவ்வாறு பொருந்துகிறது:' : 'Why this is tailored to your answers:'}
                </h4>
                <div className="space-y-2.5">
                  {(lang === 'ta' ? recommendation.tamilMatchReasons : recommendation.matchReasons).map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#37474f]">
                      <Check className="w-4 h-4 text-[#507d38] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#dce4de] flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/919150051486?text=${encodeURIComponent(recommendation.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#102b2a] hover:bg-[#1a4442] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#dcff73]" />
                  <span>{lang === 'ta' ? 'இந்த மாடலை வாட்ஸ்அப்பில் புக் செய்ய' : 'Book This Model on WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => onSelectProduct(recommendation.productTag)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#dcff73] hover:bg-[#cbe663] text-[#102b2a] font-black text-sm rounded-xl transition-colors"
                >
                  <span>{lang === 'ta' ? 'விசாரணை படிவத்திற்கு செல்ல' : 'Fill Enquiry Form'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
