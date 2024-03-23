import { Navbar } from "~/components/Navbar";
import { Toaster } from "~/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar />
      {children}
    </>
  );
}
