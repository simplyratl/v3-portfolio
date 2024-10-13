"use client";

import ArrowUpRightIcon from "@/icons/ArrowUpIcon";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/LinkPreview";

const getAllBlogs = () => {
  return allBlogs;
};

const blogsByYear = () => {
  const blogs = getAllBlogs();
  const blogsByYear: {
    [key: string]: (typeof blogs)[0][];
  } = {};
  blogs.forEach((blog) => {
    const year = new Date(blog.date).getFullYear();
    if (!blogsByYear[year]) {
      blogsByYear[year] = [];
    }

    blogsByYear[year].push(blog);
  });
  return Object.entries(blogsByYear).sort((a, b) => +b[0] - +a[0]);
};

export default function Blogs() {
  const blogs = blogsByYear();
  return (
    <div
      className="slide-enter-content grid grid-cols-1 gap-2 space-y-8"
      id="tab-projects"
    >
      {blogs.map(([year, blogs]) => (
        <div key={year}>
          <h1 className="text-2xl font-semibold text-muted/50 underline decoration-dashed">
            {year}
          </h1>
          {blogs.map((blog) => (
            <article
              key={blog.title}
              className="mt-4 text-pretty dark:text-foreground"
            >
              {/*TODO: Da li koristiti link preview za blogove?*/}
              {/*<LinkPreview*/}
              {/*  url={`${blog.slug}`}*/}
              {/*  className="inline-flex items-center gap-1"*/}
              {/*>*/}
              {/*</LinkPreview>*/}
              <Link href={blog.slug} className="inline-flex items-center gap-1">
                <h2 className="text-md font-semibold">{blog.title}</h2>
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
              <p>{blog.description}</p>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
