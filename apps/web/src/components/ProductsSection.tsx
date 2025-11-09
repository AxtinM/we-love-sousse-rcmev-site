'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBagIcon, TagIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { getStrapiURL } from '@/lib/api';

interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: 'tissage' | 'huile-essentielle' | 'patisserie' | 'produit-du-terroir' | 'autre';
  productionCenter?: string;
  region?: string;
  inStock: boolean;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  images: {
    id: number;
    url: string;
    alternativeText: string;
    formats: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  }[];
}

interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const categoryLabels = {
  'tissage': 'Tissage',
  'huile-essentielle': 'Huile Essentielle',
  'patisserie': 'Pâtisserie',
  'produit-du-terroir': 'Produit du Terroir',
  'autre': 'Autre'
};

const categoryColors = {
  'tissage': 'from-purple-500 to-pink-500',
  'huile-essentielle': 'from-green-500 to-emerald-500',
  'patisserie': 'from-orange-500 to-amber-500',
  'produit-du-terroir': 'from-amber-700 to-yellow-700',
  'autre': 'from-teal-500 to-cyan-500'
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${getStrapiURL()}/products?populate=*&pagination[limit]=6&sort=featured:desc,publishedAt:desc`);
        if (response.ok) {
          const data: ProductsResponse = await response.json();
          setProducts(data.data || []);
        } else {
          console.warn('Failed to fetch products - CMS may not be available');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', { 
      style: 'currency', 
      currency: 'TND',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
  };

  const getImageUrl = (product: Product) => {
    if (!product.images || product.images.length === 0) return '/images/default-product.jpg';
    
    const image = product.images[0];
    const formats = image.formats;
    const url = formats.medium?.url || formats.large?.url || formats.small?.url || image.url;
    
    // Return full URL for Next.js Image optimization to work
    // Always use localhost:1337 for client-side rendering
    // Next.js Image optimization API will handle fetching from cms:1337 server-side
    if (url.startsWith('http')) return url;
    return `http://localhost:1337${url}`;
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50/20 relative">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="h-6 bg-teal-100 rounded-full w-40 sm:w-48 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-8 sm:h-12 bg-gray-200 rounded w-64 sm:w-96 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-48 sm:w-80 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden animate-pulse border border-gray-100/50">
                <div className="h-48 sm:h-56 bg-gray-200"></div>
                <div className="p-6 sm:p-8">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-3 sm:mb-4"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
                  <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 mb-4 sm:mb-6"></div>
                  <div className="h-4 sm:h-5 bg-gray-200 rounded w-24 sm:w-28"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50/20 relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-poppins font-medium mb-4 sm:mb-6">
            <ShoppingBagIcon className="w-4 h-4 mr-2" />
            Artisanat Local
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-poppins font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Nos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600">
              {" "}Produits Artisanaux
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 font-inter">
            Découvrez les créations uniques fabriquées avec passion dans nos centres de production régionaux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100/50 hover:border-teal-200"
            >
              <Link href={`/produits/${product.slug}`} className="block">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <Image
                    src={getImageUrl(product)}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      ⭐ En vedette
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Rupture de stock
                    </div>
                  )}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColors[product.category]}`}></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      <TagIcon className="w-3 h-3 mr-1" />
                      {categoryLabels[product.category]}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-poppins font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {product.region && (
                    <p className="text-sm text-gray-500 mb-3">
                      📍 {product.region}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-600">
                      {formatPrice(product.price)}
                    </div>
                    <div className="inline-flex items-center text-teal-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Découvrir
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/produits"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-poppins font-semibold rounded-full hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            Voir tous les produits
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
