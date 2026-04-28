'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  getArticleBySlug,
  getStrapiMediaAltText,
  getStrapiMediaUrl,
  type Article,
} from '@/lib/api';

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    if (!slug) {
      setError('Publication non trouvée');
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      try {
        const data = await getArticleBySlug(slug);
        if (!data) {
          setError('Publication non trouvée');
          setArticle(null);
          return;
        }

        setArticle(data);
        setError(null);
      } catch (fetchError) {
        console.error('Error fetching publication:', fetchError);
        setError('Erreur lors du chargement de la publication');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">Publication non trouvée</h1>
          <p className="text-gray-600 mb-8">Désolé, cette publication n'existe pas ou a été supprimée.</p>
          <Link
            href="/articles"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Retour aux publications
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getStrapiMediaUrl(article.coverImage);
  const imageAlt = getStrapiMediaAltText(article.coverImage, article.title);
  const publishedDate = article.publishedAt || article.createdAt;
  const isNewsletter = article.publicationType === 'newsletter';
  const summary = isNewsletter ? article.resume || article.excerpt : article.excerpt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <section className="relative">
        {imageUrl && (
          <div className="h-72 sm:h-80 lg:h-[500px] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>
          </div>
        )}

        <div className={`${imageUrl ? 'absolute bottom-0 left-0 right-0' : ''} p-6 sm:p-8 ${imageUrl ? 'text-white' : 'text-gray-900'}`}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/articles"
                className={`inline-flex items-center transition-colors mb-4 ${imageUrl ? 'text-white/85 hover:text-white' : 'text-emerald-700 hover:text-emerald-800'}`}
              >
                <ChevronLeftIcon className="h-5 w-5 mr-2" />
                Retour aux publications
              </Link>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${imageUrl ? 'bg-white/20 text-white border border-white/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}`}>
                  {isNewsletter ? 'Newsletter' : 'Publication'}
                </span>
                {isNewsletter && article.numero && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${imageUrl ? 'bg-cyan-200/30 text-cyan-50 border border-cyan-100/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-100'}`}>
                    Numéro {article.numero}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">{article.title}</h1>

              <div className={`flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base ${imageUrl ? 'text-white/90' : 'text-gray-600'}`}>
                {publishedDate && (
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 mr-2" />
                    {formatDate(publishedDate)}
                  </div>
                )}
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

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {isNewsletter && article.link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-teal-700 transition-all duration-300"
              >
                Ouvrir la newsletter
                <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
              </a>
            </motion.div>
          )}

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
            {summary && (
              <div className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed mb-8 p-5 sm:p-6 bg-emerald-50 rounded-2xl border-l-4 border-emerald-500 not-prose">
                {summary}
              </div>
            )}

            {article.content ? (
              <ReactMarkdown
                components={{
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
                <p>
                  {isNewsletter
                    ? 'Le contenu détaillé de cette newsletter n\'est pas encore disponible ici.'
                    : 'Le contenu de cette publication sera bientôt disponible.'}
                </p>
              </div>
            )}
          </motion.article>

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
              Retour à toutes les publications
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
