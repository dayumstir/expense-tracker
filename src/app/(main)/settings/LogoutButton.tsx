import { createClient } from "~/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default async function LogoutButton() {
  const logout = async () => {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <form action={logout}>
      <Button asChild variant="destructive">
        <Link href={"/login"} className="text-destructive-foreground">
          Logout
        </Link>
      </Button>
    </form>
  );
}
