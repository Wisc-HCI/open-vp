import { memo } from "react";
import { Skeleton, lighten, darken, useTheme } from "@mui/material";
import {
  useProgrammingStore,
  ExecutionState,
  ProgrammingState,
} from "@people_and_robots/open-core";
import { TextInput, Tooltip } from "@people_and_robots/open-gui";
import { Icon, type IconName } from "@people_and_robots/open-gui";
import { FullWidthStack } from "./BlockContainers";
import { BlockAvatar } from "./BlockAvatar";

export interface BlockHeaderProps {
  id: string;
  progress?: ExecutionState;
  color: string;
  limitedRender?: boolean;
  nameId: string;
  name: string;
  icon: IconName;
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
        (state: ProgrammingState) => state.updateItemName,
      ) as (id: string, value: string) => void;

    const theme = useTheme();

    return (
      <Tooltip
        key={`${id}-title`}
        title={name ? name : ""}
        placement="top"
        bgOverride={
          theme.palette.mode === "light"
            ? lighten(color, 0.5)
            : darken(color, 0.5)
        }
      >
        <FullWidthStack
          alignContent="center"
          direction="row"
          spacing={1}
          style={{ cursor: "move", userSelect: "none" }}
          // onMouseLeave={(_) => setIsEditing(false)}
        >
          {!limitedRender ? (
            <BlockAvatar progress={progress}>
              {/* @ts-ignore */}
              <Icon name={icon} size={22} />
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
              onBlur={() => setIsEditing(false)}
              onFocus={() => setIsEditing(true)}
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
  },
);
