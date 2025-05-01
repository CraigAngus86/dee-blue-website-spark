
import { Metadata } from "next";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "News | Banks o' Dee FC",
  description: "Latest news from Banks o' Dee Football Club",
};

export default function NewsPage() {
  return (
    <main className="flex-grow">
      <NewsHero />
      <div className="container mx-auto px-4 py-12">
        <NewsGrid />
      </div>
    </main>
  );
}
