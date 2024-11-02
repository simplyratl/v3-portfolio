"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/utils/tailwindUtils";

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 35,
    transition: {
      opacity: { duration: 0.1, ease: "anticipate" },
      y: { duration: 0.1, ease: "circIn" },
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 1, ease: [0, 0.68, 0.39, 1] },
      y: { duration: 0.7, ease: [0, 0.68, 0.35, 1] },
    },
  },
};

type Props = {
  text?: string;
  once?: boolean;
  className?: string;
  delayStart?: number;
  textClass?: string;
};

export default function RevealText({
  text,
  className,
  once = false,
  delayStart = 0,
  textClass,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStart(true);
    }, delayStart * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timer);
  }, [delayStart]);

  if (!text) return null;

  return (
    <div
      className={cn("articulat-cf text-balance text-8xl font-bold", className)}
    >
      <h1 className={cn("text-center")} ref={ref}>
        <span className="sr-only">{text}</span>
        <motion.span
          initial="hidden"
          animate={isInView && shouldStart ? "visible" : "hidden"}
          transition={{
            staggerChildren: 0.18,
            delayChildren: 0.2,
          }}
          aria-hidden
        >
          {text.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={defaultAnimations}
              className={cn("inline-block leading-[1.1]", textClass)}
            >
              {word.split("").map((char, index) => (
                <span className="inline-block" key={index}>
                  {char}
                </span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.span>
      </h1>
    </div>
  );
}
