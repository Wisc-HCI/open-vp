import { useState } from "react";
import { isNumber, isNaN } from "lodash";
import { strip } from "number-precision";

const VALID_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "-",
];

export const NUMERIC_STATUS = {
  BELOW: "BELOW",
  LOWER_BOUND: "LOWER",
  WITHIN: "WITHIN",
  UPPER_BOUND: "UPPER",
  ABOVE: "ABOVE",
  INVALID: "INVALID",
};

export const PASSABLE_NUMERIC_STATUSES = [
  NUMERIC_STATUS.LOWER_BOUND,
  NUMERIC_STATUS.WITHIN,
  NUMERIC_STATUS.UPPER_BOUND,
];

interface useNumericOptions {
  initial?: number;
  stepSize?: number;
  min?: number;
  max?: number;
  onValidChange?: (value: number) => void;
}

interface NumericState {
  numeric: number;
  status: string;
  textValue: string;
}

export const useNumeric = ({
  initial = 0,
  stepSize = 1,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onValidChange = (value: number) => {},
}: useNumericOptions) => {
  const getStatus = (v: number) => {
    if (v < max && v > min) {
      return NUMERIC_STATUS.WITHIN;
    } else if (v > max) {
      return NUMERIC_STATUS.ABOVE;
    } else if (v === max) {
      return NUMERIC_STATUS.UPPER_BOUND;
    } else if (v === min) {
      return NUMERIC_STATUS.LOWER_BOUND;
    } else if (v < min) {
      return NUMERIC_STATUS.BELOW;
    } else {
      return NUMERIC_STATUS.INVALID;
    }
  };

  const parse = (v: any) => {
    if (typeof v === "number") {
      return { numeric: v, status: getStatus(v), textValue: v.toString() };
    } else if (typeof v === "string") {
      const parsed = Number(v);
      if (v === "-") {
        return { numeric: 0, status: getStatus(0), textValue: v };
      }
      if (isNumber(parsed) && !isNaN(parsed)) {
        return { numeric: parsed, status: getStatus(parsed), textValue: v };
      }
    }
    console.warn("failed with ", v, typeof v);
    return { numeric: 0, status: NUMERIC_STATUS.INVALID, textValue: v };
    
  };

  const [state, setState] = useState<NumericState>(parse(initial));

  const onChange = (event: any) => {
    if (event?.nativeEvent?.data) {
      if (!VALID_CHARS.includes(event.nativeEvent.data)) {
        setState((prev) => ({
          numeric: prev.numeric,
          status: prev.status,
          textValue: prev.textValue,
        }));
        return;
      }
    }
    if (event.target?.value === "-") {
      console.log("dash input");
      setState({
        numeric: 0,
        status: getStatus(0),
        textValue: event.target.value,
      });
      return;
    }

    if (event.target.value === "") {
      console.log("empty input");
      setState({
        numeric: 0,
        status: getStatus(0),
        textValue: event.target.value,
      });
      return;
    }

    const newState = parse(event.target.value);
    if (!newState) {
      setState((prev) => ({
        numeric: prev.numeric,
        status: NUMERIC_STATUS.INVALID,
        textValue: event.target.value,
      }));
      return;
    } else if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      setState(newState);
      onValidChange(newState.numeric);
      return;
    } else if (newState.status === NUMERIC_STATUS.BELOW) {
      setState(newState);
      onValidChange(min);
      return;
    } else if (newState.status === NUMERIC_STATUS.ABOVE) {
      setState(newState);
      onValidChange(max);
      return;
    }
    console.log("not handled", event.target.value);
  };

  const onStepUp = () => {
    const newState = parse(strip(state.numeric + stepSize));
    setState(newState);
    if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      onValidChange(newState.numeric);
    }
  };

  const onStepDown = () => {
    const newState = parse(strip(state.numeric - stepSize));
    setState(newState);
    if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      onValidChange(newState.numeric);
    }
  };

  return {
    textValue: state.textValue,
    status: state.status,
    onChange,
    onStepUp,
    onStepDown,
  };
};
