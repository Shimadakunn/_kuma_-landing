'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// Utility functions for compound interest calculations
const calculateDailyCompoundInterest = (principal: number, ratePerYear: number, years: number) => {
  const dailyRate = ratePerYear / 365;
  return principal * Math.pow(1 + dailyRate, 365 * years);
};

const calculateYearlyCompoundInterest = (principal: number, ratePerYear: number, years: number) => {
  return principal * Math.pow(1 + ratePerYear, years);
};

const generateChartData = (initialValue: number) => {
  const years = 25;
  const bookletRate = 0.1; // 10% yearly
  const livretRate = 0.025; // 2.5% yearly

  return Array.from({ length: years + 1 }, (_, index) => ({
    year: index.toString(),
    booklet: Math.round(calculateDailyCompoundInterest(initialValue, bookletRate, index)),
    livret: Math.round(calculateYearlyCompoundInterest(initialValue, livretRate, index)),
  }));
};

const chartConfig = {
  booklet: {
    label: 'Booklet - 10% ',
    color: '#BEBEF1',
  },
  livret: {
    label: 'Livret A - 2.5%  ',
    color: '#01E4FB',
  },
} satisfies ChartConfig;

export function Component() {
  const [value, setValue] = useState(2500);
  const chartData = useMemo(() => generateChartData(value), [value]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-16">
      <h1 className="text-6xl font-black">Estimez vos intérêts</h1>
      <ChartContainer config={chartConfig} className="h-full w-[1000px]">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 48,
            right: 12,
            top: 12,
            bottom: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            label={{ value: 'Years', position: 'bottom', offset: 0 }}
            tickFormatter={(value) => (value % 5 === 0 ? `${value} ans` : '')}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
          />
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent indicator="dot" className="rounded-lg bg-white" />}
          />
          <Area
            dataKey="booklet"
            type="monotone"
            fill="#DD76FB"
            fillOpacity={0.4}
            stroke="#DD76FB"
            strokeWidth={2}
          />
          <Area
            dataKey="livret"
            type="monotone"
            fill="#01E4FB"
            fillOpacity={0.4}
            stroke="#01E4FB"
            strokeWidth={2}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
      <div className="flex w-full items-center justify-center gap-4">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 pb-[3px] text-2xl font-black hover:bg-gray-300"
          onClick={() => setValue(Math.max(500, value - 500))}>
          -
        </button>
        <div className="pt-1 text-5xl font-black">{value.toLocaleString('fr-FR')}€</div>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 pb-[3px] text-2xl font-black hover:bg-gray-300"
          onClick={() => setValue(value + 500)}>
          +
        </button>
      </div>
    </div>
  );
}
