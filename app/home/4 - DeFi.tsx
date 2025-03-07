export default function DeFi() {
  return (
    <div className="flex h-screen flex-col-reverse justify-center gap-10 px-4 md:flex-row md:items-center md:gap-8">
      <MobileWording />
      <Bubble />
      <Wording />
    </div>
  );
}

const Wording = () => {
  return (
    <div className="flex flex-col items-start justify-around border md:h-full md:flex-1 md:pl-0">
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold md:mb-12 md:text-6xl">
        Finance,
        <br className="hidden md:block" /> without intermediaries.
      </h1>
      {/* TEXT */}
      <div className="hidden max-w-[700px] flex-col gap-2 md:flex">
        <p className="text-lg font-black  md:text-2xl">
          Blockchain-based,
          <span className="text-black/20">
            {' '}
            cutting out intermediaries to ensure optimal returns.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          $28 billion dollars under management
          <span className="text-black/20">
            {' '}
            by the protocol, zero hacks since its creation five years ago.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          15 security audits
          <span className="text-black/20"> successfully passed, ensuring the safety of funds.</span>
        </p>
      </div>
    </div>
  );
};

const Bubble = () => {
  return (
    <div className="relative flex items-center justify-center md:flex-1">
      <video autoPlay muted loop playsInline className="">
        <source src="/blobs.webm" type="video/webm" />
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
        <span className="text-black/20">
          {' '}
          cutting out intermediaries to ensure optimal returns.
        </span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        $28 billion dollars under management
        <span className="text-black/20">
          {' '}
          by the protocol, zero hacks since its creation five years ago.
        </span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        15 security audits
        <span className="text-black/20"> successfully passed, ensuring the safety of funds.</span>
      </p>
    </div>
  );
};
