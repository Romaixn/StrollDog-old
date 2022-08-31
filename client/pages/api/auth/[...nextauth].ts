import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from "next-auth/providers/credentials";
import { fetch } from "../../../utils/dataAccess";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        const payload = {
          email: credentials?.email,
          password: credentials?.password
        }

        const user = await fetch("/authentication_token", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });

        if(!user) {
          throw new Error(user.exception);
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ user, account, token }) {
      if (user && account) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/register'
  },
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)
