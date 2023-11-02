import React, { ReactNode, memo } from "react";
import { Divider, Skeleton, Stack, Tooltip, lighten } from "@mui/material";
import {
  useProgrammingStore,
  BlockSpec,
  BlockData,
  ProgrammingState,
  ExtraType,
  Extra,
  TypeSpec,
  PrimitiveType,
} from "@people_and_robots/open-core";
import { FullWidthStack } from "./BlockContainers";
import { BlockAvatar } from "./BlockAvatar";
import {
  NestedDropdown,
  DropdownData,
  ActionIconButton,
  DropdownEntry,
} from "@people_and_robots/open-gui";
import {
  FiBook,
  FiBookOpen,
  FiChevronDown,
  FiChevronRight,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiMoreHorizontal,
  FiScissors,
  FiSquare,
  FiTrash2,
  FiZap,
  FiZapOff,
} from "react-icons/fi";
import { pickBy } from "lodash";
import { ExpandCarrot } from "./ExpandCarrot";

export interface MenuSectionProps {
  data: BlockData;
  blockSpec: BlockSpec;
  inDrawer?: boolean;
  copyFn: () => void;
  cutFn: () => void;
  deleteFn: () => void;
  interactionDisabled?: boolean;
  isCollapsed?: boolean;
  setIsCollapsed: (v: boolean) => void;
  isSelected?: boolean;
  setIsSelected: (v: boolean) => void;
  docActive?: boolean;
  setDocActive: (v: boolean) => void;
  isDebugging?: boolean;
  setIsDebugging: (v: boolean) => void;
}

export interface MenuData {
  blockSpec: BlockSpec;
  isCollapsed: boolean;
  isSelected: boolean;
  docActive: boolean;
  isDebugging: boolean;
}

export const MenuSection = memo(
  ({
    data,
    blockSpec,
    inDrawer = false,
    copyFn,
    cutFn,
    deleteFn,
    interactionDisabled = false,
    isCollapsed = false,
    setIsCollapsed,
    isSelected = false,
    setIsSelected,
    docActive = false,
    setDocActive,
    isDebugging = false,
    setIsDebugging, // setIsEditing,
  }: MenuSectionProps) => {
    const storeFns = useProgrammingStore((state: ProgrammingState) =>
      pickBy(state, (v) => typeof v === "function")
    );

    const typeSpecs = useProgrammingStore((state: ProgrammingState) => 
        state.programSpec.objectTypes
    );

    if (blockSpec.extras.length === 0) {
      return null;
    }

    let usedExtras: Extra[] = inDrawer
      ? [
          {
            label: "Actions",
            type: "DROPDOWN",
            icon: FiMoreHorizontal,
            contents: blockSpec.extras,
          },
        ]
      : blockSpec.extras;
    // const setLocked = useProgrammingStore((state:ProgrammingState) => state.setLocked);
    // console.log(usedExtras);

    const dropdowns = extrasToDropdown(
      usedExtras,
      copyFn,
      cutFn,
      deleteFn,
      setIsDebugging,
      setIsSelected,
      setDocActive,
      setIsCollapsed,
      (id: string, type: string) => {
        storeFns.addArgument(id, type);
      },
      storeFns,
      typeSpecs,
      interactionDisabled
    );

    let menuData = {
      ...data,
      blockSpec,
      isCollapsed,
      isSelected,
      docActive,
      isDebugging,
    } as MenuData & BlockData;

    return (
      <Stack direction="row" gap={1}>
        {dropdowns.map((dropdown: DropdownData<MenuData & BlockData>,i) => {
          return dropdown.type === "ENTRY" && dropdown.inner ? (
            <NestedDropdown key={i} data={menuData} inner={dropdown.inner} />
          ) : dropdown.type === "ENTRY" ? (
            <ActionIconButton
              key={i}
              title={typeof dropdown.label === "function" ? dropdown.label(menuData) : dropdown.label}
              // @ts-ignore
              onClick={(e: MouseEvent) =>
                dropdown.onClick ? dropdown.onClick(menuData,e) : () => {}
              }
            >
              {/* @ts-ignore */}
              {typeof dropdown.left === "function" ? dropdown.left(menuData) : dropdown.left}
            </ActionIconButton>
          ) : (
            <Divider key={i} />
          );
        })}
      </Stack>
    );
  }
);

export function extrasToDropdown(
  extras: Extra[],
  copyFn: () => void,
  cutFn: () => void,
  deleteFn: () => void,
  setDebugging: (v: boolean) => void,
  setSelected: (v: boolean) => void,
  setDocActive: (v: boolean) => void,
  setCollapsed: (v: boolean) => void,
  addArgument: (id: string, type: string) => void,
  storeFns: { [key: string]: (...args: any[]) => void },
  typeSpecs: { [key: string]: TypeSpec },
  interactionDisabled: boolean
): DropdownData<MenuData & BlockData>[] {
  return extras.map((extra: Extra) => {
    if (extra === ExtraType.Divider) {
      return { type: "DIVIDER" } as DropdownData<MenuData & BlockData>;
    } else if (extra === ExtraType.DeleteButton) {
      return {
        type: "ENTRY",
        label: "Delete",
        left: <FiTrash2/>,
        onClick: deleteFn,
        disabled: interactionDisabled,
      } as DropdownEntry<MenuData & BlockData>;
    } else if (extra === ExtraType.CopyButton) {
      return {
        type: "ENTRY",
        label: "Copy",
        left: <FiCopy />,
        onClick: copyFn,
        disabled: interactionDisabled,
      } as DropdownData<MenuData & BlockData>;
    } else if (extra === ExtraType.CutButton) {
      return {
        type: "ENTRY",
        label: "Cut",
        left: <FiScissors />,
        onClick: cutFn,
        disabled: interactionDisabled,
      } as DropdownData<MenuData & BlockData>;
    } else if (extra === ExtraType.DebugToggle) {
      return {
        type: "ENTRY",
        label: (data: MenuData & BlockData) =>
          data.isDebugging ? "Stop Debugging" : "Debug",
        left: (data: MenuData & BlockData) =>
          data.isDebugging ? <FiZapOff /> : <FiZap />,
        onClick: (data: MenuData & BlockData) => {
          setDebugging(!data.isDebugging);
        },
      } as DropdownData<MenuData & BlockData>;
    } else if (extra === ExtraType.SelectionToggle) {
      return {
        type: "ENTRY",
        label: (data: MenuData & BlockData) =>
          data.isSelected ? "Deselect" : "Select",
        left: (data: MenuData & BlockData) =>
          data.isSelected ? <FiEyeOff /> : <FiEye />,
        onClick: (data: MenuData & BlockData) => {
          setSelected(!data.isSelected);
        },
      } as DropdownData<MenuData & BlockData>;
    } else if (extra === ExtraType.DocToggle) {
      return {
        type: "ENTRY",
        label: (data: MenuData & BlockData) =>
          data.docActive ? "Close Doc" : "Open Doc",
        left: (data: MenuData & BlockData) =>
          data.docActive ? <FiBook /> : <FiBookOpen />,
        onClick: (data: MenuData & BlockData) => {
          setDocActive(!data.docActive);
        },
      } as DropdownData<MenuData & BlockData>;
    } else if (extra === ExtraType.CollapseToggle) {
      return {
        type: "ENTRY",
        label: (data: MenuData & BlockData) =>
          data.isCollapsed ? "Expand" : "Collapse",
        left: (data: MenuData & BlockData) => (data.isCollapsed ? <FiChevronRight/> : <FiChevronDown/>),
        onClick: (data: MenuData & BlockData) => {
          setCollapsed(!data.isCollapsed);
        },
      } as DropdownData<MenuData & BlockData>;
    } else if (extra.type === ExtraType.FunctionButton) {
      const onClick =
        typeof extra.onClick === "function"
          ? extra.onClick
          : storeFns[extra.onClick]
          ? storeFns[extra.onClick]
          : (data: any) => {};
      return {
        type: "ENTRY",
        label: extra.label,
        left: extra.icon,
        onClick,
        disabled: interactionDisabled,
      } as DropdownData<MenuData & BlockData>;
    } else if (extra.type === ExtraType.Dropdown) {
      return {
        type: "ENTRY",
        label: extra.label,
        left: extra.icon,
        inner: extrasToDropdown(
          extra.contents,
          copyFn,
          cutFn,
          deleteFn,
          setDebugging,
          setSelected,
          setDocActive,
          setCollapsed,
          addArgument,
          storeFns,
          typeSpecs,
          interactionDisabled
        ),
      } as DropdownData<MenuData & BlockData>;
    } else if (extra.type === ExtraType.AddArgument) {
      return {
        type: "ENTRY",
        label: extra.label,
        left: extra.icon,
        onClick: (data: MenuData & BlockData) => {
          addArgument(data.id, extra.argumentType);
        },
        disabled: interactionDisabled,
      } as DropdownData<MenuData & BlockData>;
    } else if (extra.type === ExtraType.AddArgumentGroup) {
      return {
        type: "ENTRY",
        label: "Add Arguments",
        left: extra.icon,
        inner: extra.allowed?.map((type: string) => {
          return {
            type: "ENTRY",
            label: `Add ${typeSpecs[type].name}`,
            left: getIconFromTypeSpec(typeSpecs[type]),
            onClick: (data: MenuData & BlockData) => {
              addArgument(data.id, type);
            },
            disabled: interactionDisabled,
          };
        }) || [],
      } as DropdownData<MenuData & BlockData>;
    } else {
      return {
        type: "ENTRY",
        label: extra.label,
        left: extra.icon,
      } as DropdownData<MenuData & BlockData>;
    }
  });
}

const getIconFromTypeSpec = (typeSpec: TypeSpec) => {
    if (typeSpec.primitiveType === PrimitiveType.Object) {
        if (typeSpec.instanceBlock.icon) {
            return typeSpec.instanceBlock.icon
        } else if (typeSpec.referenceBlock.icon) {
            return typeSpec.referenceBlock.icon
        }
    } else if (typeSpec.primitiveType === PrimitiveType.Function) {
        if (typeSpec.functionBlock.icon) {
            return typeSpec.functionBlock.icon
        } else if (typeSpec.callBlock.icon) {
            return typeSpec.callBlock.icon
        } 
    } 
    
    return FiSquare
}