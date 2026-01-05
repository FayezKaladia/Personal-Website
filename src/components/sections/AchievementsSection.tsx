import React from 'react';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Trophy, Calendar, ExternalLink } from 'lucide-react';
import type { AchievementItem } from '@/data/portfolio';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { getDelay } = useStaggeredReveal(achievements.length, 100);

  return (
    <section id="achievements" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-16 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Recognition
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Achievements & Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Milestones that validate expertise and dedication
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              delay={getDelay(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AchievementCardProps {
  achievement: AchievementItem;
  delay: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, delay }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'glass-elevated rounded-2xl p-6 reveal-up group hover:glow-subtle transition-all duration-500',
        isRevealed && 'revealed'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Trophy className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold leading-tight line-clamp-2">
          {achievement.title}
        </h3>
        
        <p className="text-primary text-sm font-medium">{achievement.issuer}</p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Calendar className="w-4 h-4" />
          <span>{achievement.date}</span>
        </div>

        {achievement.description && (
          <p className="text-muted-foreground text-sm font-body line-clamp-2">
            {achievement.description}
          </p>
        )}

        {achievement.credentialUrl && (
          <a
            href={achievement.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-body"
          >
            <span>View Credential</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;
