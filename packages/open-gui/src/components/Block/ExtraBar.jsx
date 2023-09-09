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
  FiInfo,
  FiXCircle,
  FiChevronRight,
  FiScissors,
  FiCopy,
} from "react-icons/fi";
import { useProgrammingStore } from "../ProgrammingContext";
import { DATA_TYPES, EXTRA_TYPES } from "..";
import { ExpandCarrot } from "./ExpandCarrot";
import { DropdownTrigger, TooltippedToolbarButton } from "./Utility";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { shallow } from "zustand/shallow";
import { Badge, Stack } from "@mui/material";

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
      <TooltippedToolbarButton
        disabled={interactionDisabled}
        onClick={() => onClick(data, blockSpec)}
        title={actionInfo.label}
      >
        <ExtraActionIcon />
      </TooltippedToolbarButton>
    ) : (
      <MenuItem
        disabled={interactionDisabled}
        onClick={() => onClick(data, blockSpec)}
      >
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
    <TooltippedToolbarButton
      disabled
      canToggle
      toggled={locked}
      icon={<Icon />}
      title={locked ? "Locked" : "Unlocked"}
    >
      <Icon />
    </TooltippedToolbarButton>
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
      <TooltippedToolbarButton
        toggled={isEditing}
        canToggle
        disabled={disabled}
        onClick={() => setIsEditing(!isEditing)}
        title={isEditing ? "Save" : "Edit Name"}
      >
        <Icon />
      </TooltippedToolbarButton>
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
      <TooltippedToolbarButton
        disabled={disabled}
        onClick={() => setIsSelected(!isSelected)}
        title={isSelected ? "Deselect" : "Select"}
      >
        <Icon />
      </TooltippedToolbarButton>
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

const DocToggleExtra = memo(
  ({ docActive, setDocActive, inTopLevel, data, locked }) => {
    const Icon = docActive ? FiXCircle : FiInfo;
    const disabled = data.dataType === DATA_TYPES.INSTANCE && locked;

    const hasFeatured = useProgrammingStore(
      (state) =>
        state.featuredDocs[data.id] !== undefined ||
        state?.featuredDocs[data?.refData?.id] !== undefined,
      shallow
    );

    return inTopLevel ? (
      <Badge
        badgeContent={hasFeatured ? <span style={{ fontSize: 14 }}>!</span> : 0}
        overlap="circular"
        color="primary"
      >
        <TooltippedToolbarButton
          disabled={disabled}
          toggled={docActive}
          canToggle
          onClick={() => setDocActive(!docActive)}
          title={docActive ? "Close Doc" : "Show Doc"}
        >
          <Icon />
        </TooltippedToolbarButton>
      </Badge>
    ) : (
      <MenuItem onClick={() => setDocActive(!docActive)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>

        <Badge
          badgeContent={
            hasFeatured ? <span style={{ fontSize: 14 }}>!</span> : 0
          }
          color="primary"
        >
          <ListItemText
            primaryTypographyProps={{
              color: disabled ? "text.secondary" : "text.primary",
            }}
          >
            {docActive ? "Close Doc" : "Show Doc"}
          </ListItemText>
        </Badge>
      </MenuItem>
    );
  }
);

const CollapseToggleExtra = memo(
  ({ isCollapsed, setIsCollapsed, inTopLevel }) => {
    return inTopLevel ? (
      <TooltippedToolbarButton
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand" : "Collapse"}
      >
        <ExpandCarrot expanded={!isCollapsed} />
      </TooltippedToolbarButton>
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
    <TooltippedToolbarButton
      toggled={isDebugging}
      canToggle
      onClick={() => setIsDebugging(!isDebugging)}
      title={isDebugging ? "Cancel Debug" : "Debug"}
    >
      <Icon />
    </TooltippedToolbarButton>
  ) : (
    <MenuItem onClick={() => setIsDebugging(!isDebugging)}>
      <ListItemIcon>{<Icon />}</ListItemIcon>
      <ListItemText>{isDebugging ? "Cancel Debug" : "Debug"}</ListItemText>
    </MenuItem>
  );
});

const IndicatorTextExtra = memo(({ value, label, inTopLevel }) => {
  return inTopLevel ? (
    <TooltippedToolbarButton title={label} disabled>
      {value}
    </TooltippedToolbarButton>
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
    <TooltippedToolbarButton disabled title={label}>
      <Icon />
    </TooltippedToolbarButton>
  ) : (
    <MenuItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
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
        (state) => state.programSpec.objectTypes[argumentType],
        [argumentType]
      )
    );
    const Icon = typeSpec?.referenceBlock?.icon
      ? typeSpec.referenceBlock.icon
      : FiPlus;
    const addArgument = useProgrammingStore((state) => state.addArgument);

    return inTopLevel ? (
      <TooltippedToolbarButton
        disabled={interactionDisabled}
        onClick={() => addArgument(data.id, argumentType)}
        title={`Add ${typeSpec.name} Argument`}
      >
        <Icon />
      </TooltippedToolbarButton>
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
  ({ data, allowed, interactionDisabled, inTopLevel }) => {
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
      />
    );
  }
);

const DeleteExtra = memo(
  ({ data, inTopLevel, locked, fieldInfo, parentId }) => {
    const deleteFunc = useProgrammingStore((state) => state.deleteBlock);
    const canDeleteInstance =
      parentId === "spawner" &&
      data.dataType === DATA_TYPES.REFERENCE &&
      data.refData?.canDelete;
    const canDelete = (!locked && data.canDelete) || canDeleteInstance;

    return inTopLevel ? (
      <TooltippedToolbarButton
        disabled={!canDelete}
        onClick={() => deleteFunc(data, parentId, fieldInfo)}
        title='Delete'
      >
        <FiTrash2 />
      </TooltippedToolbarButton>
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

const CopyExtra = memo(({ inTopLevel, copyFn }) => {
  return inTopLevel ? (
    <TooltippedToolbarButton onClick={copyFn} title="Copy">
      <FiCopy />
    </TooltippedToolbarButton>
  ) : (
    // <Divider style={{fontFamily:'Helvetica'}}>{label}</Divider>
    <MenuItem onClick={copyFn}>
      <ListItemIcon>
        <FiCopy />
      </ListItemIcon>
      <ListItemText primary="Copy"></ListItemText>
    </MenuItem>
  );
});

const CutExtra = memo(({ inTopLevel, locked, cutFn }) => {
  // const cutFunc = useProgrammingStore((state) => state.cut);

  return inTopLevel ? (
    <TooltippedToolbarButton disabled={locked} onClick={cutFn} title="Cut">
      <FiScissors />
    </TooltippedToolbarButton>
  ) : (
    // <Divider style={{fontFamily:'Helvetica'}}>{label}</Divider>
    <MenuItem disabled={locked} onClick={cutFn}>
      <ListItemIcon>
        <FiScissors />
      </ListItemIcon>
      <ListItemText primary="Cut"></ListItemText>
    </MenuItem>
  );
});

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
    docActive,
    setIsEditing,
    setIsCollapsed,
    setIsSelected,
    setIsDebugging,
    setDocActive,
    interactionDisabled,
    parentId,
    fieldInfo,
    copyFn,
    cutFn,
  }) => {
    const DropIcon = icon
      ? icon
      : inTopLevel
      ? FiMoreHorizontal
      : FiChevronRight;

    const childProps = {
      data,
      blockSpec,
      isEditing,
      setIsEditing,
      isCollapsed,
      setIsCollapsed,
      isSelected,
      setIsSelected,
      isDebugging,
      setIsDebugging,
      docActive,
      setDocActive,
      interactionDisabled,
      fieldInfo,
      parentId,
      inTopLevel: false,
      copyFn,
      cutFn,
    };

    return (
      <DropdownTrigger
        isChild={!inTopLevel}
        triggerComponent={inTopLevel ? TooltippedToolbarButton : MenuItem}
        triggerProps={
          inTopLevel
            ? {
                key: JSON.stringify({ id: data.id, contents }),
                title: label,
                onClick: () => setIsEditing(!isEditing),
                children: (
                  <DropIcon key={JSON.stringify({ id: data.id, contents })} />
                ),
              }
            : {
                key: JSON.stringify({ id: data.id, contents }),
                onClick: () => setIsEditing(!isEditing),
                children: (
                  <>
                    <ListItemIcon>{<DropIcon />}</ListItemIcon>
                    <ListItemText primary={label}></ListItemText>
                  </>
                ),
              }
        }
      >
        {contents?.map((feature, featureIdx) => (
          <Item key={featureIdx} {...childProps} feature={feature} />
        ))}
      </DropdownTrigger>
    );
  }
);

const Item = ({
  data,
  blockSpec,
  isEditing,
  setIsEditing,
  isCollapsed,
  setIsCollapsed,
  isSelected,
  setIsSelected,
  docActive,
  setDocActive,
  isDebugging,
  setIsDebugging,
  interactionDisabled,
  inTopLevel,
  feature,
  fieldInfo,
  parentId,
  copyFn,
  cutFn,
}) => {
  if (feature === EXTRA_TYPES.LOCKED_INDICATOR) {
    // return null
    return (
      <LockIndicatorExtra
        locked={!data.canEdit}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
      />
    );
  } else if (feature === EXTRA_TYPES.NAME_EDIT_TOGGLE) {
    // return null
    return (
      <NameEditToggleExtra
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        locked={!data.canEdit}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
        data={data}
      />
    );
  } else if (feature === EXTRA_TYPES.COLLAPSE_TOGGLE) {
    // return null
    return (
      <CollapseToggleExtra
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
      />
    );
  } else if (feature === EXTRA_TYPES.SELECTION_TOGGLE) {
    // return null
    return (
      <SelectionToggleExtra
        locked={interactionDisabled}
        data={data}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        inTopLevel={inTopLevel}
      />
    );
  } else if (feature === EXTRA_TYPES.DOC_TOGGLE) {
    // return null
    return (
      <DocToggleExtra
        locked={interactionDisabled}
        data={data}
        docActive={docActive}
        setDocActive={setDocActive}
        inTopLevel={inTopLevel}
      />
    );
  } else if (feature === EXTRA_TYPES.DEBUG_TOGGLE) {
    // return null
    return (
      <DebugToggleExtra
        isDebugging={isDebugging}
        setIsDebugging={setIsDebugging}
        inTopLevel={inTopLevel}
      />
    );
  } else if (feature === EXTRA_TYPES.DELETE_BUTTON) {
    // return null
    return (
      <DeleteExtra
        data={data}
        inTopLevel={inTopLevel}
        locked={interactionDisabled}
        fieldInfo={fieldInfo}
        parentId={parentId}
      />
    );
  } else if (feature === EXTRA_TYPES.CUT_BUTTON) {
    // return null
    return (
      <CutExtra
        data={data}
        inTopLevel={inTopLevel}
        locked={interactionDisabled}
        fieldInfo={fieldInfo}
        parentId={parentId}
        cutFn={cutFn}
      />
    );
  } else if (feature === EXTRA_TYPES.COPY_BUTTON) {
    // return null
    return (
      <CopyExtra
        data={data}
        inTopLevel={inTopLevel}
        locked={interactionDisabled}
        fieldInfo={fieldInfo}
        parentId={parentId}
        copyFn={copyFn}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.LABEL) {
    // return null
    return <LabelExtra inTopLevel={inTopLevel} label={feature.label} />;
  } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT) {
    // return null
    return (
      <AddArgumentExtra
        data={data}
        argumentType={feature?.argumentType}
        interactionDisabled={interactionDisabled}
        inTopLevel={inTopLevel}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
    // return null
    return (
      <AddArgumentGroupExtra
        data={data}
        allowed={feature?.allowed}
        interactionDisabled={interactionDisabled}
        inTopLevel={inTopLevel}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.FUNCTION_BUTTON) {
    // return null
    return (
      <FunctionButtonExtra
        actionInfo={feature}
        data={data}
        blockSpec={blockSpec}
        interactionDisabled={interactionDisabled}
        inTopLevel={inTopLevel}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.INDICATOR_TEXT) {
    // return null
    return (
      <IndicatorTextExtra
        value={feature.accessor(data)}
        label={feature.label}
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
      />
    );
  } else if (feature?.type === EXTRA_TYPES.INDICATOR_ICON) {
    // return null;
    return (
      <IndicatorIconExtra
        value={feature.accessor(data)}
        label={
          typeof feature.label === "string"
            ? feature.label
            : feature.label(data)
        }
        inTopLevel={inTopLevel}
        interactionDisabled={interactionDisabled}
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
        docActive={docActive}
        setIsEditing={setIsEditing}
        setIsCollapsed={setIsCollapsed}
        setIsSelected={setIsSelected}
        setIsDebugging={setIsDebugging}
        setDocActive={setDocActive}
        interactionDisabled={interactionDisabled}
        parentId={parentId}
        fieldInfo={fieldInfo}
        cutFn={cutFn}
        copyFn={copyFn}
      />
    );
  } else if (feature === EXTRA_TYPES.DIVIDER) {
    return <Divider />;
  }
  console.warn("Not Handled", { feature });
  return <MenuItem>Not Handled</MenuItem>;
};

export const ExtraBar = memo(
  ({
    data,
    blockSpec,
    isEditing,
    setIsEditing,
    isCollapsed,
    setIsCollapsed,
    isSelected,
    setIsSelected,
    isDebugging,
    setIsDebugging,
    docActive,
    setDocActive,
    interactionDisabled,
    fieldInfo,
    parentId,
    cutFn,
    copyFn,
    inDrawer = false,
  }) => {
    const childProps = {
      data,
      blockSpec,
      isEditing,
      setIsEditing,
      isCollapsed,
      setIsCollapsed,
      isSelected,
      setIsSelected,
      isDebugging,
      setIsDebugging,
      docActive,
      setDocActive,
      interactionDisabled,
      fieldInfo,
      parentId,
      cutFn,
      copyFn,
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
      <Stack
        direction="row"
        gap={0.5}
        alignItems='center'
      >
        {extras.map((extra, extraIdx) => (
          <Item key={extraIdx} {...childProps} feature={extra} />
        ))}
      </Stack>
    );
  }
);

const flattenMenuOnce = (extras) => {
  let pancaked = [
    EXTRA_TYPES.COPY_BUTTON,
    EXTRA_TYPES.CUT_BUTTON,
    EXTRA_TYPES.DIVIDER,
  ];
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
    isEditing,
    setIsEditing,
    isCollapsed,
    setIsCollapsed,
    isSelected,
    setIsSelected,
    isDebugging,
    setIsDebugging,
    docActive,
    setDocActive,
    interactionDisabled,
    fieldInfo,
    parentId,
    copyFn,
    cutFn,
  }) => {
    const flattenedExtras = flattenMenuOnce(blockSpec?.extras);
    const childProps = {
      data,
      blockSpec,
      isEditing,
      setIsEditing,
      isCollapsed,
      setIsCollapsed,
      isSelected,
      setIsSelected,
      isDebugging,
      setIsDebugging,
      docActive,
      setDocActive,
      interactionDisabled,
      fieldInfo,
      parentId,
      copyFn,
      cutFn,
      inTopLevel: false,
    };
    return (
      <MenuList key={`${data.id}-rcm`}>
        {flattenedExtras.map((extra, extraIdx) => (
          <Item key={extraIdx} {...childProps} feature={extra} />
        ))}
      </MenuList>
    );
  }
);
