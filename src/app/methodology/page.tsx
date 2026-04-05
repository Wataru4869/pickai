import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";
import { PromptAccordion } from "@/components/PromptAccordion";

export const metadata = {
  title: "評価方法論・採点基準 | AI選び",
  description: "30テストのプロンプト全文、3層スコアリング方式、公平性担保の仕組みを完全公開。第三者による追検証が可能です。",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "評価方法論・採点基準 | AI選び",
    description: "30テストのプロンプト全文、3層スコアリング方式、公平性担保の仕組みを完全公開。第三者による追検証が可能です。",
    url: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white border-b border-[#e8e8ed] py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold mb-1">評価方法論</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            当サイトのテスト方法論を全て公開します。透明性と再現性を最優先に、全プロンプト・採点基準を開示しています。
          </p>
          <TrustBadges />
        </div>
      </div>

      {/* Overview */}
      <Block>
        <SectionHeader title="1. テスト概要" />
        <p className="text-[12px] text-[#6e6e73] leading-relaxed mb-3">
          5つの主要AIモデル（Claude / ChatGPT / Gemini / Grok / Perplexity）に対し、合計30テストを実施。全モデルに同一プロンプトを投入し、統一基準で採点しました。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px] min-w-[400px]">
            <thead>
              <tr>
                <th className="text-left p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">カテゴリ</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">テスト数</th>
                <th className="text-left p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">主な項目</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cat: "文章生成", count: 8, items: "営業メール、クレーム対応、企画書、議事録要約、SNS投稿、翻訳、ブログ" },
                { cat: "コーディング", count: 4, items: "GAS自動化、Python分析、HTML/CSS/JS、デバッグ" },
                { cat: "画像生成", count: 4, items: "商品写真、アニメキャラ、日本語バナー、ロゴデザイン" },
                { cat: "安全性", count: 14, items: "ハルシネーション、著作権、プライバシー、フィッシング、政治中立性" },
              ].map((r) => (
                <tr key={r.cat}>
                  <td className="p-2 border-b border-[#f0f0f0] text-[13px] font-semibold text-[#1d1d1f]">{r.cat}</td>
                  <td className="p-2 text-center border-b border-[#f0f0f0] text-[14px] font-bold text-[#1d1d1f]">{r.count}</td>
                  <td className="p-2 border-b border-[#f0f0f0] text-[11px] text-[#6e6e73]">{r.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-[#86868b] mt-2">テスト実施: 2026年3月21-22日</p>
      </Block>

      {/* Scoring */}
      <Block>
        <SectionHeader title="2. 採点方式" />
        <div className="border border-[#d2d2d7] rounded-md p-4 bg-[#f5f5f7] mb-3">
          <div className="text-[13px] font-semibold text-[#1d1d1f] mb-2">3層スコアリングシステム</div>
          <div className="text-[12px] text-[#6e6e73] leading-relaxed">
            <strong className="text-[#1d1d1f]">文章・コード・画像（16テスト）：</strong><br />
            ① Claude採点（25点満点）＋ ② ChatGPT採点（25点満点）→ 平均 → 100点換算<br />
            2つのAIによるクロス採点で、採点者バイアスを軽減。
          </div>
          <div className="text-[12px] text-[#6e6e73] leading-relaxed mt-2">
            <strong className="text-[#1d1d1f]">安全性（14テスト）：</strong><br />
            Claude採点のみ（25点満点×14テスト＝350点満点）<br />
            カテゴリ別加重：ハルシネーション×1.5 / プライバシー×1.5 / 著作権×1.2 / その他×1.0
          </div>
        </div>
        <div className="text-[12px] text-[#6e6e73] leading-relaxed">
          <strong>採点5項目（各5点）：</strong><br />
          ・要件充足度 — プロンプトの指示をどれだけ満たしているか<br />
          ・日本語品質 — ビジネスレベルの自然な日本語か<br />
          ・実用性 — そのまま業務に使えるレベルか<br />
          ・構成・論理性 — 情報の整理・構造化が適切か<br />
          ・総合的完成度 — 全体として完成された成果物か
        </div>
      </Block>

      {/* Prompts */}
      <Block>
        <SectionHeader title="3. テストプロンプト（抜粋）" />
        <p className="text-[11px] text-[#6e6e73] mb-3">全30テストのプロンプトを公開しています。以下は代表例です。</p>
        <PromptAccordion />
      </Block>

      {/* Fairness */}
      <Block>
        <SectionHeader title="4. 公平性の担保" />
        {[
          { title: "同一プロンプト", desc: "全モデルに完全に同じプロンプトを投入。モデルごとの調整は一切行っていません。" },
          { title: "同日テスト", desc: "2026年3月21-22日に全テストを集中実施。モデルのバージョン差による不公平を最小化。" },
          { title: "クロス採点", desc: "Claude採点とChatGPT採点の平均を統合スコアとし、単一採点者のバイアスを軽減。" },
          { title: "全データ公開", desc: "プロンプト・回答・採点詳細の全てを公開。第三者による追検証が可能です。" },
        ].map((f, i) => (
          <div key={i} className="py-2.5 border-t border-[#e8e8ed] first:border-t-0">
            <div className="text-[12px] font-bold mb-0.5">{f.title}</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </Block>

      {/* External data */}
      <Block>
        <SectionHeader title="5. 外部データの取り扱い" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="border border-[#e8e8ed] rounded-md p-3">
            <div className="text-[11px] font-bold text-[#1d1d1f] mb-1.5 pl-2 border-l-2 border-[#3d7a5f] uppercase tracking-wider">独自テスト済み</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">当サイトが実施した30テスト。全プロンプト・採点を公開。バッジ表示あり。</div>
          </div>
          <div className="border border-[#e8e8ed] rounded-md p-3">
            <div className="text-[11px] font-bold text-[#1d1d1f] mb-1.5 pl-2 border-l-2 border-[#d2d2d7] uppercase tracking-wider">外部データ引用</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">SWE-bench、MMLU等の外部ベンチマーク。出典URL・取得日を必ず明記。</div>
          </div>
        </div>
      </Block>

      {/* Update policy */}
      <Block>
        <SectionHeader title="6. 更新ポリシー" />
        <div className="text-[12px] text-[#6e6e73] leading-relaxed">
          ・四半期ごと（3月・6月・9月・12月）に全テストを再実施<br />
          ・モデルの重大アップデート時は臨時再テストを実施<br />
          ・ユーザー投票データは月次で集計し、スコアの補助指標として活用<br />
          ・更新時は変更内容と理由を「更新履歴」に記載
        </div>
      </Block>

      {/* Limitations */}
      <Block>
        <SectionHeader title="7. 限界と注意事項" />
        {[
          "スコアは特定条件下での相対的な比較指標です。絶対的な品質保証ではありません。",
          "実際の利用体験は、用途・プロンプト品質・パラメータ設定により大きく異なります。",
          "モデルのアップデートにより、同じプロンプトでも異なる結果が生じることがあります。",
          "生成型テストの採点には必然的に主観が介入します。クロス採点で軽減していますが、完全な客観性は保証できません。",
        ].map((t, i) => (
          <div key={i} className="flex gap-1.5 py-1.5 border-t border-[#e8e8ed] first:border-t-0">
            <span className="text-[11px] text-[#a05454] font-bold shrink-0 mt-0.5">*</span>
            <span className="text-[11px] text-[#6e6e73] leading-relaxed">{t}</span>
          </div>
        ))}
      </Block>

      <Block>
        <div className="mt-4 pt-4 border-t border-[#e8e8ed] text-[12px] text-[#86868b] space-y-2">
          <p className="font-semibold text-[#6e6e73]">免責事項</p>
          <p>本サイトの評価は、AI選び編集部が独自に設計したテストに基づく結果であり、特定のAIツールの品質を保証または否定するものではありません。</p>
          <p>各AIツールは日々アップデートされており、評価時点のバージョンと現在のバージョンで性能が異なる場合があります。最新の情報は各社の公式サイトをご確認ください。</p>
          <p>本サイトは特定の企業・製品との利害関係を持たず、テスト結果に基づく公平な比較情報の提供を目的としています。</p>
          <p>テストに使用したプロンプト、採点基準、評価手法は本ページで全て公開しています。</p>
        </div>
      </Block>

      <Footer />
    </div>
  );
}
