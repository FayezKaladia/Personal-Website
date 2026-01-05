import React from 'react';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import type { EducationItem } from '@/data/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { getDelay } = useStaggeredReveal(education.length, 150);

  return (
    <section id="education" className="py-24 relative">
      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-16 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Academic Background
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Foundation in AI/ML through rigorous academic training
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <EducationCard
              key={edu.id}
              education={edu}
              delay={getDelay(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface EducationCardProps {
  education: EducationItem;
  delay: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ education, delay }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'glass-elevated rounded-2xl p-6 md:p-8 reveal-up group hover:glow-subtle transition-all duration-500',
        isRevealed && 'revealed'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <GraduationCap className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Degree */}
        <h3 className="font-display text-xl font-semibold leading-tight">
          {education.degree}
        </h3>

        {/* Institution */}
        <p className="text-primary font-medium">{education.institution}</p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{education.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{education.location}</span>
          </div>
        </div>

        {/* Grade if available */}
        {education.grade && (
          <div className="flex items-center gap-2 text-sm font-body">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">{education.grade}</span>
          </div>
        )}

        {/* Description */}
        {education.description && (
          <p className="text-muted-foreground font-body text-sm">
            {education.description}
          </p>
        )}

        {/* Highlights */}
        {education.highlights && education.highlights.length > 0 && (
          <ul className="space-y-2 pt-2">
            {education.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
