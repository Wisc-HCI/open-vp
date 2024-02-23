import { MouseEventHandler, ReactNode} from "react";
import { styled, alpha } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import { Tooltip } from "./Tooltip";
import { Icon, IconName } from "./Icon";

export interface IconButtonProps {
  // size?: Size;
  size?: "small" | "medium" | "large" | undefined;
  toggled?: boolean;
  canToggle?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
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
})<IconButtonProps>(({ theme, toggled, size = "medium", canToggle, color = 'primary'}) => ({
  backgroundColor: canToggle && toggled
    ? alpha(theme.palette[color].main, 0.4)
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
      ? alpha(theme.palette[color].main, 0.5)
      : canToggle && !toggled
        ? alpha(theme.palette[color].main, 0.25)
        : "rgba(0,0,0,0.7)",
    color: theme.palette[color].main,
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
  startIcon?: IconName | (() => IconName);
  endIcon?: IconName | (() => IconName);
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  toggled?: boolean;
  canToggle?: boolean;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  children?: string | ReactNode;
}

export const IconTextButton = ({
  title = "Button",
  startIcon,
  endIcon,
  onClick = () => { },
  disabled = false,
  placement = "top",
  toggled = false,
  canToggle = false,
  children = null,
  size = "medium",
  color = "primary",
  ...props
}: IconTextButtonProps) => {
  const startIconStr = typeof startIcon === "string" ? startIcon : typeof startIcon === "function" ? startIcon() : undefined as IconName | undefined;
  const endIconStr = typeof endIcon === "string" ? endIcon : typeof endIcon === "function" ? endIcon() : undefined as IconName | undefined;

  return (
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
        startIcon={startIconStr && <Icon name={startIconStr} size={size==='large' ? 36 : size ==='medium' ? 22 : 16}/>}
        endIcon={endIconStr && <Icon name={endIconStr} size={size==='large' ? 36 : size ==='medium' ? 22 : 16}/>}
        disabled={disabled}
        aria-label={title}
        onClick={onClick}
        toggled={toggled}
        canToggle={canToggle}
        size={size}
        color={color}
        {...props}
      >
        {children}
      </InnerIconTextButton>
    </ToolbarButtonWrapper>
  </Tooltip>
)};
