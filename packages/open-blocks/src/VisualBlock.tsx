import React, { memo, useState, forwardRef, useCallback } from "react";
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
import { useProgrammingStore, TypeSpec, BlockData, ExecutionState, BlockSpec, ObjectTypeSpec, FunctionTypeSpec, ProgrammingState } from "@people_and_robots/open-core";
import { ExtraBar, RightClickMenu } from "./components/extras/ExtraBar";
import { DebugSection } from "./components/DebugSection";
import { Block } from "./Block";
import { pickBy, omitBy, pick, isEqual } from "lodash";
import { ConnectionHandle } from "./components/ConnectionHandle";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { Collapse, Box, Stack, Dialog, Card } from "@mui/material";
import {
  BlockContainer,
  FullWidthStack,
  PropertySection,
} from "./components/BlockContainers";
import { BlockHeader } from "./components/BlockHeader";
import { MinifiedBar } from "./components/MinifiedBar";
import { SettingsSection } from "./components/SettingsSection";
import { shallow } from "zustand/shallow";
import { FancyMenu } from "./components/Utility";
import { Doc } from "./components/Doc";
import { NodeToolbar } from "reactflow";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export interface VisualBlockProps {
  data: BlockData;
  typeSpec: TypeSpec;
  onCanvas?: boolean;
  interactionDisabled?: boolean;
  bounded?: boolean;
  context?: string[];
  fieldInfo?: any;
  parentId?: string;
  progress?: ExecutionState;
  limitedRender?: boolean;
  copyFn?: () => void;
  cutFn?: () => void;
  style?: any;
}

export const VisualBlock =
  forwardRef(
    (
      {
        data,
        typeSpec,
        onCanvas = false,
        interactionDisabled = false,
        bounded = false,
        context,
        fieldInfo,
        parentId,
        progress,
        limitedRender,
        copyFn = () => {},
        cutFn = () => {},
        style,
      }: VisualBlockProps,
      ref
    ) => {
      const inDrawer = parentId === "spawner";
      const external = parentId === "outside";


      const blockSpec: BlockSpec | undefined =
        data.metaType === "OBJECT-INSTANCE" ? (typeSpec as ObjectTypeSpec).instanceBlock
        : data.metaType === "OBJECT-REFERENCE" ? (typeSpec as ObjectTypeSpec).referenceBlock
        : data.metaType === "FUNCTION-DECLARATION" ? (typeSpec as FunctionTypeSpec).functionBlock
        : data.metaType === "FUNCTION-CALL" ? (typeSpec as FunctionTypeSpec).callBlock
        : data.metaType === "ARGUMENT" ? (typeSpec as ObjectTypeSpec).referenceBlock
        : undefined

      if (!blockSpec) {
        throw new Error(`Missing BlockSpec for Visual Block ${data.type}, ${data.metaType}`);
      }
        
      const [isCollapsed, setIsCollapsed] = useState(false);
      const [isDebugging, setIsDebugging] = useState(false);

      // const setIsEditing = useProgrammingStore(
      //   (store) => store.updateItemEditing
      // );
      const setIsSelected = useProgrammingStore(
        (state: ProgrammingState) => state.updateItemSelected
      );

      const docActive = useProgrammingStore(
        (store) => store.activeDoc === data.id
      );
      const setDocActive = useProgrammingStore(
        (store) => store.setActiveDoc
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

      // const locked = useProgrammingStore((state) => state.locked);

      const minified =
        blockSpec.minified && data.metaType === "OBJECT-INSTANCE";

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
        typeSpec && typeSpec.properties && typeSpec.type !== TYPES.FUNCTION
          ? omitBy(typeSpec.properties, (entry) =>
              Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type)
            )
          : typeSpec.type === TYPES.FUNCTION &&
            data.dataType === DATA_TYPES.CALL
          ? pickBy(typeSpec.properties, (entry) => entry.isFunctionArgument)
          : typeSpec.type === TYPES.FUNCTION &&
            data.dataType === DATA_TYPES.INSTANCE
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

      // console.log(ref?.current)

      return (
        <BlockContainer
          // contentEditable
          onClick={(e) => {
            onClick(data);
            // setClipboardBlock({data,fieldInfo,parentId,onCanvas,context});
            e.stopPropagation();
          }}
          onDoubleClick={(e) => {
            if (
              data.dataType === DATA_TYPES.REFERENCE ||
              data.dataType === DATA_TYPES.CALL
            ) {
              setIsSelected(data.ref, !selected);
            } else {
              setIsSelected(data.id, !selected);
            }

            e.stopPropagation();
          }}
          // onMouseEnter={()=>console.log('enter')}
          // onMouseLeave={()=>console.log('leave')}
          className={canDragBlockRFR ? null : "nodrag"}
          ref={ref}
          onContextMenu={handleContextMenu}
          bounded={bounded}
          minified={minified}
          selected={selected}
          focused={isCopying}
          color={blockSpec.color}
          style={style}
          whileHover={{
            transform: 'translateY(-1px)',
            boxShadow: '0px 0px 0px 2px #00000030, 0px 0px 0px 4px #00000030, 0px 0px 0px 6px #00000030',
          }}
        >
          {!inDrawer && !external && (
            <NodeToolbar
            className="nodrag nopan"
            isVisible={docActive && !limitedRender}
            position="right"
          >
            <MotionCard 
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -10 },
              }}
              initial="hidden"
              animate={
                docActive && !limitedRender
                  ? "visible"
                  : "hidden"
              }
              sx={{
                backgroundColor: 'rgba(0,0,0,0.52)',
                WebkitBackdropFilter: 'blur(15px)',
                backdropFilter: 'blur(15px)',
              }}
            >
              <Doc data={data} typeSpec={typeSpec}/>
            </MotionCard>
            
          </NodeToolbar>
          )}
          
          
            {!limitedRender && (
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
                  progress={progress}
                  color={blockSpec.color}
                  limitedRender={limitedRender}
                  editing={data.editing}
                  nameId={data.refData ? data.refData.id : data.id}
                  name={name}
                  canDragBlockRFR={canDragBlockRFR}
                  icon={blockSpec.icon ? blockSpec.icon : FiSquare}
                  setIsEditing={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => setIsEditing(data.ref, v)
                      : (v) => setIsEditing(data.id, v)
                  }
                  canEdit={data.canEdit}
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
                    context={context}
                    bounded={inDrawer}
                    limitedRender={limitedRender}
                  />
                </FullWidthStack>
              )}

              {blockSpec?.extras && !limitedRender && (
                <ExtraBar
                  inDrawer={inDrawer}
                  fieldInfo={fieldInfo}
                  parentId={parentId}
                  copyFn={copyFn}
                  cutFn={cutFn}
                  interactionDisabled={interactionDisabled}
                  data={data}
                  blockSpec={blockSpec}
                  docActive={docActive}
                  isEditing={editing}
                  isCollapsed={isCollapsed}
                  isSelected={selected}
                  isDebugging={isDebugging}
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

            {inDrawer && (
              <Dialog
                id={`${data.id}-doc`}
                open={docActive && !limitedRender || false}
                onClose={() => setDocActive(data.id, false)}
                aria-labelledby="doc-dialog"
                PaperComponent={'div'}
                sx={{marign:0, backgroundColor: 'transparent'}}
              >
                <MotionCard
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 },
                  }}
                  initial="hidden"
                  animate={
                    docActive && !limitedRender
                      ? "visible"
                      : "hidden"
                  }
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    WebkitBackdropFilter: 'blur(15px)',
                    backdropFilter: 'blur(15px)',
                  }}
                >
                  <Doc data={data} typeSpec={typeSpec} />
                </MotionCard>
                
              </Dialog>
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
                
                {/* For all properties of an instance, show the fields */}
                {(data.dataType === DATA_TYPES.INSTANCE ||
                  data.dataType === DATA_TYPES.CALL) &&
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
                                }}
                                hideText={!fieldInfo.fullWidth}
                                parentId={data.id}
                                interactionDisabled={
                                  interactionDisabled || inDrawer
                                }
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
        </BlockContainer>
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
