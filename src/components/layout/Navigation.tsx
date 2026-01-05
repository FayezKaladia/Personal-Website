import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Briefcase, GraduationCap, Code, Trophy, FolderKanban, Mail, Menu, X } from 'lucide-react';

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
        <div className="glass-elevated rounded-full px-2 py-2 flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                currentSection === item.id
                  ? 'text-primary tubelight'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
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
