export default function Hero() {
  return (
    <div className="relative flex h-[100vh]">
      <video
        width="100%"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 z-10 h-full w-full object-cover">
        <source src="/phone.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <video
        width="100%"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full  object-cover">
        <source src="/bg.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <h1 className="absolute bottom-10 left-4 right-0 text-start text-3xl font-black md:bottom-16 md:left-24 md:text-7xl">
        REVEILLEZ L&apos;EPARGNE <br /> QUI DORT DANS VOS COMPTES
      </h1>
    </div>
  );
}
