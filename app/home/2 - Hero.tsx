export default function Hero() {
  return (
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
      <h1 className="absolute bottom-16 left-24 right-0 text-start text-7xl font-black">
        REVEILLEZ L&apos;EPARGNE <br /> QUI DORT DANS VOS COMPTES
      </h1>
    </div>
  );
}
