import SignoutButton from "@/components/Signout-Button";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome {session.user?.email}</h1>
      <p>Role: {session.user?.name}</p>
      <p>Stripe subscription status (coming soon)...</p>
      <SignoutButton />
    </div>
  );
};

export default Dashboard;
