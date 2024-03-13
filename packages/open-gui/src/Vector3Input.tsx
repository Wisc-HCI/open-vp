import { SyntheticEvent } from "react";
import { NumberInput } from "./NumberInput";

export interface Vector3InputProps {
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

export const Vector3Input = ({
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
  onFocus = (_) => { }
}: Vector3InputProps) => {
  return (<div>
    <NumberInput label="X" value={value[0]} step={step} min={min[0]} max={max[0]} onChange={v => {
        if (v) {
          let newValue: number[] = [...value];
          newValue[0] = v;
          return newValue;
        }
      }} style={{marginBottom:2}}/>
      <NumberInput label="Y" value={value[1]} min={min[1]} max={max[1]} onChange={v => {
        if (v) {
          let newValue: number[] = [...value];
          newValue[1] = v;
          return newValue;
        }
      }} style={{marginBottom:2}}/>
      <NumberInput label="Z" value={value[2]} min={min[2]} max={max[2]} onChange={v => {
        if (v) {
          let newValue: number[] = [...value];
          newValue[2] = v;
          return newValue;
        }
      }} />
  </div>)
}