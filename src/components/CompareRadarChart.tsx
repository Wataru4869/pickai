"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MODEL_COLORS, getSafetyRanking } from "@/lib/data";

type ModelData = {
  id: string;
  name: string;
  scores: {
    overall: number | null;
    writing: number | null;
    coding: number | null;
    image: number | null;
    safety: number | null;
  };
};

export function CompareRadarChart({
  modelA,
  modelB,
}: {
  modelA: ModelData;
  modelB: ModelData;
}) {
  const safetyRanking = getSafetyRanking();
  const safetyA = safetyRanking.find((r: any) => r.model === modelA.id);
  const safetyB = safetyRanking.find((r: any) => r.model === modelB.id);

  const data = [
    {
      subject: "文章生成",
      [modelA.name]: modelA.scores.writing || 0,
      [modelB.name]: modelB.scores.writing || 0,
    },
    {
      subject: "コーディング",
      [modelA.name]: modelA.scores.coding || 0,
      [modelB.name]: modelB.scores.coding || 0,
    },
    {
      subject: "画像生成",
      [modelA.name]: modelA.scores.image || 0,
      [modelB.name]: modelB.scores.image || 0,
    },
    {
      subject: "安全性",
      [modelA.name]: (safetyA as any)?.score || 0,
      [modelB.name]: (safetyB as any)?.score || 0,
    },
  ];

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: "#666" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "#999" }}
          />
          <Radar
            name={modelA.name}
            dataKey={modelA.name}
            stroke={MODEL_COLORS[modelA.id] || "#333"}
            fill={MODEL_COLORS[modelA.id] || "#333"}
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Radar
            name={modelB.name}
            dataKey={modelB.name}
            stroke={MODEL_COLORS[modelB.id] || "#666"}
            fill={MODEL_COLORS[modelB.id] || "#666"}
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
