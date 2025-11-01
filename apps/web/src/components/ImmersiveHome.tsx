'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import ImmersiveHeroSection from '@/components/ImmersiveHeroSection';
import VideoSection from '@/components/VideoSection';
import PublicationsSection from '@/components/PublicationsSection';
import PressCoverageSection from '@/components/PressCoverageSection';
import ProductsSection from '@/components/ProductsSection';
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

      {/* Statistics Section - Projet en Chiffres */}
      <motion.section
        id="statistics"
        style={{ y: statsY }}
        className="min-h-screen relative bg-gradient-to-br from-teal-900 to-emerald-900 flex items-center justify-center py-20"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-6"
          >
            Projet en Chiffres
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-blue-200 mb-16 max-w-3xl mx-auto"
          >
            L&aposimpact mesurable de notre engagement pour la paix et le développement durable
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={5481} className="text-6xl font-bold text-yellow-400 mb-4" />
              <p className="text-xl text-blue-200">Bénéficiaires Directs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={1800} className="text-6xl font-bold text-cyan-400 mb-4" />
              <p className="text-xl text-blue-200">Participants aux Activités des Clubs de Paix</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={721} className="text-6xl font-bold text-pink-400 mb-4" />
              <p className="text-xl text-blue-200">Femmes Bénéficiaires</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={410} className="text-6xl font-bold text-orange-400 mb-4" />
              <p className="text-xl text-blue-200">Activités Réalisées</p>
            </motion.div>
          </div>

          {/* Project-Specific Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={169} className="text-4xl font-bold text-purple-400 mb-3" />
              <p className="text-base text-blue-200">Participants aux Conférences</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={48} className="text-4xl font-bold text-rose-400 mb-3" />
              <p className="text-base text-blue-200">Femmes Formées dans les Centres de Production</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={42} className="text-4xl font-bold text-amber-400 mb-3" />
              <p className="text-base text-blue-200">Réunions de Coordination</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={28} className="text-4xl font-bold text-lime-400 mb-3" />
              <p className="text-base text-blue-200">Activités des CLJ Réalisées</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={20} className="text-4xl font-bold text-sky-400 mb-3" />
              <p className="text-base text-blue-200">Conseils Locaux de Jeunes Créés</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={19} className="text-4xl font-bold text-green-400 mb-3" />
              <p className="text-base text-blue-200">Recherches Appliquées</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={10} className="text-4xl font-bold text-indigo-400 mb-3" />
              <p className="text-base text-blue-200">Clubs de Débat Mis en Place</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <AnimatedCounter end={2} className="text-4xl font-bold text-fuchsia-400 mb-3" />
              <p className="text-base text-blue-200">Compétitions Nationales de Débat</p>
            </motion.div>
          </div>

          {/* Organizational Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
              <div className="text-4xl font-bold text-blue-300 mb-2">6</div>
              <div className="text-sm text-blue-200">Régions Couvertes</div>
            </div>
            <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30">
              <div className="text-4xl font-bold text-teal-300 mb-2">4</div>
              <div className="text-sm text-teal-200">Partenaires Actifs</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
              <div className="text-4xl font-bold text-emerald-300 mb-2">10+</div>
              <div className="text-sm text-emerald-200">Années d'Expérience</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
              <div className="text-4xl font-bold text-orange-300 mb-2">100%</div>
              <div className="text-sm text-orange-200">Engagement</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project About Section */}
      <motion.section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 pt-9">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              À Propos du Projet RCMEV
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg text-gray-700"
              >
                <p className="text-xl leading-relaxed mb-6">
                  Le projet « Réponse coordonnée à la montée de l'extrémisme violent » (RCMEV) est mis en œuvre par l'association
                  <strong className="text-blue-600"> We Love Sousse</strong> sous la supervision de la
                  <strong className="text-teal-600"> Commission Nationale de Lutte Contre le Terrorisme (CNLCT)</strong> et financé par le
                  <strong className="text-emerald-600"> GCERF</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  Ce projet vise à renforcer la résilience des jeunes et des femmes dans plusieurs régions vulnérables de Tunisie
                  à travers la promotion du dialogue, de la tolérance et de l'inclusion sociale et économique.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/project-activities/conference-drapeau-tunisie.jpg"
                  alt="Projet RCMEV en action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Un Projet d'Envergure Nationale</h3>
                  <p className="text-blue-100">Couvrant 6 régions avec 4 partenaires actifs</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 lg:p-12"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Clubs de Débats et de Paix</h4>
                    <p className="text-gray-600">Espaces de dialogue constructif pour les jeunes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Conseils Locaux de Jeunes</h4>
                    <p className="text-gray-600">Formation en leadership et participation citoyenne</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Centres d'Écoute et de Production</h4>
                    <p className="text-gray-600">Autonomisation économique des femmes et jeunes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recherches Appliquées</h4>
                    <p className="text-gray-600">Collaboration avec les universités tunisiennes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* We Love Sousse About Section */}
      <motion.section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              We Love Sousse
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plus d'une décennie d'engagement pour la citoyenneté active, la solidarité et le développement local durable
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2011</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fondation</h3>
                <p className="text-gray-600">Création de l'association avec une vision de citoyenneté active et de solidarité</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">🌍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">International</h3>
                <p className="text-gray-600">Chef de file du Réseau tunisien de la Fondation Anna Lindh</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mission</h3>
                <p className="text-gray-600">Placer les jeunes et les femmes au cœur de l'action sociale</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed"
            >
              <p className="text-xl mb-6">
                Depuis plus d'une décennie, WLS développe et met en œuvre des projets dans les domaines de la
                <strong className="text-emerald-600"> culture, de l'éducation, de l'inclusion sociale</strong>, de la prévention de l'extrémisme violent,
                de la promotion du dialogue interculturel et du développement durable.
              </p>

              <p className="text-lg">
                Forte d'une équipe dynamique, de bénévoles engagés et d'un large réseau de partenaires locaux et internationaux,
                We Love Sousse œuvre chaque jour à renforcer la cohésion sociale, à stimuler l'engagement civique des jeunes
                et à faire de Sousse – et de la Tunisie – un espace d'innovation citoyenne, de solidarité et de paix.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Unified Media Section */}
      <motion.section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Média
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre travail à travers nos vidéos, formations, centres de production, conférences et activités de terrain à travers la Tunisie
            </p>
          </motion.div>

          {/* Video Subsection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
            id="videos"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
              Nos Vidéos
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 text-center">
              Découvrez notre travail à travers nos conférences, formations et concours d'innovation sociale
            </p>
            <VideoSection />
          </motion.div>

          {/* Visual Divider */}
          <div className="relative h-24 mb-20 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            </div>
            <div className="relative bg-gradient-to-r from-blue-900 to-teal-900 px-8 py-3 rounded-full border border-emerald-400/30">
              <span className="text-emerald-300 font-medium text-lg">En Images</span>
            </div>
          </div>

          {/* Photo Gallery Subsection */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Nos Activités en Images
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Des moments capturés sur le terrain, témoignant de notre engagement quotidien
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/20 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/project-activities/formation clj.jpg"
                    alt="Formation des Conseils Locaux de Jeunes"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Formation CLJ</h3>
                  <p className="text-gray-300">Formation des conseils locaux de jeunes et renforcement de leurs capacités en leadership</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/20 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/project-activities/Centre de production.jpg"
                    alt="Centre de Production Artisanale"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Centres de Production</h3>
                  <p className="text-gray-300">Centres de production artisanale pour l'autonomisation économique des femmes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/20 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/project-activities/conference-attigue.jpg"
                    alt="Conférence sur la Prévention"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Conférences</h3>
                  <p className="text-gray-300">Conférences et panels sur la prévention de l'extrémisme violent</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/20 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/project-activities/comp-de-debat.jpg"
                    alt="Compétition de Débat"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Compétitions de Débat</h3>
                  <p className="text-gray-300">Concours de débat pour promouvoir le dialogue constructif entre les jeunes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/20 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/project-activities/centre de production kef.jpg"
                    alt="Centre de Production Kef"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Production Artisanale</h3>
                  <p className="text-gray-300">Produits artisanaux créés dans nos centres de production régionaux</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/20 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/project-activities/tot-debat.jpg"
                    alt="Formation des Formateurs"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Formation des Formateurs</h3>
                  <p className="text-gray-300">Sessions de formation pour développer les capacités des animateurs locaux</p>
                </div>
              </motion.div>
            </div>

            {/* Additional activities in a smaller grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-white/20"
              >
                <Image
                  src="/images/project-activities/activite-atdef.jpg"
                  alt="Activité ATDEF"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-lg">
                  Activités ATDEF
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-white/20"
              >
                <Image
                  src="/images/project-activities/CP FJCC.jpg"
                  alt="Centre de Production FJCC"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-lg">
                  Centre FJCC
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-white/20"
              >
                <Image
                  src="/images/project-activities/Centre de production gasserine.jpg"
                  alt="Centre de Production Kasserine"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-lg">
                  Centre Kasserine
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-white/20"
              >
                <Image
                  src="/images/project-activities/conference-drapeau-tunisie.jpg"
                  alt="Conférence avec Drapeau Tunisien"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-lg">
                  Événements Nationaux
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Press Coverage Section */}
      <PressCoverageSection />

      {/* Visual Divider */}
      <div className="relative h-24 bg-gradient-to-b from-slate-50 to-slate-50 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
        </div>
        <div className="relative bg-white px-8 py-3 rounded-full border border-emerald-400/30 shadow-md">
          <span className="text-emerald-700 font-medium text-lg">Nos Publications</span>
        </div>
      </div>

      {/* Publications Section */}
      <PublicationsSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Transition Section - Responsive */}
      <div className="h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-emerald-50/30 to-slate-900"></div>

      {/* Partners Section */}
      <motion.section
        id="partners"
        className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 py-16 sm:py-20"
      >
        <PartnersShowcase />
      </motion.section>

      {/* Transition Section - Responsive */}
      <div className="h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-teal-900 to-emerald-900"></div>

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
