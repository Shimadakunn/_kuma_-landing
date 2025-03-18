'use client';

import TextAnim1 from '@/components/ui/text-anim-1';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isIOSChrome, setIsIOSChrome] = useState(false);
  const [supportsHEVCAlpha, setSupportsHEVCAlpha] = useState(false);

  useEffect(() => {
    const checkBrowser = () => {
      const ua = window.navigator.userAgent.toLowerCase();
      setIsIOSChrome(ua.includes('crios') || (ua.includes('chrome') && ua.includes('mobile')));

      const navigator = window.navigator;
      const hasMediaCapabilities = !!(
        navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
      );
      const isSafari =
        ua.indexOf('safari') != -1 && !(ua.indexOf('chrome') != -1) && ua.indexOf('version/') != -1;
      setSupportsHEVCAlpha(isSafari && hasMediaCapabilities);
    };

    const isIE11 = () => {
      return !!window.navigator.userAgent.match(/Trident\/7\./);
    };

    checkBrowser();

    if (!isIE11()) {
      if (isIOSChrome) {
        setVideoSrc(
          'https://res.cloudinary.com/dvgc2tpte/video/upload/v1742292150/phone-chrome_ngjjug.mov'
        );
      } else {
        setVideoSrc(
          supportsHEVCAlpha
            ? 'https://res.cloudinary.com/dvgc2tpte/video/upload/v1742292147/phone_pqu7jr.mov'
            : 'https://res.cloudinary.com/dvgc2tpte/video/upload/v1742292147/phone_jaxcbu.webm'
        );
      }
    }
  }, [isIOSChrome, supportsHEVCAlpha]);

  return (
    <div className="relative flex h-[100dvh]">
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          className={`absolute left-1/2 top-1/2 ${isIOSChrome ? '-z-10' : 'z-10'} mt-4 aspect-square h-full -translate-x-1/2 -translate-y-1/2 object-cover md:mt-0`}
        />
      )}
      {!isIOSChrome && (
        <video
          ref={videoRef}
          src={
            supportsHEVCAlpha
              ? 'https://res.cloudinary.com/dvgc2tpte/video/upload/v1742292148/lines_fyzk85.mov'
              : 'https://res.cloudinary.com/dvgc2tpte/video/upload/v1742292147/lines_mz1tug.webm'
          }
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover">
          Your browser does not support the video tag.
        </video>
      )}

      <h1 className="absolute bottom-10 left-4 right-0 text-start text-2xl font-black md:bottom-8 md:left-8 md:text-6xl">
        <TextAnim1 delay={1}>WAKE UP THE SAVINGS</TextAnim1>
        <TextAnim1 delay={2.5}>SLEEPING IN YOUR ACCOUNTS</TextAnim1>
      </h1>
    </div>
  );
}
