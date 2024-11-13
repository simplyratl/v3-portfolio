"use client";
import ToggleTheme from "@/components/ui/ToggleTheme";
import React, { useState, useEffect } from "react";
import Logo from "@/icons/Logo";
import { cn } from "@/utils/tailwindUtils";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/icons/ArrowLeftIcon";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { links } from "@/constants/links";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  className?: string;
  enableBack?: boolean;
  transparentSwitch?: boolean;
  fixed?: boolean;
};

const AnimatedLink = ({
  href,
  label,
  onClick,
  onMouseEnter,
}: {
  href: string;
  label: string;
  onClick: () => void;
  onMouseEnter: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="block overflow-hidden text-3xl font-bold !text-zinc-400 no-underline transition-colors duration-300 hover:!text-foreground"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.1,
        }}
        className="relative"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {label.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.03,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default function Header({
  className,
  enableBack,
  transparentSwitch,
  fixed = false,
}: Props) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    initial: {
      clipPath: "circle(0% at calc(100% - 48px) 28px)",
      opacity: 0,
    },
    animate: {
      clipPath: "circle(150% at calc(100% - 48px) 28px)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 15,
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      clipPath: "circle(0% at calc(100% - 48px) 28px)",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        opacity: { duration: 0.2 },
      },
    },
  };

  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    initial: {
      y: 100,
      opacity: 0,
      rotate: 15,
    },
    animate: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <header
        className={cn(
          "flex items-center justify-between",
          fixed &&
            "fixed left-0 right-0 top-0 z-50 bg-background/60 p-4 backdrop-blur duration-300",
          fixed && isMenuOpen && "bg-background backdrop-blur-none",
          !fixed && "h-10",
          className,
        )}
      >
        <div className="flex flex-1 items-center gap-2">
          {enableBack && (
            <button
              className="size-7 rounded-xl p-0.5 hover:bg-muted/20"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="size-full" />
            </button>
          )}
          <Link href={"/"} aria-label="Home">
            <Logo className="size-8" />
          </Link>
        </div>

        {fixed && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden flex-1 items-center justify-center gap-12 md:flex">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-lg font-semibold !text-zinc-400 no-underline transition-colors duration-300 hover:!text-foreground hover:underline"
                  onMouseEnter={() => router.prefetch(href)}
                >
                  <p>{label}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-1 items-center justify-end gap-4">
          <ToggleTheme
            className={
              transparentSwitch ? "bg-background/20 backdrop-blur" : ""
            }
          />

          {/* Mobile Menu Button */}
          {fixed && (
            <motion.button
              onClick={toggleMenu}
              className="relative z-50 block md:hidden"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="size-8 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="size-8 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </header>

      {/* Full Screen Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 flex items-center justify-center bg-background md:hidden"
          >
            <motion.nav
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center gap-8 px-4 text-center"
            >
              {links.map(({ label, href }, index) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <AnimatedLink
                    href={href}
                    label={label}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={() => router.prefetch(href)}
                  />
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
