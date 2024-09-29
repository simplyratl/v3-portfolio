"use client";

import { cn } from "@/utils/tailwindUtils";
import React from "react";
import { motion } from "framer-motion";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Blogs from "@/components/blogs/Blogs";

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

  return (
    <div className="relative">
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
                }}
              ></motion.div>
            )}
            <span className="relative z-10">{button}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 px-4" id="tab-content">
        {selectedTabs[active]}
      </div>
    </div>
  );
}
