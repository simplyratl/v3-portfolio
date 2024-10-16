import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function BlogLayout({ children }: Props) {
  return (
    <div>
      <main className="mx-auto max-w-screen-md px-4 pt-8">{children}</main>
    </div>
  );
}
