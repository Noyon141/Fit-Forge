"use client";

import Navbar from "@/components/dashboard/Navbar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-stone-50 dark:bg-black">
        <Navbar />
        <main className="lg:ml-64 pt-16 lg:pt-0">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
