import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

interface FooterProps {
  name: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ name, social }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className={cn(
        'py-12 border-t border-border/30 reveal-up',
        isRevealed && 'revealed'
      )}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
              <span className="font-display text-lg font-bold text-primary">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="font-display font-semibold text-lg">{name}</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-body flex items-center gap-1">
            © {currentYear} {name}. Made with{' '}
            <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />{' '}
            All rights reserved.
          </p>

          {/* Social Links */}
          {social && (
            <div className="flex items-center gap-3">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-2.5 rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-2.5 rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-2.5 rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
