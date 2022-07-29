import React, { memo } from "react";
import { useState } from "react";
import { DropZone } from "./DropZone";
import { List } from "./List";
import { forwardRef } from "react";
import { DATA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../Constants";
import { FiSquare } from "react-icons/fi";
import {
  Box,
  Button,
  Text,
  // RadioButtonGroup,
  Stack,
  Collapsible,
} from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { ExtraBar, RightClickMenu } from "./ExtraBar";
import { Selectable } from "./Selectable";
import { Block } from ".";
import { pickBy, omitBy } from "lodash";
import { ExpandCarrot } from "./ExpandCarrot";
import { ProgressBar } from "./Progress";
import { ConnectionHandle } from "./ConnectionHandle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import { NumberInput, ScrollRegion } from "./Utility";

export const VisualBlock = memo(
  forwardRef(
    (
      {
        data,
        x,
        y,
        scale,
        typeSpec,
        onCanvas = false,
        interactionDisabled = false,
        bounded = false,
        highlightColor,
        context,
        fieldInfo,
        parentId,
        style = {},
        progress,
        limitedRender,
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

      // console.log(data);

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
      const [simplePropertiesCollapsed, setSimplePropertiesCollapsed] =
        useState(true);

      // const setModalBlock = useProgrammingStore((store)=>store.setModalBlock);
      const updateItemName = useProgrammingStore(
        (store) => store.updateItemName
      );
      const setIsEditing = useProgrammingStore(
        (store) => store.updateItemEditing
      );
      const setIsSelected = useProgrammingStore(
        (store) => store.updateItemSelected
      );
      const updateItemSimpleProperty = useProgrammingStore(
        (store) => store.updateItemSimpleProperty
      );
      const onClick = useProgrammingStore((state) => state.onVPEClick);
      const setLocked = useProgrammingStore((state) => state.setLocked);
      const locked = useProgrammingStore((state) => state.locked);

      const minified =
        blockSpec.minified && data.dataType === DATA_TYPES.INSTANCE;

      const simpleProperties =
        typeSpec && typeSpec.properties
          ? pickBy(
              typeSpec.properties,
              (entry) =>
                Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type) &&
                entry.type !== SIMPLE_PROPERTY_TYPES.IGNORED
            )
          : {};
      const standardProperties =
        typeSpec && typeSpec.properties
          ? omitBy(typeSpec.properties, (entry) =>
              Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type)
            )
          : {};

      const Icon = blockSpec.icon ? blockSpec.icon : FiSquare;

      const dataType = data ? data.dataType : null;

      const name = [DATA_TYPES.CALL, DATA_TYPES.REFERENCE].includes(dataType)
        ? data?.refData?.name
        : data?.name;

      const editing = (data && data.editing) || (data && data.refData?.editing);
      const selected =
        (data && data.selected) || (data && data.refData?.selected);
      const canDragBlockRFR =
        onCanvas && blockSpec.onCanvas && !editing && !locked;
      // console.log("canDrag", { canDragBlockRFR, data, onCanvas, blockspecCanvas:blockSpec.onCanvas, editing, locked });

      const stopPropFn = (e) => {
        e.stopPropagation();
      };
      const stopPropArgs = {
        onClick: stopPropFn,
        onMouseDown: stopPropFn,
        onDrag: stopPropFn,
        // focusIndicator: false,
        // hoverIndicator: false
      };

      if (!data) {
        return null;
      }

      const inDrawer = parentId === "spawner";

      return (
        <Selectable
          // role="Handle"
          // onDoubleClick={(e)=>{
          //   console.log('double click',{id:data.id,context});
          //   setModalBlock(data.id,context);
          //   e.stopPropagation()
          // }}
          onClick={(e) => {
            onClick(data);
            e.stopPropagation();
          }}
          selected={selected}
          highlightColor={highlightColor}
          className={canDragBlockRFR ? null : "nodrag"}
          ref={ref}
          style={{
            minWidth: 175,
            width: bounded ? "inherit" : "max-content",
            backgroundColor: blockSpec.color,
            borderRadius: 3,
            padding: minified ? 0 : 4,
            display: "block",
            flex: bounded ? 1 : null,
            transform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${
              scale ? scale : 1
            })`,
            WebkitTransform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${
              scale ? scale : 1
            })`,
            ...style,
          }}
          onContextMenu={handleContextMenu}
        >
          {!limitedRender && (
            <Menu
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
          <Box
            className={canDragBlockRFR ? null : "nodrag"}
            flex
            gap="xsmall"
            direction="row"
            justify="between"
            margin={`${minified ? 1 : 4}pt`}
            alignContent="between"
            align="center"
          >
            {/* The header, includes the name/text field and the extra bar */}
            {!minified && (
              <Box flex align="center" direction="row" gap="xsmall">
                {!limitedRender ? (
                  <Stack anchor="center" alignSelf="center">
                    <Box
                      align="center"
                      justify="center"
                      {...stopPropArgs}
                      style={{
                        backgroundColor: "#22222299",
                        color: "white",
                        padding: 9,
                        borderRadius: 5,
                        boxShadow: `0 0 0 1px #dddddd55`,
                        height: "39px",
                        width: "39px",
                      }}
                    >
                      <Icon />
                    </Box>
                    <div style={{ height: 30, width: 30 }}>
                      <ProgressBar progress={progress} color={highlightColor} />
                    </div>
                  </Stack>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    height="39px"
                    width="39px"
                    sx={{ borderRadius: 1, bgcolor: "#22222299" }}
                  />
                )}

                <Box flex>
                  {!limitedRender ? (
                    <Tooltip
                      title={name ? name : ""}
                      enterDelay={2000}
                      arrow
                      placement="top"
                      sx={{ color: blockSpec.color, fontSize: 50 }}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: 'common.black',
                            color: blockSpec.color,
                            fontSize:14,
                            '& .MuiTooltip-arrow': {
                              color: 'common.black',
                            },
                          },
                        },
                      }}
                    >
                      <TextField
                        // label='Name'
                        size="small"
                        margin="none"
                        variant="outlined"
                        color="highlightColor"
                        className={canDragBlockRFR ? null : "nodrag"}
                        onMouseEnter={editing ? (_) => setLocked(true) : null}
                        onMouseLeave={editing ? (_) => setLocked(false) : null}
                        disabled={!data.editing && !data.refData?.editing}
                        value={name ? name : ""}
                        onChange={(e) => {
                          updateItemName(
                            data.refData ? data.refData.id : data.id,
                            e.target.value
                          );
                        }}
                        InputProps={{
                          style: {
                            borderRadius: 5,
                            backgroundColor: editing
                              ? `${highlightColor}99`
                              : "#22222299",
                          },
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      height="39px"
                      width="flex"
                      sx={{ borderRadius: 1, bgcolor: "#22222299" }}
                    />
                  )}
                </Box>
              </Box>
            )}

            {minified && limitedRender && (
              <Skeleton
                variant="rectangular"
                height="39px"
                width="flex"
                sx={{ borderRadius: 1, bgcolor: "#22222299" }}
              />
            )}

            {minified && !limitedRender && (
              <>
                <ScrollRegion
                  className={canDragBlockRFR ? null : "nodrag"}
                  width="100%"
                  horizontal
                >
                  <Box
                    className={canDragBlockRFR ? null : "nodrag"}
                    direction="row"
                    gap="xxsmall"
                    // pad={{ top: "none", bottom: "none", left: "xxsmall" }}
                    // border="right"
                    alignContent="center"
                    align="center"
                  >
                    {Object.entries(typeSpec.properties)?.map(
                      ([fieldKey, fieldInfo]) => {
                        if (
                          Object.values(SIMPLE_PROPERTY_TYPES).includes(
                            fieldInfo.type
                          ) &&
                          fieldInfo.type !== SIMPLE_PROPERTY_TYPES.IGNORED
                        ) {
                          if (
                            fieldInfo.type === SIMPLE_PROPERTY_TYPES.OPTIONS
                          ) {
                            // const currentText = fieldInfo.options
                            //   .filter(
                            //     (option) =>
                            //       option.value === data.properties[fieldKey]
                            //   )
                            //   .map((option) => option.label)[0];
                            return (
                              <Tooltip
                                key={fieldKey}
                                title={
                                  <Typography>{fieldInfo.name}</Typography>
                                }
                                arrow
                                placement="bottom"
                              >
                                <Select
                                  key={fieldKey}
                                  label={fieldInfo.name}
                                  disabled={interactionDisabled}
                                  size="small"
                                  color="highlightColor"
                                  value={data.properties[fieldKey]}
                                  onChange={(e) =>
                                    updateItemSimpleProperty(
                                      data.id,
                                      fieldKey,
                                      e.target.value
                                    )
                                  }
                                >
                                  {fieldInfo.options.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Tooltip>
                            );
                          } else if (
                            fieldInfo.type === SIMPLE_PROPERTY_TYPES.BOOLEAN
                          ) {
                            return (
                              <Box
                                key={fieldKey}
                                style={{ minWidth: 70 }}
                                pad={{ left: "xsmall", right: "xsmall" }}
                                justify="center"
                              >
                                <Tooltip
                                  key={fieldKey}
                                  title={
                                    <Typography>{fieldInfo.name}</Typography>
                                  }
                                  arrow
                                  placement="bottom"
                                >
                                  {/* <Box
                                    // key="sliderContainer"
                                    background='red'
                                    pad={{left:'xsmall',right:'xsmall'}}
                                    // style={{ width: 80 }}
                                    // alignContent='center'
                                    focusIndicator={false}
                                  > */}
                                  <Switch
                                    checked={data.properties[fieldKey]}
                                    onChange={(event) =>
                                      updateItemSimpleProperty(
                                        data.id,
                                        fieldKey,
                                        event.target.checked
                                      )
                                    }
                                    color="highlightColor"
                                    disabled={interactionDisabled}
                                  />
                                  {/* </Box> */}
                                </Tooltip>
                              </Box>
                            );
                          } else if (
                            fieldInfo.type === SIMPLE_PROPERTY_TYPES.STRING
                          ) {
                            const currentValue = data.properties[fieldKey];
                            return (
                              <Box key={fieldKey} style={{ minWidth: 43 }}>
                                <Tooltip
                                  key={fieldKey}
                                  title={
                                    <Typography>{fieldInfo.name}</Typography>
                                  }
                                  arrow
                                  placement="bottom"
                                >
                                  <Box
                                    key={fieldKey}
                                    style={{ minWidth: 43, maxWidth: 100 }}
                                  >
                                    <TextField
                                      size="small"
                                      label={fieldInfo.name}
                                      color="highlightColor"
                                      className="nodrag"
                                      key={fieldKey}
                                      // placeholder={fieldInfo.name}
                                      onMouseEnter={(_) => setLocked(true)}
                                      onMouseLeave={(_) => setLocked(false)}
                                      value={currentValue ? currentValue : ""}
                                      disabled={interactionDisabled}
                                      onChange={(e) =>
                                        updateItemSimpleProperty(
                                          data.id,
                                          fieldKey,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Box>
                                </Tooltip>
                              </Box>
                            );
                          } else if (
                            fieldInfo.type === SIMPLE_PROPERTY_TYPES.NUMBER
                          ) {
                            return (
                              <Box key={fieldKey} style={{ minWidth: 40 }}>
                                <Tooltip
                                  key={fieldKey}
                                  title={
                                    <Typography>{fieldInfo.name}</Typography>
                                  }
                                  arrow
                                  placement="bottom"
                                >
                                  <Box
                                    key={fieldKey}
                                    style={{ minWidth: 43, maxWidth: 100 }}
                                  >
                                    <NumberInput
                                      label={fieldInfo.name}
                                      onMouseEnter={(_) => setLocked(true)}
                                      onMouseLeave={(_) => setLocked(false)}
                                      className="nodrag"
                                      key={fieldKey}
                                      style={{ width: 105, marginRight: 3 }}
                                      min={
                                        fieldInfo.min !== undefined
                                          ? fieldInfo.min
                                          : 0
                                      }
                                      max={
                                        fieldInfo.max !== undefined
                                          ? fieldInfo.max
                                          : 10
                                      }
                                      step={fieldInfo.step}
                                      suffix={fieldInfo.units}
                                      value={data.properties[fieldKey]}
                                      disabled={interactionDisabled}
                                      visualScaling={fieldInfo.visualScaling}
                                      onChange={(value) =>
                                        !interactionDisabled &&
                                        updateItemSimpleProperty(
                                          data.id,
                                          fieldKey,
                                          value
                                        )
                                      }
                                    />
                                  </Box>
                                </Tooltip>
                              </Box>
                            );
                          }
                        } else {
                          // const innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
                          return (
                            <Tooltip
                              key={fieldKey}
                              title={<Typography>{fieldInfo.name}</Typography>}
                              arrow
                              placement="bottom"
                            >
                              <Box key={fieldKey} focusIndicator={false}>
                                {fieldInfo.isList ? (
                                  <List
                                    limitedRender={limitedRender}
                                    ids={data.properties[fieldKey]}
                                    fieldInfo={{
                                      ...fieldInfo,
                                      value: fieldKey,
                                    }}
                                    parentId={data.id}
                                    interactionDisabled={interactionDisabled}
                                    highlightColor={highlightColor}
                                    context={context}
                                  />
                                ) : (
                                  <DropZone
                                    limitedRender={limitedRender}
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
                                  />
                                )}
                              </Box>
                            </Tooltip>
                          );
                        }
                        return null;
                      }
                    )}
                  </Box>
                </ScrollRegion>
              </>
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
          </Box>

          {/* <ProgressBar progress={progress} color={highlightColor} /> */}

          {/* If the block is a function instance (the actual function and not a call) then render the spawn area for arguments */}
          <Collapsible open={!isCollapsed && !minified}>
            <Box>
              {data.dataType === DATA_TYPES.INSTANCE &&
                typeSpec.type === TYPES.FUNCTION &&
                data.arguments &&
                Object.keys(data.arguments).length > 0 && (
                  <Box
                    gap="xsmall"
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
                  </Box>
                )}

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
              {/* If the block has simple parameters, show them in a collapse block */}
              {!limitedRender &&
                Object.keys(simpleProperties).length > 0 &&
                data.dataType === DATA_TYPES.INSTANCE && (
                  <Box
                    margin="xsmall"
                    background="#00000055"
                    round="xxsmall"
                    align="center"
                    justify="between"
                    direction="column"
                    pad="xsmall"
                    flex
                    gap={simplePropertiesCollapsed ? "none" : "xsmall"}
                  >
                    <Box
                      direction="row"
                      align="center"
                      justify="between"
                      flex
                      style={{ width: "100%" }}
                    >
                      <Text margin={{ left: "medium" }}>Settings</Text>
                      <Button
                        plain
                        style={{ padding: "5pt 10pt 5pt 10pt" }}
                        icon={
                          <ExpandCarrot expanded={!simplePropertiesCollapsed} />
                        }
                        onClick={
                          interactionDisabled
                            ? (e) => {
                                e.stopPropagation();
                              }
                            : (e) => {
                                setSimplePropertiesCollapsed(
                                  !simplePropertiesCollapsed
                                );
                                e.stopPropagation();
                              }
                        }
                      />
                    </Box>
                    <Box flex width="100%">
                      <Collapsible open={!simplePropertiesCollapsed}>
                        {Object.entries(simpleProperties).map(
                          ([propKey, propInfo]) => (
                            <Box
                              key={propKey}
                              direction="row"
                              background="#00000055"
                              round="xsmall"
                              flex
                              pad="small"
                              justify="between"
                              align="center"
                              margin={{ bottom: "xsmall" }}
                            >
                              <Text size="small" color="#ffffff">
                                {propInfo.name}
                              </Text>
                              {propInfo.type ===
                                SIMPLE_PROPERTY_TYPES.BOOLEAN && (
                                <Switch
                                  checked={data.properties[propKey]}
                                  onChange={(event) =>
                                    updateItemSimpleProperty(
                                      data.id,
                                      propKey,
                                      event.target.checked
                                    )
                                  }
                                  color="highlightColor"
                                  disabled={interactionDisabled}
                                />
                              )}
                              {propInfo.type ===
                                SIMPLE_PROPERTY_TYPES.NUMBER && (
                                <Box key={propKey} width="small" align="end">
                                  <NumberInput
                                    onMouseEnter={(_) => setLocked(true)}
                                    onMouseLeave={(_) => setLocked(false)}
                                    className="nodrag"
                                    min={
                                      propInfo.min !== undefined
                                        ? propInfo.min
                                        : 0
                                    }
                                    max={
                                      propInfo.max !== undefined
                                        ? propInfo.max
                                        : 10
                                    }
                                    style={{ width: 105 }}
                                    step={propInfo.step}
                                    suffix={propInfo.units}
                                    value={data.properties[propKey]}
                                    disabled={interactionDisabled}
                                    visualScaling={propInfo.visualScaling}
                                    onChange={(value) => {
                                      console.log(value);
                                      updateItemSimpleProperty(
                                        data.id,
                                        propKey,
                                        value
                                      );
                                    }}
                                  />
                                </Box>
                              )}
                              {propInfo.type ===
                                SIMPLE_PROPERTY_TYPES.STRING && (
                                <Box key={propKey} width="xsmall">
                                  <TextField
                                    className="nodrag"
                                    color="highlightColor"
                                    onMouseEnter={(_) => setLocked(true)}
                                    onMouseLeave={(_) => setLocked(false)}
                                    size="small"
                                    // style={{ color: "#00000088" }}
                                    value={
                                      data.properties[propKey]
                                        ? data.properties[propKey]
                                        : ""
                                    }
                                    disabled={interactionDisabled}
                                    onChange={(e) =>
                                      updateItemSimpleProperty(
                                        data.id,
                                        propKey,
                                        e.target.value
                                      )
                                    }
                                  />
                                </Box>
                              )}
                              {propInfo.type ===
                                SIMPLE_PROPERTY_TYPES.OPTIONS && (
                                <Select
                                  key={propKey}
                                  disabled={interactionDisabled}
                                  size="small"
                                  color="highlightColor"
                                  value={
                                    data.properties[propKey]
                                      ? data.properties[propKey]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    updateItemSimpleProperty(
                                      data.id,
                                      propKey,
                                      e.target.value
                                    )
                                  }
                                >
                                  {propInfo.options.map((option, optionIdx) => (
                                    <MenuItem
                                      key={optionIdx}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            </Box>
                          )
                        )}
                      </Collapsible>
                    </Box>
                  </Box>
                )}
              {/* If the block is a function call (the call and not the actual function instance) then show the argument fields */}
              {data.dataType === DATA_TYPES.CALL &&
                data.argumentBlockData.map((argInfo, argIdx) => {
                  return (
                    <Box
                      key={`arg-${argIdx}`}
                      direction="row"
                      margin="xsmall"
                      background="#ffffff20"
                      round="xxsmall"
                      alignContent="between"
                      align="center"
                      justify="between"
                      flex
                    >
                      <Box pad="xsmall" alignContent="center" align="center">
                        {argInfo.name}
                      </Box>
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
                    </Box>
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
                      <Box
                        key={fieldKey}
                        direction="row"
                        margin={fieldInfo.fullWidth ? "none" : "xsmall"}
                        background={fieldInfo.fullWidth ? null : "#ffffff20"}
                        round="xxsmall"
                        alignContent="between"
                        align="center"
                        justify="between"
                        flex
                      >
                        <Box
                          pad={fieldInfo.fullWidth ? "none" : "xsmall"}
                          alignContent="center"
                          align="center"
                        >
                          {innerLabel}
                        </Box>
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
                              name: !fieldInfo.fullWidth ? "" : fieldInfo.name,
                            }}
                            parentId={data.id}
                            interactionDisabled={interactionDisabled}
                            highlightColor={highlightColor}
                            context={context}
                            limitedRender={limitedRender}
                          />
                        )}
                      </Box>
                    );
                  }
                )}
            </Box>
          </Collapsible>

          {/* Just a utility for showing the data in each node, will likely remove. */}
          <Collapsible open={isDebugging}>
            <Box
              round="xsmall"
              pad="small"
              margin="xsmall"
              background="#00000044"
              style={{
                whiteSpace: "pre",
                color: "white",
                fontFamily: "monospace",
              }}
            >
              {JSON.stringify(
                {
                  ...data,
                  interactionDisabled: interactionDisabled ? true : false,
                },
                null,
                "  "
              )}
            </Box>
          </Collapsible>
        </Selectable>
      );
    }
  )
);
