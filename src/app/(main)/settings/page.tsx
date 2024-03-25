import { DarkMode } from "~/components/DarkMode";
import LogoutButton from "./LogoutButton";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Settings() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) redirect("/login");

  return (
    <div>
      <DarkMode />
      <LogoutButton />
    </div>
  );
}
