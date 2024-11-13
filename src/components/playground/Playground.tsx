"use client";

import { playground } from "@/constants/playground";
import PlaygroundCard from "@/components/playground/PlaygroundCard";
import CircularProgress from "@/components/playground/CircularProgress";
import Tooltip from "@/components/shared/Tooltip";
import { useVideoProgress } from "@/hooks/useVideoProgress";

const Playground = () => {
  const { progress, isPlaying, togglePlaying } = useVideoProgress({
    duration: 5000,
    initialPlayState: localStorage.getItem("shouldPlayPreviews") === "true",
  });

  const togglePaused = () => {
    const savedState = localStorage.getItem("shouldPlayPreviews");
    if (!savedState) {
      localStorage.setItem("shouldPlayPreviews", "true");
      return;
    }

    localStorage.setItem(
      "shouldPlayPreviews",
      savedState === "true" ? "false" : "true",
    );

    togglePlaying();
  };

  return (
    <div className="slide-enter-content relative">
      <div className="mb-5 flex justify-end">
        <Tooltip
          text={`Click to ${isPlaying ? "pause" : "play"} previews`}
          position="left"
        >
          <div>
            <CircularProgress
              progress={progress}
              isPaused={!isPlaying}
              togglePaused={togglePaused}
            />
          </div>
        </Tooltip>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {playground.map((item, index) => (
          <PlaygroundCard
            key={item.id}
            playground={item}
            shouldPlayPreview={isPlaying}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;
