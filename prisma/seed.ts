import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const admin = process.env.ADMIN_EMAIL;
const coach = process.env.COACH_EMAIL;

if (!admin || !coach) {
  throw new Error("Please set ADMIN_EMAIL and COACH_EMAIL in your .env file");
}

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: `${admin!}`,
        role: "ADMIN",
        name: "Admin User",
      },
      {
        email: `${coach!}`,
        role: "COACH",
        name: "Coach Demo",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("Seed complete"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
