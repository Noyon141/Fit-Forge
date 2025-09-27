"use client";
import { AnimatedButton } from "@/components/animations/Animated-Button";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { signIn } from "next-auth/react";

import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the sign-up logic,
    const res = await axios.post("/api/auth/sign-up", {
      name,
      email,
      password,
    });

    if (res.status === 200) {
      window.location.href = "/sign-in";
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AnimatedFormContainer className="bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <AnimatedFormItem>
              <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-stone-50 mb-4">
                Join FitForge
              </h1>
            </AnimatedFormItem>
            <AnimatedFormItem>
              <p className="text-xl text-black dark:text-stone-50">
                Create your account and start your transformation
              </p>
            </AnimatedFormItem>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatedFormItem>
              <Label
                htmlFor="name"
                className="block mb-3 text-lg font-medium text-black dark:text-stone-50"
              >
                Full Name
              </Label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </AnimatedFormItem>

            <AnimatedFormItem>
              <Label
                htmlFor="email"
                className="block mb-3 text-lg font-medium text-black dark:text-stone-50"
              >
                Email Address
              </Label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </AnimatedFormItem>

            <AnimatedFormItem>
              <Label
                htmlFor="password"
                className="block mb-3 text-lg font-medium text-black dark:text-stone-50"
              >
                Password
              </Label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </AnimatedFormItem>

            <AnimatedFormItem>
              <AnimatedButton
                type="submit"
                className="w-full py-4 text-xl font-bold bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 rounded-2xl"
              >
                Create Account
              </AnimatedButton>
            </AnimatedFormItem>
          </form>

          <AnimatedFormItem>
            <div className="flex items-center my-6">
              <div className="flex-1 border-t-2 border-black dark:border-stone-50"></div>
              <span className="px-4 text-lg text-black dark:text-stone-50 font-medium">
                or
              </span>
              <div className="flex-1 border-t-2 border-black dark:border-stone-50"></div>
            </div>
          </AnimatedFormItem>

          <AnimatedFormItem>
            <AnimatedButton
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-4 text-xl font-bold bg-stone-50 dark:bg-black text-black dark:text-stone-50 hover:bg-stone-100 dark:hover:bg-gray-800 border-2 border-black dark:border-stone-50 rounded-2xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </AnimatedButton>
          </AnimatedFormItem>

          <AnimatedFormItem>
            <div className="text-center mt-8">
              <p className="text-lg text-black dark:text-stone-50">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold underline hover:no-underline text-black dark:text-stone-50"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </AnimatedFormItem>
        </AnimatedFormContainer>
      </div>
    </main>
  );
}
