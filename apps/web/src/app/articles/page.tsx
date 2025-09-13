import type { Metadata } from 'next';
import { getArticles } from '@/lib/api';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

export const metadata: Metadata = {
  title: 'Articles - We Love Sousse',
  description: 'Découvrez nos derniers articles sur Sousse et ses actualités.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-dark mb-8 text-center">Articles</h1>
          
          {articles && articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {article.coverImage?.data && (
                    <div className="aspect-video bg-neutral-light">
                      <img
                        src={article.coverImage.data.attributes.url}
                        alt={article.coverImage.data.attributes.alternativeText || article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-dark mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-neutral text-sm mb-3 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-sm text-neutral">
                      <span>We Love Sousse</span>
                      {article.publishedAt && (
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral text-lg">Aucun article disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
