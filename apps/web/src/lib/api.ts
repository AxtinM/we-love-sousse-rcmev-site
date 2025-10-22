/**
 * Get the appropriate Strapi API URL based on environment
 * - Server-side (Docker): uses internal service name
 * - Client-side (Browser): uses public URL
 */
function getStrapiURL(): string {
  // Server-side: use internal Docker service name
  if (typeof window === 'undefined') {
    return process.env.STRAPI_URL || process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://cms:1337/api';
  }
  
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';
}

// Use internal URL for server-side requests (Docker network) and external URL for client-side
const STRAPI_API_URL = getStrapiURL();
const STRAPI_API_TOKEN = process.env.STRAPI_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Content Type Interfaces
export interface Article extends StrapiAttributes {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
}

export interface Partner extends StrapiAttributes {
  name: string;
  url?: string;
  order: number;
  logo?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
}

// API Functions
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`;

  console.log('Fetching:', url);
  console.log('Token exists:', !!STRAPI_API_TOKEN);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Only add auth header if token exists and endpoint requires auth
  if (STRAPI_API_TOKEN && !endpoint.includes('/partners')) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    console.error('API Error:', response.status, response.statusText, 'on', url);
    throw new Error(`API call failed: ${response.status} ${response.statusText} on ${url}`);
  }

  return response.json();
}

// Content fetching functions
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Article[]>>('/articles?populate=*&sort=publishedAt:desc');
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetchAPI<StrapiResponse<Article[]>>(`/articles?filters[slug][$eq]=${slug}&populate=*`);
    return response.data?.[0] || null;
  } catch (error) {
    console.warn('Failed to fetch article by slug:', error);
    return null;
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Partner[]>>('/partners?populate=*&sort=order:asc');
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch partners:', error);
    // Return empty array if API fails, so the app still works
    return [];
  }
}

// Helper function to get full URL for Strapi media
export function getStrapiMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  // Server-side: use internal Docker hostname
  if (typeof window === 'undefined') {
    const internalUrl = process.env.STRAPI_URL || process.env.STRAPI_INTERNAL_URL || 'http://cms:1337/api';
    const baseUrl = internalUrl.replace('/api', '');
    return `${baseUrl}${url}`;
  }
  
  // Client-side: use public URL
  const baseUrl = getStrapiURL().replace('/api', '');
  return `${baseUrl}${url}`;
}

// Export the getStrapiURL function for use in components
export { getStrapiURL };
