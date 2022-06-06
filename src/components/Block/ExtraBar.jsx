import React from 'react';
import { useCallback } from "react";
import { FiLock, FiUnlock, FiMoreHorizontal, FiCircle, FiEdit3, FiSave, FiEye, FiEyeOff, FiTrash2, FiZap, FiZapOff, FiPlus } from "react-icons/fi";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { Box, Button } from "grommet";
import { useProgrammingStore } from "../ProgrammingContext";
import { DATA_TYPES, EXTRA_TYPES } from "..";
import { ExpandCarrot } from "./ExpandCarrot";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItemIndicator, DropdownMenuCheckboxItem, DropdownMenuTriggerItem, RightSlot, DropdownMenuSeparator, OtherStyledSeparator, ContextMenuTriggerItem, ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuItemIndicator, ContextMenuContent, ContextMenu, ContextMenuLabel, DropdownMenuLabel } from './Utility';


const MENU_TYPES = {
    DROPDOWN: 'DROPDOWN',
    CONTEXT: 'CONTEXT'
}

const Pill = ({ value }) => {
    return (
        <div
            style={{
                borderRadius: 20,
                minWidth: 6,
                backgroundColor: "#00000022",
                paddingLeft: 7,
                paddingRight: 7,
                borderStyle: 'solid',
                borderColor: '#00000088',
                borderWidth: 1,
                textAlign: 'center',
                fontSize: 10
            }}
        >
            {value}
        </div>
    )
}

const FunctionButtonExtra = ({ actionInfo, data, blockSpec, inTopLevel, interactionDisabled, highlightColor, menuType }) => {
    const onClick = useProgrammingStore(useCallback(state => {
        if (typeof actionInfo.onClick === 'function') {
            return actionInfo.onClick
        } else {
            return state[actionInfo.onClick]
        }
    }, [actionInfo]))

    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;

    const ExtraActionIcon = actionInfo.icon ? actionInfo.icon : FiCircle;
    const inner = <Button
        size='small'
        focusIndicator={false}
        hoverIndicator={false}
        disabled={interactionDisabled}
        plain
        style={{ padding: inTopLevel ? null : '5pt 10pt 5pt 10pt' }}
        icon={inTopLevel ? <ExtraActionIcon /> : null}
        label={inTopLevel ? null : actionInfo.label}
        onClick={() => onClick(data, blockSpec)}
    />

    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} disabled={interactionDisabled} onSelect={() => onClick(data, blockSpec)}>
                <Indicator>
                    <ExtraActionIcon />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const LabelExtra = ({ inTopLevel, menuType, label }) => {

    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuLabel : ContextMenuLabel;

    if (inTopLevel) {
        return (
            <Button
                size='small'
                plain
                focusIndicator={false}
                hoverIndicator={false}
                disabled
                style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
                label={label}
            />
        )
    } else {
        return (
            <Wrapper>
                {label}
            </Wrapper>
        )
    }

}

const LockIndicatorExtra = ({ locked, inTopLevel, highlightColor, menuType }) => {
    const Icon = locked ? FiLock : FiUnlock;

    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;

    const inner = (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <Icon /> : null}
            label={inTopLevel ? null : locked ? 'Locked' : 'Unlocked'}
        />
    )

    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} disabled>
                <Indicator>
                    <Icon />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }

}

const NameEditToggleExtra = ({ isEditing, setIsEditing, locked, interactionDisabled, inTopLevel, highlightColor, menuType, data }) => {
    const Icon = isEditing ? FiSave : FiEdit3;
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    const disabled = locked || (interactionDisabled && data.dataType !== DATA_TYPES.REFERENCE);
    const inner = (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled={disabled}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <Icon /> : null}
            label={inTopLevel ? null : isEditing ? 'Save' : 'Edit Name'}
            onClick={() => setIsEditing(!isEditing)}
        />
    )

    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} disabled={disabled} onSelect={() => setIsEditing(!isEditing)}>
                <Indicator>
                    <Icon />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const SelectionToggleExtra = ({ isSelected, setIsSelected, inTopLevel, data, locked, highlightColor, menuType }) => {
    const Icon = isSelected ? FiEyeOff : FiEye;
    const disabled = data.dataType === DATA_TYPES.INSTANCE && locked;
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;

    const inner = (
        <Button
            plain
            disabled={disabled}
            focusIndicator={false}
            hoverIndicator={false}
            size='small'
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <Icon /> : null}
            label={inTopLevel ? null : isSelected ? 'Deselect' : 'Select'}
            onClick={() => setIsSelected(!isSelected)}
        />
    )
    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} disabled={disabled} onSelect={() => setIsSelected(!isSelected)}>
                <Indicator>
                    <Icon />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const CollapseToggleExtra = ({ isCollapsed, setIsCollapsed, inTopLevel, highlightColor, menuType }) => {
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    const inner = (
        <Button
            plain
            focusIndicator={false}
            hoverIndicator={false}
            size='small'
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <ExpandCarrot expanded={!isCollapsed} /> : null}
            onClick={() => setIsCollapsed(!isCollapsed)}
            label={inTopLevel ? null : isCollapsed ? "Expand" : "Collapse"}
        />
    )
    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} onSelect={() => setIsCollapsed(!isCollapsed)}>
                <Indicator>
                    {isCollapsed ? <FiChevronDown /> : <FiChevronRight />}
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const DebugToggleExtra = ({ isDebugging, setIsDebugging, inTopLevel, highlightColor, menuType }) => {
    const Icon = isDebugging ? FiZapOff : FiZap;
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    const inner = (
        <Button
            plain
            focusIndicator={false}
            hoverIndicator={false}
            size='small'
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <Icon /> : null}
            onClick={() => setIsDebugging(!isDebugging)}
            label={inTopLevel ? null : isDebugging ? "Cancel Debug" : "Debug"}
        />
    )
    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} onSelect={() => setIsDebugging(!isDebugging)}>
                <Indicator>
                    <Icon />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const IndicatorTextExtra = ({ value, label, inTopLevel, highlightColor, menuType }) => {
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    if (inTopLevel) {
        return (<Pill value={value} />)
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor}>
                <Indicator>
                    <Pill value={value} />
                </Indicator>
                <Button
                    size='small'
                    plain
                    focusIndicator={false}
                    hoverIndicator={false}
                    style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
                    label={label}
                />
            </Wrapper>
        )
    }
}

const IndicatorIconExtra = ({ value, label, inTopLevel, highlightColor, menuType }) => {
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    const inner = (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled={true}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? value : null}
            label={inTopLevel ? null : label}
        />
    )
    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor}>
                <Indicator>
                    {value}
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const AddArgumentExtra = ({ data, argumentType, interactionDisabled, inTopLevel, highlightColor, menuType }) => {
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    const typeSpec = useProgrammingStore(useCallback(store => store.programSpec.objectTypes[argumentType], [argumentType]))
    const Icon = typeSpec?.referenceBlock?.icon ? typeSpec.referenceBlock.icon : FiPlus;
    const addArgument = useProgrammingStore(store => store.addArgument);

    const inner = (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled={interactionDisabled}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <Icon /> : null}
            onClick={() => inTopLevel ? addArgument(data.id, argumentType) : {}}
            label={inTopLevel ? null : `Add ${typeSpec.name} Argument`}
        />
    )
    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} disabled={interactionDisabled} onSelect={() => addArgument(data.id, argumentType)}>
                <Indicator>
                    <Icon />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const AddArgumentGroupExtra = ({ data, allowed, interactionDisabled, inTopLevel, highlightColor, menuType }) => {

    return (
        <DropdownExtra
            icon={FiPlus}
            label='Add Argument'
            contents={allowed.map(argumentType => ({ type: EXTRA_TYPES.ADD_ARGUMENT, argumentType }))}
            inTopLevel={inTopLevel}
            data={data}
            interactionDisabled={interactionDisabled}
            highlightColor={highlightColor}
            menuType={menuType}
        />
    )
}

const DeleteExtra = ({ data, inTopLevel, locked, fieldInfo, parentId, highlightColor, menuType }) => {
    const deleteFunc = useProgrammingStore(state => state.deleteBlock);
    const canDeleteInstance = parentId === 'spawner' && data.dataType === DATA_TYPES.REFERENCE && data.refData?.canDelete;
    const canDelete = (!locked && data.canDelete) || canDeleteInstance;
    const Wrapper = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuCheckboxItem : ContextMenuCheckboxItem;
    const Indicator = menuType === MENU_TYPES.DROPDOWN ? DropdownMenuItemIndicator : ContextMenuItemIndicator;
    const inner = (
        <Button
            size='small'
            plain
            focusIndicator={false}
            hoverIndicator={false}
            disabled={!canDelete}
            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
            icon={inTopLevel ? <FiTrash2 /> : null}
            label={inTopLevel ? null : 'Delete'}
            onClick={() => deleteFunc(data, parentId, fieldInfo)}
        />
    )
    if (inTopLevel) {
        return inner
    } else {
        return (
            <Wrapper checked $highlightColor={highlightColor} disabled={!canDelete} onSelect={() => deleteFunc(data, parentId, fieldInfo)}>
                <Indicator>
                    <FiTrash2 />
                </Indicator>
                {inner}
            </Wrapper>
        )
    }
}

const DropdownExtra = ({
    icon, contents, label, inTopLevel, data, blockSpec,
    isEditing, isCollapsed, isSelected, isDebugging,
    setIsEditing, setIsCollapsed, setIsSelected, setIsDebugging,
    interactionDisabled, parentId, fieldInfo, highlightColor, menuType }) => {

    const DropIcon = icon ? icon : inTopLevel ? FiMoreHorizontal : FiChevronRight;
    const TriggerComponent = menuType === MENU_TYPES.CONTEXT ? ContextMenuTriggerItem : inTopLevel ? DropdownMenuTrigger : DropdownMenuTriggerItem;
    const ContentComponent = menuType === MENU_TYPES.CONTEXT ? ContextMenuContent : DropdownMenuContent;
    const MenuComponent = menuType === MENU_TYPES.CONTEXT ? ContextMenu : DropdownMenu;
    const usedLabel = label ? label : 'More Options'

    return (
        <MenuComponent>
            <TriggerComponent asChild={inTopLevel} $highlightColor={highlightColor}>
                {inTopLevel ? (
                    <Button
                        size='small'
                        as='div'
                        focusIndicator={false}
                        hoverIndicator={false}
                        plain
                        style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
                        icon={inTopLevel ? <DropIcon /> : null}
                        label={inTopLevel ? null : usedLabel}
                    />
                ) : (
                    <>
                        <Button
                            size='small'
                            as='div'
                            focusIndicator={false}
                            hoverIndicator={false}
                            plain
                            style={{ padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt' }}
                            icon={inTopLevel ? <DropIcon /> : null}
                            label={inTopLevel ? null : usedLabel}
                        />
                        <RightSlot>
                            <DropIcon />
                        </RightSlot>
                    </>
                )}
            </TriggerComponent>
            <ContentComponent>
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
                            highlightColor={highlightColor}
                            menuType={menuType}
                        />)
                })}
            </ContentComponent>
        </MenuComponent>
    )
}

const ButtonSwitch = ({
    data, blockSpec, highlightColor,
    isEditing, setIsEditing,
    isCollapsed, setIsCollapsed,
    isSelected, setIsSelected,
    isDebugging, setIsDebugging,
    interactionDisabled, inTopLevel,
    feature, fieldInfo, parentId, menuType }) => {
    // console.log(highlightColor)
    let inner = null;

    if (feature === EXTRA_TYPES.LOCKED_INDICATOR) {
        inner = (
            <LockIndicatorExtra
                highlightColor={highlightColor}
                locked={!data.canEdit}
                inTopLevel={inTopLevel}
                interactionDisabled={interactionDisabled}
                menuType={menuType}
            />
        )
    } else if (feature === EXTRA_TYPES.NAME_EDIT_TOGGLE) {
        inner = (
            <NameEditToggleExtra
                highlightColor={highlightColor}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                locked={!data.canEdit}
                inTopLevel={inTopLevel}
                interactionDisabled={interactionDisabled}
                menuType={menuType}
                data={data}
            />
        )
    } else if (feature === EXTRA_TYPES.COLLAPSE_TOGGLE) {
        inner = (
            <CollapseToggleExtra
                highlightColor={highlightColor}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                inTopLevel={inTopLevel}
                interactionDisabled={interactionDisabled}
                menuType={menuType}
            />)
    } else if (feature === EXTRA_TYPES.SELECTION_TOGGLE) {
        inner = (
            <SelectionToggleExtra
                highlightColor={highlightColor}
                locked={interactionDisabled}
                data={data}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                inTopLevel={inTopLevel}
                menuType={menuType}
            />
        )
    } else if (feature === EXTRA_TYPES.DEBUG_TOGGLE) {
        inner = (
            <DebugToggleExtra
                highlightColor={highlightColor}
                isDebugging={isDebugging}
                setIsDebugging={setIsDebugging}
                inTopLevel={inTopLevel}
                menuType={menuType}
            />
        )
    } else if (feature === EXTRA_TYPES.DELETE_BUTTON) {
        inner = (
            <DeleteExtra
                highlightColor={highlightColor}
                data={data}
                inTopLevel={inTopLevel}
                locked={interactionDisabled}
                fieldInfo={fieldInfo}
                parentId={parentId}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.LABEL) {
        inner = (
            <LabelExtra
                inTopLevel={inTopLevel}
                label={feature.label}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
        inner = (
            <AddArgumentExtra
                highlightColor={highlightColor}
                data={data}
                argumentType={feature?.argumentType}
                interactionDisabled={interactionDisabled}
                inTopLevel={inTopLevel}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
        inner = (
            <AddArgumentGroupExtra
                highlightColor={highlightColor}
                data={data}
                allowed={feature?.allowed}
                interactionDisabled={interactionDisabled}
                inTopLevel={inTopLevel}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.FUNCTION_BUTTON) {
        inner = (
            <FunctionButtonExtra
                highlightColor={highlightColor}
                actionInfo={feature}
                data={data}
                blockSpec={blockSpec}
                interactionDisabled={interactionDisabled}
                inTopLevel={inTopLevel}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.INDICATOR_TEXT) {
        inner = (
            <IndicatorTextExtra
                highlightColor={highlightColor}
                value={feature.accessor(data)}
                label={feature.label}
                inTopLevel={inTopLevel}
                interactionDisabled={interactionDisabled}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.INDICATOR_ICON) {
        inner = (
            <IndicatorIconExtra
                highlightColor={highlightColor}
                value={feature.accessor(data)}
                label={feature.label}
                inTopLevel={inTopLevel}
                interactionDisabled={interactionDisabled}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
        inner = (
            <AddArgumentGroupExtra
                data={data}
                allowed={feature?.allowed}
                interactionDisabled={interactionDisabled}
                inTopLevel={inTopLevel}
                highlightColor={highlightColor}
                menuType={menuType}
            />
        )
    } else if (feature?.type === EXTRA_TYPES.DROPDOWN) {
        inner = (
            <DropdownExtra
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
                highlightColor={highlightColor}
                menuType={menuType}
            />)
    } else if (feature === EXTRA_TYPES.DIVIDER && !inTopLevel) {
        inner = menuType === MENU_TYPES.DROPDOWN ? <DropdownMenuSeparator /> : <ContextMenuSeparator />
    } else if (feature === EXTRA_TYPES.DIVIDER && inTopLevel) {
        inner = <OtherStyledSeparator decorative orientation='vertical' $height='15px'/>
    }
    return inner
}

export const ExtraBar = ({
    data, blockSpec, highlightColor,
    isEditing, setIsEditing,
    isCollapsed, setIsCollapsed,
    isSelected, setIsSelected,
    isDebugging, setIsDebugging,
    interactionDisabled, fieldInfo, parentId }) => {

    return (
        <Box direction='row' margin={{ left: 'xsmall' }} gap='none' align='center' alignContent='center' justify='between' flex={false}>
            <DropdownMenu>
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
                        highlightColor={highlightColor}
                        menuType={MENU_TYPES.DROPDOWN}
                    />
                ))}
            </DropdownMenu>

        </Box>
    )

}

const flattenMenuOnce = (extras) => {
    let pancaked = [];
    extras.forEach(extra => {
        if (extra.type === EXTRA_TYPES.DROPDOWN) {
            if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
                pancaked.push(EXTRA_TYPES.DIVIDER)
            }
            if (extra.label) {
                // console.log('creating label',extra.label)
                pancaked.push({ label: extra.label, type: EXTRA_TYPES.LABEL })
            }
            extra.contents.forEach(child => {
                if (child === EXTRA_TYPES.DIVIDER) {
                    if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
                        pancaked.push(EXTRA_TYPES.DIVIDER)
                    }
                } else {
                    pancaked.push(child);
                }
            })
            if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
                pancaked.push(EXTRA_TYPES.DIVIDER)
            }
        } else if (extra === EXTRA_TYPES.DIVIDER) {
            if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
                pancaked.push(EXTRA_TYPES.DIVIDER)
            }
        } else {
            pancaked.push(extra)
        }
    })
    if (pancaked[pancaked.length-1] === EXTRA_TYPES.DIVIDER) {
        pancaked.pop();
    }
    if (pancaked.length > 0 && pancaked[0] === EXTRA_TYPES.DIVIDER) {
        pancaked.shift();
    }
    // console.log(pancaked)
    return pancaked
}

export const RightClickMenu = ({
    data, blockSpec, highlightColor,
    isEditing, setIsEditing,
    isCollapsed, setIsCollapsed,
    isSelected, setIsSelected,
    isDebugging, setIsDebugging,
    interactionDisabled, fieldInfo, parentId }) => {
    const flattenedExtras = flattenMenuOnce(blockSpec?.extras);
    return (
        <>
            {flattenedExtras.map((extra, extraIdx) => (
                <ButtonSwitch
                    key={extraIdx}
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
                    feature={extra}
                    fieldInfo={fieldInfo}
                    parentId={parentId}
                    highlightColor={highlightColor}
                    menuType={MENU_TYPES.CONTEXT}
                />
            ))}
        </>
    )
}