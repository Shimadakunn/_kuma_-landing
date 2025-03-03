export const getApy = async () => {
  const timestamp7Days = Math.floor(Date.now() / 1000) - 365 * 86400;
  const apiUrl = `https://aave-api-v2.aave.com/data/rates-history?reserveId=0x833589fcd6edb6e08f4c7c32d4f71b54bda029130xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D8453&from=${timestamp7Days}&resolutionInHours=1000`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  // Get the newest rate (last entry)
  const newestRate = data[data.length - 1].liquidityRate_avg;
  const totalSupply = data[data.length - 1].utilizationRate_avg * 240000000;

  // Calculate last week's average (excluding the newest rate)
  const lastWeekAvg =
    data.slice(0, -1).reduce((sum: number, entry: any) => sum + entry.liquidityRate_avg, 0) /
    (data.length - 1);

  // Calculate variation (difference between newest and last week's average)
  const apyVariation = ((newestRate - lastWeekAvg) / lastWeekAvg) * 100;

  console.log('getApy', {
    apy: lastWeekAvg,
    apyVariation,
    totalSupply,
  });
  return {
    apy: lastWeekAvg,
    apyVariation,
    totalSupply,
  };
};

export const getApyHistory = async (timeframe: '1W' | '1M' | '6M' | '1Y') => {
  const now = Math.floor(Date.now() / 1000);

  // Calculate resolution and fromTimestamp based on timeframe
  const timeframeConfig = {
    '1W': { seconds: 7 * 86400, resolution: 6 }, // 6 hours for 1 week
    '1M': { seconds: 30 * 86400, resolution: 160 }, // 36 hours for 1 month
    '6M': { seconds: 180 * 86400, resolution: 500 }, // 216 hours for 6 months
    '1Y': { seconds: 365 * 86400, resolution: 1000 }, // 438 hours for 1 year
  };

  const { seconds, resolution } = timeframeConfig[timeframe as keyof typeof timeframeConfig];
  const fromTimestamp = now - seconds;

  const apiUrl = `https://aave-api-v2.aave.com/data/rates-history?reserveId=0x833589fcd6edb6e08f4c7c32d4f71b54bda029130xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D8453&from=${fromTimestamp}&resolutionInHours=${resolution}`;
  console.log('apiUrl', apiUrl);
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Calculate average and sort rates from oldest to newest
  const avgRate =
    data.reduce((sum: number, entry: any) => sum + entry.liquidityRate_avg, 0) / data.length;
  const rateHistory = data.map((entry: any) => entry.liquidityRate_avg);

  console.log('getApyHistory', {
    avgRate,
    rateHistory,
  });

  return {
    avgRate,
    rateHistory,
  };
};
