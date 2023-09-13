import React, { SyntheticEvent, memo } from "react";
import styled from "@emotion/styled";
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { NumberSpinner } from "./NumberSpinner";
import { useNumeric, PASSABLE_NUMERIC_STATUSES } from "./useNumeric";

const OutlinedNumberInput = styled(OutlinedInput)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

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
  max?: number
}

export const NumberInput = memo(
  ({
    disabled,
    label,
    onChange = (_) => {},
    step,
    value = 0,
    onBlur = (_) => {},
    onFocus = (_) => {},
    onMouseEnter = (_) => {},
    onMouseLeave = (_) => {},
    suffix = "",
    prefix = "",
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
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
      <FormControl
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="nodrag"
      >
        <InputLabel
          className="nodrag"
          htmlFor="outlined-position-vector"
          color="primary"
          shrink
        >
          {label}
        </InputLabel>
        <OutlinedNumberInput
          notched
          className="nodrag"
          size="small"
          id="outlined-position-vector"
          label={label}
          color={
            PASSABLE_NUMERIC_STATUSES.includes(status) ? "primary" : "error"
          }
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={textValue}
          onChange={onChangeInner}
          style={{ paddingRight: 4 }}
          inputProps={{ min, max, className: "nodrag" }}
          startAdornment={
            <InputAdornment position="start">{prefix}</InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {suffix}
              <NumberSpinner
                disabled={disabled}
                above={value >= max}
                below={value <= min}
                onClickDown={onStepDown}
                onClickUp={onStepUp}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
);
