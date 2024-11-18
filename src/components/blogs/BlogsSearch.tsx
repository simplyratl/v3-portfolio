"use client";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  setShouldShowSuggestions: (value: boolean) => void;
  shouldShowSuggestions: boolean;
};

export default function BlogSearch({
  setShouldShowSuggestions,
  shouldShowSuggestions,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const [blogs] = useState(allBlogs);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleFocus = () => {
    setShouldShowSuggestions(true);
  };

  const selectBlog = (index: number) => {
    const selectedBlog = filteredBlogs[index];
    if (selectedBlog) {
      router.push(selectedBlog.slug);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredBlogs.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredBlogs.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          selectBlog(activeIndex);
        }
        break;
      case "Escape":
        setShouldShowSuggestions(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
      case "Tab":
        if (!e.shiftKey && activeIndex === filteredBlogs.length - 1) {
          setActiveIndex(0);
        } else if (e.shiftKey && activeIndex === 0) {
          setActiveIndex(filteredBlogs.length - 1);
        }
        break;
    }
  };

  const getRandomLetter = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const handleSearchReset = async () => {
    const delay = 50;
    const searchValue = search;

    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const scrambleLetters = async () => {
      inputRef.current?.classList.add("text-red-600");

      for (let i = 0; i <= searchValue.length; i++) {
        setSearch(
          (prev) =>
            prev.substring(0, i) + getRandomLetter() + prev.substring(i + 1),
        );
        await wait(delay / 5);
      }

      inputRef.current?.classList.remove("text-red-600");
    };

    await scrambleLetters();

    inputRef.current?.classList.add("text-transparent");

    await wait(200);
    setSearch("");

    inputRef.current?.classList.remove("text-transparent");

    inputRef.current?.focus();
  };

  // Reset active index when search changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const searchContainer = inputRef.current?.closest(".search-container");

      if (searchContainer && !searchContainer.contains(target)) {
        setShouldShowSuggestions(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShouldShowSuggestions]);

  return (
    <div
      className="search-container relative z-50"
      role="search"
      aria-label="Blog search"
    >
      <div>
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
          onClick={() => inputRef.current?.focus()}
        >
          <Search aria-hidden="true" className="size-5" />
        </div>
        <input
          className="w-full rounded-full border-2 border-transparent bg-muted/5 px-11 py-2 placeholder-gray-400 shadow-md transition-all duration-300 focus:border-blue-500 focus:outline-none"
          placeholder="Search blogs..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          role="combobox"
          aria-expanded={shouldShowSuggestions}
          aria-controls="search-suggestions"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
          aria-label="Search blogs"
          aria-autocomplete="list"
        />

        {search && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={handleSearchReset}
          >
            <X />
          </button>
        )}
      </div>

      <AnimatePresence>
        {shouldShowSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.36,
            }}
            className="no-slide-animation absolute left-0 top-[calc(100%+8px)] isolate z-[99999] w-full overflow-hidden rounded-xl border border-muted/10 bg-zinc-300/20 shadow-lg backdrop-blur dark:bg-zinc-900/40"
            role="listbox"
            tabIndex={-1}
          >
            <ul className="max-h-[60vh] overflow-y-auto">
              {filteredBlogs.map((blog, index) => (
                <li
                  key={blog.slug}
                  className={`border-b border-muted/10 transition-colors ${
                    index === activeIndex
                      ? "bg-zinc-400/30 dark:bg-zinc-500/30"
                      : "hover:bg-zinc-500/30"
                  }`}
                  role="option"
                  id={`suggestion-${index}`}
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Link
                    href={blog.slug}
                    className="flex h-full items-center gap-2 p-4 font-semibold text-foreground !no-underline outline-none focus:bg-zinc-500/30"
                    onClick={(e) => {
                      e.preventDefault();
                      selectBlog(index);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        selectBlog(index);
                      }
                    }}
                    tabIndex={0}
                  >
                    <div>
                      <h3 className="text-base">{blog.title}</h3>
                      <p className="text-sm text-muted/40">
                        {blog.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}

              {filteredBlogs.length === 0 && (
                <li className="p-4 text-muted/60" role="alert">
                  No blogs found for &#34;{search}&#34;
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
