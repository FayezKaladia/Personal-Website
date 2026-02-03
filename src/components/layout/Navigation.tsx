import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Briefcase, GraduationCap, Code, Trophy, FolderKanban, Mail, Menu, X } from 'lucide-react';
import CinematicThemeSwitcher from '@/components/ui/cinematic-theme-switcher';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, href: '#home' },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" />, href: '#experience' },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, href: '#education' },
  { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" />, href: '#skills' },
  { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" />, href: '#projects' },
  { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" />, href: '#achievements' },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" />, href: '#contact' },
];

interface NavigationProps {
  activeSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [isHoveredNav, setIsHoveredNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500',
          isScrolled ? 'top-4' : 'top-6'
        )}
      >
        <div
          onMouseEnter={() => setIsHoveredNav(true)}
          onMouseLeave={() => setIsHoveredNav(false)}
          className={cn(
            'glass-elevated rounded-full flex items-center gap-2 transition-all duration-300 transform',
            isScrolled && !isHoveredNav ? 'px-1 py-0.5 scale-50' : 'px-3 py-2 scale-100'
          )}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative rounded-full font-semibold transition-all duration-200',
                isScrolled && !isHoveredNav
                  ? 'px-3 py-1 text-sm md:text-base'
                  : 'px-4 py-2 text-base md:text-lg',
                currentSection === item.id
                  ? 'text-primary tubelight before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-6 before:h-1 before:rounded-full before:bg-primary/80'
                  : 'text-muted-foreground hover:text-foreground hover:scale-105'
              )}
            >
              <span className="inline-flex items-center gap-2">
                <span className="hidden md:inline-flex">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </motion.button>
          ))}

          {/* Theme Switcher */}
          <div className="h-8 w-px bg-border/50 mx-1" />
          <div className="px-2">
            <CinematicThemeSwitcher />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          'fixed top-4 right-4 z-50 md:hidden glass-elevated p-3 rounded-full transition-all duration-300',
          isMobileMenuOpen && 'bg-primary/20'
        )}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-foreground" />
        ) : (
          <Menu className="w-5 h-5 text-foreground" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-500',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute inset-x-4 top-20 glass-elevated rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <CinematicThemeSwitcher />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300',
                  currentSection === item.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
