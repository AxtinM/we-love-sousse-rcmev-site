'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black via-neutral-dark to-black text-white footer-text">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#ffffff' }}>
                <span style={{ 
                  background: 'linear-gradient(45deg, #E53935, #009688)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  We Love Sousse
                </span>
              </h3>
              <p className="leading-relaxed text-sm footer-text">
                Organisation de la société civile tunisienne engagée pour la promotion 
                de la citoyenneté active, de la solidarité et du développement local durable.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-neutral-light/70 font-medium">CRÉÉE EN</p>
              <p className="text-lg font-bold text-secondary-light">2011</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">Projet RCMEV</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="text-primary mt-1">🎯</div>
                <div>
                  <p className="text-sm font-medium text-neutral-light">Objectif</p>
                  <p className="text-xs text-neutral-light/80">Prévention de l'extrémisme violent</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-secondary mt-1">🤝</div>
                <div>
                  <p className="text-sm font-medium text-neutral-light">Partenaires</p>
                  <p className="text-xs text-neutral-light/80">CNLCT, GCERF, ACTED</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-primary-light mt-1">📍</div>
                <div>
                  <p className="text-sm font-medium text-neutral-light">Régions</p>
                  <p className="text-xs text-neutral-light/80">5 régions vulnérables</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
            <div className="space-y-2">
              {[
                { name: 'Le Projet RCMEV', href: '/projet' },
                { name: 'We Love Sousse', href: '/we-love-sousse' },
                { name: 'Articles', href: '/articles' },
                { name: 'Galerie Photos', href: '/photos' },
                { name: 'Vidéos', href: '/videos' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-neutral-light hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Impact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="text-primary mt-1">📧</div>
                <div>
                  <p className="text-xs font-medium text-neutral-light/70">EMAIL</p>
                  <a 
                    href="mailto:we.love.sousse@gmail.com" 
                    className="text-sm text-neutral-light hover:text-primary transition-colors"
                  >
                    we.love.sousse@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-secondary mt-1">📱</div>
                <div>
                  <p className="text-xs font-medium text-neutral-light/70">TÉLÉPHONE</p>
                  <p className="text-sm text-neutral-light">52726887 / 50441927</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-primary-light mt-1">📍</div>
                <div>
                  <p className="text-xs font-medium text-neutral-light/70">ADRESSE</p>
                  <p className="text-sm text-neutral-light leading-tight">
                    Immeuble Jarboui, Rue Ariana<br />
                    Khzama Ouest, Sousse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="border-t border-neutral-light/20 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '5,481', label: 'Bénéficiaires Directs', icon: '👥' },
              { value: '721', label: 'Femmes Touchées', icon: '👩' },
              { value: '410', label: 'Activités Réalisées', icon: '🎯' },
              { value: '19', label: 'Recherches Appliquées', icon: '📚' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary-light mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-light/80 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-light/20 bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-light/70 text-center md:text-left">
              <p>
                © {currentYear} We Love Sousse. Projet RCMEV financé par le{' '}
                <span className="text-primary-light font-medium">GCERF</span>.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-xs text-neutral-light/50">
                Supervision: CNLCT | Partenaire technique: ACTED
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-light/10 text-center">
            <p className="text-xs text-neutral-light/50 leading-relaxed">
              Projet mis en œuvre en partenariat avec ATDef, FJCC et ADO+. 
              Un modèle intégré et durable de prévention de l'extrémisme violent en Tunisie.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      {mounted && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-2xl hover:shadow-primary/50 transform hover:scale-110 transition-all duration-300 group"
            title="Nous contacter"
          >
            <svg 
              className="w-6 h-6 group-hover:animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </Link>
        </div>
      )}
    </footer>
  );
}
