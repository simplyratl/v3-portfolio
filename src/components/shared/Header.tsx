"use client";
import ToggleTheme from "@/components/ui/ToggleTheme";
import React from "react";
import Logo from "@/icons/Logo";
import { cn } from "@/utils/tailwindUtils";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/icons/ArrowLeftIcon";
import Link from "next/link";

type Props = {
  className?: string;
  enableBack?: boolean;
  transparentSwitch?: boolean;
};

export default function Header({
  className,
  enableBack,
  transparentSwitch,
}: Props) {
  const router = useRouter();

  return (
    <header className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
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
      <ToggleTheme
        className={transparentSwitch ? "bg-background/20 backdrop-blur" : ""}
      />
    </header>
  );
}
