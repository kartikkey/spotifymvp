"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { TrendPoint } from "@/lib/types";

interface SparklineChartProps {
  data: TrendPoint[];
  color?: string;
  height?: number;
}

/**
 * Minimal inline trend line — no axes, no grid, no tooltip. Used inside
 * Insight and Metric cards to hint at trajectory without competing with the
 * headline number next to it.
 */
export function SparklineChart({ data, color = "var(--brand-green)", height = 40 }: SparklineChartProps) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
