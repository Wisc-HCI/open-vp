import styled, { keyframes } from 'styled-components';

export const selectKeyframes = props => keyframes`
    0% {
        box-shadow: 0pt 0pt 3pt 1pt ${props.selected ? 'rgba(255,255,255,0.5)' : 'transparent'}, 0pt 0pt 2pt 2pt ${props.selected ? props.highlightColor : 'transparent'}, inset 0pt 0pt 1pt 1pt ${props.selected ? 'rgba(0,0,0,0.7)' : 'transparent'}, 0pt 0pt 20pt 20pt ${props.selected ? 'rgba(0,0,0,0.4)' : 'transparent'};
    }

    50% {
        box-shadow: 0pt 0pt 3pt 1pt ${props.selected ? 'rgba(255,255,255,0.5)' : 'transparent'}, 0pt 0pt 2pt 5pt ${props.selected ? props.highlightColor : 'transparent'}, inset 0pt 0pt 1pt 1pt ${props.selected ? 'rgba(0,0,0,0.7)' : 'transparent'}, 0pt 0pt 20pt 20pt ${props.selected ? 'rgba(0,0,0,0.4)' : 'transparent'};
    }
    
    100% {
        box-shadow: 0pt 0pt 3pt 1pt ${props.selected ? 'rgba(255,255,255,0.5)' : 'transparent'}, 0pt 0pt 2pt 2pt ${props.selected ? props.highlightColor : 'transparent'}, inset 0pt 0pt 1pt 1pt ${props.selected ? 'rgba(0,0,0,0.7)' : 'transparent'}, 0pt 0pt 20pt 20pt ${props.selected ? 'rgba(0,0,0,0.4)' : 'transparent'};
    }
`;

export const Selectable = styled.div`
    animation: ${selectKeyframes} 2s ease-in-out infinite reverse;
`;