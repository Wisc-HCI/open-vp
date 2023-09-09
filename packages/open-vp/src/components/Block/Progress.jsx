import React, { useEffect, useState } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import CircularProgress from "@mui/material/CircularProgress";

export const ProgressBar = ({ progress, color }) => {
  const [progressValue, setProgressValue] = useState(0);
  const clock = useProgrammingStore((state) => state.clock);
  const shown =
    progressValue > 0 &&
    progress !== null &&
    progress !== undefined &&
    progressValue !== null &&
    progressValue !== undefined;

  useEffect(() => {
    clock.update();
    const time = clock.getElapsed() * 1000;
    const newProgressValue =
      typeof progress === "function" ? progress(time) : progress;
    setProgressValue(newProgressValue);
    if (typeof progress === "function") {
      const interval = setInterval(() => {
        clock.update();
        const time = clock.getElapsed() * 1000;
        const newProgressValue =
          typeof progress === "function" ? progress(time) : progress;
        setProgressValue(newProgressValue);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [clock, progress]);

  return shown && (
    <CircularProgress
      variant='determinate'
      value={progressValue*100}
      size={30}
      sx={{
        color,
      }}
    />
  );
};
