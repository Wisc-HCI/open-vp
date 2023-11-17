import { MouseEventHandler } from "react";
import { styled, alpha } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import { Tooltip } from "./Tooltip";
import { Icon, IconName } from "./Icon";

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

export const IconButton = styled(MuiButton, {
  shouldForwardProp: (prop: string) =>
    !['canToggle', 'toggled'].includes(prop)
})<IconButtonProps>(({ theme, toggled, size = "medium", canToggle }) => ({
  backgroundColor: canToggle && toggled
      ? alpha(theme.palette.primary.main, 0.6)
      : canToggle && !toggled
        ? 'transparent'
        : "rgba(100,100,100,0.5)",
    color: canToggle && toggled
      ? alpha(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
      : theme.palette.text.primary,
  fontSize: size ? fontSizeMap[size] : "1.4rem",
  "&.Mui-disabled": {
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "#ccc",
  },
  borderRadius: theme.shape.borderRadius * 0.66,
  height: size ? sizeMap[size] : 24,
  minWidth: size ? sizeMap[size] : 24,
  // flex: 1,
  "&:hover": {
    backgroundColor: canToggle && toggled
      ? alpha(theme.palette.primary.main, 0.8)
      : canToggle && !toggled
        ? alpha(theme.palette.primary.main, 0.25)
        : "rgba(0,0,0,0.7)",
    color: canToggle && toggled
      ? alpha(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
      : theme.palette.primary.main,
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  toggled?: boolean;
  canToggle?: boolean;
  size?: "small" | "medium" | "large";
  icon: IconName | (() => IconName);
}

export const ActionIconButton = ({
  title = "Button",
  onClick = () => { },
  disabled = false,
  placement = "top",
  toggled = false,
  canToggle = false,
  icon = "ValueIcon",
  size = "medium",
  ...props
}: ActionIconButtonProps) => (
  <Tooltip
    // className="no-outline"
    title={title}
    // color="primary"
    placement={placement}
    // arrow
  >
    <ToolbarButtonWrapper className="no-outline">
      <IconButton
        className="no-outline"
        disabled={disabled}
        aria-label={title}
        onClick={onClick}
        toggled={toggled}
        canToggle={canToggle}
        size={size}
        {...props}
      >
        <Icon name={icon as IconName} size={size==='large' ? 36 : size ==='medium' ? 22 : 16}/>
      </IconButton>
    </ToolbarButtonWrapper>
  </Tooltip>
);