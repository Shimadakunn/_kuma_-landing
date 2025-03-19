import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getApy, getApyHistory } from './aave-apy';

interface Store {
  apy: number;
  totalSupply: number;
  apyHistory: number[];
  avgApy: number;
  timeframe: '1W' | '1M' | '6M' | '1Y';
  fetchApy: () => Promise<void>;
  fetchApyHistory: () => Promise<void>;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      apy: 0,
      totalSupply: 0,
      avgApy: 0,
      apyHistory: [],
      timeframe: '1W',
      fetchApy: async () => {
        const json = await getApy();
        set((state) => ({
          ...state,
          apy: json.apy,
          totalSupply: json.totalSupply,
        }));
      },
      fetchApyHistory: async () => {
        const { timeframe } = get();
        const json = await getApyHistory(timeframe);
        set((state) => ({
          ...state,
          avgApy: json.avgRate,
          apyHistory: json.rateHistory,
        }));
      },
    }),
    {
      name: 'apy',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
