import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { MapPin, Award } from 'lucide-react';
import type { EducationItem } from '@/data/portfolio';
import { GridBackground } from '@/components/ui/glowing-card';
import { Timeline } from '@/components/ui/timeline';

interface EducationSectionProps {
  education: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { getDelay } = useStaggeredReveal(education.length, 150);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  return (
    <section id="education" className="py-24 relative">
      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-20 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-semibold tracking-widest uppercase mb-6">
            Academic Background
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Education
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-body text-lg md:text-xl">
            Foundation in AI/ML through rigorous academic training
          </p>
        </div>

        {/* Interactive Timeline (sidebar with dates + progress) */}
        <div className="max-w-5xl mx-auto">
          {/** Map education entries to timeline data with requested date labels **/}
          {(() => {
            const dateLabels = [
              '2025 - 2028',
              '2023 - 2025',
              '2021 - 2023',
              '2021 onwards',
            ];

            const timelineData = education.map((edu, idx) => ({
              title: dateLabels[idx] ?? edu.period,
              content: (
                <div className="pb-8">
                  <GridBackground title={edu.degree} description={edu.institution} className="h-full">
                    <div className="space-y-4 text-left mt-4">
                      <div className="flex items-center gap-3 text-base md:text-lg text-muted-foreground font-body">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{edu.location}</span>
                      </div>

                      {edu.grade && (
                        <div className="flex items-center gap-3 text-base md:text-lg font-body">
                          <Award className="w-5 h-5 text-primary" />
                          <span className="text-primary font-semibold">{edu.grade}</span>
                        </div>
                      )}

                      {edu.description && (
                        <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
                          {edu.description}
                        </p>
                      )}

                      {edu.highlights && edu.highlights.length > 0 && (
                        <ul className="space-y-3 pt-3">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm md:text-base font-body">
                              <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </GridBackground>
                </div>
              ),
            }));

            return <Timeline data={timelineData} />;
          })()}
        </div>
      </div>
    </section>
  );
};

interface EducationCardProps {
  education: EducationItem;
  index: number;
  delay: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ education, delay }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isRevealed ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-lg bg-blue-500/20 blur-2xl -z-10"
        />
      )}

      {/* Card Container with GridBackground */}
      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <GridBackground
          title={education.degree}
          description={education.institution}
          className="h-full"
        >
          <div className="space-y-4 text-left mt-4">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{education.location}</span>
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
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {education.description}
              </p>
            )}

            {/* Highlights */}
            {education.highlights && education.highlights.length > 0 && (
              <ul className="space-y-2 pt-2">
                {education.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </GridBackground>
      </motion.div>
    </motion.div>
  );
};

export default EducationSection;
