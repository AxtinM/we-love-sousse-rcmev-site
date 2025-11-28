export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getClientStrapiURL(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';
  }
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:1337/api';
  }
  
  if (hostname === 'rcmev.com' || hostname.endsWith('.rcmev.com')) {
    return 'https://cms.rcmev.com/api';
  }
  
  return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';
}

export function getClientStrapiBaseURL(): string {
  return getClientStrapiURL().replace('/api', '');
}
