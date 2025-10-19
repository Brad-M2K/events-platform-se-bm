import { AdminLoginForm } from "./AdminLoginForm";
import { CreateEventForm } from "./CreateEventForm";
import { SignOutButton } from "./SignOutButton";
import { isAdminAuthenticated } from "./session";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Admin dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Only administrators can create and manage events. Enter the password to continue.
          </p>
        </div>

        <AdminLoginForm />
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">Admin dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Use this area to publish new events. Additional moderation tools will land here soon.
        </p>
        <div>
          <SignOutButton />
        </div>
      </div>

      <CreateEventForm />
    </section>
  );
}
