import React from "react";
import Hero from "@/components/home/Hero";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Hero>{children}</Hero>;
}
