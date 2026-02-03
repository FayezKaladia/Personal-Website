import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel';

interface ContactSectionProps {
  email: string;
  location: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ email, location, social }) => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: contentRef, isRevealed: contentRevealed } = useScrollReveal<HTMLDivElement>();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    toast.success('Message sent successfully!', {
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={cn('text-center mb-16 reveal-up', titleRevealed && 'revealed')}
        >
          <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div
          ref={contentRef}
          className={cn(
            'grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto reveal-up',
            contentRevealed && 'revealed'
          )}
        >
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="glass-elevated rounded-2xl p-8 space-y-6">
              {/* Email */}
              <motion.a
                href={`mailto:${email}`}
                className="flex items-start gap-4 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Mail className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Email</p>
                  <p className="font-display font-medium group-hover:text-primary transition-colors">
                    {email}
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <MapPin className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Location</p>
                  <p className="font-display font-medium">{location}</p>
                </div>
              </motion.div>

              {/* Social Links */}
              {social && (
                <motion.div 
                  className="pt-4 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-muted-foreground font-body mb-4">Follow me on</p>
                  <div className="flex gap-3">
                    {social.github && (
                      <motion.a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
                        aria-label="GitHub"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {social.linkedin && (
                      <motion.a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
                        aria-label="LinkedIn"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {social.twitter && (
                      <motion.a
                        href={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass p-3 rounded-xl hover:bg-primary/20 transition-colors"
                        aria-label="Twitter"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="glass-elevated rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 font-body">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass rounded-xl border border-glass-border/50 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 font-body">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass rounded-xl border border-glass-border/50 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 font-body">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 glass rounded-xl border border-glass-border/50 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </Button>
            </form>
          </div>
        </div>

        {/* 3D Photo Carousel - Gallery Section */}
        <motion.div
          className="mt-20 pt-20 border-t border-border/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="inline-block font-body text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Visual Portfolio
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Project Gallery
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Explore my work through an interactive 3D carousel. Click on any image to view it in detail.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <ThreeDPhotoCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
