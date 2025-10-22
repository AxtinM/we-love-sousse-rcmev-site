import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Love Sousse - Projet RCMEV",
  description: "Réponse Coordonnée à la Montée de l'Extrémisme Violent - Un projet pour renforcer la résilience des jeunes et des femmes en Tunisie",
  keywords: "We Love Sousse, RCMEV, Tunisie, prévention extrémisme, jeunes, femmes, développement social",
  authors: [{ name: "We Love Sousse" }],
  openGraph: {
    title: "We Love Sousse - Projet RCMEV",
    description: "Réponse Coordonnée à la Montée de l'Extrémisme Violent",
    type: "website",
    locale: "fr_TN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}