import React, { SyntheticEvent, memo } from "react";
import { NumberSpinner } from "./NumberSpinner";
import { useNumeric } from "./useNumeric";
import { TextInput } from "./TextInput";

interface NumberInputProps {
  disabled?: boolean,
  readonly?: boolean,
  label?: string,
  onChange?: (value?: number) => void,
  onDoubleClick?: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  step?: number,
  value?: number,
  suffix?: string,
  prefix?: string,
  min?: number,
  max?: number, 
  style?: any
}

export const NumberInput = memo(
  ({
    disabled,
    readonly,
    label,
    onChange = (_) => { },
    onDoubleClick,
    onBlur,
    onFocus,
    step,
    value = 0,
    suffix = "",
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    style = {},
    ...props
  }: NumberInputProps) => {
    const {
      textValue,
      status,
      onChange: onChangeInner,
      onStepUp,
      onStepDown,
    } = useNumeric({
      initial: value,
      stepSize: step,
      min,
      max,
      onValidChange: onChange,
    });

    return (
      <TextInput
        disabled={disabled}
        readonly={readonly}
        value={textValue}
        label={label}
        suffix={suffix}
        onChange={onChangeInner}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
        onFocus={onFocus}
        extra={<NumberSpinner
          disabled={disabled}
          above={value >= max}
          below={value <= min}
          onClickDown={onStepDown}
          onClickUp={onStepUp}
        />}
        style={style}
      />

    );
  }
);
