import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Award } from 'lucide-react';
import type { EducationItem } from '@/data/portfolio';
import { Timeline } from '@/components/ui/timeline';

interface EducationSectionProps {
  education: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();

  // Transform education data into timeline format
  const timelineData = education.map((edu) => ({
    title: edu.period,
    content: (
      <div className="space-y-4">
        {/* Degree */}
        <h3 className="font-display text-lg md:text-xl font-semibold leading-tight">
          {edu.degree}
        </h3>

        {/* Institution */}
        <p className="text-primary font-medium">{edu.institution}</p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{edu.location}</span>
          </div>
        </div>

        {/* Grade if available */}
        {edu.grade && (
          <div className="flex items-center gap-2 text-sm font-body">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">{edu.grade}</span>
          </div>
        )}

        {/* Description */}
        {edu.description && (
          <p className="text-muted-foreground font-body text-sm">
            {edu.description}
          </p>
        )}

        {/* Highlights */}
        {edu.highlights && edu.highlights.length > 0 && (
          <ul className="space-y-2 pt-2">
            {edu.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  }));

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

        {/* Timeline Component */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default EducationSection;
