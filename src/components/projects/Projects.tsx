"use client";

import React from "react";
import { allProjects } from "contentlayer/generated";
import { motion } from "framer-motion";

const ProjectList = () => {
  const projects = allProjects;

  return (
    <div className="">
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
          A collection of work from the past 3 years, focusing on digital
          products and design systems.
        </div>
      </motion.div>

      <div className="slide-enter-content grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.title} className="group">
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
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-muted/60">
        Some projects are not shown due to confidentiality agreements. These
        include internal tools, banking systems, and enterprise applications.
      </div>
    </div>
  );
};

export default ProjectList;
