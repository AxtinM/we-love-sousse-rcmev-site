'use client';

import { useState } from 'react';

export default function TestMobilePage() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('');

  const breakpoints = [
    { name: 'Mobile (320px)', width: '320px' },
    { name: 'Small (375px)', width: '375px' },
    { name: 'Medium (425px)', width: '425px' },
    { name: 'Tablet (768px)', width: '768px' },
    { name: 'Laptop (1024px)', width: '1024px' },
    { name: 'Desktop (1440px)', width: '1440px' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-poppins font-bold text-center mb-8">
          Test de Responsive Design
        </h1>
        
        {/* Breakpoint buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {breakpoints.map((bp) => (
            <button
              key={bp.name}
              onClick={() => setCurrentBreakpoint(bp.width)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-inter"
            >
              {bp.name}
            </button>
          ))}
          <button
            onClick={() => setCurrentBreakpoint('')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm font-inter"
          >
            Responsive
          </button>
        </div>

        {/* Preview frame */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div 
            className="border border-gray-300 mx-auto transition-all duration-300"
            style={{ 
              width: currentBreakpoint || '100%',
              height: '600px',
              maxWidth: '100%'
            }}
          >
            <iframe
              src="/"
              width="100%"
              height="100%"
              className="border-0 rounded"
              title="Site preview"
            />
          </div>
          {currentBreakpoint && (
            <p className="text-center mt-4 text-gray-600 font-inter">
              Largeur actuelle: {currentBreakpoint}
            </p>
          )}
        </div>

        {/* Typography test */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-poppins font-bold mb-6">Test de Typographie</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-poppins font-semibold mb-2">Titres (Poppins)</h3>
              <h1 className="text-4xl font-poppins font-bold mb-2">Titre H1 - Poppins Bold</h1>
              <h2 className="text-3xl font-poppins font-semibold mb-2">Titre H2 - Poppins Semibold</h2>
              <h3 className="text-2xl font-poppins font-medium">Titre H3 - Poppins Medium</h3>
            </div>
            
            <div>
              <h3 className="text-lg font-poppins font-semibold mb-2">Corps de texte (Inter)</h3>
              <p className="text-base font-inter leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris.
              </p>
              <p className="text-sm font-inter text-gray-600">
                Texte secondaire en Inter - taille réduite
              </p>
            </div>

            <div>
              <h3 className="text-lg font-poppins font-semibold mb-2">Boutons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-poppins font-medium hover:bg-primary-700 transition-colors">
                  Bouton Principal
                </button>
                <button className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-poppins font-medium hover:bg-primary-50 transition-colors">
                  Bouton Secondaire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
