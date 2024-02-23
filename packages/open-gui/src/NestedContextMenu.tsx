import { ReactNode } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { styled, alpha, Theme, keyframes } from "@mui/material";
import { CONTENT_STYLES, ITEM_STYLES, ITEM_THEMED_STYLES, TRIGGER_THEMED_STYLES, DropdownData, RightSlot, LeftSlot } from "./NestedDropdown";
import { Icon } from "./Icon";

export const slideUpAndFade = keyframes({
  from: { transform: "translateY(4px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

export interface NestedContextMenuProps<T> {
  data: T;
  onClick?: (data: T, event: MouseEvent) => void;
  inner: DropdownData<T>[];
  children?: ReactNode;
}

export const ORIGIN_THEMED_STYLES = ({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius * 0.66,
  "&[data-highlighted]": {
    color: theme.palette.background.paper,
  },
  "&[data-disabled]": {
    color: alpha(theme.palette.primary.main, 0.5),
  },
});

export const ORIGIN_TRIGGER_THEMED_STYLES = ({ theme }: { theme: Theme }) => ({
  ...ITEM_THEMED_STYLES({ theme }),
  '&[data-state="open"]': {
    color: theme.palette.background.paper,
  },
});

const ContextMenuTrigger = styled(ContextMenu.Trigger)(
  {flex:1},
  ORIGIN_TRIGGER_THEMED_STYLES,
);
const ContextMenuSubTrigger = styled(ContextMenu.SubTrigger)(
  ITEM_STYLES,
  TRIGGER_THEMED_STYLES,
);
const ContextMenuContent = styled(ContextMenu.Content)(
  CONTENT_STYLES,
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    animation: `${slideUpAndFade} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
  }),
);

const ContextMenuSubContent = styled(ContextMenu.SubContent)(
  CONTENT_STYLES,
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    animation: `${slideUpAndFade} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
  }),
);

const ContextMenuItem = styled(ContextMenu.Item)(
  ITEM_STYLES,
  ITEM_THEMED_STYLES,
);

const ContextMenuSeparator = styled(ContextMenu.Separator)(
  {
    height: 1,
    margin: 5,
  },
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }),
);

const ContextMenuLabel = styled(ContextMenu.Label)(
  {
    paddingLeft: 25,
    fontSize: 12,
    lineHeight: 2.5,
  },
  ({ theme }) => ({
    color: alpha(theme.palette.primary.main, 0.8),
  }),
);

function InnerContext<T>({
  data,
  inner,
}: {
  data: T;
  inner: DropdownData<T>;
}) {
  if (inner.type === "DIVIDER") {
    return <ContextMenuSeparator />;
  } else if (inner.type === "HEADER") {
    return (
      <ContextMenuLabel>
        {typeof inner.label == "function"
          ? inner.label(data)
          : inner.label
          ? inner.label
          : "Header"}
      </ContextMenuLabel>
    );
  } else if (inner.inner) {
    return (
      <ContextMenu.Sub>
        <ContextMenuSubTrigger>
          {typeof inner.label == "function"
            ? inner.label(data)
            : inner.label
            ? inner.label
            : "Menu Item"}
          <RightSlot>
            <Icon name={typeof inner.right == "function" ? inner.right(data) : inner.right ? inner.right : "KeyboardArrowRightRounded"} />
          </RightSlot>
        </ContextMenuSubTrigger>
        <ContextMenu.Portal>
          <ContextMenuSubContent sideOffset={2} alignOffset={-5}>
            {inner.inner.map((innerData: DropdownData<T>, i: number) => (
              <InnerContext key={i} data={data} inner={innerData} />
            ))}
          </ContextMenuSubContent>
        </ContextMenu.Portal>
      </ContextMenu.Sub>
    );
  } else {
    return (
      <ContextMenuItem
        disabled={inner.disabled}
        // @ts-ignore
        // onSelect={(e: MouseEvent) => {
        //   if (typeof inner.onClick === "function") {
        //     inner.onClick(data,e);
        //     if (inner.preventCloseOnClick) {
        //       e.preventDefault();
        //     }
        //   }
        //   e.stopPropagation();
        // }}
        onClick={(e: MouseEvent) => {
          if (typeof inner.onClick === "function") {
            inner.onClick(data,e);
            if (inner.preventCloseOnClick) {
              e.preventDefault();
            }
          }
          e.stopPropagation();
        }}
      >
        {inner.left && (
          <LeftSlot>
            <Icon name={typeof inner.left == "function" ? inner.left(data) : inner.left} />
          </LeftSlot>
        )}
        {typeof inner.label == "function"
          ? inner.label(data)
          : inner.label
          ? inner.label
          : "Menu Item"}
        {inner.right && (
          <RightSlot>
            <Icon name={typeof inner.right == "function" ? inner.right(data) : inner.right} />
          </RightSlot>
        )}
      </ContextMenuItem>
    );
  }
}

export function NestedContextMenu<T>(props: NestedContextMenuProps<T>) {
  return (
    <ContextMenu.Root>
      <ContextMenuTrigger>
        {props.children}
      </ContextMenuTrigger>

      <ContextMenu.Portal>
        <ContextMenuContent>
          {props.inner.map((innerData: DropdownData<T>, i: number) => (
            <InnerContext key={i} data={props.data} inner={innerData} />
          ))}
        </ContextMenuContent>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
