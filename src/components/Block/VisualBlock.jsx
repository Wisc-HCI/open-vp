import React, { memo, useState, forwardRef } from "react";
import { DropZone } from "./DropZone";
import { List } from "./List";
import {
  DATA_TYPES,
  TYPES,
  SIMPLE_PROPERTY_TYPES,
  UNRENDERED_PROPS,
  ATTENDED_RENDER_PROPS,
} from "../Constants";
import { FiSquare } from "react-icons/fi";
import { useProgrammingStore } from "../ProgrammingContext";
import { ExtraBar, RightClickMenu } from "./ExtraBar";
import { DebugSection } from "./DebugSection";
import { Block } from ".";
import { pickBy, omitBy, pick, isEqual } from "lodash";
import { ConnectionHandle } from "./ConnectionHandle";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { Collapse, Box, Stack } from "@mui/material";
import {
  OuterBlockContainer,
  InnerBlockContainer,
  FullWidthStack,
  PropertySection,
} from "./BlockContainers";
import { BlockHeader } from "./BlockHeader";
import { MinifiedBar } from "./MinifiedBar";
import { SettingsSection } from "./SettingsSection";
import shallow from "zustand/shallow";
import { compareBlockData } from "./Utility";

export const VisualBlock = memo(
  forwardRef(
    (
      {
        data,
        typeSpec,
        onCanvas = false,
        interactionDisabled = false,
        bounded = false,
        highlightColor,
        context,
        fieldInfo,
        parentId,
        progress,
        limitedRender,
        style,
      },
      ref
    ) => {
      const [contextMenu, setContextMenu] = useState(null);

      const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
          contextMenu === null
            ? {
                mouseX: event.clientX + 2,
                mouseY: event.clientY - 6,
              }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other native context menus might behave different.
              // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
              null
        );
        event.stopPropagation();
      };

      const handleContextMenuClose = () => {
        setContextMenu(null);
      };

      // console.log("rerender", data);

      const blockSpec =
        data && data.dataType === DATA_TYPES.REFERENCE
          ? typeSpec.referenceBlock
          : data && data.dataType === DATA_TYPES.CALL
          ? typeSpec.callBlock
          : data
          ? typeSpec.instanceBlock
          : {};

      const [isCollapsed, setIsCollapsed] = useState(false);
      const [isDebugging, setIsDebugging] = useState(false);

      if (data.dataType === DATA_TYPES.CALL) {
        console.log(data)
      }

      const setIsEditing = useProgrammingStore(
        (store) => store.updateItemEditing,
        shallow
      );
      const setIsSelected = useProgrammingStore(
        (store) => store.updateItemSelected,
        shallow
      );
      const onClick = useProgrammingStore((state) => state.onVPEClick, shallow);

      const locked = useProgrammingStore((state) => state.locked, shallow);

      const minified =
        blockSpec.minified && data.dataType === DATA_TYPES.INSTANCE;

      const simpleProperties =
        typeSpec && typeSpec.properties
          ? pickBy(
              typeSpec.properties,
              (entry) =>
                Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type) &&
                !UNRENDERED_PROPS.includes(entry.type)
            )
          : {};
      const standardProperties =
        typeSpec && typeSpec.properties
          ? omitBy(typeSpec.properties, (entry) =>
              Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type)
            )
          : {};

      const dataType = data ? data.dataType : null;

      const name = [DATA_TYPES.CALL, DATA_TYPES.REFERENCE].includes(dataType)
        ? data?.refData?.name
        : data?.name;

      const editing = (data && data.editing) || (data && data.refData?.editing);
      const selected =
        (data && data.selected) || (data && data.refData?.selected);
      const canDragBlockRFR =
        onCanvas && blockSpec.onCanvas && !editing && !locked;

      if (!data) {
        return null;
      }

      const inDrawer = parentId === "spawner";

      return (
        <OuterBlockContainer
          onClick={(e) => {
            onClick(data);
            e.stopPropagation();
          }}
          className={canDragBlockRFR ? null : "nodrag"}
          ref={ref}
          onContextMenu={handleContextMenu}
          bounded={bounded}
          style={style}
        >
          <InnerBlockContainer
            minified={minified}
            selected={selected}
            color={blockSpec.color}
          >
            {!limitedRender && (
              <Menu
                key={`${data.id}-contextmenu`}
                open={contextMenu !== null}
                onClose={handleContextMenuClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
              >
                <RightClickMenu
                  key={`${data.id}-inner-contextmenu`}
                  highlightColor={highlightColor}
                  fieldInfo={fieldInfo}
                  parentId={parentId}
                  interactionDisabled={interactionDisabled}
                  data={data}
                  blockSpec={blockSpec}
                  isEditing={editing}
                  isCollapsed={isCollapsed}
                  isSelected={selected}
                  isDebugging={isDebugging}
                  setIsEditing={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => setIsEditing(data.ref, v)
                      : (v) => setIsEditing(data.id, v)
                  }
                  setIsSelected={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => {
                          // console.log(data);
                          setIsSelected(data.ref, v);
                        }
                      : (v) => {
                          // console.log(data);
                          setIsSelected(data.id, v);
                        }
                  }
                  setIsCollapsed={setIsCollapsed}
                  setIsDebugging={setIsDebugging}
                />
              </Menu>
            )}
            {/* The 'Selectable' component just handles the highlighting, but is essentially a div */}
            <Stack
              justifyContent="space-between"
              className={canDragBlockRFR ? null : "nodrag"}
              alignItems="center"
              spacing={1}
              direction="row"
              sx={{
                display: "flex",
                margin: minified ? "1px" : "4px",
              }}
            >
              {/* The header, includes the name/text field and the extra bar */}
              {!minified && (
                <BlockHeader
                  id={data.id}
                  highlightColor={highlightColor}
                  progress={progress}
                  color={blockSpec.color}
                  limitedRender={limitedRender}
                  editing={data.editing}
                  nameId={data.refData ? data.refData.id : data.id}
                  name={name}
                  canDragBlockRFR={canDragBlockRFR}
                  icon={blockSpec.icon ? blockSpec.icon : FiSquare}
                />
              )}

              {minified && (
                <FullWidthStack>
                  <MinifiedBar
                    id={data.id}
                    propertyInfo={typeSpec.properties}
                    properties={data.properties}
                    canDragBlockRFR={canDragBlockRFR}
                    interactionDisabled={interactionDisabled}
                    highlightColor={highlightColor}
                    context={context}
                    bounded={inDrawer}
                    limitedRender={limitedRender}
                  />
                </FullWidthStack>
              )}

              {blockSpec?.extras && !limitedRender && (
                <ExtraBar
                  inDrawer={inDrawer}
                  highlightColor={highlightColor}
                  fieldInfo={fieldInfo}
                  parentId={parentId}
                  interactionDisabled={interactionDisabled}
                  data={data}
                  blockSpec={blockSpec}
                  isEditing={editing}
                  isCollapsed={isCollapsed}
                  isSelected={selected}
                  isDebugging={isDebugging}
                  setIsEditing={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => setIsEditing(data.ref, v)
                      : (v) => setIsEditing(data.id, v)
                  }
                  setIsSelected={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => {
                          // console.log(data);
                          setIsSelected(data.ref, v);
                        }
                      : (v) => {
                          // console.log(data);
                          setIsSelected(data.id, v);
                        }
                  }
                  setIsCollapsed={setIsCollapsed}
                  setIsDebugging={setIsDebugging}
                />
              )}
            </Stack>

            {/* Add Connection Info/Handles here for blocks */}
            {onCanvas && (
              <>
                {["top", "bottom", "left", "right"]
                  .filter((position) => blockSpec.connections?.[position])
                  .map((position) => (
                    <ConnectionHandle
                      key={position}
                      nodeData={data}
                      position={position}
                      direction={blockSpec.connections[position].direction}
                      allowed={blockSpec.connections[position].allowed}
                      highlightColor={highlightColor}
                    />
                  ))}
              </>
            )}

            {/* If the block is a function instance (the actual function and not a call) then render the spawn area for arguments */}
            <Collapse in={!isCollapsed && !minified} orientation="vertical">
              <Box>
                {data.dataType === DATA_TYPES.INSTANCE &&
                  typeSpec.type === TYPES.FUNCTION &&
                  data.arguments &&
                  Object.keys(data.arguments).length > 0 && (
                    <Stack
                      spacing={0.5}
                      direction="column"
                      style={{
                        borderRadius: 4,
                        display: "flex",
                        margin: 4,
                        padding: 5,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      {data.argumentBlockData.map((argBlockData, argIdx) => (
                        <Block
                          key={argIdx}
                          staticData={argBlockData}
                          parentId={data.id}
                          bounded
                          highlightColor={highlightColor}
                          context={context}
                          fieldInfo={{
                            name: "",
                            value: null,
                            accepts: [],
                            isSpawner: true,
                          }}
                        />
                      ))}
                    </Stack>
                  )}

                {/* If the block has simple parameters, show them in a collapse block */}
                {!limitedRender &&
                  Object.keys(simpleProperties).length > 0 &&
                  data.dataType === DATA_TYPES.INSTANCE && (
                    <SettingsSection
                      id={data.id}
                      interactionDisabled={interactionDisabled}
                      simpleProperties={simpleProperties}
                      properties={data.properties}
                    />
                  )}
                {/* If the block is a function call (the call and not the actual function instance) then show the argument fields */}
                {data.dataType === DATA_TYPES.CALL &&
                  data.argumentBlockData.map((argInfo, argIdx) => {
                    return (
                      <PropertySection key={`arg-${argIdx}`}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            color="#eee"
                            style={{ margin: "2px 2px 2px 5px" }}
                          >
                            {argInfo.name}
                          </Typography>
                          <DropZone
                            id={data.properties[argInfo.ref]}
                            fieldInfo={{
                              name: "",
                              value: argInfo.ref,
                              accepts: [argInfo.type],
                            }}
                            parentId={data.id}
                            interactionDisabled={interactionDisabled}
                            highlightColor={highlightColor}
                            context={context}
                          />
                        </Stack>
                      </PropertySection>
                    );
                  })}
                {/* For all properties of an instance, show the fields */}
                {data.dataType === DATA_TYPES.INSTANCE &&
                  Object.entries(standardProperties)?.map(
                    ([fieldKey, fieldInfo]) => {
                      const innerLabel = !fieldInfo.fullWidth
                        ? fieldInfo.name
                        : "";
                      return (
                        <PropertySection key={fieldKey}>
                          <Stack
                            key={fieldKey}
                            direction="row"
                            sx={{
                              alignItems: "center",
                              justify: "space-between",
                            }}
                          >
                            {!fieldInfo.fullWidth && (
                              <Typography
                                color="#eee"
                                style={{ margin: "2px 2px 2px 5px" }}
                              >
                                {innerLabel}
                              </Typography>
                            )}
                            {fieldInfo.isList ? (
                              <List
                                ids={data.properties[fieldKey]}
                                fieldInfo={{ ...fieldInfo, value: fieldKey }}
                                parentId={data.id}
                                interactionDisabled={interactionDisabled}
                                highlightColor={highlightColor}
                                context={context}
                                limitedRender={limitedRender}
                              />
                            ) : (
                              <DropZone
                                id={data.properties[fieldKey]}
                                fieldInfo={{
                                  ...fieldInfo,
                                  value: fieldKey,
                                  name: !fieldInfo.fullWidth
                                    ? ""
                                    : fieldInfo.name,
                                }}
                                parentId={data.id}
                                interactionDisabled={interactionDisabled}
                                highlightColor={highlightColor}
                                context={context}
                                limitedRender={limitedRender}
                              />
                            )}
                          </Stack>
                        </PropertySection>
                      );
                    }
                  )}
              </Box>
            </Collapse>

            {/* Just a utility for showing the data in each node, will likely remove. */}
            <Collapse in={isDebugging} orientation="vertical">
              {isDebugging && (
                <DebugSection
                  interactionDisabled={interactionDisabled}
                  data={data}
                />
              )}
            </Collapse>
          </InnerBlockContainer>
        </OuterBlockContainer>
      );
    }
  ),
  // Prevent re-renders when the position moves
  (previous, next) => {
    const previousRender = pick(previous, ATTENDED_RENDER_PROPS);
    const nextRender = pick(next, ATTENDED_RENDER_PROPS);
    const propInfo = next.typeSpec.properties;
    if (!isEqual(previousRender, nextRender)) {
      return false;
    } else return compareBlockData(previous.data, next.data, propInfo);
  }
);
