import React, { SyntheticEvent } from 'react';
import { TooltipProps } from '@mui/material';

interface NumberInputProps {
    disabled?: boolean;
    label?: string;
    onChange?: (value?: number) => void;
    step?: number;
    value?: number;
    onBlur?: (event: SyntheticEvent) => void;
    onFocus?: (event: SyntheticEvent) => void;
    onMouseEnter?: (event: SyntheticEvent) => void;
    onMouseLeave?: (event: SyntheticEvent) => void;
    suffix?: string;
    prefix?: string;
    min?: number;
    max?: number;
}
declare const NumberInput: React.MemoExoticComponent<({ disabled, label, onChange, step, value, onBlur, onFocus, onMouseEnter, onMouseLeave, suffix, prefix, min, max, }: NumberInputProps) => JSX.Element>;

interface NumberSpinnerProps {
    onClickUp: (event: SyntheticEvent) => void;
    onClickDown: (event: SyntheticEvent) => void;
    disabled?: boolean;
    above?: boolean;
    below?: boolean;
}
declare const NumberSpinner: ({ onClickUp, onClickDown, disabled, above, below, }: NumberSpinnerProps) => JSX.Element;

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
declare const Vector3Input: React.MemoExoticComponent<({ disabled, label, onChange, value, min, max, step, onBlur, onFocus, endAdornment, }: Vector3InputProps) => JSX.Element>;

interface ActionIconButtonProps {
    title?: string;
    onClick?: () => void;
    disabled?: boolean;
    placement?: TooltipProps["placement"];
    toggled?: boolean;
    canToggle?: boolean;
    children?: React.ReactNode;
    flex?: boolean;
}
declare const ActionIconButton: ({ title, onClick, disabled, placement, toggled, canToggle, children, ...props }: ActionIconButtonProps) => JSX.Element;

interface useNumericOptions {
    initial?: number;
    stepSize?: number;
    min?: number;
    max?: number;
    onValidChange?: (value: number) => void;
}
declare const useNumeric: ({ initial, stepSize, min, max, onValidChange, }: useNumericOptions) => {
    textValue: string;
    status: string;
    onChange: (event: any) => void;
    onStepUp: () => void;
    onStepDown: () => void;
};

export { ActionIconButton, NumberInput, NumberSpinner, Vector3Input, useNumeric };
