'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';

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

const categoryColors = {
  conferences: 'from-blue-500 to-cyan-500',
  formations: 'from-green-500 to-emerald-500',
  concours: 'from-purple-500 to-pink-500'
};

export default function ImmersiveVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [videoProgress, setVideoProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState(false);

  // Debounced scroll handler for better performance
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to horizontal position
  const x = useTransform(scrollYProgress, [0, 0.8], [0, -(videos.length - 1) * 100]);

  // Handle video visibility and auto-play/pause with debouncing
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      setVideoProgress(progress);
      
      // Dismiss overlay once user starts scrolling
      if (progress > 0.05 && showOverlay) {
        setShowOverlay(false);
        setVideosLoaded(true);
      }
      
      // Debounce video switching for smoother performance
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      
      debounceTimer.current = setTimeout(() => {
        // Calculate which video should be active based on scroll progress
        const videoIndex = Math.round(progress * 0.8 * (videos.length - 1));
        
        if (videoIndex !== currentVideoIndex) {
          setCurrentVideoIndex(videoIndex);
        }
      }, 50); // 50ms debounce for smooth scrolling
    });

    return () => {
      unsubscribe();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [scrollYProgress, currentVideoIndex, videos.length, showOverlay]);

  // Separate effect for video play/pause control - only when video index changes
  useEffect(() => {
    if (videosLoaded && !showOverlay) {
      setIsPlaying(prev => {
        const newState: { [key: string]: boolean } = {};
        videos.forEach((video, index) => {
          newState[video.id] = index === currentVideoIndex;
        });
        return newState;
      });
    } else {
      // If overlay is showing or videos not loaded, pause all videos
      setIsPlaying(prev => {
        const newState: { [key: string]: boolean } = {};
        videos.forEach((video) => {
          newState[video.id] = false;
        });
        return newState;
      });
    }
  }, [currentVideoIndex, showOverlay, videosLoaded, videos]);

  // Snap to video center when scrolling stops
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
      const handleScrollEnd = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const targetIndex = Math.round(videoProgress * 0.8 * (videos.length - 1));
          if (targetIndex !== currentVideoIndex) {
            setCurrentVideoIndex(targetIndex);
          }
        }, 150);
      };    const unsubscribe = scrollYProgress.on("change", handleScrollEnd);
    
    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [videoProgress, currentVideoIndex, scrollYProgress, videos.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black"
      style={{ height: `${(videos.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport for videos that only activates when section is in view */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Progress indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Video navigation dots */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
          {videos.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentVideoIndex ? 'bg-white' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Video container with performance optimizations */}
        <motion.div
          ref={videosRef}
          className="flex h-full"
          style={{ 
            x: x.get() ? `${x.get()}vw` : '0vw',
            willChange: 'transform'
          }}
        >
          {/* Section title overlay - only shows initially */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-30"
            animate={{ 
              opacity: showOverlay ? 1 : 0,
              pointerEvents: showOverlay ? 'auto' : 'none'
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center text-white">
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                Nos Vidéos
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
              >
                Découvrez notre travail à travers nos conférences, formations et concours d'innovation
              </motion.p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60"
              >
                <p className="text-sm mb-2">Commencez à défiler pour naviguer</p>
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="min-w-full h-full relative flex items-center justify-center"
            >
              {/* Video player with static src for better performance */}
              <div className="relative w-full h-full max-w-6xl mx-auto">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?controls=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&loop=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ 
                    willChange: 'auto',
                    transform: 'translateZ(0)' 
                  }}
                />
                
                {/* Play/Pause overlay for better control */}
                {videosLoaded && !showOverlay && (
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                      index === currentVideoIndex ? 'opacity-0' : 'opacity-100 bg-black/50'
                    }`}
                  >
                    {index !== currentVideoIndex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-4">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Video info overlay - positioned to not block YouTube controls */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: index === currentVideoIndex && !showOverlay ? 1 : 0,
                  x: index === currentVideoIndex && !showOverlay ? 0 : -50
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-8 left-8 max-w-md z-20 pointer-events-none"
              >
                <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  {/* Category badge */}
                  <motion.div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${
                      categoryColors[video.category]
                    } mb-4`}
                  >
                    {categoryLabels[video.category]}
                  </motion.div>

                  {/* Title and description */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </motion.div>

              {/* Navigation arrows */}
              {index > 0 && (
                <motion.button
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300 z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = containerRef.current;
                    if (container) {
                      const targetScroll = ((index - 1) / (videos.length - 1)) * (container.scrollHeight - window.innerHeight);
                      window.scrollTo({ top: targetScroll + window.innerHeight * 2, behavior: 'smooth' });
                    }
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}

              {index < videos.length - 1 && (
                <motion.button
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300 z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = containerRef.current;
                    if (container) {
                      const targetScroll = ((index + 1) / (videos.length - 1)) * (container.scrollHeight - window.innerHeight);
                      window.scrollTo({ top: targetScroll + window.innerHeight * 2, behavior: 'smooth' });
                    }
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-40"
          animate={{ 
            opacity: currentVideoIndex < videos.length - 1 ? 1 : 0 
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm opacity-70">Continuez à défiler pour la vidéo suivante</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* End of video section indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-40"
          animate={{ 
            opacity: currentVideoIndex === videos.length - 1 && videoProgress > 0.6 ? 1 : 0 
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm opacity-70">Continuez pour découvrir nos partenaires</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Video counter */}
        <div className="absolute top-8 right-8 text-white z-40">
          <span className="text-2xl font-bold">{currentVideoIndex + 1}</span>
          <span className="text-white/60"> / {videos.length}</span>
        </div>
      </div>
    </div>
  );
}
