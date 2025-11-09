'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: 'conferences' | 'formations' | 'concours';
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Conférence sur la Prévention de l\'Extrémisme',
    description: 'Discussions approfondies sur les stratégies de prévention et l\'engagement communautaire',
    youtubeId: '6tCiw0NshGg',
    category: 'conferences'
  },
  {
    id: '2',
    title: 'Formation des Jeunes Leaders',
    description: 'Programme de renforcement des capacités pour les jeunes dans la lutte contre la radicalisation',
    youtubeId: '6U-35wHkRww',
    category: 'formations'
  },
  {
    id: '3',
    title: 'Innovation Sociale et Dialogue',
    description: 'Initiatives créatives pour promouvoir le dialogue intercommunautaire',
    youtubeId: 'ZnoXyuVDPYI',
    category: 'concours'
  },
  {
    id: '4',
    title: 'Résilience Communautaire',
    description: 'Stratégies pour renforcer la cohésion sociale et la résistance à l\'extrémisme',
    youtubeId: 'WSXjJDlKuxk',
    category: 'formations'
  }
];

const categoryLabels = {
  conferences: 'Conférences',
  formations: 'Formations',
  concours: 'Concours d\'Innovation'
};

export default function ImmersiveVideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Nos Vidéos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez notre travail à travers nos conférences, formations et concours d'innovation sociale
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Toutes les vidéos
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?controls=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <span className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                    {categoryLabels[selectedVideo.category]}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Video Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Playlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedVideo.id === video.id
                    ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-400/25'
                    : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video bg-gray-800">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <PlayIcon className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                  {selectedVideo.id === video.id && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">
                      EN COURS
                    </div>
                  )}
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-4">
                  <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <span className="text-emerald-300 text-xs">
                    {categoryLabels[video.category]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
