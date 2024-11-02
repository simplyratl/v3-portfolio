import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { articulatCF } from "@/app/fonts/articulat/articulat";

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

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "200", "900"],
  variable: "--font-inter",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${articulatCF.variable} ${inter.variable}`}
      >
        <NextTopLoader color="hsl(var(--primary))" />

        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
