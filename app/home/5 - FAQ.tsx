import { BlurIn } from '@/components/ui/text-anim-3';

export default function FAQ() {
  return (
    <div className="flex h-[95vh] flex-col justify-center gap-2 px-4 py-12 md:flex-row md:items-center md:gap-8 md:py-0">
      <Wording />
      <YieldSimulation />
      <MobileWording />
    </div>
  );
}

const Wording = () => {
  return (
    <div className="flex flex-col items-start justify-around pl-2 md:h-full md:flex-1 md:pl-12">
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold md:text-6xl">
        Security by <BlurIn>design.</BlurIn>
      </h1>

      {/* TEXT */}
      <div className="hidden max-w-[700px] flex-col gap-2 md:flex">
        <p className="text-lg font-black md:text-2xl">
          15 security audits
          <span className="text-black/20"> successfully passed, ensuring the safety of funds.</span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          $28 billion under management
          <span className="text-black/20">
            {' '}
            by the protocol, zero hacks since its creation five years ago.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          No legal entity can force
          <span className="text-black/20">
            {' '}
            access to your funds. You are the sole owner of your savings.
          </span>
        </p>
      </div>
    </div>
  );
};

const YieldSimulation = () => {
  return (
    <div className="relative flex items-center justify-center md:flex-1">
      <video autoPlay muted loop playsInline className="max-h-[600px]">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1742249772/holo-blobs_3_x9gdbp.webm"
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
      <p className="text-lg font-black md:text-2xl">
        15 security audits
        <span className="text-black/20"> successfully passed, ensuring the safety of funds.</span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        $28 billion under management
        <span className="text-black/20">
          {' '}
          by the protocol, zero hacks since its creation five years ago.
        </span>
      </p>
      <p className="text-lg font-black md:text-2xl">
        No legal entity can force access
        <span className="text-black/20">
          {' '}
          to your funds. You are the sole owner of your savings.
        </span>
      </p>
    </div>
  );
};
