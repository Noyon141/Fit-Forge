"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface AnimatedBackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function AnimatedBackButton({ 
  href, 
  label = "Back", 
  className = "" 
}: AnimatedBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      className={`
        inline-flex items-center gap-3 px-4 py-2 
        text-black dark:text-stone-50 
        hover:bg-black hover:text-stone-50 
        dark:hover:bg-stone-50 dark:hover:text-black
        rounded-xl font-medium transition-all duration-200
        border-2 border-transparent
        hover:border-black dark:hover:border-stone-50
        ${className}
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-base">{label}</span>
    </motion.button>
  );
}