import React, { ReactNode, memo } from "react";
import { Skeleton, Tooltip, lighten } from "@mui/material";
import { useProgrammingStore, ExecutionState, ProgrammingState } from "@people_and_robots/open-core";
import {
  FullWidthStack,
} from "./BlockContainers";
import { BlockAvatar } from "./BlockAvatar";
import { TextField } from "@people_and_robots/open-gui";

export interface BlockHeaderProps {
  id: string;
  progress: ExecutionState;
  color: string;
  limitedRender: boolean;
  editing: boolean;
  nameId: string;
  name: string;
  canDragBlockRFR: boolean;
  icon: ReactNode;
  canEdit: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const BlockHeader = memo(
  ({
    id,
    progress,
    color,
    limitedRender,
    editing,
    nameId,
    name,
    canDragBlockRFR,
    icon,
    canEdit,
    setIsEditing,
  }: BlockHeaderProps) => {
    
    const updateItemName: (id: string, value: string) => void = useProgrammingStore(
      (state:ProgrammingState) => state.updateItemName
    ) as (id: string, value: string) => void;

    // const setLocked = useProgrammingStore((state:ProgrammingState) => state.setLocked);

    return (
      <FullWidthStack
        alignContent="center"
        direction="row"
        spacing={1}
        onMouseLeave={(_) => setIsEditing(false)}
      >
        {!limitedRender ? (
          <BlockAvatar>
              {icon}
          </BlockAvatar>
        ) : (
          <Skeleton
            variant="rectangular"
            height="39px"
            width="39px"
            sx={{ borderRadius: 1, bgcolor: "#22222299" }}
          />
        )}

        {/* <div style={{display:'flex',flexDirection:1,flex:1,backgroundColor:'red'}}> */}
        {!limitedRender ? (
          <Tooltip
            key={`${id}-title`}
            title={name ? name : ""}
            enterDelay={2000}
            arrow
            placement="top"
            sx={{ color, fontSize: 50 }}
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
            <TextField
              key={`${id}-title`}
              hiddenLabel
              fullWidth
              active={editing}
              // label='Name'
              size="small"
              margin="none"
              variant="outlined"
              color="primary"
              className="nodrag"
              // onMouseEnter={editing ? (_) => setLocked(true) : null}
              // onMouseLeave={editing ? (_) => setLocked(false) : null}
              disabled={!editing}
              value={name ? name : ""}
              onChange={(e) => {
                updateItemName(nameId, e.target.value);
              }}
              editing={editing}
              onDoubleClick={() => setIsEditing(canEdit)}
            />
          </Tooltip>
        ) : (
          <Skeleton
            variant="rectangular"
            height="39px"
            width="100%"
            sx={{ borderRadius: 1, bgcolor: "#22222299" }}
          />
        )}
      </FullWidthStack>
    );
  }
);
