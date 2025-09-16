import { getArticleBySlug } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const article = await getArticleBySlug(resolvedParams.slug);
    
    if (!article) {
      return {
        title: 'Article non trouvé - We Love Sousse',
      };
    }

    return {
      title: `${article.title} - We Love Sousse`,
      description: article.excerpt || article.seo?.metaDescription,
      openGraph: {
        title: article.seo?.metaTitle || article.title,
        description: article.seo?.metaDescription || article.excerpt,
        images: article.seo?.ogImage?.data ? [{
          url: article.seo.ogImage.data.attributes.url,
          alt: article.seo.ogImage.data.attributes.alternativeText || article.title
        }] : undefined,
      },
    };
  } catch (error) {
    console.warn('Failed to generate metadata for article:', error);
    return {
      title: 'Article - We Love Sousse',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    const resolvedParams = await params;
    const article = await getArticleBySlug(resolvedParams.slug);

    if (!article) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header with back navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour à l'accueil
            </a>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <article className="max-w-4xl mx-auto">
            {/* Cover Image */}
            {article.coverImage?.data && (
              <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={article.coverImage.data.attributes.url}
                  alt={article.coverImage.data.attributes.alternativeText || article.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                {article.title}
              </h1>
              
              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>
              )}
              
              <div className="flex items-center text-sm text-gray-500 mb-8">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  We Love Sousse
                </span>
                {article.publishedAt && (
                  <>
                    <span className="mx-4">•</span>
                    <time dateTime={article.publishedAt} className="text-gray-500">
                      {formatDate(article.publishedAt)}
                    </time>
                  </>
                )}
              </div>
            </header>

            {/* Article Content */}
            {article.content && (
              <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-img:rounded-xl prose-img:shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            )}

            {/* Footer with navigation */}
            <div className="mt-16 pt-12 border-t border-gray-200 flex justify-between items-center">
              <a
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
              >
                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour à l'accueil
              </a>
              <a
                href="/articles"
                className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium text-sm"
              >
                Voir tous les articles
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
