'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, UserGroupIcon, AcademicCapIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function ProjetPage() {
  const stats = [
    { number: '5481', label: 'Bénéficiaires Directs', icon: UserGroupIcon },
    { number: '410', label: 'Activités Réalisées', icon: AcademicCapIcon },
    { number: '6', label: 'Régions Couvertes', icon: HeartIcon },
  ];

  const activities = [
    {
      title: 'Formation et Renforcement des Capacités',
      image: '/images/project-activities/formation clj.jpg',
      description: 'Formation des conseils locaux de jeunes et renforcement de leurs capacités en leadership et dialogue.'
    },
    {
      title: 'Centres de Production Artisanale',
      image: '/images/project-activities/Centre de production.jpg',
      description: 'Création de centres de production pour l\'autonomisation économique des femmes et des jeunes.'
    },
    {
      title: 'Conférences et Débats',
      image: '/images/project-activities/conférence attigue.jpg',
      description: 'Organisation de conférences et panels sur la prévention de l\'extrémisme violent.'
    },
    {
      title: 'Compétitions de Débat',
      image: '/images/project-activities/Comp de débat.jpg',
      description: 'Concours de débat pour promouvoir le dialogue constructif entre les jeunes.'
    },
    {
      title: 'Activités Communautaires',
      image: '/images/project-activities/activite-atdef.jpg',
      description: 'Activités de terrain menées par nos partenaires régionaux dans différentes gouvernorats.'
    },
    {
      title: 'Centres de Production Régionaux',
      image: '/images/project-activities/centre de production kef.jpg',
      description: 'Développement de centres de production dans les régions de Kef, Kasserine et autres.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-800 to-emerald-700" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Projet RCMEV
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
              Réponse Coordonnée à la Montée de l'Extrémisme Violent
            </p>
            <div className="flex justify-center">
              <Image
                src="/images/logo-WeLoveSousse.png"
                alt="We Love Sousse"
                width={100}
                height={100}
                className="drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                À Propos du Projet
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            >
              <p className="text-xl mb-6">
                Le projet « Réponse coordonnée à la montée de l'extrémisme violent » (RCMEV) est mis en œuvre par l'association 
                <strong className="text-blue-600"> We Love Sousse</strong> sous la supervision de la 
                <strong className="text-teal-600"> Commission Nationale de Lutte Contre le Terrorisme (CNLCT)</strong> et financé par le 
                <strong className="text-emerald-600"> GCERF – Global Community Engagement and Resilience Fund</strong>.
              </p>
              
              <p className="mb-6">
                Ce projet vise à renforcer la résilience des jeunes et des femmes dans plusieurs régions vulnérables de Tunisie 
                (Jendouba, Sidi Bouzid, Ksar Saïd, El Sers, Sakiet Sidi Youssef, etc.) à travers la promotion du dialogue, 
                de la tolérance et de l'inclusion sociale et économique.
              </p>
              
              <p className="mb-6">
                Ses actions s'articulent autour de clubs de débats et de paix, de conseils locaux de jeunes, de centres d'écoute 
                et de production ainsi que de recherches appliquées menées avec les universités.
              </p>
              
              <p className="mb-6">
                Pour sa mise en œuvre, We Love Sousse collabore avec des partenaires associatifs régionaux – 
                <strong className="text-blue-600"> ATDef, FJCC et ADO+</strong> – qui portent les activités de terrain dans les différentes régions. 
                Le projet bénéficie également de l'appui d'<strong className="text-teal-600">ACTED</strong> en tant que partenaire technique, 
                garantissant la qualité des interventions et le transfert d'expertise.
              </p>
              
              <p className="text-lg font-medium text-gray-900">
                Ce dispositif multi-acteurs permet de construire un modèle intégré et durable de prévention de l'extrémisme 
                violent en Tunisie, reconnu comme une expérience inspirante à l'échelle régionale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre Impact en Chiffres
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nos Activités
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Découvrez Nos Réalisations
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Explorez notre galerie photo et nos articles pour voir l'impact concret de nos actions sur le terrain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/photos"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Voir la Galerie
              </Link>
              <Link
                href="/articles"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Lire nos Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
