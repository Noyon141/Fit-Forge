"use client";

import { useRouter } from "next/navigation";
import { AnimatedButton } from "./animations/Animated-Button";

export default function ProgressPlan() {
  const router = useRouter();

  const handleProgress = async () => {
    router.push("/dashboard/progress");
  };

  return (
    <>
      <AnimatedButton
        onClick={handleProgress}
        className="p-4 py-16 bg-black dark:bg-stone-50 text-stone-50 dark:text-black rounded-2xl hover:bg-gray-800 dark:hover:bg-stone-100 transition-colors"
      >
        <div className="text-2xl mb-2">📊</div>
        <p className="font-medium">Progress</p>
      </AnimatedButton>
    </>
  );
}
