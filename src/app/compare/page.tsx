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

      {/* Popular comparisons */}
      <Block alt>
        <SectionHeader title="人気の比較" />
        <p className="text-[11px] text-[#86868b] mb-3">アクセス数の多い代表的な比較ペア。</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { a: "claude", b: "chatgpt" },
            { a: "gemini", b: "chatgpt" },
            { a: "claude", b: "gemini" },
            { a: "grok", b: "chatgpt" },
            { a: "perplexity", b: "chatgpt" },
            { a: "claude", b: "grok" },
            { a: "microsoft_copilot", b: "chatgpt" },
            { a: "microsoft_copilot", b: "claude" },
            { a: "microsoft_copilot", b: "gemini" },
          ].map((pair) => {
            const a = models.find((m) => m.id === pair.a);
            const b = models.find((m) => m.id === pair.b);
            if (!a || !b) return null;
            return (
              <a
                key={`${pair.a}-${pair.b}`}
                href={`/compare/${pair.a}-vs-${pair.b}`}
                className="flex items-stretch border border-[#d2d2d7] rounded-md bg-white overflow-hidden no-underline text-inherit hover:border-[#4a7ab5] transition-colors"
              >
                <span
                  className="w-1 shrink-0"
                  style={{ backgroundColor: MODEL_COLORS[a.id] || "#86868b" }}
                  aria-hidden
                />
                <div className="flex-1 px-3 py-2.5 flex items-center justify-between gap-2 min-w-0">
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-[#1d1d1f] truncate">
                      {a.name} vs {b.name}
                    </div>
                    {a.scores.overall !== null && b.scores.overall !== null && (
                      <div className="text-[11px] text-[#6e6e73] mt-0.5">
                        総合{" "}
                        <span style={{ color: scoreColorHex(a.scores.overall) }} className="font-bold">
                          {a.scores.overall}
                        </span>{" "}
                        vs{" "}
                        <span style={{ color: scoreColorHex(b.scores.overall) }} className="font-bold">
                          {b.scores.overall}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-[#4a7ab5] shrink-0">比較 →</span>
                </div>
                <span
                  className="w-1 shrink-0"
                  style={{ backgroundColor: MODEL_COLORS[b.id] || "#86868b" }}
                  aria-hidden
                />
              </a>
            );
          })}
        </div>
      </Block>

      <Block>
        <SectionHeader title="比較ペアを選択" />
        <div className="space-y-6">
          {models.map((modelA) => (
            <div key={modelA.id}>
              <h3
                className="text-[14px] font-bold mb-3 pl-2 border-l-[3px]"
                style={{
                  color: MODEL_COLORS[modelA.id] || "#1d1d1f",
                  borderColor: MODEL_COLORS[modelA.id] || "#d2d2d7",
                }}
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
                      className="flex items-stretch rounded-md border border-[#d2d2d7] bg-white overflow-hidden no-underline text-inherit hover:border-[#4a7ab5] transition-colors"
                    >
                      <span
                        className="w-1 shrink-0"
                        style={{ backgroundColor: MODEL_COLORS[modelB.id] || "#86868b" }}
                        aria-hidden
                      />
                      <div className="flex-1 px-3 py-3 text-center">
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
                      </div>
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
