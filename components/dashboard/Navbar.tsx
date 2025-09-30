"use client";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import { Sheet } from "@/components/animations/Sheet-Animation";
import { Button } from "@/components/ui/button";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  FiActivity,
  FiHome,
  FiMenu,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import SignoutButton from "../Signout-Button";
import { ModeToggle } from "../dark-mode/Mode-Toggle";

const navItems = [
  { href: "/dashboard", icon: FiHome, label: "Dashboard" },
  { href: "/dashboard/workouts", icon: FiActivity, label: "Workouts" },
  { href: "/dashboard/profile", icon: FiUser, label: "Profile" },
  { href: "/dashboard/settings", icon: FiSettings, label: "Settings" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-stone-50 dark:bg-black border-r-2 border-black dark:border-stone-50 flex-col">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black text-xl font-bold">
              F
            </div>
            <span className="text-2xl font-bold text-black dark:text-stone-50">
              FitForge
            </span>
          </Link>
        </div>

        <div className="flex-1 px-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <AnimatedButton
                variant="ghost"
                className="w-full justify-start py-4 px-6 mb-2 text-lg font-medium text-black dark:text-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black rounded-2xl border-0"
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.label}
              </AnimatedButton>
            </Link>
          ))}
        </div>

        <div className="p-6 border-t-2 border-black dark:border-stone-50">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-1 justify-between">
              <p className="text-lg font-medium text-black dark:text-stone-50">
                {session?.user?.role || "User"}
              </p>
              <ModeToggle />
            </div>
            <p className="text-black dark:text-stone-50 opacity-70">
              {session?.user?.email}
            </p>
          </div>
          <SignoutButton />
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-stone-50 dark:bg-black border-b-2 border-black dark:border-stone-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black text-lg font-bold">
              F
            </div>
            <span className="text-xl font-bold text-black dark:text-stone-50">
              FitForge
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="text-black dark:text-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black border-0 rounded-xl"
          >
            <FiMenu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetPrimitive.Portal>
          <SheetPrimitive.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
          </SheetPrimitive.Overlay>
          <SheetPrimitive.Content asChild>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 400 }}
              className="fixed right-0 top-0 z-50 h-full w-80 bg-stone-50 dark:bg-black border-l-2 border-black dark:border-stone-50 flex flex-col shadow-lg"
            >
              <SheetPrimitive.DialogTitle className="sr-only">
                FitForge
              </SheetPrimitive.DialogTitle>
              <div className="flex items-center justify-between p-6 border-b-2 border-black dark:border-stone-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black text-xl font-bold">
                    F
                  </div>
                  <span className="text-2xl font-bold text-black dark:text-stone-50">
                    FitForge
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-black dark:text-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black border-0 rounded-xl"
                >
                  <FiX className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <AnimatedButton
                      variant="ghost"
                      className="w-full justify-start py-4 px-6 mb-3 text-lg font-medium text-black dark:text-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black rounded-2xl border-0"
                    >
                      <item.icon className="mr-4 h-6 w-6" />
                      {item.label}
                    </AnimatedButton>
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t-2 border-black dark:border-stone-50">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-1 justify-between">
                    <p className="text-lg font-medium text-black dark:text-stone-50">
                      {session?.user?.email || "User"}
                    </p>
                    <ModeToggle />
                  </div>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    {session?.user?.email}
                  </p>
                </div>
                <SignoutButton />
              </div>
            </motion.div>
          </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
      </Sheet>
    </>
  );
}
