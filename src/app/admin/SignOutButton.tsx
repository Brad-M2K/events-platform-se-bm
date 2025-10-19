"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { logoutAdmin } from "./actions";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await logoutAdmin();
      router.refresh();
    });
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick} disabled={isPending}>
      {isPending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
