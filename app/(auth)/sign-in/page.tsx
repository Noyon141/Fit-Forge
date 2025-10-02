"use client";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import { Label } from "@/components/ui/label";
import { gsap } from "gsap";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GSAP refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // GSAP animations on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline();

      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, formRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(backgroundRef.current, {
        opacity: 0,
        scale: 0.9,
      });

      // Animation sequence
      tl.to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          formRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");

        // Error shake animation
        if (typeof window !== "undefined") {
          gsap.to(formRef.current, {
            x: -10,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 5,
          });
        }
      } else {
        // Success animation
        if (typeof window !== "undefined") {
          gsap.to(formRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              router.push("/dashboard");
            },
          });
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");

      // Error shake animation
      if (typeof window !== "undefined") {
        gsap.to(formRef.current, {
          x: -10,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 5,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-stone-50 dark:bg-black flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-black dark:text-stone-50 mb-4"
          >
            Welcome Back
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl text-black dark:text-stone-50"
          >
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Form Container */}
        <div ref={formRef}>
          <div
            ref={backgroundRef}
            className="bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 rounded-3xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="block mb-3 text-lg font-medium text-black dark:text-stone-50"
                >
                  Password
                </Label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 text-sm md:text-base">
                  {error}
                </div>
              )}

              <AnimatedButton
                type="submit"
                disabled={loading}
                className="w-full py-4 text-xl font-bold bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 rounded-2xl"
              >
                {loading ? "Signing In..." : "Sign In"}
              </AnimatedButton>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t-2 border-black dark:border-stone-50"></div>
              <span className="px-4 text-lg text-black dark:text-stone-50 font-medium">
                or
              </span>
              <div className="flex-1 border-t-2 border-black dark:border-stone-50"></div>
            </div>

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

            <div className="text-center mt-8">
              <p className="text-lg text-black dark:text-stone-50">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold underline hover:no-underline text-black dark:text-stone-50"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
