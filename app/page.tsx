import Image from 'next/image';

import { Component } from '@/components/sections/chart';

export default function Home() {
  return (
    <div className="relative">
      {/* Header */}
      <div className="fixed left-0 right-0 top-0 z-10 flex justify-between px-8 py-4">
        <div className="flex items-center gap-1">
          <Image src="/logo.png" alt="Booklet" width={25} height={25} className="object-contain" />
          <h1 className="text-2xl font-bold">Kuma</h1>
        </div>

        <button className="rounded-lg border border-black px-8 py-2">Download</button>
      </div>

      {/* Hero */}
      <div className="relative flex h-[100vh]">
        <video
          width="800"
          height="240"
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-1/2 top-0 -translate-x-1/2">
          <source src="/hero.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <h1 className="absolute bottom-28 left-0 right-0 text-center text-7xl font-black">
          REVEILLEZ LEPARGNE <br /> QUI DORT DANS VOS COMPTES
        </h1>
      </div>

      {/* Interets */}
      <div className="flex h-[75vh] ">
        <div className="flex w-[75vw] flex-col items-start justify-center  pl-20">
          <h1 className="text-6xl font-black">Gagnez 10% de vos intérêts sur vos comptes</h1>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <button className="mt-8 rounded-xl bg-black px-8 py-4 text-xl font-black text-white">
            Telecharger
          </button>
        </div>
        <div className="flex items-center justify-center ">
          <video width="800" height="240" autoPlay muted loop playsInline>
            <source src="/shape1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Withdraw */}
      <div className="flex h-[75vh]">
        <div className="flex items-center justify-center ">
          <video width="800" height="240" autoPlay muted loop playsInline>
            <source src="/shape2.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex w-[75vw] flex-col items-start justify-center px-10">
          <h1 className="text-6xl font-black">
            Retirez vos fonds en 1 clic a nimporte quel moment
          </h1>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <button className="mt-8 rounded-xl bg-black px-8 py-4 text-xl font-black text-white">
            Telecharger
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="flex h-[75vh]">
        <div className="flex w-[75vw] flex-col items-start justify-center pl-20">
          <h1 className="text-6xl font-black">Une sécurité de pointe qui ne dort jamais</h1>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <button className="mt-8 rounded-xl bg-black px-8 py-4 text-xl font-black text-white">
            Telecharger
          </button>
        </div>
        <div className="flex items-center justify-center">
          <video width="800" height="240" autoPlay muted loop playsInline>
            <source src="/shape3.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Stats */}
      <div className="flex h-[75vh]">
        <div className="flex items-center justify-center ">
          <video width="800" height="240" autoPlay muted loop playsInline>
            <source src="/shape2.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex w-[75vw] flex-col items-start justify-center px-10">
          <h1 className="mb-20 text-6xl font-black">Une solution sure et de confiance</h1>
          <p className="text-7xl font-black">$456M</p>
          <p className="mb-4 text-2xl font-extrabold">Fonds Gérés</p>
          <p className="text-7xl font-black">15</p>
          <p className="mb-4 text-2xl font-extrabold">Audits de sécurité</p>
          <p className=" text-7xl font-black">25K</p>
          <p className="mb-4 text-2xl font-extrabold">Utilisateurs</p>
        </div>
      </div>

      <Component />
    </div>
  );
}
