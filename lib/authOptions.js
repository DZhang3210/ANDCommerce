import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.isAdmin = user.isAdmin;
      return session;
    },
  },
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
  //       session.user.id = token.sub;
  //     }
  //     return session;
  //   },
  //   jwt: async ({ user, token }) => {
  //     if (user) {
  //       token.uid = user.id;
  //     }
  //     return token;
  //   },
  // },
  // session: {
  //   strategy: "jwt",
  // },
};
