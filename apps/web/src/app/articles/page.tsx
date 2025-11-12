'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, CalendarDaysIcon, MagnifyingGlassIcon, ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
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

export default function ArticlesPage() {
  const [publications, setPublications] = useState<Article[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PublicationType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchPublications();
  }, [selectedType]);

  useEffect(() => {
    applyFilters();
  }, [publications, searchTerm]);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const data = await getArticles(selectedType === 'all' ? undefined : selectedType);
      setPublications(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...publications];

    if (searchTerm) {
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPublications(filtered);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Pagination
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPublications = filteredPublications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Nos Publications
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
              Découvrez nos articles, recherches, rapports et autres ressources documentaires
            </p>
            
            {/* Search Bar */}
            <motion.form 
              onSubmit={handleSearch} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une publication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-2xl text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg text-lg"
                />
                <MagnifyingGlassIcon className="h-6 w-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  Rechercher
                </button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {PUBLICATION_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type.value
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 shadow-md border border-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPublications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune publication trouvée</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm ? 'Essayez avec d\'autres mots-clés ou parcourez toutes nos publications' : 'Aucune publication n\'est disponible pour le moment'}
              </p>
              {(searchTerm || selectedType !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setCurrentPage(1);
                  }}
                  className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  Voir toutes les publications
                </button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Results info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <p className="text-gray-600">
                  {searchTerm ? (
                    <>Résultats pour "<span className="font-semibold text-gray-900">{searchTerm}</span>" • </>
                  ) : null}
                  <span className="font-semibold">{filteredPublications.length}</span> publication{filteredPublications.length > 1 ? 's' : ''} trouvée{filteredPublications.length > 1 ? 's' : ''}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPublications.map((publication, index) => (
                  <motion.article
                    key={publication.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/articles/${publication.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="relative h-56 overflow-hidden">
                          {publication.coverImage ? (
                            <Image
                              src={getStrapiMediaUrl(publication.coverImage) || ''}
                              alt={(typeof publication.coverImage === 'object' ? publication.coverImage.alt : null) || publication.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                              <EyeIcon className="w-16 h-16 text-white/60" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className={`absolute top-4 left-4 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium ${getPublicationTypeColor(publication.publicationType)}`}>
                            {getPublicationTypeLabel(publication.publicationType)}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <CalendarDaysIcon className="h-4 w-4 mr-2 text-emerald-500" />
                            {formatDate(publication.createdAt)}
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 leading-tight">
                            {publication.title}
                          </h3>
                          
                          {publication.excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                              {publication.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300">
                              Lire la suite
                              <ChevronRightIcon className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-16">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Précédent
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
