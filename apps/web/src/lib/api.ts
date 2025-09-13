// Use internal URL for server-side requests (Docker network) and external URL for client-side
const STRAPI_API_URL = typeof window === 'undefined' 
  ? (process.env.STRAPI_INTERNAL_URL || 'http://cms:1337/api')  // Server-side
  : (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api'); // Client-side
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

interface StrapiSingleResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

interface StrapiAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Content Type Interfaces
export interface Global extends StrapiAttributes {
  siteName: string;
  siteDescription?: string;
  logo?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  favicon?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

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

export interface Video extends StrapiAttributes {
  title: string;
  slug: string;
  description?: string;
  videoType: 'YouTube' | 'Vimeo' | 'Direct';
  embedIdOrUrl: string;
  thumbnail?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
}

export interface PhotoAlbum extends StrapiAttributes {
  title: string;
  slug: string;
  description?: string;
  coverImage?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  photos?: {
    data?: Array<{
      attributes: {
        url: string;
        alternativeText?: string;
      };
    }>;
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

export interface Stat extends StrapiAttributes {
  label: string;
  value: string;
  order: number;
}

export interface ProjectPage extends StrapiAttributes {
  title: string;
  body?: string;
}

export interface WlsPage extends StrapiAttributes {
  title: string;
  body?: string;
}

export interface Contact extends StrapiAttributes {
  email: string;
  address?: string;
  googleMapsUrl?: string;
  phones?: Array<{
    number: string;
    label?: string;
  }>;
}

// API Functions
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Content fetching functions
export async function getGlobal(): Promise<Global> {
  try {
    const response = await fetchAPI<StrapiSingleResponse<Global>>('/global?populate=*');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch global data:', error);
    return {
      id: 0,
      documentId: 'fallback',
      siteName: 'We Love Sousse',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Article[]>>('/articles?populate=*&sort=publishedAt:desc');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetchAPI<StrapiResponse<Article[]>>(`/articles?filters[slug][$eq]=${slug}&populate=*`);
    return response.data[0] || null;
  } catch (error) {
    console.warn('Failed to fetch article by slug:', error);
    return null;
  }
}

export async function getVideos(): Promise<Video[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Video[]>>('/videos?populate=*&sort=createdAt:desc');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch videos:', error);
    return [];
  }
}

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const response = await fetchAPI<StrapiResponse<Video[]>>(`/videos?filters[slug][$eq]=${slug}&populate=*`);
    return response.data[0] || null;
  } catch (error) {
    console.warn('Failed to fetch video by slug:', error);
    return null;
  }
}

export async function getPhotoAlbums(): Promise<PhotoAlbum[]> {
  try {
    const response = await fetchAPI<StrapiResponse<PhotoAlbum[]>>('/photo-albums?populate=*&sort=createdAt:desc');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch photo albums:', error);
    return [];
  }
}

export async function getPhotoAlbumBySlug(slug: string): Promise<PhotoAlbum | null> {
  try {
    const response = await fetchAPI<StrapiResponse<PhotoAlbum[]>>(`/photo-albums?filters[slug][$eq]=${slug}&populate=*`);
    return response.data[0] || null;
  } catch (error) {
    console.warn('Failed to fetch photo album by slug:', error);
    return null;
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Partner[]>>('/partners?populate=*&sort=order:asc');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch partners:', error);
    return [];
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Stat[]>>('/stats?sort=order:asc');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch stats:', error);
    return [];
  }
}

export async function getProjectPage(): Promise<ProjectPage> {
  try {
    const response = await fetchAPI<StrapiSingleResponse<ProjectPage>>('/project-page');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch project page:', error);
    return {
      id: 0,
      documentId: 'fallback',
      title: 'Projet',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function getWlsPage(): Promise<WlsPage> {
  try {
    const response = await fetchAPI<StrapiSingleResponse<WlsPage>>('/wls-page');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch WLS page:', error);
    return {
      id: 0,
      documentId: 'fallback',
      title: 'Page non trouvée',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function getContact(): Promise<Contact> {
  try {
    const response = await fetchAPI<StrapiSingleResponse<Contact>>('/contact?populate=*');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch contact:', error);
    return {
      id: 0,
      documentId: 'fallback',
      email: 'contact@welovesousse.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

// Helper function to get full URL for Strapi media
export function getStrapiMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337'}${url}`;
}
