import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { TextInputWrapper, TextInputExtra } from "./TextInput";
import { styled, alpha, lighten, darken } from "@mui/material/styles";

export interface ToggleProps {
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}
export const Toggle = ({
  value = false,
  label,
  onChange = (value: boolean) => {},
  disabled = false,
}: ToggleProps) => (
  <TextInputWrapper disabled={disabled} style={{justifyContent:'space-between', paddingRight: 5}} onDoubleClick={e=>e.stopPropagation()}>
    <TextInputExtra side="left">{label}</TextInputExtra>
    <SwitchRoot checked={value} onCheckedChange={onChange} disabled={disabled}>
      <SwitchThumb />
    </SwitchRoot>
  </TextInputWrapper>
);

const SwitchRoot = styled(Switch.Root)(
  {
    all: 'unset',
    width: 42,
    height: 25,
    borderRadius: 100,
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    "&:focus": {
      boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
    },
  },
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode === "light"
        ? darken(theme.palette.background.paper, 0.1)
        : lighten(theme.palette.background.paper, 0.1),
    "&[data-state='checked']": {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const SwitchThumb = styled(Switch.Thumb)(
  {
    display: "block",
    width: 21,
    height: 21,
    backgroundColor: "white",
    // borderRadius: 100,
    boxShadow: "0 2px 2px var(--black-a7)",
    transition: "transform 100ms",
    transform: "translateX(2px)",
    willChange: "transform",
    "&[data-state='checked']": {
        transform: 'translateX(19px)'
    }
  },
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius * .66,
  })
);
