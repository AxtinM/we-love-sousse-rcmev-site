import { getProjectPage } from "@/lib/api";
import { Metadata } from "next";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

export async function generateMetadata(): Promise<Metadata> {
  const projectPage = await getProjectPage();
  
  return {
    title: `${projectPage.title} | We Love Sousse`,
    description: "Découvrez notre projet We Love Sousse",
  };
}

export default async function ProjetPage() {
  const projectPage = await getProjectPage();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          {projectPage.title}
        </h1>
        {projectPage.body && (
          <div 
            className="prose prose-lg max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: projectPage.body }}
          />
        )}
      </div>
    </div>
  );
}
