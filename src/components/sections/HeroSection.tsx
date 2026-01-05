import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import InteractiveOrb from '@/components/ui/InteractiveOrb';

interface HeroSectionProps {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  role,
  tagline,
  summary,
  social,
}) => {
  const { ref: contentRef, isRevealed: contentRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: visualRef, isRevealed: visualRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div
            ref={contentRef}
            className={cn(
              'space-y-8 reveal-up',
              contentRevealed && 'revealed'
            )}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-body text-muted-foreground">Available for opportunities</span>
            </div>

            {/* Main content */}
            <div className="space-y-4">
              <p className="font-display text-primary text-lg font-medium">{tagline}</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, i'm Fayez
              </h1>
              <h2 className="font-display text-2xl sm:text-3xl text-muted-foreground font-light">
                {role}
              </h2>
            </div>

            <p className="font-body text-lg text-muted-foreground max-w-xl leading-relaxed">
              {summary}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="group">
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Social links */}
            {social && (
              <div className="flex items-center gap-4 pt-4">
                <span className="text-sm text-muted-foreground font-body">Connect:</span>
                <div className="flex gap-2">
                  {social.github && (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-3 rounded-xl hover:bg-primary/10 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-3 rounded-xl hover:bg-primary/10 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-3 rounded-xl hover:bg-primary/10 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Interactive 3D Orb */}
          <div
            ref={visualRef}
            className={cn(
              'relative aspect-square max-w-lg mx-auto lg:mx-0 reveal-scale',
              visualRevealed && 'revealed'
            )}
          >
            <InteractiveOrb />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
