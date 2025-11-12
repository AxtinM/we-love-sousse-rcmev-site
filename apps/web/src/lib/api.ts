/**
 * Get the appropriate Strapi API URL based on environment
 * - Server-side (Docker): uses internal service name
 * - Client-side (Browser): uses public URL
 */
function getStrapiURL(): string {
  if (typeof window === 'undefined') {
    return process.env.STRAPI_URL || process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://cms:1337/api';
  }
  return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';
}

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

interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type PublicationType = 
  | 'article' 
  | 'scientifique' 
  | 'rapport' 
  | 'compte-rendu' 
  | 'newsletter' 
  | 'cartographie' 
  | 'document' 
  | 'actualite';

export interface Article extends StrapiAttributes {
  title: string;
  slug: string;
  publicationType: PublicationType;
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

export interface PressCoverage extends StrapiAttributes {
  title: string;
  source?: string;
  url: string;
  displayType: 'embed' | 'link';
  excerpt?: string;
  publishedDate?: string;
  order: number;
  thumbnail?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
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

export interface Product extends StrapiAttributes {
  name: string;
  slug: string;
  description?: string;
  price: number;
  category: 'tissage' | 'huile-essentielle' | 'patisserie' | 'produit-du-terroir' | 'autre';
  images?: StrapiMedia[];
  productionCenter?: string;
  region?: string;
  inStock: boolean;
  featured: boolean;
}

export interface ProjectStatistic extends StrapiAttributes {
  directBeneficiaries: number;
  appliedResearch: number;
  womenReached: number;
  activities: number;
  additionalStats?: any;
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`;

  console.log('Fetching:', url);
  console.log('Token exists:', !!STRAPI_API_TOKEN);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

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

export async function getArticles(type?: PublicationType): Promise<Article[]> {
  try {
    const typeFilter = type ? `&filters[publicationType][$eq]=${type}` : '';
    const response = await fetchAPI<StrapiResponse<Article[]>>(`/articles?populate=*&sort=publishedAt:desc${typeFilter}`);
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

export async function getPressCoverage(): Promise<PressCoverage[]> {
  try {
    const response = await fetchAPI<StrapiResponse<PressCoverage[]>>('/press-coverages?populate=*&sort=order:asc');
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch press coverage:', error);
    return [];
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await fetchAPI<StrapiResponse<Partner[]>>('/partners?populate=*&sort=order:asc');
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch partners:', error);
    return [];
  }
}

export async function getProducts(options?: { featured?: boolean }): Promise<Product[]> {
  try {
    const featuredFilter = options?.featured ? '&filters[featured][$eq]=true' : '';
    const response = await fetchAPI<StrapiResponse<Product[]>>(`/products?populate=*&sort=createdAt:desc${featuredFilter}`);
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetchAPI<StrapiResponse<Product[]>>(`/products?filters[slug][$eq]=${slug}&populate=*`);
    return response.data?.[0] || null;
  } catch (error) {
    console.warn('Failed to fetch product by slug:', error);
    return null;
  }
}

export async function getProjectStatistics(): Promise<ProjectStatistic | null> {
  try {
    const response = await fetchAPI<StrapiResponse<ProjectStatistic>>('/project-statistics');
    if (Array.isArray(response.data)) {
      return response.data[0] || null;
    }
    return response.data || null;
  } catch (error) {
    console.warn('Failed to fetch project statistics:', error);
    return null;
  }
}

export function getStrapiMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  if (typeof window === 'undefined') {
    return `http://cms:1337${url}`;
  }
  
  return `https://cms.rcmev.com${url}`;
}

export { getStrapiURL };
