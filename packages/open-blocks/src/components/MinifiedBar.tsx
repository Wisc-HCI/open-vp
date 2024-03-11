import { memo } from "react";
import {
  useProgrammingStore,
  PropertyType,
  ExecutionState,
} from "@people_and_robots/open-core";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import {
  NumberInput,
  Vector3Input,
  TextInput,
  Select,
  Toggle,
  IconName,
  Icon,
} from "@people_and_robots/open-gui";
import { DropZone } from "./DropZone";
import { List } from "./List";
import { FullWidthStack, PropertySection } from "./BlockContainers";
import { ProgrammingState } from "@people_and_robots/open-core";
import { BlockAvatar } from "./BlockAvatar";

export interface MinifiedBarProps {
  id: string;
  blockName: string;
  propertyInfo: { [key: string]: any };
  properties: { [key: string]: any };
  interactionDisabled?: boolean;
  context?: any;
  limitedRender?: boolean;
  progress?: ExecutionState;
  icon: IconName;
  inDrawer?: boolean;
}

export const MinifiedBar = memo(
  ({
    id,
    blockName,
    propertyInfo,
    properties,
    // canDragBlockRFR,
    interactionDisabled,
    context,
    limitedRender,
    progress,
    icon,
    inDrawer,
  }: MinifiedBarProps) => {
    const updateItemSimpleProperty = useProgrammingStore(
      (store: ProgrammingState) => store.updateItemSimpleProperty,
    );

    const propertyLength = Object.keys(propertyInfo).length;

    return (
      <FullWidthStack
        direction={
          inDrawer
            ? "row"
            : propertyLength > 1 || interactionDisabled
              ? "column"
              : "row"
        }
        spacing={0.5}
        alignItems="stretch"
        justifyContent="flex-start"
        style={{ paddingTop: 4 }}
      >
        <BlockAvatar progress={progress}>
          {/* @ts-ignore */}
          <Icon name={icon} size={22} />
        </BlockAvatar>
        {inDrawer ? (
          <TextInput value={blockName} readonly />
        ) : (
          Object.entries(propertyInfo)?.map(([fieldKey, fieldInfo]) => (
            <Stack key={fieldKey} direction="column" justifyContent="center">
              {limitedRender &&
              Object.keys(PropertyType).includes(fieldInfo.type) ? (
                <Skeleton
                  variant="rectangular"
                  height="39px"
                  width="100px"
                  sx={{ borderRadius: 1, bgcolor: "#aaa", margin: "3px" }}
                />
              ) : fieldInfo.type === PropertyType.Options ? (
                <Select
                  key={fieldKey}
                  disabled={interactionDisabled}
                  value={properties[fieldKey] ? properties[fieldKey] : ""}
                  onChange={(v) => updateItemSimpleProperty(id, fieldKey, v)}
                  options={fieldInfo.options}
                />
              ) : fieldInfo.type === PropertyType.Boolean ? (
                <Toggle
                  key={fieldKey}
                  label={fieldInfo.name}
                  value={properties[fieldKey]}
                  defaultValue={false}
                  onChange={(v) => updateItemSimpleProperty(id, fieldKey, v)}
                  disabled={interactionDisabled}
                />
              ) : fieldInfo.type === PropertyType.String ? (
                <Box key={fieldKey} width="xsmall">
                  <TextInput
                    value={properties[fieldKey] ? properties[fieldKey] : ""}
                    disabled={interactionDisabled}
                    onChange={(e) =>
                      updateItemSimpleProperty(id, fieldKey, e.target.value)
                    }
                  />
                </Box>
              ) : fieldInfo.type === PropertyType.Number ? (
                <Box key={fieldKey} width="xsmall">
                  <NumberInput
                    // onMouseEnter={(_) => setLocked(true)}
                    // onMouseLeave={(_) => setLocked(false)}
                    label={fieldInfo.name}
                    min={fieldInfo.min !== undefined ? fieldInfo.min : 0}
                    max={fieldInfo.max !== undefined ? fieldInfo.max : 10}
                    // style={{ width: 105 }}
                    step={fieldInfo.step}
                    suffix={fieldInfo.units}
                    value={properties[fieldKey]}
                    disabled={interactionDisabled}
                    onChange={(value) => {
                      console.log(value);
                      updateItemSimpleProperty(id, fieldKey, value);
                    }}
                  />
                </Box>
              ) : fieldInfo.type === PropertyType.Vector3 ? (
                <Box key={fieldKey} sx={{ maxWidth: 200, padding: "3px" }}>
                  <Vector3Input
                    key={fieldKey}
                    disabled={interactionDisabled}
                    value={
                      properties[fieldKey] ? properties[fieldKey] : [0, 0, 0]
                    }
                    onChange={(v) => updateItemSimpleProperty(id, fieldKey, v)}
                  />
                </Box>
              ) : fieldInfo.type === PropertyType.Block ? (
                <PropertySection key={fieldKey}>
                  <Stack
                    key={fieldKey}
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justify: "space-between",
                    }}
                  >
                    {limitedRender || interactionDisabled ? (
                      !fieldInfo.fullWidth && (
                        <Skeleton
                          variant="rectangular"
                          animation={false}
                          height="32px"
                          width="32px"
                          sx={{
                            borderRadius: 1,
                            bgcolor: "#44444444",
                            marginLeft: 0.5,
                          }}
                        />
                      )
                    ) : typeof fieldInfo.name === "string" ? (
                      !fieldInfo.fullWidth && (
                        <Typography
                          color="#eee"
                          style={{ margin: "2px 2px 2px 5px" }}
                        >
                          {typeof fieldInfo.name === "string" && fieldInfo.name}
                        </Typography>
                      )
                    ) : (
                      <Box style={{ paddingLeft: 5 }}>
                        <Select
                          key={fieldInfo.name.name}
                          label={""}
                          disabled={interactionDisabled}
                          value={
                            properties[fieldInfo.name.id]
                              ? properties[fieldInfo.name.id]
                              : ""
                          }
                          onChange={(v) =>
                            updateItemSimpleProperty(id, fieldInfo.name.id, v)
                          }
                          options={fieldInfo.name.options}
                        />
                      </Box>
                    )}
                    {fieldInfo.isList ? (
                      <List
                        key={fieldKey}
                        ids={properties[fieldKey]}
                        regionInfo={{
                          parentId: id,
                          fieldInfo,
                        }}
                        interactionDisabled={interactionDisabled || false}
                        context={context || []}
                        limitedRender={limitedRender || false}
                      />
                    ) : (
                      <DropZone
                        key={fieldKey}
                        id={properties[fieldKey]}
                        regionInfo={{
                          parentId: id,
                          fieldInfo,
                        }}
                        interactionDisabled={interactionDisabled}
                        context={context}
                        limitedRender={limitedRender}
                      />
                    )}
                  </Stack>
                </PropertySection>
              ) : null}
            </Stack>
          ))
        )}
      </FullWidthStack>
    );
  },
);
