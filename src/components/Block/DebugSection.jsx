import React from "react";
import { Collapse, Box } from "@mui/material";

export const DebugSection = ({ interactionDisabled, data }) => {
  return (
    <Box
      style={{
        whiteSpace: "pre",
        color: "white",
        fontFamily: "monospace",
        backgroundColor:"#00000044",
        margin:'3px',
        padding:'5px',
        borderRadius:4
      }}
    >
      {JSON.stringify(
        {
          ...data,
          interactionDisabled: interactionDisabled ? true : false,
        },
        null,
        "  "
      )}
    </Box>
  );
};
