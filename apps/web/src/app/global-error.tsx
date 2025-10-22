'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Une erreur s&apos;est produite
            </h1>
            <p className="mb-8 text-gray-600">
              Nous nous excusons pour la gêne occasionnée.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 transition-colors"
              >
                Réessayer
              </button>
              <Link
                href="/"
                className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
