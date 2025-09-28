import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AnimatedButton } from "@/components/animations/Animated-Button";
import { AnimatedCard } from "@/components/animations/Animated-Card";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import GeneratePlan from "@/components/Generate-Plan";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <AnimatedFormContainer>
        <AnimatedFormItem>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-stone-50 mb-4">
              Welcome back, {session.user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-xl text-black dark:text-stone-50">
              Ready to continue your fitness journey?
            </p>
          </div>
        </AnimatedFormItem>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* <AnimatedFormItem>
            <AnimatedCard className="border-2 border-black dark:border-stone-50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black text-xl">
                  🎯
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-stone-50">
                    Active Plans
                  </h3>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Current workouts
                  </p>
                </div>
              </div>
              <p className="text-3xl font-bold text-black dark:text-stone-50">
                2
              </p>
            </AnimatedCard>
          </AnimatedFormItem>

          <AnimatedFormItem>
            <AnimatedCard className="border-2 border-black dark:border-stone-50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black text-xl">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-stone-50">
                    Completed
                  </h3>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    This week
                  </p>
                </div>
              </div>
              <p className="text-3xl font-bold text-black dark:text-stone-50">
                12
              </p>
            </AnimatedCard>
          </AnimatedFormItem>

          <AnimatedFormItem>
            <AnimatedCard className="border-2 border-black dark:border-stone-50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black text-xl">
                  🔥
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-stone-50">
                    Streak
                  </h3>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Days in a row
                  </p>
                </div>
              </div>
              <p className="text-3xl font-bold text-black dark:text-stone-50">
                7
              </p>
            </AnimatedCard>
          </AnimatedFormItem>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatedFormItem>
            <AnimatedCard className="border-2 border-black dark:border-stone-50 p-6">
              <h2 className="text-2xl font-bold text-black dark:text-stone-50 mb-6">
                Recent Workouts
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black dark:bg-stone-50 rounded-2xl">
                  <div>
                    <h3 className="font-bold text-stone-50 dark:text-black">
                      Upper Body Strength
                    </h3>
                    <p className="text-stone-50 dark:text-black opacity-70">
                      45 minutes • Completed
                    </p>
                  </div>
                  <div className="text-2xl text-stone-50 dark:text-black">
                    💪
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 rounded-2xl">
                  <div>
                    <h3 className="font-bold text-black dark:text-stone-50">
                      Cardio Blast
                    </h3>
                    <p className="text-black dark:text-stone-50 opacity-70">
                      30 minutes • In Progress
                    </p>
                  </div>
                  <div className="text-2xl">🏃</div>
                </div>
              </div>
            </AnimatedCard>
          </AnimatedFormItem> */}

          <AnimatedFormItem>
            <AnimatedCard className="border-2 border-black dark:border-stone-50 p-6">
              <h2 className="text-2xl font-bold text-black dark:text-stone-50 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <GeneratePlan />
                <AnimatedButton className="p-4 py-16 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 text-black dark:text-stone-50 rounded-2xl hover:bg-stone-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="font-medium">Progress</p>
                </AnimatedButton>
                <AnimatedButton className="p-4 py-16 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 text-black dark:text-stone-50 rounded-2xl hover:bg-stone-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="text-2xl mb-2">⚙️</div>
                  <p className="font-medium">Settings</p>
                </AnimatedButton>
                <AnimatedButton className="p-4 py-16 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 text-black dark:text-stone-50 rounded-2xl hover:bg-stone-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="text-2xl mb-2">👤</div>
                  <p className="font-medium">Profile</p>
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </AnimatedFormItem>
        </div>
      </AnimatedFormContainer>
    </div>
  );
};

export default Dashboard;
