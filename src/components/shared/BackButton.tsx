"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@/icons/ArrowLeftIcon";
import { cn } from "@/utils/tailwindUtils";

type Props = {
  className?: string;
};

function BackButton({ className }: Props) {
  const router = useRouter();
  return (
    <button
      className={cn("h-8 w-8 rounded-xl p-0.5 hover:bg-muted/20", className)}
      onClick={() => router.push("/")}
    >
      <ArrowLeftIcon className="h-full w-full" />
    </button>
  );
}

export default BackButton;
