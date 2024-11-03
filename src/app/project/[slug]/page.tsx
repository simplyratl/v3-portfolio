import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/shared/markdown/MDXComponent";
import Header from "@/components/shared/Header";
import React from "react";
import RevealText from "@/components/shared/RevealText";
import { cn } from "@/utils/tailwindUtils";
import { Link } from "lucide-react";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

type Headings = {
  slug: string;
  text: string;
  level: number;
};

const headingLevels: {
  [key: string]: number;
} = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};

async function getDocFromParams(slug: string) {
  const project = allProjects.find((project) => project.slugAsParams === slug);
  if (!project) notFound();

  return project;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projects = await getDocFromParams(params.slug);

  return (
    <main className="relative">
      <Header className="mb-4" fixed />

      <article>
        <div className="relative flex h-[700px] flex-col items-center justify-center gap-9">
          <div className="absolute left-0 top-0 z-[-1] h-screen w-full">
            <div className="isolate z-20 h-full contain-strict">
              <div className="animate-fade-in">
                <div className="background-light absolute h-[1380px] w-[560px] -translate-y-[200px] translate-x-[80px] -rotate-45 rounded-full"></div>
              </div>
              <div className="animate-fade-in">
                <div className="background-light absolute h-[1000px] w-[300px] translate-x-[100px] translate-y-[50px] -rotate-45 rounded-full"></div>
              </div>
            </div>
          </div>

          {projects.publicLink && (
            <a
              href={projects.publicLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl font-medium text-foreground"
            >
              <Link size={20} />
              <span>View project</span>
            </a>
          )}

          <RevealText
            text={projects.title}
            className="max-w-lg px-4 text-4xl sm:text-5xl md:max-w-[750px] md:text-7xl"
            once
          />
          <RevealText
            text={projects.description}
            className="text-md max-w-[450px] sm:text-lg"
            once
            delayStart={0.5}
          />
          <ul className="slide-enter-content slide-enter-delay-1700 flex gap-4">
            {projects?.technologies &&
              projects.technologies.split(", ").map((tech) => (
                <li
                  key={tech}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-muted/15 bg-muted/10 px-2.5 py-1 text-sm text-foreground transition-colors dark:bg-muted/20 dark:text-foreground",
                  )}
                >
                  {tech}
                </li>
              ))}
          </ul>
        </div>
        <div className="mx-auto mt-10 max-w-screen-md px-4">
          <Mdx code={projects.body.code} />
        </div>
      </article>

      {projects.toc && (
        <aside>
          <ul
            className="fixed left-4 top-20 hidden max-h-[80vh] max-w-60 scroll-p-2.5 space-y-2 overflow-y-auto text-balance text-sm opacity-80 transition-opacity hover:opacity-100 xl:block"
            id="toc"
          >
            {projects.headings.map((heading: Headings) => {
              return (
                <li key={`#${heading.slug}`}>
                  <a
                    className="group relative !text-muted/40 hover:!text-foreground data-[level=three]:pl-4"
                    data-level={heading.level}
                    href={`#${heading.slug}`}
                    style={{
                      paddingLeft: `${headingLevels[heading.level] * 9}px`,
                    }}
                  >
                    <span className="absolute left-0 top-0.5 font-mono text-xs">
                      {new Array(headingLevels[heading.level])
                        .fill(0)
                        .map(() => "-")}
                    </span>
                    {heading.text}

                    <span className="invisible ml-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                      #
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </main>
  );
}
