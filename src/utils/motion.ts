import React from 'react';
import { type Transition, type Variants } from 'motion/react';

/**
 * Apple / Linear-inspired restrained cubic-bezier easing curve.
 */
export const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SOFT_SPRING: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

export const HOVER_LIFT_TRANSITION: Transition = {
  duration: 0.2,
  ease: 'easeOut',
};

export const DEFAULT_VIEWPORT = {
  once: true,
  amount: 0.16,
  margin: '0px 0px -40px 0px',
} as const;

/**
 * Synchronously reads `(prefers-reduced-motion: reduce)` on initial mount
 * so components never trigger an extra post-mount re-render or flash.
 */
export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = React.useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

/**
 * Generates reduced-motion-aware variants for scroll-triggered section headers and blocks.
 */
export function createFadeUpVariants(
  reducedMotion: boolean,
  distance: number = 22,
  duration: number = 0.6,
  delay: number = 0
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: SMOOTH_EASE,
      },
    },
  };
}

/**
 * Generates reduced-motion-aware directional slide-in variants (fade-left / fade-right).
 */
export function createSlideHorizontalVariants(
  reducedMotion: boolean,
  direction: 'left' | 'right',
  distance: number = 28,
  duration: number = 0.65,
  delay: number = 0
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, x: 0 },
      visible: { opacity: 1, x: 0, transition: { duration: 0 } },
    };
  }
  const initialX = direction === 'left' ? -distance : distance;
  return {
    hidden: { opacity: 0, x: initialX },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration,
        delay,
        ease: SMOOTH_EASE,
      },
    },
  };
}

/**
 * Generates reduced-motion-aware subtle scale + fade-up variants for feature cards and panels.
 */
export function createScaleInVariants(
  reducedMotion: boolean,
  initialScale: number = 0.97,
  distance: number = 18,
  duration: number = 0.65,
  delay: number = 0
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, scale: 1, y: 0 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, scale: initialScale, y: distance },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: SMOOTH_EASE,
      },
    },
  };
}

/**
 * Generates reduced-motion-aware parent container variants for staggered children grids.
 */
export function createStaggerContainerVariants(
  reducedMotion: boolean,
  staggerChildren: number = 0.09,
  delayChildren: number = 0.05
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

/**
 * Generates reduced-motion-aware child item variants for staggered card grids.
 */
export function createStaggerItemVariants(
  reducedMotion: boolean,
  distance: number = 20,
  duration: number = 0.55
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: SMOOTH_EASE,
      },
    },
  };
}
