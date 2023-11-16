import { SyntheticEvent } from "react";
import styled from "@emotion/styled";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const SpinnerButton = styled.button(
  {
    all: "unset",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "0px",
    paddingTop: "2px",
    paddingRight: "0px",
    paddingBottom: "2px",
    margin: "0px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    lineHeight: 1,
    height: "10px",
    background: "#22222299",
    "&:focus": {
      background: "#222222",
      color: "#bbb"
    },
    "&:hover": {
      background: "#222222",
      color: "#bbb"
    },
  },
  ({disabled}) => ({ opacity: disabled ? 0.5 : 1 })
);

export interface NumberSpinnerProps {
  onClickUp: (event: SyntheticEvent) => void;
  onClickDown: (event: SyntheticEvent) => void;
  disabled?: boolean;
  above?: boolean;
  below?: boolean;
  style?: any
}

export const NumberSpinner = ({
  onClickUp = (_) => {},
  onClickDown = (_) => {},
  disabled = false,
  above = false,
  below = false,
  style = {}
}: NumberSpinnerProps) => {
  return (
    <div
      style={{
        marginLeft: 3,
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
      role='button'
    >
      <SpinnerButton
        disabled={disabled || above}
        onClick={onClickUp}
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <ChevronUpIcon />
      </SpinnerButton>
      <SpinnerButton
        disabled={disabled || below}
        onClick={onClickDown}
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <ChevronDownIcon />
      </SpinnerButton>
    </div>
  );
};
