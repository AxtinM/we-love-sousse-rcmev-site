'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  ChartBarIcon, 
  PlayCircleIcon, 
  UsersIcon, 
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

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
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/project-activities/activite-atdef.jpg"
          alt="We Love Sousse Project Activities"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-teal-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Animated Background Particles - Only render on client */}
      {mounted && particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-300/30 to-blue-300/30 rounded-full blur-sm"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                x: [particle.x, particle.x + 200, particle.x - 100],
                y: [particle.y, particle.y - 150, particle.y + 100],
                opacity: [0.1, 0.4, 0.1],
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

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
            >
              <Image
                src="/images/logo-WeLoveSousse.png"
                alt="We Love Sousse - Logo du projet"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 rounded-full blur-2xl scale-110" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 sm:mb-8 lg:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-poppins font-semibold mb-3 sm:mb-4 lg:mb-5 text-blue-100 tracking-wide">
            Projet RCMEV
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-poppins font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 leading-tight">
            Réponse Coordonnée à la Montée de l'Extrémisme Violent
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-inter text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Plus d&apos;une décennie d&apos;engagement pour renforcer la résilience des jeunes et des femmes 
            en Tunisie à travers la promotion du dialogue, de la tolérance et de l&apos;inclusion sociale.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-inter text-blue-200 font-medium">
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-colors hover:bg-white/15">Supervisé par CNLCT</span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-colors hover:bg-white/15">Financé par GCERF</span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-colors hover:bg-white/15">Depuis 2011</span>
          </div>
        </motion.div>

        {/* Animated Call-to-Action - Enhanced with icons and better design */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center items-center relative z-20 mb-6 sm:mb-8"
        >
          {/* Primary CTA - Impact Stats */}
          <motion.button
            onClick={() => scrollToSection('statistics')}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white px-7 sm:px-8 py-4 sm:py-4.5 rounded-2xl font-poppins font-semibold text-base shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-cyan-400/30 w-full sm:w-auto"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative flex items-center justify-center gap-2.5">
              <ChartBarIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Découvrir Notre Impact</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/0 group-hover:bg-cyan-400/20 blur-xl transition-all duration-300" />
          </motion.button>
          
          {/* Secondary CTA - Videos */}
          <motion.button
            onClick={() => scrollToSection('videos')}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-600 to-green-600 text-white px-7 sm:px-8 py-4 sm:py-4.5 rounded-2xl font-poppins font-semibold text-base shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-emerald-400/30 w-full sm:w-auto"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative flex items-center justify-center gap-2.5">
              <PlayCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Voir Nos Vidéos</span>
              <SparklesIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-emerald-400/0 group-hover:bg-emerald-400/20 blur-xl transition-all duration-300" />
          </motion.button>
        </motion.div>

        {/* Secondary Actions - Enhanced with better styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center relative z-20"
        >
          <motion.button
            onClick={() => scrollToSection('partners')}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative border-2 border-white/30 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-poppins font-medium text-sm hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <UsersIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Nos Partenaires</span>
            </span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-white/10 backdrop-blur-md border-2 border-emerald-400/40 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-poppins font-medium text-sm hover:bg-emerald-500/20 hover:border-emerald-400/60 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <EnvelopeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Nous Contacter</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 sm:mt-8 lg:mt-10"
        >
          <div className="flex flex-col items-center space-y-1 sm:space-y-2">
            <span className="text-xs font-inter text-slate-400 font-light tracking-wide">Faites défiler pour explorer</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 sm:w-4 h-5 sm:h-6 border-2 border-slate-300/60 rounded-full flex justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-1.5 sm:h-2 bg-gradient-to-b from-cyan-300 to-blue-400 rounded-full mt-1"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements - Smaller and more subtle */}
      <motion.div
        className="absolute top-12 lg:top-16 left-8 lg:left-12 w-12 lg:w-16 h-12 lg:h-16 border-2 border-cyan-300/30 rounded-full backdrop-blur-sm"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute bottom-12 lg:bottom-16 right-8 lg:right-12 w-10 lg:w-14 h-10 lg:h-14 border-2 border-emerald-300/30 rounded-full backdrop-blur-sm"
        animate={{ rotate: -360, scale: [1, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute top-1/2 left-4 lg:left-6 w-0.5 lg:w-1 h-12 lg:h-16 bg-gradient-to-b from-cyan-400/60 via-teal-400/40 to-emerald-400/60 rounded-full backdrop-blur-sm"
        animate={{ scaleY: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-1/4 right-4 lg:right-6 w-0.5 lg:w-1 h-10 lg:h-14 bg-gradient-to-t from-emerald-400/60 via-teal-400/40 to-cyan-400/60 rounded-full backdrop-blur-sm"
        animate={{ scaleY: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
