import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextAnim1Props {
  children: ReactNode;
  delay?: number;
}

export default function TextAnim1({ children, delay = 0 }: TextAnim1Props) {
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay + i * 0.2,
        ease: 'easeOut',
      },
    }),
  };

  // Convert children to array of strings and elements
  const processChildren = (children: ReactNode): (string | JSX.Element)[] => {
    if (!children) return [];
    const content = children
      .toString()
      .split(/(<br\s*\/?>)/)
      .filter(Boolean);
    return content.map((item, index) => {
      if (item.match(/<br\s*\/?>/)) {
        return <br key={`br-${index}`} />;
      }
      return item;
    });
  };

  const elements = processChildren(children);

  return (
    <motion.div initial="hidden" animate="visible">
      {elements.map((element, elementIndex) => {
        if (typeof element === 'string') {
          const words = element.trim().split(' ');
          return words.map((word, wordIndex) => (
            <motion.span
              key={`${word}-${elementIndex}-${wordIndex}`}
              variants={wordVariants}
              custom={elementIndex * 5 + wordIndex}>
              {word}{' '}
            </motion.span>
          ));
        }
        return element; // This handles the <br/> elements
      })}
    </motion.div>
  );
}
