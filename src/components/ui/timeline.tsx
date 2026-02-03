"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { MapPin, Award } from 'lucide-react';
import type { EducationItem } from '@/data/portfolio';
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Track which item is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('[data-timeline-item]');
      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-transparent dark:bg-transparent font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            data-timeline-item
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background dark:bg-background flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: activeIndex === index ? 1.6 : 1,
                    boxShadow:
                      activeIndex === index
                        ? '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4)'
                        : '0 0 0px rgba(34, 197, 94, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-green-300 p-2"
                />
              </div>
              <motion.h3
                animate={{
                  scale: activeIndex === index ? 1.15 : 1,
                  color: activeIndex === index ? '#22c55e' : '#a1a1a1',
                }}
                transition={{ duration: 0.3 }}
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-muted-foreground dark:text-muted-foreground"
              >
                {item.title}
              </motion.h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <motion.h3
                animate={{
                  scale: activeIndex === index ? 1.1 : 1,
                  color: activeIndex === index ? '#22c55e' : '#a1a1a1',
                }}
                transition={{ duration: 0.3 }}
                className="md:hidden block text-2xl mb-4 text-left font-bold text-muted-foreground dark:text-muted-foreground"
              >
                {item.title}
              </motion.h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-green-500/40 dark:via-green-500/40 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-green-400 via-green-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
