import TextAnim1 from '@/components/ui/text-anim-1';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState({ phone: false, lines: false });

  useEffect(() => {
    if (videosLoaded.phone && videosLoaded.lines) {
      setIsLoading(false);
    }
  }, [videosLoaded]);

  const handleVideoLoad = (videoName: 'phone' | 'lines') => {
    setVideosLoaded((prev) => ({ ...prev, [videoName]: true }));
  };

  return (
    <div className="relative flex h-[100vh]">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            {/* <p className="text-white">Loading experience...</p> */}
          </div>
        </div>
      )}
      <video
        width="100%"
        autoPlay
        muted
        playsInline
        onLoadedData={() => handleVideoLoad('phone')}
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
        onLoadedData={() => handleVideoLoad('lines')}
        className="absolute inset-0 h-full w-full object-cover">
        <source
          src="https://res.cloudinary.com/dvgc2tpte/video/upload/v1741949000/lines_gndgxr.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <h1 className="absolute bottom-10 left-4 right-0 rounded-2xl  text-start text-3xl font-black md:bottom-8 md:left-8 md:text-6xl">
        <TextAnim1 delay={1}>WAKE UP THE SAVINGS</TextAnim1>
        <TextAnim1 delay={2.5}>SLEEPING IN YOUR ACCOUNTS</TextAnim1>
      </h1>
    </div>
  );
}
