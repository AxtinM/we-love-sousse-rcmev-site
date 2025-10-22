'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarDaysIcon, UsersIcon, GlobeAltIcon, HeartIcon, AcademicCapIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function WeLoveSoussePage() {
  const milestones = [
    { year: '2011', title: 'Création de We Love Sousse', description: 'Fondation de l\'association à Sousse avec une vision de citoyenneté active' },
    { year: '2015', title: 'Expansion Régionale', description: 'Extension des activités vers d\'autres gouvernorats tunisiens' },
    { year: '2018', title: 'Partenariats Internationaux', description: 'Adhésion au réseau Anna Lindh et partenariats euro-méditerranéens' },
    { year: '2020', title: 'Projet RCMEV', description: 'Lancement du projet de prévention de l\'extrémisme violent avec GCERF' },
  ];

  const domains = [
    {
      icon: AcademicCapIcon,
      title: 'Culture et Éducation',
      description: 'Programmes éducatifs et culturels pour les jeunes et les communautés'
    },
    {
      icon: UsersIcon,
      title: 'Inclusion Sociale',
      description: 'Promotion de l\'inclusion et de la cohésion sociale dans les régions vulnérables'
    },
    {
      icon: HeartIcon,
      title: 'Prévention de l\'Extrémisme',
      description: 'Initiatives de prévention de la radicalisation et promotion du dialogue'
    },
    {
      icon: GlobeAltIcon,
      title: 'Dialogue Interculturel',
      description: 'Promotion du dialogue entre les cultures et les communautés'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Développement Durable',
      description: 'Projets de développement local durable et d\'autonomisation économique'
    },
    {
      icon: CalendarDaysIcon,
      title: 'Innovation Sociale',
      description: 'Développement de solutions innovantes pour les défis sociaux'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-700" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <Image
                src="/images/logo-WeLoveSousse.png"
                alt="We Love Sousse"
                width={120}
                height={120}
                className="drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              We Love Sousse
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 font-light">
              Plus d'une décennie d'engagement pour la citoyenneté active et le développement durable
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <CalendarDaysIcon className="w-5 h-5" />
              <span className="font-semibold">Fondée en 2011</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
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
                Notre Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            >
              <p className="text-xl mb-6">
                Créée en 2011, <strong className="text-emerald-600">We Love Sousse (WLS)</strong> est une organisation de la société civile tunisienne 
                engagée pour la promotion de la citoyenneté active, de la solidarité et du développement local durable.
              </p>
              
              <p className="mb-6">
                Basée à Sousse, l'association place les <strong className="text-teal-600">jeunes et les femmes</strong> au cœur de son action 
                en leur offrant des espaces de participation, de formation et d'innovation sociale.
              </p>
              
              <p className="mb-6">
                Depuis plus d'une décennie, WLS développe et met en œuvre des projets dans les domaines de la culture, 
                de l'éducation, de l'inclusion sociale, de la prévention de l'extrémisme violent, de la promotion du 
                dialogue interculturel et du développement durable.
              </p>
              
              <p className="mb-6">
                L'association est également très active au niveau international à travers ses partenariats avec des 
                réseaux régionaux et euro-méditerranéens, notamment en tant que <strong className="text-blue-600">chef de file du Réseau tunisien 
                de la Fondation Anna Lindh</strong>.
              </p>
              
              <p className="text-lg font-medium text-gray-900">
                Forte d'une équipe dynamique, de bénévoles engagés et d'un large réseau de partenaires locaux et internationaux, 
                We Love Sousse œuvre chaque jour à renforcer la cohésion sociale, à stimuler l'engagement civique des jeunes 
                et à faire de Sousse – et de la Tunisie – un espace d'innovation citoyenne, de solidarité et de paix.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domains of Action */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nos Domaines d'Action
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-4">
                  <domain.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                <p className="text-gray-600 leading-relaxed">{domain.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre Parcours
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-emerald-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Découvrez comment nous construisons ensemble un avenir plus inclusif et durable pour la Tunisie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projet"
                className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
              >
                Découvrir le Projet RCMEV
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
