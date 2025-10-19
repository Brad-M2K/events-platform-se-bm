import { cookies } from "next/headers";

import { ADMIN_COOKIE } from "./auth-config";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === "1";
}
