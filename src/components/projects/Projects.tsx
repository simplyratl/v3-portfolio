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
      <div
        className="slide-enter-content grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4"
        id="tab-projects"
        ref={scope}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="text-pretty dark:text-foreground"
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
          </div>
        ))}
      </div>
    </section>
  );
}
