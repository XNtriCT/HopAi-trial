import React from 'react';
import { ScrambleText } from './TextEffects/ScrambleText';
import { LineReveal } from './TextEffects/LineReveal';
import { Magnetic } from './Magnetic';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-transparent">
      {/* Media Layer (Handled by global background canvas) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50 z-20 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen text-center px-6 max-w-5xl mx-auto h-full pt-20">
        <div className="liquid-glass inline-block px-4 py-1.5 rounded-full border border-secondary/20 mb-6 shadow-sm bg-white/50">
           <ScrambleText text="AI Capacity Building · Digital Transformation · Ethical Technology" className="text-xs md:text-sm text-primary uppercase tracking-widest font-bold" />
        </div>

        <LineReveal 
          text="Bridging the Technology Gap for the Social Sector."
          as="h1"
          gradient
          className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl xl:text-6xl mb-6 leading-[1.1] tracking-tight select-none"
        />

        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance select-none">
          Empowering nonprofits and community institutions through practical, affordable, and ethical AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
           <Magnetic>
             <a 
                href="#what-we-do"
                className={cn(
                   "bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-lg transition-all hover:scale-105",
                   "flex items-center gap-2"
                )}
             >
                <span className="magnetic-text block">Explore Our Programs</span>
             </a>
           </Magnetic>
           <a 
              href="#about"
              className="liquid-glass px-8 py-4 rounded-full font-medium text-foreground transition-all hover:bg-black/5 flex items-center gap-2 group border border-border"
           >
              Learn About Us
              <span className="transition-transform group-hover:translate-x-1">→</span>
           </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce cursor-pointer flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <ChevronDown className="text-primary" size={24} />
      </div>
    </section>
  );
}
