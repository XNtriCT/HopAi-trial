/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyWeExist } from './components/WhyWeExist';
import { WhatWeDo } from './components/WhatWeDo';
import { About } from './components/About';
import { Partnerships } from './components/Partnerships';
import { MeetOurTeam } from './components/MeetOurTeam';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScanLine } from './components/ScanLine';
import { WebGPUPipeline } from './components/WebGPUPipeline';
import { ScrollCanvas } from './components/ScrollCanvas';
import { MouseAura } from './components/MouseAura';
import { FooterModal } from './components/FooterModals';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();
  const [activeModal, setActiveModal] = useState<'objectives' | 'privacy' | 'terms' | null>(null);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-white">
      <ScanLine />
      <ScrollCanvas />
      <MouseAura />
      <WebGPUPipeline />
      <Navbar />
      
      <main className="relative z-10">
         <Hero />
         <WhyWeExist />
         <WhatWeDo />
         <About />
         <Partnerships />
         <MeetOurTeam />
         <Contact />
      </main>

      <Footer onOpenModal={setActiveModal} />
      <FooterModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
