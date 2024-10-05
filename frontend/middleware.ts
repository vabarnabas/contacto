import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");

  const handleWrongToken = () => {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    const response = NextResponse.redirect(url);

    response.cookies.delete("access_token");

    return response;
  };

  if (!token || !token.value) {
    console.log("No token found");
    return handleWrongToken();
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  return jose
    .jwtVerify(token.value, secret)
    .then((decodedToken) => {
      const currentUnixTime = Math.floor(Date.now() / 1000);
      if (decodedToken.payload.exp! < currentUnixTime) {
        return handleWrongToken();
      }
    })
    .catch(() => {
      return handleWrongToken();
    });
}

export const config = {
  matcher: ["/dashboard(.*)"],
};
