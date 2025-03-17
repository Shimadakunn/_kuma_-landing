import { Button } from '@/components/ui/button';
import WaitingList from '@/components/WaitingList/page';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
  const [showBlur, setShowBlur] = useState(false);
  const [textWhite, setTextWhite] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollY < viewportHeight) {
        setShowBlur(false);
        setTextWhite(false);
      }
      if (scrollY >= viewportHeight && scrollY < viewportHeight * 1.8) {
        setShowBlur(true);
      }
      if (scrollY >= viewportHeight * 1.8 && scrollY < viewportHeight * 3) {
        setShowBlur(false);
      }
      if (scrollY >= viewportHeight * 3) {
        setShowBlur(true);
      }
      if (scrollY >= viewportHeight && scrollY < viewportHeight * 1.9) {
        setTextWhite(false);
      }
      if (scrollY >= viewportHeight * 1.9 && scrollY < viewportHeight * 2.85) {
        setTextWhite(true);
      }
      if (scrollY >= viewportHeight * 2.85) {
        setTextWhite(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex items-start justify-between px-4 py-4 md:px-8 md:py-4">
      <div
        className={`absolute left-0 right-0 top-0 -z-10 h-[8vh] bg-white/60 backdrop-blur-xl transition-opacity duration-300 md:h-[8vh] ${showBlur ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="flex items-center gap-1">
        <h1
          className={`text-4xl font-black tracking-tighter md:text-5xl ${textWhite ? 'text-white' : 'text-black'}`}>
          Kuma
        </h1>
        <Image
          src={`${textWhite ? 'https://res.cloudinary.com/dvgc2tpte/image/upload/v1741820845/logo_white_lyc60e.png' : 'https://res.cloudinary.com/dvgc2tpte/image/upload/v1741820839/logo_uznrm0.png'}`}
          alt="kuma"
          width={500}
          height={500}
          className="h-[30px] w-[30px] object-contain md:h-[40px] md:w-[40px]"
        />
      </div>
      <WaitingList />
      {/* <div className="hidden flex-col items-start gap-1 rounded-xl bg-black p-2 md:flex">
        <p className="mx-auto text-center font-black tracking-[0.1em] text-white">Download App</p>
        <Image src="/qrcode.png" alt="kuma" width={150} height={150} className="object-contain" />
      </div>
      <div className="mr-0 md:hidden">
        <Button className="gap-2">
          <span className="">Download</span>
          <ChevronRight size={10} strokeWidth={1.5} />
        </Button>
      </div> */}
    </div>
  );
}
