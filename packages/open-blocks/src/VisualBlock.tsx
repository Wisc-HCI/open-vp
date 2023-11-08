import React, { memo, useState, forwardRef, useCallback, Ref } from "react";
import { DropZone } from "./components/DropZone";
import { List } from "./components/List";
// import {
//   DATA_TYPES,
//   TYPES,
//   SIMPLE_PROPERTY_TYPES,
//   UNRENDERED_PROPS,
//   ATTENDED_RENDER_PROPS,
//   CLIPBOARD_ACTION,
// } from "../Constants";
import { FiSquare } from "react-icons/fi";
import {
  useProgrammingStore,
  TypeSpec,
  BlockData,
  ExecutionState,
  BlockSpec,
  ObjectTypeSpec,
  FunctionTypeSpec,
  ProgrammingState,
  RegionInfo,
  SPAWNER,
  CANVAS,
  OUTSIDE,
  BlockFieldInfo,
  SimpleFieldInfo,
  MetaType,
  ConnectionDirection,
  PropertyType,
  ObjectData,
  FunctionCallData,
  FunctionDeclarationData,
  FieldInfo,
} from "@people_and_robots/open-core";
import { ExtraBar, RightClickMenu } from "./components/extras/ExtraBar";
import { DebugSection } from "./components/DebugSection";
import { Block } from "./Block";
import { pickBy, omitBy, pick, isEqual } from "lodash";
import { ConnectionHandle } from "./components/ConnectionHandle";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import {
  Collapse,
  Box,
  Stack,
  Card,
  alpha,
  useTheme,
} from "@mui/material";
import {
  BlockContainer,
  DraggablePaperComponent,
  FullWidthStack,
  PropertySection,
} from "./components/BlockContainers";
import { BlockHeader } from "./components/BlockHeader";
import { MinifiedBar } from "./components/MinifiedBar";
import { SettingsSection } from "./components/SettingsSection";
import { Doc } from "./components/Doc";
import { NodeToolbar, Position } from "reactflow";
import { motion } from "framer-motion";
import { NestedContextMenu, Dialog } from "@people_and_robots/open-gui";
import {
  MenuData,
  MenuSection,
  extrasToDropdown,
} from "./components/MenuSection";
import { flattenMenuOnce } from "./util";

const UNRENDERED_PROPS = ["IGNORED", "METADATA"];
const SIMPLE_PROPERTY_TYPES = [
  "BOOLEAN",
  "NUMBER",
  "STRING",
  "OPTIONS",
  "IGNORED",
  "METADATA",
  "VECTOR3",
];

export interface VisualBlockProps {
  data: BlockData;
  refData?: BlockData;
  typeSpec: TypeSpec;
  interactionDisabled?: boolean;
  bounded?: boolean;
  context?: string[];
  regionInfo: RegionInfo;
  progress?: ExecutionState;
  limitedRender?: boolean;
  copyFn?: () => void;
  cutFn?: () => void;
  style?: React.CSSProperties;
}

const validateProp = (data: BlockData, fieldInfo: FieldInfo) => {
  if (fieldInfo.type !== PropertyType.Block) return false;
  if (data.metaType === MetaType.FunctionCall && fieldInfo.isFunctionArgument)
    return true;
  if (
    data.metaType === MetaType.FunctionDeclaration &&
    !fieldInfo.isFunctionArgument
  )
    return true;
  if (data.metaType === MetaType.ObjectInstance) return true;
  return false;
};

export const VisualBlock = forwardRef(
  (
    {
      data,
      refData = undefined,
      typeSpec,
      interactionDisabled = false,
      bounded = false,
      context,
      regionInfo,
      progress,
      limitedRender,
      copyFn = () => {},
      cutFn = () => {},
      style,
    }: VisualBlockProps,
    ref: Ref<HTMLElement | SVGElement> | undefined
  ) => {
    // const fieldInfo = regionInfo.fieldInfo as BlockFieldInfo;
    const onCanvas = regionInfo.parentId === CANVAS;
    const inDrawer = regionInfo.parentId === SPAWNER;
    const external = regionInfo.parentId === OUTSIDE;

    const blockSpec: BlockSpec | undefined =
      data.metaType === MetaType.ObjectInstance
        ? (typeSpec as ObjectTypeSpec).instanceBlock
        : data.metaType === MetaType.ObjectReference
        ? (typeSpec as ObjectTypeSpec).referenceBlock
        : data.metaType === MetaType.FunctionDeclaration
        ? (typeSpec as FunctionTypeSpec).functionBlock
        : data.metaType === MetaType.FunctionCall
        ? (typeSpec as FunctionTypeSpec).callBlock
        : data.metaType === MetaType.Argument
        ? (typeSpec as ObjectTypeSpec).referenceBlock
        : undefined;

    if (!blockSpec) {
      throw new Error(
        `Missing BlockSpec for Visual Block ${data.type}, ${data.metaType}`
      );
    }

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDebugging, setIsDebugging] = useState(false);

    const setIsEditing = useProgrammingStore(
      (state: ProgrammingState) => state.updateItemEditing
    );
    const setIsSelected = useProgrammingStore(
      (state: ProgrammingState) => state.updateItemSelected
    );
    const typeSpecs = useProgrammingStore(
      (state: ProgrammingState) => state.programSpec.objectTypes
    );

    const docActive = useProgrammingStore(
      (state: ProgrammingState) => state.activeDoc === data.id
    );
    const setDocActive = useProgrammingStore(
      (state: ProgrammingState) => state.setActiveDoc
    );

    const deleteBlock = useProgrammingStore(
      (state: ProgrammingState) => state.deleteBlock
    );

    const isCopying = useProgrammingStore(
      useCallback(
        (state) =>
          state.clipboard?.block?.id === data.id &&
          state.clipboard.action === "COPY",
        [data.id]
      )
    );

    const onClick = useProgrammingStore((state) => state.onVPEClick);

    const theme = useTheme();

    // const locked = useProgrammingStore((state) => state.locked);

    const minified =
      blockSpec.minified && data.metaType === MetaType.ObjectInstance;

    const simpleProperties =
      typeSpec && typeSpec.properties
        ? (pickBy(
            typeSpec.properties,
            (entry) =>
              Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type) &&
              !UNRENDERED_PROPS.includes(entry.type)
          ) as { [key: string]: SimpleFieldInfo })
        : {};

    const standardProperties: { [key: string]: BlockFieldInfo } =
      typeSpec && typeSpec.properties
        ? (pickBy(typeSpec.properties, (entry) =>
            validateProp(data, entry)
          ) as {
            [key: string]: BlockFieldInfo;
          })
        : {};

    const name: string = refData?.name || data.name || "";

    const editing = (data && data.editing) || (data && refData?.editing);
    const selected = (data && data.selected) || (data && refData?.selected);
    const canDragBlockRFR = onCanvas && blockSpec.onCanvas && !editing;

    if (!data || !blockSpec) {
      return null;
    }

    // console.log(ref?.current)
    const menuData: MenuData & BlockData = {
      ...data,
      blockSpec,
      isCollapsed,
      isSelected: data.selected,
      docActive,
      isDebugging,
    };

    return (
      <NestedContextMenu
        data={menuData}
        inner={
          extrasToDropdown(
            flattenMenuOnce(blockSpec.extras),
            copyFn,
            cutFn,
            () => deleteBlock(data, regionInfo.parentId, regionInfo.fieldInfo),
            setIsDebugging,
            setIsSelected,
            setDocActive,
            setIsCollapsed,
            (id: string, type: string) => {},
            {},
            typeSpecs,
            interactionDisabled
          ) || []
        }
      >
        <BlockContainer
          // contentEditable
          ref={ref}
          onBlur={()=>{
            console.log("blur")
          }}
          aria-labelledby={`${name} (${data.metaType})`}
          onClick={(e) => {
            onClick(data);
            // setClipboardBlock({data,fieldInfo,parentId,onCanvas,context});
            e.stopPropagation();
          }}
          onDoubleClick={(e) => {
            if (
              data.metaType === "OBJECT-REFERENCE" ||
              data.metaType === "FUNCTION-CALL"
            ) {
              setIsSelected(data.ref, !selected);
            } else {
              setIsSelected(data.id, !selected);
            }
            e.stopPropagation();
          }}
          // onMouseEnter={()=>console.log('enter')}
          // onMouseLeave={()=>console.log('leave')}
          className={canDragBlockRFR ? undefined : "nodrag"}
          // onContextMenu={(e)=>e.stopPropagation()}
          bounded={bounded}
          minified={minified}
          selected={selected}
          focused={isCopying}
          color={blockSpec.color}
          style={style}
        >
          {/* {!inDrawer && !external && (
          <NodeToolbar
            className="nodrag nopan"
            isVisible={docActive && !limitedRender}
            position={Position.Right}
          >
            <MotionCard
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -10 },
              }}
              initial="hidden"
              animate={docActive && !limitedRender ? "visible" : "hidden"}
              sx={{
                backgroundColor: "rgba(0,0,0,0.52)",
                WebkitBackdropFilter: "blur(15px)",
                backdropFilter: "blur(15px)",
              }}
            >
              <Doc data={data} typeSpec={typeSpec} />
            </MotionCard>
          </NodeToolbar>
        )} */}

          {/* {!limitedRender && (
              <FancyMenu
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
                  fieldInfo={fieldInfo}
                  parentId={parentId}
                  copyFn={copyFn}
                  cutFn={cutFn}
                  interactionDisabled={interactionDisabled}
                  data={data}
                  blockSpec={blockSpec}
                  isEditing={editing}
                  isCollapsed={isCollapsed}
                  isSelected={selected}
                  isDebugging={isDebugging}
                  docActive={docActive}
                  setDocActive={(v) => setDocActive(data.id, v)}
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
              </FancyMenu>
            )} */}
          {/* The 'Selectable' component just handles the highlighting, but is essentially a div */}
          <Stack
            justifyContent="space-between"
            className={canDragBlockRFR ? undefined : "nodrag"}
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
                progress={progress}
                color={blockSpec.color}
                limitedRender={limitedRender}
                nameId={refData ? refData.id : data.id}
                name={name}
                icon={blockSpec.icon ? blockSpec.icon : FiSquare}
                editing={data.editing}
                setIsEditing={
                  data.metaType === MetaType.ObjectReference ||
                  data.metaType === MetaType.FunctionCall
                    ? (v) => setIsEditing(data.ref, v)
                    : (v) => setIsEditing(data.id, v)
                }
                // canEdit={data.canEdit}
              />
            )}

            {minified && (
              <FullWidthStack>
                {/* <MinifiedBar
                    id={data.id}
                    propertyInfo={typeSpec.properties}
                    properties={data.properties}
                    canDragBlockRFR={canDragBlockRFR}
                    interactionDisabled={interactionDisabled}
                    context={context}
                    bounded={inDrawer}
                    limitedRender={limitedRender}
                  /> */}
              </FullWidthStack>
            )}

            {blockSpec.extras && !limitedRender && (
              <MenuSection
                data={data}
                inDrawer={inDrawer}
                copyFn={copyFn}
                cutFn={cutFn}
                deleteFn={() =>
                  deleteBlock(data, regionInfo.parentId, regionInfo.fieldInfo)
                }
                interactionDisabled={interactionDisabled}
                blockSpec={blockSpec}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isSelected={selected}
                setIsSelected={
                  data.metaType === MetaType.ObjectReference ||
                  data.metaType === MetaType.FunctionCall
                    ? (v: boolean) => {
                        // console.log(data);
                        setIsSelected(data.ref, v);
                      }
                    : (v: boolean) => {
                        // console.log(data);
                        setIsSelected(data.id, v);
                      }
                }
                docActive={docActive}
                setDocActive={(v: boolean) => setDocActive(data.id, v)}
                isDebugging={isDebugging}
                setIsDebugging={setIsDebugging}
              />
            )}

            {
              blockSpec?.extras && !limitedRender && null
              // <ExtraBar
              //   inDrawer={inDrawer}
              //   fieldInfo={fieldInfo}
              //   parentId={parentId}
              //   copyFn={copyFn}
              //   cutFn={cutFn}
              //   interactionDisabled={interactionDisabled}
              //   data={data}
              //   blockSpec={blockSpec}
              //   docActive={docActive}
              //   isEditing={editing}
              //   isCollapsed={isCollapsed}
              //   isSelected={selected}
              //   isDebugging={isDebugging}
              //   setDocActive={(v) => setDocActive(data.id, v)}
              //   setIsEditing={
              //     data.dataType === DATA_TYPES.REFERENCE ||
              //     data.dataType === DATA_TYPES.CALL
              //       ? (v) => setIsEditing(data.ref, v)
              //       : (v) => setIsEditing(data.id, v)
              //   }
              //   setIsSelected={
              //     data.dataType === DATA_TYPES.REFERENCE ||
              //     data.dataType === DATA_TYPES.CALL
              //       ? (v) => {
              //           // console.log(data);
              //           setIsSelected(data.ref, v);
              //         }
              //       : (v) => {
              //           // console.log(data);
              //           setIsSelected(data.id, v);
              //         }
              //   }
              //   setIsCollapsed={setIsCollapsed}
              //   setIsDebugging={setIsDebugging}
              // />
            }
          </Stack>

          {/* Add Connection Info/Handles here for blocks */}
          {onCanvas && (
            <>
              {[Position.Top, Position.Bottom, Position.Left, Position.Right]
                .filter((position) => blockSpec.connections?.[position])
                .map((position) => (
                  <ConnectionHandle
                    key={position}
                    nodeData={data}
                    position={position}
                    blockSpec={blockSpec}
                    direction={
                      blockSpec.connections?.[position]?.direction ||
                      ConnectionDirection.Inbound
                    }
                    // allowed={blockSpec.connections?.[position]?.allowed || []}
                  />
                ))}
            </>
          )}

          <Dialog
            // id={`${data.id}-doc`}
            isOpen={(docActive && !limitedRender) || false}
            onStateChange={(state) => setDocActive(data.id, state)}
            // onClose={() => setDocActive(data.id, false)}
            // aria-labelledby="doc-dialog"
            // PaperComponent={DraggablePaperComponent}
            // sx={{ marign: 0, backgroundColor: "transparent" }}
          >
            {/* <MotionCard
              style={{
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                WebkitBackdropFilter: "blur(15px)",
                backdropFilter: "blur(15px)",
              }}
            > */}
              <Doc data={data} typeSpec={typeSpec} />
            {/* </MotionCard> */}
          </Dialog>

          {/* If the block is a function instance (the actual function and not a call) then render the spawn area for arguments */}
          <Collapse in={!isCollapsed && !minified} orientation="vertical">
            <Box>
              {data.metaType === MetaType.FunctionDeclaration &&
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
                    {data.arguments.map((argBlockId, argIdx) => (
                      <Block
                        key={argIdx}
                        id={argBlockId}
                        regionInfo={{
                          parentId: SPAWNER,
                          fieldInfo: {
                            id: argBlockId,
                            name: argBlockId,
                            accepts: [],
                            default: null,
                            isList: false,
                            fullWidth: false,
                            type: PropertyType.Block,
                          },
                        }}
                        bounded
                        context={context || []}
                      />
                    ))}
                  </Stack>
                )}

              {/* If the block has simple parameters, show them in a collapse block */}
              {!limitedRender &&
                Object.keys(simpleProperties).length > 0 &&
                data.metaType === MetaType.ObjectInstance && (
                  <SettingsSection
                    id={data.id}
                    interactionDisabled={interactionDisabled}
                    simpleProperties={simpleProperties}
                    properties={data.properties}
                  />
                )}

              {/* For all properties of an instance, show the fields */}
              {(data.metaType === MetaType.ObjectInstance ||
                data.metaType === MetaType.FunctionCall ||
                data.metaType === MetaType.FunctionDeclaration) &&
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
                              ids={
                                (
                                  data as
                                    | ObjectData
                                    | FunctionCallData
                                    | FunctionDeclarationData
                                ).properties[fieldKey]
                              }
                              regionInfo={{
                                parentId: data.id,
                                fieldInfo,
                              }}
                              interactionDisabled={interactionDisabled}
                              context={context || []}
                              limitedRender={limitedRender || false}
                            />
                          ) : (
                            <DropZone
                              id={
                                (data as ObjectData | FunctionCallData)
                                  .properties[fieldKey]
                              }
                              regionInfo={{
                                parentId: data.id,
                                fieldInfo,
                              }}
                              hideText={!fieldInfo.fullWidth}
                              interactionDisabled={
                                interactionDisabled || inDrawer
                              }
                              context={context || []}
                              limitedRender={limitedRender || false}
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
                data={{ data, typeSpec }}
              />
            )}
          </Collapse>
        </BlockContainer>
      </NestedContextMenu>
    );
  }
);
// Prevent re-renders when the position moves
// (previous, next) => {
//   const previousRender = pick(previous, ATTENDED_RENDER_PROPS);
//   const nextRender = pick(next, ATTENDED_RENDER_PROPS);
//   const propInfo = next.typeSpec.properties;
//   if (!isEqual(previousRender, nextRender)) {
//     return false;
//   } else return compareBlockData(previous.data, next.data, propInfo);
// }
// );
