import React, { ReactNode, memo } from "react";
import { Skeleton, Tooltip, lighten } from "@mui/material";
import {
  useProgrammingStore,
  ExecutionState,
  ProgrammingState,
} from "@people_and_robots/open-core";
import { FullWidthStack } from "./BlockContainers";
import { BlockAvatar } from "./BlockAvatar";
import { TextInput } from "@people_and_robots/open-gui";

export interface BlockHeaderProps {
  id: string;
  progress?: ExecutionState;
  color: string;
  limitedRender?: boolean;
  nameId: string;
  name: string;
  icon: ReactNode;
  editing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const BlockHeader = memo(
  ({
    id,
    progress,
    color,
    limitedRender,
    nameId,
    name,
    icon,
    editing,
    setIsEditing,
  }: BlockHeaderProps) => {
    const updateItemName: (id: string, value: string) => void =
      useProgrammingStore(
        (state: ProgrammingState) => state.updateItemName
      ) as (id: string, value: string) => void;

    const Icon = icon;
    // const setLocked = useProgrammingStore((state:ProgrammingState) => state.setLocked);

    return (
      <Tooltip
        key={`${id}-title`}
        title={name ? name : ""}
        enterDelay={2000}
        arrow
        placement="top"
        sx={{ color }}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "common.black",
              color: lighten(color, 0.5),
              fontSize: 14,
              "& .MuiTooltip-arrow": {
                color: "common.black",
              },
            },
          },
        }}
      >
        <FullWidthStack
          alignContent="center"
          direction="row"
          spacing={1}
          style={{cursor: "move", userSelect: "none"}}
          // onMouseLeave={(_) => setIsEditing(false)}
        >
          {!limitedRender ? (
            <BlockAvatar progress={progress}>
              {/* @ts-ignore */}
              <Icon />
            </BlockAvatar>
          ) : (
            <Skeleton
              variant="rectangular"
              height={35}
              width={35}
              sx={{ borderRadius: 1, bgcolor: "#22222299" }}
            />
          )}

          {limitedRender ? (
            <Skeleton
              variant="rectangular"
              height={35}
              width="100%"
              sx={{ borderRadius: 1, bgcolor: "#22222299" }}
            />
          ) : (
            <TextInput
              hideLabelPrefix
              key={`${id}-title`}
              value={name ? name : ""}
              onChange={(e) => {
                updateItemName(nameId, e.target.value);
              }}
              readonly={!editing}

              // editing={editing}
              onDoubleClick={(e) => {
                setIsEditing(!editing);
                e.stopPropagation();
              }}
              disableDrag={editing}
            />
          )}

          {/* {!limitedRender ? (
            <TextInput
              hideLabelPrefix
              key={`${id}-title`}
              value={name ? name : ""}
              onChange={(e) => {
                updateItemName(nameId, e.target.value);
              }}
              style={{ width: "100%" }}
              // editing={editing}
              // onDoubleClick={() => setIsEditing(canEdit)}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={35}
              width="100%"
              sx={{ borderRadius: 1, bgcolor: "#22222299" }}
            />
          )} */}
        </FullWidthStack>
      </Tooltip>
    );
  }
);
