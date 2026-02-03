import React, { useState } from 'react';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star } from 'lucide-react';
import type { ProjectItem } from '@/data/portfolio';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { getDelay } = useStaggeredReveal(projects.length, 100);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-20 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-xs font-bold tracking-widest uppercase mb-6 px-4 py-2 bg-primary/10 rounded-full">
            ✨ Featured Work
          </span>
          <h2 className="font-display text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-body text-lg md:text-xl leading-relaxed">
            Showcasing AI/ML solutions that solve real-world problems
          </p>
        </div>

        {/* All Projects in 2-column grid */}
        {projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={getDelay(index)}
                featured={project.featured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  delay: number;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay, featured }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -12 : 0,
        transition: { duration: 0.3 },
      }}
      className={cn(
        'glass-elevated rounded-2xl overflow-hidden group reveal-up hover:glow-subtle transition-all duration-500 relative border border-primary/20',
        isRevealed && 'revealed'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Hover glow background */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl -z-10"
        />
      )}

      {/* Project Image Placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-primary/15 to-cyan-500/15 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center border border-primary/30 shadow-2xl">
            <span className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>
        
        {/* Featured badge */}
        {featured && (
          <motion.div
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-bold text-primary bg-primary/20 border border-primary/50 shadow-lg"
          >
            <Star className="w-4 h-4 fill-primary" />
            <span>Featured</span>
          </motion.div>
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
        >
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-xl hover:bg-primary/30 transition-colors border border-primary/30 shadow-xl"
              aria-label="View on GitHub"
            >
              <Github className="w-6 h-6" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-xl hover:bg-primary/30 transition-colors border border-primary/30 shadow-xl"
              aria-label="View live demo"
            >
              <ExternalLink className="w-6 h-6" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-4">
        <motion.h3
          animate={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
          transition={{ duration: 0.3 }}
          className="font-display text-2xl font-bold"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-muted-foreground text-base font-body line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <motion.div
          animate={{
            gap: isHovered ? '0.75rem' : '0.5rem',
          }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap pt-2"
        >
          {project.technologies.map((tech, idx) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-primary/20 to-cyan-500/20 text-primary rounded-lg font-body border border-primary/40 shadow-md"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="flex gap-3 pt-4">
          {project.githubUrl && (
            <Button variant="glass" size="sm" asChild className="font-bold">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="glass-primary" size="sm" asChild className="font-bold">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
