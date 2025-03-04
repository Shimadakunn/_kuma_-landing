import { getApyHistory } from '@/lib/api';
import { useStore } from '@/lib/store';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Interest() {
  const { apy } = useStore();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
    margin: '0px 0px -10% 0px',
  });

  const animatedValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView) {
      animatedValue.set(apy * 100);
    }
  }, [apy, animatedValue, isInView]);

  const formattedValue = useTransform(animatedValue, (value) => value.toFixed(2) + '%');

  return (
    <div className="flex h-[75vh]" ref={ref}>
      <div className="flex w-[55%] flex-col items-start justify-center gap-4 pl-20">
        <h1 className="text-6xl font-black">Un taux d&apos;intérêt</h1>
        <h1 className="text-6xl font-black">
          de{' '}
          <span className="rounded-xl bg-black px-4 py-1 text-white">
            <motion.span>{formattedValue}</motion.span>
          </span>
        </h1>
        <p className="mt-2 text-2xl font-bold text-gray-400">
          Gagnez un rendement avantageux tout en epargnant.
        </p>
      </div>
      <div className="w-[45%]">
        <YieldChart />
      </div>
    </div>
  );
}

const YieldChart = () => {
  const [chartData, setChartData] = useState<{ date: number; value: number }[]>([]);
  const [avgApy, setAvgApy] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '6M' | '1Y'>('1M');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (selectedTimeframe: typeof timeframe) => {
    setIsLoading(true);
    setError(null);
    try {
      const { rateHistory, avgRate } = await getApyHistory(selectedTimeframe);

      // Create chart data points with timestamps
      const now = Date.now();
      const timeframeInDays = {
        '1W': 7,
        '1M': 30,
        '6M': 180,
        '1Y': 365,
      }[selectedTimeframe];

      const timestampStep = (timeframeInDays * 24 * 60 * 60 * 1000) / rateHistory.length;

      const data = rateHistory.map((value: number, index: number) => ({
        date: now - (rateHistory.length - 1 - index) * timestampStep,
        value: value * 100, // Convert to percentage
      }));

      console.log('avgRate', avgRate);
      setAvgApy(avgRate * 100);
      setChartData(data);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error fetching APY history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(timeframe);
  }, [timeframe]);

  const timeframes = ['1W', '1M', '6M', '1Y'] as const;

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-start justify-center pr-20">
        <div className="mb-4 flex gap-8">
          {timeframes.map((tf) => (
            <button
              key={tf}
              disabled
              className={`text-sm font-black transition-colors ${
                timeframe === tf ? 'text-black' : 'text-gray-400'
              }`}>
              {tf}
            </button>
          ))}
        </div>
        <div className="flex h-[500px] w-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-start justify-center pr-20">
        <div className="mb-4 flex gap-8">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`text-sm font-black transition-colors ${
                timeframe === tf ? 'text-black' : 'text-gray-400'
              }`}>
              {tf}
            </button>
          ))}
        </div>
        <div className="flex h-[500px] w-full items-center justify-center">
          <p className="text-gray-500">{error || 'No data available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-center">
      <div className="mb-4 flex w-full justify-start gap-8 pr-24">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`text-sm font-black transition-colors ${
              timeframe === tf ? 'text-black' : 'text-gray-400'
            }`}>
            {tf}
          </button>
        ))}
      </div>
      <div className="relative w-full">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData} margin={{ top: 20, right: 80, left: 20, bottom: 20 }}>
            <XAxis
              dataKey="date"
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                const month = date.toLocaleString('default', { month: 'short' });
                const day = date.getDate();
                return `${day} ${month}`;
              }}
              stroke="#000000"
              strokeWidth={2}
              tick={{ fontSize: 12, fontWeight: 900 }}
              tickLine={false}
              axisLine={{ strokeWidth: 2 }}
              interval="preserveStartEnd"
              minTickGap={50}
            />
            <YAxis
              orientation="left"
              tickFormatter={(value) => `${value}%`}
              stroke="#000000"
              strokeWidth={2}
              tick={{ fontSize: 12, fontWeight: 900 }}
              tickLine={false}
              tickCount={5}
              width={50}
              axisLine={{ strokeWidth: 2 }}
            />
            <ReferenceLine
              y={avgApy}
              stroke="#000000"
              strokeDasharray="3 3"
              strokeWidth={2}
              label={{
                position: 'right',
                value: `${avgApy.toFixed(2)}%`,
                fill: '#000000',
                fontSize: 12,
                fontWeight: 900,
                offset: 10,
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.[0]?.payload) {
                  const value = payload[0].value as number;
                  return (
                    <div className=" bg-white p-2 font-bold text-black">
                      <p>{`${value.toFixed(2)}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000000"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, fill: '#000000' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
