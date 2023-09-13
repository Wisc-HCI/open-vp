import React, { memo } from "react";
import { Skeleton, Tooltip, lighten } from "@mui/material";
import { ProgressBar } from "./Progress";
import { useProgrammingStore } from "../ProgrammingContext";
import { shallow } from "zustand/shallow";
import {
  OuterAvatarContainer,
  InnerAvatarContainer,
  OuterProgressContainer,
  FullWidthStack,
} from "../../../../open-blocks/src/BlockContainers";
import { HeaderField } from "./Utility";

export const BlockHeader = memo(
  ({
    id,
    highlightColor,
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
  }) => {
    const updateItemName = useProgrammingStore(
      (store) => store.updateItemName,
      shallow
    );

    const setLocked = useProgrammingStore((state) => state.setLocked, shallow);
    const Icon = icon;

    return (
      <FullWidthStack
        align="center"
        direction="row"
        spacing={1}
        onMouseLeave={(_) => setIsEditing(false)}
      >
        {!limitedRender ? (
          <OuterAvatarContainer>
            <InnerAvatarContainer variant="rounded">
              <Icon />
            </InnerAvatarContainer>
            <OuterProgressContainer>
              <ProgressBar progress={progress} color={highlightColor} />
            </OuterProgressContainer>
          </OuterAvatarContainer>
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
            <HeaderField
              key={`${id}-title`}
              hiddenLabel
              fullWidth
              active={editing}
              // label='Name'
              size="small"
              margin="none"
              variant="outlined"
              color="primary"
              className={canDragBlockRFR ? null : "nodrag"}
              onMouseEnter={editing ? (_) => setLocked(true) : null}
              onMouseLeave={editing ? (_) => setLocked(false) : null}
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
