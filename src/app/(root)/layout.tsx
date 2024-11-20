import React from "react";
import Hero from "@/components/home/Hero";
import HomeBackground from "@/components/shared/HomeBackground";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero>{children}</Hero>
      <div className="fixed inset-0 -z-10 hidden dark:block">
        <HomeBackground />
      </div>
    </main>
  );
}
