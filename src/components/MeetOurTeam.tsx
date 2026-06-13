import React, { useState, useRef } from 'react';
import { LineReveal } from './TextEffects/LineReveal';
import { DrawingLine } from './DrawingLine';
import { use3DTilt } from '../hooks/use3DTilt';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Award, Compass, Quote, ChevronDown, ChevronUp } from 'lucide-react';

const TEAM = [
  {
    name: 'Captain P.V. Sreelal',
    role: 'Director & Lead Trainer',
    image: '/directors_webp/sreelal.webp',
    quote: 'AI education should be simple, practical, accessible, and available to everyone—especially grassroots communities who can benefit the most from it.',
    bullets: [
      { label: 'Aviation & Training', desc: 'Professional airline pilot bringing operational checklists and safety-grade precision to training.' },
      { label: 'AI Specialization', desc: 'Google Gemini Certified professional testing and implementing generative AI for productivity.' },
      { label: 'Social Outreach', desc: 'Trained diverse social organizations and grassroots leaders throughout India.' }
    ],
    bio: "Captain P.V. Sreelal is a professional airline pilot, technology enthusiast and AI educator. As a Google Gemini Certified professional, he has been actively involved in studying, testing and implementing AI tools for practical productivity and organizational efficiency. Through his work with social sector organizations, he has trained individuals from diverse educational and professional backgrounds, including many with minimal technical exposure.\n\nHis vision is centered on ensuring that AI remains accessible, understandable and useful for ordinary people rather than becoming a technology available only to privileged or highly technical communities. He will serve as the Lead Trainer and Technical Lead for this initiative."
  },
  {
    name: 'Merin Alias',
    role: 'Director & Development Sector Specialist',
    image: '/directors_webp/merin.webp',
    quote: 'AI interventions must be practical, relevant, and directly aligned with the realities of community engagement and governance systems.',
    bullets: [
      { label: 'Sector Experience', desc: '9+ years working directly with grassroots organizations and social sector groups across India.' },
      { label: 'Local Governance', desc: "Holds a Master's degree in Local Governance with extensive program implementation expertise." },
      { label: 'Capacity Building', desc: 'Specialist in public service structures, community empowerment, and institutional development.' }
    ],
    bio: "Merin Alias brings over nine years of experience working directly with grassroots organizations and development sector institutions across India. She holds a Master's degree in Local Governance and has extensive experience in community engagement, capacity building, institutional development and grassroots program implementation.\n\nHis understanding of local governance systems, community institutions and public service structures will help ensure that the proposed AI interventions are practical, relevant and aligned with the realities of local self-government institutions."
  }
];

function TeamMemberCard({ member, i }: { member: typeof TEAM[0], i: number, key?: React.Key }) {
  const [showBio, setShowBio] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Apply 3D tilt with image parallax
  use3DTilt(cardRef, '.icon-parallax');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.2 }}
      className="interactive-card p-6 md:p-8 rounded-3xl border border-border/40 flex flex-col gap-6 bg-card/60 backdrop-blur-xl group hover:border-primary/40 duration-300 relative overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
        {/* Profile Image Container (acts as parallax element) */}
        <div className="w-full md:w-48 shrink-0 relative group/img icon-parallax">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg group-hover/img:bg-primary/30 transition-colors duration-300 pointer-events-none" />
          <div className="relative aspect-square md:aspect-[3/4] w-full rounded-2xl overflow-hidden border border-primary/20 shadow-md">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Short info content */}
        <div className="flex-1 space-y-5 w-full">
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
              {member.name}
            </h3>
            <p className="text-sm font-mono font-bold text-primary tracking-wide uppercase mt-1">
              {member.role}
            </p>
          </div>

          {/* Glowing quote box */}
          <div className="relative bg-secondary/5 border-l-2 border-primary/60 p-4 rounded-r-xl font-body italic text-sm text-foreground/80 leading-relaxed">
            <Quote size={12} className="absolute top-2 right-2 text-primary/30 rotate-180" />
            <p className="pr-4">"{member.quote}"</p>
          </div>

          {/* Highlights bullet points grid */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Background & Expertise
            </h4>
            <ul className="space-y-2">
              {member.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed font-body">
                  <span className="mt-0.5 flex-shrink-0 text-primary">
                    {idx === 0 && <Compass size={14} />}
                    {idx === 1 && <Award size={14} />}
                    {idx === 2 && <GraduationCap size={14} />}
                  </span>
                  <span>
                    <strong className="text-foreground">{bullet.label}:</strong> {bullet.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle Biography Button */}
          <div>
            <button
              onClick={() => setShowBio(!showBio)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:text-primary/80 transition-colors py-1 cursor-pointer group/btn"
            >
              {showBio ? 'COLLAPSE BIOGRAPHY' : 'READ FULL BIOGRAPHY'}
              {showBio ? (
                <ChevronUp size={14} className="group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              ) : (
                <ChevronDown size={14} className="group-hover/btn:translate-y-0.5 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable biography drawer */}
      <AnimatePresence initial={false}>
        {showBio && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/40 mt-2 pt-6 relative z-10"
          >
            <div className="bg-secondary/5 rounded-2xl p-6 border border-secondary/10">
              <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-3">
                Professional Biography
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-body whitespace-pre-line">
                {member.bio}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function MeetOurTeam() {
  return (
    <section id="team" className="py-24 md:py-32 scroll-mt-24 bg-transparent relative overflow-hidden">
      {/* Top layout boundary line */}
      <DrawingLine className="absolute top-0 inset-x-0" />

      {/* Decorative gradient blur background */}
      <div className="absolute left-0 bottom-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 text-center md:text-left md:w-2/3">
          <LineReveal 
            text="Meet Our Team" 
            as="h2"
            className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6"
          />
          <p className="text-xl text-muted-foreground font-body">
            Dedicated professionals working to bridge the digital divide and democratize AI learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {TEAM.map((member, i) => (
            <TeamMemberCard key={i} member={member} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
