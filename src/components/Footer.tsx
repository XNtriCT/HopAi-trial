import React from 'react';

interface FooterProps {
   onOpenModal: (type: 'objectives' | 'privacy' | 'terms') => void;
}

export function Footer({ onOpenModal }: FooterProps) {
   return (
      <footer className="bg-secondary/5 border-t border-border/60 backdrop-blur-md pt-20 pb-10 relative z-10 w-full overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
               <div className="lg:col-span-5">
                  <a href="#home" className="flex items-center gap-3 mb-6 group inline-flex">
                     <img
                        src="/HOP_AI_logo.svg"
                        alt="HOP AI Logo"
                        className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                     />
                     <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                        HOP AI Foundation
                     </span>
                  </a>
                  <p className="text-muted-foreground font-body leading-relaxed max-w-sm">
                     Empowering the Social Sector Through Artificial Intelligence, Digital Innovation, and Ethical Technology Adoption. Technology for Impact. AI for Good. Innovation for Everyone.
                  </p>
               </div>

               <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                     <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Company</h4>
                     <ul className="flex flex-col gap-4 text-muted-foreground">
                        <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                        <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                        <li><a href="#what-we-do" className="hover:text-primary transition-colors">What We Do</a></li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Resources</h4>
                     <ul className="flex flex-col gap-4 text-muted-foreground">
                        <li><a href="#partnerships" className="hover:text-primary transition-colors">Partnerships</a></li>
                        <li><button onClick={() => onOpenModal('objectives')} className="hover:text-primary transition-colors text-left">Objectives</button></li>
                        <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Legal</h4>
                     <ul className="flex flex-col gap-4 text-muted-foreground">
                        <li><button onClick={() => onOpenModal('privacy')} className="hover:text-primary transition-colors text-left">Privacy Policy</button></li>
                        <li><button onClick={() => onOpenModal('terms')} className="hover:text-primary transition-colors text-left">Terms of Service</button></li>
                     </ul>
                  </div>
               </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
               <p className="text-muted-foreground text-sm font-body text-center md:text-left text-balance">
                  © 2026 HOP AI Foundation. All rights reserved. | CIN: U85500KL2026NPL101861 | Registered under Section 8, Companies Act 2013
               </p>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
}
