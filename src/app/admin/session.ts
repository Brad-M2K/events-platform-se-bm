import { cookies } from "next/headers";

import { ADMIN_COOKIE } from "./auth-config";

export function isAdminAuthenticated() {
  return cookies().get(ADMIN_COOKIE)?.value === "1";
}
