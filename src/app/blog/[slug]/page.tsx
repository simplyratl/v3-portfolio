import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/shared/markdown/MDXComponent";
import ToggleTheme from "@/components/ui/ToggleTheme";
import BackButton from "@/components/shared/BackButton";
import { format } from "date-fns";
import Logo from "@/icons/Logo";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

type Headings = {
  slug: string;
  text: string;
  level: number;
};

async function getDocFromParams(slug: string) {
  const doc = allBlogs.find((doc) => doc.slugAsParams === slug);
  if (!doc) notFound();

  return doc;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getDocFromParams(params.slug);

  return (
    <main>
      <div className="mb-4 flex h-10 items-center justify-between">
        <div className="flex items-center gap-3">
          <BackButton className="peer" />
          <Logo />
        </div>
        <ToggleTheme />
      </div>
      <article className="slide-enter-content">
        <h1 className="text-4xl font-semibold">{blog.title}</h1>
        <p className="mt-3 text-muted/50">
          {format(blog.date, "MMMM dd yyyy")}
        </p>
        <div className="mt-10">
          <Mdx code={blog.body.code} />
        </div>
      </article>

      {blog.toc && (
        <aside>
          <ul className="max-h- fixed left-4 top-20 hidden max-w-60 space-y-2 overflow-y-auto text-balance xl:block">
            {blog.headings.map((heading: Headings) => {
              return (
                <li key={`#${heading.slug}`} className="group">
                  <a
                    className="data-[level=three]:pl-4"
                    data-level={heading.level}
                    href={`#${heading.slug}`}
                  >
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
