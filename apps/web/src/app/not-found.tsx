import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Page non trouvée
        </h2>
        <p className="mb-8 text-gray-600">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 transition-colors inline-block"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
