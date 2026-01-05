import React, { useState } from 'react';
import { defaultPortfolioData } from '@/data/portfolio';
import IntroSection from '@/components/sections/IntroSection';
import HeroSection from '@/components/sections/HeroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const data = defaultPortfolioData;

  const handleEnterPortfolio = () => {
    setShowIntro(false);
    // Scroll to top when entering
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{`${data.personal.name} | ${data.personal.role}`}</title>
      <meta name="description" content={data.personal.summary} />

      {/* Intro Section */}
      {showIntro && (
        <IntroSection
          name={data.personal.name}
          role={data.personal.role}
          onEnter={handleEnterPortfolio}
        />
      )}

      {/* Main Portfolio */}
      <div className={showIntro ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navigation />
        
        <main>
          <HeroSection
            name={data.personal.name}
            role={data.personal.role}
            tagline={data.personal.tagline}
            summary={data.personal.summary}
            social={data.social}
          />
          
          <ExperienceSection experiences={data.experience} />
          
          <EducationSection education={data.education} />
          
          <SkillsSection skills={data.skills} />
          
          <ProjectsSection projects={data.projects} />
          
          <AchievementsSection achievements={data.achievements} />
          
          <ContactSection
            email={data.personal.email}
            location={data.personal.location}
            social={data.social}
          />
        </main>

        <Footer name={data.personal.name} social={data.social} />
      </div>
    </>
  );
};

export default Index;
