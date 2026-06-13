import React, { useRef } from 'react';
import { LineReveal } from './TextEffects/LineReveal';
import { DrawingLine } from './DrawingLine';
import { Magnetic } from './Magnetic';
import { use3DTilt } from '../hooks/use3DTilt';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'Nonprofits', 'Foundations', 'CSR Initiatives', 'Academic Institutions', 
  'Technology Companies', 'Government Bodies', 'International Organizations', 
  'Community Networks', 'Research Institutions', 'Social Enterprises'
];

const AREAS = [
  { title: 'Capacity Building', desc: 'Equipping teams with AI literacy and practical tools.' },
  { title: 'Joint Training', desc: 'Co-hosting specialized workshops and bootcamps.' },
  { title: 'Research Collaborations', desc: 'Studying the impact of AI in the social sector.' },
  { title: 'Technology Deployment', desc: 'Implementing tailored tech solutions for nonprofits.' },
  { title: 'Knowledge Exchange', desc: 'Sharing best practices, case studies, and resources.' },
  { title: 'Volunteer Engagement', desc: 'Connecting tech professionals with social projects.' }
];

function PartnershipAreaCard({ area }: { area: typeof AREAS[0], key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef);

  return (
     <div 
        ref={cardRef} 
        className="interactive-card p-8 rounded-2xl border border-border/40 group"
        style={{ transformStyle: 'preserve-3d' }}
     >
        <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
           {area.title}
        </h4>
        <p className="text-muted-foreground leading-relaxed">{area.desc}</p>
     </div>
  );
}

export function Partnerships() {
  return (
    <section id="partnerships" className="py-24 md:py-32 scroll-mt-24 bg-transparent relative overflow-hidden">
      {/* Top layout boundary line */}
      <DrawingLine className="absolute top-0 inset-x-0" />

      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 md:w-2/3">
           <LineReveal 
              text="Let's Build the Future Together" 
              as="h2"
              className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6"
           />
           <p className="text-xl text-muted-foreground font-body">
              Technology transformation cannot happen in isolation. We actively collaborate with:
           </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-24">
           {CATEGORIES.map((cat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: i * 0.05 }}
               className="liquid-glass px-5 py-2 rounded-full text-sm font-medium text-foreground/90 border border-border/40 bg-secondary/5"
             >
               {cat}
             </motion.div>
           ))}
        </div>

        <h3 className="text-2xl font-display font-bold text-foreground mb-8">Partnership Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
           {AREAS.map((area, i) => (
             <PartnershipAreaCard key={i} area={area} />
           ))}
        </div>

        <div className="text-center">
           <Magnetic>
              <a 
                 href="#contact"
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 animate-glow-pulse border border-primary/30"
              >
                 <span className="magnetic-text block flex items-center gap-2">
                    Partner With Us <ArrowRight size={20} />
                  </span>
              </a>
           </Magnetic>
        </div>
      </div>
    </section>
  );
}
