import React, { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { styled, alpha, darken, lighten, keyframes } from '@mui/material';

const slideUpAndFade = keyframes({
  'from': { transform: 'translateY(4px)', opacity: 0 },
  'to': { transform: 'translateY(0)', opacity: 1 },
});

const slideDownAndFade = keyframes({
    'from': { transform: 'translateY(-4px)', opacity: 0 },
    'to': { transform: 'translateY(0)', opacity: 1 },
});

const slideRightAndFade = keyframes({
    'from': { transform: 'translateX(-4px)', opacity: 0 },
    'to': { transform: 'translateX(0)', opacity: 1 },
});

const slideLeftAndFade = keyframes({
    'from': { transform: 'translateX(4px)', opacity: 0 },
    'to': { transform: 'translateX(0)', opacity: 1 },
});

const TooltipContent = styled(RadixTooltip.Content)({
    padding: '5px 10px',
    fontSize: 12,
    lineHeight: '1.5',
    userSelect: 'none',
    willChange: 'transform, opacity',
    boxShadow: '#00000050 0px 10px 38px -10px, #00000050 0px 10px 20px -15px',
    zIndex: 1000
}, ({theme})=>({
    "&[data-state='delayed-open'][data-side='top']": {
      animation: `${slideUpAndFade} 500ms ${theme.transitions.easing.easeInOut}`,
    },
    "&[data-state='delayed-open'][data-side='right']": {
      animation: `${slideRightAndFade} 500ms ${theme.transitions.easing.easeInOut}`,
    },
    "&[data-state='delayed-open'][data-side='bottom']": {
      animation: `${slideDownAndFade} 500ms ${theme.transitions.easing.easeInOut}`,
    },
    "&[data-state='delayed-open'][data-side='left']": {
      animation: `${slideLeftAndFade} 500ms ${theme.transitions.easing.easeInOut}`,
    },
    
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'light' ? alpha(darken(theme.palette.background.paper, 0.3),0.75) : alpha(lighten(theme.palette.background.paper, 0.3),0.75),
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
}))

const TooltipArrow = styled(RadixTooltip.Arrow)({

}, ({theme})=>({
    fill: theme.palette.mode === 'light' ? alpha(darken(theme.palette.background.paper, 0.3),0.75) : alpha(lighten(theme.palette.background.paper, 0.3),0.75),
}))

export interface TooltipProps {
    title: ReactNode;
    children: ReactNode;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    parent?: HTMLElement;
}

export const Tooltip = ({title, children, placement, parent}: TooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal container={parent}>
          <TooltipContent sideOffset={5} side={placement}>
            {title}
            <TooltipArrow />
          </TooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};