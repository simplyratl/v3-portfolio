import PlaygroundCard from "@/components/playground/PlaygroundCard";
import { playground } from "@/constants/playground";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "@/components/playground/CircularProgress";
import Tooltip from "@/components/shared/Tooltip";

const Playground = () => {
  const savedValue = sessionStorage.getItem("shouldPlayPreviews");

  const [shouldPlayPreviews, setShouldPlayPreviews] = useState<boolean>(
    savedValue ? JSON.parse(savedValue) : true,
  );

  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const ANIMATION_DURATION = 5000; // 6 seconds in milliseconds

  const togglePaused = () => {
    const newVal = !shouldPlayPreviews;
    setShouldPlayPreviews(newVal);

    sessionStorage.setItem("shouldPlayPreviews", JSON.stringify(newVal));
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const newProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

    setProgress(newProgress);

    if (newProgress < 1 && shouldPlayPreviews) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (newProgress >= 1) {
      //   play animation again
      setProgress(0);
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

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
  }, [shouldPlayPreviews]);

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
      <div className="grid sm:grid-cols-2">
        {playground.map((playground, index) => (
          <PlaygroundCard
            key={playground.id}
            playground={playground}
            shouldPlayPreview={shouldPlayPreviews}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;
