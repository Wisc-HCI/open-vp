import React, { MouseEventHandler, ReactNode} from "react";
import { styled, alpha } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import { Tooltip } from "./Tooltip";

export interface IconButtonProps {
  // size?: Size;
  size?: "small" | "medium" | "large" | undefined;
  toggled?: boolean;
  canToggle?: boolean;
}

const sizeMap = {
  small: 24,
  medium: 32,
  large: 48
}

const fontSizeMap = {
  small: "1rem",
  medium: "1.4rem",
  large: "2rem"
}

const InnerIconTextButton = styled(MuiButton, {
  shouldForwardProp: (prop: string) =>
    !['canToggle', 'toggled'].includes(prop)
})<IconButtonProps>(({ theme, toggled, size = "medium", canToggle }) => ({
  backgroundColor: canToggle && toggled
    ? alpha(theme.palette.primary.main, 0.4)
    : canToggle && !toggled
      ? "transparent"
      : "rgba(100,100,100,0.5)",
  color: theme.palette.text.primary,
  fontSize: size ? fontSizeMap[size] : "1.4rem",
  "&.Mui-disabled": {
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "#ccc",
  },
  flex: 1,
  borderRadius: theme.shape.borderRadius * 0.66,
  height: size ? sizeMap[size] : 24,
  minWidth: size ? sizeMap[size] : 24,
  textTransform: "none",
  // flex: 1,
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
}));

export const ToolbarButtonWrapper = styled("span")(({ }) => ({
  display: "flex",
  flex:1
}));

export interface IconTextButtonProps {
  title?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  toggled?: boolean;
  canToggle?: boolean;
  size?: "small" | "medium" | "large";
  children?: ReactNode
}

export const IconTextButton = ({
  title = "Button",
  startIcon = null,
  endIcon = null,
  onClick = () => { },
  disabled = false,
  placement = "top",
  toggled = false,
  canToggle = false,
  children = null,
  size = "medium",
  ...props
}: IconTextButtonProps) => (
  <Tooltip
    // className="no-outline"
    title={title}
    // color="primary"
    placement={placement}
    // arrow
  >
    <ToolbarButtonWrapper className="no-outline">
      <InnerIconTextButton
        className="no-outline"
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        aria-label={title}
        onClick={onClick}
        toggled={toggled}
        canToggle={canToggle}
        size={size}
        {...props}
      >
        {children}
      </InnerIconTextButton>
    </ToolbarButtonWrapper>
  </Tooltip>
);
