"use client";

import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { allProjects } from "contentlayer/generated";
import Link from "next/link";
import ArrowRightUpIcon from "@/icons/ArrowRightUpIcon";
import Tooltip from "@/components/shared/Tooltip";

export default function Projects() {
  const [scope, animate] = useAnimate();
  const projects = allProjects;

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
  }, [animate]);

  return (
    <section>
      <div className="slide-enter-content">
        <p className="text-sm text-muted/50">
          There are few projects that I&apos;m not allowed to share publicly,
          but they all are internal tools, design systems, and applications.{" "}
          <span className="font-semibold underline decoration-dashed">
            They are either banks systems or other confidential projects.
          </span>
        </p>

        <div className="mt-4 h-0.5 w-full bg-muted/10"></div>
      </div>

      <div
        className="slide-enter-content mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4"
        id="tab-projects"
        ref={scope}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="relative text-pretty pb-10 dark:text-foreground"
            id="project"
          >
            <Link
              href={`${project.slug}`}
              className="inline-flex items-center gap-1"
            >
              <h2 className="text-md font-semibold">{project.title}</h2>
              <ArrowRightUpIcon className="h-4 w-4" />
            </Link>

            <p>{project.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="w-fit rounded-full bg-foreground px-3 py-1 text-xs text-background">
                {project.tag}
              </div>

              <Tooltip text="Opens in new tab" position="top">
                <Link
                  href={`${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Link
                  <ArrowRightUpIcon className="h-4 w-4" />
                </Link>
              </Tooltip>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full bg-gradient-to-t from-background to-transparent"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
