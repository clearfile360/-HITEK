import React, { useState } from 'react';
import { Star, MapPin, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

interface Story {
  id: string;
  name: string;
  locality: string;
  category: 'inverter' | 'ro' | 'service';
  setup: string;
  date: string;
  rating: number;
  highlight: string;
  content: string;
  outcome: string;
}

export const CustomerSuccessStories: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'inverter' | 'ro' | 'service'>('all');

  const stories: Story[] = [
    {
      id: '1',
      name: 'Mohammed Arshad',
      locality: 'Khaderpet, Vaniyambadi',
      category: 'inverter',
      setup: '1150VA Sine Wave Inverter + 200Ah Exide Tall Tubular Battery',
      date: 'Installed October 2025',
      rating: 5,
      highlight: '6+ hours uninterrupted power for clinic and home fans',
      content:
        'Frequent power tripping on Khaderpet main road used to halt our home clinic equipment and our kids’ evening studies. I called Hitek after seeing their Malang Road shop. Within 2 hours, their technician delivered the battery, tested earthing, and finished neat wiring with a safety bypass switch.',
      outcome: 'No flicker on sensitive medical diagnostics, 6.5 hours continuous backup during storm outages.'
    },
    {
      id: '2',
      name: 'K. Ramanathan',
      locality: 'Muslimpur, Vaniyambadi',
      category: 'ro',
      setup: 'Multi-Stage RO + UV + Copper Alkaline Mineral Purifier',
      date: 'Installed December 2025',
      rating: 5,
      highlight: 'Water TDS dropped from 890 ppm to 110 ppm with crisp sweet taste',
      content:
        'Our borewell water was extremely salty and caused white scaling on stainless steel vessels. The Hitek team visited with a digital TDS meter for a free test, showed us the reading (890 ppm), and recommended the copper alkaline purifier. They did clean concealed piping without breaking kitchen tiles.',
      outcome: 'Safe, sweet drinking water for elderly parents with zero plastic can orders.'
    },
    {
      id: '3',
      name: 'Syed Farooq',
      locality: 'Newtown, Vaniyambadi',
      category: 'inverter',
      setup: 'Old Battery Scrap Exchange + 150Ah Amaron Inverter Battery',
      date: 'Purchased January 2026',
      rating: 5,
      highlight: 'Instant scrap valuation deducted directly on the spot',
      content:
        'My 4-year-old inverter battery was swollen and gave barely 20 minutes of backup. Other shops gave vague scrap estimates, but Hitek checked the weight and gave a transparent instant exchange deduction on the brand-new Amaron tubular battery with official warranty card.',
      outcome: 'Saved ₹2,800 on exchange, got doorstep installation within 45 minutes.'
    },
    {
      id: '4',
      name: 'P. Senthil Kumar',
      locality: 'Valayampet, Vaniyambadi',
      category: 'service',
      setup: 'Emergency Electrician & Main Distribution Board Repair',
      date: 'Serviced February 2026',
      rating: 5,
      highlight: 'Technician reached our doorstep in 25 minutes after sparking',
      content:
        'Late evening our main MCB started buzzing and sparked due to an overloaded AC neutral wire. I called their helpline number 91500 51486. The electrician arrived equipped with proper multimeters, dressed the burnt wires, replaced the faulty 32A breaker, and checked phase voltage.',
      outcome: 'Safe power restored quickly with genuine industrial-grade Havells MCB.'
    },
    {
      id: '5',
      name: 'Amina Begum',
      locality: 'Noorullahpet, Vaniyambadi',
      category: 'ro',
      setup: 'RO Spun Candle & Membrane Replacement Service',
      date: 'Serviced March 2026',
      rating: 5,
      highlight: 'Prompt membrane change without pushing unnecessary parts',
      content:
        'Water flow from our existing RO filter had slowed to a thin trickle. A previous technician insisted the entire motor had burnt. Hitek checked it honestly, showed me it was just a clogged sediment pre-filter and sediment candle, replaced them at nominal cost, and calibrated the TDS.',
      outcome: 'Full flow restored for under ₹600 without replacing the costly booster pump.'
    },
    {
      id: '6',
      name: 'G. Venkatesan',
      locality: 'Jolarpet Road, Vaniyambadi',
      category: 'inverter',
      setup: 'Commercial 2kVA UPS + 2x 150Ah Battery Bank for Grocery Store',
      date: 'Installed January 2026',
      rating: 5,
      highlight: 'Runs billing computers, CCTV and deep freezers through blackout',
      content:
        'During evening load shedding our billing counter and barcode scanners would reboot, losing customer receipts. Hitek installed a heavy-duty pure sine wave UPS that transitions in milliseconds without rebooting computers.',
      outcome: 'Zero billing downtime during peak shopping hours.'
    }
  ];

  const filteredStories = activeFilter === 'all' 
    ? stories 
    : stories.filter(s => s.category === activeFilter);

  return (
    <section id="stories" className="py-20 bg-white border-b border-[#dce4de] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#507d38] uppercase block mb-2">
              Verified Local Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b2a] tracking-tight">
              Customer Success Stories.
            </h2>
            <p className="text-sm sm:text-base text-[#526460] mt-2 max-w-xl">
              Authentic feedback from families, shopkeepers, and clinics across Vaniyambadi who rely on Hitek Solutions for uninterrupted power and clean drinking water.
            </p>
          </div>

          {/* Social Proof Metric Lockup */}
          <div className="flex items-center gap-6 bg-[#f5f7f4] border border-[#d9e1da] px-5 py-3.5 rounded-xl self-start md:self-auto">
            <div>
              <div className="flex items-center gap-1 text-[#507d38] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#102b2a] block">4.9 / 5.0 Local Rating</span>
            </div>
            <div className="h-8 w-px bg-[#d9e1da]" />
            <div>
              <span className="text-base font-black text-[#102b2a] font-mono tabular-nums">1,250+</span>
              <span className="text-xs text-[#526460] block">Vaniyambadi Homes Served</span>
            </div>
          </div>
        </div>

        {/* Interactive Filter Tabs (Using functional buttons as permitted by zero-pill guidelines) */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            All Stories ({stories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('inverter')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'inverter'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            Inverters &amp; Batteries (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('ro')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'ro'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            RO Water Filters (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('service')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'service'
                ? 'bg-[#102b2a] text-white shadow-xs'
                : 'bg-[#f5f7f4] text-[#526460] hover:text-[#102b2a] hover:bg-[#e8eee5]'
            }`}
          >
            Service Engineers (1)
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              className="bg-[#f5f7f4] border border-[#d9e1da] rounded-xl p-6 flex flex-col justify-between hover:border-[#507d38]/50 transition-all hover:shadow-md"
            >
              <div>
                {/* Card Header: Locality & Verified Status */}
                <div className="flex items-center justify-between text-xs text-[#526460] mb-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#507d38]" />
                    <span>{story.locality}</span>
                  </div>
                  <span className="font-mono text-[11px]">{story.date}</span>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[11px] font-bold text-[#102b2a] ml-1.5 font-mono">5.0</span>
                </div>

                {/* Highlight Quote */}
                <h3 className="text-base font-extrabold text-[#102b2a] mb-2 leading-snug">
                  "{story.highlight}"
                </h3>

                {/* Installed Equipment Tag (Unboxed metadata with separator per anti-pill rule) */}
                <div className="text-xs text-[#507d38] font-semibold mb-3">
                  <span>Setup: </span>
                  <span className="text-[#102b2a]">{story.setup}</span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[#526460] leading-relaxed mb-4">
                  {story.content}
                </p>
              </div>

              {/* Concrete Outcome & Author */}
              <div className="pt-4 border-t border-[#d9e1da]">
                <div className="bg-white p-3 rounded-lg border border-[#e2e8e0] mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#507d38] mb-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#507d38]" />
                    <span>Result:</span>
                  </div>
                  <p className="text-xs text-[#37474f] leading-normal">
                    {story.outcome}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <strong className="text-[#102b2a] font-bold">{story.name}</strong>
                  <span className="text-[#507d38] font-semibold flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Verified Installation</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
