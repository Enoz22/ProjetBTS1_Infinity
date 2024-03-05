
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if(token) return true;
      else return false;
    },
  },
  pages: {
    signIn: '/Dashboard/auth'
  },
});

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|Home).*)(.+)"] }