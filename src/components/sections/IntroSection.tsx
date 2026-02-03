import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShaderAnimation } from '@/components/ui/shader-lines';
import { Spotlight } from '@/components/ui/spotlight';

interface IntroSectionProps {
  name: string;
  role: string;
  onEnter: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ name, role, onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        <ShaderAnimation />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Morphing name */}
        <h1
          className={cn(
            'font-display text-6xl sm:text-8xl md:text-9xl font-extrabold mb-4 morph-text transition-all duration-1000 text-white',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{
            transitionDelay: '200ms',
            transform: `perspective(1000px) rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 8}deg) translateZ(0)`,
            textShadow: '0 6px 30px rgba(0,0,0,0.6)',
          }}
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
          <div className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-md">
            <p className="font-display text-lg sm:text-2xl md:text-3xl text-white font-light tracking-wide">
              Artificial Intelligence & Machine Learning Engineer
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div
          className={cn(
            'w-32 h-px mx-auto mt-12 mb-8 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000',
            isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          )}
          style={{ transitionDelay: '900ms' }}
        />

        {/* CTA Buttons */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 transition-all duration-1000',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '1200ms' }}
        >
          <Button
            variant="liquid"
            size="lg"
            onClick={handleEnter}
            className="group min-w-[180px] py-3 px-6"
          >
            <span>Discover My Journey</span>
            <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>

      {/* Spotlight to increase contrast when cursor is near text */}
      <Spotlight className="-translate-x-1/2 -translate-y-1/3 left-1/2 top-1/3" size={280} />
    </div>
  );
};

export default IntroSection;
