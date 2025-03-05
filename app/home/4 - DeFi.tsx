export default function DeFi() {
  return (
    <div className="flex h-[80vh] flex-col justify-center md:flex-row md:items-center md:px-8">
      <Bubble />
      <Wording />
    </div>
  );
}

const Wording = () => {
  return (
    <div className="flex-1">
      {/* TITLE */}
      <h1 className="text-3xl font-extrabold md:mb-12 md:text-6xl">
        Finance,
        <br /> without intermediaries.
      </h1>
      {/* TEXT */}
      <div className="flex flex-col gap-2">
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
  return <div className="flex-[1]">hello</div>;
};
