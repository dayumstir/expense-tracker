import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { api } from "~/trpc/server";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) redirect("/login");

  const user = await api.user.getById();
  if (!user) redirect("/getting-started");

  return <div className="">Hey {data.user.email}!</div>;
}
