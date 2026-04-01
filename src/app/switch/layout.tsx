import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI乗り換えガイド | AI選び",
  description: "今使っているAIから最適な乗り換え先を比較。料金・性能・安全性の違いが一目でわかります。",
  alternates: { canonical: "/switch" },
  openGraph: {
    title: "AI乗り換えガイド | AI選び",
    description: "今使っているAIから最適な乗り換え先を比較。料金・性能・安全性の違いが一目でわかります。",
    url: "/switch",
  },
};

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
