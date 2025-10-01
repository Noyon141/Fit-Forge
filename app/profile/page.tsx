"use client";
import { ProfileInput, ProfileInputSchema } from "@/lib/validators/profile";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Dumbbell,
  Ruler,
  Save,
  Scale,
  Settings,
  Target,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import AnimatedBackButton from "@/components/animations/AnimatedBackButton";
import {
  DashboardCard,
  DashboardContent,
  DashboardHeader,
} from "@/components/animations/Dashboard-Animation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
    },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 400,
    },
  },
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileInput>({
    age: undefined,
    gender: "MALE", // Required field with default value
    heightCm: undefined,
    weightKg: undefined,
    goal: "",
    experienceLevel: "",
    timePerWeek: undefined,
    equipment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // fetch current profile
    axios
      .get("/api/profile")
      .then((res) => {
        if (res.data?.profile) {
          setForm({
            age: res.data.profile.age,
            gender: res.data.profile.gender || "MALE", // Ensure gender has a value
            heightCm: res.data.profile.heightCm,
            weightKg: res.data.profile.weightKg,
            goal: res.data.profile.goal || "",
            experienceLevel: res.data.profile.experienceLevel || "",
            timePerWeek: res.data.profile.timePerWeek,
            equipment: res.data.profile.equipment || "",
          });
          // If profile exists, we're in edit mode
          setIsEditMode(!!res.data.profile.age);
        }
      })
      .catch(() => {});
  }, []);

  async function save() {
    setError(null);
    const parsed = ProfileInputSchema.safeParse(form);
    if (!parsed.success) {
      setError("Please fill in all required fields correctly");
      console.error(z.treeifyError(parsed.error));
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/profile", parsed.data);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardContent>
      <DashboardHeader>
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <AnimatedBackButton href="/dashboard" label="Back to Dashboard" />
          </motion.div>

          {/* Header */}
          <motion.div
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-stone-50">
                {isEditMode ? "Update Profile" : "Create Profile"}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-black dark:text-stone-50 opacity-80 mt-1">
                {isEditMode
                  ? "Update your fitness profile to get better workout recommendations"
                  : "Tell us about yourself to get personalized workout plans"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </DashboardHeader>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <DashboardCard>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                    <User className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-stone-50">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Age */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Calendar className="w-4 h-4" />
                      Age
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      min={5}
                      max={120}
                      value={form.age ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          age: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50 transition-colors"
                    />
                  </motion.div>

                  {/* Gender */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <User className="w-4 h-4" />
                      Gender
                    </Label>
                    <Select
                      value={form.gender}
                      onValueChange={(value) =>
                        setForm({
                          ...form,
                          gender: value as "MALE" | "FEMALE",
                        })
                      }
                    >
                      <SelectTrigger className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Height */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Ruler className="w-4 h-4" />
                      Height (cm)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter height in cm"
                      min={50}
                      max={300}
                      value={form.heightCm ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          heightCm: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50 transition-colors"
                    />
                  </motion.div>

                  {/* Weight */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Scale className="w-4 h-4" />
                      Weight (kg)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter weight in kg"
                      min={30}
                      max={300}
                      value={form.weightKg ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          weightKg: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50 transition-colors"
                    />
                  </motion.div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          {/* Fitness Goals */}
          <motion.div variants={itemVariants}>
            <DashboardCard>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-stone-50">
                    Fitness Goals
                  </h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {/* Goal */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Target className="w-4 h-4" />
                      Primary Goal
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., Build muscle, lose weight, improve endurance"
                      value={form.goal ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, goal: e.target.value })
                      }
                      className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50 transition-colors"
                    />
                  </motion.div>

                  {/* Experience Level */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Dumbbell className="w-4 h-4" />
                      Experience Level
                    </Label>
                    <Select
                      value={form.experienceLevel ?? ""}
                      onValueChange={(value) =>
                        setForm({
                          ...form,
                          experienceLevel: value || undefined,
                        })
                      }
                    >
                      <SelectTrigger className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Time Per Week */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Clock className="w-4 h-4" />
                      Hours Per Week
                    </Label>
                    <Input
                      type="number"
                      placeholder="How many hours can you commit?"
                      min={1}
                      max={40}
                      value={form.timePerWeek ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          timePerWeek: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50 transition-colors"
                    />
                  </motion.div>

                  {/* Equipment */}
                  <motion.div
                    className="space-y-2"
                    variants={formFieldVariants}
                  >
                    <Label className="flex items-center gap-2 text-black dark:text-stone-50 font-medium text-sm">
                      <Settings className="w-4 h-4" />
                      Available Equipment
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., dumbbells, resistance bands, pull-up bar"
                      value={form.equipment ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, equipment: e.target.value })
                      }
                      className="border-2 border-black/20 dark:border-stone-50/20 bg-stone-50/50 dark:bg-black/50 text-black dark:text-stone-50 focus:border-black dark:focus:border-stone-50 transition-colors"
                    />
                    <p className="text-xs text-black dark:text-stone-50 opacity-60">
                      Separate multiple items with commas
                    </p>
                  </motion.div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            className="mt-4 sm:mt-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <DashboardCard className="border-red-500 dark:border-red-400">
              <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm sm:text-base">{error}</p>
              </div>
            </DashboardCard>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center"
          variants={itemVariants}
        >
          <AnimatedButton
            onClick={save}
            disabled={loading}
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Profile"
              : "Create Profile"}
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </DashboardContent>
  );
}
