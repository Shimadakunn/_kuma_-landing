import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex items-start justify-between px-4 py-4 md:px-8 md:py-4">
      <div className="flex items-center gap-1">
        <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Kuma</h1>
        <Image
          src="/logo.png"
          alt="kuma"
          width={30}
          height={30}
          className="object-contain md:h-[40px] md:w-[40px]"
        />
      </div>

      <div className="hidden flex-col items-start gap-2 rounded-xl bg-black p-2 md:flex">
        <p className=" ml-2 text-center font-black text-white">Download App</p>
        <Image src="/qrcode.png" alt="kuma" width={150} height={150} className=" object-contain" />
      </div>
      <div className="mr-0 md:hidden">
        <Button className="gap-2">
          <span className="">Download</span>
          <ChevronRight size={10} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
