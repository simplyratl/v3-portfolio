import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function ProjectLayout({ children }: Props) {
  return (
    <div>
      <main className="mx-auto max-w-screen-xl">{children}</main>
    </div>
  );
}
