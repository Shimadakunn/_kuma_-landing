'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-black text-white text-xl font-black relative overflow-hidden',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        white: 'bg-white text-black',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      shadow: {
        default: 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shadow: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  noShadow?: boolean;
  animateBackground?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animateBackground = false,
      noShadow = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : motion.button;
    const motionProps = !asChild
      ? {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          onTapStart: () => triggerHaptic(),
        }
      : {};

    // Haptic feedback function for web
    const triggerHaptic = () => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }
    };

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            shadow: noShadow ? 'none' : 'default',
            className,
          })
        )}
        ref={ref}
        {...motionProps}
        {...props}>
        {animateBackground && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-white"
            initial={{ opacity: 0 }}
            whileTap={{ opacity: 0.4 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="relative z-10 flex flex-row items-center gap-2">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
