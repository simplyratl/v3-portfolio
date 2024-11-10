"use client";

import { Playground } from "@/constants/playground";
import Image from "next/image";
import { useState } from "react";

type Props = {
  playground: Playground;
  shouldPlayPreview: boolean;
  index: number;
};

const PlaygroundCard = ({ playground, shouldPlayPreview, index }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const showPreview = () => {
    return shouldPlayPreview && !isHovered;
  };

  return (
    <a
      href={playground.location}
      target="_blank"
      className="slide-enter-content group relative block !no-underline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl border border-muted/30">
        {!showPreview() ? (
          <Image
            src={playground.image}
            alt={playground.title}
            priority={index < 3}
            fill
            className="object-cover transition-transform"
          />
        ) : (
          <video
            autoPlay={!isHovered}
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={playground.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold transition-all group-hover:underline">
          {playground.title}
        </h2>
        <p className="text-muted/50">{playground.description}</p>
      </div>
    </a>
  );
};

export default PlaygroundCard;
