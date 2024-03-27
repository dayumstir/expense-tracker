import PageHeader from "~/app/_components/PageHeader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={"Expenses"} />
      {children}
    </>
  );
}
