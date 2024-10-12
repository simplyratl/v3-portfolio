"use client";

import { useAnimate } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import { cn } from "@/utils/tailwindUtils";

type Props = {
  className?: string;
};

const ToggleTheme = ({ className }: Props) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [scope, animate] = useAnimate();
  const [isMounted, setIsMounted] = React.useState(false);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <button
        ref={scope}
        className={cn(
          "h-9 w-9 rounded-lg border border-muted/30 bg-background px-1.5 text-foreground hover:bg-primary hover:text-primary-foreground",
          className,
        )}
        onClick={handleThemeSwitch}
      >
        <SunIcon
          className="h-full w-full"
          style={{
            display: theme === "light" ? "block" : "none",
          }}
        />

        <MoonIcon
          className="h-full w-full"
          style={{
            display: theme === "dark" ? "block" : "none",
          }}
        />
      </button>
    </>
  );
};

export default ToggleTheme;
