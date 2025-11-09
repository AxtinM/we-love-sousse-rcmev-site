'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ShoppingBagIcon, TagIcon, MapPinIcon } from '@heroicons/react/24/outline';
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 0
  });

  useEffect(() => {
    fetchProducts(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const fetchProducts = async (page: number, category: string = 'all') => {
    setLoading(true);
    try {
      let url = `${getStrapiURL()}/products?populate=*&pagination[page]=${page}&pagination[pageSize]=12&sort=featured:desc,publishedAt:desc`;
      
      if (category !== 'all') {
        url += `&filters[category][$eq]=${category}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data: ProductsResponse = await response.json();
        setProducts(data.data);
        setPagination(data.meta.pagination);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (product: Product) => {
    if (!product.images || product.images.length === 0) return '/images/default-product.jpg';
    
    const image = product.images[0];
    const formats = image.formats;
    
    // Server-side: use internal Docker hostname
    if (typeof window === 'undefined') {
      const internalUrl = process.env.STRAPI_URL || process.env.STRAPI_INTERNAL_URL || 'http://cms:1337/api';
      const baseUrl = internalUrl.replace('/api', '');
      return `${baseUrl}${formats.medium?.url || formats.large?.url || formats.small?.url || image.url}`;
    }
    
    // Client-side: use public URL
    const baseUrl = getStrapiURL().replace('/api', '');
    return `${baseUrl}${formats.medium?.url || formats.large?.url || formats.small?.url || image.url}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', { 
      style: 'currency', 
      currency: 'TND',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-700" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <ShoppingBagIcon className="w-12 h-12 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Nos Produits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 font-light">
              Découvrez les créations artisanales de nos centres de production
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <TagIcon className="w-5 h-5" />
              <span className="font-semibold">Commerce Équitable • Made in Tunisia</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {setSelectedCategory('all'); setCurrentPage(1);}}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous les produits
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {setSelectedCategory(key); setCurrentPage(1);}}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun produit trouvé</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {selectedCategory !== 'all' ? 'Aucun produit dans cette catégorie pour le moment' : 'Nos produits arrivent bientôt !'}
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => {setSelectedCategory('all'); setCurrentPage(1);}}
                  className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  Voir tous les produits
                </button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Results info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <p className="text-gray-600">
                  {selectedCategory !== 'all' ? (
                    <>Produits dans "<span className="font-semibold text-gray-900">{categoryLabels[selectedCategory as keyof typeof categoryLabels]}</span>" • </>
                  ) : null}
                  <span className="font-semibold">{pagination.total}</span> produit{pagination.total > 1 ? 's' : ''} disponible{pagination.total > 1 ? 's' : ''}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/produits/${product.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={getImageUrl(product)}
                            alt={product.images?.[0]?.alternativeText || product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Category badge */}
                          <div className={`absolute top-4 left-4 bg-gradient-to-r ${categoryColors[product.category]} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                            {categoryLabels[product.category]}
                          </div>
                          
                          {/* Featured badge */}
                          {product.featured && (
                            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              ⭐ VEDETTE
                            </div>
                          )}
                          
                          {/* Stock status */}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">ÉPUISÉ</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          {product.productionCenter && (
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {product.productionCenter}
                              {product.region && ` • ${product.region}`}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-emerald-600">
                              {formatPrice(product.price)}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.inStock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.inStock ? 'En stock' : 'Épuisé'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pageCount > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
