// import { useEffect, useState } from "react";
// import { ProgrammingState, Timer, useProgrammingStore, ExecutionState } from "@people_and_robots/open-core";
// import CircularProgress from "@mui/material/CircularProgress";

export const Test = ({ progress }: {progress: number}) => {
  // const theme = useTheme();
//   const [progressValue, setProgressValue] = useState(0);
  
//   const clock: Timer = useProgrammingStore((state:ProgrammingState) => state.clock) as Timer;
//   const shown =
//     progressValue > 0 &&
//     progress !== null &&
//     progress !== undefined &&
//     progressValue !== null &&
//     progressValue !== undefined;

//   useEffect(() => {
//     clock.update();
//     const time = clock.getElapsed() * 1000;
//     const newProgressValue =
//       typeof progress === "function" ? progress(time) : progress;
//     setProgressValue(newProgressValue);
//     if (typeof progress === "function") {
//       const interval = setInterval(() => {
//         clock.update();
//         const time = clock.getElapsed() * 1000;
//         const newProgressValue =
//           typeof progress === "function" ? progress(time) : progress;
//         setProgressValue(newProgressValue);
//       }, 300);
//       return () => clearInterval(interval);
//     }
//   }, [clock, progress]);
return <div>Test (50)</div>

//   return (
//     <CircularProgress
//       color="primary"
//       variant='determinate'
//       value={50}
//       size={30}
//       // sx={{
//       //   color,
//       // }}
//     />
//   );
};
