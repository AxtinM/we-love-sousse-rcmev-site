export default function strapiImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If src is a relative path (starts with /), it's from the public directory
  // Don't apply custom loading logic, just return as-is for Next.js default handling
  if (src.startsWith('/') && !src.includes('://')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }
  
  // If running server-side (in Docker), rewrite URLs to use internal cms hostname
  if (typeof window === 'undefined') {
    if (src.includes('localhost:1337')) {
      src = src.replace('localhost:1337', 'cms:1337');
    } else if (src.includes('cms.rcmev.com')) {
      src = src.replace('https://cms.rcmev.com', 'http://cms:1337');
    }
  }
  
  // Return the URL with width and quality parameters
  // Next.js will use this to fetch and optimize the image
  return `${src}?w=${width}&q=${quality || 75}`;
}
