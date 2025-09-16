'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import ImmersiveHeroSection from '@/components/ImmersiveHeroSection';
import ImmersiveVideoSection from '@/components/ImmersiveVideoSection';
import ArticlesSection from '@/components/ArticlesSection';
import PartnersShowcase from '@/components/PartnersShowcase';
import ContactSection from '@/components/ContactSection';

export default function ImmersiveHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Transform values for different sections
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const statsY = useTransform(scrollYProgress, [0.15, 0.5], [100, -100]);

  return (
    <div ref={containerRef} className="relative">
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY }}
        className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      >
        <ImmersiveHeroSection />
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        id="statistics"
        style={{ y: statsY }}
        className="h-screen relative bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-16"
          >
            Notre Impact
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <AnimatedCounter end={5481} className="text-6xl font-bold text-yellow-400 mb-4" />
              <p className="text-xl text-blue-200">Bénéficiaires Directs</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <AnimatedCounter end={19} className="text-6xl font-bold text-green-400 mb-4" />
              <p className="text-xl text-blue-200">Recherches Appliquées</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <AnimatedCounter end={721} className="text-6xl font-bold text-pink-400 mb-4" />
              <p className="text-xl text-blue-200">Femmes Touchées</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <AnimatedCounter end={410} className="text-6xl font-bold text-orange-400 mb-4" />
              <p className="text-xl text-blue-200">Activités Réalisées</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Immersive Video Section */}
      <ImmersiveVideoSection />

      {/* Articles Section */}
      <ArticlesSection />

      {/* Partners Section */}
      <motion.section
        id="partners"
        className="h-screen relative bg-gradient-to-br from-slate-900 to-indigo-900"
      >
        <PartnersShowcase />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="relative"
      >
        <ContactSection />
      </motion.section>
    </div>
  );
}