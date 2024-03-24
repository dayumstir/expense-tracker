import { Darkmode } from "~/components/Darkmode";
import LogoutButton from "./LogoutButton";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Settings() {
  // Redirect user if not logged in
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <Darkmode />
      <LogoutButton />
    </div>
  );
}
