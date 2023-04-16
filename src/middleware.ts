import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "30 m"), // 10 requests per 30 minutes
});

export default withAuth(
  // eslint-disable-next-line consistent-return
  async function middleware(req) {
    const { pathname } = req.nextUrl; // relative path without the domain

    // Manage rate limiting
    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        const { success } = await rateLimit.limit(ip);

        if (!success) return NextResponse.json({ error: "Too Many Requests" });
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }

    // Manage route protection
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];

    // making sure authenticated users are not able to login twice
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
