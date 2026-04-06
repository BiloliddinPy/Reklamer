import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { QueryProvider } from "@/components/providers/query-provider";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
    <html
      lang="uz"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} antialiased`}
    >
      <body className="font-sans min-h-screen flex flex-col">
        <QueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
