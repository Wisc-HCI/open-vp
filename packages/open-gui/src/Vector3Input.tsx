import React, { SyntheticEvent, forwardRef, memo } from "react";
import styled from "@emotion/styled";
import { strip } from "number-precision";
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Input,
  Stack,
} from "@mui/material";
import { NumberSpinner } from "./NumberSpinner";

const NumberInputField = styled(Input)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface CompoundInputProps {
  onChange: (value: number[]) => void;
  value: number[];
  disabled?: boolean;
  min?: number[];
  max?: number[];
  step?: number;
  className?: string;
  onFocus?: (event: SyntheticEvent) => void;
  onBlur?: (event: SyntheticEvent) => void;
};

const CompoundInput = memo(
  forwardRef(({ 
    onChange = () => {}, 
    value = [0, 0, 0], 
    disabled = false, 
    min = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    max = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    step = 0.1, 
    className = "", 
    onFocus = () => {}, 
    onBlur = () => {},
  } : CompoundInputProps, ref) => {
    return (
      <Stack
        sx={{ padding: 1, marginRight: 4 }}
        direction="row"
        // ref={ref}
        alignItems="center"
        alignContent="center"
      >
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={className}
          value={value[0]}
          style={{ marginLeft: 1, paddingRight: 0 }}
          inputProps={{ step: 0.1 }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => {
            onChange([strip(Number(e.target.value)), value[1], value[2]]);
          }}
          type="number"
          margin="dense"
        />
        <NumberSpinner
          above={value[0] >= max[0]}
          below={value[0] <= min[0]}
          onClickUp={() => {
            onChange([strip(Number(value[0] + step)), value[1], value[2]]);
          }}
          onClickDown={(e) =>
            onChange([strip(Number(value[0] - step)), value[1], value[2]])
          }
        />
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={className}
          value={value[1]}
          style={{ marginLeft: 1, paddingRight: 0 }}
          inputProps={{ step: step, type: "number" }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => {
            onChange([value[0], strip(Number(e.target.value)), value[2]]);
          }}
          type="number"
        />
        <NumberSpinner
          above={value[1] >= max[1]}
          below={value[1] <= min[1]}
          onClickUp={() => {
            onChange([value[0], strip(Number(value[1] + step)), value[2]]);
          }}
          onClickDown={() =>
            onChange([value[0], strip(Number(value[1] - step)), value[2]])
          }
        />
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={className}
          value={value[2]}
          style={{ marginLeft: 1, paddingRight: 0 }}
          inputProps={{ step: step }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => {
            onChange([value[0], value[1], strip(Number(e.target.value))]);
          }}
          type="number"
          margin="dense"
        />
        <NumberSpinner
          above={value[2] >= max[2]}
          below={value[2] <= min[2]}
          onClickUp={() => {
            onChange([value[0], value[1], strip(Number(value[2] + step))]);
          }}
          onClickDown={(e) =>
            onChange([value[0], value[1], strip(Number(value[2] - step))])
          }
        />
      </Stack>
    );
  })
);

interface Vector3InputProps {
  disabled?: boolean;
  label?: string;
  onChange?: (value?: number[]) => void;
  value?: number[];
  min?: number[];
  max?: number[];
  step?: number;
  onBlur?: (event: SyntheticEvent) => void;
  onFocus?: (event: SyntheticEvent) => void;
  endAdornment?: React.ReactNode;
}

export const Vector3Input = memo(
  ({
    disabled = false,
    label = "Vector",
    onChange = (_) => { },
    value = [0, 0, 0],
    min = [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ],
    max = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ],
    step = 0.1,
    onBlur = (_) => { },
    onFocus = (_) => { },
    endAdornment,
  }: Vector3InputProps) => {
    return (
      <FormControl>
        <InputLabel htmlFor="outlined-position-vector" color="primary" shrink>
          {label}
        </InputLabel>
        <OutlinedInput
          notched
          className="nodrag"
          size="small"
          id="outlined-position-vector"
          label={label}
          color="primary"
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
          // inputComponent={CompoundInput}
          inputProps={{ min, max, step }}
          // onChange={onChange}
          endAdornment={
            endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null
          }
        />
      </FormControl>
    );
  }
);
