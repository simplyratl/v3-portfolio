"use client";
import React from "react";
import { motion } from "framer-motion";
import ButtonTabs from "@/components/ui/ButtonTabs";
import { socials } from "@/constants/socials";
import SocialButton from "@/components/shared/SocialButton";
import Header from "@/components/shared/Header";

const TopFadeBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-40 bg-gradient-to-b from-muted/10 to-background" />
  );
};

const ModernLayout = ({ children }: { children: React.ReactNode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <TopFadeBackground />
      <div className="relative mx-auto max-w-[750px]">
        <div className="absolute -left-[40%] top-0 h-[1000px] w-[1000px] rounded-full bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl dark:from-purple-500/[0.03]" />
        <div className="absolute -right-[40%] top-40 h-[1000px] w-[1000px] rounded-full bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl dark:from-blue-500/[0.03]" />
      </div>

      <main className="mx-auto max-w-screen-md px-4 py-8">
        <motion.div
          className="relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Header className="mb-4" transparentSwitch />
          </motion.div>

          <div>
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:pb-10">
              <motion.div variants={itemVariants}>
                <div className="flex flex-col gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Nikica Ražnatović
                  </h1>
                </div>
                <p className="text-md font-mono text-primary">
                  Frontend Engineer
                </p>
              </motion.div>

              <motion.ul
                className="flex h-7 gap-2.5 sm:mt-6"
                variants={itemVariants}
              >
                {socials.map((social) => (
                  <motion.li
                    key={social.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SocialButton social={social} />
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-between gap-4 sm:mt-4"
              variants={itemVariants}
            >
              <div className="inline-flex min-w-40 items-center rounded-full bg-green-300 bg-opacity-50 px-4 py-1.5 text-sm dark:bg-green-900 dark:bg-opacity-40">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-800 opacity-75 duration-1000 dark:bg-green-300"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-600"></span>
                </span>
                <span className="ml-2.5">Available for freelance work</span>
              </div>

              <motion.a
                className="inline-block text-primary transition-all duration-200 hover:opacity-80"
                href="mailto:work@nikicaraznatovic.me"
                whileHover={{ scale: 1.01 }}
              >
                work@nikicaraznatovic.me
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="slide-enter-content mt-10"
            variants={itemVariants}
          >
            <ButtonTabs />
          </motion.div>
        </motion.div>

        {children}
      </main>
    </div>
  );
};

export default ModernLayout;
