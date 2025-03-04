'use client';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { Footer, Header, Hero, Interest, Sections, YieldSimulation } from './home';

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
      {/* <Sections />
      <YieldSimulation /> */}
      <Footer />
    </div>
  );
}
