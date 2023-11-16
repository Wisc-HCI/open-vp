import { ReactNode } from "react";
import { useTheme, alpha } from "@mui/material";
import { useProgrammingStore, ExecutionState, ProgrammingState, Timer } from "@people_and_robots/open-core";
import {
    BlockAvatarContainer
} from "./BlockContainers";
import { useSpring, useTransform, useAnimationFrame, MotionValue } from "framer-motion";

export interface BlockAvatarProps {
    children: ReactNode;
    progress?: ExecutionState
}

export const BlockAvatar = ({
    children,
    progress = undefined
}: BlockAvatarProps) => {
    const theme = useTheme();
    const progressValue: MotionValue = useSpring(0, { damping: 30 });

    const timer = useProgrammingStore((state: ProgrammingState) => state.clock) as Timer;

    const gradient: MotionValue<string> = useTransform(
        progressValue,
        [0, 1],
        [
            `conic-gradient(${alpha(theme.palette.primary.main, 0.3)} 0deg, #22222222 0deg)`,
            `conic-gradient(${alpha(theme.palette.primary.main, 0.3)} 360deg, #22222222 360deg)`
        ],
        { clamp: false }
    )

    useAnimationFrame(() => {
        timer.update();
        const time = timer.getElapsed() * 1000;
        const newProgressValue =
            typeof progress === "function" ? progress(time) : progress ? progress : 0;
        progressValue.set(newProgressValue);
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