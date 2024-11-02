"use client";

import { cn } from "@/utils/tailwindUtils";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import About from "@/components/about/About";
import Tooltip from "@/components/shared/Tooltip";
import Stack from "@/components/home/Stack";
import Projects from "@/components/projects/Projects";
import Blogs from "@/components/blogs/Blogs";
import { useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/capitalize-first-letter";

const buttons = ["about", "projects", "blog"];

const selectedTabs: {
  [key: string]: React.JSX.Element;
} = {
  about: <About />,
  projects: <Projects />,
  blog: <Blogs />,
};

export default function ButtonTabs() {
  const [active, setActive] = React.useState(buttons[0]);
  const [stackActive, setStackActive] = React.useState(false);
  const params = useSearchParams();

  useEffect(() => {
    const tab = params.get("tab");
    if (tab && buttons.includes(tab)) {
      setActive(tab);
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1">
          {buttons.map((button) => (
            <button
              key={button}
              className={cn(
                "relative px-3 py-1.5 transition-colors",
                active === button
                  ? "text-background"
                  : "text-foreground/50 hover:text-foreground",
              )}
              onClick={() => setActive(button)}
            >
              {active === button && (
                <motion.div
                  layoutId="animation-tab-active-button"
                  className="absolute inset-0 rounded-2xl bg-foreground transition-colors"
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.3,
                    mass: 0.5,
                    velocity: 10,
                  }}
                ></motion.div>
              )}
              <span className="relative z-10 font-medium">
                {capitalizeFirstLetter(button)}
              </span>
            </button>
          ))}
        </div>

        <Tooltip
          text={
            stackActive ? "Hide tech stack" : "Take a look at my tech stack"
          }
          position="top"
        >
          <button
            className={cn(
              "group relative inline-block cursor-pointer rounded-full bg-primary/20 p-px text-xs font-semibold leading-6 no-underline shadow-2xl shadow-zinc-900",
            )}
            onClick={() => setStackActive(!stackActive)}
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div
              className={cn(
                "relative z-10 flex items-center space-x-2 rounded-full bg-background px-4 py-0.5 text-foreground ring-1 ring-white/10",
                stackActive && "bg-foreground text-background",
              )}
            >
              <span>My stack</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </Tooltip>
      </div>

      <div className="mt-6 px-4" id="tab-content">
        <AnimatePresence>
          {stackActive && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="h-full"
            >
              <Stack />
            </motion.div>
          )}
        </AnimatePresence>

        {selectedTabs[active]}
      </div>
    </div>
  );
}
