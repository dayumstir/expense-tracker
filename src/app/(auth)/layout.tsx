import "~/styles/globals.css";

import { createClient } from "~/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is logged in
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <>
      <Link href={"/"} className="absolute left-6 top-4 shrink-0 lg:left-14">
        <h1 className="text-2xl font-bold text-accent-foreground">
          GO TO HOME
        </h1>
      </Link>
      {children}
    </>
  );
}
