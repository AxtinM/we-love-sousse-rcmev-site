import { getVideoBySlug, getVideos, Video } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

interface VideoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getVideoEmbedUrl(video: Video) {
  switch (video.videoType) {
    case 'YouTube':
      return `https://www.youtube.com/embed/${video.embedIdOrUrl}`;
    case 'Vimeo':
      return `https://player.vimeo.com/video/${video.embedIdOrUrl}`;
    case 'Direct':
      return video.embedIdOrUrl;
    default:
      return '';
  }
}

export async function generateStaticParams() {
  try {
    const videos = await getVideos();
    return videos.map((video) => ({
      slug: video.slug,
    }));
  } catch (error) {
    console.warn('Failed to fetch videos for static generation:', error);
    return [];
  }
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const video = await getVideoBySlug(resolvedParams.slug);
  
  if (!video) {
    return {
      title: 'Vidéo non trouvée | We Love Sousse',
    };
  }

  return {
    title: `${video.title} | We Love Sousse`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: video.thumbnail?.data ? [
        {
          url: `http://localhost:1337${video.thumbnail.data.attributes.url}`,
          alt: video.thumbnail.data.attributes.alternativeText || video.title,
        }
      ] : [],
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const resolvedParams = await params;
  const video = await getVideoBySlug(resolvedParams.slug);

  if (!video) {
    notFound();
  }

  const embedUrl = getVideoEmbedUrl(video);

  return (
    <article className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-dark">
              {video.title}
            </h1>
            {video.description && (
              <p className="text-xl text-neutral">
                {video.description}
              </p>
            )}
          </header>

          {/* Video */}
          <div className="mb-8">
            {embedUrl && (
              <div className="aspect-video w-full max-w-4xl mx-auto bg-surface rounded-lg overflow-hidden shadow-lg">
                {video.videoType === 'Direct' ? (
                  <video
                    controls
                    className="w-full h-full"
                    poster={video.thumbnail?.data ? `http://localhost:1337${video.thumbnail.data.attributes.url}` : undefined}
                  >
                    <source src={embedUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas les vidéos HTML5.
                  </video>
                ) : (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                )}
              </div>
            )}
          </div>

          {/* Video info */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-neutral">
              <span className="px-3 py-1 bg-secondary text-white rounded-full">
                {video.videoType}
              </span>
              <span>
                Publié le {new Date(video.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }
