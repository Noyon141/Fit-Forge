"use client";

import { signOut } from "next-auth/react";
import { AnimatedButton } from "./animations/Animated-Button";

const SignoutButton = () => {
  const handleSignout = async () => {
    await signOut({ callbackUrl: "/sign-in" });
  };
  return (
    <>
      <AnimatedButton onClick={handleSignout}>Sign out</AnimatedButton>
    </>
  );
};

export default SignoutButton;
