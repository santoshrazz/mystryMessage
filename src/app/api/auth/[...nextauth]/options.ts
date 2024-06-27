import { UserModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const user = await UserModel.findOne({
          $or: [
            {
              email: credentials.identifier,
            },
            { username: credentials.identifier },
          ],
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user.isVerified) {
          throw new Error("Verify your account before loggin in");
        }
        const checkedPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!checkedPassword) {
          throw new Error("Your password is incorrect");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      token._id = user._id;
      token.isVerified = user.isVerified;
      token.username = user.username;
      token.isAcceptingMessages = user.isAcceptingMessages;
      return token;
    },
    async session({ session, user, token }) {
      session.user._id = user._id;
      session.user.isVerified = user.isVerified;
      session.user.isAcceptingMessages = user.isAcceptingMessages;
      session.user.username = user.username;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
