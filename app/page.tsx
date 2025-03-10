'use client';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { DeFi, FAQ, Footer, Header, Hero, Interest } from './home';

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
      {/* <Sections />
      <YieldSimulation /> */}
      <Footer />
    </div>
  );
}
