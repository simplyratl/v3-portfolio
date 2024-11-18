import React from "react";
import Hero from "@/components/home/Hero";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero>{children}</Hero>
      <div className="fixed inset-0 -z-10 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,hsl(var(--muted)/0.4)_0%,transparent_70%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_60%_30%,hsl(var(--muted)/0.4)_0%,transparent_100%)] opacity-15"></div>
        <div className="absolute inset-0 bg-[radial-gradient(35%_45%_at_40%_65%,hsl(var(--muted)/0.4)_0%,transparent_100%)] opacity-10"></div>
      </div>
    </main>
  );
}
