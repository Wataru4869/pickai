import { Header, Footer } from "@/components/ui";
import { getAllArticles } from "@/lib/blog";
import BlogList from "./BlogList";

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white py-6">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-semibold text-[#1d1d1f] mb-2">
            コラム
          </h1>
          <p className="text-[13px] text-[#6e6e73] mb-1">
            ChatGPT・Claude・Geminiの比較、選び方、活用ガイド
          </p>
          <div className="text-[11px] text-[#6e6e73]">
            全{articles.length}記事
          </div>
        </div>
      </div>

      <BlogList articles={articles} />

      <Footer />
    </div>
  );
}
