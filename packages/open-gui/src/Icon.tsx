import * as IconSet from "@mui/icons-material";
import { useIconSet } from "./IconProvider";

export type IconName = keyof typeof IconSet;

export interface IconProps {
  name: IconName;
  size?: number;
  style?: React.CSSProperties;
}

const DefaultIconComponent = IconSet["HelpOutlineRounded"];

export const Icon = ({ name, size = 16, style = {} }: IconProps) => {
  // First, try to query a custom icon set
  const customIconSet = useIconSet();
  if (customIconSet[name]) {
    const IconComponent = customIconSet[name];
    return <IconComponent width={size} height={size} />;
  }
  // Default to checking the MUI icon set
  const IconComponent = IconSet[name];
  if (!IconComponent) {
    console.warn(`Icon not found, used `, name);
    return <DefaultIconComponent width={size} height={size} color="error" />;
  }
  return <IconComponent width={size} height={size} style={style} />;
};
