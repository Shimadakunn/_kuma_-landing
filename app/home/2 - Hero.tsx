import TextAnim1 from '@/components/ui/text-anim-1';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const supportsHEVCAlpha = () => {
      const navigator = window.navigator;
      const ua = navigator.userAgent.toLowerCase();
      const hasMediaCapabilities = !!(
        navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
      );
      const isSafari =
        ua.indexOf('safari') != -1 && !(ua.indexOf('chrome') != -1) && ua.indexOf('version/') != -1;
      return isSafari && hasMediaCapabilities;
    };

    const isIE11 = () => {
      return !!window.navigator.userAgent.match(/Trident\/7\./);
    };

    if (!isIE11() && videoRef.current) {
      videoRef.current.src = supportsHEVCAlpha() ? '/phone.mov' : '/phone.webm';
    }
  }, []);

  return (
    <div className="relative flex h-[100vh]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute left-1/2 top-1/2 z-10 mt-8 aspect-square h-full -translate-x-1/2 -translate-y-1/2 object-cover md:mt-0"></video>
      {/* <video
        ref={videoRef}
        width="100%"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover">
        Your browser does not support the video tag.
      </video> */}

      <h1 className="absolute bottom-10 left-4 right-0 text-start text-2xl font-black md:bottom-8 md:left-8 md:text-6xl">
        <TextAnim1 delay={1}>WAKE UP THE SAVINGS</TextAnim1>
        <TextAnim1 delay={2.5}>SLEEPING IN YOUR ACCOUNTS</TextAnim1>
      </h1>
    </div>
  );
}
