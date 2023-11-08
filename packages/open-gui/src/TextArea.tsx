import React, {
  useState,
  ReactNode,
  ChangeEventHandler,
  ReactHTMLElement,
  CSSProperties,
} from "react";
// import { Theme } from "@mui/material";
import { styled, alpha, lighten, darken } from "@mui/material/styles";
import TextareaAutosize from "react-textarea-autosize";
import { TextInputWrapper, TextInputExtra } from "./TextInput";
import { Stack } from "@mui/material";

export interface TextAreaProps {
  wrapped?: boolean;
  disabled?: boolean;
  defaultValue?: number | string | readonly string[];
  readonly?: boolean;
  value?: number | string | readonly string[];
  label?: string;
  hideLabelPrefix?: boolean;
  suffix?: string;
  extra?: ReactNode;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onDoubleClick?: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disableDrag?: boolean;
  style?: CSSProperties;
  minRows?: number;
}

export interface TextAreaWrapperProps {
  wrapped?: boolean;
  disabled?: boolean;
  focused?: boolean;
}

export const TextAreaWrapper = styled("label", {
  shouldForwardProp: (prop: string) => !["wrapped", "focused"].includes(prop),
})<TextAreaWrapperProps>(
  {
    fontSize: "0.857rem",
    backdropFilter: "blur(10pt)",
    WebkitBackdropFilter: "blur(10pt)",
    display: "flex",
    flex: 1,
    alignItems: "center",
    minHeight: 35,
  },
  ({ theme, wrapped, disabled, focused }) => ({
    background:
      theme.palette.mode === "light"
        ? alpha(
            darken(theme.palette.background.paper, 0.4),
            disabled ? 0.1 : 0.75
          )
        : alpha(
            lighten(theme.palette.background.paper, 0.4),
            disabled ? 0.1 : 0.75
          ),
    border: "none", //disabled ? `1px solid #24292f30` : `1px solid #24292f50`,
    borderRadius: wrapped
      ? theme.shape.borderRadius * 0.66
      : theme.shape.borderRadius,
    color:
      theme.palette.mode === "light"
        ? alpha("#eee", disabled ? 0.5 : 1)
        : alpha("#111", disabled ? 0.5 : 1),
    boxShadow: focused ? `0 0 0 1px ${theme.palette.primary.main}` : undefined,
    cursor: disabled ? "not-allowed" : "arrow",
    "&:hover": focused
      ? {
          color:
            theme.palette.mode === "light"
              ? alpha("#fff", disabled ? 0.5 : 1)
              : alpha("#000", disabled ? 0.5 : 1),
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

export interface TextAreaExtraProps {
  side?: "left" | "right";
  wrapped?: boolean;
}

export const TextAreaExtra = styled("span")<TextAreaExtraProps>(
  {
    fontSize: "0.857rem",
    lineHeight: 1.5,
    // padding: 5,
    paddingRight: 5,
    paddingLeft: 5,
    alignItems: "center",
    display: "flex",
    whiteSpace: "nowrap",
    minHeight: 35,
    height: "100%",
  },
  ({ theme, wrapped, side }) => ({
    background: alpha(
      theme.palette.background.paper,
      side === "left" ? 0.2 : 0.1
    ),
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

const StyledTextArea = styled(TextareaAutosize)(
  {
    all: "unset",
    flex: 1,
    padding: 5,
    minHeight: 35,
  },
  ({ theme }) => ({
    color: theme.palette.text.primary,
    textHighlight: theme.palette.primary.main,
  })
);

const FlexStack = styled(Stack)({flex:1})

export const TextArea = ({
  disabled,
  defaultValue,
  readonly,
  hideLabelPrefix = false,
  label,
  wrapped,
  extra,
  suffix,
  style = {},
  disableDrag = false,
  onBlur,
  onFocus,
  minRows = 3,
  ...props
}: TextAreaProps) => {
  const [focused, setFocused] = useState(false);
  const hidePrefix = hideLabelPrefix || label === undefined || label === "";
  return (
    <FlexStack direction="row">
      <TextAreaWrapper
        className={disableDrag ? "nodrag nopan" : undefined}
        onDoubleClick={props.onDoubleClick}
        disabled={disabled}
        focused={focused}
        wrapped={wrapped}
        style={style}
      >
        {!hidePrefix && (
          <TextAreaExtra side="left" wrapped={wrapped}>
            {label}
          </TextAreaExtra>
        )}
        <StyledTextArea
          cacheMeasurements
          minRows={minRows}
          readOnly={readonly}
          defaultValue={defaultValue}
          disabled={disabled}
          onFocus={(e) => {
            setFocused(true);
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) {
              onBlur(e);
            }
          }}
          value={props.value}
          onChange={props.onChange}
        />
        {suffix && (
          <TextAreaExtra side={extra ? undefined : "right"} wrapped={wrapped}>
            {suffix}
          </TextAreaExtra>
        )}
        {extra && (
          <TextAreaExtra side="right" wrapped={wrapped}>
            {extra}
          </TextAreaExtra>
        )}
      </TextAreaWrapper>
    </FlexStack>
  );
};
