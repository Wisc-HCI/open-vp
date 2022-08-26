import React, { memo } from "react";
import { SIMPLE_PROPERTY_TYPES, UNRENDERED_PROPS } from "../Constants";
import { useProgrammingStore } from "../ProgrammingContext";
import shallow from "zustand/shallow";
import {
  Box,
  Tooltip,
  Select,
  Switch,
  TextField,
  Stack,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";
import { NumberInput, Vector3Input } from "./Utility";
import { DropZone } from "./DropZone";
import { FullWidthStack, PropertySection } from "./BlockContainers";

export const MinifiedBar = memo(
  ({
    id,
    propertyInfo,
    properties,
    canDragBlockRFR,
    interactionDisabled,
    highlightColor,
    context,
    limitedRender,
  }) => {
    const updateItemSimpleProperty = useProgrammingStore(
      (store) => store.updateItemSimpleProperty,
      shallow
    );

    const setLocked = useProgrammingStore((state) => state.setLocked, shallow);
    const propertyLength = Object.keys(propertyInfo).length;

    return (
      <FullWidthStack
        align="center"
        direction={propertyLength <= 3 ? "row" : "column"}
        className={canDragBlockRFR ? null : "nodrag"}
      >
        {Object.entries(propertyInfo)
          ?.filter(
            ([_, fieldInfo]) => !UNRENDERED_PROPS.includes(fieldInfo.type)
          )
          .map(([fieldKey, fieldInfo]) => (
            <PropertySection key={fieldKey}>
              <Stack
                key={fieldKey}
                direction="row"
                justifyContent="space-between"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  alignItems: "center",
                  justify: "space-between",
                }}
              >
                <Typography color="#eee" style={{ margin: "2px 2px 2px 5px" }}>
                  {fieldInfo.name}
                </Typography>
                {limitedRender &&
                Object.keys(SIMPLE_PROPERTY_TYPES).includes(fieldInfo.type) ? (
                  <Skeleton
                    variant="rectangular"
                    height="39px"
                    width="100px"
                    sx={{ borderRadius: 1, bgcolor: "#aaa", margin: "3px" }}
                  />
                ) : fieldInfo.type === SIMPLE_PROPERTY_TYPES.OPTIONS ? (
                  <Select
                    key={fieldKey}
                    disabled={interactionDisabled}
                    size="small"
                    color="primary"
                    value={properties[fieldKey] ? properties[fieldKey] : ""}
                    sx={{ margin: "3px" }}
                    onChange={(e) =>
                      updateItemSimpleProperty(id, fieldKey, e.target.value)
                    }
                  >
                    {fieldInfo.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : fieldInfo.type === SIMPLE_PROPERTY_TYPES.BOOLEAN ? (
                  <Switch
                    key={fieldKey}
                    checked={properties[fieldKey]}
                    onChange={(event) =>
                      updateItemSimpleProperty(
                        id,
                        fieldKey,
                        event.target.checked
                      )
                    }
                    color="primary"
                    disabled={interactionDisabled}
                  />
                ) : fieldInfo.type === SIMPLE_PROPERTY_TYPES.STRING ? (
                  <TextField
                    size="small"
                    color="primary"
                    className="nodrag"
                    margin="none"
                    key={fieldKey}
                    // placeholder={fieldInfo.name}
                    onMouseEnter={(_) => setLocked(true)}
                    onMouseLeave={(_) => setLocked(false)}
                    value={properties[fieldKey] ? properties[fieldKey] : ""}
                    disabled={interactionDisabled}
                    sx={{ width: 120, padding: "3px" }}
                    InputProps={{
                      sx: { color: "white" },
                    }}
                    onChange={(e) =>
                      updateItemSimpleProperty(id, fieldKey, e.target.value)
                    }
                  />
                ) : fieldInfo.type === SIMPLE_PROPERTY_TYPES.NUMBER ? (
                  <Box key={fieldKey} sx={{ maxWidth: 120, padding: "3px" }}>
                    <NumberInput
                      onMouseEnter={(_) => setLocked(true)}
                      onMouseLeave={(_) => setLocked(false)}
                      className="nodrag"
                      key={fieldKey}
                      style={{ width: 50, margin: 3 }}
                      min={fieldInfo.min}
                      max={fieldInfo.max}
                      step={fieldInfo.step}
                      suffix={fieldInfo.units}
                      value={properties[fieldKey]}
                      disabled={interactionDisabled}
                      onChange={(value) =>
                        !interactionDisabled &&
                        updateItemSimpleProperty(id, fieldKey, value)
                      }
                    />
                  </Box>
                ) : fieldInfo.type === SIMPLE_PROPERTY_TYPES.VECTOR3 ? (
                  <Box key={fieldKey} sx={{ maxWidth: 200, padding: "3px" }}>
                    <Vector3Input
                      onMouseEnter={(_) => setLocked(true)}
                      onMouseLeave={(_) => setLocked(false)}
                      className="nodrag"
                      min={fieldInfo.min}
                      max={fieldInfo.max}
                      step={fieldInfo.step}
                      endAdornment={fieldInfo.endAdornment}
                      value={properties[fieldKey]}
                      disabled={interactionDisabled}
                      onChange={(event) =>
                        !interactionDisabled &&
                        updateItemSimpleProperty(
                          id,
                          fieldKey,
                          event.target.value
                        )
                      }
                    />
                  </Box>
                ) : fieldInfo.accepts && fieldInfo.isList ? (
                  <List
                    key={fieldKey}
                    ids={properties[fieldKey]}
                    fieldInfo={{ ...fieldInfo, value: fieldKey }}
                    parentId={id}
                    interactionDisabled={interactionDisabled}
                    highlightColor={highlightColor}
                    context={context}
                    limitedRender={limitedRender}
                  />
                ) : fieldInfo.accepts && !fieldInfo.isList ? (
                  <DropZone
                    key={fieldKey}
                    id={properties[fieldKey]}
                    fieldInfo={{
                      ...fieldInfo,
                      value: fieldKey,
                      name: !fieldInfo.fullWidth ? "" : fieldInfo.name,
                    }}
                    parentId={id}
                    interactionDisabled={interactionDisabled}
                    highlightColor={highlightColor}
                    context={context}
                    limitedRender={limitedRender}
                  />
                ) : null}
              </Stack>
            </PropertySection>
          ))}
      </FullWidthStack>
    );
  }
);
