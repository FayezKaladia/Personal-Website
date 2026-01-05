import React from 'react';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star } from 'lucide-react';
import type { ProjectItem } from '@/data/portfolio';

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

  return (
    <div
      ref={ref}
      className={cn(
        'glass-elevated rounded-2xl overflow-hidden group reveal-up hover:glow-subtle transition-all duration-500',
        featured && 'md:col-span-1',
        isRevealed && 'revealed'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Project Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-glow-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-primary">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 glass px-3 py-1 rounded-full text-xs font-medium text-primary">
            <Star className="w-3 h-3 fill-primary" />
            <span>Featured</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm font-body line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md font-body"
            >
              {tech}
            </span>
          ))}
        </div>

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
    </div>
  );
};

export default ProjectsSection;
