'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Create and export motion components to avoid errors with JSX in client components
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionA = motion.a;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;

// Also re-export other framer motion utilities
export { AnimatePresence, motion };
