import React, { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import type { ExperienceItem } from '@/data/portfolio';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { getDelay } = useStaggeredReveal(experiences.length, 150);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  return (
    <section id="experience" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-16 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Career Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-body text-lg md:text-xl">
            Transforming curiosity into intelligent solutions while continuously innovating in the world of AI and data-driven technologies.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line (base) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />

          {/* Progress indicator - light blue that grows with scroll */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 md:left-1/2 top-0 w-1 bg-blue-400 origin-top md:-translate-x-1/2"
          />

          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              delay={getDelay(index)}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  delay: number;
  isLeft: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, delay, isLeft }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        'relative mb-8 md:mb-12 pl-6 md:pl-0',
        isLeft ? 'md:pr-[calc(50%+1.5rem)]' : 'md:pl-[calc(50%+1.5rem)]'
      )}
    >
      {/* Timeline dot */}
      <div
        className={cn(
          'absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transition-all duration-500 md:-translate-x-1/2',
          isRevealed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
        style={{ transitionDelay: `${delay}ms`, top: '2rem' }}
      />

      {/* Glow background */}
      <motion.div
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 -z-10 rounded-2xl bg-blue-500/20 blur-2xl pointer-events-none"
      />

      {/* Card */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={isHovered ? { y: -12 } : { y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          'glass-elevated rounded-2xl p-4 md:p-6 reveal-up transition-all duration-400',
          isRevealed && 'revealed'
        )}
        style={{ transitionDelay: `${delay + 100}ms`, maxWidth: '100%' }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
              <h3 className="font-display text-lg font-semibold mb-1">{experience.title}</h3>
              <p className="text-primary font-medium text-sm">{experience.company}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <Calendar className="w-4 h-4" />
            <span>{experience.period}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-body">
          <MapPin className="w-4 h-4" />
          <span>{experience.location}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-3 text-sm font-body">{experience.description}</p>

        {/* Highlights - show only top 3 for brevity */}
        {experience.highlights && experience.highlights.length > 0 && (
          <ul className="space-y-2 mb-3">
            {experience.highlights.slice(0, 3).map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full font-body"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ExperienceSection;
