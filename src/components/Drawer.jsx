import React from "react";
import { useState } from "react";
import { Block } from "./Block";
// import { useSpring, animated } from "@react-spring/web";
// import { config } from "react-spring";
import { useProgrammingStore } from "./ProgrammingContext";
import { Button, Box, Text, Collapsible } from "grommet";
import { FiPlus, FiSearch } from "react-icons/fi";
import { DATA_TYPES } from "./Constants";
import {
  instanceTemplateFromSpec,
  referenceTemplateFromSpec,
  callTemplateFromSpec,
} from "./Generators";
import useMeasure from "react-use-measure";
import { ScrollRegion } from "./Block/Utility";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export const Drawer = ({ highlightColor, drawerWidth }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [drawerRef, drawerBounds] = useMeasure();
  //   const [headerRef, headerBounds] = useMeasure();

  const blocks = useProgrammingStore((store) => {
    let blocks = [];
    if (store.activeDrawer !== null) {
      const drawer = store.programSpec.drawers[store.activeDrawer];
      if (drawer.dataType === DATA_TYPES.INSTANCE) {
        drawer.objectTypes.forEach((objectType) => {
          blocks.push(
            instanceTemplateFromSpec(
              objectType,
              store.programSpec.objectTypes[objectType]
            )
          );
        });
      } else if (drawer.dataType === DATA_TYPES.REFERENCE) {
        Object.values(store.programData)
          .filter(
            (d) =>
              d.dataType === DATA_TYPES.INSTANCE && d.type === drawer.objectType
          )
          .forEach((instanceReference) => {
            blocks.push(
              referenceTemplateFromSpec(
                drawer.objectType,
                instanceReference,
                store.programSpec.objectTypes[drawer.objectType]
              )
            );
          });
      } else if (drawer.dataType === DATA_TYPES.CALL) {
        Object.values(store.programData)
          .filter(
            (d) =>
              d.dataType === DATA_TYPES.INSTANCE && d.type === drawer.objectType
          )
          .forEach((functionReference) => {
            blocks.push(
              callTemplateFromSpec(
                drawer.objectType,
                functionReference,
                store.programSpec.objectTypes[drawer.objectType]
              )
            );
          });
      }
    }
    return blocks.filter(
      (block) =>
        block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === ""
    );
  });

  const hlcolor = highlightColor ? highlightColor : "cyan";
  const drawers = useProgrammingStore((store) => store.programSpec.drawers);
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  const setActiveDrawer = useProgrammingStore((store) => store.setActiveDrawer);
  const addInstance = useProgrammingStore((store) => store.addInstance);

  //   const drawerStyle = useSpring({
  //     width: activeDrawer !== null ? drawerWidth : 0,
  //     config: config.stiff,
  //   });
  //   const sidebarStyle = useSpring({
  //     width: activeDrawer !== null ? drawerWidth + 52 : 52,
  //     config: config.stiff,
  //   });

  return (
    <Box
      ref={drawerRef}
      direction="row"
      pad='none'
      background="#212121"
    >
      <Box
        gap="xxsmall"
        pad="xxsmall"
        direction="column"
        width="60px"
      >
        {drawers.map((drawer, drawerIdx) => {
          const Icon = drawer.icon;
          return (
            <Tooltip
              key={drawerIdx}
              title={<Typography>{drawer.title}</Typography>}
              arrow
              placement="right"
            >
              <Button
                primary
                focusIndicator={false}
                hoverIndicator={
                  activeDrawer === drawerIdx ? hlcolor : "#414141"
                }
                color={activeDrawer === drawerIdx ? hlcolor : "#313131"}
                margin={{
                  top: "xsmall",
                  bottom: "none",
                  left: "xsmall",
                  right: "xsmall",
                }}
                round="small"
                onClick={() => {
                  setSearchTerm("");
                  setActiveDrawer(
                    activeDrawer === drawerIdx ? null : drawerIdx
                  );
                }}
                icon={<Icon />}
              />
            </Tooltip>
          );
        })}
      </Box>
      {/* <div
        style={{
          display: "flex",
          height: "100%",
          width: 52,
          backgroundColor: "#212121",
          padding: 0,
        }}
      >
        <List
          data={drawers}
          border={false}
          align="center"
          margin="none"
          pad="none"
          radius="none"
        >
          {}
        </List>
      </div> */}
      <Box direction="column">
        <Collapsible direction="horizontal" open={activeDrawer !== null}>
          {activeDrawer !== null && (
            <Box
              background="#2f2f2f"
              flex
              direction="column"
              width={`${drawerWidth}px`}
              animation={[
                
                {
                  type: "slideRight",
                  delay: 0,
                  duration: 1000,
                },
                {
                    type: "fadeIn",
                    delay: 0,
                    duration: 1000,
                  },
              ]}
            >
              <Box
                //   ref={headerRef}
                background="#444444"
                direction="column"
                pad="small"
                height="110px"
                width={`${drawerWidth}px`}
              >
                <Box direction="row" justify="between" align="center">
                  <Box pad="small">
                    <Text>{drawers[activeDrawer].title}</Text>
                  </Box>
                  {drawers[activeDrawer].dataType === DATA_TYPES.REFERENCE && (
                    <Button
                      secondary
                      onClick={() =>
                        addInstance(drawers[activeDrawer].objectType)
                      }
                      icon={<FiPlus />}
                    />
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

              <ScrollRegion
                height={drawerBounds.height - 110}
                width={drawerWidth}
                vertical
              >
                {blocks.map((block, idx) => (
                  <Box
                    key={idx}
                    animation={{ type: "fadeIn", delay: idx * 30 }}
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
          )}
        </Collapsible>
      </Box>
    </Box>
  );
};
