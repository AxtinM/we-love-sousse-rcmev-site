'use client';

import { motion } from 'framer-motion';

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
    <div className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center mb-4 sm:mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            Nos Partenaires
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-center text-slate-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
        >
          Une coalition d'organisations dédiées à la construction d'une société plus résiliente
          face à l'extrémisme violent en Tunisie.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 h-full border border-slate-600/40 hover:border-emerald-400/60 transition-all duration-500 hover:bg-slate-700/60">
                {/* Logo Container */}
                <div className="relative h-16 sm:h-20 mb-4 sm:mb-6 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="w-full h-full object-contain transition-all duration-500 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                </div>

                {/* Partner Info */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.3))',
                       filter: 'blur(8px)',
                       transform: 'scale(1.01)'
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
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed px-4">
            Ensemble, nous construisons un avenir plus sûr et plus inclusif pour la Tunisie
          </p>
        </motion.div>
      </div>
    </div>
  );
}
