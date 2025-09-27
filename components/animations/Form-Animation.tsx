"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import React from "react";

// Define animation variants for the container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

// Define animation variants for the form items
const itemVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

// Interface for AnimatedFormContainer props
interface AnimatedFormContainerProps {
  className?: string;
  children?: React.ReactNode;
}

// The main container that handles the staggering animation
const AnimatedFormContainer = React.forwardRef<
  HTMLDivElement,
  AnimatedFormContainerProps
>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("space-y-6", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
});
AnimatedFormContainer.displayName = "AnimatedFormContainer";

// Interface for AnimatedFormItem props
interface AnimatedFormItemProps {
  className?: string;
  children?: React.ReactNode;
}

// The item wrapper that handles the individual field animation
const AnimatedFormItem = React.forwardRef<
  HTMLDivElement,
  AnimatedFormItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
});
AnimatedFormItem.displayName = "AnimatedFormItem";

export { AnimatedFormContainer, AnimatedFormItem };
