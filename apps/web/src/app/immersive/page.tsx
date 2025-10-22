'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import ImmersiveHeroSection from '@/components/ImmersiveHeroSection';

export default function ImmersivePage() {
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY }}
        className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900"
      >
        <ImmersiveHeroSection />
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        style={{ y: statsY }}
        className="h-screen relative bg-gradient-to-br from-teal-900 to-emerald-900 flex items-center justify-center"
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

      {/* Video Playlist Section */}
      <motion.section
        className="h-screen relative bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-16"
          >
            Nos Vidéos
          </motion.h2>
          <p className="text-xl text-gray-300 mb-8">
            Découvrez nos conférences, formations et concours d'innovation sociale
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold"
          >
            Voir toutes les vidéos
          </motion.button>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        className="h-screen relative bg-gradient-to-br from-slate-900 to-teal-900 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-16"
          >
            Nos Partenaires
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {['ACTED', 'ADO', 'ATEDEF', 'CNLCT', 'FJCC', 'GCERF'].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-32 flex items-center justify-center border border-white/20"
              >
                <span className="text-2xl font-bold text-white">{partner}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
