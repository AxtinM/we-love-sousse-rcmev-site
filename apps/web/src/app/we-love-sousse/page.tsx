import { getWlsPage } from "@/lib/api";
import { Metadata } from "next";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

export async function generateMetadata(): Promise<Metadata> {
  const wlsPage = await getWlsPage();
  
  return {
    title: `${wlsPage.title} | We Love Sousse`,
    description: "We Love Sousse - Notre mission et vision",
  };
}

export default async function WeLoveSoussePage() {
  const wlsPage = await getWlsPage();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          {wlsPage.title}
        </h1>
        {wlsPage.body && (
          <div 
            className="prose prose-lg max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: wlsPage.body }}
          />
        )}
      </div>
    </div>
  );
}
