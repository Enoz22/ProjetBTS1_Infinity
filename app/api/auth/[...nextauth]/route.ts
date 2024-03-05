import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyAdminUser } from "../../../Dashboard/auth/authProvider";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await verifyAdminUser(credentials?.email ?? '', credentials?.password ?? '');
        if (user) {
          return {
            ...user,
            id: user.id.toString()
          };
        } else {
          throw new Error('Vous n\'avez pas accès à cette page');
        }
      }
    }),
  ],
});
export { handler as GET, handler as POST}