import React from 'react';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import type { SkillCategory } from '@/data/portfolio';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { getDelay } = useStaggeredReveal(skills.length, 100);

  return (
    <section id="skills" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-16 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Technical Arsenal
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            A comprehensive toolkit for building intelligent systems
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skills.map((category, index) => (
            <SkillCategoryCard
              key={category.name}
              category={category}
              delay={getDelay(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillCategoryCardProps {
  category: SkillCategory;
  delay: number;
}

const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category, delay }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'glass-elevated rounded-2xl p-6 md:p-8 reveal-up',
        isRevealed && 'revealed'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Category name */}
      <h3 className="font-display text-lg font-semibold mb-6 text-primary">
        {category.name}
      </h3>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 glass rounded-full text-sm font-body font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
