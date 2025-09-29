"use client";

import { signupSchema } from "@/lib/validators/signup-validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const schema = signupSchema;

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const parsed = schema.parse(payload);
    try {
      const response = await axios.post("/api/auth/sign-up", {
        name: parsed.name,
        email: parsed.email,
        password: parsed.password,
      });

      if (response.status === 200) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }
  return (
    <>
      <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="name" placeholder="Name" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}
