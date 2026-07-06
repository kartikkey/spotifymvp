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
import type { ExperimentSeriesPoint } from "@/lib/types";

const config: ChartConfig = {
  control: { label: "Control", color: "var(--text-tertiary)" },
  treatment: { label: "Treatment", color: "var(--brand-green)" },
};

export function ComparisonAreaChart({
  data,
  className,
}: {
  data: ExperimentSeriesPoint[];
  className?: string;
}) {
  return (
    <ChartContainer config={config} className={className}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-tertiary)", fontSize: 12 }}
          dy={8}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} width={36} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="control"
          name="Control"
          stroke="var(--text-tertiary)"
          strokeWidth={2}
          strokeDasharray="4 3"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="treatment"
          name="Treatment"
          stroke="var(--brand-green)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
