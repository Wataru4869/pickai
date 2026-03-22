import {
  getSafetyTests,
  getSafetyRanking,
  getSafetyCertifications,
  getModels,
  scoreColorHex,
} from "@/lib/data";
import { Header, Footer, Block, SectionHeader, TrustBadges, ShareButton } from "@/components/ui";
import { SafetyHeatmap } from "@/components/SafetyHeatmap";

export const metadata = {
  title: "AIの安全性比較ランキング【2026年版】| Pick AI",
  description: "ハルシネーション・著作権・プライバシー等14テストでClaude/ChatGPT/Gemini/Grok/Perplexityの安全性を比較。セキュリティ認証・法規制対応も評価。",
};

export default function SafetyPage() {
  const safetyTests = getSafetyTests();
  const ranking = getSafetyRanking();
  const certs = getSafetyCertifications() as Record<string, string[]>;
  const models = getModels();

  const MODEL_NAMES = ["claude", "chatgpt", "gemini", "grok", "perplexity"];
  const DISPLAY_NAMES: Record<string, string> = {
    claude: "Claude", chatgpt: "ChatGPT", gemini: "Gemini", grok: "Grok", perplexity: "Perplexity",
  };

  const CERT_ITEMS = [
    { name: "SOC 2 Type II", key: "SOC 2" },
    { name: "ISO 27001", key: "ISO 27001" },
    { name: "HIPAA", key: "HIPAA" },
    { name: "ISO 42001", key: "ISO 42001" },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold mb-1">安全性比較</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            14テスト（事実性・著作権・プライバシー・セキュリティ等）＋セキュリティ認証・法規制対応の2軸で評価。
          </p>
          <TrustBadges />
        </div>
      </div>

      {/* Ranking */}
      <Block>
        <SectionHeader title="安全性ランキング" />
        {ranking.map((r: any, i: number) => {
          const model = models.find((m) => m.id === r.model);
          return (
            <div key={r.model} className="flex items-center gap-3 py-2.5 border-t border-[#e8e8ed] first:border-t-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                style={{
                  backgroundColor: i === 0 ? "#c8860a" : i === 1 ? "#888" : i === 2 ? "#b87333" : "#DDD",
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <span className="text-[14px] font-semibold">{model?.name}</span>
                <span className="text-[11px] text-[#86868b] ml-2">{r.score.toFixed(2)}点</span>
              </div>
              <span className="text-[22px] font-bold" style={{ color: scoreColorHex(r.score) }}>
                {r.score}
              </span>
            </div>
          );
        })}
      </Block>

      {/* Heatmap */}
      <Block>
        <SectionHeader title="全14テスト ヒートマップ" />
        <SafetyHeatmap />
      </Block>

      {/* Certifications */}
      <Block>
        <SectionHeader title="セキュリティ認証" />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-[#f5f5f7]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">認証</th>
                {MODEL_NAMES.map((m) => (
                  <th key={m} className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                    {DISPLAY_NAMES[m]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CERT_ITEMS.map((cert, i) => (
                <tr key={cert.name} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                  <td className="p-1.5 font-medium border-b border-[#e8e8ed]">{cert.name}</td>
                  {MODEL_NAMES.map((m) => {
                    const has = certs[m]?.some((c) => c.includes(cert.key));
                    return (
                      <td key={m} className="p-1.5 text-center border-b border-[#e8e8ed] text-[13px]">
                        {has ? <span className="text-green-700 font-bold">○</span> : <span className="text-[#86868b]">—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      {/* Key findings */}
      <Block>
        <SectionHeader title="重大な発見" />
        {[
          { title: "著作権対応の二極化", desc: "Claude/ChatGPTは歌詞・画風ともに拒否。Grokは歌詞全文出力＋画風2枚生成で最低スコア。", color: "#cc3333" },
          { title: "プライバシー保護の格差", desc: "Claude/ChatGPTは「不適切」と明確拒否。Grok/Perplexityは個人名で推定年収を提示。", color: "#e67700" },
          { title: "文化的配慮の全体的弱さ", desc: "12/25送信の年末挨拶で、クリスマスとの関係に触れたモデルがゼロ。", color: "#1a6dcc" },
        ].map((f, i) => (
          <div key={i} className="border border-[#d2d2d7] rounded p-3 mb-2" style={{ borderLeftWidth: 4, borderLeftColor: f.color }}>
            <div className="text-[12px] font-semibold mb-1">{f.title}</div>
            <div className="text-[11px] text-[#6e6e73]">{f.desc}</div>
          </div>
        ))}
      </Block>

      <Block>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded p-3">
          <div>
            <div className="text-[12px] font-bold">シェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5">
              「AI安全性1位Claude（93.7）2位ChatGPT（90.5）#PickAI」
            </div>
          </div>
          <ShareButton text="AI安全性ランキング：1位Claude（93.7）2位ChatGPT（90.5）3位Gemini（78.4）#PickAI https://pickai.jp/safety" />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
