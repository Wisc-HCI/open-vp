import React from 'react';
import { useState } from 'react';
import { Block } from "./Block";
import { useSpring, animated } from '@react-spring/web';
import { config } from 'react-spring';
import { useProgrammingStore } from "./ProgrammingContext";
import { Button, List, Box, TextInput, Text } from 'grommet';
import { FiPlus, FiSearch } from "react-icons/fi";
import { DATA_TYPES } from './Constants';
import { instanceTemplateFromSpec, referenceTemplateFromSpec, callTemplateFromSpec } from './Generators';
import useMeasure from 'react-use-measure';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { styled } from "@stitches/react";

const StyledScrollArea = styled(ScrollArea.Root, {
    overflow: "hidden"
  });

const StyledViewport = styled(ScrollArea.Viewport, {
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    padding: '4pt'
});

const StyledScrollbar = styled(ScrollArea.Scrollbar, {
    display: "flex",
    // ensures no selection
    userSelect: "none",
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: "none",
    padding: 2,
    background: '#55555525',
    transition: "background 160ms ease-out",
    "&:hover": { background: '#45454540' },
    '&[data-orientation="vertical"]': { width: 8 },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: 8
    }
  });
  
  const StyledThumb = styled(ScrollArea.Thumb, {
    flex: 1,
    background: "#eeeeee66",
    borderRadius: 8,
    // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
    // position: "relative",
    // "&::before": {
    //   content: '""',
    //   position: "absolute",
    //   top: "50%",
    //   left: "50%",
    //   transform: "translate(-50%, -50%)",
    //   width: "100%",
    //   height: "100%",
    //   minWidth: 44,
    //   minHeight: 44
    // }
  });

const TipContent = ({ message }) => (
    <Box direction="row" align="center">
        <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
            <polygon
                fill="grey"
                points="6 2 18 12 6 22"
                transform="matrix(-1 0 0 1 30 0)"
            />
        </svg>
        <Box background="grey" direction="row" pad="small" round="xxsmall">
            <Text color="#313131">{message}</Text>
        </Box>
    </Box>
);

export const Drawer = ({ highlightColor, drawerWidth }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const [drawerRef, drawerBounds] = useMeasure();
    const [headerRef, headerBounds] = useMeasure();

    const blocks = useProgrammingStore((store) => {
        let blocks = [];
        if (store.activeDrawer !== null) {
            const drawer = store.programSpec.drawers[store.activeDrawer]
            if (drawer.dataType === DATA_TYPES.INSTANCE) {
                drawer.objectTypes.forEach(objectType => {
                    blocks.push(instanceTemplateFromSpec(
                        objectType,
                        store.programSpec.objectTypes[objectType]))
                })
            } else if (drawer.dataType === DATA_TYPES.REFERENCE) {
                Object.values(store.programData).filter(d =>
                    d.dataType === DATA_TYPES.INSTANCE &&
                    d.type === drawer.objectType
                ).forEach(instanceReference => {
                    blocks.push(referenceTemplateFromSpec(
                        drawer.objectType,
                        instanceReference,
                        store.programSpec.objectTypes[drawer.objectType]
                    ))
                })
            } else if (drawer.dataType === DATA_TYPES.CALL) {
                Object.values(store.programData).filter(d =>
                    d.dataType === DATA_TYPES.INSTANCE &&
                    d.type === drawer.objectType
                ).forEach(functionReference => {
                    blocks.push(callTemplateFromSpec(
                        drawer.objectType,
                        functionReference,
                        store.programSpec.objectTypes[drawer.objectType]
                    ))
                })
            }
        }
        return blocks.filter(block => block.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '')
    });

    const hlcolor = highlightColor ? highlightColor : 'cyan';
    const drawers = useProgrammingStore(store => store.programSpec.drawers);
    const activeDrawer = useProgrammingStore(store => store.activeDrawer);
    const setActiveDrawer = useProgrammingStore(store => store.setActiveDrawer);
    const addInstance = useProgrammingStore(store => store.addInstance);

    const drawerStyle = useSpring({ width: activeDrawer !== null ? drawerWidth : 0, config: config.stiff });
    const sidebarStyle = useSpring({ width: activeDrawer !== null ? drawerWidth + 52 : 52, config: config.stiff });

    return (
        <animated.div
            style={{
                // backgroundColor: "black",
                display: 'flex',
                padding: 0,

                ...sidebarStyle
            }}>
            <div style={{ display: 'flex', height: '100%', width: 52, backgroundColor: "#212121", padding: 0 }}>
                <List data={drawers} border={false} align='center' margin='none' pad='none' radius='none'>
                    {(drawer, drawerIdx) => {
                        const Icon = drawer.icon;
                        return (
                            <Button
                                primary
                                tip={{
                                    content: <TipContent message={drawer.title} />,
                                    plain: true,
                                    dropProps: {
                                        align: { left: 'right' }
                                    }
                                }}
                                focusIndicator={false}
                                hoverIndicator={activeDrawer === drawerIdx ? hlcolor : '#414141'}
                                color={activeDrawer === drawerIdx ? hlcolor : '#313131'}
                                margin={{ top: 'xsmall', bottom: 'none', left: 'xsmall', right: 'xsmall' }}
                                round='small'
                                onClick={() => { setSearchTerm(''); setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx) }}
                                icon={<Icon />}
                            />
                        )
                    }}
                </List>
            </div>
            <animated.div ref={drawerRef} style={{ height: '100%', backgroundColor: '#2f2f2f', overflow: 'hidden', ...drawerStyle }}>

                {activeDrawer !== null && (
                    <>
                        <Box ref={headerRef} background='#444444' direction='column' pad='small' animation='fadeIn'>
                            <Box direction="row" justify='between' align="center">
                                <Box pad='small'>
                                    <Text>{drawers[activeDrawer].title}</Text>
                                </Box>
                                {drawers[activeDrawer].dataType === DATA_TYPES.REFERENCE && (
                                    <Button
                                        secondary
                                        onClick={() => addInstance(drawers[activeDrawer].objectType)}
                                        icon={<FiPlus />}
                                    />
                                )}
                            </Box>
                            <TextInput
                                size='small'
                                icon={<FiSearch style={{ height: 15 }} />}
                                placeholder="search ..."
                                focusIndicator={false}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </Box>
                        <StyledScrollArea css={{height:drawerBounds.height-headerBounds.height,width:drawerWidth}}>
                            <StyledViewport>
                                {blocks.map((block, idx) => (
                                    <Box key={idx} animation={{ type: 'fadeIn', delay: idx * 30 }} style={{ marginBottom: 5, width: drawerWidth - 10 }}>
                                        <Block staticData={block} parentId="spawner" bounded highlightColor={highlightColor} context={[]} interactionDisabled fieldInfo={{ name: '', value: null, accepts: [], isSpawner: true }} />
                                    </Box>
                                ))}
                            </StyledViewport>
                            <StyledScrollbar orientation="horizontal">
                                <StyledThumb/>
                            </StyledScrollbar>
                            <StyledScrollbar orientation="vertical">
                                <StyledThumb/>
                            </StyledScrollbar>
                            <ScrollArea.Corner />
                        </StyledScrollArea>

                        {/* <Box style={{height:drawerBounds.height-headerBounds.height, overflowY:'scroll'}}>
                                
                               <List data={blocks} border={false} style={{ padding: 5 }} margin='none' pad='none'>
                                {(block, idx) => (
                                    <Box key={idx} animation={{ type: 'fadeIn', delay: idx * 100 }} style={{ marginBottom: 5, width: drawerWidth-10 }}>
                                        <Block staticData={block} parentId="spawner" bounded highlightColor={highlightColor} context={[]} interactionDisabled fieldInfo={{ name: '', value: null, accepts: [], isSpawner: true }}/>
                                    </Box>
                                )}
                            </List>
                        </Box> */}

                    </>


                )}

            </animated.div>
        </animated.div>
    );
};
