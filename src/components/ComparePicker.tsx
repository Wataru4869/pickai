"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ComparePicker.module.css";

export function ComparePicker({ ids, names }: { ids: string[]; names: Record<string, string> }) {
  const router = useRouter();
  const [first, setFirst] = useState("chatgpt");
  const [second, setSecond] = useState("claude");
  const destination = useMemo(() => {
    if (first === second) return null;
    const ordered = [first, second].sort((a, b) => ids.indexOf(a) - ids.indexOf(b));
    return `/compare/${ordered[0]}-vs-${ordered[1]}`;
  }, [first, second, ids]);

  return <section className={styles.picker} aria-labelledby="compare-picker-title">
    <div><p className={styles.label}>候補が決まっている人</p><h2 id="compare-picker-title">比較するAIを2つ選ぶ</h2><p>主要5サービスから選べます。並び順は性能順位ではありません。</p></div>
    <div className={styles.controls}>
      <label><span>1つ目のAI</span><select value={first} onChange={event => setFirst(event.target.value)}>{ids.map(id => <option key={id} value={id}>{names[id]}</option>)}</select></label>
      <span className={styles.versus} aria-hidden="true">と</span>
      <label><span>2つ目のAI</span><select value={second} onChange={event => setSecond(event.target.value)}>{ids.map(id => <option key={id} value={id}>{names[id]}</option>)}</select></label>
      <button type="button" disabled={!destination} onClick={() => destination && router.push(destination)}>この2つを比較する</button>
    </div>
    {!destination && <p className={styles.error} role="status">異なるAIを2つ選んでください。</p>}
  </section>;
}
