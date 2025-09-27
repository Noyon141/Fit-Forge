"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { AnimatedButton } from "./animations/Animated-Button";

const SignoutButton = () => {
  const handleSignout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <AnimatedButton
        onClick={handleSignout}
        variant="outline"
        className="w-full py-4 text-lg font-medium bg-stone-50 dark:bg-black text-black dark:text-stone-50 border-2 border-black dark:border-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black rounded-2xl"
      >
        <FiLogOut className="mr-3 h-6 w-6" />
        Sign Out
      </AnimatedButton>
    </>
  );
};

export default SignoutButton;
