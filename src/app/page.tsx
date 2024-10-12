import ButtonTabs from "@/components/ui/ButtonTabs";
import { socials } from "@/constants/socials";
import React from "react";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
import SocialButton from "@/components/shared/SocialButton";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div>
      <Header className="mb-4" />
      <div className="flex items-start justify-between">
        <div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">Nikica Ražnatović</h1>
          </div>
          <p className="text-md font-mono text-primary">
            Lead Frontend Engineer
          </p>

          <div className="mt-4 inline-flex items-center rounded-full bg-green-200 px-4 py-1 text-xs dark:bg-green-900">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-800 opacity-75 duration-700 dark:bg-green-300"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-600"></span>
            </span>

            <span className="ml-2">Available for freelance work</span>
          </div>

          <ul className="mt-6 flex h-7 gap-2">
            {socials.map((social) => (
              <SocialButton social={social} key={social.name} />
            ))}
          </ul>

          <a className="mt-3 inline-block" href="mailto:me@nikicaraznatovic.me">
            me@nikicaraznatovic.me
          </a>

          <div className="mt-2">
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
      </div>

      <div className="slide-enter-content mt-10">
        <ButtonTabs />
      </div>
    </div>
  );
}
