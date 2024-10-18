import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { ROUTES } from "./config/routes";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith(ROUTES.DASHBOARD)) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
  }

  return NextResponse.next();
}
