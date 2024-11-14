import { cn } from "@/utils/tailwindUtils";
import ArrowRightUpIcon from "@/icons/ArrowRightUpIcon";
import React from "react";

type Props = {
  href: string;
  className?: string;
  children?: React.ReactNode;
};

export default function LinkExternal({ href, className, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn("m-0 inline-flex items-center gap-2 [&>p]:m-0", className)}
    >
      {children}
      <ArrowRightUpIcon className="size-4" />
    </a>
  );
}
