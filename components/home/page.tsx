'use client';

import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import Header from '../Header';
import Hero from './1 - Hero';
import Interest from './2 - Apy';
import DeFi from './3 - Rewards';
import FAQ from './4 - Security';
import Footer from '../Footer';

export default function Home() {
  const { fetchApy, fetchApyHistory } = useStore();
  useEffect(() => {
    fetchApy();
    fetchApyHistory();
  }, [fetchApy, fetchApyHistory]);
  return (
    <div className="relative">
      <Header />
      <Hero />
      <Interest />
      <DeFi />
      <FAQ />
      <Footer />
    </div>
  );
}
