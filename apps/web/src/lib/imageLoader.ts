export default function strapiImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If running server-side (in Docker), rewrite localhost URLs to use cms hostname
  if (typeof window === 'undefined' && src.includes('localhost:1337')) {
    src = src.replace('localhost:1337', 'cms:1337');
  }
  
  // Return the URL with width and quality parameters
  // Next.js will use this to fetch and optimize the image
  return `${src}?w=${width}&q=${quality || 75}`;
}
