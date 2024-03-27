export default async function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="fixed left-0 top-0 w-screen bg-background px-8 py-6 text-4xl font-semibold text-primary">
      {title}
    </h1>
  );
}
