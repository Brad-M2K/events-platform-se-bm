"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAdmin } from "./actions";
import Link from "next/link";

export function AdminLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      setError(null);
      const result = await loginAdmin(formData);

      if (result.success) {
        router.refresh();
      } else {
        setError(result.message ?? "Unable to sign in.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-border bg-card/60 p-6 shadow-sm"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Admin access</h2>
        <p className="text-sm text-muted-foreground">
          Admins only. Enter the password to continue, or{" "}
          <Link href="/" className="text-primary underline underline-offset-4 hover:text-primary/80">
            return to the events site
          </Link>
          .
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </form>
  );
}
