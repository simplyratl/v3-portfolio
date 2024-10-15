"use client";

import { cn } from "@/utils/tailwindUtils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import About from "@/components/about/About";
import Tooltip from "@/components/shared/Tooltip";

const Stack = dynamic(() => import("@/components/home/Stack"));
const Projects = dynamic(() => import("@/components/projects/Projects"), {
  ssr: true,
});
const Blogs = dynamic(() => import("@/components/blogs/Blogs"), { ssr: true });

const buttons = ["About", "Projects", "Blog"];

const selectedTabs: {
  [key: string]: React.JSX.Element;
} = {
  About: <About />,
  Projects: <Projects />,
  Blog: <Blogs />,
};

export default function ButtonTabs() {
  const [active, setActive] = React.useState(buttons[0]);
  const [stackActive, setStackActive] = React.useState(false);

  return (
    <div className="relative">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              <span className="relative z-10">{button}</span>
            </button>
          ))}
        </div>

        <Tooltip
          text={
            stackActive ? "Hide my tech stack" : "Take a look at my tech stack"
          }
          position="top"
        >
          <button
            className={cn(
              "h-full rounded-2xl px-3 py-1.5 text-foreground/50 transition-colors hover:text-foreground",
              stackActive &&
                "border border-muted/15 bg-muted/10 text-foreground hover:text-foreground dark:bg-muted/20 dark:text-foreground",
            )}
            onClick={() => setStackActive(!stackActive)}
          >
            My Stack
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
