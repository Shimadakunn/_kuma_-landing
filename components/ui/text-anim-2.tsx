import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface GradualSpacingProps {
  children: string;
}

export function GradualSpacing({ children }: GradualSpacingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
    margin: '0px 0px -10% 0px',
  });

  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <span ref={ref} className="inline-flex flex-wrap">
      <AnimatePresence>
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={gradual}
            transition={{ duration: 0.25, delay: i * 0.1 }}>
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
