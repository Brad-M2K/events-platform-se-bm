"use server";

import { cookies } from "next/headers";

import { ADMIN_COOKIE, getAdminPassword } from "./auth-config";

const ONE_DAY_SECONDS = 60 * 60 * 24;

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { success: false, message: "Enter the admin password." };
  }

  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    console.warn("ADMIN_PASSWORD env var is not set; rejecting login.");
    return { success: false, message: "Admin login is currently disabled." };
  }

  if (password !== adminPassword) {
    return { success: false, message: "Incorrect password." };
  }

  cookies().set({
    name: ADMIN_COOKIE,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  });

  return { success: true };
}

export async function logoutAdmin() {
  cookies().delete(ADMIN_COOKIE);
  return { success: true };
}
