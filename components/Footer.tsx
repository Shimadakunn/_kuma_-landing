'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import WaitingList from '@/components/WaitingList';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="flex flex-col bg-black px-4 py-16 text-white md:px-16 md:py-24">
      {isMobile ? <MobileFooter /> : <DesktopFooter />}
    </div>
  );
}

const DesktopFooter = () => {
  return (
    <>
      <div className="mb-8 flex w-full flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center gap-1">
            <h1 className="text-4xl font-black tracking-tighter">Kuma</h1>
            <Image
              src="https://res.cloudinary.com/dvgc2tpte/image/upload/v1741820845/logo_white_lyc60e.png"
              alt="kuma"
              width={50}
              height={50}
              className="h-[30px] w-[30px] object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold">Finance, for everyone.</h1>
        </div>

        <WaitingList>
          <Button className="flex flex-row items-center gap-2 bg-white text-black">
            <span className="">Early Access</span>
            <ChevronRight size={40} strokeWidth={3.5} />
          </Button>
        </WaitingList>
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className=" text-xs font-medium text-white/40">
          @Kuma LTD - 2025
          <br />
          Bleap Sp. z o.o is a limited liability company incorporated in Poland under company number
          526782047,{' '}
        </h1>
        <Socials />
      </div>
    </>
  );
};

const MobileFooter = () => {
  return (
    <>
      <div className="flex items-center gap-1">
        <h1 className="text-3xl font-black tracking-tighter">Kuma</h1>
        <Image
          src="https://res.cloudinary.com/dvgc2tpte/image/upload/v1741820845/logo_white_lyc60e.png"
          alt="kuma"
          width={50}
          height={50}
          className="h-[25px] w-[25px] object-contain"
        />
      </div>
      <h1 className="text-xl font-extrabold">Finance, for everyone.</h1>
      <div className="my-6 flex w-full flex-row items-center justify-between">
        <Socials />
        <WaitingList>
          <Button className="flex flex-row items-center gap-2 bg-white text-black">
            <span className="">Early Access</span>
            <ChevronRight size={40} strokeWidth={3.5} />
          </Button>
        </WaitingList>
      </div>
      <h1 className=" text-xs font-medium text-white/40">
        @Kuma LTD - 2025
        <br />
        Bleap Sp. z o.o is a limited liability company incorporated in Poland under company number
        526782047,{' '}
      </h1>
    </>
  );
};

const Socials = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className="cursor-pointer rounded-xl bg-white p-2"
        onClick={() => window.open('https://www.linkedin.com/company/kuma-paw/', '_blank')}>
        <Linkedin size={20} className="text-black" fill="black" />
      </div>
      <div
        className="cursor-pointer rounded-xl bg-white p-2"
        onClick={() => window.open('https://x.com/0xShima', '_blank')}>
        <Twitter size={20} className="text-black" fill="black" />
      </div>
      <div
        className="cursor-pointer rounded-xl bg-white p-2"
        onClick={() => window.open('https://www.tiktok.com/@shimadakunn', '_blank')}>
        <Image src="/tiktok.svg" alt="Tiktok" width={20} height={20} className="text-black" />
      </div>
    </div>
  );
};
