import React from "react";
import Header from "@/components/shared/Header";
import { socials } from "@/constants/socials";
import SocialButton from "@/components/shared/SocialButton";
import ButtonTabs from "@/components/ui/ButtonTabs";

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

      <main className="mx-auto max-w-screen-md px-4 py-8">
        <div className="relative">
          <Header className="mb-4" transparentSwitch />

          <div>
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:pb-10">
              <div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-3xl font-semibold">Nikica Ražnatović</h1>
                </div>
                <p className="text-md font-mono text-primary">
                  Frontend Engineer
                </p>
              </div>

              <ul className="flex h-7 gap-2 sm:mt-6">
                {socials.map((social) => (
                  <SocialButton social={social} key={social.name} />
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 sm:mt-4">
              <div className="inline-flex min-w-40 items-center rounded-full bg-green-300 bg-opacity-60 px-4 py-1 text-xs dark:bg-green-900">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-800 opacity-75 duration-700 dark:bg-green-300"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-600"></span>
                </span>

                <span className="ml-2">Available for freelance work</span>
              </div>

              <a className="inline-block" href="mailto:me@nikicaraznatovic.me">
                work@nikicaraznatovic.me
              </a>
            </div>
          </div>

          <div className="slide-enter-content mt-10">
            <ButtonTabs />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
