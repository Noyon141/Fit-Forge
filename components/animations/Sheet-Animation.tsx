"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

// Re-export the standard Sheet components
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

// Re-export styled shadcn/ui components
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// --- Our Animated Components ---

const AnimatedSheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    ...motionSafeProps
  } = props;

  return (
    <SheetPrimitive.Overlay asChild {...props}>
      <motion.div
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-black/80", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </SheetPrimitive.Overlay>
  );
});
AnimatedSheetOverlay.displayName = "AnimatedSheetOverlay";

// Using CVA for dynamic positioning classes
const sheetContentVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

// Dynamic animation variants based on the 'side' prop
const sheetAnimationVariants: Record<string, Variants> = {
  left: {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  right: {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  top: {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  bottom: {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
};

interface AnimatedSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedSheetContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  AnimatedSheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const animationVariants = sheetAnimationVariants[side || "right"];

  return (
    <SheetPortal>
      <AnimatePresence>
        <AnimatedSheetOverlay />
        <SheetPrimitive.Content ref={ref} asChild {...props}>
          <motion.div
            className={cn(sheetContentVariants({ side }), className)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
            <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          </motion.div>
        </SheetPrimitive.Content>
      </AnimatePresence>
    </SheetPortal>
  );
});
AnimatedSheetContent.displayName = "AnimatedSheetContent";

export {
  AnimatedSheetContent,
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter, // <-- Use this instead of SheetContent
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
