import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Darkmode } from "~/components/Darkmode";
import { api } from "~/trpc/server";

export default async function Settings() {
  return (
    <div>
      <p>hello world</p>
      <Darkmode />
      <Button variant="destructive">
        <Link href={"/login"}>Logout</Link>
      </Button>
    </div>
  );
}
