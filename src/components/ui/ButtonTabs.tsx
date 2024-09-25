"use client";

import { cn } from "@/utils/tailwindUtils";
import React from "react";
import { motion } from "framer-motion";

const buttons = ["About", "Projects", "Blog", "Contact"];

export default function ButtonTabs() {
  const [active, setActive] = React.useState(buttons[0]);

  return (
    <div className="relative">
      <div className="flex gap-1">
        {buttons.map((button) => (
          <button
            key={button}
            className={cn(
              "relative rounded-full px-3 py-1.5",
              active === button
                ? "text-primary-foreground"
                : "text-foreground/60",
            )}
            onClick={() => setActive(button)}
          >
            {active === button && (
              <motion.div
                layoutId="animation-tab-active-button"
                className="absolute inset-0 rounded-full bg-primary transition-colors"
                style={{
                  borderRadius: 60,
                }}
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
    </div>
  );
}
