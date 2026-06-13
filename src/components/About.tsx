import React, { useEffect, useRef } from 'react';
import { GradientFlowText } from './TextEffects/GradientFlowText';
import { LineReveal } from './TextEffects/LineReveal';
import { DrawingLine } from './DrawingLine';
import { use3DTilt } from '../hooks/use3DTilt';
import { Heart, ShieldCheck, Globe, Users, Handshake, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STORY_STEPS = [
  {
    num: '01',
    title: 'The Vision',
    text: "HOP AI Foundation is a non-profit initiative established to democratize Artificial Intelligence and ensure that its benefits reach every section of society, not just large companies or technology experts."
  },
  {
    num: '02',
    title: 'Real-World Experience',
    text: "The Foundation was created from real-world experience. Before founding HOP AI Foundation, the founders delivered various online and offline training sessions to social sector organizations throughout India. Drawing on the firsthand experience gained from these engagements, they subsequently developed the beginner- friendly 'AI for Non-profits' course specifically tailored for NGOs."
  },
  {
    num: '03',
    title: 'The Technology Gap',
    text: "During their work with nonprofit organizations across India, the founders observed a significant digital and technology gap. Many organizations were unable to invest in AI learning due to limited financial resources, while others were unaware of the practical benefits AI could bring to their day-to-day operations. As a result, they continued to rely heavily on manual processes, missing opportunities to save time, improve efficiency, and make better use of their limited resources. This experience reinforced the belief that AI education should not be restricted by affordability, technical background, or access to resources. Instead, AI learning should be simple, practical, accessible, and available to everyone especially grassroots institutions and individuals who can benefit the most from it."
  },
  {
    num: '04',
    title: 'Inclusive Adoption',
    text: "HOP AI Foundation was established to bridge this gap and promote inclusive AI adoption, ensuring that no community or sector is left behind in the digital future."
  }
];

const VALUES = [
   { icon: Heart, label: 'Human-Centered Innovation' },
   { icon: ShieldCheck, label: 'Ethical AI' },
   { icon: Globe, label: 'Accessibility' },
   { icon: Users, label: 'Inclusion' },
   { icon: Handshake, label: 'Collaboration' },
   { icon: Zap, label: 'Continuous Learning' }
];

function ValueCard({ value, i }: { value: typeof VALUES[0], i: number, key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, '.icon-parallax');

  const Icon = value.icon;
  return (
     <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.4 }}
        className="interactive-card flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-border/40 bg-card/80 backdrop-blur-xl hover:scale-105 duration-300 cursor-default group"
        style={{ transformStyle: 'preserve-3d' }}
     >
        <Icon className="text-primary group-hover:rotate-12 transition-transform duration-300 icon-parallax" size={20} />
        <span className="font-medium text-foreground">{value.label}</span>
     </motion.div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Progress line animation scrubbed by scroll
      gsap.fromTo("#story-progress-line", 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-timeline-container",
            start: "top 40%",
            end: "bottom 60%",
            scrub: true
          }
        }
      );

      // Active card indicators and animations
      const cards = gsap.utils.toArray(".story-card-wrapper");
      cards.forEach((card: any) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            end: "bottom 45%",
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              card.classList.add("active");
            },
            onLeave: () => {
              card.classList.remove("active");
            },
            onEnterBack: () => {
              card.classList.add("active");
            },
            onLeaveBack: () => {
              card.classList.remove("active");
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about-us" className="py-24 md:py-32 scroll-mt-24 bg-transparent relative overflow-hidden" ref={containerRef}>
      {/* Top layout boundary line */}
      <DrawingLine className="absolute top-0 inset-x-0" />

      {/* Subtle background image */}
      <div className="absolute inset-0 z-0 opacity-5">
         <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80" alt="background" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-background/60 mix-blend-multiply" />
      </div>

      {/* Local styles for the story timeline */}
      <style>{`
        .story-card-wrapper {
          opacity: 0.35;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .story-card-wrapper.active {
          opacity: 1;
          transform: translateY(0);
        }
        .story-card-wrapper .story-node {
          border-color: rgba(114, 191, 74, 0.2);
          background-color: var(--color-background);
          transition: all 0.4s ease;
        }
        .story-card-wrapper.active .story-node {
          border-color: var(--color-primary);
          box-shadow: 0 0 12px rgba(114, 191, 74, 0.4);
          background-color: var(--color-background);
        }
        .story-card-wrapper .story-node-dot {
          background-color: transparent;
          transition: all 0.4s ease;
        }
        .story-card-wrapper.active .story-node-dot {
          background-color: var(--color-primary);
        }
        .story-card-wrapper .story-card-body {
          border-color: rgba(34, 51, 113, 0.12);
          background-color: rgba(255, 255, 255, 0.72);
          transition: all 0.5s ease;
        }
        .story-card-wrapper.active .story-card-body {
          border-color: rgba(114, 191, 74, 0.3);
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(114, 191, 74, 0.05);
        }
        .story-card-wrapper.active .story-card-glow {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
         <div className="mb-20 text-center max-w-4xl mx-auto">
             <LineReveal
                text="A Future Where Technology Strengthens Every Social Impact Initiative"
                as="h2"
                gradient
                className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-8"
             />
         </div>

         {/* Story Section with Progressive Timeline Animation */}
         <div className="max-w-4xl mx-auto mb-32 relative">
            <div className="text-center mb-16">
               <LineReveal 
                  text="Our Story" 
                  as="h3"
                  className="font-display text-3xl font-extrabold text-foreground tracking-tight relative inline-block"
               />
               <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
            </div>

            <div className="relative story-timeline-container pl-6 md:pl-12 ml-4 md:ml-8">
               {/* Vertical background line */}
               <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-border/20" />
               
               {/* Vertical scroll progress indicator line */}
               <div 
                  id="story-progress-line" 
                  className="absolute left-0 top-4 w-0.5 bg-primary origin-top"
                  style={{ height: 'calc(100% - 8px)', scaleY: 0, transition: 'none' }}
               />

               <div className="space-y-12">
                  {STORY_STEPS.map((step, idx) => (
                     <div key={idx} className="story-card-wrapper relative flex items-start gap-4">
                        {/* Timeline Bullet Node */}
                        <div 
                           className="absolute left-[-31px] md:left-[-55px] top-6 w-5 h-5 md:w-6 md:h-6 rounded-full bg-background border-2 border-border flex items-center justify-center z-10 story-node"
                        >
                           <div className="w-2 h-2 rounded-full bg-transparent story-node-dot" />
                        </div>

                        {/* Story Card */}
                        <div 
                           className="story-card-body w-full p-6 md:p-8 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl relative overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 story-card-glow pointer-events-none" />
                           
                           <div className="flex items-center gap-4 mb-4">
                              <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                 PHASE {step.num}
                              </span>
                              <h4 className="font-display font-bold text-lg text-foreground/80 tracking-wide">
                                 {step.title}
                              </h4>
                           </div>
                           
                           <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body">
                              {step.text}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="mb-12 text-center">
            <LineReveal 
               text="Our Core Values" 
               as="h3"
               className="font-display text-2xl font-bold text-foreground"
            />
         </div>

         <div className="flex flex-wrap justify-center items-center gap-4 mb-24">
            {VALUES.map((v, i) => (
               <ValueCard key={i} value={v} i={i} />
            ))}
         </div>

         {/* Legal Block */}
         <div className="max-w-3xl mx-auto border border-border rounded-2xl p-8 md:p-12 text-center bg-card/50 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
             <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                 <strong className="text-foreground">Organization:</strong> HOP AI Foundation<br/>
                 <strong className="text-foreground">Type:</strong> Section 8 Non-Profit | Kerala, India<br/>
                 <strong className="text-foreground">CIN:</strong> U85500KL2026NPL101861<br/>
                 <strong className="text-foreground">License Number:</strong> 182077
             </p>
         </div>
      </div>
    </section>
  );
}
