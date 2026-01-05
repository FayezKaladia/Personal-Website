import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntroSectionProps {
  name: string;
  role: string;
  onEnter: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ name, role, onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 800);
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-800',
        isExiting && 'opacity-0 scale-105'
      )}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Morphing name */}
        <h1
          className={cn(
            'font-display text-5xl sm:text-7xl md:text-8xl font-bold mb-4 morph-text transition-all duration-1000',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          {name}
        </h1>

        {/* Role with typewriter effect */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-1000',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light tracking-wide">
            {role}
          </p>
        </div>

        {/* Decorative line */}
        <div
          className={cn(
            'w-24 h-px mx-auto my-10 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000',
            isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          )}
          style={{ transitionDelay: '900ms' }}
        />

        {/* CTA Buttons */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '1200ms' }}
        >
          <Button
            variant="liquid"
            size="xl"
            onClick={handleEnter}
            className="group min-w-[200px]"
          >
            <span>Enter Portfolio</span>
            <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          'absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000',
          isLoaded ? 'opacity-60' : 'opacity-0'
        )}
        style={{ transitionDelay: '1800ms' }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-body tracking-widest uppercase">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
