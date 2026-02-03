import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Trophy, Calendar, ExternalLink, Award } from 'lucide-react';
import type { AchievementItem } from '@/data/portfolio';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { motion } from 'framer-motion';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();

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

        {/* Container Scroll Animation */}
        <ContainerScroll
          titleComponent={
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Recognized Achievements
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                12 Major Certifications and Awards
              </p>
            </div>
          }
        >
          {/* Achievements Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full overflow-y-auto p-4">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
};

interface AchievementCardProps {
  achievement: AchievementItem;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -12 : 0,
        transition: { duration: 0.3 },
      }}
      className="relative"
    >
      {/* Blue glow effect behind card */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-xl -z-10"
        />
      )}

      <div className="glass-elevated rounded-xl p-6 md:p-7 group hover:glow-subtle transition-all duration-500 flex flex-col h-full border border-transparent hover:border-blue-500/50">
        {/* Image Area */}
        <div className="w-full h-40 mb-5 bg-gradient-to-br from-primary/25 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <motion.div
              animate={{ scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Award className="w-12 h-12 text-primary mx-auto mb-2" />
            </motion.div>
            <p className="text-xs text-primary font-semibold">{achievement.date}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 flex-1">
          <h3 className="font-display text-base md:text-lg font-semibold leading-tight">
            {achievement.title}
          </h3>

          <p className="text-primary text-sm md:text-base font-medium">{achievement.issuer}</p>

          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground font-body">
            <Trophy className="w-4 h-4" />
            <span>{achievement.date}</span>
          </div>

          {achievement.description && (
            <p className="text-muted-foreground text-sm md:text-base font-body line-clamp-4">
              {achievement.description}
            </p>
          )}
        </div>

        {achievement.credentialUrl && (
          <a
            href={achievement.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline font-body"
          >
            <span>View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
