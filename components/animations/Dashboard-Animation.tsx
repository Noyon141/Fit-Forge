"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import React from "react";

// Animation variants for dashboard cards
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.4,
    },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 400,
      duration: 0.2,
    },
  },
};

// Animation variants for dashboard grid containers
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Animation variants for dashboard header elements
const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.5,
    },
  },
};

// Dashboard Card component
interface DashboardCardProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ id, className, children, onClick, hoverable = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        id={id}
        className={cn(
          "bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 rounded-2xl p-6 shadow-lg",
          onClick && "cursor-pointer",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverable ? "hover" : undefined}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
DashboardCard.displayName = "DashboardCard";

// Dashboard Grid Container
interface DashboardGridProps {
  className?: string;
  children?: React.ReactNode;
}

const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("grid gap-6", className)}
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
DashboardGrid.displayName = "DashboardGrid";

// Dashboard Header
interface DashboardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const DashboardHeader = React.forwardRef<HTMLDivElement, DashboardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("mb-8", className)}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
DashboardHeader.displayName = "DashboardHeader";

// Dashboard Content Container
interface DashboardContentProps {
  className?: string;
  children?: React.ReactNode;
}

const DashboardContent = React.forwardRef<
  HTMLDivElement,
  DashboardContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("p-6 lg:p-8", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
DashboardContent.displayName = "DashboardContent";

export { DashboardCard, DashboardContent, DashboardGrid, DashboardHeader };
