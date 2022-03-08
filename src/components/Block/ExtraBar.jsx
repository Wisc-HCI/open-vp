import React from 'react';
import { useCallback } from "react";
import { FiLock, FiUnlock, FiMoreHorizontal, FiCircle, FiEdit3, FiSave, FiEye, FiEyeOff, FiTrash2, FiZap, FiZapOff, FiPlus } from "react-icons/fi";
import { Box, DropButton, Button } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { DATA_TYPES, EXTRA_TYPES } from "..";
import { ExpandCarrot } from "./ExpandCarrot";

const Pill = ({value}) => {
    return (
        <div
            style={{
                borderRadius:20,
                minWidth:9,
                backgroundColor: "#00000022",
                paddingLeft:7,
                paddingRight:7,
                borderStyle:'solid',
                borderColor:'#00000088',
                borderWidth: 1,
                textAlign:'center',
                fontSize:10
            }}
        >
            {value}
        </div>
    )
}

const FunctionButtonExtra = ({ actionInfo, data, blockSpec, inTopLevel, interactionDisabled }) => {
    const onClick = useProgrammingStore(useCallback(state => {
        if (typeof actionInfo.onClick === 'function') {
            return actionInfo.onClick
        } else {
            return state[actionInfo.onClick]
        }
    }, [actionInfo]))

    const ExtraActionIcon = actionInfo.icon ? actionInfo.icon : FiCircle;

    return (
        <Button
            size='small'
            focusIndicator={false}
            hoverIndicator={false}
            disabled={interactionDisabled}
            plain
            style={{ padding: inTopLevel ? null : '5pt 10pt 5pt 10pt' }}
            icon={<ExtraActionIcon />}
            label={inTopLevel ? null : actionInfo.label}
            onClick={() => onClick(data, blockSpec)}
        />
    )
}

const LockIndicatorExtra = ({ locked, inTopLevel }) => {
    const Icon = locked ? FiLock : FiUnlock;
    return (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<Icon />}
            label={inTopLevel ? null : locked ? 'Locked' : 'Unlocked'}
        />
    )
}

const NameEditToggleExtra = ({ isEditing, setIsEditing, locked, inTopLevel }) => {
    const Icon = isEditing ? FiSave : FiEdit3;
    return (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled={locked}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<Icon />}
            label={inTopLevel ? null : isEditing ? 'Save' : 'Edit Name'}
            onClick={() => setIsEditing(!isEditing)}
        />
    )
}

const SelectionToggleExtra = ({ isSelected, setIsSelected, inTopLevel, data, locked }) => {
    const Icon = isSelected ? FiEyeOff : FiEye;
    const disabled = data.dataType === DATA_TYPES.INSTANCE && locked;
    return (
        <Button
            plain
            disabled={disabled}
            focusIndicator={false}
            hoverIndicator={false}
            size='small'
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<Icon />}
            label={inTopLevel ? null : isSelected ? 'Deselect' : 'Select'}
            onClick={() => setIsSelected(!isSelected)}
        />
    )
}

const CollapseToggleExtra = ({ isCollapsed, setIsCollapsed, inTopLevel }) => {
    return (
        <Button
            plain
            focusIndicator={false}
            hoverIndicator={false}
            size='small'
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<ExpandCarrot expanded={!isCollapsed} />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            label={inTopLevel ? null : isCollapsed ? "Expand" : "Collapse"}
        />
    )
}

const DebugToggleExtra = ({ isDebugging, setIsDebugging, inTopLevel }) => {
    const Icon = isDebugging ? FiZapOff : FiZap;
    return (
        <Button
            plain
            focusIndicator={false}
            hoverIndicator={false}
            size='small'
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<Icon />}
            onClick={() => setIsDebugging(!isDebugging)}
            label={inTopLevel ? null : isDebugging ? "Cancel Debug" : "Debug"}
        />
    )
}

const IndicatorExtra = ({ value, label, inTopLevel }) => {

    if (inTopLevel) {
        return ( <Pill value={value} /> )
    } else {
        return (
            <Button
                size='small'
                plain
                focusIndicator={false}
                hoverIndicator={false}
                style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
                icon={
                    <Pill value={value} />
                }
                label={label}
            />
        )
    }
}

const AddArgumentExtra = ({data, argumentType, interactionDisabled, inTopLevel}) => {

    const typeSpec = useProgrammingStore(useCallback(store=>store.programSpec.objectTypes[argumentType],[argumentType]))
    const Icon = typeSpec?.referenceBlock?.icon ? typeSpec.referenceBlock.icon : FiPlus;
    const addArgument = useProgrammingStore(store=>store.addArgument);

    return (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled={interactionDisabled}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<Icon/>}
            onClick={()=>addArgument(data.id,argumentType)}
            label={inTopLevel ? null : `Add ${typeSpec.name} Argument`}
        />
    )
}

const AddArgumentGroupExtra = ({data, allowed, interactionDisabled, inTopLevel}) => {
    
    return (
        <DropdownExtra
            icon={FiPlus}
            label='Add Argument'
            contents={allowed.map(argumentType=>({type:EXTRA_TYPES.ADD_ARGUMENT,argumentType}))}
            inTopLevel={inTopLevel}
            data={data}
            interactionDisabled={interactionDisabled}
        />
    )
}

const DeleteExtra = ({data, inTopLevel, locked, fieldInfo, parentId}) => {
    const deleteFunc = useProgrammingStore(state => state.deleteBlock);
    const canDeleteInstance = parentId === 'spawner' && data.dataType === DATA_TYPES.REFERENCE && data.refData?.canDelete;
    const canDelete = (!locked && data.canDelete) || canDeleteInstance;

    return (
        <Button 
            size='small'
            plain 
            focusIndicator={false}
            hoverIndicator={false}
            disabled={!canDelete}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={<FiTrash2/>} 
            label={inTopLevel? null : 'Delete'}
            onClick={()=>deleteFunc(data, parentId, fieldInfo)}
        />
    )
}

const DropdownExtra = ({ 
    icon, contents, label, inTopLevel, data, blockSpec, 
    isEditing, isCollapsed, isSelected, isDebugging,
    setIsEditing, setIsCollapsed, setIsSelected, setIsDebugging,
    interactionDisabled, parentId, fieldInfo }) => {

    const DropIcon = icon ? icon : FiMoreHorizontal;

    return (
        <DropButton
            focusIndicator={false}
            hoverIndicator={false}
            dropContent={
                <Box round='xsmall' background='grey' direction="column" align='start' border={{color:'lightgrey'}}>
                    {contents?.map((feature, featureIdx) => {
                        return (
                            <ButtonSwitch
                                key={featureIdx}
                                feature={feature}
                                data={data}
                                blockSpec={blockSpec}
                                inTopLevel={false}
                                isEditing={isEditing}
                                isCollapsed={isCollapsed}
                                isSelected={isSelected}
                                isDebugging={isDebugging}
                                setIsEditing={setIsEditing}
                                setIsCollapsed={setIsCollapsed}
                                setIsSelected={setIsSelected}
                                setIsDebugging={setIsDebugging}
                                interactionDisabled={interactionDisabled}
                                fieldInfo={fieldInfo}
                                parentId={parentId}
                            />)
                    })}
                </Box>
            }
            dropProps={{ align: inTopLevel ? { top: 'bottom' } : { left: 'right' }, elevation: 'none', background: 'none' }}
        >
            <Button
                size='small'
                as='div'
                focusIndicator={false}
                hoverIndicator={false}
                plain
                style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
                icon={<DropIcon />}
                label={inTopLevel ? null : label}
            />
        </DropButton>
    )
}

const ButtonSwitch = ({ 
    data, blockSpec, 
    isEditing, setIsEditing, 
    isCollapsed, setIsCollapsed, 
    isSelected, setIsSelected,
    isDebugging, setIsDebugging,
    interactionDisabled, inTopLevel, 
    feature, fieldInfo, parentId }) => {

    if (feature === EXTRA_TYPES.LOCKED_INDICATOR) {
        return <LockIndicatorExtra locked={!data.canEdit} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature === EXTRA_TYPES.NAME_EDIT_TOGGLE) {
        return <NameEditToggleExtra isEditing={isEditing} setIsEditing={setIsEditing} locked={!data.canEdit} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature === EXTRA_TYPES.COLLAPSE_TOGGLE) {
        return <CollapseToggleExtra isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature === EXTRA_TYPES.SELECTION_TOGGLE) {
        return <SelectionToggleExtra locked={interactionDisabled} data={data} isSelected={isSelected} setIsSelected={setIsSelected} inTopLevel={inTopLevel} />
    } else if (feature === EXTRA_TYPES.DEBUG_TOGGLE) {
        return <DebugToggleExtra isDebugging={isDebugging} setIsDebugging={setIsDebugging} inTopLevel={inTopLevel} />
    } else if (feature === EXTRA_TYPES.DELETE_BUTTON) {
        return <DeleteExtra data={data} inTopLevel={inTopLevel} locked={interactionDisabled} fieldInfo={fieldInfo} parentId={parentId} />
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
        return <AddArgumentExtra data={data} argumentType={feature?.argumentType} interactionDisabled={interactionDisabled} inTopLevel={inTopLevel}/>
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
        return <AddArgumentGroupExtra data={data} allowed={feature?.allowed} interactionDisabled={interactionDisabled} inTopLevel={inTopLevel}/>
    } else if (feature?.type === EXTRA_TYPES.FUNCTION_BUTTON) {
        return <FunctionButtonExtra actionInfo={feature} data={data} blockSpec={blockSpec} interactionDisabled={interactionDisabled} inTopLevel={inTopLevel}/>
    } else if (feature?.type === EXTRA_TYPES.INDICATOR) {
        return <IndicatorExtra value={feature.accessor(data)} label={feature.label} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
        return <AddArgumentGroupExtra 
            data={data} 
            allowed={feature?.allowed} 
            interactionDisabled={interactionDisabled} 
            inTopLevel={inTopLevel}
        />
    } else if (feature?.type === EXTRA_TYPES.DROPDOWN) {
        return <DropdownExtra
            data={data}
            blockSpec={blockSpec}
            icon={feature?.icon}
            contents={feature?.contents}
            label={feature?.label}
            inTopLevel={inTopLevel}
            isEditing={isEditing}
            isCollapsed={isCollapsed}
            isSelected={isSelected}
            isDebugging={isDebugging}
            setIsEditing={setIsEditing}
            setIsCollapsed={setIsCollapsed}
            setIsSelected={setIsSelected}
            setIsDebugging={setIsDebugging}
            interactionDisabled={interactionDisabled}
            parentId={parentId}
            fieldInfo={fieldInfo}
        />
    } else { return null }
}

export const ExtraBar = ({ 
    data, blockSpec, 
    isEditing, setIsEditing, 
    isCollapsed, setIsCollapsed, 
    isSelected, setIsSelected, 
    isDebugging, setIsDebugging,
    interactionDisabled, fieldInfo, parentId }) => {

    return (
        <Box direction='row' margin={{ left: 'xsmall' }} gap='none' align='center' alignContent='center' justify='between' flex={false}>
            {blockSpec?.extras?.map((extra, extraIdx) => (
                <ButtonSwitch
                    key={extraIdx}
                    data={data}
                    blockSpec={blockSpec}
                    inTopLevel={true}
                    isEditing={isEditing}
                    isCollapsed={isCollapsed}
                    isSelected={isSelected}
                    isDebugging={isDebugging}
                    setIsEditing={setIsEditing}
                    setIsCollapsed={setIsCollapsed}
                    setIsSelected={setIsSelected}
                    setIsDebugging={setIsDebugging}
                    interactionDisabled={interactionDisabled}
                    feature={extra}
                    fieldInfo={fieldInfo}
                    parentId={parentId}
                    />
            ))}
        </Box>
    )

}