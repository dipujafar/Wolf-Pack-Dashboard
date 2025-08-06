/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { jwtDecode } from "jwt-decode";
import { adminRoutes, authRoutes } from "./utils/authRoutes";
import { TTokenUser } from "./types";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get("wolf-pack-access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  // If user exists redirect to `/home`
  let decode: TTokenUser | null = null;
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!isLoggedIn && isAuthRoute) {
    return NextResponse.next();
  }
  try {
    decode = jwtDecode(isLoggedIn || "");
    if (!decode) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (decode?.exp && decode?.exp < Date.now() / 1000) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (decode?.role === "ADMIN" && isAdminRoute) {
      return NextResponse.next();
    }
  } catch (error) {
    console.log(error);
    //return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login", "/admin", "/forgetPassword", "/resetPassword"],
};
