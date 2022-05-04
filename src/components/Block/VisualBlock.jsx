import React from 'react';
import { useState } from "react";
import { DropZone } from "./DropZone";
import { List } from "./List";
import { forwardRef } from "react";
import { DATA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../Constants";
import { FiCheck, FiSquare } from "react-icons/fi";
import { TextInput, Box, Button, Text,RadioButtonGroup, ThemeContext } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { ExtraBar, RightClickMenu } from "./ExtraBar";
import { Selectable } from "./Selectable";
import { Block } from ".";
import { pickBy, omitBy } from 'lodash';
import { ExpandCarrot } from "./ExpandCarrot";
import { ProgressBar } from './Progress';
import { ContextMenuContent, ContextMenuTrigger, ContextMenu, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuItemIndicator, DropdownMenuRadioItem, Switch, ToolTip, Input, Slider } from './Utility';

export const VisualBlock = forwardRef(
  ({ data, x, y, scale, typeSpec, onCanvas, interactionDisabled, bounded, highlightColor, context, fieldInfo, parentId, style, progress }, ref) => {
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
    const setLocked = useProgrammingStore(state => state.setLocked);
    const locked = useProgrammingStore(state => state.locked);

    const minified = blockSpec.minified && data.dataType === DATA_TYPES.INSTANCE

    const simpleProperties = typeSpec.properties ? pickBy(typeSpec.properties, (entry) => Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type) && entry.type !== SIMPLE_PROPERTY_TYPES.IGNORED) : {};
    const standardProperties = typeSpec.properties ? omitBy(typeSpec.properties, (entry) => Object.values(SIMPLE_PROPERTY_TYPES).includes(entry.type)) : {};

    const Icon = blockSpec.icon ? blockSpec.icon : FiSquare;

    const name = [DATA_TYPES.CALL, DATA_TYPES.REFERENCE].includes(data.dataType) ? data?.refData?.name : data?.name;

    const editing = data.editing || data.refData?.editing;
    const selected = data.selected || data.refData?.selected;

    const undraggableArgs = { className: editing || locked ? 'nodrag' : null, draggable: false, onDragStart: e => e.stopPropagation(), onDragEnd: e => e.stopPropagation(), onDrag: e => e.stopPropagation() }

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Selectable
            role='Handle'
            selected={selected}
            highlightColor={highlightColor}
            className={onCanvas && blockSpec.onCanvas && !editing && !locked ? null : "nodrag"}
            ref={ref}
            style={{
              minWidth: 175,
              width: bounded ? "inherit" : "max-content",
              backgroundColor: blockSpec.color,
              borderRadius: 3,
              padding: minified ? 0 : 4,
              flex: bounded ? 1 : null,
              transform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${scale ? scale : 1
                })`,
              WebkitTransform: `translate(${x ? x : 0}px, ${y ? y : 0}px) scale(${scale ? scale : 1
                })`,
              ...blockStyle
            }}
          >
            {/* The 'Selectable' component just handles the highlighting, but is essentially a div */}
            <Box
              direction='row'
              justify='between'
              margin={`${minified ? 1 : 4}pt`}
              align='center'
              alignContent='between'
              style={{
                display: 'flex',
              }}
            >
              {/* The header, includes the name/text field and the extra bar */}
              <ThemeContext.Extend
                value={{ global: { input: { extend: { backgroundColor: editing ? `${highlightColor}55` : '#FFFFFF55', userSelect: editing ? 'none' : 'auto' } }, control: { border: { color: editing ? highlightColor : null } }, edgeSize: { large: '20pt' } } }}>
                {!minified && (
                  <TextInput
                    {...undraggableArgs}
                    onMouseEnter={editing ? _ => setLocked(true) : null}
                    onMouseLeave={editing ? _ => setLocked(false) : null}
                    size='small'
                    icon={<Icon />}
                    value={name}
                    textAlign='start'
                    focusIndicator={false}
                    disabled={!data.editing && !data.refData?.editing}
                    onChange={e => updateItemName(data.refData ? data.refData.id : data.id, e.target.value)}

                  />
                )}

              </ThemeContext.Extend>

              {minified && (
                <>
                  <Box overflow='scroll' direction='row' gap='xxsmall' pad={{ top: 'none', bottom: 'none', left: 'xxsmall' }} border='right' alignContent='center' align='center'>
                    {Object.entries(typeSpec.properties)?.map(([fieldKey, fieldInfo]) => {
                      if (Object.values(SIMPLE_PROPERTY_TYPES).includes(fieldInfo.type) && fieldInfo.type !== SIMPLE_PROPERTY_TYPES.IGNORED) {
                        if (fieldInfo.type === SIMPLE_PROPERTY_TYPES.OPTIONS) {
                          const currentText = fieldInfo.options.filter(option => option.value === data.properties[fieldKey]).map(option => option.label)[0];
                          return (
                            <DropdownMenu key={fieldKey}>
                              <DropdownMenuTrigger asChild>
                                <Box
                                  as='div'
                                  style={{ minWidth: currentText.length * 12 }}
                                  direction='row'
                                  align='center'
                                  hoverIndicator='#00000055'
                                  focusIndicator={false}
                                  onClick={() => { }}
                                  alignContent='center'
                                  background='#00000022'
                                  round='xxsmall'
                                  margin='xxsmall'
                                  height='30pt'
                                  pad={{ left: 'xxsmall', right: 'xxsmall' }}>

                                  {currentText}

                                </Box>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                  value={data.properties[fieldKey]}
                                  onValueChange={(value) => updateItemSimpleProperty(data.id, fieldKey, value)}
                                >
                                  {fieldInfo.options.map((option, idx) => (
                                    <DropdownMenuRadioItem key={idx} value={option.value} highlightColor={highlightColor} disabled={interactionDisabled}>
                                      <DropdownMenuItemIndicator>
                                        <FiCheck />
                                      </DropdownMenuItemIndicator>
                                      {option.label}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )
                        } else if (fieldInfo.type === SIMPLE_PROPERTY_TYPES.BOOLEAN) {
                          return (
                            <Box key={fieldKey} style={{ minWidth: 43 }}>
                              <ToolTip
                                key={fieldKey} content={<div key='label' style={{ textAlign: 'center' }}>{fieldInfo.name}</div>}
                              >
                                <Box key='sliderContainer' style={{ minWidth: 43 }} focusIndicator={false}>
                                  <Switch
                                    value={data.properties[fieldKey]}
                                    onCheckedChange={(value) => updateItemSimpleProperty(data.id, fieldKey, value)}
                                    highlightColor={highlightColor}
                                    disabled={interactionDisabled}
                                  />
                                </Box>


                              </ToolTip>
                            </Box>


                          )
                        } else if (fieldInfo.type === SIMPLE_PROPERTY_TYPES.STRING) {
                          const currentValue = data.properties[fieldKey]
                          return (
                            <Box key={fieldKey} style={{ minWidth: currentValue.length * 11 + 3, maxWidth: currentValue.length * 11 + 5 }}>
                              <ToolTip
                                content={<div key='label' style={{ textAlign: 'center' }}>{fieldInfo.name}</div>}
                              >
                                <Input
                                  key={fieldKey}
                                  placeholder={fieldInfo.name}
                                  onMouseEnter={_ => setLocked(true)}
                                  onMouseLeave={_ => setLocked(false)}
                                  css={{
                                    fontSize: 14,
                                    minWidth: 30,
                                    textAlign: 'center',
                                    color: '#00000088',
                                    backgroundColor: '#efefef50',
                                    boxShadow: `0 0 0 1px #efefef`,
                                  }}
                                  value={currentValue}
                                  disabled={interactionDisabled}
                                  onChange={(e) => updateItemSimpleProperty(data.id, fieldKey, e.target.value)}
                                />
                              </ToolTip>

                            </Box>
                          )
                        } else if (fieldInfo.type === SIMPLE_PROPERTY_TYPES.NUMBER) {
                          return (
                            <Box key={fieldKey} style={{ minWidth: 40 }}>
                              <Slider
                                label={fieldInfo.name}
                                min={fieldInfo.min !== undefined ? fieldInfo.min : 0}
                                max={fieldInfo.max !== undefined ? fieldInfo.max : 10}
                                step={fieldInfo.step}
                                units={fieldInfo.units}
                                value={data.properties[fieldKey]}
                                disabled={interactionDisabled}
                                visualScaling={fieldInfo.visualScaling}
                                visualPrecision={fieldInfo.visualPrecision}
                                onChange={(value) => updateItemSimpleProperty(data.id, fieldKey, value)}
                              />

                            </Box>
                          )
                        }
                      } else {
                        // const innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
                        return (
                          <ToolTip
                            key={fieldKey}
                            content={<div key='label' style={{ textAlign: 'center' }}>{fieldInfo.name}</div>}
                          >
                            <Box key={fieldKey} focusIndicator={false}>
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

                          </ToolTip>
                        )
                      }
                      return null
                    })}
                  </Box>
                </>
              )}
              {blockSpec?.extras && (
                <ExtraBar
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
                  setIsEditing={data.dataType === DATA_TYPES.REFERENCE || data.dataType === DATA_TYPES.CALL ? (v) => setIsEditing(data.ref, v) : (v) => setIsEditing(data.id, v)}
                  setIsSelected={data.dataType === DATA_TYPES.REFERENCE || data.dataType === DATA_TYPES.CALL ? (v) => { console.log(data); setIsSelected(data.ref, v) } : (v) => { console.log(data); setIsSelected(data.id, v) }}
                  setIsCollapsed={setIsCollapsed}
                  setIsDebugging={setIsDebugging} />
              )}
            </Box>

            <ProgressBar progress={progress} color={highlightColor} />

            {/* If the block is a function instance (the actual function and not a call) then render the spawn area for arguments */}
            {!isCollapsed && !minified && (
              <Box animation={['fadeIn', 'zoomIn']}>
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
                      <Block key={argIdx} staticData={argBlockData} parentId={data.id} bounded highlightColor={highlightColor} context={context} fieldInfo={{ name: '', value: null, accepts: [], isSpawner: true }} />
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
                              <Switch
                                value={data.properties[propKey]}
                                onCheckedChange={(value) => updateItemSimpleProperty(data.id, propKey, value)}
                                highlightColor={highlightColor}
                                disabled={interactionDisabled}
                              />
                            )}
                            {propInfo.type === SIMPLE_PROPERTY_TYPES.NUMBER && (
                              <Box width='xsmall'>
                                <Slider
                                  label={null}
                                  min={propInfo.min !== undefined ? propInfo.min : 0}
                                  max={propInfo.max !== undefined ? propInfo.max : 10}
                                  step={propInfo.step}
                                  units={propInfo.units}
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
                                  onMouseEnter={_ => setLocked(true)}
                                  onMouseLeave={_ => setLocked(false)}
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
              <Box round='small' pad='small' background='#00000044' style={{ whiteSpace: "pre", color: 'white', fontFamily: 'monospace' }}>
                {JSON.stringify({ ...data, interactionDisabled: interactionDisabled ? true : false }, null, "  ")}
              </Box>
            )}
          </Selectable>
        </ContextMenuTrigger>
        <ContextMenuContent>
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
            setIsEditing={data.dataType === DATA_TYPES.REFERENCE || data.dataType === DATA_TYPES.CALL ? (v) => setIsEditing(data.ref, v) : (v) => setIsEditing(data.id, v)}
            setIsSelected={data.dataType === DATA_TYPES.REFERENCE || data.dataType === DATA_TYPES.CALL ? (v) => { console.log(data); setIsSelected(data.ref, v) } : (v) => { console.log(data); setIsSelected(data.id, v) }}
            setIsCollapsed={setIsCollapsed}
            setIsDebugging={setIsDebugging}
          />
        </ContextMenuContent>
      </ContextMenu>
    );
  }
);