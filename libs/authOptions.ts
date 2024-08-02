import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

export const authOptions = {
    // Configure one or more authentication providerssatisfies NextAuthOptions;
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;
