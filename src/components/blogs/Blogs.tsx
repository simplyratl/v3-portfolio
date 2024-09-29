"use client";

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

export default function Blogs() {
  return (
    <div
      className="slide-enter-content grid grid-cols-1 gap-2"
      id="tab-projects"
    >
      {projects.map((project) => (
        <div
          key={project.title}
          className="mt-4 text-pretty dark:text-foreground"
        >
          <a
            href={project.link}
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1"
          >
            <h2 className="text-md font-semibold">{project.title}</h2>
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
