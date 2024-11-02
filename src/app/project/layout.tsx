import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function ProjectLayout({ children }: Props) {
  return <main className="pt-8">{children}</main>;
}
