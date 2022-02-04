import { useState } from 'react';
import { Block } from "./Block";
import { useSpring, animated } from '@react-spring/web';
import { config } from 'react-spring';
import { useProgrammingStore } from "./ProgrammingContext";
import { Button, List, Box, TextInput, Text } from 'grommet';
import { FiPlus, FiSearch } from "react-icons/fi";
import { DATA_TYPES } from './Constants';
import { instanceTemplateFromSpec, referenceTemplateFromSpec, callTemplateFromSpec } from './Generators';


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

export const Drawer = ({ highlightColor }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const blocks = useProgrammingStore((store) => {
        let blocks = [];
        if (store.activeDrawer !== null) {
            const drawer = store.programSpec.drawers[store.activeDrawer]
            if (drawer.dataType === DATA_TYPES.INSTANCE) {
                drawer.objectTypes.forEach(objectType=>{
                    blocks.push(instanceTemplateFromSpec(
                        objectType, 
                        store.programSpec.objectTypes[objectType]))
                })
            } else if (drawer.dataType === DATA_TYPES.REFERENCE) {
                Object.values(store.programData).filter(d=>
                    d.dataType===DATA_TYPES.INSTANCE && 
                    d.type===drawer.objectType
                ).forEach(instanceReference=>{
                    blocks.push(referenceTemplateFromSpec(
                        drawer.objectType,
                        instanceReference,
                        store.programSpec.objectTypes[drawer.objectType]
                    ))
                })
            } else if (drawer.dataType === DATA_TYPES.CALL) {
                Object.values(store.programData).filter(d=>
                    d.dataType===DATA_TYPES.INSTANCE && 
                    d.type===drawer.objectType
                ).forEach(functionReference=>{
                    blocks.push(callTemplateFromSpec(
                        drawer.objectType,
                        functionReference,
                        store.programSpec.objectTypes[drawer.objectType]
                    ))
                })
            }
        }
        return blocks.filter(block=>block.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '')
    });

    const hlcolor = highlightColor ? highlightColor : 'cyan';
    const drawers = useProgrammingStore(store => store.programSpec.drawers);
    const activeDrawer = useProgrammingStore(store => store.activeDrawer);
    const setActiveDrawer = useProgrammingStore(store => store.setActiveDrawer);

    const drawerStyle = useSpring({ width: activeDrawer !== null ? 235 : 0, config: config.stiff });
    const sidebarStyle = useSpring({ width: activeDrawer !== null ? 285 : 50, config: config.stiff });

    return (
        <animated.div
            style={{
                backgroundColor: "black",
                display: 'flex',
                padding: 0,
                ...sidebarStyle
            }}>
            <div style={{ display: 'flex', height: '100%', width: 50, backgroundColor: "#212121", padding: 0 }}>
                <List data={drawers} border={false} align='center' margin='none' pad='none' radius='none'>
                    {(drawer, drawerIdx) => {
                        const Icon = drawer.icon;
                        return (
                            <Button
                                primary
                                fill
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
                                margin={{ top: 'xsmall', bottom: 'none', left: 'xxsmall', right: 'none' }}
                                round='small'
                                onClick={() => { setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx) }}
                                icon={<Icon />}
                            />
                        )
                    }}
                </List>
            </div>
            <animated.div style={{ height: '100%', backgroundColor: '#2f2f2f', overflow: 'hidden', ...drawerStyle }}>

                {activeDrawer !== null && (
                    <>
                        <Box background='#444444' direction='column' pad='small' animation='fadeIn'>
                            <Box direction="row" justify='between' align="center">
                                <Box pad='small'>
                                    <Text>{drawers[activeDrawer].title}</Text>
                                </Box>
                                {drawers[activeDrawer].dataType === DATA_TYPES.REFERENCE && (
                                    <Button
                                        secondary
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
                        <List data={blocks} border={false} style={{ padding: 5, width: 235 }} margin='none' pad='none'>
                            {(block, idx) => (
                                <Box animation={{ type: 'fadeIn', delay: idx * 100 }} style={{ marginBottom: 5, width: 225 }}>
                                    <Block staticData={block} parentId="spawner" bounded highlightColor={highlightColor} context={[]} interactionDisabled fieldInfo={{ name: '', value: null, accepts: [], isSpawner: true }}/>
                                </Box>
                            )}
                        </List>
                    </>


                )}

            </animated.div>
        </animated.div>
    );
};
