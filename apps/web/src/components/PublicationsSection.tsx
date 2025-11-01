'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { getArticles, getStrapiMediaUrl, type Article, type PublicationType } from '@/lib/api';

const PUBLICATION_TYPES: { value: PublicationType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'article', label: 'Articles' },
  { value: 'scientifique', label: 'Scientifique' },
  { value: 'rapport', label: 'Rapports' },
  { value: 'compte-rendu', label: 'Comptes-rendus' },
  { value: 'newsletter', label: 'Newsletters' },
  { value: 'cartographie', label: 'Cartographies' },
  { value: 'document', label: 'Documents' },
  { value: 'actualite', label: 'Actualités' }
];

const getPublicationTypeColor = (type: PublicationType): string => {
  const colors: Record<PublicationType, string> = {
    article: 'bg-emerald-100 text-emerald-800',
    scientifique: 'bg-blue-100 text-blue-800',
    rapport: 'bg-purple-100 text-purple-800',
    'compte-rendu': 'bg-orange-100 text-orange-800',
    newsletter: 'bg-pink-100 text-pink-800',
    cartographie: 'bg-teal-100 text-teal-800',
    document: 'bg-gray-100 text-gray-800',
    actualite: 'bg-cyan-100 text-cyan-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

const getPublicationTypeLabel = (type: PublicationType): string => {
  const labels: Record<PublicationType, string> = {
    article: 'Article',
    scientifique: 'Scientifique',
    rapport: 'Rapport',
    'compte-rendu': 'Compte-rendu',
    newsletter: 'Newsletter',
    cartographie: 'Cartographie',
    document: 'Document',
    actualite: 'Actualité'
  };
  return labels[type] || 'Article';
};

export default function PublicationsSection() {
  const [publications, setPublications] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<PublicationType | 'all'>('all');

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      try {
        const data = await getArticles(selectedType === 'all' ? undefined : selectedType);
        // Limit to 3 publications
        setPublications(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching publications:', error);
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [selectedType]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 relative">
        {/* Decorative Elements - Responsive */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="h-6 bg-emerald-100 rounded-full w-40 sm:w-48 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-8 sm:h-12 bg-gray-200 rounded w-64 sm:w-96 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-48 sm:w-80 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden animate-pulse border border-gray-100/50">
                <div className="h-48 sm:h-56 bg-gray-200"></div>
                <div className="p-6 sm:p-8">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-3 sm:mb-4"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 mb-4 sm:mb-6"></div>
                  <div className="h-4 sm:h-5 bg-gray-200 rounded w-24 sm:w-28"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (publications.length === 0 && selectedType === 'all') {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 relative">
      {/* Decorative Elements - Responsive */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-poppins font-medium mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Ressources & Documentation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-poppins font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Nos 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              {" "}Publications
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 font-inter">
            Découvrez nos articles, recherches, rapports et autres ressources documentaires sur nos initiatives et actions
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {PUBLICATION_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type.value
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 shadow-md'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>

        {publications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100/50 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune publication</h3>
              <p className="text-gray-600">Aucune publication de ce type n'est disponible pour le moment.</p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {publications.map((publication, index) => (
                <motion.article
                  key={publication.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  <Link href={`/articles/${publication.slug}`}>
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50">
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        {publication.coverImage?.data?.attributes?.url ? (
                          <img
                            src={getStrapiMediaUrl(publication.coverImage.data.attributes.url)}
                            alt={publication.coverImage.data.attributes.alternativeText || publication.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-6xl">📄</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <div className={`backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${getPublicationTypeColor(publication.publicationType)}`}>
                            <span className="text-xs font-medium">{getPublicationTypeLabel(publication.publicationType)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          <CalendarDaysIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-emerald-500" />
                          {publication.publishedAt ? formatDate(publication.publishedAt) : formatDate(publication.createdAt)}
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2 leading-tight">
                          {publication.title}
                        </h3>
                        
                        {publication.excerpt && (
                          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                            {publication.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm sm:text-base text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                            Lire la suite
                            <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                          <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link
                href="/articles"
                className="group inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-semibold text-base sm:text-lg rounded-full hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">Découvrir toutes nos publications</span>
                <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
