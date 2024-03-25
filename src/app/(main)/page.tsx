import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { api } from "~/trpc/server";

export default async function Home() {
  // Redirect user if not logged in
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  }

  return <div className="">Hey {data.user.email}!</div>;
}
