import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import { Newsreader } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const newsReader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Nikica Ražnatović",
  description: "Portfolio of Nikica Ražnatović",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${newsReader.variable}`}
      >
        <NextTopLoader color="hsl(var(--primary))" />

        <Providers>
          <main className="mx-auto max-w-screen-md px-4 pt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
