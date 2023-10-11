import React, { ReactNode, isValidElement } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  FiMenu,
  FiChevronRight,
  FiCheck,
  FiMoreHorizontal,
} from "react-icons/fi";
import { IconButton } from "./ActionIconButton";
import { styled, alpha, Theme } from "@mui/material";

export interface DropdownEntry<T> {
  left?: ReactNode | ((data: T) => ReactNode);
  right?: ReactNode | ((data: T) => ReactNode);
  label: string | ((data: T) => string);
  onClick?: (data: T, event: MouseEvent) => void;
  inner?: DropdownData<T>[];
  type: "ENTRY";
  disabled?: boolean;
  preventCloseOnClick?: boolean;
}

export interface DropdownDivider {
  type: "DIVIDER";
}

export interface DropdownHeader<T> {
  type: "HEADER";
  label: string | ((data: T) => string);
}

export type DropdownData<T> =
  | DropdownEntry<T>
  | DropdownDivider
  | DropdownHeader<T>;

export interface NestedDropdownProps<T> {
  data: T;
  label?: string | ((data: T) => string);
  icon?: ReactNode | ((data: T) => ReactNode);
  size?: "small" | "medium" | "large";
  onClick?: (data: T, event: MouseEvent) => void;
  inner: DropdownData<T>[];
}

export const CONTENT_STYLES = {
  minWidth: "220px",
  backgroundColor: "#000000a0",
  padding: "5px",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  backdropfilter: "blur(8pt)",
  WebkitBackdropFilter: "blur(8pt)",
};

export const ORIGIN_STYLES = {
  fontSize: "0.8em",
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  // height: "25pt",
  // padding: "0 5pt",
  // position: "relative",
  // paddingLeft: "25pt",
  // userSelect: "none",
  outline: "none",
  "&[data-disabled]": {
    pointerEvents: "none",
  },
}

export const ITEM_STYLES = {
  ...ORIGIN_STYLES,
  height: "25pt",
  padding: "0 5pt",
};

export const ITEM_THEMED_STYLES = ({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius * 0.66,
  "&[data-highlighted]": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  "&[data-disabled]": {
    color: alpha(theme.palette.primary.main, 0.5),
  },
});

export const TRIGGER_THEMED_STYLES = ({ theme }: { theme: Theme }) => ({
  ...ITEM_THEMED_STYLES({ theme }),
  '&[data-state="open"]': {
    backgroundColor: alpha(theme.palette.primary.main, 0.7),
    color: theme.palette.background.paper,
  },
});

const DropdownMenuTrigger = styled(DropdownMenu.Trigger)(
  ORIGIN_STYLES,
  TRIGGER_THEMED_STYLES,
);
const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger)(
  ITEM_STYLES,
  TRIGGER_THEMED_STYLES,
);
const DropdownMenuContent = styled(DropdownMenu.Content)(
  CONTENT_STYLES,
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
  }),
);

const DropdownMenuSubContent = styled(DropdownMenu.SubContent)(
  CONTENT_STYLES,
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
  }),
);

const DropdownMenuItem = styled(DropdownMenu.Item)(
  ITEM_STYLES,
  ITEM_THEMED_STYLES,
);

const DropdownMenuSeparator = styled(DropdownMenu.Separator)(
  {
    height: 1,
    margin: 5,
  },
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }),
);

const DropdownMenuLabel = styled(DropdownMenu.Label)(
  {
    paddingLeft: 25,
    fontSize: 12,
    lineHeight: 2.5,
  },
  ({ theme }) => ({
    color: alpha(theme.palette.primary.main, 0.8),
  }),
);

const DropdownMenuArrow = styled(DropdownMenu.Arrow)({}, ({ theme }) => ({
  fill: alpha(theme.palette.background.paper, 0.7),
}));

export const RightSlot = styled("div")(
  {
    marginLeft: "auto",
    paddingLeft: "20pt",
  },
  ({ theme }) => ({
    color: theme.palette.primary.main,
    "[data-highlighted] > &": {
      color: theme.palette.background.paper,
    },
    '[data-state="open"] > &': {
      color: theme.palette.background.paper,
    },
    "&[data-disabled]": {
      color: alpha(theme.palette.primary.main, 0.5),
    },
  }),
);

export const LeftSlot = styled("div")(
  {
    // marginRight: "auto",
    paddingRight: "7pt",
  },
  ({ theme }) => ({
    color: theme.palette.primary.main,
    "[data-highlighted] > &": {
      color: theme.palette.background.paper,
    },
    '[data-state="open"] > &': {
      color: theme.palette.background.paper,
    },
    "&[data-disabled]": {
      color: alpha(theme.palette.primary.main, 0.5),
    },
  }),
);

function InnerDropdown<T>({
  data,
  inner,
}: {
  data: T;
  inner: DropdownData<T>;
}) {
  if (inner.type === "DIVIDER") {
    return <DropdownMenuSeparator />;
  } else if (inner.type === "HEADER") {
    return (
      <DropdownMenuLabel>
        {typeof inner.label == "function"
          ? inner.label(data)
          : inner.label
          ? inner.label
          : "Header"}
      </DropdownMenuLabel>
    );
  } else if (inner.inner) {
    return (
      <DropdownMenu.Sub>
        <DropdownMenuSubTrigger>
          {typeof inner.label == "function"
            ? inner.label(data)
            : inner.label
            ? inner.label
            : "Menu Item"}
          <RightSlot>
            {isValidElement(inner.right) ? (
              (inner.right as ReactNode)
            ) : typeof inner.right == "function" ? (
              inner.right(data)
            ) : (
              <FiChevronRight />
            )}
          </RightSlot>
        </DropdownMenuSubTrigger>
        <DropdownMenu.Portal>
          <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
            {inner.inner.map((innerData: DropdownData<T>, i: number) => (
              <InnerDropdown key={i} data={data} inner={innerData} />
            ))}
          </DropdownMenuSubContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Sub>
    );
  } else {
    return (
      <DropdownMenuItem
        disabled={inner.disabled}
        // @ts-ignore
        // onSelect={(e: MouseEvent) => {
        //   if (typeof inner.onClick === "function") {
        //     inner.onClick(data,e);
        //     if (inner.preventCloseOnClick) {
        //       e.preventDefault();
        //     }
        //   }
        //   e.stopPropagation()
        // }}
        onClick={(e: MouseEvent) => {
          if (typeof inner.onClick === "function") {
            inner.onClick(data,e);
            if (inner.preventCloseOnClick) {
              e.preventDefault();
            }
          }
          e.stopPropagation()
        }}
      >
        {inner.left && (
          <LeftSlot>
            {isValidElement(inner.left)
              ? (inner.left as ReactNode)
              : typeof inner.left == "function"
              ? inner.left(data)
              : inner.left}
          </LeftSlot>
        )}
        {typeof inner.label == "function"
          ? inner.label(data)
          : inner.label
          ? inner.label
          : "Menu Item"}
        {inner.right && (
          <RightSlot>
            {isValidElement(inner.right)
              ? (inner.right as ReactNode)
              : typeof inner.right == "function"
              ? inner.right(data)
              : inner.right}
          </RightSlot>
        )}
      </DropdownMenuItem>
    );
  }
}

export function NestedDropdown<T>(props: NestedDropdownProps<T>): ReactNode {
  return (
    <DropdownMenu.Root>
      <DropdownMenuTrigger asChild>
        <span>
        <IconButton size={props.size} style={{backgroundColor:'transparent'}}>
          {isValidElement(props.icon) ? (
            (props.icon as ReactNode)
          ) : typeof props.icon == "function" ? (
            props.icon(props.data)
          ) : props.inner ? (
            <FiMenu />
          ) : (
            <FiMoreHorizontal />
          )}
        </IconButton>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent sideOffset={5}>
          {props.inner.map((innerData: DropdownData<T>, i: number) => (
            <InnerDropdown key={i} data={props.data} inner={innerData} />
          ))}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
