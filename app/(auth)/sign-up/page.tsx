"use client";

import { AnimatedSignupButton } from "@/components/animations/Animated-Signup-Button";
import { Label } from "@/components/ui/label";
import { signupSchema } from "@/lib/validators/signup-validation";
import axios from "axios";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GSAP refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const schema = signupSchema;

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

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const parsed = schema.parse(payload);
      const response = await axios.post("/api/auth/sign-up", {
        name: parsed.name,
        email: parsed.email,
        password: parsed.password,
      });

      if (response.status === 200) {
        // Success animation
        if (typeof window !== "undefined") {
          gsap.to(formRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              router.push("/sign-in");
            },
          });
        } else {
          router.push("/sign-in");
        }
      }
    } catch (error: any) {
      console.error("Error during signup:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );

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
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-stone-50 dark:bg-black flex items-center justify-center p-4"
    >
      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-black dark:text-stone-50 mb-4"
          >
            Join FitForge
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl text-black dark:text-stone-50"
          >
            Start your fitness transformation today
          </p>
        </div>

        {/* Form Container */}
        <div ref={formRef}>
          <div
            ref={backgroundRef}
            className="bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 rounded-3xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="block mb-3 text-lg font-medium text-black dark:text-stone-50"
                >
                  Full Name
                </Label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="block mb-3 text-lg font-medium text-black dark:text-stone-50"
                >
                  Email Address
                </Label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
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
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 placeholder-black/60 dark:placeholder-stone-50/60 focus:outline-none focus:ring-0"
                />
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 text-sm md:text-base">
                  {error}
                </div>
              )}

              <AnimatedSignupButton
                loading={loading}
                disabled={loading}
                className="w-full py-4 text-xl font-bold bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 rounded-2xl shadow-2xl transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </AnimatedSignupButton>

              <div className="text-center pt-4">
                <p className="text-lg text-black dark:text-stone-50">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-bold underline hover:no-underline text-black dark:text-stone-50 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center mt-6">
            <p className="text-sm text-black/60 dark:text-stone-50/60">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-black dark:hover:text-stone-50 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline hover:text-black dark:hover:text-stone-50 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
