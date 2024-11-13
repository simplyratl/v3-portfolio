"use client";
import * as React from "react";
import { cn } from "@/utils/tailwindUtils";
import { useVideoProgress } from "@/hooks/useVideoProgress";
import CircularProgress from "@/components/playground/CircularProgress";
import { useEffect } from "react";

interface BlogVideoProps {
  src: string;
  className?: string;
}

function MarkdownVideo({ src, className }: BlogVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = React.useState<number>(5000); // Default duration

  const { progress, isPlaying, togglePlaying } = useVideoProgress({
    duration,
    initialPlayState: true,
    resetOnPause: false,
  });

  React.useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      if (videoElement) {
        setDuration(videoElement.duration * 1000);
      }
    };

    if (videoElement) {
      // Add event listener for when video metadata is loaded
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      // If the video is already loaded, set duration immediately
      if (videoElement.duration) {
        setDuration(videoElement.duration * 1000);
      }
    }

    return () => {
      // Cleanup
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <video
        ref={videoRef}
        autoPlay={isPlaying}
        loop
        muted
        playsInline
        className={cn("m-0 w-full", className)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute right-4 top-4">
        <CircularProgress
          progress={progress}
          isPaused={!isPlaying}
          togglePaused={togglePlaying}
          background
        />
      </div>
    </div>
  );
}

export default MarkdownVideo;
