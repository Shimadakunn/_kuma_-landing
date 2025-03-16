import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="relative space-y-6 bg-black p-6 text-white">
      {/* Background */}
      <div className="flex w-full flex-row items-center justify-between pr-10">
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
          <h1 className="text-2xl font-extrabold">Faites beaucoup avec moins.</h1>
        </div>

        <Button className="flex flex-row items-center gap-2">
          <span className="">Download</span>
          <ChevronRight size={40} strokeWidth={1.5} />
        </Button>
      </div>
      <div className="flex w-full items-start justify-start">
        <h1 className=" text-xs font-medium text-white/40">
          @Kuma LTD - 2025
          <br />
          Bleap Sp. z o.o is a limited liability company incorporated in Poland under company number
          526782047,{' '}
        </h1>
      </div>
    </div>
  );
}
