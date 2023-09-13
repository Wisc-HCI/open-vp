import React from "react";
import { styled, alpha } from '@mui/material/styles';
import { IconButton as MuiIconButton, Tooltip, TooltipProps } from "@mui/material";

interface IconButtonProps {
  size?: 'small' | 'medium' | 'large' | string;
  toggled?: boolean;
  canToggle?: boolean;
}

const sizeMap = {
  small: 32,
  medium: 40,
  large: 48,
}

export const IconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop: string) =>
    !['canToggle', 'toggled'].includes(prop)
})<IconButtonProps>(({ theme, size = 'small', toggled, canToggle }) => ({
  backgroundColor: canToggle && toggled 
    ? alpha(theme.palette.primary.main, 0.4) 
    : canToggle && !toggled
    ? "transparent"
    : "rgba(0,0,0,0.5)",
  color: "white",
  fontSize: "1.4rem",
  "&.Mui-disabled": {
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "#ccc",
  },
  borderRadius: theme.shape.borderRadius * 0.66,
  height: size === size ? sizeMap[size] : sizeMap.medium,
  minWidth: size === size ? sizeMap[size] : sizeMap.medium,
  flex: 1,
  "&:hover": {
    backgroundColor: canToggle && toggled 
    ? alpha(theme.palette.primary.main, 0.5) 
    : canToggle && !toggled
    ? alpha(theme.palette.primary.main, 0.25) 
    : "rgba(0,0,0,0.7)",
    color: theme.palette.primary.main,
  },
  "&:focus-visible": {
    userSelect: "none",
    outline: 0,
  }
}))
  ;

export const ToolbarButtonWrapper = styled("span")(({ }) => ({
  display: "flex",
}));

export interface ActionIconButtonProps {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  placement?: TooltipProps["placement"];
  toggled?: boolean;
  canToggle?: boolean;
  children?: React.ReactNode;
  flex?: boolean;
}

export const ActionIconButton = ({
  title = "Button",
  onClick = () => { },
  disabled = false,
  placement = "top" as TooltipProps["placement"],
  toggled = false,
  canToggle = false,
  children = [],
  ...props
}: ActionIconButtonProps) => (
  <Tooltip
    className="no-outline"
    title={title}
    color="primary"
    placement={placement}
    arrow
  >
    <ToolbarButtonWrapper className="no-outline">
      <IconButton
        className="no-outline"
        disabled={disabled}
        aria-label={title}
        onClick={onClick}
        toggled={toggled}
        canToggle={canToggle}
        {...props}
      >
        {children}
      </IconButton>
    </ToolbarButtonWrapper>
  </Tooltip>
);
