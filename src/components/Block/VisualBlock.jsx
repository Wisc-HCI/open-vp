import React from 'react';
import { useState } from "react";
import { DropZone } from "./DropZone";
import { List } from "./List";
import { forwardRef } from "react";
import { DATA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../Constants";
import { FiSquare } from "react-icons/fi";
import { TextInput, Box, Button, Text, CheckBox, RadioButtonGroup, ThemeContext } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { ExtraBar } from "./ExtraBar";
import { Selectable } from "./Selectable";
import { Block } from ".";
import { pickBy, omitBy } from 'lodash';
import { ExpandCarrot } from "./ExpandCarrot";
import { NumberInput } from "./Input";

export const VisualBlock = forwardRef(
  ({ data, x, y, scale, typeSpec, onCanvas, interactionDisabled, bounded, highlightColor, context, fieldInfo, parentId, style }, ref) => {
    const blockSpec = data.dataType === DATA_TYPES.REFERENCE
      ? typeSpec.referenceBlock
      : data.dataType === DATA_TYPES.CALL
        ? typeSpec.callBlock
        : typeSpec.instanceBlock;

    const blockStyle = style ? style : {};

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDebugging, setIsDebugging] = useState(false);
    const [simplePropertiesCollapsed, setSimplePropertiesCollapsed] = useState(true);

    const updateItemName = useProgrammingStore(store => store.updateItemName);
    const setIsEditing = useProgrammingStore(store => store.updateItemEditing);
    const setIsSelected = useProgrammingStore(store => store.updateItemSelected);
    const updateItemSimpleProperty = useProgrammingStore(store => store.updateItemSimpleProperty);

    const simpleProperties = typeSpec.properties ? pickBy(typeSpec.properties, (entry) => Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type) && entry.type !== SIMPLE_PROPERTY_TYPES.IGNORED) : {};
    const standardProperties = typeSpec.properties ? omitBy(typeSpec.properties, (entry) => Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type)) : {};

    const Icon = blockSpec.icon ? blockSpec.icon : FiSquare;

    const name = [DATA_TYPES.CALL, DATA_TYPES.REFERENCE].includes(data.dataType) ? data?.refData?.name : data?.name;

    const editing = data.editing || data.refData?.editing;
    const selected = data.selected || data.refData?.selected;

    const undraggableArgs = {draggable:false,onDragStart:e=>e.stopPropagation(),onDragEnd:e=>e.stopPropagation(),onDrag:e=>e.stopPropagation()}

    return (
      <Selectable
        role='Handle'
        selected={selected}
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
          transform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${scale ? scale : 1
            })`,
          WebkitTransform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${scale ? scale : 1
            })`,
          ...blockStyle
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
          <ThemeContext.Extend 
              value={{global:{input:{extend: {backgroundColor:editing ? `${highlightColor}55` : '#FFFFFF55',userSelect:editing ? 'none' : 'auto'}},control:{border:{color:editing ? highlightColor : null}},edgeSize:{large:'20pt'}}}}>
            <TextInput {...undraggableArgs} size='small' icon={<Icon/>} value={name} textAlign='start' focusIndicator={false} disabled={!data.editing && !data.refData?.editing} onChange={e => updateItemName(data.refData ? data.refData.id : data.id, e.target.value)} />
          </ThemeContext.Extend>
          {blockSpec?.extras && (
            <ExtraBar
              fieldInfo={fieldInfo}
              parentId={parentId}
              interactionDisabled={interactionDisabled}
              data={data}
              blockSpec={blockSpec}
              isEditing={editing}
              isCollapsed={isCollapsed}
              isSelected={selected}
              isDebugging={isDebugging}
              setIsEditing={ data.ref ? (v)=>setIsEditing(data.ref,v) : (v)=>setIsEditing(data.id,v)}
              setIsSelected={ data.ref ? (v)=>setIsSelected(data.ref,v) : (v)=>setIsSelected(data.id,v)}
              setIsCollapsed={setIsCollapsed}
              setIsDebugging={setIsDebugging} />
          )}
        </div>
        {/* If the block is a function instance (the actual function and not a call) then render the spawn area for arguments */}
        {!isCollapsed && (
          <Box animation={['fadeIn','zoomIn']}>
            {data.dataType === DATA_TYPES.INSTANCE && typeSpec.type === TYPES.FUNCTION && data.arguments && Object.keys(data.arguments).length > 0 && (
              <Box
                gap='xsmall'
                direction='column'
                style={{
                  borderRadius: 4,
                  display: 'flex',
                  margin: 4,
                  padding: 5,
                  backgroundColor: "rgba(0,0,0,0.2)"
                }}
              >
                {data.argumentBlockData.map((argBlockData, argIdx) => (
                  <Block key={argIdx} staticData={argBlockData} parentId={data.id} bounded highlightColor={highlightColor} context={context} fieldInfo={{ name: '', value: null, accepts: [], isSpawner: true }}/>
                ))}
              </Box>
            )}
            {/* If the block has simple parameters, show them in a collapse block */}
            {Object.keys(simpleProperties).length > 0 && data.dataType === DATA_TYPES.INSTANCE && (
              <Box
                margin='xsmall'
                background='#ffffff50'
                round='xxsmall'
                align='center'
                justify='between'
                direction='column'
                pad='xsmall'
                flex
              >
                <Box
                  direction='row'
                  align='center'
                  justify='between'
                  flex
                  style={{ width: '100%' }}
                >
                  <Text margin={{ left: 'medium' }}>Settings</Text>
                  <Button
                    plain
                    style={{ padding: '5pt 10pt 5pt 10pt' }}
                    icon={<ExpandCarrot expanded={!simplePropertiesCollapsed} />}
                    onClick={interactionDisabled ? null : () => setSimplePropertiesCollapsed(!simplePropertiesCollapsed)}
                  />
                </Box>
                {!simplePropertiesCollapsed && (
                  <Box flex animation={["fadeIn", "slideDown"]} style={{ width: '100%' }}>
                    {Object.entries(simpleProperties).map(([propKey, propInfo]) => (
                      <Box
                        key={propKey}
                        direction='row'
                        background='#ffffff50'
                        round='xsmall'
                        flex
                        pad='small'
                        justify='between'
                        align='center'
                        margin={{ bottom: 'xsmall' }}
                      >
                        <Text size='small' color='#00000088'>{propInfo.name}</Text>
                        {propInfo.type === SIMPLE_PROPERTY_TYPES.BOOLEAN && (
                          <CheckBox
                            size='small'
                            focusIndicator={false}
                            disabled={interactionDisabled}
                            checked={data.properties[propKey]}
                            onChange={() => updateItemSimpleProperty(data.id, propKey, !data.properties[propKey])} />
                        )}
                        {propInfo.type === SIMPLE_PROPERTY_TYPES.NUMBER && (
                          <Box width='xsmall'>
                            <NumberInput
                              size='xsmall'
                              style={{ color: '#00000088' }}
                              min={propInfo.min !== undefined ? propInfo.min : 0}
                              max={propInfo.max !== undefined ? propInfo.max : 10}
                              value={data.properties[propKey]}
                              disabled={interactionDisabled}
                              visualScaling={propInfo.visualScaling}
                              onChange={(value) => updateItemSimpleProperty(data.id, propKey, value)}
                            />
                          </Box>
                        )}
                        {propInfo.type === SIMPLE_PROPERTY_TYPES.STRING && (
                          <Box width='xsmall'>
                            <TextInput
                              size='xsmall'
                              textAlign="center"
                              style={{ color: '#00000088' }}
                              value={data.properties[propKey]}
                              disabled={interactionDisabled}
                              onChange={(e) => updateItemSimpleProperty(data.id, propKey, e.target.value)}
                            />
                          </Box>
                        )}
                        {propInfo.type === SIMPLE_PROPERTY_TYPES.OPTIONS && (
                          <RadioButtonGroup
                            name={propInfo.name}
                            disabled={interactionDisabled}
                            size='xsmall'
                            style={{ color: '#00000088', fontSize: 13 }}
                            options={propInfo.options}
                            value={data.properties[propKey]}
                            onChange={(e) => updateItemSimpleProperty(data.id, propKey, e.target.value)}
                          />
                        )}
                      </Box>
                    )
                    )}
                  </Box>)}
              </Box>
            )}
            {/* If the block is a function call (the call and not the actual function instance) then show the argument fields */}
            {data.dataType === DATA_TYPES.CALL && data.argumentBlockData.map((argInfo, argIdx) => {
              return (
                <Box
                  key={argIdx}
                  direction='row'
                  margin='xsmall'
                  background='#ffffff20'
                  round='xxsmall'
                  alignContent='between'
                  align='center'
                  justify='between'
                  flex
                >
                  <Box pad='xsmall' alignContent='center' align='center'>{argInfo.name}</Box>
                  <DropZone
                    id={data.properties[argInfo.ref]}
                    fieldInfo={{ name: '', value: argInfo.ref, accepts: [argInfo.type] }}
                    parentId={data.id}
                    interactionDisabled={interactionDisabled}
                    highlightColor={highlightColor}
                    context={context}
                  />
                </Box>
              )
            })}
            {/* For all properties of an instance, show the fields */}
            {data.dataType === DATA_TYPES.INSTANCE && Object.entries(standardProperties)?.map(([fieldKey, fieldInfo]) => {
              const innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
              return (
                <Box
                  key={fieldKey}
                  direction='row'
                  margin={fieldInfo.fullWidth ? 'none' : 'xsmall'}
                  background={fieldInfo.fullWidth ? null : '#ffffff20'}
                  round='xxsmall'
                  alignContent='between'
                  align='center'
                  justify='between'
                  flex
                >
                  <Box pad={fieldInfo.fullWidth ? 'none' : 'xsmall'} alignContent='center' align='center'>{innerLabel}</Box>
                  {fieldInfo.isList ? (
                    <List
                      ids={data.properties[fieldKey]}
                      fieldInfo={{ ...fieldInfo, value: fieldKey }}
                      parentId={data.id}
                      interactionDisabled={interactionDisabled}
                      highlightColor={highlightColor}
                      context={context}
                    />
                  ) : (
                    <DropZone
                      id={data.properties[fieldKey]}
                      fieldInfo={{ ...fieldInfo, value: fieldKey, name: !fieldInfo.fullWidth ? '' : fieldInfo.name }}
                      parentId={data.id}
                      interactionDisabled={interactionDisabled}
                      highlightColor={highlightColor}
                      context={context}
                    />
                  )}
                </Box>
              )
            })}
          </Box>
        )}

        {/* Just a utility for showing the data in each node, will likely remove. */}
        {isDebugging && (
          <Box round='small' pad='small' background='#00000044' style={{ whiteSpace: "pre", color:'white', fontFamily:'monospace' }}>
            {JSON.stringify({...data,interactionDisabled:interactionDisabled?true:false}, null, "  ")}
          </Box>
        )}
      </Selectable>
    );
  }
);