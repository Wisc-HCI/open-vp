import { useState } from "react";
import {
  CardHeader,
  Collapse,
  Stack,
  Typography,
  Box
} from "@mui/material";
import { SettingsContainer } from "./BlockContainers";
import { ExpandCarrot } from "./ExpandCarrot";
import { ProgrammingState, SimpleFieldInfo, PropertyType, useProgrammingStore } from "@people_and_robots/open-core";
import { NumberInput, Vector3Input, ActionIconButton, TextInput, Select, Toggle } from "@people_and_robots/open-gui";

export interface SettingsSectionProps {
  id: string;
  interactionDisabled?: boolean;
  simpleProperties: {[key: string]: SimpleFieldInfo}
  properties: {[key: string]: any};
}
export const SettingsSection = ({
  id,
  interactionDisabled,
  simpleProperties,
  properties,
}: SettingsSectionProps) => {
  // const setLocked = useProgrammingStore((state: ProgrammingState) => state.setLocked, shallow);
  const updateItemSimpleProperty = useProgrammingStore(
    (state: ProgrammingState) => state.updateItemSimpleProperty
  );
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SettingsContainer>
      <CardHeader
        title={<Typography color="#eee">Settings</Typography>}
        onClick={
          interactionDisabled
            ? (e) => {
                e.stopPropagation();
              }
            : (e) => {
                setCollapsed(!collapsed);
                e.stopPropagation();
              }
        }
        action={
          <ActionIconButton
            title={collapsed ? "Expand" : "Collapse"}
            onClick={
              interactionDisabled
                ? (e) => {
                    e.stopPropagation();
                  }
                : (e) => {
                    setCollapsed(!collapsed);
                    e.stopPropagation();
                  }
            }
            icon={collapsed ? "ChevronRightIcon" : "ChevronDownIcon"}
          />
        }
      />
      <Collapse in={!collapsed} orientation="vertical">
      <Stack direction='column' justifyContent='flex' gap={1} style={{paddingTop:4,paddingBottom:4}}>
        {!collapsed &&
       
          Object.entries(simpleProperties).map(([propKey, propInfo]) => (
            // <Stack
            //   key={propKey}
            //   direction="row"
            //   justifyContent="space-between"
            //   sx={{
            //     backgroundColor: "#00000055",
            //     borderRadius: 2,
            //     display: "flex",
            //     align: "center",
            //     marginBottom: 1,
            //     padding: 2,
            //     alignItems: "center",
            //   }}
            //   justifyItems="between"
            //   alignItems="center"
            //   margin={{ bottom: "xsmall" }}
            // >
            <>
              {propInfo.type === PropertyType.Boolean && (
                <Toggle
                  key={propKey}
                  label={propInfo.name}
                  value={properties[propKey]}
                  defaultValue={false}
                  onChange={(v) =>
                    updateItemSimpleProperty(id, propKey, v)
                  }
                  disabled={interactionDisabled}
                />
              )}
              {propInfo.type === PropertyType.Number && (
                  <Box key={propKey} width="xsmall">
                  <NumberInput
                    // onMouseEnter={(_) => setLocked(true)}
                    // onMouseLeave={(_) => setLocked(false)}
                    label={propInfo.name}
                    min={propInfo.min !== undefined ? propInfo.min : 0}
                    max={propInfo.max !== undefined ? propInfo.max : 10}
                    // style={{ width: 105 }}
                    step={propInfo.step}
                    suffix={propInfo.units}
                    value={properties[propKey]}
                    disabled={interactionDisabled}
                    onChange={(value) => {
                      console.log(value);
                      updateItemSimpleProperty(id, propKey, value);
                    }}
                  />
                </Box>
              )}
              {propInfo.type === PropertyType.String && (
                <Box key={propKey} width="xsmall">
                  <TextInput
                    label={propInfo.name}
                    value={properties[propKey] ? properties[propKey] : ""}
                    disabled={interactionDisabled}
                    onChange={(e) =>
                      updateItemSimpleProperty(id, propKey, e.target.value)
                    }
                  />
                </Box>
              )}
              {propInfo.type === PropertyType.Options && (
                <Select
                  key={propKey}
                  label={propInfo.name}
                  disabled={interactionDisabled}
                  value={properties[propKey] ? properties[propKey] : ""}
                  onChange={(v) =>
                    updateItemSimpleProperty(id, propKey,v)
                  }
                  options={propInfo.options}
                />
              )}
              {propInfo.type === PropertyType.Vector3 && (
                <Box key={propKey} sx={{ maxWidth: 200, padding: "3px" }}>
                  <Vector3Input
                    key={propKey}
                    disabled={interactionDisabled}
                    value={
                      properties[propKey] ? properties[propKey] : [0, 0, 0]
                    }
                    onChange={(v) =>
                      updateItemSimpleProperty(id, propKey, v)
                    }
                  />
                </Box>
              )}
            </>
          ))}</Stack>
      </Collapse>
    </SettingsContainer>
  );
};
