import React, { memo } from "react";
import { useCallback } from "react";
import {
  FiLock,
  FiUnlock,
  FiMoreHorizontal,
  FiCircle,
  FiEdit3,
  FiSave,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiZap,
  FiZapOff,
  FiPlus,
} from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useProgrammingStore } from "../ProgrammingContext";
import { DATA_TYPES, EXTRA_TYPES } from "..";
import { ExpandCarrot } from "./ExpandCarrot";
import { DropdownTrigger } from "./Utility";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const FunctionButtonExtra = memo(
  ({ actionInfo, data, blockSpec, inTopLevel, interactionDisabled }) => {
    const onClick = useProgrammingStore(
      useCallback(
        (state) => {
          if (typeof actionInfo.onClick === "function") {
            return actionInfo.onClick;
          } else {
            return state[actionInfo.onClick];
          }
        },
        [actionInfo]
      )
    );

    const ExtraActionIcon = actionInfo.icon ? actionInfo.icon : FiCircle;
    return inTopLevel ? (
      <IconButton
        disabled={interactionDisabled}
        onClick={() => onClick(data, blockSpec)}
      >
        <ExtraActionIcon />
      </IconButton>
    ) : (
      <MenuItem disabled={interactionDisabled} onClick={() => onClick(data, blockSpec)}>
        <ListItemIcon>
          <ExtraActionIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: interactionDisabled ? "text.secondary" : "text.primary",
          }}
        >
          {actionInfo.label}
        </ListItemText>
      </MenuItem>
    );
  }
);

const LabelExtra = memo(({ inTopLevel, label }) => {
  return inTopLevel ? (
    <Button disabled>{label}</Button>
  ) : (
    // <Divider style={{fontFamily:'Helvetica'}}>{label}</Divider>
    <ListItemText
      primaryTypographyProps={{ color: "text.secondary" }}
      style={{ marginLeft: 10, opacity: 0.5 }}
    >
      {label}
    </ListItemText>
  );
});

const LockIndicatorExtra = memo(({ locked, inTopLevel }) => {
  const Icon = locked ? FiLock : FiUnlock;

  return inTopLevel ? (
    <IconButton disableFocusRipple disableTouchRipple>
      <Icon />
    </IconButton>
  ) : (
    <MenuItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ color: "text.secondary" }}>
        {locked ? "Locked" : "Unlocked"}
      </ListItemText>
    </MenuItem>
  );
});

const NameEditToggleExtra = memo(
  ({
    isEditing,
    setIsEditing,
    locked,
    interactionDisabled,
    inTopLevel,
    data,
  }) => {
    const Icon = isEditing ? FiSave : FiEdit3;
    const disabled =
      locked || (interactionDisabled && data.dataType !== DATA_TYPES.REFERENCE);

    return inTopLevel ? (
      <IconButton disabled={disabled} onClick={() => setIsEditing(!isEditing)}>
        <Icon />
      </IconButton>
    ) : (
      <MenuItem onClick={() => setIsEditing(!isEditing)}>
        <ListItemIcon>{<Icon />}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: disabled ? "text.secondary" : "text.primary",
          }}
        >
          {isEditing ? "Save" : "Edit Name"}
        </ListItemText>
      </MenuItem>
    );
  }
);

const SelectionToggleExtra = memo(
  ({ isSelected, setIsSelected, inTopLevel, data, locked }) => {
    const Icon = isSelected ? FiEyeOff : FiEye;
    const disabled = data.dataType === DATA_TYPES.INSTANCE && locked;

    return inTopLevel ? (
      <IconButton
        disabled={disabled}
        onClick={() => setIsSelected(!isSelected)}
      >
        <Icon />
      </IconButton>
    ) : (
      <MenuItem onClick={() => setIsSelected(!isSelected)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: disabled ? "text.secondary" : "text.primary",
          }}
        >
          {isSelected ? "Deselect" : "Select"}
        </ListItemText>
      </MenuItem>
    );
  }
);

const CollapseToggleExtra = memo(
  ({ isCollapsed, setIsCollapsed, inTopLevel }) => {
    return inTopLevel ? (
      <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
        <ExpandCarrot expanded={!isCollapsed} />
      </IconButton>
    ) : (
      <MenuItem onClick={() => setIsCollapsed(!isCollapsed)}>
        <ListItemIcon>{<ExpandCarrot expanded={!isCollapsed} />}</ListItemIcon>
        <ListItemText>{isCollapsed ? "Expand" : "Collapse"}</ListItemText>
      </MenuItem>
    );
  }
);

const DebugToggleExtra = memo(({ isDebugging, setIsDebugging, inTopLevel }) => {
  const Icon = isDebugging ? FiZapOff : FiZap;

  return inTopLevel ? (
    <IconButton onClick={() => setIsDebugging(!isDebugging)}>
      <Icon />
    </IconButton>
  ) : (
    <MenuItem onClick={() => setIsDebugging(!isDebugging)}>
      <ListItemIcon>{<Icon />}</ListItemIcon>
      <ListItemText>{isDebugging ? "Cancel Debug" : "Debug"}</ListItemText>
    </MenuItem>
  );
});

const IndicatorTextExtra = memo(({ value, label, inTopLevel }) => {
  return inTopLevel ? (
    <IconButton>
      <Chip size="small" label={value} />
    </IconButton>
  ) : (
    <MenuItem>
      <ListItemIcon>
        <Chip size="small" label={value} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ color: "text.secondary" }}>
        {label}
      </ListItemText>
    </MenuItem>
  );
});

const IndicatorIconExtra = memo(({ value, label, inTopLevel }) => {
  const Icon = value;
  return inTopLevel ? (
    <IconButton><Icon/></IconButton>
  ) : (
    <MenuItem>
      <ListItemIcon><Icon/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ color: "text.secondary" }}>
        {label}
      </ListItemText>
    </MenuItem>
  );
});

const AddArgumentExtra = memo(
  ({ data, argumentType, interactionDisabled, inTopLevel }) => {
    const typeSpec = useProgrammingStore(
      useCallback(
        (store) => store.programSpec.objectTypes[argumentType],
        [argumentType]
      )
    );
    const Icon = typeSpec?.referenceBlock?.icon
      ? typeSpec.referenceBlock.icon
      : FiPlus;
    const addArgument = useProgrammingStore((store) => store.addArgument);

    return inTopLevel ? (
      <IconButton
        disabled={interactionDisabled}
        onClick={() => addArgument(data.id, argumentType)}
      >
        <Icon />
      </IconButton>
    ) : (
      <MenuItem
        disabled={interactionDisabled}
        onClick={() => addArgument(data.id, argumentType)}
      >
        <ListItemIcon>{<Icon />}</ListItemIcon>
        <ListItemText>{`Add ${typeSpec.name} Argument`}</ListItemText>
      </MenuItem>
    );
  }
);

const AddArgumentGroupExtra = memo(
  ({
    data,
    allowed,
    interactionDisabled,
    inTopLevel,
    highlightColor,
    menuType,
  }) => {
    return (
      <DropdownExtra
        icon={FiPlus}
        label="Add Argument"
        contents={allowed.map((argumentType) => ({
          type: EXTRA_TYPES.ADD_ARGUMENT,
          argumentType,
        }))}
        inTopLevel={inTopLevel}
        data={data}
        interactionDisabled={interactionDisabled}
        highlightColor={highlightColor}
        menuType={menuType}
      />
    );
  }
);

const DeleteExtra = memo(
  ({
    data,
    inTopLevel,
    locked,
    fieldInfo,
    parentId,
    highlightColor,
    menuType,
  }) => {
    const deleteFunc = useProgrammingStore((state) => state.deleteBlock);
    const canDeleteInstance =
      parentId === "spawner" &&
      data.dataType === DATA_TYPES.REFERENCE &&
      data.refData?.canDelete;
    const canDelete = (!locked && data.canDelete) || canDeleteInstance;

    return inTopLevel ? (
      <IconButton
        disabled={!canDelete}
        onClick={() => deleteFunc(data, parentId, fieldInfo)}
      >
        <FiTrash2 />
      </IconButton>
    ) : (
      <MenuItem
        disabled={!canDelete}
        onClick={() => deleteFunc(data, parentId, fieldInfo)}
      >
        <ListItemIcon>
          <FiTrash2 />
        </ListItemIcon>
        <ListItemText primary="Delete"></ListItemText>
      </MenuItem>
    );
  }
);

const DropdownExtra = memo(
  ({
    icon,
    contents,
    label = "More Options",
    inTopLevel,
    data,
    blockSpec,
    isEditing,
    isCollapsed,
    isSelected,
    isDebugging,
    setIsEditing,
    setIsCollapsed,
    setIsSelected,
    setIsDebugging,
    interactionDisabled,
    parentId,
    fieldInfo,
    highlightColor,
  }) => {
    const DropIcon = icon
      ? icon
      : inTopLevel
      ? FiMoreHorizontal
      : FiChevronRight;

    const childProps = {
      data,
      blockSpec,
      highlightColor,
      isEditing,
      setIsEditing,
      isCollapsed,
      setIsCollapsed,
      isSelected,
      setIsSelected,
      isDebugging,
      setIsDebugging,
      interactionDisabled,
      fieldInfo,
      parentId,
      inTopLevel: false,
    };

    return (
      <DropdownTrigger
        isChild={!inTopLevel}
        triggerComponent={inTopLevel ? IconButton : MenuItem}
        triggerProps={
          inTopLevel
            ? {
                key:JSON.stringify({id:data.id,contents}),
                onClick: () => setIsEditing(!isEditing),
                children: <DropIcon key={JSON.stringify({id:data.id,contents})}/>,
              }
            : {
                key:JSON.stringify({id:data.id,contents}),
                onClick: () => setIsEditing(!isEditing),
                children: 
                  <>
                    <ListItemIcon>{<DropIcon />}</ListItemIcon>
                    <ListItemText primary={label}></ListItemText>
                  </>
                ,
              }
        }
      >
        
        {contents?.map((feature, featureIdx) =>
          <Item key={featureIdx} {...childProps} feature={feature}/>
        )}
        
        
      </DropdownTrigger>
    );
  }
);

const Item = ({
  data,
  blockSpec,
  highlightColor,
  isEditing,
  setIsEditing,
  isCollapsed,
  setIsCollapsed,
  isSelected,
  setIsSelected,
  isDebugging,
  setIsDebugging,
  interactionDisabled,
  inTopLevel,
  feature,
  fieldInfo,
  parentId,
  menuType,
}) => {
  // console.log(highlightColor)

  if (feature === EXTRA_TYPES.LOCKED_INDICATOR) {
    // return null
    return (
      <LockIndicatorExtra
        highlightColor={highlightColor}
        locked={!data.canEdit}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
        menuType={menuType}
      />
    );
  } else if (feature === EXTRA_TYPES.NAME_EDIT_TOGGLE) {
    // return null
    return (
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
    );
  } else if (feature === EXTRA_TYPES.COLLAPSE_TOGGLE) {
    // return null
    return (
      <CollapseToggleExtra
        highlightColor={highlightColor}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
        menuType={menuType}
      />
    );
  } else if (feature === EXTRA_TYPES.SELECTION_TOGGLE) {
    // return null
    return (
      <SelectionToggleExtra
        highlightColor={highlightColor}
        locked={interactionDisabled}
        data={data}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        inTopLevel={inTopLevel}
        menuType={menuType}
      />
    );
  } else if (feature === EXTRA_TYPES.DEBUG_TOGGLE) {
    // return null
    return (
      <DebugToggleExtra
        highlightColor={highlightColor}
        isDebugging={isDebugging}
        setIsDebugging={setIsDebugging}
        inTopLevel={inTopLevel}
        menuType={menuType}
      />
    );
  } else if (feature === EXTRA_TYPES.DELETE_BUTTON) {
    // return null
    return (
      <DeleteExtra
        highlightColor={highlightColor}
        data={data}
        inTopLevel={inTopLevel}
        locked={interactionDisabled}
        fieldInfo={fieldInfo}
        parentId={parentId}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.LABEL) {
    // return null
    return (
      <LabelExtra
        inTopLevel={inTopLevel}
        label={feature.label}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
    // return null
    return (
      <AddArgumentExtra
        highlightColor={highlightColor}
        data={data}
        argumentType={feature?.argumentType}
        interactionDisabled={interactionDisabled}
        inTopLevel={inTopLevel}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
    // return null
    return (
      <AddArgumentGroupExtra
        highlightColor={highlightColor}
        data={data}
        allowed={feature?.allowed}
        interactionDisabled={interactionDisabled}
        inTopLevel={inTopLevel}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.FUNCTION_BUTTON) {
    // return null
    return (
      <FunctionButtonExtra
        highlightColor={highlightColor}
        actionInfo={feature}
        data={data}
        blockSpec={blockSpec}
        interactionDisabled={interactionDisabled}
        inTopLevel={inTopLevel}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.INDICATOR_TEXT) {
    // return null
    return (
      <IndicatorTextExtra
        highlightColor={highlightColor}
        value={feature.accessor(data)}
        label={feature.label}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.INDICATOR_ICON) {
    // return null;
    return (
      <IndicatorIconExtra
        highlightColor={highlightColor}
        value={feature.accessor(data)}
        label={typeof feature.label === 'string' ? feature.label : feature.label(data)}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
        menuType={menuType}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.DROPDOWN) {
    // return null
    return (
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
      />
    );
  } else if (feature === EXTRA_TYPES.DIVIDER) {
    return <Divider  />;
  }
  console.warn("Not Handled", { feature });
  return <MenuItem >Not Handled</MenuItem>;
};

export const ExtraBar = memo(
  ({
    data,
    blockSpec,
    highlightColor,
    isEditing,
    setIsEditing,
    isCollapsed,
    setIsCollapsed,
    isSelected,
    setIsSelected,
    isDebugging,
    setIsDebugging,
    interactionDisabled,
    fieldInfo,
    parentId,
    inDrawer = false,
  }) => {
    const childProps = {
      data,
      blockSpec,
      highlightColor,
      isEditing,
      setIsEditing,
      isCollapsed,
      setIsCollapsed,
      isSelected,
      setIsSelected,
      isDebugging,
      setIsDebugging,
      interactionDisabled,
      fieldInfo,
      parentId,
      inTopLevel: true,
    };

    const extras = !blockSpec?.extras
      ? []
      : inDrawer
      ? [
          {
            type: EXTRA_TYPES.DROPDOWN,
            contents: flattenMenuOnce(blockSpec.extras),
          },
        ]
      : blockSpec.extras;
    return (
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        color="inherit"
      >
        {extras.map((extra, extraIdx) =>
          <Item key={extraIdx} {...childProps} feature={extra}/>
        )}
      </ButtonGroup>
    );
  }
);

const flattenMenuOnce = (extras) => {
  let pancaked = [];
  extras?.forEach((extra) => {
    if (extra.type === EXTRA_TYPES.DROPDOWN) {
      if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
        pancaked.push(EXTRA_TYPES.DIVIDER);
      }
      if (extra.label) {
        // console.log('creating label',extra.label)
        pancaked.push({ label: extra.label, type: EXTRA_TYPES.LABEL });
      }
      extra.contents.forEach((child) => {
        if (child === EXTRA_TYPES.DIVIDER) {
          if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
            pancaked.push(EXTRA_TYPES.DIVIDER);
          }
        } else {
          pancaked.push(child);
        }
      });
      if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
        pancaked.push(EXTRA_TYPES.DIVIDER);
      }
    } else if (extra === EXTRA_TYPES.DIVIDER) {
      if (pancaked[pancaked.length - 1] !== EXTRA_TYPES.DIVIDER) {
        pancaked.push(EXTRA_TYPES.DIVIDER);
      }
    } else {
      pancaked.push(extra);
    }
  });
  if (pancaked[pancaked.length - 1] === EXTRA_TYPES.DIVIDER) {
    pancaked.pop();
  }
  if (pancaked.length > 0 && pancaked[0] === EXTRA_TYPES.DIVIDER) {
    pancaked.shift();
  }
  // console.log(pancaked)
  if (pancaked.length === 0) {
    pancaked.push({ label: "No Actions", type: EXTRA_TYPES.LABEL });
  }
  return pancaked;
};

export const RightClickMenu = memo(
  ({
    data,
    blockSpec,
    highlightColor,
    isEditing,
    setIsEditing,
    isCollapsed,
    setIsCollapsed,
    isSelected,
    setIsSelected,
    isDebugging,
    setIsDebugging,
    interactionDisabled,
    fieldInfo,
    parentId,
  }) => {
    const flattenedExtras = flattenMenuOnce(blockSpec?.extras);
    const childProps = {
      data,
      blockSpec,
      highlightColor,
      isEditing,
      setIsEditing,
      isCollapsed,
      setIsCollapsed,
      isSelected,
      setIsSelected,
      isDebugging,
      setIsDebugging,
      interactionDisabled,
      fieldInfo,
      parentId,
      inTopLevel: false,
    };
    return (
      <MenuList key={`${data.id}-rcm`}>
        {flattenedExtras.map((extra, extraIdx) =>
          <Item key={extraIdx} {...childProps} feature={extra}/>
        )}
      </MenuList>
    );
  }
);
