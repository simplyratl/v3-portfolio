"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { allProjects } from "contentlayer/generated";

const ProjectList = () => {
  const [activeProject, setActiveProject] = useState<number | null>(0);
  const router = useRouter();
  const projects = allProjects;

  return (
    <section className="slide-enter-content relative w-full">
      <motion.p className="mb-8 text-sm text-muted/60">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        There are few projects that I'm not allowed to share publicly, but they
        all are internal tools, design systems, and applications.{" "}
        <span className="font-medium underline decoration-dashed">
          They are either banks systems or other confidential projects.
        </span>
      </motion.p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr,2fr] lg:gap-8">
        {/* Project Names Column */}
        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.div key={project.title} className="group relative">
              <button
                onClick={() =>
                  setActiveProject(activeProject === index ? null : index)
                }
                onMouseEnter={() => router.prefetch(project.slug)}
                className={`w-full text-left transition-all ${
                  activeProject === index ? "pl-4" : "pl-0"
                }`}
              >
                <div className="group flex items-center justify-between py-4">
                  <span
                    className={`hidden font-mono text-sm sm:block ${
                      activeProject === index
                        ? "text-foreground"
                        : "text-muted/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className={`mx-0 text-base font-medium transition-colors sm:mx-4 sm:text-lg ${
                      activeProject === index
                        ? "text-primary"
                        : "text-muted/30 group-hover:text-muted/80"
                    }`}
                  >
                    {project.title}
                  </h2>
                  <span className="h-[1px] flex-1 bg-primary/10"></span>
                </div>
              </button>

              {/* Mobile-only project details */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeProject === index ? 1 : 0,
                  height: activeProject === index ? "auto" : 0,
                }}
                className="overflow-hidden lg:hidden"
              >
                {activeProject === index && (
                  <div className="space-y-4 rounded-xl border border-primary/10 bg-primary/5 p-4 sm:p-6">
                    <p className="text-pretty text-sm text-foreground sm:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                          {project.tag}
                        </span>
                        {project.technologies?.split(", ").map((tech) => (
                          <span
                            key={tech}
                            className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="!mt-8 flex items-center justify-between gap-4">
                      {project.publicLink ? (
                        <Link
                          href={project.publicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          Visit Live Site
                        </Link>
                      ) : (
                        <div></div>
                      )}
                      <Link
                        href={project.slug}
                        className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-400 bg-background px-4 py-2 text-sm !no-underline transition-colors hover:bg-muted/10 hover:text-background"
                      >
                        View Project
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Project Details Column */}
        <div className="relative hidden lg:block">
          <div className="sticky top-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeProject === index ? 1 : 0,
                  height: activeProject === index ? "auto" : 0,
                }}
                className="overflow-hidden"
              >
                {activeProject === index && (
                  <div className="space-y-6 rounded-2xl border border-primary/10 bg-primary/5 p-8">
                    <div className="flex items-start justify-between">
                      <p className="max-w-lg text-pretty text-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary px-4 py-1 text-sm text-primary-foreground">
                          {project.tag}
                        </span>

                        {project.technologies?.split(", ").map((tech) => (
                          <span
                            key={tech}
                            className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {project.publicLink ? (
                        <Link
                          href={project.publicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          Visit Live Site
                        </Link>
                      ) : (
                        <div></div>
                      )}

                      <Link
                        href={project.slug}
                        className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-400 bg-background px-4 py-2 text-sm !no-underline transition-colors hover:bg-muted/10 hover:text-background"
                        onMouseEnter={() => router.prefetch(project.slug)}
                      >
                        View Project
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
