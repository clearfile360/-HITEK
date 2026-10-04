import React from 'react';
import { Wrench, Zap, Droplets, Phone, ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceEngineersProps {
  onSelectSolution: (productName: string) => void;
}

export const ServiceEngineersSection: React.FC<ServiceEngineersProps> = ({ onSelectSolution }) => {
  const engineerServices = [
    {
      title: 'Appliances Service',
      tamilTitle: 'வீட்டு உபகரணங்கள் பழுதுபார்ப்பு',
      icon: Wrench,
      description: 'Expert diagnostic & on-site repair for key household electronics by trained technicians.',
      items: [
        'Washing Machines (Front load & top load drum, motor, drain faults)',
        'Refrigerators (Gas charging, compressor issues, cooling fault)',
        'Microwave Ovens & Induction cookers',
        'Mixer Grinders & Water Dispensers'
      ],
      tag: 'Service enquiry - Appliances'
    },
    {
      title: 'Licensed Electrician',
      tamilTitle: 'மின்சார வேலை & வயரிங்',
      icon: Zap,
      description: 'Certified residential and commercial electrical work with complete safety compliance.',
      items: [
        'Complete home wiring, renovation & fault troubleshooting',
        'Inverter & battery wiring, bypass switch installation',
        'MCB, RCCB, distribution board & earthing check',
        'LED lights, ceiling fans & smart switch setup'
      ],
      tag: 'Service enquiry - Electrician'
    },
    {
      title: 'Plumber & Pipe Works',
      tamilTitle: 'பிளம்பிங் & குழாய் வேலைகள்',
      icon: Droplets,
      description: 'Prompt plumbing fixes, water pressure tuning, and sanitary pipe fitting in Vaniyambadi.',
      items: [
        'RO water inlet & drain piping connection',
        'Overhead water tank cleaning & automatic float valve',
        'Water motor pump repair & pressure pump setup',
        'Bathroom taps, concealed valve & pipeline leak repairs'
      ],
      tag: 'Service enquiry - Plumber'
    }
  ];

  return (
    <section id="engineers" className="py-20 bg-[#102b2a] text-white border-b border-[#38504d] relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#205047]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#507d38]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#dcff73]/15 text-[#dcff73] text-xs font-bold tracking-widest uppercase mb-3">
            <span>Home Services &amp; Repairs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
            Experienced Service Engineers.<br />
            <span className="text-[#dcff73] font-normal italic">We’re here to help.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#bbceca] leading-relaxed">
            Need an urgent repair or professional setup in Vaniyambadi? Our vetted in-house electricians, plumbers, and appliance technicians visit your doorstep with standard rates and guaranteed workmanship.
          </p>
        </div>

        {/* 3 Columns (Appliances, Electrician, Plumber) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {engineerServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-[#0e2423] border border-[#2b4441] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#dcff73]/50 transition-all hover:translate-y-[-2px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#dcff73] text-[#102b2a] flex items-center justify-center mb-6 shadow-md">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#dcff73] mb-3">
                    {srv.tamilTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#bbceca] mb-6 leading-relaxed">
                    {srv.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {srv.items.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#e2ece9]">
                        <CheckCircle2 className="w-4 h-4 text-[#dcff73] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#2b4441]">
                  <button
                    onClick={() => onSelectSolution(srv.tag)}
                    className="w-full inline-flex items-center justify-between px-4 py-3 bg-[#1d3c3a] hover:bg-[#dcff73] hover:text-[#102b2a] text-[#dcff73] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer group"
                  >
                    <span>Book {srv.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Dispatch Banner */}
        <div className="bg-[#163634] border border-[#2b4441] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#dcff73]/20 flex items-center justify-center text-[#dcff73] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Emergency Breakdown or Short-Circuit?
              </h4>
              <p className="text-xs sm:text-sm text-[#bbceca]">
                Call our direct technician helpline. We cover all areas across Vaniyambadi including Muslimpur, Khaderpet, Noorullahpet &amp; Valayampet.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+919150051486"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#dcff73] text-[#102b2a] font-black text-sm rounded-lg hover:bg-[#cbe663] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call 91500 51486</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
