"use client";

import { Icon } from "@iconify/react";
import { useAnimate } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [scope, animate] = useAnimate();

  const handleThemeSwitch = async () => {
    const directionRotation = theme === "light" ? 0 : 360;

    await animate("svg", { scale: 0.3, opacity: 0.3 }, { duration: 0.16 });

    animate(
      "svg",
      { rotate: directionRotation, scale: 0.92 },
      { type: "spring", duration: 0.7 },
    );

    setTheme(theme === "light" ? "dark" : "light");

    animate("svg", { scale: 1, opacity: 1 });
  };

  return (
    <button
      ref={scope}
      className="h-9 w-9 rounded-lg border bg-background px-1.5 text-foreground hover:bg-primary hover:text-primary-foreground"
      onClick={handleThemeSwitch}
    >
      <Icon
        icon="heroicons:sun"
        className="h-full w-full"
        style={{
          display: theme === "light" ? "block" : "none",
        }}
      />

      <Icon
        icon="heroicons:moon"
        className="h-full w-full"
        style={{
          display: theme === "dark" ? "block" : "none",
        }}
      />
    </button>
  );
};

export default ToggleTheme;
