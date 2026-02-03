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

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-16 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Featured Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Showcasing AI/ML solutions that solve real-world problems
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={getDelay(index)}
                featured
              />
            ))}
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={getDelay(featuredProjects.length + index)}
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
        y: isHovered ? -8 : 0,
        transition: { duration: 0.3 },
      }}
      className={cn(
        'glass-elevated rounded-2xl overflow-hidden group reveal-up hover:glow-subtle transition-all duration-500 relative',
        featured && 'md:col-span-1',
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
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-2xl -z-10"
        />
      )}

      {/* Project Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-glow-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-primary">
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>
        
        {/* Featured badge */}
        {featured && (
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex items-center gap-1 glass px-3 py-1 rounded-full text-xs font-medium text-primary"
          >
            <Star className="w-3 h-3 fill-primary" />
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <motion.h3
          animate={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
          transition={{ duration: 0.3 }}
          className="font-display text-xl font-semibold"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-muted-foreground text-sm font-body line-clamp-2">
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
              className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-lg font-body font-medium border border-primary/30"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="flex gap-2 pt-2">
          {project.githubUrl && (
            <Button variant="glass" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="glass-primary" size="sm" asChild>
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
