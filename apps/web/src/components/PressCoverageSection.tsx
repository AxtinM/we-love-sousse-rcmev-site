'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowTopRightOnSquareIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { getPressCoverage, getPayloadMediaUrl, type PressCoverage } from '@/lib/api';

export default function PressCoverageSection() {
  const [pressCoverage, setPressCoverage] = useState<PressCoverage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPressCoverage = async () => {
      try {
        const data = await getPressCoverage();
        setPressCoverage(data || []);
      } catch (error) {
        console.error('Error fetching press coverage:', error);
        setPressCoverage([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPressCoverage();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getThumbnailUrl = (coverage: PressCoverage) => {
    if (coverage.thumbnail) {
      return getPayloadMediaUrl(coverage.thumbnail);
    }
    return null;
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/20 relative">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="h-6 bg-teal-100 rounded-full w-40 sm:w-48 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-8 sm:h-12 bg-gray-200 rounded w-64 sm:w-96 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-48 sm:w-80 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden animate-pulse border border-gray-100/50">
                <div className="h-48 sm:h-56 bg-gray-200"></div>
                <div className="p-6 sm:p-8">
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 mb-4 sm:mb-6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (pressCoverage.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/20 relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-poppins font-medium mb-4 sm:mb-6">
            <NewspaperIcon className="w-4 h-4 mr-2" />
            Dans la Presse
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-poppins font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Retombée
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              {" "}Presse
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 font-inter">
            Découvrez comment notre travail est couvert par les médias et publications externes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {pressCoverage.map((coverage, index) => (
            <motion.article
              key={coverage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              {coverage.displayType === 'embed' ? (
                // Embed type - show iframe with consistent card styling
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50">
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-teal-100 to-emerald-100">
                    <iframe
                      src={coverage.url}
                      title={coverage.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    {coverage.source && (
                      <p className="text-xs sm:text-sm text-teal-600 font-semibold mb-2">{coverage.source}</p>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2 leading-tight">
                      {coverage.title}
                    </h3>
                    {coverage.excerpt && (
                      <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {coverage.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {coverage.publishedDate && (
                        <p className="text-xs text-gray-500">{formatDate(coverage.publishedDate)}</p>
                      )}
                      <a
                        href={coverage.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300"
                      >
                        Visiter la source
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                // Link type - show card with thumbnail and external link
                <a
                  href={coverage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-teal-100 to-emerald-100">
                    {getThumbnailUrl(coverage) ? (
                      <img
                        src={getThumbnailUrl(coverage)!}
                        alt={(typeof coverage.thumbnail === 'object' ? coverage.thumbnail.alt : null) || coverage.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <NewspaperIcon className="w-20 h-20 text-teal-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-teal-700" />
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    {coverage.source && (
                      <p className="text-xs sm:text-sm text-teal-600 font-semibold mb-2">{coverage.source}</p>
                    )}
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2 leading-tight">
                      {coverage.title}
                    </h3>
                    
                    {coverage.excerpt && (
                      <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {coverage.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {coverage.publishedDate && (
                        <p className="text-xs text-gray-500">{formatDate(coverage.publishedDate)}</p>
                      )}
                      <div className="flex items-center text-sm text-teal-600 font-semibold group-hover:text-teal-700 transition-colors duration-300">
                        Lire l'article
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
