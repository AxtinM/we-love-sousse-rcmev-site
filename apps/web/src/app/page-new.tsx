import { getGlobal, getArticles, getPartners, getStats } from "@/lib/api";

export default async function Home() {
  // Fetch data on the server
  const [global, articles, partners, stats] = await Promise.all([
    getGlobal(),
    getArticles(),
    getPartners(),
    getStats(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {global.siteName || "We Love Sousse"}
          </h1>
          {global.siteDescription && (
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {global.siteDescription}
            </p>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {articles.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-dark mb-12 text-center">
              Derniers Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article) => (
                <div key={article.slug} className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                    <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-neutral text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <a
                      href={`/articles/${article.slug}`}
                      className="text-primary hover:text-primary-dark font-medium text-sm"
                    >
                      Lire la suite →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-dark mb-12 text-center">
              Nos Partenaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center justify-center">
                  {partner.logo?.data ? (
                    <img
                      src={partner.logo.data.attributes.url}
                      alt={partner.logo.data.attributes.alternativeText || partner.name}
                      className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <div className="text-neutral text-center">
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
