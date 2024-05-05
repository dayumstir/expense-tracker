export default async function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="fixed left-0 top-0 z-10 w-screen bg-background px-8 py-6 text-4xl font-bold text-primary">
      {title}
    </h1>
  );
}
