import { Stack } from "@mui/material";
import { useProgrammingStore, ProgrammingState } from "@people_and_robots/open-core";
import { Toggle } from "@people_and_robots/open-gui";
import { BlockContainer } from "./components/BlockContainers";
import { BlockAvatar } from "./components/BlockAvatar";
import { FiPlus } from "react-icons/fi";
import { BlockHeader } from "./components/BlockHeader";

export interface ButtonProps {
  label: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function Button({ label, defaultValue, onChange, disabled }: ButtonProps): JSX.Element {
  
  const [activeDrawer, setActiveDrawer] = useProgrammingStore((state: ProgrammingState) => [
    state.activeDrawer,
    state.setActiveDrawer,
  ]);

  return (
    <BlockContainer
    selected={activeDrawer !== null}
    color={"#993399"}
    // focused={false}
    // bounded={true}
    style={{margin:4,display:'flex'}}
    >
      <BlockAvatar progress={activeDrawer !== null ? 1 : 0}><FiPlus/></BlockAvatar>
    <Toggle
      label={label}
      value={activeDrawer !== null}
      onChange={(value:boolean)=>{
        onChange(value);
        if (value) {
          setActiveDrawer(label);
        } else {
          setActiveDrawer(null);
        }
      }}
    />
    </BlockContainer>
  );
}

Button.displayName = "Button";
