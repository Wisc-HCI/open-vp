import React, { useState } from "react";
import {
  CardHeader,
  IconButton,
  Collapse,
  Stack,
  Typography,
  Switch,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import shallow from "zustand/shallow";
import { SettingsContainer } from "./BlockContainers";
import { ExpandCarrot } from "./ExpandCarrot";
import { NumberInput } from "./Utility";
import { SIMPLE_PROPERTY_TYPES } from "../Constants";
import { useProgrammingStore } from "../ProgrammingContext";

export const SettingsSection = ({
  id,
  interactionDisabled,
  simpleProperties,
  properties,
}) => {
  const setLocked = useProgrammingStore((state) => state.setLocked, shallow);
  const updateItemSimpleProperty = useProgrammingStore(
    (store) => store.updateItemSimpleProperty,
    shallow
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
          <IconButton
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
          >
            <ExpandCarrot expanded={!collapsed} />
          </IconButton>
        }
      />
      <Collapse in={!collapsed} orientation="vertical">
        {!collapsed && Object.entries(simpleProperties).map(([propKey, propInfo]) => (
          <Stack
            key={propKey}
            direction="row"
            justifyContent="space-between"
            sx={{
              backgroundColor: "#00000055",
              borderRadius: 2,
              display: "flex",
              align: "center",
              marginBottom: 1,
              padding: 2,
              alignItems: "center",
            }}
            round="xsmall"
            flex
            pad="small"
            justify="between"
            align="center"
            margin={{ bottom: "xsmall" }}
          >
            <Typography size="small" color="#ffffff">
              {propInfo.name}
            </Typography>
            {propInfo.type === SIMPLE_PROPERTY_TYPES.BOOLEAN && (
              <Switch
                checked={properties[propKey]}
                onChange={(event) =>
                  updateItemSimpleProperty(id, propKey, event.target.checked)
                }
                color="primary"
                disabled={interactionDisabled}
              />
            )}
            {propInfo.type === SIMPLE_PROPERTY_TYPES.NUMBER && (
              <Box key={propKey} width="small" align="end">
                <NumberInput
                  onMouseEnter={(_) => setLocked(true)}
                  onMouseLeave={(_) => setLocked(false)}
                  className="nodrag"
                  min={propInfo.min !== undefined ? propInfo.min : 0}
                  max={propInfo.max !== undefined ? propInfo.max : 10}
                  style={{ width: 105 }}
                  step={propInfo.step}
                  suffix={propInfo.units}
                  value={properties[propKey]}
                  disabled={interactionDisabled}
                  visualScaling={propInfo.visualScaling}
                  onChange={(value) => {
                    console.log(value);
                    updateItemSimpleProperty(id, propKey, value);
                  }}
                />
              </Box>
            )}
            {propInfo.type === SIMPLE_PROPERTY_TYPES.STRING && (
              <Box key={propKey} width="xsmall">
                <TextField
                  className="nodrag"
                  color="primary"
                  onMouseEnter={(_) => setLocked(true)}
                  onMouseLeave={(_) => setLocked(false)}
                  size="small"
                  // style={{ color: "#00000088" }}
                  value={properties[propKey] ? properties[propKey] : ""}
                  disabled={interactionDisabled}
                  onChange={(e) =>
                    updateItemSimpleProperty(id, propKey, e.target.value)
                  }
                />
              </Box>
            )}
            {propInfo.type === SIMPLE_PROPERTY_TYPES.OPTIONS && (
              <Select
                key={propKey}
                disabled={interactionDisabled}
                size="small"
                color="primary"
                value={properties[propKey] ? properties[propKey] : ""}
                onChange={(e) =>
                  updateItemSimpleProperty(id, propKey, e.target.value)
                }
              >
                {propInfo.options.map((option, optionIdx) => (
                  <MenuItem key={optionIdx} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Stack>
        ))}
      </Collapse>
    </SettingsContainer>
  );
};
