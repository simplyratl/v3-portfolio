import { Pause, Play } from "lucide-react";

type Props = {
  progress: number;
  size?: number;
  width?: number;
  isPaused: boolean;
  togglePaused: () => void;
};

const CircularProgress = ({
  progress,
  size = 40,
  width = 3,
  isPaused,
  togglePaused,
}: Props) => {
  const center = size / 2;
  const radius = center - width;
  const dashArray = radius * 2 * Math.PI;
  const dashOffset = dashArray * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted) / 0.2)"
          strokeWidth={width}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={width}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <button onClick={togglePaused}>
          {isPaused ? (
            <Play className="size-4" />
          ) : (
            <Pause className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CircularProgress;
