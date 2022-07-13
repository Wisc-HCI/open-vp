import React, { useRef, useCallback } from "react";
import { useState } from "react";
import { Block } from "./Block";
// import { useSpring, animated } from "@react-spring/web";
// import { config } from "react-spring";
import { useProgrammingStore } from "./ProgrammingContext";
import { Button, Box, Text, Layer } from "grommet";
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
// import Drawer from "@mui/material/Drawer";
import { motion, AnimatePresence } from "framer-motion";

const SectionStrip = ({ highlightColor, setSearchTerm, setActiveDrawer }) => {
  const drawers = useProgrammingStore((store) => store.programSpec.drawers);
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  return (
    <Box
      gap="xxsmall"
      pad="xxsmall"
      direction="column"
      width="60px"
      style={{ zIndex: 100 }}
    >
      {drawers.map((drawer, drawerIdx) => {
        const Icon = drawer.icon;
        return (
          <Tooltip
            key={`${drawer.title}-${drawerIdx}`}
            title={<Typography>{drawer.title}</Typography>}
            arrow
            placement="right"
          >
            <Button
              primary
              focusIndicator={false}
              hoverIndicator={
                activeDrawer === drawerIdx ? highlightColor : "#414141"
              }
              color={activeDrawer === drawerIdx ? highlightColor : "#313131"}
              margin={{
                top: "xsmall",
                bottom: "none",
                left: "xsmall",
                right: "xsmall",
              }}
              round="small"
              onClick={() => {
                setSearchTerm("");
                setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx);
              }}
              icon={<Icon />}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};

const BlockPanel = ({
  searchTerm,
  setSearchTerm,
  drawerWidth,
  highlightColor,
  height,
}) => {
  const drawers = useProgrammingStore((store) => store.programSpec.drawers);
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  // const [drawerRef, drawerBounds] = useMeasure();

  const blocks = useProgrammingStore(
    useCallback(
      (store) => {
        let blocks = [];
        if (activeDrawer !== null) {
          const drawer = store.programSpec.drawers[activeDrawer];
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
                  d.dataType === DATA_TYPES.INSTANCE &&
                  d.type === drawer.objectType
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
                  d.dataType === DATA_TYPES.INSTANCE &&
                  d.type === drawer.objectType
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
      },
      [activeDrawer, searchTerm]
    )
  );

  return (
    <Box
      direction="column"
      width={`${drawerWidth}px`}
      height='100%'
      background="#222222ee"
    >
      <Box
        // flex
        //   ref={headerRef}
        background="#44444499"
        direction="column"
        pad="small"
        height="110px"
      >
        <Box direction="row" justify="between" align="center">
          <Box pad="small">
            <Text>{activeDrawer !== null && drawers[activeDrawer].title}</Text>
          </Box>
          {activeDrawer !== null &&
            drawers[activeDrawer].dataType === DATA_TYPES.REFERENCE && (
              <Button
                secondary
                onClick={() => addInstance(drawers[activeDrawer].objectType)}
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

      <ScrollRegion height={height - 110} width={drawerWidth} vertical>
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
  );
};

export const Contents = ({ highlightColor, drawerWidth = 235, snapToGrid }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // const [drawerRef, drawerBounds] = useMeasure();
  const containerRef = useRef();
  const [envRef, envBounds] = useMeasure();

  // const hlcolor = highlightColor ? highlightColor : "cyan";
  // const drawers = useProgrammingStore((store) => store.programSpec.drawers);
  const activeDrawer = useProgrammingStore((store) => store.activeDrawer);
  const setActiveDrawer = useProgrammingStore((store) => store.setActiveDrawer);
  // const addInstance = useProgrammingStore((store) => store.addInstance);
  // const modalBlock = useProgrammingStore((store) => store.modalBlock);
  // const setModalBlock = useProgrammingStore((store) => store.setModalBlock);
  //   const drawerStyle = useSpring({
  //     width: activeDrawer !== null ? drawerWidth : 0,
  //     config: config.stiff,
  //   });
  //   const sidebarStyle = useSpring({
  //     width: activeDrawer !== null ? drawerWidth + 52 : 52,
  //     config: config.stiff,
  //   });

  const drawerVariants = {
    open: { width: drawerWidth },
    closed: { width: 0 },
  };

  return (
    <Box
      ref={envRef}
      flex
      direction="row"
      pad="none"
      style={{ overflow: "hidden" }}
    >
      {/* {modalBlock.block && <Layer onClickOutside={()=>setModalBlock(null,[])}>
        <PreviewBlock id={modalBlock.block} context={modalBlock.context} highlightColor={highlightColor}/>
        </Layer>} */}
      <SectionStrip
        highlightColor={highlightColor}
        setActiveDrawer={setActiveDrawer}
        setSearchTerm={setSearchTerm}
      />
      <AnimatePresence>
        {activeDrawer !== null && (
          <motion.div
            layout
            initial={{ width: 0 }}
            animate={{ width: drawerWidth }}
            exit={{ width: 0 }}
          >
            <BlockPanel
              height={envBounds.height}
              searchTerm={searchTerm}
              drawerWidth={drawerWidth}
              highlightColor={highlightColor}
              setSearchTerm={setSearchTerm}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* <motion.div variants={drawerVariants} animate={activeDrawer !== null ? 'open' : 'closed'}>
        {}
      </motion.div> */}

      <Box flex height="100%">
        <Canvas highlightColor={highlightColor} snapToGrid={snapToGrid} />
      </Box>
      {/* <Box flex ref={containerRef} direction='row'> */}
      {/* <Drawer
          open={activeDrawer !== null}
          anchor="left"
          SlideProps={{ container: containerRef.current }}
          variant="temporary"
          hideBackdrop
        > */}

      {/* <Box direction="row" height="100%" background={'red'}></Box> */}

      {/* {activeDrawer !== null && (
          <Layer
            animation="none"
            modal={false}
            position="left"
            background='transparent'
            target={containerRef.current}
          >
            
          </Layer>
        )} */}
      {/* </Drawer> */}
      {/* {activeDrawer !== null && (
          <Layer
            animation='fadeIn'
            responsive
            modal={false}
            // onClickOutside={()=>setActiveDrawer(null)}
            width="200px"
            position="start"
            target={containerRef.current}
          >
            
          </Layer>
        )} */}
      {/* </Box> */}

      {/* <Main open={activeDrawer !== null} drawerWidth={drawerWidth}> */}

      {/* </Main> */}

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
      {/* <Box direction="column">
        <Collapsible direction="horizontal" open={activeDrawer !== null}>
          {activeDrawer !== null && (
            
          )}
        </Collapsible>
      </Box> */}
    </Box>
  );
};
