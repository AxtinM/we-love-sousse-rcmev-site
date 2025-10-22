'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MegaphoneIcon, CalendarDaysIcon, NewspaperIcon, BellAlertIcon, ArrowPathIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const now = new Date().toISOString();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/announcements?filters[showOnHomepage][$eq]=true&filters[startDate][$lte]=${now}&populate=*&sort=priority:desc,startDate:desc&pagination[limit]=4`
        );
        if (response.ok) {
          const data: AnnouncementsResponse = await response.json();
          // Filter active announcements (no endDate or endDate in future)
          const activeAnnouncements = data.data.filter(ann => {
            if (!ann.endDate) return true;
            return new Date(ann.endDate) >= new Date();
          });
          setAnnouncements(activeAnnouncements);
        } else {
          console.warn('Failed to fetch announcements - CMS may not be available');
          setAnnouncements([]);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

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

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50/20 relative">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(4)].map((_, i) => (
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
        </div>
      </section>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-poppins font-medium mb-4 sm:mb-6">
            <MegaphoneIcon className="w-4 h-4 mr-2" />
            Dernières Annonces
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-4 sm:mb-6">
            Restez Informé
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Découvrez nos événements, actualités et mises à jour importantes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {announcements.map((announcement, index) => {
            const Icon = typeIcons[announcement.type];
            return (
              <motion.article
                key={announcement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/annonces/${announcement.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                    {announcement.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getImageUrl(announcement)}
                          alt={announcement.image.alternativeText || announcement.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-2.5 py-1 bg-gradient-to-r ${typeColors[announcement.type]} text-white rounded-lg text-xs font-medium`}>
                          <Icon className="w-3 h-3 mr-1" />
                          {typeLabels[announcement.type]}
                        </span>
                        {announcement.priority === 'urgent' && (
                          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">URGENT</span>
                        )}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-poppins font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                        {announcement.title}
                      </h3>
                      
                      {announcement.excerpt && (
                        <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 font-inter">
                          {announcement.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-xs text-gray-500 flex items-center">
                          <CalendarDaysIcon className="w-4 h-4 mr-1" />
                          {formatDate(announcement.startDate)}
                        </div>
                        <div className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                          Lire
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/annonces"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-poppins font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Voir toutes les annonces
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
