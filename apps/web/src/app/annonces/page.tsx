'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, MegaphoneIcon, CalendarDaysIcon, NewspaperIcon, BellAlertIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Announcement {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  type: 'event' | 'news' | 'alert' | 'update';
  priority: 'urgent' | 'high' | 'normal' | 'info';
  startDate: string;
  endDate?: string;
  link?: string;
  linkText?: string;
  showOnHomepage: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  image?: {
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

interface AnnouncementsResponse {
  data: Announcement[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const typeLabels = {
  event: 'Événement',
  news: 'Actualité',
  alert: 'Alerte',
  update: 'Mise à jour'
};

const typeColors = {
  event: 'from-purple-500 to-pink-500',
  news: 'from-blue-500 to-cyan-500',
  alert: 'from-red-500 to-orange-500',
  update: 'from-green-500 to-emerald-500'
};

const typeIcons = {
  event: CalendarDaysIcon,
  news: NewspaperIcon,
  alert: BellAlertIcon,
  update: ArrowPathIcon
};

const priorityBadges = {
  urgent: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  normal: 'bg-blue-100 text-blue-800 border-blue-200',
  info: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showExpired, setShowExpired] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 0
  });

  useEffect(() => {
    fetchAnnouncements(currentPage, selectedType, showExpired);
  }, [currentPage, selectedType, showExpired]);

  const fetchAnnouncements = async (page: number, type: string = 'all', includeExpired: boolean = false) => {
    setLoading(true);
    try {
      const now = new Date().toISOString();
      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/announcements?populate=*&pagination[page]=${page}&pagination[pageSize]=12&sort=priority:desc,startDate:desc`;
      
      if (type !== 'all') {
        url += `&filters[type][$eq]=${type}`;
      }

      if (!includeExpired) {
        url += `&filters[startDate][$lte]=${now}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data: AnnouncementsResponse = await response.json();
        
        // Filter active announcements if not showing expired
        let filteredData = data.data;
        if (!includeExpired) {
          filteredData = data.data.filter(ann => {
            if (!ann.endDate) return true;
            return new Date(ann.endDate) >= new Date();
          });
        }
        
        setAnnouncements(filteredData);
        setPagination(data.meta.pagination);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (announcement: Announcement) => {
    if (!announcement.image) return '/images/default-announcement.jpg';
    
    const formats = announcement.image.formats;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337'}${
      formats.medium?.url || formats.large?.url || formats.small?.url || announcement.image.url
    }`;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-TN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const isExpired = (announcement: Announcement) => {
    if (!announcement.endDate) return false;
    return new Date(announcement.endDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              <MegaphoneIcon className="w-5 h-5 mr-2" />
              Annonces
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
              Toutes nos Annonces
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-inter">
              Événements, actualités et informations importantes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => {setSelectedType('all'); setCurrentPage(1);}}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes
            </button>
            {Object.entries(typeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {setSelectedType(key); setCurrentPage(1);}}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedType === key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowExpired(!showExpired)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {showExpired ? '✓ Afficher les annonces expirées' : 'Afficher les annonces expirées'}
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : announcements.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <MegaphoneIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune annonce trouvée</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {selectedType !== 'all' ? 'Aucune annonce dans cette catégorie pour le moment' : 'Aucune annonce disponible actuellement'}
              </p>
              {selectedType !== 'all' && (
                <button
                  onClick={() => {setSelectedType('all'); setCurrentPage(1);}}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Voir toutes les annonces
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
                  {selectedType !== 'all' ? (
                    <>Annonces de type "<span className="font-semibold text-gray-900">{typeLabels[selectedType as keyof typeof typeLabels]}</span>" • </>
                  ) : null}
                  <span className="font-semibold">{pagination.total}</span> annonce{pagination.total > 1 ? 's' : ''} disponible{pagination.total > 1 ? 's' : ''}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {announcements.map((announcement, index) => {
                  const Icon = typeIcons[announcement.type];
                  const expired = isExpired(announcement);
                  
                  return (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/annonces/${announcement.slug}`}>
                        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col ${expired ? 'opacity-60' : ''}`}>
                          {announcement.image && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={getImageUrl(announcement)}
                                alt={announcement.image.alternativeText || announcement.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                              
                              {/* Type badge */}
                              <div className={`absolute top-4 left-4 bg-gradient-to-r ${typeColors[announcement.type]} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
                                <Icon className="w-3 h-3 mr-1" />
                                {typeLabels[announcement.type]}
                              </div>
                              
                              {/* Priority badge */}
                              {announcement.priority === 'urgent' && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  URGENT
                                </div>
                              )}
                              
                              {expired && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <span className="bg-gray-800 text-white px-4 py-2 rounded-full font-bold text-sm">EXPIRÉE</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                              {announcement.title}
                            </h3>
                            
                            {announcement.excerpt && (
                              <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                                {announcement.excerpt}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                              <div className="flex items-center">
                                <CalendarDaysIcon className="w-4 h-4 mr-1" />
                                {formatDate(announcement.startDate)}
                              </div>
                              <span className={`px-2 py-1 rounded-full border ${priorityBadges[announcement.priority]}`}>
                                {announcement.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination.pageCount > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Précédent
                  </button>
                  
                  {[...Array(pagination.pageCount)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(pagination.pageCount, p + 1))}
                    disabled={currentPage === pagination.pageCount}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
