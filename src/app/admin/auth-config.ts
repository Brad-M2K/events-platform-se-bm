export const ADMIN_COOKIE = "admin-auth";

export function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
}
