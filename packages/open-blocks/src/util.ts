import {
  MetaType,
  PrimitiveType,
  TypeSpec,
  Extra,
  ExtraType,
} from "@people_and_robots/open-core";
import { DropdownExtra } from "@people_and_robots/open-core/src/types";
import { FiAlertCircle } from "react-icons/fi";

export type Query =
  | "onCanvas"
  | "color"
  | "icon"
  | "extras"
  | "connections"
  | "hideNewPrefix"
  | "minified"
  | "style";

export function blockSpecQuery(
  typeSpec: TypeSpec,
  query: Query,
  knownMetaType?: MetaType
): any {
  if (typeSpec && typeSpec.primitiveType === PrimitiveType.Object) {
    if (knownMetaType && knownMetaType === MetaType.ObjectInstance) {
      return typeSpec.instanceBlock[query];
    } else if (knownMetaType && knownMetaType === MetaType.ObjectReference) {
      return typeSpec.referenceBlock[query];
    } else if (!knownMetaType) {
      return typeSpec.instanceBlock[query] || typeSpec.referenceBlock[query];
    }
  } else if (typeSpec && typeSpec.primitiveType === PrimitiveType.Function) {
    if (knownMetaType && knownMetaType === MetaType.FunctionDeclaration) {
      return typeSpec.functionBlock[query];
    } else if (knownMetaType && knownMetaType === MetaType.FunctionCall) {
      return typeSpec.callBlock[query];
    } else if (!knownMetaType) {
      return typeSpec.functionBlock[query] || typeSpec.callBlock[query];
    }
  }
  return null;
}

export function flattenMenuOnce(extras: Extra[]): Extra[] {
  let pancaked: Extra[] = [
    ExtraType.CopyButton,
    ExtraType.CutButton,
    ExtraType.Divider,
  ];
  extras?.forEach((extra: Extra) => {
    if ((extra as DropdownExtra).type === ExtraType.Dropdown) {
      if (pancaked[pancaked.length - 1] !== ExtraType.Divider) {
        pancaked.push(ExtraType.Divider);
      }
      if ((extra as DropdownExtra).label) {
        // console.log('creating label',extra.label)
        pancaked.push({
          label: (extra as DropdownExtra).label,
          type: ExtraType.Indicator,
          icon: "ArrowRightRounded",
        });
      }
      (extra as DropdownExtra).contents.forEach((child) => {
        if (child === ExtraType.Divider) {
          if (pancaked[pancaked.length - 1] !== ExtraType.Divider) {
            pancaked.push(ExtraType.Divider);
          }
        } else {
          pancaked.push(child);
        }
      });
      if (pancaked[pancaked.length - 1] !== ExtraType.Divider) {
        pancaked.push(ExtraType.Divider);
      }
    } else if (extra === ExtraType.Divider) {
      if (pancaked[pancaked.length - 1] !== ExtraType.Divider) {
        pancaked.push(ExtraType.Divider);
      }
    } else {
      pancaked.push(extra);
    }
  });
  if (pancaked[pancaked.length - 1] === ExtraType.Divider) {
    pancaked.pop();
  }
  if (pancaked.length > 0 && pancaked[0] === ExtraType.Divider) {
    pancaked.shift();
  }
  // console.log(pancaked)
  if (pancaked.length === 0) {
    pancaked.push({
      label: "No Actions",
      type: ExtraType.Indicator,
      icon: "ArrowRightRounded",
    });
  }
  return pancaked;
}
