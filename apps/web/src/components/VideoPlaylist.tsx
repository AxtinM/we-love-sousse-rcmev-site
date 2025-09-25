'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: 'conference' | 'formation' | 'competition';
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Conférence sur la Prévention de l\'Extrémisme',
    description: 'Une discussion approfondie sur les stratégies de prévention de l\'extrémisme violent en Tunisie.',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'conference'
  },
  {
    id: '2',
    title: 'Formation des Jeunes Leaders',
    description: 'Programme de formation pour renforcer la résilience des jeunes face à la radicalisation.',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'formation'
  },
  {
    id: '3',
    title: 'Compétition d\'Innovation Sociale',
    description: 'Concours d\'idées innovantes pour lutter contre l\'extrémisme violent.',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'competition'
  }
];

export default function VideoPlaylist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform scroll progress to video index
  const videoProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, mockVideos.length - 1]);

  useEffect(() => {
    const unsubscribe = videoProgress.onChange((latest) => {
      const index = Math.round(latest);
      if (index !== activeVideo && index >= 0 && index < mockVideos.length) {
        setActiveVideo(index);
      }
    });

    return unsubscribe;
  }, [videoProgress, activeVideo]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl lg:text-7xl font-bold text-center text-white mb-16"
        >
          Nos Vidéos
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <motion.div
            key={activeVideo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              src={mockVideos[activeVideo].youtubeUrl}
              title={mockVideos[activeVideo].title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* Video Info */}
          <div className="space-y-8">
            <motion.div
              key={`info-${activeVideo}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                {mockVideos[activeVideo].category.charAt(0).toUpperCase() + mockVideos[activeVideo].category.slice(1)}
              </div>
              <h3 className="text-3xl font-bold mb-4">{mockVideos[activeVideo].title}</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {mockVideos[activeVideo].description}
              </p>
            </motion.div>

            {/* Video Navigation */}
            <div className="flex space-x-4">
              {mockVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeVideo
                      ? 'bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <span className="text-sm">Faites défiler pour changer de vidéo</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-6 border-2 border-gray-400 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 bg-gray-400 rounded-full mt-1"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
