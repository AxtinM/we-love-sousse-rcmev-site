'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ImmersiveHeroSection() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      duration: Math.random() * 20 + 15,
    }));
    
    setParticles(generatedParticles);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Particles - Only render on client */}
      {mounted && particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                x: [particle.x, particle.x + 200, particle.x - 100],
                y: [particle.y, particle.y - 150, particle.y + 100],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Background Gradients - Removed parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-600/10 to-pink-600/10" />

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #fff, #e0e7ff, #c7d2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            We Love Sousse
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-light mb-6">
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px #fbbf24',
                  '0 0 40px #fbbf24',
                  '0 0 20px #fbbf24',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-yellow-400 font-bold"
            >
              Réponse Coordonnée à la Montée de l'Extrémisme Violent
            </motion.span>
          </h2>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Un projet innovant pour renforcer la résilience des jeunes et des femmes en Tunisie,
            construisant ensemble un avenir plus sûr et plus inclusif.
          </p>
        </motion.div>

        {/* Animated Call-to-Action - Fixed clickable buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-20"
        >
          <motion.button
            onClick={() => scrollToSection('statistics')}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative z-30"
          >
            Découvrir Notre Impact
          </motion.button>
          
          <motion.button
            onClick={() => {
              // Scroll to the start of the video section (after hero + statistics)
              const heroHeight = window.innerHeight;
              const statsHeight = window.innerHeight;
              window.scrollTo({ 
                top: heroHeight + statsHeight, 
                behavior: 'smooth' 
              });
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative z-30"
          >
            Voir nos Vidéos
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('partners')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/50 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm cursor-pointer relative z-30"
          >
            Nos Partenaires
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative z-30"
          >
            Nous Contacter
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-400 font-medium">Faites défiler pour explorer</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gradient-to-b from-white to-gray-400 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements - Simpler animations */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 border border-white/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 border border-white/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute top-1/2 left-10 w-2 h-20 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
        animate={{ scaleY: [1, 1.5, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}
