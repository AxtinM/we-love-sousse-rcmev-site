import { getVideos } from "@/lib/api";
import { Metadata } from "next";
import Link from "next/link";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

export const metadata: Metadata = {
  title: "Vidéos | We Love Sousse",
  description: "Découvrez nos vidéos sur Sousse et la Tunisie",
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12 text-neutral-dark">Vidéos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Link
                key={video.slug}
                href={`/videos/${video.slug}`}
                className="group block bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {video.thumbnail?.data && (
                  <img
                    src={`http://localhost:1337${video.thumbnail.data.attributes.url}`}
                    alt={video.thumbnail.data.attributes.alternativeText || video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors text-neutral-dark">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="text-neutral mb-4 line-clamp-3">
                      {video.description}
                    </p>
                  )}
                  <div className="text-sm text-secondary font-medium">
                    {video.videoType}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {videos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral text-lg">Aucune vidéo disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
