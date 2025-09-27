"use client";
import { AnimatedButton } from "@/components/animations/Animated-Button";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import { Label } from "@/components/ui/label";
import axios from "axios";

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

  return (
    <main className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded space-y-4 w-full"
      >
        <AnimatedFormContainer className="space-y-4 flex flex-col items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-bold">Sign in</h1>
          <AnimatedFormItem className="">
            <Label htmlFor="name" className="block mb-2">
              Name
            </Label>
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded w-64"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </AnimatedFormItem>
          <AnimatedFormItem>
            <Label htmlFor="email" className="block mb-2">
              Email
            </Label>
            <input
              type="email"
              placeholder="Your email"
              className="border p-2 rounded w-64"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </AnimatedFormItem>
          <AnimatedFormItem>
            <Label htmlFor="password" className="block mb-2">
              Password
            </Label>
            <input
              type="password"
              placeholder="Your password"
              className="border p-2 rounded w-64"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AnimatedFormItem>
          <AnimatedFormItem className="w-full flex items-center justify-center">
            <AnimatedButton
              type="submit"
              className="px-4 py-2 rounded-2xl w-3/4 md:w-2/4 "
            >
              Continue
            </AnimatedButton>
          </AnimatedFormItem>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </AnimatedFormContainer>
      </form>
    </main>
  );
}
