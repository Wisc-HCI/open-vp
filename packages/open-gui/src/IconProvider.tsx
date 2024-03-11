import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { createContext, useContext, ReactNode } from "react";

export type IconSet = {
  [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export const IconContext = createContext<IconSet>({});

export function useIconSet() {
  const iconSet = useContext(IconContext);
  return iconSet || {};
}

export interface IconProviderProps {
  iconSet: IconSet;
  children: ReactNode;
}
export function IconProvider({ iconSet, children }: IconProviderProps) {
  return (
    <IconContext.Provider value={iconSet}>{children}</IconContext.Provider>
  );
}
