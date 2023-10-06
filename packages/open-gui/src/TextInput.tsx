import React, { useState, ReactNode, ChangeEventHandler, ReactHTMLElement } from "react";
// import { Theme } from "@mui/material";
import { styled, alpha, lighten, darken } from '@mui/material/styles';
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
  wrapped?: boolean,
  disabled?: boolean,
  value?: number | string | readonly string[],
  label?: string,
  hideLabelPrefix?: boolean,
  suffix?: string,
  extra?: ReactNode,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  style?: any
}

export interface TextInputWrapperProps {
  wrapped?: boolean,
  disabled?: boolean,
  focused?: boolean
}

const TextInputWrapper = styled('label', {
  shouldForwardProp: (prop: string) => !["wrapped"].includes(prop),
})<TextInputWrapperProps>(
  {
    height: 35,
    fontSize: '0.857rem',
    backdropFilter: 'blur(10pt)',
    WebkitBackdropFilter: 'blur(10pt)',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  ({ theme, wrapped, disabled, focused }) => ({
    background: disabled ? '#24292f30' : !focused ? '#24292f50' : theme.palette.mode === "dark" ? alpha(darken(theme.palette.primary.main, 0.7), 0.5) : alpha(lighten(theme.palette.primary.main, 0.7), 0.5),
    border: "none",//disabled ? `1px solid #24292f30` : `1px solid #24292f50`,
    borderRadius: wrapped ? theme.shape.borderRadius * 0.66 : theme.shape.borderRadius,
    color: '#24292f',
    cursor: disabled ? "not-allowed" : "arrow",
    '&:hover': focused ? {
      color: theme.palette.primary.main,
      background: theme.palette.mode === "dark" ? alpha(darken(theme.palette.primary.main, 0.7), 0.5) : alpha(lighten(theme.palette.primary.main, 0.7), 0.5),

    } : {
      background: disabled ? '#24292f30' : alpha(theme.palette.primary.main, 0.3),
      color: disabled ? '#24292f' : theme.palette.primary.main,
    },
    // '&:focus': {
    //   // borderColor: theme.palette.primary.main,
    //   color: theme.palette.primary.main,
    //   background: theme.palette.mode === "dark" ? alpha(darken(theme.palette.primary.main, 0.7),0.5) : alpha(lighten(theme.palette.primary.main, 0.7),0.5),
    // },
    // firefox
    '&:focus-visible': {
      userSelect: 'none',
      outline: 0,
    },
  })
);


export interface TextInputExtraProps {
  side?: 'left' | 'right',
  wrapped?: boolean
}

const TextInputExtra = styled("span")<TextInputExtraProps>({
  fontSize: '0.857rem',
  lineHeight: 1.5,
  // padding: 5,
  paddingRight: 5,
  paddingLeft: 5,
  height: 35,
  alignItems: 'center',
  display:'flex'
}, ({ theme, wrapped, side }) => ({
  background: side === 'left' ? '#24292f30' : '#24292f10',
  borderTopRightRadius: side !== 'right' ? 0 : wrapped ? theme.shape.borderRadius * 0.66 : theme.shape.borderRadius,
  borderBottomRightRadius: side !== 'right' ? 0 : wrapped ? theme.shape.borderRadius * 0.66 : theme.shape.borderRadius,
  borderTopLeftRadius: side !== 'left' ? 0 : wrapped ? theme.shape.borderRadius * 0.66 : theme.shape.borderRadius,
  borderBottomLeftRadius: side !== 'left' ? 0 : wrapped ? theme.shape.borderRadius * 0.66 : theme.shape.borderRadius,
  color: theme.palette.text.primary
}))

const TextInputField = styled("input")({
  all: 'unset',
  fontSize: '0.857rem',
  lineHeight: 1.5,
  padding: 12,
  flex: 1,
},
  ({ theme, disabled }) => ({
    flex: 1,
    color: '#24292f',
    cursor: disabled ? "not-allowed" : "arrow",
    '&:hover': {
      color: disabled ? '#24292f' : theme.palette.primary.main,
    },
    '&:focus': {
      // borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    // firefox
    '&:focus-visible': {
      userSelect: 'none',
      outline: 0,
    },
  }))

export const TextInput = ({ disabled, hideLabelPrefix, label, wrapped, extra, suffix, style = {}, ...props }: TextInputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInputWrapper className="nodrag" disabled={disabled} focused={focused} wrapped={wrapped} style={style}>
      <TextInputExtra side='left' hidden={hideLabelPrefix || label === undefined} wrapped={wrapped}>{label}</TextInputExtra>
      <TextInputField maxLength={15}
        disabled={disabled} {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      {suffix && <TextInputExtra side={extra ? undefined : 'right'} wrapped={wrapped}>{suffix}</TextInputExtra>}
      {extra && <TextInputExtra side='right' wrapped={wrapped}>{extra}</TextInputExtra>}
    </TextInputWrapper>
  )
}