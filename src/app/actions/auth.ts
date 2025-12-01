"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AUTH_COOKIE = "auth-token";

const logoutAction = async () => {
  cookies().delete(AUTH_COOKIE);
  redirect("/auth/signin");
}

export default logoutAction
