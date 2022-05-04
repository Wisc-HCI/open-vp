import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { config } from 'react-spring';
import { useProgrammingStore } from '../ProgrammingContext';

export const ProgressBar = ({progress,color}) => {

    const [progressValue,setProgressValue] = useState(0)
    const clock = useProgrammingStore(state=>state.clock);
    const shown = progressValue > 0 && progress !== null && progress !== undefined && progressValue !== null && progressValue !== undefined;
    const width = shown ? Math.min(100,progressValue*100) : 0;

    const outerStyle = useSpring({ transform: shown ? 'scaleY(1)' : 'scaleY(0)', opacity: shown ? 1 : 0, config: config.stiff });
    const innerStyle = useSpring({ width: `calc(${width}% - 2pt)`, config: config.stiff });

    useEffect(() => {
        clock.update();
        const time = clock.getElapsed() * 1000;
        const newProgressValue = typeof progress === 'function' ? progress(time) : progress;
        setProgressValue(newProgressValue);
        if (typeof progress === 'function') {
            const interval = setInterval(() => {
                clock.update();
                const time = clock.getElapsed() * 1000;
                const newProgressValue = typeof progress === 'function' ? progress(time) : progress;
                setProgressValue(newProgressValue);
            }, 300);
            return () => clearInterval(interval);
        }
    }, [clock,progress]);



    // const progressValue = useProgrammingStore(useCallback(state=>{
    //     const time = state.clock.getElapsed() * 1000;
    //     return typeof progress === 'function' ? progress(time) : progress
    // },[progress]))
    
    return (
        <animated.div hidden={!shown} style={{...outerStyle,height:8,borderRadius:100,backgroundColor:'#00000044',marginLeft:4,marginRight:4}}>
            <animated.div style={{...innerStyle,backgroundColor:color,borderRadius:100,margin:1,height:6,boxShadow:'0 0 1 1 #00000022'}}/>
        </animated.div>
    )
}