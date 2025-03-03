import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex justify-between px-8 py-4">
      <div className="flex items-center gap-1">
        <Image src="/logo.png" alt="kuma" width={25} height={25} className="object-contain" />
        <h1 className="text-2xl font-bold">Kuma</h1>
      </div>

      <Button>Download</Button>
    </div>
  );
}
