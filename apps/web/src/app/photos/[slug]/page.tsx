import { getPhotoAlbumBySlug, getPhotoAlbums } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

interface PhotoAlbumPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const photoAlbums = await getPhotoAlbums();
    return photoAlbums.map((album) => ({
      slug: album.slug,
    }));
  } catch (error) {
    console.warn('Failed to fetch photo albums for static generation:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PhotoAlbumPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const album = await getPhotoAlbumBySlug(resolvedParams.slug);
  
  if (!album) {
    return {
      title: 'Album non trouvé | We Love Sousse',
    };
  }

  return {
    title: `${album.title} | We Love Sousse`,
    description: album.description,
    openGraph: {
      title: album.title,
      description: album.description,
      images: album.coverImage?.data ? [
        {
          url: `http://localhost:1337${album.coverImage.data.attributes.url}`,
          alt: album.coverImage.data.attributes.alternativeText || album.title,
        }
      ] : [],
    },
  };
}

export default async function PhotoAlbumPage({ params }: PhotoAlbumPageProps) {
  const resolvedParams = await params;
  const album = await getPhotoAlbumBySlug(resolvedParams.slug);

  if (!album) {
    notFound();
  }

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
              {/* Album Header */}
              <div className="p-8 border-b border-neutral-light">
                <h1 className="text-4xl font-bold text-neutral-dark mb-4">
                  {album.title}
                </h1>
                {album.description && (
                  <p className="text-xl text-neutral mb-4">
                    {album.description}
                  </p>
                )}
                <div className="text-sm text-neutral">
                  {album.photos?.data?.length || 0} photo(s)
                </div>
              </div>          {/* Photo Gallery */}
          {album.photos?.data && album.photos.data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.photos.data.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={`http://localhost:1337${photo.attributes.url}`}
                    alt={photo.attributes.alternativeText || `Photo ${index + 1} de ${album.title}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {(!album.photos?.data || album.photos.data.length === 0) && (
            <div className="text-center py-12">
              <p className="text-neutral text-lg">Aucune photo disponible dans cet album.</p>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    );
  }
