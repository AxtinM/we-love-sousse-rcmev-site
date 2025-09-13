import type { Metadata } from 'next';
import { getPhotoAlbums } from '@/lib/api';
import Link from 'next/link';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

export const metadata: Metadata = {
  title: 'Albums Photos - We Love Sousse',
  description: 'Découvrez nos albums photos de Sousse et ses événements.',
};

export default async function PhotosPage() {
  const albums = await getPhotoAlbums();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-dark mb-8 text-center">Albums Photos</h1>
          
          {albums && albums.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/photos/${album.slug}`}
                  className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {album.coverImage?.data && (
                    <div className="aspect-video bg-neutral-light">
                      <img
                        src={album.coverImage.data.attributes.url}
                        alt={album.coverImage.data.attributes.alternativeText || album.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-dark mb-2">
                      {album.title}
                    </h2>
                    {album.description && (
                      <p className="text-neutral text-sm mb-3 line-clamp-3">
                        {album.description}
                      </p>
                    )}
                    <div className="text-sm text-neutral">
                      {album.photos?.data?.length || 0} photo(s)
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral text-lg">Aucun album photo disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
