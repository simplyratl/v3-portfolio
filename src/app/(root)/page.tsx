import ButtonTabs from "@/components/ui/ButtonTabs";
import { socials } from "@/constants/socials";
import React, { Suspense } from "react";
import SocialButton from "@/components/shared/SocialButton";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="relative">
      <Header className="mb-4" transparentSwitch />

      <div>
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">Nikica Ražnatović</h1>
            </div>
            <p className="text-md font-mono text-primary">
              Lead Frontend Engineer
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
        <Suspense>
          <ButtonTabs />
        </Suspense>
      </div>
    </div>
  );
}
