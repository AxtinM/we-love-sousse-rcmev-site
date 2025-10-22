'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

interface Announcement {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  type: 'event' | 'news' | 'alert' | 'update';
  priority: 'urgent' | 'high' | 'normal' | 'info';
  startDate: string;
  endDate?: string;
}

const priorityColors = {
  urgent: 'from-red-600 to-red-700',
  high: 'from-orange-500 to-amber-600',
  normal: 'from-blue-500 to-cyan-600',
  info: 'from-gray-600 to-gray-700'
};

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchUrgentAnnouncements();
  }, []);

  useEffect(() => {
    // Check localStorage for dismissed announcements
    const dismissed = localStorage.getItem('dismissedAnnouncements');
    if (dismissed) {
      try {
        const dismissedIds = JSON.parse(dismissed);
        const filteredAnnouncements = announcements.filter(
          ann => !dismissedIds.includes(ann.documentId)
        );
        if (filteredAnnouncements.length > 0) {
          setAnnouncement(filteredAnnouncements[0]);
        }
      } catch (error) {
        console.error('Error parsing dismissed announcements:', error);
      }
    } else if (announcements.length > 0) {
      setAnnouncement(announcements[0]);
    }
  }, [announcements]);

  useEffect(() => {
    // Auto-rotate announcements every 10 seconds if multiple exist
    if (announcements.length > 1 && !isDismissed) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % announcements.length;
          setAnnouncement(announcements[nextIndex]);
          return nextIndex;
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [announcements, isDismissed]);

  const fetchUrgentAnnouncements = async () => {
    try {
      const now = new Date().toISOString();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/announcements?filters[priority][$in][0]=urgent&filters[priority][$in][1]=high&filters[startDate][$lte]=${now}&sort=priority:desc,startDate:desc&pagination[limit]=5`
      );
      
      if (response.ok) {
        const data = await response.json();
        // Filter active announcements
        const activeAnnouncements = data.data.filter((ann: Announcement) => {
          if (!ann.endDate) return true;
          return new Date(ann.endDate) >= new Date();
        });
        setAnnouncements(activeAnnouncements);
      }
    } catch (error) {
      console.error('Error fetching urgent announcements:', error);
    }
  };

  const handleDismiss = () => {
    if (!announcement) return;
    
    setIsDismissed(true);
    
    // Save dismissed announcement to localStorage
    const dismissed = localStorage.getItem('dismissedAnnouncements');
    let dismissedIds: string[] = [];
    
    if (dismissed) {
      try {
        dismissedIds = JSON.parse(dismissed);
      } catch (error) {
        console.error('Error parsing dismissed announcements:', error);
      }
    }
    
    if (!dismissedIds.includes(announcement.documentId)) {
      dismissedIds.push(announcement.documentId);
      localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissedIds));
    }
  };

  if (!announcement || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-r ${priorityColors[announcement.priority]} text-white relative z-40`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 hidden sm:block">
              <MegaphoneIcon className="w-6 h-6" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <Link href={`/annonces/${announcement.slug}`} className="block group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-bold uppercase">
                    {announcement.priority === 'urgent' ? '🚨 Urgent' : '⚠️ Important'}
                  </span>
                  {announcements.length > 1 && (
                    <span className="text-xs opacity-75">
                      {currentIndex + 1}/{announcements.length}
                    </span>
                  )}
                </div>
                <p className="font-semibold text-sm sm:text-base group-hover:underline line-clamp-2 sm:line-clamp-1">
                  {announcement.title}
                </p>
                {announcement.excerpt && (
                  <p className="text-xs sm:text-sm opacity-90 mt-1 line-clamp-1 hidden sm:block">
                    {announcement.excerpt}
                  </p>
                )}
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href={`/annonces/${announcement.slug}`}
              className="flex-shrink-0 hidden md:inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              En savoir plus
            </Link>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress indicator for auto-rotation */}
        {announcements.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-white/50"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, ease: 'linear' }}
            key={currentIndex}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
