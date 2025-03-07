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
    <div className="flex h-screen flex-col justify-center gap-10 px-4 md:flex-row md:items-center md:gap-0 md:px-8">
      <Wording />
      <div className="w-full rounded-3xl bg-black px-2 pt-4 md:flex-[0.8] md:p-8">
        <YieldChart />
      </div>
      <MobileWording />
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
    <div
      className="flex flex-col items-start justify-around pl-2 md:h-full md:flex-1 md:pl-12"
      ref={ref}>
      {/* TITLE */}
      <div className="">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          An interest rate of
          {/* Un taux d&apos;intérêt de{' '} */}
        </h1>
        <h1 className=" text-4xl font-extrabold md:mt-2 md:text-6xl">
          <span className="rounded-xl bg-black px-[8px] text-white">
            <motion.span>{formattedValue}</motion.span>
          </span>{' '}
          per year.
          {/* par an. */}
        </h1>
      </div>
      {/* TEXT */}
      <div className="hidden max-w-[700px] flex-col gap-2 md:flex">
        <p className="text-lg font-black  md:text-2xl">
          Earn interest on your cash, with no limits,
          <span className="text-black/20"> withdraw whenever you want.</span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          Paid out daily,
          <span className="text-black/20">
            {' '}
            earnings are automatically added and compounded to generate more interest.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          No fees,
          <span className="text-black/20">
            {' '}
            we only earn from the interest our clients generate.
          </span>
        </p>
      </div>
    </div>
  );
};

const YieldChart = () => {
  const [chartData, setChartData] = useState<{ date: number; value: number }[]>([]);
  const [avgApy, setAvgApy] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '6M' | '1Y'>('6M');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartHeight, setChartHeight] = useState(300);
  const [chartLineWidth, setChartLineWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerWidth >= 768 ? 500 : 250);
      setChartLineWidth(window.innerWidth >= 768 ? 4 : 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div className=" flex h-full w-full flex-col items-start justify-center text-white">
      <div className="md:pr0 flex w-full justify-between gap-8 px-4">
        <h1 className="font-black">Interest evolution</h1>

        <div className="flex gap-4 md:gap-8">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`text-sm font-black transition-colors ${
                timeframe === tf ? 'text-white' : 'text-gray-400'
              }`}>
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full">
        {(isLoading || chartData.length === 0 || error) && (
          <div className={`absolute inset-0 flex h-[${chartHeight}px] items-center justify-center`}>
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        <div className={isLoading ? 'invisible' : ''}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={chartData} margin={{ top: 20, right: 50, left: 20, bottom: 10 }}>
              <XAxis
                dataKey="date"
                tickFormatter={(timestamp) => {
                  const date = new Date(timestamp);
                  const month = date.toLocaleString('default', { month: 'short' });
                  const day = date.getDate();
                  return `${day} ${month}`;
                }}
                stroke="#ffffff"
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
                stroke="#ffffff"
                strokeWidth={2}
                tick={{ fontSize: 12, fontWeight: 900 }}
                tickLine={false}
                tickCount={5}
                width={20}
                axisLine={{ strokeWidth: 2 }}
              />
              <ReferenceLine
                y={avgApy}
                stroke="#ffffff"
                strokeDasharray="3 3"
                strokeWidth={2}
                label={{
                  position: 'right',
                  value: `${avgApy.toFixed(2)}%`,
                  fill: '#ffffff',
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
                      <div className="rounded-lg bg-black p-2" style={{ borderRadius: '5px' }}>
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
                stroke="#ffffff"
                strokeWidth={chartLineWidth}
                dot={false}
                activeDot={{ r: 6, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MobileWording = () => {
  return (
    <div className="flex flex-col gap-2 px-2 md:hidden">
      <p className="text-lg font-black  md:text-2xl">
        Earn interest on your cash, with no limits,
        <span className="text-black/20"> withdraw whenever you want.</span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        Paid out daily,
        <span className="text-black/20">
          {' '}
          earnings are automatically added and compounded to generate more interest.
        </span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        No fees,
        <span className="text-black/20"> we only earn from the interest our clients generate.</span>
      </p>
    </div>
  );
};
