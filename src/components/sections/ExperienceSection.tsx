import React from 'react';
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

  return (
    <section id="experience" className="py-24 relative">
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
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Building intelligent systems and pushing the boundaries of AI/ML technology
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />

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

  return (
    <div
      ref={ref}
      className={cn(
        'relative mb-12 md:mb-16 pl-8 md:pl-0',
        isLeft ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
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

      {/* Card */}
      <div
        className={cn(
          'glass-elevated rounded-2xl p-6 md:p-8 reveal-up transition-all duration-500',
          isRevealed && 'revealed'
        )}
        style={{ transitionDelay: `${delay + 100}ms` }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-xl font-semibold mb-1">{experience.title}</h3>
            <p className="text-primary font-medium">{experience.company}</p>
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
        <p className="text-muted-foreground mb-4 font-body">{experience.description}</p>

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <ul className="space-y-2 mb-4">
            {experience.highlights.map((highlight, i) => (
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
      </div>
    </div>
  );
};

export default ExperienceSection;
