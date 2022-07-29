import React, { useRef, useCallback, memo } from "react";
import { useState } from "react";
import { Block } from "./Block";
// import { useSpring, animated } from "@react-spring/web";
// import { config } from "react-spring";
import { useProgrammingStore } from "./ProgrammingContext";
import { Button, Box, Text, Sidebar, Nav } from "grommet";
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
// import Drawer from "@mui/material/Drawer";
import { motion } from "framer-motion";
// import { pickBy } from "lodash";
import shallow from "zustand/shallow";
import { stringEquality } from "./Block/Utility";

const SectionStrip = ({ setSearchTerm, setActiveDrawer }) => {
  const drawers = useProgrammingStore((store) => store.programSpec.drawers);
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  return (
    <Sidebar>
      <Nav gap="xxsmall">
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
                color={
                  activeDrawer === drawerIdx ? "highlightColor" : "vibrant"
                }
                onClick={() => {
                  setSearchTerm("");
                  setActiveDrawer(
                    activeDrawer === drawerIdx ? null : drawerIdx
                  );
                }}
              >
                <Icon width={30} />
              </IconButton>
            </Tooltip>
          );
        })}
      </Nav>
    </Sidebar>
  );
};

const BlockPanel = ({
  searchTerm,
  setSearchTerm,
  drawerWidth,
  highlightColor,
}) => {
  const drawers = useProgrammingStore((store) => store.programSpec.drawers);
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  const addInstance = useProgrammingStore((store) => store.addInstance);

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

  const [scrollContainerRef, scrollContainerBounds] = useMeasure();

  return (
    <Box
      height="100%"
      direction="column"
      width={`${drawerWidth}px`}
      background="#222222ee"
    >
      <Box background="#44444499" direction="column" pad="small">
        <Box direction="row" justify="between" align="center">
          <Box pad="small">
            <Text>{activeDrawer !== null && drawers[activeDrawer].title}</Text>
          </Box>
          {activeDrawer !== null &&
            drawers[activeDrawer].dataType === DATA_TYPES.REFERENCE && (
              <IconButton
                onClick={() => addInstance(drawers[activeDrawer].objectType)}
              >
                <FiPlus />
              </IconButton>
            )}
        </Box>
        <TextField
          size="small"
          label="Search"
          color="highlightColor"
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
      </Box>
      <Box ref={scrollContainerRef} flex direction="column">
        <ScrollRegion
          height={scrollContainerBounds.height}
          width={drawerWidth}
          vertical
        >
          {blocks
            .filter(
              (b) =>
                searchTerm === "" ||
                b.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((block, idx) => (
              <Box
                key={block.id}
                // animation={{ type: "fadeIn", delay: idx * 30 }}
                style={{ marginBottom: 5, width: drawerWidth - 10 }}
              >
                <Block
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
              </Box>
            ))}
        </ScrollRegion>
      </Box>
    </Box>
  );
};

export const Contents = ({
  highlightColor,
  drawerWidth = 235,
  snapToGrid,
  animateDrawer,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  const setActiveDrawer = useProgrammingStore((store) => store.setActiveDrawer);

  return (
    <Box
      flex
      direction="row"
      height="100%"
      pad="none"
      style={{ overflow: "hidden" }}
    >
      <SectionStrip
        highlightColor={highlightColor}
        setActiveDrawer={setActiveDrawer}
        setSearchTerm={setSearchTerm}
      />
      {animateDrawer && activeDrawer !== null ? (
        <motion.div
          initial={{ width: 0, overflow: "hidden" }}
          animate={{ width: drawerWidth }}
          exit={{ width: 0, overflow: "hidden" }}
        >
          <BlockPanel
            searchTerm={searchTerm}
            drawerWidth={drawerWidth}
            highlightColor={highlightColor}
            setSearchTerm={setSearchTerm}
          />
        </motion.div>
      ) : activeDrawer !== null ? (
        <BlockPanel
          searchTerm={searchTerm}
          drawerWidth={drawerWidth}
          highlightColor={highlightColor}
          setSearchTerm={setSearchTerm}
        />
      ) : null}

      <Box flex height="100%">
        <Canvas highlightColor={highlightColor} snapToGrid={snapToGrid} />
      </Box>
    </Box>
  );
};
