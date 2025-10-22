'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { ArrowLeftIcon, ShoppingBagIcon, MapPinIcon, TagIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ContactModal from '@/components/ContactModal';

interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: 'textiles' | 'essential-oils' | 'handicrafts' | 'pottery' | 'jewelry';
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

const categoryLabels = {
  'textiles': 'Textiles',
  'essential-oils': 'Huiles Essentielles',
  'handicrafts': 'Artisanat',
  'pottery': 'Poterie',
  'jewelry': 'Bijoux'
};

const categoryColors = {
  'textiles': 'from-purple-500 to-pink-500',
  'essential-oils': 'from-green-500 to-emerald-500',
  'handicrafts': 'from-blue-500 to-cyan-500',
  'pottery': 'from-orange-500 to-red-500',
  'jewelry': 'from-yellow-500 to-amber-500'
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slug, setSlug] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?filters[slug][$eq]=${slug}&populate=*`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const productData = data.data[0];
          setProduct(productData);
          
          // Fetch related products from same category
          if (productData.category) {
            fetchRelatedProducts(productData.category, productData.id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category: string, currentProductId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?filters[category][$eq]=${category}&filters[id][$ne]=${currentProductId}&populate=*&pagination[limit]=4`
      );
      
      if (response.ok) {
        const data = await response.json();
        setRelatedProducts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const getImageUrl = (image: any) => {
    if (!image) return '/images/default-product.jpg';
    
    const formats = image.formats;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337'}${
      formats?.large?.url || formats?.medium?.url || formats?.small?.url || image.url
    }`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', { 
      style: 'currency', 
      currency: 'TND',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
  };

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">Produit non trouvé</h2>
          <p className="text-gray-600 font-inter mb-6">Ce produit n&apos;existe pas ou n&apos;est plus disponible.</p>
          <Link 
            href="/produits"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-poppins font-medium"
          >
            Voir tous les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
            <Link 
              href="/produits" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap font-inter font-medium"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Retour</span>
            </Link>
            <span className="text-gray-400 hidden sm:inline">/</span>
            <span className="text-gray-600 text-xs sm:text-sm font-inter hidden sm:inline">{categoryLabels[product.category]}</span>
            <span className="text-gray-400 hidden sm:inline">/</span>
            <span className="text-gray-900 font-poppins font-medium text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-1"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative h-80 sm:h-96 lg:h-[500px] bg-white rounded-2xl overflow-hidden shadow-xl">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={getImageUrl(product.images[currentImageIndex])}
                      alt={product.images[currentImageIndex]?.alternativeText || product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <ShoppingBagIcon className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Navigation arrows */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                      </button>
                    </>
                  )}
                  
                  {/* Image counter */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-inter">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-emerald-500 shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={getImageUrl(image)}
                          alt={image.alternativeText || product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-2 space-y-6 lg:space-y-8"
            >
              {/* Category badge */}
              <div className={`inline-block bg-gradient-to-r ${categoryColors[product.category]} text-white px-4 py-2 rounded-full text-sm font-poppins font-medium`}>
                {categoryLabels[product.category]}
              </div>
              
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              
              {/* Price */}
              <div className="text-3xl sm:text-4xl font-poppins font-bold text-emerald-600">
                {formatPrice(product.price)}
              </div>
              
              {/* Stock status */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  {product.inStock ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-poppins font-medium">En stock</span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-poppins font-medium">Épuisé</span>
                    </>
                  )}
                </div>
                {product.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-poppins font-medium">
                    ⭐ Produit vedette
                  </span>
                )}
              </div>
              
              {/* Production info */}
              {(product.productionCenter || product.region) && (
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600" />
                    <span className="font-poppins font-semibold text-gray-900">Origine</span>
                  </div>
                  {product.productionCenter && (
                    <p className="text-gray-700 font-inter mb-1">{product.productionCenter}</p>
                  )}
                  {product.region && (
                    <p className="text-gray-600 font-inter text-sm">{product.region}</p>
                  )}
                </div>
              )}
              
              {/* Description */}
              {product.description && (
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h3 className="font-poppins font-semibold text-gray-900 mb-3">Description</h3>
                  <div className="text-gray-700 font-inter leading-relaxed prose prose-sm sm:prose max-w-none
                    prose-headings:font-poppins prose-headings:text-gray-900 
                    prose-p:text-gray-700 prose-p:my-2
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:my-2 prose-ul:list-disc prose-ul:list-inside
                    prose-ol:my-2 prose-ol:list-decimal prose-ol:list-inside
                    prose-li:text-gray-700 prose-li:my-1
                    prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown>{product.description}</ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                <h3 className="font-poppins font-semibold text-lg mb-2">Intéressé par ce produit ?</h3>
                <p className="font-inter text-emerald-100 mb-4">Contactez-nous pour plus d&apos;informations ou pour passer commande.</p>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center bg-white text-emerald-600 px-6 py-3 rounded-lg font-poppins font-medium hover:bg-emerald-50 transition-colors"
                >
                  Nous contacter
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        productName={product?.name}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
                Découvrez d&apos;autres créations de la catégorie {categoryLabels[product.category]}
              </h2>
              <p className="text-gray-600 font-inter max-w-2xl mx-auto">
                Explorez notre collection complète de produits artisanaux créés avec passion par nos centres de production.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={`/produits/${relatedProduct.slug}`}>
                    <div className="relative h-48">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={getImageUrl(relatedProduct.images[0])}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className={`inline-block bg-gradient-to-r ${categoryColors[relatedProduct.category]} text-white px-2 py-1 rounded text-xs font-poppins font-medium mb-2`}>
                        {categoryLabels[relatedProduct.category]}
                      </div>
                      <h3 className="font-poppins font-semibold text-gray-900 mb-2 text-sm">{relatedProduct.name}</h3>
                      <p className="text-emerald-600 font-poppins font-bold">{formatPrice(relatedProduct.price)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
