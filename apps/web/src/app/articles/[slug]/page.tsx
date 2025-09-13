import { getArticleBySlug, getArticles } from "@/lib/api";
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

export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.warn('Failed to generate static params for articles:', error);
    // Return empty array to allow build to continue without static params
    return [];
  }
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <article className="bg-surface rounded-lg shadow-lg overflow-hidden">
              {article.coverImage?.data && (
                <div className="aspect-video bg-neutral-light">
                  <img
                    src={article.coverImage.data.attributes.url}
                    alt={article.coverImage.data.attributes.alternativeText || article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <header className="mb-6">
                  <h1 className="text-4xl font-bold text-neutral-dark mb-4">
                    {article.title}
                  </h1>
                  
                  {article.excerpt && (
                    <p className="text-xl text-neutral mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm text-neutral">
                    <span>We Love Sousse</span>
                    {article.publishedAt && (
                      <>
                        <span className="mx-2">•</span>
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                      </>
                    )}
                  </div>
                </header>
                
                {article.content && (
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}