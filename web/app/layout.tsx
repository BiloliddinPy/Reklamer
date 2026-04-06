import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Reklamer | O'zbekiston reklama bozori",
  description: "Ochiq, shaffof va bevosita influencer reklama marketpleysi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="antialiased">
      <body className="font-sans min-h-screen flex flex-col">
        <QueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
