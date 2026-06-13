import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';

const LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'What We Do', href: '#what-we-do' },
  { name: 'About Us', href: '#about-us' },
  { name: 'Partnerships', href: '#partnerships' },
  { name: 'Meet Our Team', href: '#team' },
  { name: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scrollspy using absolute bounding rect offsets
      const sections = LINKS.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 250; // Offset allowance for header height

      // Highlight the last link if we've scrolled to the bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isBottom) {
        setActiveLink(LINKS[LINKS.length - 1].name);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPos) {
            setActiveLink(LINKS[i].name);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    setActiveLink(name);
    setMobileOpen(false);

    const target = document.querySelector(href);
    if (target) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target, {
          offset: -80,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-secondary/30 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 relative z-10 group" onClick={(e) => handleLinkClick(e, '#home', 'Home')}>
          <img
            src="/HOP_AI_logo.svg"
            alt="HOP AI Logo"
            className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground">
            HOP AI Foundation
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center relative liquid-glass rounded-full px-2 py-1">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.name)}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-5 py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="hoverNavIndicator"
                  className="absolute inset-0 bg-secondary/5 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {activeLink === link.name && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/25 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={cn(
                'relative z-10 transition-colors duration-300',
                activeLink === link.name ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
              )}>
                {link.name}
              </span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact', 'Contact')}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-sm shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300"
            >
              <span className="magnetic-text block">Get Involved</span>
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-10 p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-xl z-0 transition-opacity duration-300 md:hidden flex flex-col justify-center items-center gap-8",
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href, link.name)}
            className="text-2xl font-display font-bold text-foreground"
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, '#contact', 'Contact')}
          className="mt-4 inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-lg shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300"
        >
          Get Involved
        </a>
      </div>
    </nav>
  );
}
