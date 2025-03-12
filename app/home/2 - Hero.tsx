export default function Hero() {
  return (
    <div className="relative flex h-[100vh]">
      <video
        width="100%"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 z-10 h-full w-full object-cover">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1741820919/phone_gv8kop.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
      <video
        width="100%"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1741820879/lines_cwmh7s.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <h1 className="absolute bottom-10 left-4 right-0 rounded-2xl  text-start text-3xl font-black md:bottom-8 md:left-8 md:text-6xl">
        WAKE UP THE SAVINGS <br /> SLEEPING IN YOUR ACCOUNTS
        {/* REVEILLEZ L&apos;EPARGNE <br /> QUI DORT DANS VOS COMPTES */}
      </h1>
    </div>
  );
}
