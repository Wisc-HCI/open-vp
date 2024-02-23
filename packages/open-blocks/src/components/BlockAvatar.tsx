import { ReactNode } from "react";
import { useTheme, alpha } from "@mui/material";
import { useProgrammingStore, ExecutionState, ProgrammingState, Timer } from "@people_and_robots/open-core";
import {
    BlockAvatarContainer
} from "./BlockContainers";
import { useSpring, useTransform, useAnimationFrame, MotionValue, useTime, useMotionValue, useMotionTemplate } from "framer-motion";

export interface BlockAvatarProps {
    children: ReactNode;
    progress?: ExecutionState
}

export const BlockAvatar = ({
    children,
    progress = undefined
}: BlockAvatarProps) => {
    const theme = useTheme();
    const progressValue: MotionValue<number> = useSpring(0, { damping: 10 });
    const startValue: MotionValue<number> = useMotionValue(0);

    const timer = useProgrammingStore((state: ProgrammingState) => state.clock) as Timer;
    // const gradient: MotionValue<string> = useTransform(
    //     progressValue,
    //     [0, 1],
    //     [
    //         `conic-gradient(${alpha(theme.palette.primary.main, 0.3)} 0deg, #22222222 0deg)`,
    //         `conic-gradient(${alpha(theme.palette.primary.main, 0.3)} 360deg, #22222222 360deg)`
    //     ],
    //     { clamp: false }
    // )
    const activeColor = alpha(theme.palette.primary.main, 0.6)

    const gradient: MotionValue<string> = useTransform(()=>{
        const start = startValue.get() * 360;
        const progress = progressValue.get() * 360;

        return `repeating-conic-gradient(from ${start}deg, ${activeColor} 0deg ${progress}deg, #22222222 ${progress}deg 360deg)`
        // return `conic-gradient(
        //         #22222222 ${progress*360-360}deg ${start*360}deg, 
        //         ${activeColor} ${start*360}deg ${progress*360}deg
        //     )`;
    });
    // const gradient: MotionValue<string> = useTransform(()=>`conic-gradient(red ${startValue.get()}deg, #22222222 ${progressValue.get()}deg)`);

    useAnimationFrame(() => {
        timer.update();
        const time = timer.getElapsed() * 1000;
        const newProgressState =
            typeof progress === "function" ? progress(time) : progress ? progress : 0;
        const newProgressValue = newProgressState === "indeterminite" ? 0.3 : newProgressState;
        const newStartValue = newProgressState === "indeterminite" ? ((time % 360)/360)-0.05 : 0;
        progressValue.set(newProgressValue);
        startValue.set(newStartValue);
    })

    return (
        <BlockAvatarContainer 
            variant='rounded' 
            style={{ 
                // ESLint doesn't like this, but it's fine
                // @ts-ignore
                background: gradient,
            }}>
            {children}
        </BlockAvatarContainer>
    );
}