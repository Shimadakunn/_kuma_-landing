import Image from 'next/image';

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex items-start justify-between px-8 py-4">
      <div className="flex items-center gap-1">
        <h1 className="text-5xl font-black tracking-tighter">Kuma</h1>
        <Image src="/logo.png" alt="kuma" width={40} height={40} className="object-contain" />
      </div>

      {/* <Button>Download</Button> */}
      <div className="flex flex-col items-start gap-2 rounded-xl bg-black p-2">
        <p className=" ml-2 text-center font-black text-white">Download App</p>
        <Image src="/qrcode.png" alt="kuma" width={150} height={150} className=" object-contain" />
      </div>
    </div>
  );
}
