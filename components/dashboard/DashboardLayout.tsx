"use client";

import Navbar from "@/components/dashboard/Navbar";
import { getSession, SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = getSession();
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(pathname?.startsWith("/dashboard") || false);
  }, [pathname]);

  if (!isDashboard) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-stone-50 dark:bg-black">
        <Navbar />

        {/* Desktop Content */}
        <main className="lg:ml-64 lg:pl-0 pt-20 lg:pt-0">
          <div className="min-h-screen">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
