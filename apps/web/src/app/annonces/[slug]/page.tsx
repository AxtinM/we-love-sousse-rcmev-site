'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { ArrowLeftIcon, CalendarDaysIcon, NewspaperIcon, BellAlertIcon, ArrowPathIcon, LinkIcon, ClockIcon } from '@heroicons/react/24/outline';

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

export default function AnnouncementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [relatedAnnouncements, setRelatedAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams?.slug) {
      fetchAnnouncement(resolvedParams.slug);
    }
  }, [resolvedParams]);

  const fetchAnnouncement = async (slug: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/announcements?filters[slug][$eq]=${slug}&populate=*`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const announcementData = data.data[0];
          setAnnouncement(announcementData);
          
          // Fetch related announcements of same type
          if (announcementData.type) {
            fetchRelatedAnnouncements(announcementData.type, announcementData.id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedAnnouncements = async (type: string, currentId: number) => {
    try {
      const now = new Date().toISOString();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/announcements?filters[type][$eq]=${type}&filters[id][$ne]=${currentId}&filters[startDate][$lte]=${now}&populate=*&pagination[limit]=3&sort=startDate:desc`
      );
      
      if (response.ok) {
        const data = await response.json();
        const activeAnnouncements = data.data.filter((ann: Announcement) => {
          if (!ann.endDate) return true;
          return new Date(ann.endDate) >= new Date();
        });
        setRelatedAnnouncements(activeAnnouncements);
      }
    } catch (error) {
      console.error('Error fetching related announcements:', error);
    }
  };

  const getImageUrl = (announcement: Announcement) => {
    if (!announcement.image) return null;
    
    const formats = announcement.image.formats;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337'}${
      formats.large?.url || formats.medium?.url || announcement.image.url
    }`;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-TN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-TN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const isExpired = () => {
    if (!announcement?.endDate) return false;
    return new Date(announcement.endDate) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <NewspaperIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">Annonce non trouvée</h2>
          <p className="text-gray-600 font-inter mb-6">Cette annonce n&apos;existe pas ou n&apos;est plus disponible.</p>
          <Link 
            href="/annonces"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-poppins font-medium"
          >
            Voir toutes les annonces
          </Link>
        </div>
      </div>
    );
  }

  const Icon = typeIcons[announcement.type];
  const imageUrl = getImageUrl(announcement);
  const expired = isExpired();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              href="/annonces" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap font-inter font-medium"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Retour</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Image */}
            {imageUrl && (
              <div className="relative h-64 sm:h-96 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={announcement.image?.alternativeText || announcement.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className={`bg-gradient-to-r ${typeColors[announcement.type]} text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center shadow-lg`}>
                    <Icon className="w-4 h-4 mr-1.5" />
                    {typeLabels[announcement.type]}
                  </div>
                  {announcement.priority === 'urgent' && (
                    <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      URGENT
                    </div>
                  )}
                  {expired && (
                    <div className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      EXPIRÉE
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  <span>Publié le {formatDate(announcement.startDate)}</span>
                </div>
                {announcement.endDate && (
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>Expire le {formatDate(announcement.endDate)}</span>
                  </div>
                )}
                <div className={`px-3 py-1 rounded-full border text-xs font-medium ${priorityBadges[announcement.priority]}`}>
                  Priorité: {announcement.priority}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
                {announcement.title}
              </h1>

              {/* Excerpt */}
              {announcement.excerpt && (
                <p className="text-lg sm:text-xl text-gray-600 mb-8 font-inter leading-relaxed border-l-4 border-blue-500 pl-6 italic">
                  {announcement.excerpt}
                </p>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-8 font-inter">
                <ReactMarkdown>{announcement.content}</ReactMarkdown>
              </div>

              {/* CTA Link */}
              {announcement.link && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors group"
                  >
                    <LinkIcon className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    {announcement.linkText || 'En savoir plus'}
                  </a>
                </div>
              )}

              {/* Timestamps */}
              <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
                <p>Publié le {formatDateTime(announcement.publishedAt)}</p>
                {announcement.updatedAt !== announcement.publishedAt && (
                  <p className="mt-1">Mis à jour le {formatDateTime(announcement.updatedAt)}</p>
                )}
              </div>
            </div>
          </motion.article>

          {/* Related Announcements */}
          {relatedAnnouncements.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-gray-900 mb-6">
                Annonces similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedAnnouncements.map((related) => {
                  const RelatedIcon = typeIcons[related.type];
                  return (
                    <Link
                      key={related.id}
                      href={`/annonces/${related.slug}`}
                      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {related.image && (
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={getImageUrl(related) || ''}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className={`inline-flex items-center px-2 py-1 bg-gradient-to-r ${typeColors[related.type]} text-white rounded-lg text-xs font-medium mb-2`}>
                          <RelatedIcon className="w-3 h-3 mr-1" />
                          {typeLabels[related.type]}
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {formatDate(related.startDate)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
