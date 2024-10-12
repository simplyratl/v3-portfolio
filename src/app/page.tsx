import ButtonTabs from "@/components/ui/ButtonTabs";
import { socials } from "@/constants/socials";
import React from "react";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
import SocialButton from "@/components/shared/SocialButton";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="relative">
      <Header className="mb-4" />

      <div className="absolute -left-10 -top-60 z-[-1] size-[30rem] rounded-full bg-gradient-to-br from-cyan-200 to-sky-800 opacity-20 blur-2xl dark:opacity-15"></div>
      <div className="absolute -right-20 -top-72 z-[-1] size-[30rem] rounded-full bg-gradient-to-br from-violet-100 to-violet-800 opacity-20 blur-2xl dark:opacity-15"></div>
      <div>
        <div className="flex w-full justify-between">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">Nikica Ražnatović</h1>
            </div>
            <p className="text-md font-mono text-primary">
              Lead Frontend Engineer
            </p>
          </div>

          <ul className="mt-6 flex h-7 gap-2">
            {socials.map((social) => (
              <SocialButton social={social} key={social.name} />
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="mt-4 inline-flex items-center rounded-full bg-green-300 bg-opacity-60 px-4 py-1 text-xs dark:bg-green-900">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-800 opacity-75 duration-700 dark:bg-green-300"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-600"></span>
            </span>

            <span className="ml-2">Available for freelance work</span>
          </div>

          <a className="inline-block" href="mailto:me@nikicaraznatovic.me">
            me@nikicaraznatovic.me
          </a>
        </div>

        <div className="mt-4">
          <a
            href="https://showcase.nikicaraznatovic.me"
            target="_blank"
            className="group inline-flex items-center decoration-dotted"
          >
            You can also checkout showcase section portfolio{" "}
            <span className="relative left-1 transition-all group-hover:left-2">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      <div className="slide-enter-content mt-10">
        <ButtonTabs />
      </div>
    </div>
  );
}
