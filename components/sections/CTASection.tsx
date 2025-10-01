"use client";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <AnimatedFormContainer>
          <AnimatedFormItem>
            <h2 className="text-5xl md:text-6xl font-bold text-black/85 dark:text-white/85 mb-8">
              Ready to Transform Your Fitness?
            </h2>
          </AnimatedFormItem>
          <AnimatedFormItem>
            <p className="text-2xl text-black/85 dark:text-white/85 mb-12">
              Join thousands who have already started their journey with
              FitForge
            </p>
          </AnimatedFormItem>
          <AnimatedFormItem>
            <AnimatedButton
              variant="default"
              size="lg"
              className="px-12 py-6 text-xl bg-transparent  border-2 border-black dark:border-white text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Link href="/sign-up">Start Your Free Trial</Link>
            </AnimatedButton>
          </AnimatedFormItem>
        </AnimatedFormContainer>
      </div>
    </section>
  );
}
