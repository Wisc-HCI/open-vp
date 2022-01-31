import { useState } from "react";
import { DropZone } from "./DropZone";
import { List } from "./List";
import { forwardRef } from "react";
import { DATA_TYPES, TYPES } from "../Constants";
import { FiSquare } from "react-icons/fi";
import { TextInput, Box } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { ExtraBar } from "./ExtraBar";
import { Selectable } from "./Selectable";
import { Block } from ".";

export const VisualBlock = forwardRef(
    ({ data, x, y, scale, typeSpec, onCanvas, interactionDisabled, bounded, highlightColor, context }, ref) => {
      const blockSpec = data.dataType === DATA_TYPES.REFERENCE
        ? typeSpec.referenceBlock 
        : data.dataType === DATA_TYPES.CALL 
        ? typeSpec.callBlock 
        : typeSpec.instanceBlock;

      
      const [ isCollapsed, setIsCollapsed ] = useState(false);

      const updateItemName = useProgrammingStore(store=>store.updateItemName);
      const setIsEditing = useProgrammingStore(store=>store.updateItemEditing);

      const Icon = blockSpec.icon ? blockSpec.icon : FiSquare;

      const name = [DATA_TYPES.CALL, DATA_TYPES.REFERENCE].includes(data.dataType) ? data.refData.name : data.name;

      return (
        <Selectable
          selected={data.selected}
          highlightColor={highlightColor}
          className={onCanvas && blockSpec.onCanvas ? null : "nodrag"}
          ref={ref}
          style={{
            minWidth: 175,
            width: bounded ? "inherit" : "max-content",
            backgroundColor: blockSpec.color,
            borderRadius: 3,
            padding: 4,
            flex: bounded ? 1 : null,
            transform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${
              scale ? scale : 1
            })`,
            WebkitTransform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${
              scale ? scale : 1
            })`
          }}
        >
          <div
            style={{
              margin: 4,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextInput size='small' icon={<Icon/>} value={name} focusIndicator={false} disabled={interactionDisabled || !data.editing} onChange={e=>updateItemName(data.id,e.target.value)}/>
            {blockSpec?.extras && (
              <ExtraBar 
                interactionDisabled={interactionDisabled}
                data={data} 
                blockSpec={blockSpec} 
                isEditing={data.editing} 
                isCollapsed={isCollapsed} 
                setIsEditing={setIsEditing} 
                setIsCollapsed={setIsCollapsed}/>
            )}
          </div>
          {data.dataType === DATA_TYPES.INSTANCE && typeSpec.type === TYPES.FUNCTION && data.arguments && Object.keys(data.arguments).length && (
            <div 
              style={{
                borderRadius: 4,
                display:'flex',
                margin: 4,
                padding: 5,
                backgroundColor: "rgba(0,0,0,0.2)"
              }}
            >
              {data.argumentBlockData.map((argBlockData,argIdx)=>(
                <Box key={argIdx} animation={{ type: 'fadeIn', delay: argIdx * 100 }} style={{ marginBottom: 5, display:'flex' }}>
                  <Block staticData={argBlockData} parentId='spawner' bounded highlightColor={highlightColor} context={context}/>
                </Box>
              ))}
            </div>
          )}
          {data.dataType===DATA_TYPES.CALL && data.argumentBlockData.map((argInfo,argIdx)=>{
            return (
              <DropZone
                  key={argIdx}
                  id={data.properties[argInfo.ref]}
                  fieldInfo={{name:argInfo.name,value:argInfo.ref,accepts:[argInfo.type]}}
                  parentId={data.id}
                  interactionDisabled={interactionDisabled}
                  highlightColor={highlightColor}
                  context={context}
              />
            )
          })}
          {data.dataType === DATA_TYPES.INSTANCE && Object.entries(typeSpec.properties)?.map(([fieldKey,fieldInfo]) => {
            if (fieldInfo.isList) {
              return (
                <List
                  key={fieldKey}
                  ids={data.properties[fieldKey]}
                  fieldInfo={{...fieldInfo,value:fieldKey}}
                  parentId={data.id}
                  interactionDisabled={interactionDisabled}
                  highlightColor={highlightColor}
                  context={context}
                />
              );
            } else {
              return (
                <DropZone
                  key={fieldKey}
                  id={data.properties[fieldKey]}
                  fieldInfo={{...fieldInfo,value:fieldKey}}
                  parentId={data.id}
                  interactionDisabled={interactionDisabled}
                  highlightColor={highlightColor}
                  context={context}
                />
              );
            }
          })}
          {false && (
            <p style={{ whiteSpace: "pre" }}>
              {JSON.stringify(data, null, "\t")}
            </p>
          )}
        </Selectable>
      );
    }
  );