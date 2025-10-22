'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, CalendarDaysIcon, MagnifyingGlassIcon, ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  coverImage: {
    id: number;
    url: string;
    alternativeText: string;
    formats: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

interface ArticlesResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 0
  });

  useEffect(() => {
    fetchArticles(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchArticles = async (page: number, search: string = '') => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=12&sort=publishedAt:desc`;
      
      if (search) {
        url += `&filters[title][$containsi]=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data: ArticlesResponse = await response.json();
        setArticles(data.data);
        setPagination(data.meta.pagination);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (article: Article) => {
    if (!article.coverImage) return '/images/default-article.jpg';
    
    const formats = article.coverImage.formats;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337'}${
      formats.medium?.url || formats.large?.url || formats.small?.url || article.coverImage.url
    }`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArticles(1, searchTerm);
  };

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-800 to-emerald-700" />
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
              Nos Articles
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
              Découvrez nos dernières initiatives, recherches et témoignages
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
                  placeholder="Rechercher un article..."
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

      {/* Articles Grid */}
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
          ) : articles.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun article trouvé</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm ? 'Essayez avec d\'autres mots-clés ou parcourez tous nos articles' : 'Aucun article n\'est disponible pour le moment'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {setSearchTerm(''); setCurrentPage(1); fetchArticles(1, '');}}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Voir tous les articles
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
                  <span className="font-semibold">{pagination.total}</span> article{pagination.total > 1 ? 's' : ''} trouvé{pagination.total > 1 ? 's' : ''}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/articles/${article.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="relative h-56 overflow-hidden">
                          {article.coverImage ? (
                            <Image
                              src={getImageUrl(article)}
                              alt={article.coverImage?.alternativeText || article.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                              <EyeIcon className="w-16 h-16 text-white/60" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                            Article
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <CalendarDaysIcon className="h-4 w-4 mr-2" />
                            {formatDate(article.publishedAt)}
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                          
                          {article.excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                              {article.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
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
              {pagination.pageCount > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-16">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  
                  {[...Array(pagination.pageCount)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(pagination.pageCount, currentPage + 1))}
                    disabled={currentPage === pagination.pageCount}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
