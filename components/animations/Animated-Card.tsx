"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

// Define the props for our AnimatedCard
interface AnimatedCardProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        // Animation for when the card enters the viewport
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        // Animation for when the user hovers over the card
        whileHover={{
          scale: 1.03,
          y: -5,
          boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)",
        }}
        // Define the transition for a smooth, spring-like effect
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          duration: 0.3,
        }}
      >
        {/* We render the shadcn/ui Card component inside our animated div */}
        <Card className="h-full">{children}</Card>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export {
  AnimatedCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
