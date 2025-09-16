'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'ACTED',
    logo: '/uploads/logo_acted_8c4ad55408.png',
    description: 'Agence d\'aide humanitaire internationale',
    website: 'https://www.acted.org'
  },
  {
    id: '2',
    name: 'ADO',
    logo: '/uploads/Logo_Ado_3_3e03296e3e.png',
    description: 'Association pour le Développement et l\'Organisation',
    website: '#'
  },
  {
    id: '3',
    name: 'ATEDEF',
    logo: '/uploads/logo_atedef_07b2f4a2fa.png',
    description: 'Association Tunisienne pour l\'Education et la Défense',
    website: '#'
  },
  {
    id: '4',
    name: 'CNLCT',
    logo: '/uploads/logo_cnlct_c24d1f9745.png',
    description: 'Commission Nationale de Lutte Contre le Terrorisme',
    website: '#'
  },
  {
    id: '5',
    name: 'FJCC',
    logo: '/uploads/logo_fjcc_4b2288f09a.jpg',
    description: 'Forum des Jeunes pour la Culture et la Citoyenneté',
    website: '#'
  },
  {
    id: '6',
    name: 'GCERF',
    logo: '/uploads/logo_gcerf_98ab9a6565.png',
    description: 'Global Community Engagement and Resilience Fund',
    website: 'https://www.gcerf.org'
  }
];

export default function PartnersShowcase() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl lg:text-7xl font-bold text-center text-white mb-16"
        >
          Nos Partenaires
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-center text-gray-300 mb-20 max-w-3xl mx-auto"
        >
          Une coalition d\'organisations dédiées à la construction d\'une société plus résiliente
          face à l\'extrémisme violent en Tunisie.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/20 hover:border-white/40 transition-all duration-300">
                {/* Logo Container */}
                <div className="relative h-20 mb-6 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={`http://localhost:1337${partner.logo}`}
                      alt={`Logo ${partner.name}`}
                      fill
                      className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Partner Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5))',
                       filter: 'blur(10px)',
                       transform: 'scale(1.02)'
                     }} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg">
            Ensemble, nous construisons un avenir plus sûr et plus inclusif pour la Tunisie
          </p>
        </motion.div>
      </div>
    </div>
  );
}
