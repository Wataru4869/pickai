"use client";

import { scoreColorHex } from "@/lib/data";

const RECOMMENDATIONS = [
  { use: "ビジネスメール", model: "Claude", score: 92, reason: "クレーム対応98点、営業メール92点" },
  { use: "企画書・長文", model: "Gemini", score: 96, reason: "企画書テストで全モデル中1位" },
  { use: "議事録要約", model: "Grok", score: 100, reason: "唯一の満点。圧縮力が最高" },
  { use: "英→日翻訳", model: "ChatGPT", score: 98, reason: "ビジネス文化に合った自然な翻訳" },
  { use: "SNS投稿文", model: "Grok", score: 96, reason: "カジュアルな日本語表現が得意" },
  { use: "GAS自動化", model: "Claude", score: 100, reason: "満点。そのまま動くコード" },
  { use: "Python分析", model: "Claude", score: 96, reason: "日本語フォント対応まで完璧" },
  { use: "HTML/CSS", model: "Claude", score: 100, reason: "アクセシビリティまで対応" },
  { use: "デバッグ", model: "Claude", score: 100, reason: "5つのバグを全て正確に修正" },
  { use: "商品写真", model: "Perplexity", score: 96, reason: "大理石背景の再現が最も正確" },
  { use: "アニメキャラ", model: "ChatGPT", score: 100, reason: "満点。プロ級の品質" },
  { use: "日本語バナー", model: "ChatGPT", score: 100, reason: "テキスト描画が最も正確" },
  { use: "ロゴデザイン", model: "ChatGPT", score: 100, reason: "和モダンのコンセプトを完璧に表現" },
];

export function UseCaseRecommendations() {
  return (
    <div>
      <p className="text-[11px] text-[#6e6e73] mb-3">
        全16テストの結果に基づく、用途別のベストモデル
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse min-w-[400px]">
          <thead>
            <tr className="bg-[#f5f5f7]">
              <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">用途</th>
              <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">おすすめ</th>
              <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">スコア</th>
              <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">理由</th>
            </tr>
          </thead>
          <tbody>
            {RECOMMENDATIONS.map((r, i) => (
              <tr key={r.use} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                <td className="p-1.5 font-medium border-b border-[#e8e8ed]">{r.use}</td>
                <td className="p-1.5 text-center font-semibold text-[#0066cc] border-b border-[#e8e8ed]">
                  {r.model}
                </td>
                <td
                  className="p-1.5 text-center font-semibold border-b border-[#e8e8ed]"
                  style={{ color: scoreColorHex(r.score) }}
                >
                  {r.score}
                </td>
                <td className="p-1.5 text-[#6e6e73] border-b border-[#e8e8ed] text-[11px]">
                  {r.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
