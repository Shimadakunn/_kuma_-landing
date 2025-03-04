export default function DeFi() {
  return  <div
  className="md flex flex-col items-start justify-between md:h-[50vh] md:flex-row md:items-center md:px-8">
  <div className="w-full flex-col items-start justify-center pl-4 md:flex-1 md:pl-0">
    <h1 className="text-3xl font-black md:text-7xl">Un taux d&apos;intérêt de </h1>
        <h1 className=" text-3xl font-black md:mt-4 md:text-7xl">
          <span className="rounded-xl bg-black px-4 py-1 text-white">
            <span>100%</span>
          </span>{' '}
          par an.
        </h1>
    <p className="mt-2 text-lg font-bold text-gray-400 md:mt-8 md:text-2xl">
      Un rendement plus qu&apos;avantageux.
    </p>
      </div>
      <div className="mt-8 w-full md:mt-0 md:flex-[0.8]">
        <Image src="/defi.png" alt="defi" width={500} height={500} />
      </div>
    </div>
  );
}
