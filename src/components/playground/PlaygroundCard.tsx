"use client";

import React, { memo, useCallback, useState } from "react";
import Image from "next/image";
import { Video } from "lucide-react";
import { playground } from "@/constants/playground";

type PlaygroundCardProps = {
  playground: (typeof playground)[0];
  shouldPlayPreview: boolean;
  index: number;
};

const PlaygroundCard = memo(
  ({ playground, shouldPlayPreview, index }: PlaygroundCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveringPreview, setHoveringPreview] = useState(false);
    const showPreview = shouldPlayPreview || (isHovered && hoveringPreview);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
      <a
        href={playground.location}
        target="_blank"
        className="group relative block transform !no-underline transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden rounded-xl duration-300">
          <div className="relative aspect-video">
            {!showPreview ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src={playground.image}
                  alt={playground.title}
                  priority={index < 3}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </>
            ) : (
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  preload="metadata"
                >
                  <source src={playground.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {playground.video && (
              <div
                className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black dark:text-white"
                onMouseEnter={() => setHoveringPreview(true)}
                onMouseLeave={() => setHoveringPreview(false)}
              >
                <Video className="h-4 w-4" />
                <span>Preview</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <h2 className="text-lg font-medium tracking-tight text-foreground underline decoration-muted/40 transition-colors duration-300 group-hover:text-primary group-hover:decoration-foreground">
              {playground.title}
            </h2>
            <p className="mt-1 text-sm text-muted/60">
              {playground.description}
            </p>
          </div>
        </div>
      </a>
    );
  },
);

PlaygroundCard.displayName = "PlaygroundCard";

export default PlaygroundCard;
