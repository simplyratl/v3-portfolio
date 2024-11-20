"use client";

import { motion } from "framer-motion";
import React from "react";

export default function HomeBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 0.6,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,hsl(var(--muted)/0.4)_0%,transparent_70%)] opacity-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_60%_30%,hsl(var(--muted)/0.4)_0%,transparent_100%)] opacity-15"></div>
      <div className="absolute inset-0 bg-[radial-gradient(35%_45%_at_40%_65%,hsl(var(--muted)/0.4)_0%,transparent_100%)] opacity-10"></div>
    </motion.div>
  );
}
