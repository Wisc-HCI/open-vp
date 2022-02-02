import { useCallback } from "react";
import { FiLock, FiUnlock, FiMoreHorizontal, FiCircle, FiEdit3, FiSave, FiChevronRight } from "react-icons/fi";
import { Box, DropButton, Button, Tag } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { useSpring, animated } from '@react-spring/web';
import { config } from 'react-spring';
import { EXTRA_TYPES } from "..";
import { ExpandCarrot } from "./ExpandCarrot";

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
            <Box height="25px" width="25px" justify='center' align='end'>
                <FiLock />
            </Box>
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
            <Box
                height="25px"
                width="25px"
                justify='center'
                align='end'
                onClick={() => setIsEditing(!isEditing)}>
                <FiSave />
            </Box>
        )
    } else if (!isEditing && inTopLevel) {
        return (
            <Box
                height="25px"
                width="25px"
                justify='center'
                align='end'
                onClick={() => setIsEditing(!isEditing)}>
                <FiEdit3 />
            </Box>
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

const CollapseToggleExtra = ({ isCollapsed, setIsCollapsed, inTopLevel }) => {

    if (inTopLevel) {
        return (
            <Box
                height="25px"
                width="25px"
                justify='center'
                align='end'
                onClick={() => setIsCollapsed(!isCollapsed)}>
                <ExpandCarrot expanded={!isCollapsed} />
            </Box>
        )
    } else {
        return (
            <Button
                plain
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={<ExpandCarrot expanded={!isCollapsed} />}
                label={isCollapsed ? 'Expand' : 'Minimize'}
                onClick={() => setIsCollapsed(!isCollapsed)}
            />
        )
    }
}

const IndicatorExtra = ({ value, label, inTopLevel }) => {

    if (inTopLevel) {
        return (
            
                <Tag
                    value={value}
                    size='large'
                    border={{ color: '#00000088' }}
                    background="#00000011"
                    style={{ color: 'white', height: 25, width: 25, marginTop: 4, paddingTop:2 }}>
                    {value}
                </Tag>

        )
    } else {
        return (
            <Button
                plain
                style={{ padding: '5pt 10pt 5pt 10pt' }}
                icon={
                    <Tag
                        value={value}
                        size='small'
                        border={{ color: '#00000088' }}
                        background="#00000011"
                        style={{ color: 'white', height: 20, width: 20, paddingTop: 2 }}>
                        {value}
                    </Tag>
                }
                label={label}
            />
        )
    }
}

const DropdownExtra = ({ icon, contents, label, inTopLevel, data, blockSpec, isEditing, isCollapsed, setIsEditing, setIsCollapsed, interactionDisabled }) => {

    const DropIcon = icon ? icon : FiMoreHorizontal;

    return (
        <DropButton
            disabled={interactionDisabled}
            dropContent={
                <Box round='xsmall' background='grey' direction="column" align='start'>
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
                                setIsEditing={setIsEditing}
                                setIsCollapsed={setIsCollapsed}
                                interactionDisabled={interactionDisabled}
                            />)
                    })}
                </Box>
            }
            dropProps={{ align: inTopLevel ? { top: 'bottom' } : { left: 'right' }, elevation: 'none', background: 'none' }}
        >
            {inTopLevel ? (
                <Box height="25px" width="25px" justify='center' align='end'>
                    <DropIcon />
                </Box>
            ) : (
                <Button
                    as='div'
                    plain
                    style={{ padding: '5pt 10pt 5pt 10pt' }}
                    icon={<DropIcon />}
                    label={label}
                />
            )}
        </DropButton>
    )
}

const ButtonSwitch = ({ data, blockSpec, isEditing, setIsEditing, isCollapsed, setIsCollapsed, interactionDisabled, inTopLevel, feature }) => {
    if (feature === EXTRA_TYPES.LOCKED_INDICATOR) {
        return <LockIndicatorExtra locked={!data.canEdit} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature === EXTRA_TYPES.NAME_EDIT_TOGGLE) {
        return <NameEditToggleExtra isEditing={isEditing} setIsEditing={setIsEditing} locked={!data.canEdit} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature === EXTRA_TYPES.COLLAPSE_TOGGLE) {
        return <CollapseToggleExtra isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature?.type === EXTRA_TYPES.FUNCTION_BUTTON) {
        return <FunctionButtonExtra actionInfo={feature} data={data} blockSpec={blockSpec} interactionDisabled={interactionDisabled} />
    } else if (feature?.type === EXTRA_TYPES.INDICATOR) {
        return <IndicatorExtra value={feature.accessor(data)} label={feature.label} inTopLevel={inTopLevel} interactionDisabled={interactionDisabled} />
    } else if (feature?.type === EXTRA_TYPES.DROPDOWN) {
        return <DropdownExtra
            data={data}
            blockSpec={blockSpec}
            icon={feature?.icon}
            contents={feature?.contents}
            label={feature?.label}
            inTopLevel={false}
            isEditing={isEditing}
            isCollapsed={isCollapsed}
            setIsEditing={setIsEditing}
            setIsCollapsed={setIsCollapsed}
            interactionDisabled={interactionDisabled}
        />
    } else { return null }
}

export const ExtraBar = ({ data, blockSpec, isEditing, setIsEditing, isCollapsed, setIsCollapsed, interactionDisabled }) => {
    return (
        <Box direction='row' margin={{ right: 'small', left: 'small' }}>
            {blockSpec?.extras?.map((extra, extraIdx) => (
                <ButtonSwitch
                    key={extraIdx}
                    data={data}
                    blockSpec={blockSpec}
                    inTopLevel={true}
                    isEditing={isEditing}
                    isCollapsed={isCollapsed}
                    setIsEditing={setIsEditing}
                    setIsCollapsed={setIsCollapsed}
                    interactionDisabled={interactionDisabled}
                    feature={extra}
                />
            ))}
        </Box>
    )

}