import React, {memo} from "react";
import { Box, Skeleton, TextField, Tooltip, Stack } from "@mui/material";
import { ProgressBar } from "./Progress";
import { useProgrammingStore } from "../ProgrammingContext";
import shallow from "zustand/shallow";
import { OuterAvatarContainer, InnerAvatarContainer, OuterProgressContainer } from "./BlockContainers";

export const BlockSettings = memo(({
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
}) => {
  const updateItemName = useProgrammingStore(
    (store) => store.updateItemName,
    shallow
  );

  const setLocked = useProgrammingStore((state) => state.setLocked, shallow);
  const Icon = icon;
  
  return (
    <Stack align="center" direction="row" spacing={1} sx={{ width: "100%" }}>
      {!limitedRender ? (
        <OuterAvatarContainer>
          <InnerAvatarContainer
            variant="rounded"
          >
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
                color,
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
            sx={{ color: "white" }}
            InputProps={{
              style: {
                color: "white",
                borderRadius: 5,
                backgroundColor: editing ? `${highlightColor}99` : "#22222299",
              },
            }}
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
    </Stack>
  );
});
