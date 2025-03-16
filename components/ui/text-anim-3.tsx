import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurInProps {
  children: string;
  className?: string;
}

export function BlurIn({ children, className = '' }: BlurInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
    margin: '0px 0px -10% 0px',
  });

  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      <AnimatePresence>
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 0.5, delay: i * 0.05 }}>
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
