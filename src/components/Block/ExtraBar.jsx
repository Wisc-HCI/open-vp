import { useCallback } from "react";
import { FiLock, FiUnlock, FiMoreHorizontal, FiCircle, FiEdit3, FiSave, FiEye, FiEyeOff, FiTrash2, FiZap, FiZapOff, FiPlus } from "react-icons/fi";
import { Box, DropButton, Button } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { EXTRA_TYPES } from "..";
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

const FunctionButtonExtra = ({ actionInfo, data, blockSpec }) => {
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
            plain
            style={{ padding: '5pt 10pt 5pt 10pt' }}
            icon={<ExtraActionIcon />}
            label={actionInfo.label}
            onClick={() => onClick(data, blockSpec)}
        />
    )
}

const LockIndicatorExtra = ({ locked, inTopLevel }) => {
    if (locked && inTopLevel) {
        return (
            <FiLock />
        )
    } else if (!locked && inTopLevel) {
        return null
    } else if (locked && !inTopLevel) {
        return (
            <Button
                plain
                disabled
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<FiLock />}
                label='Locked'
            />
        )
    } else if (!locked && !inTopLevel) {
        return (
            <Button
                plain
                disabled
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<FiUnlock />}
                label='Unlocked'
            />
        )
    }
}

const NameEditToggleExtra = ({ isEditing, setIsEditing, locked, inTopLevel }) => {
    if (isEditing && inTopLevel) {
        return (
            <FiSave onClick={() => setIsEditing(!isEditing)}/>
        )
    } else if (!isEditing && inTopLevel) {
        return (
            <FiEdit3 onClick={() => setIsEditing(!isEditing)}/>
        )
    } else if (isEditing && !inTopLevel) {
        return (
            <Button
                plain
                disabled={locked}
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<FiSave />}
                label='Save'
                onClick={() => setIsEditing(!isEditing)}
            />
        )
    } else if (!isEditing && !inTopLevel) {
        return (
            <Button
                plain
                disabled={locked}
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<FiEdit3 />}
                label='Edit'
                onClick={() => setIsEditing(!isEditing)}
            />
        )
    }
}

const SelectionToggleExtra = ({ isSelected, setIsSelected, inTopLevel }) => {
    if (isSelected && inTopLevel) {
        return (
            <FiEyeOff onClick={() => setIsSelected(!isSelected)}/>
        )
    } else if (!isSelected && inTopLevel) {
        return (
            <FiEye onClick={() => setIsSelected(!isSelected)}/>
        )
    } else if (isSelected && !inTopLevel) {
        return (
            <Button
                plain
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<FiEyeOff />}
                label='Deselect'
                onClick={() => setIsSelected(!isSelected)}
            />
        )
    } else if (!isSelected && !inTopLevel) {
        return (
            <Button
                plain
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<FiEye />}
                label='Select'
                onClick={() => setIsSelected(!isSelected)}
            />
        )
    }
}

const CollapseToggleExtra = ({ isCollapsed, setIsCollapsed, inTopLevel }) => {

    if (inTopLevel) {
        return (
            <Button
                size='small'
                justify='center'
                align='center'
                icon={<ExpandCarrot expanded={!isCollapsed} />}
                onClick={() => setIsCollapsed(!isCollapsed)}/>
        )
    } else {
        return (
            <Button
                plain
                size='small'
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<ExpandCarrot expanded={!isCollapsed} />}
                onClick={() => setIsCollapsed(!isCollapsed)}
                label={isCollapsed ? "Expand" : "Collapse"}
            />
        )
    }
}

const DebugToggleExtra = ({ isDebugging, setIsDebugging, inTopLevel }) => {
    const Icon = isDebugging ? FiZapOff : FiZap;
    if (inTopLevel) {
        return (
            <Button
                size='small'
                justify='center'
                align='center'
                icon={<Icon />}
                onClick={() => setIsDebugging(!isDebugging)}/>
        )
    } else {
        return (
            <Button
                plain
                size='small'
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<Icon />}
                onClick={() => setIsDebugging(!isDebugging)}
                label={isDebugging ? "Cancel Debug" : "Debug"}
            />
        )
    }
}

const IndicatorExtra = ({ value, label, inTopLevel }) => {

    if (inTopLevel) {
        return ( <Pill value={value} /> )
    } else {
        return (
            <Button
                plain
                style={{ padding: '5pt 10pt 5pt 10pt' }}
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
            plain
            disabled={interactionDisabled}
            style={{ padding: inTopLevel ? null : '5pt 10pt 5pt 10pt' }}
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
    return (
        <Button 
            plain 
            disabled={locked}
            style={{padding:inTopLevel?null:'5pt 10pt 5pt 10pt'}} 
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
            disabled={interactionDisabled}
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
                as='div'
                plain
                style={{ padding: '5pt 10pt 5pt 10pt' }}
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
        return <SelectionToggleExtra isSelected={isSelected} setIsSelected={setIsSelected} inTopLevel={inTopLevel} />
    } else if (feature === EXTRA_TYPES.DEBUG_TOGGLE) {
        return <DebugToggleExtra isDebugging={isDebugging} setIsDebugging={setIsDebugging} inTopLevel={inTopLevel} />
    } else if (feature === EXTRA_TYPES.DELETE_BUTTON) {
        return <DeleteExtra data={data} inTopLevel={inTopLevel} locked={interactionDisabled} fieldInfo={fieldInfo} parentId={parentId} />
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
        return <AddArgumentExtra data={data} argumentType={feature?.argumentType} interactionDisabled={interactionDisabled} inTopLevel={inTopLevel}/>
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
        return <AddArgumentGroupExtra data={data} allowed={feature?.allowed} interactionDisabled={interactionDisabled} inTopLevel={inTopLevel}/>
    } else if (feature?.type === EXTRA_TYPES.FUNCTION_BUTTON) {
        return <FunctionButtonExtra actionInfo={feature} data={data} blockSpec={blockSpec} interactionDisabled={interactionDisabled} />
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