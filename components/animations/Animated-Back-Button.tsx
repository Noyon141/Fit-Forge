"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface AnimatedBackButtonProps {
  className?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
}

const AnimatedBackButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedBackButtonProps
>(({ className, label = "Back", href, onClick, ...props }, ref) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-3 px-6 py-3 text-lg font-semibold text-black dark:text-stone-50 bg-transparent border-2 border-black dark:border-stone-50 rounded-2xl transition-all hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-stone-50",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
      {...props}
    >
      <motion.div
        whileHover={{ x: -2 }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.div>
      {label}
    </motion.button>
  );
});

AnimatedBackButton.displayName = "AnimatedBackButton";

export { AnimatedBackButton };
