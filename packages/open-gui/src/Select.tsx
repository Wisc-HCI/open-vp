import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "@radix-ui/react-icons";
import { styled, alpha, lighten, darken } from "@mui/material/styles";
import {
  CONTENT_STYLES,
  ITEM_STYLES,
  ITEM_THEMED_STYLES,
} from "./NestedDropdown";
import { TextInputExtra } from "./TextInput";

export interface SelectProps {
  options: { value: string; label: string }[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
  wrapped?: boolean;
  disabled?: boolean;
}
export const Select = ({
  options = [],
  label,
  value,
  onChange,
  wrapped = false,
  disabled = false,
}: SelectProps) => (
  <RadixSelect.Root>
    <SelectTrigger aria-label={label} wrapped={wrapped} disabled={disabled}>
      {label ? <TextInputExtra side='left'>{label}</TextInputExtra> : <span>{" "}</span>}
      <SelectValue placeholder={options.filter((v)=>(v.value===value))[0]?.label || "Unset"} />
      <SelectIcon>
        <ChevronDownIcon />
      </SelectIcon>
    </SelectTrigger>
    <RadixSelect.Portal>
      <SelectContent position="popper">
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          <RadixSelect.Group>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((option: { value: string; label: string }) => (
              <SelectItem
                key={option.value}
                value={option.value}
                onClick={() => {
                  onChange(option.value);
                }}
                disabled={disabled}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <SelectItemIndicator>
                  <CheckIcon />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </RadixSelect.Group>
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);

const SelectContent = styled(RadixSelect.Content)(
  CONTENT_STYLES,
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
  })
);

const SelectValue = styled(RadixSelect.Value)({
    flex: 1
})

const SelectItemIndicator = styled(RadixSelect.ItemIndicator)({
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 12
});

const SelectViewport = styled(RadixSelect.Viewport)({ padding: 5 });

const SelectItem = styled(RadixSelect.Item)({
    ...ITEM_STYLES,
    display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',
}, ITEM_THEMED_STYLES);

const SelectLabel = styled(RadixSelect.Label)(
  {
    paddingLeft: 25,
    fontSize: 12,
    lineHeight: 2.5,
  },
  ({ theme }) => ({
    color: alpha(theme.palette.primary.main, 0.8),
  })
);

const SelectIcon = styled(RadixSelect.Icon)({
    fontSize: 20,
    height: 35,
    padding: 8
}, ({ theme }) => ({
    background: alpha(theme.palette.background.paper,.1),
}))

const SelectScrollDownButton = styled(RadixSelect.ScrollDownButton)(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    cursor: "default",
  },
  ({ theme }) => ({
    color: alpha(theme.palette.primary.main, 0.8),
  })
);

const SelectScrollUpButton = styled(RadixSelect.ScrollUpButton)(
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 25,
      cursor: "default",
    },
    ({ theme }) => ({
      color: alpha(theme.palette.primary.main, 0.8),
    })
  );

const SelectTrigger = styled(RadixSelect.Trigger, {
  shouldForwardProp: (prop: string) => !["wrapped"].includes(prop),
})<{ wrapped?: boolean; disabled?: boolean }>(
  {
    height: 35,
    fontSize: "0.857rem",
    backdropFilter: "blur(10pt)",
    WebkitBackdropFilter: "blur(10pt)",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    gap: "5px"
  },
  ({ theme, wrapped, disabled }) => ({
    background:
      theme.palette.mode === "light"
        ? alpha(
            darken(theme.palette.background.paper, 0.4),
            disabled ? 0.5 : 0.75
          )
        : alpha(
            lighten(theme.palette.background.paper, 0.4),
            disabled ? 0.5 : 0.75
          ),
    border: "none", //disabled ? `1px solid #24292f30` : `1px solid #24292f50`,
    borderRadius: wrapped
      ? theme.shape.borderRadius * 0.66
      : theme.shape.borderRadius,
    color: disabled ? theme.palette.text.secondary : theme.palette.text.primary,
    cursor: disabled ? "not-allowed" : "arrow",
    "&:hover": {
      color:
        theme.palette.mode === "light"
          ? alpha("#fff", disabled ? 0.5 : 0.8)
          : alpha("#000", disabled ? 0.5 : 0.8),
    },
    "&:focus": {
      color:
        theme.palette.mode === "light"
          ? alpha("#fff", disabled ? 0.5 : 1)
          : alpha("#000", disabled ? 0.5 : 1),
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
    // firefox
    "&:focus-visible": {
      userSelect: "none",
      outline: 0,
    },
  })
);
