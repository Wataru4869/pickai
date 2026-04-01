import { getAllModels, scoreColorHex, MODEL_COLORS } from "@/lib/data";
import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";

export const metadata = {
  title: "AI比較一覧｜ChatGPT・Claude・Gemini・Grok・Perplexity｜AI選び",
  description:
    "ChatGPT・Claude・Gemini・Grok・Perplexityの全組み合わせを直接比較。文章・コード・画像・安全性・料金の5軸で差がつくポイントが一目でわかります。",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "AI比較一覧｜ChatGPT・Claude・Gemini・Grok・Perplexity｜AI選び",
    description:
      "ChatGPT・Claude・Gemini・Grok・Perplexityの全組み合わせを直接比較。",
    url: "/compare",
  },
};

export default function CompareIndexPage() {
  const models = getAllModels().filter((m) => m.scores.overall !== null);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold mb-1">AI比較一覧</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            比較したい2つのAIを選んでください。全16テスト＋安全性14項目で直接比較できます。
          </p>
          <TrustBadges />
        </div>
      </div>

      <Block>
        <SectionHeader title="比較ペアを選択" />
        <div className="space-y-6">
          {models.map((modelA) => (
            <div key={modelA.id}>
              <h3
                className="text-[14px] font-bold mb-3"
                style={{ color: MODEL_COLORS[modelA.id] || "#1d1d1f" }}
              >
                {modelA.name} と比較
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {models
                  .filter((m) => m.id !== modelA.id)
                  .map((modelB) => (
                    <a
                      key={modelB.id}
                      href={`/compare/${modelA.id}-vs-${modelB.id}`}
                      className="block rounded-xl border border-[#d2d2d7] bg-white px-3 py-3 text-center hover:border-[#0071e3] hover:shadow-sm transition-all"
                    >
                      <span className="text-[12px] text-[#6e6e73]">vs</span>
                      <p
                        className="text-[13px] font-semibold mt-0.5"
                        style={{ color: MODEL_COLORS[modelB.id] || "#1d1d1f" }}
                      >
                        {modelB.name}
                      </p>
                      {modelB.scores.overall !== null && (
                        <p className="text-[11px] text-[#6e6e73] mt-1">
                          総合{" "}
                          <span
                            style={{ color: scoreColorHex(modelB.scores.overall) }}
                            className="font-bold"
                          >
                            {modelB.scores.overall}
                          </span>
                          点
                        </p>
                      )}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Footer />
    </div>
  );
}
