import { useState } from "react";
import { Block } from "@people_and_robots/open-blocks";
import { Canvas } from "./Canvas";
import useMeasure, { RectReadOnly } from "react-use-measure";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Box,
  Collapse,
  Card,
  useTheme,
  darken,
  lighten,
  CardContent,
  CardActions
} from "@mui/material";
import { CanvasTabs } from "./CanvasTabs";
import {
  useProgrammingStore,
  DrawerSpec,
  ProgrammingState,
  DrawerType,
  BlockData,
  SPAWNER,
  instanceTemplateFromSpec,
  referenceTemplateFromSpec,
  TypeSpec,
  PrimitiveType,
  PropertyType,
  MetaType,
} from "@people_and_robots/open-core";
import {
  ActionIconButton,
  IconTextButton,
  ScrollRegion,
  TextInput,
} from "@people_and_robots/open-gui";
import { pick, pickBy } from "lodash";
import { Backdrop } from "./Canvas";

interface SectionStripProps {
  setSearchTerm: (term: string) => void;
  setActiveDrawer: (idx: number | null) => void;
}

const SectionStrip = ({
  setSearchTerm,
  setActiveDrawer,
}: SectionStripProps) => {
  const drawers = useProgrammingStore(
    (state: ProgrammingState) => state.programSpec.drawers
  );
  const activeDrawer = useProgrammingStore(
    (state: ProgrammingState) => state.activeDrawer
  );
  return (
    <Stack direction="column" sx={{ padding: "5px" }} spacing={1}>
      {/* <Nav gap="xxsmall"> */}
      {drawers.map((drawer: DrawerSpec, drawerIdx: number) => {
        // console.log(drawerIdx);
        return (
          <ActionIconButton
            key={`${drawer.title}-${drawerIdx}-drawer-tt`}
            title={drawer.title}
            placement={"right"}
            canToggle
            toggled={activeDrawer === drawerIdx}
            onClick={() => {
              setSearchTerm("");
              setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx);
            }}
            icon={drawer.icon}
          />
        );
      })}
      {/* </Nav> */}
    </Stack>
  );
};

interface BlockPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  drawerWidth: number;
}
const BlockPanel = ({
  searchTerm,
  setSearchTerm,
  drawerWidth,
}: BlockPanelProps) => {
  const drawers = useProgrammingStore(
    (state: ProgrammingState) => state.programSpec.drawers
  );
  const activeDrawer = useProgrammingStore(
    (state: ProgrammingState) => state.activeDrawer
  );
  const addInstance = useProgrammingStore(
    (state: ProgrammingState) => state.addInstance
  );

  const [blockData, types, drawerType, objectType, objectTypeInfo]: [
    { [key: string]: BlockData },
    { [key: string]: TypeSpec },
    DrawerType | null,
    string | null,
    TypeSpec | null,
  ] = useProgrammingStore(
    // useCallback(
    (state: ProgrammingState) => {
      if (activeDrawer !== null) {
        const drawer = state.programSpec.drawers[activeDrawer];

        if (drawer.type === DrawerType.Multiple) {
          let types = pick(state.programSpec.objectTypes, drawer.objectTypes);
          return [{}, types, DrawerType.Multiple, null, null];
        } else if (drawer.type === DrawerType.Singular) {
          let blockData = pickBy(
            state.programData,
            (d) =>
              d.type === drawer.objectType &&
              (d.metaType === MetaType.ObjectInstance ||
                d.metaType === MetaType.FunctionDeclaration)
          );
          return [
            blockData,
            {},
            DrawerType.Singular,
            drawer.objectType,
            state.programSpec.objectTypes[drawer.objectType],
          ];
        }
      }
      return [{}, {}, null, null, null];
    }
  );

  const blocks =
    drawerType === DrawerType.Multiple
      ? Object.keys(types).map((t) =>
          instanceTemplateFromSpec(t, types[t], false)
        )
      : drawerType === DrawerType.Singular && objectType && objectTypeInfo
      ? Object.keys(blockData).map((b) =>
          referenceTemplateFromSpec(objectType, blockData[b], objectTypeInfo)
        )
      : [];

  const [drawerRef, drawerBounds] = useMeasure();
  const [headerRef, headerBounds] = useMeasure();

  const theme = useTheme();
  
  return (
    <Stack
      ref={drawerRef}
      direction="column"
      sx={{
        width: drawerWidth,
        backgroundColor:
          theme.palette.mode === "light"
            ? darken(theme.palette.background.paper, 0.1)
            : lighten(theme.palette.background.paper, 0.1),
        height: "100%",
      }}
    >
      <Stack
        ref={headerRef}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? darken(theme.palette.background.paper, 0.15)
              : lighten(theme.palette.background.paper, 0.15),
          padding: "10px",
        }}
        direction="column"
        spacing={1}
      >
        <Stack
          direction="row"
          sx={{ alignItems: "center", justify: "space-between", width: "100%" }}
          justifyContent="space-between"
        >
          <Typography style={{color:theme.palette.text.secondary}}>
            {activeDrawer !== null && drawers[activeDrawer].title}
          </Typography>
          {activeDrawer !== null &&
            drawers[activeDrawer].type === DrawerType.Singular &&
            objectTypeInfo?.primitiveType === PrimitiveType.Object &&
            !objectTypeInfo.instanceBlock.onCanvas && (
              <ActionIconButton
                size="small"
                placement="bottom"
                title={`Add ${objectTypeInfo.name}`}
                onClick={() => addInstance(drawers[activeDrawer].objectType)}
                icon="PlusIcon"
              />
            )}
        </Stack>
        <div>
          <TextInput
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <FiSearch style={{ height: 15 }} />
            //     </InputAdornment>
            //   ),
            // }}
          />
        </div>
      </Stack>
      <Box sx={{ flex: 1, width: drawerWidth }}>
        <ScrollRegion
          height={drawerBounds.height - headerBounds.height}
          width={drawerWidth}
          vertical
        >
          <Stack direction="column" gap={0.5} sx={{ padding: "4px" }}>
            {blocks
              .filter(
                (b) =>
                  searchTerm === "" ||
                  b.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((block: BlockData) => (
                <Block
                  key={block.id}
                  staticData={block}
                  bounded
                  context={[]}
                  interactionDisabled
                  regionInfo={{
                    fieldInfo: {
                      id: "",
                      name: "",
                      accepts: [block.type],
                      default: null,
                      type: PropertyType.Block,
                    },
                    parentId: SPAWNER,
                  }}
                />
              ))}
          </Stack>
        </ScrollRegion>
      </Box>
    </Stack>
  );
};

export interface ContentsProps {
  drawerWidth?: number;
  snapToGrid?: boolean;
  animateDrawer?: boolean;
  bounds: RectReadOnly;
}
export const Contents = ({
  drawerWidth = 235,
  snapToGrid = true,
  animateDrawer = true,
  bounds,
}: ContentsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const activeDrawer = useProgrammingStore(
    (state: ProgrammingState) => state.activeDrawer
  );
  const setActiveDrawer = useProgrammingStore(
    (state: ProgrammingState) => state.setActiveDrawer
  );

  const activeTab = useProgrammingStore(
    (state: ProgrammingState) => state.activeTab
  );

  const addTab = useProgrammingStore((state:ProgrammingState) => state.addTab);

  const theme = useTheme();

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flex: 1,
        padding: 0,
        backgroundColor:
          theme.palette.mode === "light"
            ? darken(theme.palette.background.paper, 0.2)
            : lighten(theme.palette.background.paper, 0.2),
      }}
    >
      <SectionStrip
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
              setSearchTerm={setSearchTerm}
            />
          )}
        </Collapse>
      ) : activeDrawer !== null ? (
        <BlockPanel
          searchTerm={searchTerm}
          drawerWidth={drawerWidth}
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
          <Canvas
            drawerWidth={drawerWidth}
            snapToGrid={snapToGrid}
            bounds={bounds}
          />
        ) : (
          <Backdrop sx={{backgroundColor:theme.palette.mode === 'dark' ? lighten(theme.palette.background.default,.05) : darken(theme.palette.background.default,.05)}}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  No Tab Selected
                </Typography>
                Create or open a tab to begin
              </CardContent>
              <CardActions>
                <IconTextButton title="Create Tab" startIcon="PlusIcon" onClick={addTab}>Create Tab</IconTextButton>
              </CardActions>
            </Card>
          </Backdrop>
        )}
      </Box>
    </Box>
  );
};
