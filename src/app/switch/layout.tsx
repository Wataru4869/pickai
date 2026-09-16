import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI乗り換えガイド | AIえらびマップ",
  description: "作業・費用・利用条件からAIの乗り換えを検討。旧スコアによる自動推奨は行いません。",
  alternates: { canonical: "/switch" },
  openGraph: {
    title: "AI乗り換えガイド | AIえらびマップ",
    description: "作業・費用・利用条件からAIの乗り換えを検討。旧スコアによる自動推奨は行いません。",
    url: "/switch",
  },
};

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
