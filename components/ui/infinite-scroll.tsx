// InfiniteScroll.jsx

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { CircleDollarSign } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(Observer);

const generateItems = () => {
  const timeLabels = [
    'Today',
    'Yesterday',
    '2 days ago',
    '3 days ago',
    '4 days ago',
    '5 days ago',
    '6 days ago',
    '1 week ago',
    '8 days ago',
    '9 days ago',
    '10 days ago',
    '11 days ago',
    '12 days ago',
    '13 days ago',
    '2 weeks ago',
  ];

  // Generate deterministic random amounts between 0.014 and 5.00
  const generateAmount = (index: number) => {
    const seed = Math.sin(index * 12345) * 10000;
    const normalized = seed - Math.floor(seed);
    return (normalized * (5.0 - 0.014) + 0.014).toFixed(4);
  };

  return Array.from({ length: 15 }, (_, i) => ({
    timeLabel: timeLabels[i],
    amount: generateAmount(i),
  }));
};

export default function InfiniteScroll({
  // ----- Layout / Style Props -----
  width = '30rem', // Width of the outer wrapper
  maxHeight = '100%', // Max-height of the outer wrapper
  negativeMargin = '-2.5em', // Negative margin to reduce spacing between items
  itemMinHeight = 150, // Fixed height for each item
  // ----- Tilt Props -----
  isTilted = false, // Whether the container is in "skewed" perspective
  tiltDirection = 'left', // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay = false, // Whether it should automatically scroll
  autoplaySpeed = 0.5, // Speed (pixels/frame approx.)
  autoplayDirection = 'down', // "down" or "up"
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const items = generateItems();

  const getTiltTransform = () => {
    if (!isTilted) return 'none';
    return tiltDirection === 'left'
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem as HTMLElement);
    const itemHeight = (firstItem as HTMLElement).offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child as HTMLElement, { y });
    });

    let rafId: number | null = null;
    if (autoplay) {
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child as HTMLElement, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [items, autoplay, autoplaySpeed, autoplayDirection, isTilted, tiltDirection, negativeMargin]);

  return (
    <div
      className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden overscroll-none"
      ref={wrapperRef}
      style={{ maxHeight }}>
      {/* Container */}
      <div
        className="flex origin-center flex-col gap-0 overscroll-contain px-4"
        ref={containerRef}
        style={{
          width,
          transform: getTiltTransform(),
          cursor: 'default',
        }}>
        {items.map((item, i) => (
          <div
            className="flex items-center justify-between rounded-3xl border-2 border-white px-6"
            key={i}
            style={{
              height: `${itemMinHeight}px`,
              marginTop: negativeMargin,
            }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <CircleDollarSign size={100} className="h-[50px] w-[50px] text-white" />
              </div>
              <div>
                <p className="text-lg font-black md:text-3xl">REWARDS</p>
                <p className="text-lg font-bold text-white/20 md:text-2xl">{item.timeLabel}</p>
              </div>
            </div>
            <div className="text-lg font-black md:text-3xl">${item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
