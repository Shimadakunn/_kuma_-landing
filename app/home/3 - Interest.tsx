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
  return (
    <div className="flex h-[100vh] flex-col justify-center md:flex-row md:items-center md:px-8">
      <Wording />
      <div className="mt-8 w-full md:mt-0 md:flex-[0.8]">
        <YieldChart />
      </div>
    </div>
  );
}

const Wording = () => {
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
    <div className="flex-col pl-4 md:flex-1 md:pl-0" ref={ref}>
      {/* TITLE */}
      <div className="mb-4 md:mb-20">
        <h1 className="text-3xl font-extrabold md:text-7xl">
          An interest rate of
          {/* Un taux d&apos;intérêt de{' '} */}
        </h1>
        <h1 className=" text-3xl font-extrabold md:mt-2 md:text-7xl">
          <span className="rounded-xl bg-black px-[8px] text-white">
            <motion.span>{formattedValue}</motion.span>
          </span>{' '}
          per year.
          {/* par an. */}
        </h1>
      </div>
      {/* TEXT */}
      <div className="flex flex-col gap-2">
        <p className="text-lg font-black  md:text-2xl">
          Earn interest on your cash, with no limits,
          <span className="text-black/20">
            {' '}
            withdraw
            <br className="hidden md:block" /> whenever you want.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          Paid out daily,
          <span className="text-black/20">
            {' '}
            earnings are automatically added
            <br className="hidden md:block" /> and compounded to generate more interest.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          No fees,
          <span className="text-black/20">
            {' '}
            we only earn from the interest
            <br className="hidden md:block" /> our clients generate.
          </span>
        </p>
      </div>
    </div>
  );
};

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
    <div className=" flex h-full w-full flex-col items-start justify-center">
      <div className="flex w-full justify-end gap-8 pr-12 md:pr-24">
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
        {isLoading && (
          <div className="absolute inset-0 flex h-[200px] items-center justify-center bg-white">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
          </div>
        )}
        <div className={isLoading ? 'invisible' : ''}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 50, left: 20, bottom: 20 }}>
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
                minTickGap={20}
              />
              <YAxis
                orientation="left"
                tickFormatter={(value) => `${value}%`}
                stroke="#000000"
                strokeWidth={2}
                tick={{ fontSize: 12, fontWeight: 900 }}
                tickLine={false}
                tickCount={5}
                width={20}
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
                  offset: 5,
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
    </div>
  );
};
