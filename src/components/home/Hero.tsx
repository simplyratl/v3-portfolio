"use client";
import React from "react";
import { domAnimation, LazyMotion, motion } from "framer-motion";
import ButtonTabs from "@/components/ui/ButtonTabs";
import { socials } from "@/constants/socials";
import SocialButton from "@/components/shared/SocialButton";
import Header from "@/components/shared/Header";
import GradientBackground from "@/components/ui/GradientBackground";

const TopFadeBackground = () => (
  <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-40 bg-gradient-to-b from-muted/10 to-background" />
);

const ModernLayout = ({ children }: { children: React.ReactNode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen overflow-hidden">
        <TopFadeBackground />
        <motion.div
          className="fixed inset-0 z-[-1]"
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
        >
          <GradientBackground />
        </motion.div>

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
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
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
                <div className="inline-flex min-w-40 items-center rounded-full bg-green-200 px-4 py-1.5 text-sm dark:bg-green-900">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-green-800 dark:bg-green-400"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-400"></span>
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

            <motion.div className="mt-10" variants={itemVariants}>
              <ButtonTabs />
            </motion.div>

            <motion.div variants={itemVariants}>{children}</motion.div>
          </motion.div>
        </main>
      </div>
    </LazyMotion>
  );
};

export default ModernLayout;
