import { withAuth } from "next-auth/middleware"
import jwt_decode from "jwt-decode";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        if(token?.accessToken) {
          const decoded = jwt_decode(token?.accessToken);
          return decoded?.roles.includes("ROLE_ADMIN")
        }
      }

      return !!token
    },
  },
})

export const config = { matcher: ["/admin"] }
