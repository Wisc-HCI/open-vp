import React, { useState } from "react";
import { Block } from "./Block";
// import { useSpring, animated } from "@react-spring/web";
// import { config } from "react-spring";
import { useProgrammingStore } from "./ProgrammingContext";
// import { Button, Box, Text, Sidebar, Nav } from "grommet";
import { FiPlus, FiSearch } from "react-icons/fi";
import { DATA_TYPES } from "./Constants";
import {
  instanceTemplateFromSpec,
  referenceTemplateFromSpec,
  callTemplateFromSpec,
} from "./Generators";
import { Canvas } from "./Canvas";
import useMeasure from "react-use-measure";
import { ScrollRegion } from "./Block/Utility";
// import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import shallow from "zustand/shallow";
import { stringEquality } from "./Block/Utility";
import { Stack, Box, Collapse, Card, Alert, AlertTitle } from "@mui/material";
import { CanvasTabs } from "./CanvasTabs";
import { useViewport, useReactFlow } from "reactflow";

const SectionStrip = ({ setSearchTerm, setActiveDrawer }) => {
  const drawers = useProgrammingStore(
    (store) => store.programSpec.drawers,
    shallow
  );
  const activeDrawer = useProgrammingStore(
    (store) => store.activeDrawer,
    shallow
  );
  return (
    <Stack direction="column" sx={{ padding: "5px" }} spacing={1}>
      {/* <Nav gap="xxsmall"> */}
      {drawers.map((drawer, drawerIdx) => {
        // console.log(drawerIdx);
        const Icon = drawer.icon;
        return (
          <Tooltip
            key={`${drawer.title}-${drawerIdx}-drawer-tt`}
            title={<Typography>{drawer.title}</Typography>}
            arrow
            placement="right"
          >
            <IconButton
              size="large"
              key={`${drawer.title}-${drawerIdx}-drawer-icon`}
              color={activeDrawer === drawerIdx ? "primary" : "vibrant"}
              onClick={() => {
                setSearchTerm("");
                setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx);
              }}
            >
              <Icon width={30} />
            </IconButton>
          </Tooltip>
        );
      })}
      {/* </Nav> */}
    </Stack>
  );
};

const BlockPanel = ({
  searchTerm,
  setSearchTerm,
  drawerWidth,
  highlightColor,
}) => {
  const drawers = useProgrammingStore(
    (store) => store.programSpec.drawers,
    shallow
  );
  const activeDrawer = useProgrammingStore(
    (store) => store.activeDrawer,
    shallow
  );
  const addInstance = useProgrammingStore(
    (store) => store.addInstance,
    shallow
  );

  const [entries, contentType, objectType, objectTypeInfo] =
    useProgrammingStore(
      // useCallback(
      (store) => {
        if (activeDrawer !== null) {
          const drawer = store.programSpec.drawers[activeDrawer];
          if (drawer.dataType === DATA_TYPES.INSTANCE) {
            let entries = drawer.objectTypes.map((t) => ({
              blockType: t,
              ...store.programSpec.objectTypes[t],
            }));
            return [entries, drawer.dataType, null, null];
          } else if (
            drawer.dataType === DATA_TYPES.REFERENCE ||
            drawer.dataType === DATA_TYPES.CALL
          ) {
            let entries = Object.values(store.programData).filter(
              (d) =>
                d.dataType === DATA_TYPES.INSTANCE &&
                d.type === drawer.objectType
            );
            return [
              entries,
              drawer.dataType,
              drawer.objectType,
              store.programSpec.objectTypes[drawer.objectType],
            ];
          } else {
            return [[], null, null, null];
          }
        } else {
          return [[], null, null, null];
        }
      },
      //   [activeDrawer, searchTerm]
      // ),
      stringEquality
    );

  const blocks =
    contentType === DATA_TYPES.INSTANCE
      ? entries.map((e) => instanceTemplateFromSpec(e.blockType, e))
      : contentType === DATA_TYPES.REFERENCE
      ? entries.map((e) =>
          referenceTemplateFromSpec(objectType, e, objectTypeInfo)
        )
      : contentType === DATA_TYPES.CALL
      ? entries.map((e) => callTemplateFromSpec(objectType, e, objectTypeInfo))
      : [];

  const [drawerRef, drawerBounds] = useMeasure();
  const [headerRef, headerBounds] = useMeasure();

  return (
    <Stack
      ref={drawerRef}
      direction="column"
      sx={{
        width: `${drawerWidth}px`,
        backgroundColor: "#222222ee",
        height: "100%"
      }}
    >
      <Stack
        ref={headerRef}
        sx={{ backgroundColor: "#44444499", padding: "10px" }}
        direction="column"
        spacing={1}
      >
        <Stack
          direction="row"
          sx={{ alignItems: "center", justify: "space-between", width: "100%" }}
          justifyContent="space-between"
        >
          <Typography color="white">
            {activeDrawer !== null && drawers[activeDrawer].title}
          </Typography>
          {activeDrawer !== null &&
            drawers[activeDrawer].dataType === DATA_TYPES.REFERENCE && !objectTypeInfo?.instanceBlock?.onCanvas && (
              <IconButton
                onClick={() => addInstance(drawers[activeDrawer].objectType)}
              >
                <FiPlus />
              </IconButton>
            )}
        </Stack>
        <TextField
          size="small"
          label="Search"
          color="primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch style={{ height: 15 }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Box sx={{ flex: 1, width: drawerWidth }}>
        <ScrollRegion
          height={drawerBounds.height - headerBounds.height}
          vertical
        >
          <Stack direction="column" gap={0.5} sx={{ padding: "4px" }}>
            {blocks
              .filter(
                (b) =>
                  searchTerm === "" ||
                  b.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((block) => (
                <Block
                  key={block.id}
                  staticData={block}
                  parentId="spawner"
                  bounded
                  highlightColor={highlightColor}
                  context={[]}
                  interactionDisabled
                  fieldInfo={{
                    name: "",
                    value: null,
                    accepts: [],
                    isSpawner: true,
                  }}
                />
              ))}
          </Stack>
        </ScrollRegion>
      </Box>
    </Stack>
  );
};

export const Contents = ({
  highlightColor,
  drawerWidth = 235,
  snapToGrid,
  animateDrawer,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const activeDrawer = useProgrammingStore(
    (store) => store.activeDrawer,
    shallow
  );
  const setActiveDrawer = useProgrammingStore(
    (store) => store.setActiveDrawer,
    shallow
  );

  const activeTab = useProgrammingStore((store) => store.activeTab, shallow);

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flex: 1,
        padding: 0,
      }}
    >
      <SectionStrip
        highlightColor={highlightColor}
        setActiveDrawer={setActiveDrawer}
        setSearchTerm={setSearchTerm}
      />
      {animateDrawer ? (
        <Collapse
          in={animateDrawer && activeDrawer !== null}
          orientation="horizontal"
        >
          {activeDrawer !== null && (
            <BlockPanel
              searchTerm={searchTerm}
              drawerWidth={drawerWidth}
              highlightColor={highlightColor}
              setSearchTerm={setSearchTerm}
            />
          )}
        </Collapse>
      ) : activeDrawer !== null ? (
        <BlockPanel
          searchTerm={searchTerm}
          drawerWidth={drawerWidth}
          highlightColor={highlightColor}
          setSearchTerm={setSearchTerm}
        />
      ) : null}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flex: 1,
          padding: 0,
        }}
      >
        <CanvasTabs />
        {activeTab ? (
          <Canvas highlightColor={highlightColor} snapToGrid={snapToGrid} drawerWidth={drawerWidth}/>
        ) : (
          <div
            style={{
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flex: 1,
              height: "100%",
              width: "100%",
            }}
          >
            <Card>
              <Alert variant="outlined" severity="info">
                <AlertTitle>No Tab Selected</AlertTitle>Create or open a tab to
                begin.
              </Alert>
            </Card>
          </div>
        )}
      </Box>
    </Box>
  );
};
