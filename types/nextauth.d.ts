import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "USER" | "COACH" | "ADMIN";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: "USER" | "COACH" | "ADMIN";
    };
  }

  interface JWT {
    role: "USER" | "COACH" | "ADMIN";
  }
}
