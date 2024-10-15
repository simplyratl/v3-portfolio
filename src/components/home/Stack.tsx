import { cn } from "@/utils/tailwindUtils";
import React from "react";
import { motion } from "framer-motion";
import { ReactIcon } from "@/icons/brands/ReactIcon";
import { VueIcon } from "@/icons/brands/VueIcon";
import { TypescriptIcon } from "@/icons/brands/TypescriptIcon";
import { TailwindIcon } from "@/icons/brands/TailwindIcon";
import { NodejsIcon } from "@/icons/brands/NodejsIcon";
import { NextjsIcon } from "@/icons/brands/NextjsIcon";

const stack = [
  {
    name: "Nextjs",
    icon: <NextjsIcon />,
  },
  {
    name: "React",
    icon: <ReactIcon />,
  },
  {
    name: "Vue",
    icon: <VueIcon />,
  },
  {
    name: "TypeScript",
    icon: <TypescriptIcon />,
  },
  {
    name: "TailwindCSS",
    icon: <TailwindIcon />,
  },
  {
    name: "Node.js",
    icon: <NodejsIcon />,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.8 },
};

export default function Stack() {
  return (
    <div className="mb-4 flex flex-nowrap gap-2 overflow-x-auto pb-2.5 [&::-webkit-scrollbar]:h-1.5">
      {stack.map((item) => (
        <motion.span
          key={item.name}
          className={cn(
            "flex items-center gap-2 rounded-full border border-muted/15 bg-muted/10 px-2.5 py-1 text-sm text-foreground transition-colors dark:bg-muted/20 dark:text-foreground",
          )}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, type: "tween" }} // Quicker exit transition for items
        >
          <span>{item.icon}</span>
          {item.name}
        </motion.span>
      ))}
    </div>
  );
}
