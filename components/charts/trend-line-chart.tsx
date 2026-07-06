"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCompactNumber } from "@/lib/utils";

interface Series {
  key: string;
  label: string;
  color: string;
}

interface TrendLineChartProps<T extends { date: string }> {
  data: T[];
  series: Series[];
  className?: string;
}

/**
 * Multi-series trend chart for the dashboard's primary engagement view.
 * Flat lines, no fill, no drop shadow — consistent with the design system's
 * "elevation via value shift, not shadow" rule.
 */
export function TrendLineChart<T extends { date: string }>({
  data,
  series,
  className,
}: TrendLineChartProps<T>) {
  const config = series.reduce<ChartConfig>((acc, s) => {
    acc[s.key] = { label: s.label, color: s.color };
    return acc;
  }, {});

  return (
    <ChartContainer config={config} className={className}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -4, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-tertiary)", fontSize: 12 }}
          dy={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-tertiary)", fontSize: 12 }}
          tickFormatter={(value: number) => formatCompactNumber(value)}
          width={44}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
