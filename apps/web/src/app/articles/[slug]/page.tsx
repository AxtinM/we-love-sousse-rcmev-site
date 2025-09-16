'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarDaysIcon, ChevronLeftIcon, ClockIcon } from '@heroicons/react/24/outline';

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

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?populate=*&filters[slug][$eq]=${params.slug}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            setArticle(data.data[0]);
          } else {
            setError('Article non trouvé');
          }
        } else {
          setError('Erreur lors du chargement de l\'article');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchArticle();
    }
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (article: Article) => {
    if (!article.coverImage) return null;
    
    const formats = article.coverImage.formats;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337'}${
      formats.large?.url || formats.medium?.url || formats.small?.url || article.coverImage.url
    }`;
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">Désolé, cet article n'existe pas ou a été supprimé.</p>
          <Link
            href="/articles"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(article);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative">
        {imageUrl && (
          <div className="h-96 lg:h-[500px] relative overflow-hidden">
            <img
              src={imageUrl}
              alt={article.coverImage?.alternativeText || article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/articles"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-2" />
                Retour aux articles
              </Link>
              
              <h1 className="text-4xl lg:text-5xl font-medium mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center">
                  <CalendarDaysIcon className="h-5 w-5 mr-2" />
                  {formatDate(article.publishedAt)}
                </div>
                {article.content && (
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {estimateReadTime(article.content)} min de lecture
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {article.excerpt && (
              <div className="text-xl text-gray-600 font-medium leading-relaxed mb-8 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                {article.excerpt}
              </div>
            )}
            
            {article.content ? (
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="text-gray-600 text-center py-8">
                <p>Le contenu de cet article sera bientôt disponible.</p>
              </div>
            )}
          </motion.article>
          
          {/* Back to Articles Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link
              href="/articles"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-2" />
              Découvrir plus d'articles
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
