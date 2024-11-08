"use client";

import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { useRouter } from "next/navigation";

const getAllBlogs = () => {
  return allBlogs;
};

export default function Blogs() {
  const blogs = getAllBlogs();
  const router = useRouter();

  return (
    <div className="slide-enter-content grid grid-cols-1 gap-2 space-y-8">
      <ul className="group/list">
        {blogs.map((blog) => (
          <li
            key={blog.slug}
            onMouseEnter={() => router.prefetch(blog.slug)}
            className="group/item transition-all"
          >
            <Link
              href={blog.slug}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 no-underline transition-all hover:bg-muted/5"
            >
              <span className="font-semibold text-muted/80 transition-all group-hover/item:text-foreground group-hover/list:text-muted/40">
                {blog.title}
              </span>
              <span className="hidden text-sm text-muted/50 md:block">
                {blog.description}
              </span>
              <div className="mr-2 h-[1px] flex-1 bg-muted/20"></div>
              <span className="text-muted/60">
                {new Date(blog.date).getFullYear()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
