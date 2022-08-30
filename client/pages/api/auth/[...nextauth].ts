import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from "next-auth/providers/credentials";
import { fetch } from "../../../utils/dataAccess";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@smith.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const response = await fetch("/authentication_token", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });

        return response.data;
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
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }

      // token is valid
      if (new Date() < new Date(token.user.exp)) {
        return token;
      }

      // todo implement refresh token
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token;
      }
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/register'
  }
}

export default NextAuth(authOptions)
