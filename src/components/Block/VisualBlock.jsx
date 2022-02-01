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
      const updateSimpleParameter = useProgrammingStore(store=>store.updateSimpleParameter);

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
          {/* The 'Selectable' component just handles the highlighting, but is essentially a div */}
          <div
            style={{
              margin: 4,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* The header, includes the name/text field and the extra bar */}
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
          {/* If the block is a function instance (the actual function and not a call) then render the spawn area for arguments */}
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
                 <Block key={argIdx} staticData={argBlockData} parentId='spawner' bounded highlightColor={highlightColor} context={context}/>
              ))}
            </div>
          )}
          {/* If the block is a function call (the call and not the actual function instance) then show the argument fields */}
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
          {/* For all properties of an instance, show the fields */}
          {data.dataType === DATA_TYPES.INSTANCE && Object.entries(typeSpec.properties)?.map(([fieldKey,fieldInfo]) => {
            const enclosingStyle = !fieldInfo.fullWidth ? {backgroundColor:'#ffffff20',borderRadius:4,paddingBottom:2,margin:4} : {};
            const innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
            return (
              <Box 
                key={fieldKey} 
                direction='column'
                margin={fieldInfo.fullWidth ? 'none' : 'small'}
                pad={fieldInfo.fullWidth ? 'none' : {bottom:'small'}}
                background={fieldInfo.fullWidth ? null : '#ffffff20'}
                round='xxsmall'
                >
                <Box pad={fieldInfo.fullWidth ? 'none' : 'xsmall'}>{innerLabel}</Box>
                {fieldInfo.isList ? (
                  <List
                    ids={data.properties[fieldKey]}
                    fieldInfo={{...fieldInfo,value:fieldKey}}
                    parentId={data.id}
                    interactionDisabled={interactionDisabled}
                    highlightColor={highlightColor}
                    context={context}
                  />
                ) : (
                  <DropZone
                    id={data.properties[fieldKey]}
                    fieldInfo={{...fieldInfo,value:fieldKey}}
                    parentId={data.id}
                    interactionDisabled={interactionDisabled}
                    highlightColor={highlightColor}
                    context={context}
                  />
                )}
              </Box>
            )
          })}
          {/* Just a utility for showing the data in each node, will likely remove. */}
          {false && (
            <p style={{ whiteSpace: "pre" }}>
              {JSON.stringify(data, null, "\t")}
            </p>
          )}
        </Selectable>
      );
    }
  );