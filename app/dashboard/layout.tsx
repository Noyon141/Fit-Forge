import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardLayout>
        {/* Add your dashboard components here */}
        {children}
      </DashboardLayout>
    </main>
  );
}
