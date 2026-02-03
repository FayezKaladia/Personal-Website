import React from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

const ScrollExpandSection: React.FC = () => {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
      title="Dynamic Image Showcase"
      date="Underwater Adventure"
      scrollToExpand="Scroll to Expand Demo"
      textBlend
    >
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
          About This Component
        </h2>
        <p className='text-lg mb-8 text-black dark:text-white'>
          This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.
        </p>
        <p className='text-lg mb-8 text-black dark:text-white'>
          The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.
        </p>
      </div>
    </ScrollExpandMedia>
  );
};

export default ScrollExpandSection;
