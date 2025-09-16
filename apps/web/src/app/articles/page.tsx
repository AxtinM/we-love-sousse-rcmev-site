'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, CalendarDaysIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-semibold mb-6">
              Nos Articles
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Découvrez nos dernières initiatives, recherches et témoignages dans la lutte contre l'extrémisme en Tunisie
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-full text-gray-900 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Essayez avec d\'autres mots-clés' : 'Aucun article n\'est disponible pour le moment'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {articles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/articles/${article.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={getImageUrl(article)}
                            alt={article.coverImage?.alternativeText || article.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <CalendarDaysIcon className="h-4 w-4 mr-2" />
                            {formatDate(article.publishedAt)}
                          </div>
                          
                          <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {article.title}
                          </h3>
                          
                          {article.excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                              {article.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                            Lire la suite
                            <ChevronRightIcon className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
