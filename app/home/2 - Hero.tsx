import TextAnim1 from '@/components/ui/text-anim-1';

export default function Hero() {
  return (
    <div className="relative flex h-[100vh]">
      <video
        width="100%"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 z-10 mt-10 h-full w-full bg-transparent object-cover md:mt-0">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1742226315/agency-form-date-picker-iphone-mockup_2_zxedsi.webm"
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
        className="absolute inset-0 h-full w-full bg-transparent object-cover">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1741949000/lines_gndgxr.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <h1 className="absolute bottom-10 left-4 right-0 text-start text-2xl font-black md:bottom-8 md:left-8 md:text-6xl">
        <TextAnim1 delay={1}>WAKE UP THE SAVINGS</TextAnim1>
        <TextAnim1 delay={2.5}>SLEEPING IN YOUR ACCOUNTS</TextAnim1>
      </h1>
    </div>
  );
}
