export default function DeFi() {
  return (
    <div className="flex h-[95vh] flex-col-reverse justify-center gap-10 bg-black px-4 text-white md:flex-row md:items-center md:gap-8">
      <MobileWording />
      <Bubble />
      <Wording />
    </div>
  );
}

const Wording = () => {
  return (
    <div className="flex flex-col items-start justify-around md:h-full md:flex-1 md:pl-0">
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold md:mb-12 md:text-6xl">
        Finance,
        <br className="hidden md:block" /> without intermediaries.
      </h1>
      {/* TEXT */}
      <div className="hidden max-w-[700px] flex-col gap-2 md:flex">
        <p className="text-lg font-black  md:text-2xl">
          Blockchain-based,
          <span className="text-white/40">
            {' '}
            cutting out intermediaries to ensure optimal returns.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          $28 billion dollars under management
          <span className="text-white/40">
            {' '}
            by the protocol, zero hacks since its creation five years ago.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          15 security audits
          <span className="text-white/40"> successfully passed, ensuring the safety of funds.</span>
        </p>
      </div>
    </div>
  );
};

const Bubble = () => {
  return (
    <div className="relative flex items-center justify-center md:flex-1">
      <video autoPlay muted loop playsInline className="">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1741821180/blobs_btmvqq.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const MobileWording = () => {
  return (
    <div className="flex flex-col gap-2 px-2 md:hidden">
      <p className="text-lg font-black  md:text-2xl">
        Blockchain-based,
        <span className="text-white/40">
          {' '}
          cutting out intermediaries to ensure optimal returns.
        </span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        $28 billion dollars under management
        <span className="text-white/40">
          {' '}
          by the protocol, zero hacks since its creation five years ago.
        </span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        15 security audits
        <span className="text-white/40"> successfully passed, ensuring the safety of funds.</span>
      </p>
    </div>
  );
};
