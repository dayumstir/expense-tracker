import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { createClient } from "~/utils/supabase/server";

export default async function Analytics() {
  // Redirect user if not logged in
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <div className="">Hey {data.user.email}!</div>;
}
