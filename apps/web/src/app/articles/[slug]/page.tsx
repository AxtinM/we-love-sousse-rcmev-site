'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CalendarDaysIcon, ChevronLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getClientStrapiURL, getClientStrapiBaseURL } from '@/lib/utils';

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
        const apiUrl = getClientStrapiURL();
        const response = await fetch(
          `${apiUrl}/articles?populate=*&filters[slug][$eq]=${params.slug}`
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
    const baseUrl = getClientStrapiBaseURL();
    return `${baseUrl}${
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
            <Image
              src={imageUrl}
              alt={article.coverImage?.alternativeText || article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
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
            className="prose prose-lg lg:prose-xl max-w-none
              prose-headings:font-poppins prose-headings:text-gray-900 prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-inter
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-em:text-gray-800 prose-em:italic
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:my-2 prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:bg-emerald-50/50 prose-blockquote:rounded-r-lg
              prose-blockquote:text-gray-700 prose-blockquote:italic
              prose-a:text-emerald-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-emerald-700 hover:prose-a:underline
              prose-code:text-emerald-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-6
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8"
          >
            {article.excerpt && (
              <div className="text-xl text-gray-600 font-medium leading-relaxed mb-8 p-6 bg-emerald-50 rounded-2xl border-l-4 border-emerald-500 not-prose">
                {article.excerpt}
              </div>
            )}
            
            {article.content ? (
              <ReactMarkdown
                components={{
                  // Custom rendering for images to use Next.js Image component
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      className="rounded-2xl shadow-lg my-8 w-full"
                      loading="lazy"
                    />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            ) : (
              <div className="text-gray-600 text-center py-8 not-prose">
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
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
