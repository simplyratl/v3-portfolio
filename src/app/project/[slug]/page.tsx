import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/shared/markdown/MDXComponent";
import Header from "@/components/shared/Header";
import React from "react";

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
      <Header className="mb-4" enableBack />

      <article className="slide-enter-content">
        <h1 className="text-4xl font-semibold">{projects.title}</h1>
        <div className="mt-10">
          <Mdx code={projects.body.code} />
        </div>
      </article>

      {projects.toc && (
        <aside>
          <ul
            className="fixed left-4 top-20 hidden max-h-[80vh] max-w-60 scroll-p-2.5 space-y-2 overflow-y-auto text-balance text-sm opacity-40 transition-opacity hover:opacity-100 xl:block"
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
