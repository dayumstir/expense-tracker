import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import GettingStartedForm from "./GettingStartedForm";

export default async function GettingStarted() {
  const user = await api.user.getById();
  if (user) redirect("/");

  return (
    <div className="mx-auto flex h-screen max-w-xs items-center justify-center">
      <GettingStartedForm />
    </div>
  );
}
