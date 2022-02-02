import { FiChevronRight } from "react-icons/fi";
import { useSpring, animated } from '@react-spring/web';
import { config } from 'react-spring';

export const ExpandCarrot = ({expanded}) => {

    const carrotStyle = useSpring({
        rotate: expanded ? '90deg' : '0deg',
        config: config.wobbly
    });

    return <animated.div style={carrotStyle}><FiChevronRight/></animated.div>
}