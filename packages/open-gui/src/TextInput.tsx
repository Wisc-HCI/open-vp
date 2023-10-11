import React, {
  useState,
  ReactNode,
  ChangeEventHandler,
  ReactHTMLElement,
  CSSProperties,
} from "react";
// import { Theme } from "@mui/material";
import { styled, alpha, lighten, darken } from "@mui/material/styles";
// import { TextField as MuiTextField } from "@mui/material";
// export interface TextFieldProps {
//   active?: boolean;
//   editing?: boolean;
// }

// export const TextField = styled(MuiTextField, {
//   shouldForwardProp: (prop: string) => !["active", "editing"].includes(prop),
// })<TextFieldProps>(
//   { color: "white", "& .MuiInputBase-input": { borderRadius: 4 } },
//   ({ active, editing, theme }) => ({
//     "& .MuiInputBase-input": {
//       backgroundColor: active ? alpha(theme.palette.primary.main, 0.5) : "#22222299",
//       userSelect: editing ? null : "none",
//     },
//   })
// );

export interface TextInputProps {
  wrapped?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  value?: number | string | readonly string[];
  label?: string;
  hideLabelPrefix?: boolean;
  suffix?: string;
  extra?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onDoubleClick?: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  disableDrag?: boolean;
  style?: CSSProperties;
}

export interface TextInputWrapperProps {
  wrapped?: boolean;
  disabled?: boolean;
  focused?: boolean;
}

export const TextInputWrapper = styled("label", {
  shouldForwardProp: (prop: string) => !["wrapped"].includes(prop),
})<TextInputWrapperProps>(
  {
    height: 35,
    fontSize: "0.857rem",
    backdropFilter: "blur(10pt)",
    WebkitBackdropFilter: "blur(10pt)",
    display: 'flex',
    flexDirecion: "column",
    flex: 1,
    alignItems: "center",
  },
  ({ theme, wrapped, disabled, focused }) => ({
    background: theme.palette.mode === "light"
      ? alpha(darken(theme.palette.background.paper, 0.4), disabled ? 0.1 : 0.75)
      : alpha(lighten(theme.palette.background.paper, 0.4), disabled ? 0.1 : 0.75),
    border: "none", //disabled ? `1px solid #24292f30` : `1px solid #24292f50`,
    borderRadius: wrapped
      ? theme.shape.borderRadius * 0.66
      : theme.shape.borderRadius,
    color: theme.palette.mode === "light" ? alpha("#eee",disabled?0.5:1) : alpha("#111",disabled?0.5:1),
    boxShadow: focused ? `0 0 0 1px ${theme.palette.primary.main}` : undefined,
    cursor: disabled ? "not-allowed" : "arrow",
    "&:hover": focused
      ? {
        color: theme.palette.mode === "light" ? alpha("#fff",disabled?0.5:1) : alpha("#000",disabled?0.5:1),
        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
        // background:
        //   theme.palette.mode === "dark"
        //     ? alpha(darken(theme.palette.primary.main, 0.7), 0.5)
        //     : alpha(lighten(theme.palette.primary.main, 0.7), 0.5),
        }
      : null,
    // firefox
    "&:focus-visible": {
      userSelect: "none",
      outline: 0,
    },
  })
);

export interface TextInputExtraProps {
  side?: "left" | "right";
  wrapped?: boolean;
}

export const TextInputExtra = styled("span")<TextInputExtraProps>(
  {
    fontSize: "0.857rem",
    lineHeight: 1.5,
    // padding: 5,
    paddingRight: 5,
    paddingLeft: 5,
    height: 35,
    alignItems: "center",
    display: "flex",
  },
  ({ theme, wrapped, side }) => ({
    background: alpha(theme.palette.background.paper,side==='left'?.2:.1),
    borderTopRightRadius:
      side !== "right"
        ? 0
        : wrapped
        ? theme.shape.borderRadius * 0.66
        : theme.shape.borderRadius,
    borderBottomRightRadius:
      side !== "right"
        ? 0
        : wrapped
        ? theme.shape.borderRadius * 0.66
        : theme.shape.borderRadius,
    borderTopLeftRadius:
      side !== "left"
        ? 0
        : wrapped
        ? theme.shape.borderRadius * 0.66
        : theme.shape.borderRadius,
    borderBottomLeftRadius:
      side !== "left"
        ? 0
        : wrapped
        ? theme.shape.borderRadius * 0.66
        : theme.shape.borderRadius,
    color: theme.palette.text.primary,
  })
);

const TextInputField = styled("input")(
  {
    all: "unset",
    width: "100%",
    fontSize: "0.857rem",
    lineHeight: 1.5,
    padding: 12
  },
  ({ theme, disabled }) => ({
    color:  disabled ? theme.palette.text.secondary : theme.palette.text.primary,
    cursor: disabled ? "not-allowed" : "arrow",
    "&:hover": {
      color: disabled ? theme.palette.text.secondary : theme.palette.primary.main,
    },
    "&:focus": {
      // borderColor: theme.palette.primary.main,
      color: disabled ? theme.palette.text.secondary : theme.palette.primary.main,
    },
    // firefox
    "&:focus-visible": {
      userSelect: "none",
      outline: 0,
    },
  })
);

export const TextInput = ({
  disabled,
  readonly,
  hideLabelPrefix = false,
  label,
  wrapped,
  extra,
  suffix,
  style = {},
  disableDrag = false,
  ...props
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInputWrapper
      className={disableDrag ? "nodrag" : undefined}
      onDoubleClick={props.onDoubleClick}
      disabled={disabled}
      focused={focused}
      wrapped={wrapped}
      style={style}
    >
      {!hideLabelPrefix && (
        <TextInputExtra
          side="left"
          hidden={hideLabelPrefix || label === undefined}
          wrapped={wrapped}
        >
          {label}
        </TextInputExtra>
      )}
      <TextInputField
        readOnly={readonly}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={props.value}
        onChange={props.onChange}
      />
      {suffix && (
        <TextInputExtra side={extra ? undefined : "right"} wrapped={wrapped}>
          {suffix}
        </TextInputExtra>
      )}
      {extra && (
        <TextInputExtra side="right" wrapped={wrapped}>
          {extra}
        </TextInputExtra>
      )}
    </TextInputWrapper>
  );
};
