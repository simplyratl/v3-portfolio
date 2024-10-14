import { cn } from "@/utils/tailwindUtils";
import React from "react";
import { motion } from "framer-motion";

const stack = ["React", "Vue", "TypeScript", "TailwindCSS", "Node.js"];

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, scale: 0.8 },
};

export const Stack = () => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {stack.map((item) => (
        <motion.span
          key={item}
          className={cn(
            "rounded-full bg-foreground px-2.5 py-1 text-xs text-background transition-colors",
          )}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }} // Quicker exit transition for items
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
};
