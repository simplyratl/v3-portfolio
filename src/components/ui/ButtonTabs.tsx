"use client";

import { cn } from "@/utils/tailwindUtils";
import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Tooltip from "@/components/shared/Tooltip";
import Stack from "@/components/home/Stack";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { links } from "@/constants/links";

type TabType = (typeof links)[number];

export default function ButtonTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const animationTimeoutRef = React.useRef<NodeJS.Timeout>();
  const lastInteractionRef = React.useRef<number>(0);

  const [stackActive, setStackActive] = React.useState(false);
  const [stackVisible, setStackVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const startAnimation = React.useCallback(() => {
    setIsAnimating(true);
    lastInteractionRef.current = Date.now();

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      if (Date.now() - lastInteractionRef.current >= 200) {
        // Reduced from 400
        setIsAnimating(false);
      }
    }, 250); // Reduced from 450
  }, []);

  const toggleStack = React.useCallback(() => {
    startAnimation();
    setStackActive((prev) => !prev);
  }, [startAnimation]);

  const handleButtonClick = React.useCallback(
    async (tab: TabType) => {
      if (tab.href === pathname || isAnimating) return;

      startAnimation();

      try {
        await router.push(tab.href);
      } catch (error) {
        console.error("Navigation failed:", error);
        setIsAnimating(false);
      }
    },
    [router, pathname, isAnimating, startAnimation],
  );

  const tabVariants = React.useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.95 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.15, // Reduced from 0.2
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.1, // Reduced from 0.15
          ease: "easeIn",
        },
      },
    }),
    [shouldReduceMotion],
  );

  const stackVariants = React.useMemo(
    () => ({
      initial: { height: 0, opacity: 0 },
      animate: {
        height: 50,
        opacity: 1,
        transition: {
          height: {
            duration: shouldReduceMotion ? 0 : 0.2, // Reduced from 0.3
            ease: [0.4, 0, 0.2, 1],
          },
          opacity: {
            duration: shouldReduceMotion ? 0 : 0.15, // Reduced from 0.2
            ease: "easeOut",
          },
        },
      },
      exit: {
        height: 0,
        opacity: 0,
        transition: {
          height: {
            duration: shouldReduceMotion ? 0 : 0.15, // Reduced from 0.25
            ease: [0.4, 0, 1, 1],
          },
          opacity: {
            duration: shouldReduceMotion ? 0 : 0.1, // Reduced from 0.15
            ease: "easeIn",
          },
        },
      },
    }),
    [shouldReduceMotion],
  );

  useEffect(() => {
    if (pathname === "/") {
      setStackVisible(true);
    } else {
      setStackVisible(false);

      if (stackActive) {
        setStackActive(false);
      }
    }
  }, [pathname]);

  return (
    <div className="relative">
      <motion.div
        className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }} // Reduced from 0.3
      >
        <div className="relative flex gap-1 p-2">
          <div
            className="absolute inset-0 rounded-3xl bg-background/5 saturate-200 backdrop-blur-sm"
            style={{
              boxShadow: "inset 0 1px 1px hsl(var(--foreground) / 0.3)",
            }}
          />

          <AnimatePresence>
            {links.map((button) => (
              <motion.button
                key={button.href}
                className={cn(
                  "relative px-3 py-1.5 transition-all duration-200", // Reduced from 300
                  "rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  "touch-none select-none",
                  button.href === pathname
                    ? "text-background"
                    : "text-foreground/50 hover:text-foreground",
                  isAnimating && "pointer-events-none",
                )}
                onClick={() => handleButtonClick(button)}
                disabled={isAnimating}
                onMouseEnter={() => router.prefetch(button.href)}
                whileTap={{ scale: 0.98 }}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={tabVariants}
              >
                {button.href === pathname && (
                  <motion.div
                    layoutId="animation-tab-active-button"
                    className="absolute inset-0 rounded-2xl bg-foreground"
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.3, // Reduced from 0.5
                      mass: 0.6, // Reduced from 0.8
                      stiffness: 200, // Increased from 150
                      damping: 20, // Reduced from 25
                    }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap font-medium">
                  {button.label}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
          <div className="absolute inset-0 z-[-1] bg-[radial-gradient(60%_120%_at_50%_0%,hsl(var(--muted)/0.4)_0%,transparent_70%)] opacity-20"></div>
        </div>

        <AnimatePresence>
          {stackVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "circInOut" }}
            >
              <Tooltip
                text={
                  stackActive
                    ? "Hide tech stack"
                    : "Take a look at my tech stack"
                }
                position="top"
              >
                <motion.button
                  className={cn(
                    "group relative inline-block cursor-pointer rounded-full p-px",
                    "bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30",
                    "text-xs font-semibold leading-6 no-underline",
                    "shadow-lg shadow-primary/10",
                    isAnimating && "pointer-events-none",
                  )}
                  onClick={toggleStack}
                  disabled={isAnimating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />{" "}
                  </span>
                  <div
                    className={cn(
                      "relative z-10 flex items-center space-x-2 rounded-full px-4 py-0.5",
                      "ring-1 ring-white/10 transition-all duration-200",
                      "bg-background/70 text-foreground",
                      stackActive && "bg-foreground text-background",
                    )}
                  >
                    <span className="relative">My stack</span>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-opacity duration-300 group-hover:opacity-40" />{" "}
                </motion.button>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 overflow-hidden" id="tab-content">
        <AnimatePresence>
          {stackActive && (
            <motion.div
              variants={stackVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full will-change-[height,opacity]"
            >
              <Stack />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
