export default function Security() {
  return (
    <div className="flex h-[95vh] flex-col justify-center gap-10 px-4 md:flex-row md:items-center md:gap-0 md:px-8">
      <Wording />
      <div className="w-full rounded-3xl bg-black px-2 pt-4 md:flex-[0.8] md:p-8">
        <YieldChart />
      </div>
      <MobileWording />
    </div>
  );
}

const Wording = () => {
  const { apy } = useStore();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
    margin: '0px 0px -10% 0px',
  });

  const animatedValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView) {
      animatedValue.set(apy * 100);
    }
  }, [apy, animatedValue, isInView]);

  const formattedValue = useTransform(animatedValue, (value) => value.toFixed(2) + '%');
  return (
    <div
      className="flex flex-col items-start justify-around pl-2 md:h-full md:flex-1 md:pl-12"
      ref={ref}>
      {/* TITLE */}
      <div className="">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          An interest rate of
          {/* Un taux d&apos;intérêt de{' '} */}
        </h1>
        <h1 className=" text-4xl font-extrabold md:mt-2 md:text-6xl">
          <span className="rounded-xl bg-black px-[8px] text-white">
            <motion.span>{formattedValue}</motion.span>
          </span>{' '}
          per year.
          {/* par an. */}
        </h1>
      </div>
      {/* TEXT */}
      <div className="hidden max-w-[700px] flex-col gap-2 md:flex">
        <p className="text-lg font-black  md:text-2xl">
          Earn interest on your cash, with no limits,
          <span className="text-black/20"> withdraw whenever you want.</span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          Paid out daily,
          <span className="text-black/20">
            {' '}
            earnings are automatically added and compounded to generate more interest.
          </span>
        </p>
        <p className="text-lg font-black md:text-2xl">
          No fees,
          <span className="text-black/20">
            {' '}
            we only earn from the interest our clients generate.
          </span>
        </p>
      </div>
    </div>
  );
};
