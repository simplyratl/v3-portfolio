import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div className="overflow-hidden">
      <div className="relative mx-auto max-w-[750px]">
        <div className="absolute -left-10 -top-60 z-[-1] size-[30rem] animate-[spin_15s_linear_infinite] rounded-full bg-gradient-to-br from-yellow-300 to-purple-800 opacity-20 blur-2xl dark:opacity-15"></div>
        <div className="absolute -right-20 -top-72 z-[-1] size-[30rem] animate-[spin_15s_linear_infinite] rounded-full bg-gradient-to-br from-red-100 to-violet-800 opacity-25 blur-2xl dark:opacity-15"></div>
      </div>

      <main className="mx-auto max-w-screen-md px-4 pt-8">{children}</main>
    </div>
  );
}
