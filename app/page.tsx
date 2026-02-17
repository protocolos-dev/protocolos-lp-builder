import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import LoginForm from "@/components/auth/LoginForm";

export default async function Home() {
  const supabase = await createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="dark min-h-screen bg-background flex flex-col items-center justify-center gap-8 px-4">
      <div className="text-center space-y-1">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Landing Page Builder
        </h1>
        <p className="text-muted-foreground text-sm">Admin Panel</p>
      </div>
      <LoginForm />
    </div>
  );
}
