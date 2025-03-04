import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <div className="relative flex-row items-center justify-center p-8 ">
      <video
        width="100%"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover">
        <source src="/footer.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full flex-col items-start justify-start">
        <h1 className="text-2xl font-extrabold">Faites beaucoup avec moins.</h1>
        <Button className="flex flex-row items-center gap-2">
          <span className="">Download</span>
          <ChevronRight size={40} strokeWidth={1.5} />
        </Button>
        <div className="flex items-center gap-1">
          <h1 className="text-4xl font-black tracking-tighter">Kuma</h1>
          <Image src="/logo.png" alt="kuma" width={30} height={30} className="object-contain" />
        </div>
      </div>
      <div className="flex w-full items-start justify-center">
        <h1 className=" font-medium">
          @Kuma LTD - 2025
          <br />
          Bleap Sp. z o.o is a limited liability company incorporated in Poland under company number
          526782047, with its registered office at Piotrkowska, nr 116, lok. 52, Łódź, 90-006,
          Republic of Poland and is registered in the Polish Register on Virtual Currencies Business
          Activity{' '}
        </h1>
      </div>
    </div>
  );
}
