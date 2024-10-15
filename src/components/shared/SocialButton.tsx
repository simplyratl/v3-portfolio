"use client";

import ArrowUpRightIcon from "@/icons/ArrowUpIcon";
import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import Tooltip from "@/components/shared/Tooltip";

type Props = {
  social: {
    name: string;
    url: string;
    icon: JSX.Element;
  };
};

export default function SocialButton({ social }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  const handleOnHover = async () => {
    animate(
      "#social-button-hover",
      {
        opacity: 1,
        scale: 1,
      },
      {
        delay: 0.08,
      },
    );

    await animate(
      "#social-button-hover svg",
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.2,
        ease: "easeInOut",
        delay: 0.1,
      },
    );
  };

  const handleOnLeave = async () => {
    await animate(
      "#social-button-hover",
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        duration: 0.08,
        ease: "easeOut",
      },
    );

    animate("#social-button-hover svg", {
      x: -20,
      y: 20,
    });
  };

  useEffect(() => {
    if (!scope.current) return;

    if (isHovered) {
      handleOnHover();
    } else {
      handleOnLeave();
    }
  }, [isHovered]);

  return (
    <Tooltip text={social.name} delayDuration={200} position="top">
      <li
        className="group relative flex size-8 items-center justify-center rounded-xl"
        ref={scope}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground transition-colors hover:text-foreground/60"
          aria-label={`${social.name} profile`}
        >
          <div className="size-5">{social.icon}</div>
        </a>

        <motion.a
          id="social-button-hover"
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 overflow-hidden rounded-xl bg-primary p-2"
        >
          <ArrowUpRightIcon className="h-4 w-4 text-primary-foreground" />
        </motion.a>
      </li>
    </Tooltip>
  );
}
