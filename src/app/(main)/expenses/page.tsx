import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";

export default async function Expenses() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) redirect("/login");

  return <div className="">Hey {data.user.email}!</div>;
}
