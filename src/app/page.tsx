import ButtonTabs from "@/components/ui/ButtonTabs";
import ToggleTheme from "@/components/ui/ToggleTheme";
import { socials } from "@/constants/socials";
import React from "react";
import ArrowRightIcon from "@/icons/ArrowRightIcon";

export default function Home() {
  return (
    <div>
      <div className="flex items-start justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-semibold">Nikica Ražnatović</h1>
          <p className="font-mono text-lg text-primary">
            Lead Frontend Engineer
          </p>

          <ul className="mt-4 flex h-7 gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-foreground transition-colors hover:text-foreground/60"
                >
                  <div className="size-6">{social.icon}</div>
                </a>
              </li>
            ))}
          </ul>

          <a className="mt-3 inline-block" href="mailto:me@nikicaraznatovic.me">
            me@nikicaraznatovic.me
          </a>
        </div>
        <ToggleTheme />
      </div>

      <div className="slide-enter-content mt-6">
        <a
          href="https://showcase.nikicaraznatovic.me"
          target="_blank"
          className="group mb-5 inline-flex items-center decoration-dotted"
        >
          You can also checkout showcase section portfolio{" "}
          <span className="relative left-1 transition-all group-hover:left-2">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </a>

        <ButtonTabs />
      </div>
    </div>
  );
}
