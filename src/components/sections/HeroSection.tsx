import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { SplineSceneBasic } from '@/components/ui/SplineSceneBasic';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/spotlight-card';

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
  const [isGlowing, setIsGlowing] = useState(false);

  const handleViewWork = () => {
    // Trigger glow animation
    setIsGlowing(true);

    // Reset glow after animation
    setTimeout(() => setIsGlowing(false), 1500);

    // Smooth scroll to projects section
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Glow flash effect */}
      {isGlowing && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3, 0] }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 bg-primary/20 pointer-events-none z-40"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 pointer-events-none z-40"
          />
        </>
      )}

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <GlowCard className={cn('space-y-6 reveal-up bg-transparent p-6', contentRevealed && 'revealed')} glowColor="blue" size="lg" customSize={true} width="100%">
            <div ref={contentRef} className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-body text-muted-foreground">Available for opportunities</span>
            </div>

              {/* Main content */}
              <div className="space-y-2">
                <p className="font-display text-primary text-lg font-medium">{tagline}</p>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                  Hi, I'm {name}
                </h1>
                <h2 className="font-display text-3xl sm:text-4xl text-muted-foreground font-medium">
                  {role}
                </h2>
              </div>

              <div className="mt-3 max-w-2xl">
                <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
              <motion.div
                animate={isGlowing ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5 }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="group relative overflow-hidden"
                  onClick={handleViewWork}
                >
                  {isGlowing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                  <span className="relative">View My Work</span>
                  <motion.div
                    animate={isGlowing ? { x: [0, 6, 0] } : {}}
                    transition={{ duration: 1.5 }}
                    className="relative"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </Button>
              </motion.div>
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
          </GlowCard>

          {/* Interactive 3D Orb */}
          <div
            ref={visualRef}
            className={cn(
              'relative aspect-square max-w-lg mx-auto lg:mx-0 reveal-scale',
              visualRevealed && 'revealed'
            )}
          >
            <SplineSceneBasic />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
