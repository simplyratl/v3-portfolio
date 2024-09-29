"use client";

import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import ArrowUpRightIcon from "@/icons/ArrowUpIcon";

const projects = [
  {
    title: "Vercel",
    description: "Design system, website, and dashboard.",
    link: "https://google.com",
  },
  {
    title: "Resend",
    description: "Design system, website, and dashboard.",
    link: "https://google.com",
  },
  {
    title: "Vercel",
    description: "Design system, website, and dashboard.",
    link: "https://google.com",
  },
  {
    title: "Resend",
    description: "Design system, website, and dashboard.",
    link: "https://google.com",
  },
  {
    title: "Vercel",
    description: "Design system, website, and dashboard.",
    link: "https://google.com",
  },
  {
    title: "Resend",
    description: "Design system, website, and dashboard.",
    link: "https://google.com",
  },
];

export default function Projects() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const initialAnimation = async () => {
      await animate(
        "#project > *",
        {
          opacity: 0,
          y: 10,
        },
        {
          duration: 0,
        },
      );

      await animate(
        "#project > *",
        {
          opacity: 1,
          y: 0,
        },
        {
          duration: 0.44,
          delay: stagger(0.1),
          ease: [0.17, 0.67, 0.25, 1],
        },
      );
    };

    initialAnimation();
  }, []);

  return (
    <div
      className="slide-enter-content grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4"
      id="tab-projects"
      ref={scope}
    >
      {projects.map((project) => (
        <div
          key={project.title}
          className="mt-4 text-pretty dark:text-foreground"
          id="project"
        >
          <h2 className="text-md font-semibold">{project.title}</h2>
          <p>{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1"
          >
            Link
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      ))}
    </div>
  );
}
