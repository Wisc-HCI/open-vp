import React, { SyntheticEvent, memo } from "react";
import { NumberSpinner } from "./NumberSpinner";
import { useNumeric } from "./useNumeric";
import { TextInput } from "./TextInput";

interface NumberInputProps {
  disabled?: boolean,
  label?: string,
  onChange?: (value?: number) => void,
  step?: number,
  value?: number,
  onBlur?: (event: SyntheticEvent) => void,
  onFocus?: (event: SyntheticEvent) => void,
  onMouseEnter?: (event: SyntheticEvent) => void,
  onMouseLeave?: (event: SyntheticEvent) => void,
  suffix?: string,
  prefix?: string,
  min?: number,
  max?: number, 
  style?: any
}

export const NumberInput = memo(
  ({
    disabled,
    label,
    onChange = (_) => { },
    step,
    value = 0,
    onBlur = (_) => { },
    onFocus = (_) => { },
    onMouseEnter = (_) => { },
    onMouseLeave = (_) => { },
    suffix = "",
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    style = {}
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
        value={textValue}
        label={label}
        suffix={suffix}
        onChange={onChangeInner}
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
