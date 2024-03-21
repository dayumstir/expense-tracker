import Link from "next/link";
import { Darkmode } from "~/components/Darkmode";
import { api } from "~/trpc/server";

export default async function Settings() {
  return (
    <div>
      <p>hello world</p>
      <Darkmode />
    </div>
  );
}
