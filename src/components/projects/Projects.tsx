"use client";
import React, { useEffect, useRef, useState } from "react";
import { allProjects } from "contentlayer/generated";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/tailwindUtils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ProjectList = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const projects = allProjects;
  const tags = new Set<string>();

  projects.forEach((project) => {
    project.technologies?.split(", ").forEach((tag) => tags.add(tag));
  });

  const filteredProjects = allProjects.filter((project) => {
    if (!selectedTag) return true;
    return project.technologies?.split(", ").includes(selectedTag);
  });

  const handleSelectedTag = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const checkScroll = () => {
    const element = listRef.current;
    if (element) {
      setCanScrollLeft(element.scrollLeft > 0);
      setCanScrollRight(
        element.scrollLeft < element.scrollWidth - element.clientWidth,
      );
    }
  };

  useEffect(() => {
    const element = listRef.current;
    if (element) {
      checkScroll();
      element.addEventListener("scroll", checkScroll);
      const observer = new ResizeObserver(checkScroll);
      observer.observe(element);

      return () => {
        element.removeEventListener("scroll", checkScroll);
        observer.disconnect();
      };
    }
  }, []);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div>
      <motion.div
        className="mb-10 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="articulat-cf mb-2 text-sm font-semibold text-muted/40">
          Selected Projects
        </div>
        <div className="articulat-cf text-2xl font-semibold">
          A collection of work from the past {new Date().getFullYear() - 2020}{" "}
          years, focusing on digital products and design systems.
        </div>
      </motion.div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="relative"
        >
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-0 z-10 flex h-7 w-16 items-center bg-gradient-to-r from-background/80 from-20% pr-2"
              aria-label="Scroll left"
            >
              <ArrowLeft className="size-5" />
            </button>
          )}
          <ul
            className="no-scrollbar mb-4 flex gap-2 overflow-auto pb-3"
            ref={listRef}
          >
            {Array.from(tags).map((tag) => (
              <li
                key={tag}
                className="inline-block"
                onClick={() => handleSelectedTag(tag)}
              >
                <button
                  className={cn(
                    "rounded-md bg-muted/10 px-2 py-1 text-sm hover:bg-muted/30",
                    selectedTag === tag && "bg-muted/30",
                  )}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-0 z-10 flex h-7 w-16 items-center justify-center bg-gradient-to-l from-background/80 from-50% pl-2"
              aria-label="Scroll right"
            >
              <ArrowRight className="size-5" />
            </button>
          )}
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                className="group"
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="articulat-cf text-lg font-semibold">
                      {project.title}
                    </div>
                  </div>
                  <div className="articulat-cf font-medium text-muted/50">
                    {project.shortDescription}
                  </div>
                </div>

                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.technologies?.split(", ").map((tech) => (
                    <div key={tech} className="text-sm">
                      {tech}
                    </div>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-8 text-sm text-muted/60">
        Some projects are not shown due to confidentiality agreements. These
        include internal tools, banking systems, and enterprise applications.
      </div>
    </div>
  );
};

export default ProjectList;
