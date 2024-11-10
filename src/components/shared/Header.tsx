"use client";
import ToggleTheme from "@/components/ui/ToggleTheme";
import React from "react";
import Logo from "@/icons/Logo";
import { cn } from "@/utils/tailwindUtils";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/icons/ArrowLeftIcon";
import Link from "next/link";
import { links } from "@/constants/links";

type Props = {
  className?: string;
  enableBack?: boolean;
  transparentSwitch?: boolean;
  fixed?: boolean;
};

export default function Header({
  className,
  enableBack,
  transparentSwitch,
  fixed = false,
}: Props) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "flex items-center justify-between",
        fixed &&
          "fixed left-0 right-0 top-0 z-50 bg-background/60 p-4 backdrop-blur",
        !fixed && "h-10",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        {enableBack && (
          <button
            className="size-7 rounded-xl p-0.5 hover:bg-muted/20"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="size-full" />
          </button>
        )}
        <Link href={"/"} aria-label="Home">
          <Logo className="size-8" />
        </Link>
      </div>
      {fixed && (
        <div className="flex flex-1 items-center justify-center gap-12">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-lg font-semibold !text-zinc-400 no-underline hover:!text-foreground hover:underline"
              onMouseEnter={() => router.prefetch(href)}
            >
              <p>{label}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-1 justify-end">
        <ToggleTheme
          className={transparentSwitch ? "bg-background/20 backdrop-blur" : ""}
        />
      </div>
    </header>
  );
}
