"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playground } from "@/constants/playground";
import PlaygroundCard from "@/components/playground/PlaygroundCard";
import CircularProgress from "@/components/playground/CircularProgress";
import Tooltip from "@/components/shared/Tooltip";

const ANIMATION_DURATION = 5000;

const Playground = () => {
  // Initialize with a default value
  const [shouldPlayPreviews, setShouldPlayPreviews] = useState(true);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  // Move sessionStorage check to useEffect
  useEffect(() => {
    const savedValue = sessionStorage.getItem("shouldPlayPreviews");
    if (savedValue !== null) {
      setShouldPlayPreviews(JSON.parse(savedValue));
    }
  }, []);

  const togglePaused = useCallback(() => {
    setShouldPlayPreviews((prev) => {
      const newVal = !prev;
      sessionStorage.setItem("shouldPlayPreviews", JSON.stringify(newVal));
      return newVal;
    });
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

      setProgress(newProgress);

      if (newProgress < 1 && shouldPlayPreviews) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (newProgress >= 1) {
        setProgress(0);
        startTimeRef.current = undefined;
        animationRef.current = requestAnimationFrame(animate);
      }
    },
    [shouldPlayPreviews],
  );

  useEffect(() => {
    if (shouldPlayPreviews) {
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldPlayPreviews, animate]);

  return (
    <div className="slide-enter-content relative">
      <div className="mb-5 flex justify-end">
        <Tooltip
          text={`Click to ${shouldPlayPreviews ? "pause" : "play"} previews`}
          position="left"
        >
          <div>
            <CircularProgress
              progress={progress}
              isPaused={!shouldPlayPreviews}
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
            shouldPlayPreview={shouldPlayPreviews}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;
