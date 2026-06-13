import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LineReveal } from './TextEffects/LineReveal';
import { DrawingLine } from './DrawingLine';
import { use3DTilt } from '../hooks/use3DTilt';
import { BrainCircuit, GitPullRequestDraft, Lightbulb, Users, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: BrainCircuit,
    title: 'AI Capacity Building',
    desc: 'For Nonprofits',
    items: ['Proposal writing', 'Fundraising', 'Impact reporting', 'Communications', 'M&E', 'Data analysis']
  },
  {
    icon: GitPullRequestDraft,
    title: 'Digital Transformation',
    desc: 'Consulting',
    items: ['Tech gap analysis', 'Workflow improvement', 'Cloud adoption', 'Tech roadmaps']
  },
  {
    icon: Lightbulb,
    title: 'Research & Innovation',
    desc: '',
    items: ['AI for Social Good', 'Responsible Tech', 'Digital Inclusion', 'Technology Policy']
  },
  {
    icon: Users,
    title: 'Train-the-Trainer',
    desc: 'Programs',
    items: ['Non-profit teams', 'Volunteers', 'Community leaders', 'Youth groups']
  },
  {
    icon: BookOpen,
    title: 'Knowledge Resources',
    desc: '',
    items: ['Toolkits', 'Research reports', 'AI prompt libraries', 'Case studies']
  }
];

function ServiceCard({
  service,
  i,
  isActive,
  onClick
}: {
  service: typeof SERVICES[0],
  i: number,
  isActive: boolean,
  onClick: () => void,
  key?: React.Key
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, '.icon-parallax');

  const Icon = service.icon;

  return (
     <motion.div 
        layout
        ref={cardRef}
        onClick={onClick}
        className={cn(
           "interactive-card p-8 rounded-2xl cursor-pointer group border border-border/40",
           isActive ? "border-primary bg-primary/5 lg:col-span-2 shadow-[0_12px_36px_rgba(114,191,74,0.15)]" : "hover:border-primary/45"
        )}
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
     >
        <div className="flex items-start justify-between mb-4">
           <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 icon-parallax",
              isActive ? "bg-primary text-white scale-110 shadow-sm" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
           )}>
              <Icon size={28} className="group-hover:rotate-12 transition-transform duration-300" />
           </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-1">{service.title}</h3>
        {service.desc && <p className="text-muted-foreground font-medium mb-4">{service.desc}</p>}
        
        <AnimatePresence>
           {isActive && (
              <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="mt-6 pt-6 border-t border-border/30"
              >
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.items.map((item, idx) => (
                       <li key={idx} className="flex items-center gap-2 text-foreground font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                       </li>
                    ))}
                 </ul>
              </motion.div>
           )}
        </AnimatePresence>
     </motion.div>
  );
}

export function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section id="what-we-do" ref={sectionRef} className="py-24 md:py-32 scroll-mt-24 bg-transparent relative overflow-hidden">
      {/* Top layout boundary line */}
      <DrawingLine className="absolute top-0 inset-x-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8">
         <div className="text-center mb-16">
            <LineReveal 
              text="Our Areas of Work" 
              as="h2"
              className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6"
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
               <ServiceCard
                  key={i}
                  service={s}
                  i={i}
                  isActive={activeIndex === i}
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
               />
            ))}
         </div>

         <div className="mt-24 pt-12 border-t border-border flex flex-col items-center text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">Who We Support</p>
            <div className="flex flex-wrap justify-center gap-4 text-secondary font-medium">
               {['Trusts', 'Societies', 'Section 8 Companies', 'Community Organizations', 'Social Enterprises', 'Educational Institutions', 'CSR Initiatives', 'Government Stakeholders'].map((entity, i) => (
                  <span key={i} className="px-4 py-2 rounded-full border border-border bg-secondary/5 text-sm hover:border-primary/50 hover:text-primary transition-colors cursor-default">
                     {entity}
                  </span>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
}
