/**
 * Get the appropriate Payload API URL based on environment
 * - Server-side (Docker): uses internal service name
 * - Client-side (Browser): uses public URL
 */
function getPayloadURL(): string {
  // Server-side: use internal Docker service name
  if (typeof window === 'undefined') {
    return process.env.PAYLOAD_URL || process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://cms:1337/api';
  }
  
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:1337/api';
}

// Use internal URL for server-side requests (Docker network) and external URL for client-side
const PAYLOAD_API_URL = getPayloadURL();
const PAYLOAD_API_TOKEN = process.env.PAYLOAD_TOKEN;

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface PayloadAttributes {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Content Type Interfaces
export type PublicationType = 
  | 'article' 
  | 'scientifique' 
  | 'rapport' 
  | 'compte-rendu' 
  | 'newsletter' 
  | 'cartographie' 
  | 'document' 
  | 'actualite';

export interface Media {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
  thumbnailURL?: string;
  sizes?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    card?: {
      url: string;
      width: number;
      height: number;
    };
    featured?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface Article extends PayloadAttributes {
  title: string;
  slug: string;
  publicationType: PublicationType;
  excerpt?: string;
  content?: any; // Lexical rich text JSON
  coverImage?: Media | string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: Media | string;
  };
  _status?: 'draft' | 'published';
}

export interface PressCoverage extends PayloadAttributes {
  title: string;
  source?: string;
  url: string;
  displayType: 'embed' | 'link';
  excerpt?: string;
  publishedDate?: string;
  order: number;
  thumbnail?: Media | string;
  _status?: 'draft' | 'published';
}

export interface Partner extends PayloadAttributes {
  name: string;
  url?: string;
  order: number;
  logo?: Media | string;
  _status?: 'draft' | 'published';
}

export interface Product extends PayloadAttributes {
  name: string;
  slug: string;
  description?: any; // Lexical rich text JSON
  price: number;
  category: 'tissage' | 'huile-essentielle' | 'patisserie' | 'produit-du-terroir' | 'autre';
  images: (Media | string)[];
  productionCenter?: string;
  region?: string;
  inStock: boolean;
  featured: boolean;
  _status?: 'draft' | 'published';
}

export interface ProjectStatistics {
  directBeneficiaries: number;
  appliedResearch: number;
  womenReached: number;
  activities: number;
  additionalStats?: any;
  updatedAt: string;
}

// API Functions
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${PAYLOAD_API_URL}${endpoint}`;

  console.log('Fetching:', url);
  console.log('Token exists:', !!PAYLOAD_API_TOKEN);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Add auth header if token exists
  if (PAYLOAD_API_TOKEN) {
    headers.Authorization = `Bearer ${PAYLOAD_API_TOKEN}`;
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
export async function getArticles(type?: PublicationType): Promise<Article[]> {
  try {
    const typeFilter = type ? `&where[publicationType][equals]=${type}` : '';
    const response = await fetchAPI<PayloadResponse<Article>>(`/articles?depth=2&sort=-createdAt${typeFilter}`);
    return response.docs || [];
  } catch (error) {
    console.warn('Failed to fetch articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetchAPI<PayloadResponse<Article>>(`/articles?where[slug][equals]=${slug}&depth=2`);
    return response.docs?.[0] || null;
  } catch (error) {
    console.warn('Failed to fetch article by slug:', error);
    return null;
  }
}

export async function getPressCoverage(): Promise<PressCoverage[]> {
  try {
    const response = await fetchAPI<PayloadResponse<PressCoverage>>('/press-coverages?depth=2&sort=order');
    return response.docs || [];
  } catch (error) {
    console.warn('Failed to fetch press coverage:', error);
    return [];
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await fetchAPI<PayloadResponse<Partner>>('/partners?depth=2&sort=order');
    return response.docs || [];
  } catch (error) {
    console.warn('Failed to fetch partners:', error);
    // Return empty array if API fails, so the app still works
    return [];
  }
}

export async function getProducts(options?: { featured?: boolean }): Promise<Product[]> {
  try {
    const featuredFilter = options?.featured ? '&where[featured][equals]=true' : '';
    const response = await fetchAPI<PayloadResponse<Product>>(`/products?depth=2&sort=-createdAt${featuredFilter}`);
    return response.docs || [];
  } catch (error) {
    console.warn('Failed to fetch products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetchAPI<PayloadResponse<Product>>(`/products?where[slug][equals]=${slug}&depth=2`);
    return response.docs?.[0] || null;
  } catch (error) {
    console.warn('Failed to fetch product by slug:', error);
    return null;
  }
}

export async function getProjectStatistics(): Promise<ProjectStatistics | null> {
  try {
    const response = await fetchAPI<ProjectStatistics>('/globals/project-statistics');
    return response;
  } catch (error) {
    console.warn('Failed to fetch project statistics:', error);
    return null;
  }
}

// Helper function to get full URL for Payload media
export function getPayloadMediaUrl(mediaOrUrl?: Media | string): string {
  if (!mediaOrUrl) return '';
  
  // If it's already a full URL string, return it
  if (typeof mediaOrUrl === 'string') {
    if (mediaOrUrl.startsWith('http')) return mediaOrUrl;
    // If it's a relative path, make it absolute
    if (typeof window === 'undefined') {
      return `http://cms:1337${mediaOrUrl}`;
    }
    return `https://cms.rcmev.com${mediaOrUrl}`;
  }
  
  // If it's a Media object, get the URL
  const url = mediaOrUrl.url;
  if (!url) return '';
  
  if (url.startsWith('http')) return url;
  
  // Return full URL for Next.js Image optimization
  // Server-side (Docker): use internal cms hostname
  if (typeof window === 'undefined') {
    return `http://cms:1337${url}`;
  }
  
  // Client-side: use public production URL
  return `https://cms.rcmev.com${url}`;
}

// Export the getPayloadURL function for use in components
export { getPayloadURL };
