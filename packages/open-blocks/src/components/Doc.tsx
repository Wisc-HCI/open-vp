import {
  Card,
  Box,
  Tabs,
  Tab,
  Breadcrumbs,
  Chip,
  Typography,
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Divider,
  Avatar,
  CardHeader,
  CardContent,
  CardActions,
  AlertColor,
} from "@mui/material";
import {
  darken,
  lighten,
  emphasize,
  styled,
  useTheme,
} from "@mui/material/styles";
import { useState, useCallback, useRef } from "react";
import {
  useProgrammingStore,
  TypeSpec,
  BlockData,
  ConnectionDirection,
  MetaType,
  ProgrammingState,
  FunctionCallData,
  PropertyType,
  PrimitiveType,
  ConnectionData,
} from "@people_and_robots/open-core";
import { Remark } from "react-remark";
import {
  FiChevronDown,
  FiCircle,
  FiCode,
  FiLogIn,
  FiList,
  FiLogOut,
  FiStar,
  FiDownload,
  FiSquare,
} from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { pickBy } from "lodash";
import { blockSpecQuery } from "../util";
import { Position } from "reactflow";
import { ObjectReferenceData } from "@people_and_robots/open-core";
import { functionTypeSpec } from "@people_and_robots/open-core/src/generators";
import {
  IconTextButton,
  ScrollRegion,
  Tooltip,
} from "@people_and_robots/open-gui";

const DOC_FLAG_COLORS = {
  INBOUND_CONNECTION: "#DDA0DD",
  OUTBOUND_CONNECTION: "#8FBC8F",
  IS_LIST: "#6495ED",
  FULL_WIDTH: "#ADD8E6",
  REQUIRED: "#FF6347",
  FUNCTION_ARGUMENT: "#F5DEB3",
  FUNCTION_PROPERTY: "#00CED1",
};

const SHOWN_SIMPLE_TYPES = [
  "BOOLEAN",
  "NUMBER",
  "STRING",
  "OPTIONS",
  "VECTOR3",
];

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function getReferences(
  typeSpec: { [key: string]: TypeSpec },
  usedType: string
): { parent: string; fields: string[] }[] {
  // @ts-ignore
  const referent = typeSpec[usedType]?.specificType || usedType;
  let references: { parent: string; fields: string[] }[] = [];
  Object.keys(typeSpec).forEach((typeValue: string) => {
    let entry = { parent: typeValue, fields: [] };
    if (typeSpec[typeValue].properties) {
      Object.keys(typeSpec[typeValue].properties).forEach((prop: string) => {
        let propValue = typeSpec[typeValue].properties[prop];
        if (
          propValue.type === PropertyType.Block &&
          propValue.accepts?.includes(referent)
        ) {
          // @ts-ignore
          entry.fields.push(prop);
        }
      });
    }
    if (entry.fields.length > 0) {
      // @ts-ignore
      references.push(entry);
    }
  });
  return references;
}

export const ChipMimic = styled("button")(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    display: "inline-block",
    backgroundColor,
    paddingLeft: 6,
    paddingRight: 4,
    borderRadius: 100,
    fontSize: 14,
    border: "unset",
    height: theme.spacing(3),
    alignItems: "center",
    alignContent: "center",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
  };
});

export interface FieldInfoSectionProps {
  parent: string;
  field: string;
  typeInfo: { [key: string]: TypeSpec };
  handleLinkClick: (value: string) => void;
  container?: HTMLElement;
}
const FieldInfoSection = ({
  parent,
  field,
  typeInfo,
  handleLinkClick,
  container,
}: FieldInfoSectionProps) => {
  const fieldInfo = typeInfo[parent]?.properties?.[field];
  const theme = useTheme();
  const fullAccepts =
    fieldInfo.type === PropertyType.Block && fieldInfo?.accepts
      ? fieldInfo.accepts
          .map((a) => {
            if (typeInfo[a]) {
              return [a];
            } else {
              return Object.keys(
                // @ts-ignore
                pickBy(typeInfo, (info) => info.specificType === a)
              );
            }
          })
          .reduce(
            (accumulator, currentValue) => [...accumulator, ...currentValue],
            []
          )
      : [];
  const variant =
    fieldInfo.type === PropertyType.Block && fieldInfo?.accepts
      ? "block"
      : SHOWN_SIMPLE_TYPES.includes(fieldInfo?.type)
      ? "simple"
      : "na";

  if (variant === "na") {
    return null;
  }
  // console.log('info',{field,fieldInfo,typeInfo})
  return (
    <Card sx={{ padding: 2 }}>
      <CardHeader
        variant="h5"
        color="text.primary"
        title={typeof fieldInfo.name === 'string' ? fieldInfo.name : fieldInfo.name.name}
        sx={{ padding: 0 }}
        action={
          fieldInfo.type === PropertyType.Block && fieldInfo.accepts ? (
            <Stack direction="row" gap={0.5}>
              {fieldInfo.isList && (
                <Tooltip
                  key="is-list"
                  title="This property accepts a set of entries as a list"
                  parent={container}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: DOC_FLAG_COLORS.IS_LIST,
                    }}
                  >
                    <FiList />
                  </Avatar>
                </Tooltip>
              )}
              {fieldInfo.fullWidth && (
                <Tooltip
                  key="full-width"
                  title="This property spans the width of the block"
                  parent={container}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: DOC_FLAG_COLORS.FULL_WIDTH,
                    }}
                  >
                    <FiCode />
                  </Avatar>
                </Tooltip>
              )}
              {fieldInfo.isRequired && (
                <Tooltip
                  key="required"
                  title="This property is required"
                  parent={container}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: DOC_FLAG_COLORS.REQUIRED,
                    }}
                  >
                    <FiStar />
                  </Avatar>
                </Tooltip>
              )}
              {fieldInfo.isFunctionArgument && (
                <Tooltip
                  key="is-function-argument"
                  title="This is an argument to the function"
                  parent={container}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: DOC_FLAG_COLORS.FUNCTION_ARGUMENT,
                    }}
                  >
                    <FiDownload />
                  </Avatar>
                </Tooltip>
              )}
              {/* @ts-ignore */}
              {fieldInfo.isFunctionBlockField && (
                <Tooltip
                  key="is-function-block-field"
                  title="This is a property of this function block"
                  parent={container}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: DOC_FLAG_COLORS.FUNCTION_PROPERTY,
                    }}
                  >
                    <FiSquare />
                  </Avatar>
                </Tooltip>
              )}
            </Stack>
          ) : (
            <Typography
              sx={{ fontSize: 14, textAlign: "center", fontStyle: "italic" }}
              color="text.secondary"
              gutterBottom={false}
            >
              {fieldInfo.type}
            </Typography>
          )
        }
      />
      {fieldInfo.type === PropertyType.Block && fieldInfo?.accepts && (
        <CardContent
          sx={{
            // bgcolor: "#252525",
            backgroundColor: theme.palette.mode === "dark" ? "#252525" : "#ccc",
            borderRadius: 1,
            padding: 0.5,
            // lineHeight: 1.75,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {fullAccepts?.map((t: string) => (
            <li style={{ margin: 1 }}>
              <TypeLink
                key={t}
                label={typeInfo[t]?.name || "Unrecognized"}
                color={blockSpecQuery(typeInfo[t], "color")}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeInfo[t]) {
                    handleLinkClick(t);
                  }
                }}
              />
            </li>
          ))}
        </CardContent>
      )}
      {fieldInfo.type === PropertyType.Options && (
        <Typography
          sx={{ fontSize: 14, textAlign: "center", fontStyle: "italic" }}
          color="text.secondary"
          gutterBottom={false}
        >
          {fieldInfo.options?.map((option) => option.label).join(", ")}
        </Typography>
      )}
    </Card>
  );
};

interface ConnectionInfo {
  allowed: string[];
  direction: string;
}

interface ConnectionInfoSectionProps {
  side: Position;
  connectionInfo: ConnectionInfo;
  typeInfo: { [key: string]: TypeSpec };
  handleLinkClick: (value: string) => void;
}
const ConnectionInfoSection = ({
  side,
  connectionInfo,
  typeInfo,
  handleLinkClick,
}: ConnectionInfoSectionProps) => {
  const theme = useTheme();
  return (
    <Card sx={{ padding: 2 }}>
      <Grid container spacing={1}>
        <Grid key={side} item xs={4}>
          <Typography
            variant="h5"
            color="text.primary"
            style={{ textTransform: "capitalize" }}
          >
            {side}
          </Typography>
        </Grid>
        <Grid key={`${side}-accepts`} item xs={8}>
          <Typography
            sx={{ fontSize: 14, textAlign: "center", fontStyle: "italic" }}
            color="text.secondary"
            gutterBottom={false}
          >
            Accepts
          </Typography>
        </Grid>
        {connectionInfo.allowed && (
          <>
            <Grid key={`${side}-direction`} item xs={4}>
              <Tooltip
                title={
                  connectionInfo.direction === ConnectionDirection.Outbound
                    ? "This connection is outbound"
                    : "This connection is inbound"
                }
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor:
                      connectionInfo.direction === ConnectionDirection.Outbound
                        ? DOC_FLAG_COLORS.OUTBOUND_CONNECTION
                        : DOC_FLAG_COLORS.INBOUND_CONNECTION,
                  }}
                >
                  {connectionInfo.direction === ConnectionDirection.Outbound ? (
                    <FiLogOut />
                  ) : (
                    <FiLogIn />
                  )}
                </Avatar>
              </Tooltip>
            </Grid>
            <Grid
              key={`${side}-bin`}
              item
              xs={8}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#252525" : "#ccc",
                borderRadius: 1,
                padding: 3,
                lineHeight: 1.75,
              }}
            >
              {connectionInfo.allowed?.map((t) => (
                <TypeLink
                  label={typeInfo[t]?.name || 'Unknown'}
                  color={blockSpecQuery(typeInfo[t], "color")}
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeInfo[t]) {
                      handleLinkClick(t);
                    }
                  }}
                />
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
};

export interface TypeLinkProps {
  label: string;
  color: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const TypeLink = ({ label, color, onClick }: TypeLinkProps) => {
  return (
    <ChipMimic onClick={onClick}>
      {label}{" "}
      <FiCircle
        style={{
          position: "relative",
          alignSelf: "center",
          height: 15,
          width: 15,
          top: 2.5,
          //   bottom:-3,
          fill: color,
        }}
      />
      <span
        style={{
          height: 15,
          width: 15,
          borderRadius: 100,
          backgroundColor: color,
          border: 1,
          borderColor: "white",
        }}
      >
        {" "}
      </span>
    </ChipMimic>
  );
};

export const TypeDescription = ({ type }: { type: string }) => {
  const info = useProgrammingStore(
    useCallback((state) => state.programSpec.objectTypes[type], [type])
  );
  return (
    <TypeLink
      label={info?.name || "Unknown Block"}
      color={blockSpecQuery(info, "color")}
    />
  );
};

export interface DocProps {
  data: BlockData;
  typeSpec: TypeSpec;
}
export const Doc = ({ data, typeSpec }: DocProps) => {
  const theme = useTheme();
  const typeKey =
    data?.metaType === MetaType.FunctionDeclaration
      ? data.id
      : data.metaType === MetaType.FunctionCall
      ? data.ref
      : data.type;
  const [path, setPath] = useState([typeKey]);
  const activeType = path[path.length - 1];

  const typeInfo: { [key: string]: TypeSpec } = useProgrammingStore(
    (state: ProgrammingState) =>
      functionTypeSpec(state.programSpec.objectTypes, state.programData as {[key: string]: BlockData | ConnectionData})
  );

  const docRef = useRef<HTMLDivElement>(null);

  const haloColor =
    theme.palette.mode === "dark"
      ? darken(blockSpecQuery(typeInfo[activeType], "color"), 0.5)
      : lighten(blockSpecQuery(typeInfo[activeType], "color"), 0.5);

  const setActiveDoc = useProgrammingStore(
    (state: ProgrammingState) => state.setActiveDoc
  );
  const featuredDoc = useProgrammingStore((state: ProgrammingState) =>
    typeof state.featuredDocs[data.id] === "string"
      ? state.featuredDocs[data.id]
      : [MetaType.FunctionCall, MetaType.ObjectReference].includes(
          data.metaType
        ) &&
        typeof state.featuredDocs[
          (data as FunctionCallData | ObjectReferenceData).ref
        ] === "string"
      ? state.featuredDocs[(data as FunctionCallData | ObjectReferenceData).ref]
      : null
  );
  const tabs = featuredDoc
    ? ["featured", "description", "usage"]
    : ["description", "usage"];
  const [tab, setTab] = useState(tabs[0]);

  const references = getReferences(typeInfo, activeType);

  const handleLinkClick = (value: string) => {
    if (path.includes(value)) {
      let found = false;
      const newPath = path.filter((item) => {
        if (item === value) {
          found = true;
          return true;
        } else if (item !== value && found) {
          return false;
        } else if (item !== value) {
          return true;
        }
      });
      setPath(newPath);
    } else {
      setPath([...path, value]);
    }
  };

  const componentLookup = {
    // @ts-ignore
    h1: ({ node, ...props }) => (
      <Typography variant="h3" {...props} color="text.primary" />
    ),
    // @ts-ignore
    h2: ({ node, ...props }) => (
      <Typography variant="h4" {...props} color="text.primary" />
    ),
    // @ts-ignore
    h3: ({ node, ...props }) => (
      <Typography variant="h5" {...props} color="text.primary" />
    ),
    // @ts-ignore
    h4: ({ node, ...props }) => (
      <Typography variant="h6" {...props} color="text.primary" />
    ),
    // @ts-ignore
    h5: ({ node, ...props }) => (
      <Typography variant="body1" {...props} color="text.primary" />
    ),
    // @ts-ignore
    h6: ({ node, ...props }) => (
      <Typography variant="body1" {...props} color="text.primary" />
    ),
    // @ts-ignore
    p: ({ node, ...props }) => (
      <Typography variant="body1" {...props} color="text.primary" />
    ),
    // @ts-ignore
    a: ({ node, ...props }) => {
      return (
        <TypeLink
          label={props.children[0]}
          color={blockSpecQuery(typeInfo[props.href], "color")}
          onClick={(e) => {
            e.preventDefault();
            if (typeInfo[props.href]) {
              handleLinkClick(props.href);
              if (tab === "featured" && props.href !== typeKey) {
                setTab("description");
              }
            }
          }}
        />
      );
    },
    // @ts-ignore
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, "")}
          style={oneDark}
          language={match[1]}
          // PreTag="pre"
          {...props}
        />
      ) : (
        <Box
          style={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#44444444" : "#cccccccc",
            borderRadius: 4,
            padding: 5,
          }}
        >
          <code className={className} {...props}>
            {children}
          </code>
        </Box>
      );
    },
    // @ts-ignore
    ol: ({ node, ordered, ...props }) => (
      <ol
        {...props}
        style={{
          fontFamily: "helvetica",
          backgroundColor:
            theme.palette.mode === "dark" ? "#44444444" : "#cccccccc",
          color: theme.palette.text.primary,
          borderRadius: 4,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      />
    ),
    // @ts-ignore
    ul: ({ node, ordered, ...props }) => (
      <ul
        {...props}
        style={{
          fontFamily: "helvetica",
          backgroundColor:
            theme.palette.mode === "dark" ? "#44444444" : "#cccccccc",
          color: theme.palette.text.primary,
          borderRadius: 4,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      />
    ),
    // @ts-ignore
    blockquote: ({ node, ...props }) => {
      let severity: AlertColor = "info";
      let color: AlertColor = "info";
      let cleaned: string[] = [];
      // @ts-ignore
      props.children.forEach((child) => {
        // @ts-ignore
        if (typeof child === "object" && child.props?.children) {
          // @ts-ignore
          child.props.children.forEach((innerChild, idx) => {
            if (
              typeof innerChild === "string" &&
              innerChild.includes("[info]")
            ) {
              severity = "info";
              color = "info";
              // @ts-ignore
              child.props.children[idx] = innerChild.replace("[info]", "");
            }
            if (
              typeof innerChild === "string" &&
              innerChild.includes("[primary]")
            ) {
              severity = "info";
              color = "info";
              // @ts-ignore
              child.props.children[idx] = innerChild.replace("[primary]", "");
            } else if (
              typeof innerChild === "string" &&
              innerChild.includes("[success]")
            ) {
              severity = "success";
              color = "success";
              // @ts-ignore
              child.props.children[idx] = innerChild.replace("[success]", "");
            } else if (
              typeof innerChild === "string" &&
              innerChild.includes("[warn]")
            ) {
              severity = "warning";
              color = "warning";
              // @ts-ignore
              child.props.children[idx] = innerChild.replace("[warn]", "");
            } else if (
              typeof innerChild === "string" &&
              innerChild.includes("[error]")
            ) {
              severity = "error";
              color = "error";
              // @ts-ignore
              child.props.children[idx] = innerChild.replace("[error]", "");
            } else {
            }
          });
        }
        cleaned.push(child);
      });
      return (
        <Alert variant="filled" severity={severity} color={color}>
          <span>{cleaned}</span>
        </Alert>
      );
    },
  };

  let connections = [];
  let connectionData: { [key: string]: ConnectionInfo }[] = [];
  const activeTypeSpec = typeInfo[activeType];
  if (
    activeTypeSpec && activeTypeSpec.primitiveType === PrimitiveType.Object &&
    activeTypeSpec?.instanceBlock?.onCanvas &&
    activeTypeSpec?.instanceBlock?.connections
  ) {
    connections.push("instanceBlock");
    connectionData.push(activeTypeSpec.instanceBlock.connections);
  }
  if (
    activeTypeSpec && activeTypeSpec.primitiveType === PrimitiveType.Object &&
    activeTypeSpec?.referenceBlock?.onCanvas &&
    activeTypeSpec?.referenceBlock?.connections
  ) {
    connections.push("referenceBlock");
    connectionData.push(activeTypeSpec.referenceBlock.connections);
  }
  if (
    activeTypeSpec && activeTypeSpec.primitiveType === PrimitiveType.Function &&
    activeTypeSpec?.functionBlock?.onCanvas &&
    activeTypeSpec?.functionBlock?.connections
  ) {
    connections.push("functionBlock");
    connectionData.push(activeTypeSpec.functionBlock.connections);
  }
  if (
    activeTypeSpec && activeTypeSpec.primitiveType === PrimitiveType.Function &&
    activeTypeSpec?.callBlock?.onCanvas &&
    activeTypeSpec?.callBlock?.connections
  ) {
    connections.push("callBlock");
    connectionData.push(activeTypeSpec.callBlock.connections);
  }

  return (
    <div
      ref={docRef}
      className="nodrag nowheel"
      style={{
        // userDrag: "none",
        zIndex: 100,
        transformOrigin: "left",
        minWidth: 200,
        maxWidth: 350,
      }}
    >
      <div
        style={{
          backgroundColor: haloColor,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        <Tabs
          key="tabs"
          value={tab}
          onChange={(_, tab) => setTab(tab)}
          indicatorColor="primary"
          textColor="inherit"
          //   variant="fullWidth"
          aria-label="full width tabs example"
          sx={{}}
        >
          {tabs.map((tab) => (
            <Tab key={tab} label={tab} value={tab} />
          ))}
        </Tabs>
      </div>
      {(tab === "description" || tab === "usage") && (
        <Box
          key={tab}
          style={{
            padding: 2,
            backgroundColor:
              theme.palette.mode === "dark" ? "#252525" : "#cccccccc",
          }}
        >
          <Breadcrumbs>
            {path.map((item) => (
              <StyledBreadcrumb
                key={item}
                label={typeInfo[item]?.name || "Unrecognized"}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
                onDelete={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
                deleteIcon={
                  <FiCircle
                    style={{
                      height: 13,
                      width: 13,
                      fill: blockSpecQuery(typeInfo[item], "color"),
                    }}
                  />
                }
              />
            ))}
          </Breadcrumbs>
        </Box>
      )}
      <ScrollRegion
        key="content"
        width={350}
        height={"50vh"}
        // style={{
        //   minHeight: 100,
        //   maxHeight: 400,
        //   padding: 10
        // }}
      >
        <div style={{ padding: 10 }}>
          {tab === "featured" && (
            <Remark
              rehypeReactOptions={{
                // @ts-ignore
                components: componentLookup,
              }}
            >
              {featuredDoc}
            </Remark>
          )}
          {tab === "description" && (
            <Remark
              rehypeReactOptions={{
                // @ts-ignore
                components: componentLookup,
              }}
            >
              {typeInfo[activeType]?.description || "No Description"}
            </Remark>
          )}
          {tab === "usage" && (
            <>
              <Accordion key="fields">
                <AccordionSummary
                  expandIcon={<FiChevronDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <b>
                      <i>{typeInfo[activeType]?.name || "Unrecognized"}</i>
                    </b>{" "}
                    Fields
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2D2D2D" : "#D2D2D2",
                    padding: 1,
                  }}
                >
                  {Object.keys(typeInfo[activeType]?.properties || {})
                    .length === 0 && (
                    <Typography
                      style={{ textAlign: "center" }}
                      color="text.secondary"
                    >
                      This block has no fields
                    </Typography>
                  )}
                  <Stack spacing={1}>
                    {Object.keys(typeInfo[activeType]?.properties || {}).map(
                      (key) => (
                        <FieldInfoSection
                          key={key}
                          parent={activeType}
                          field={key}
                          typeInfo={typeInfo}
                          handleLinkClick={handleLinkClick}
                          container={docRef.current || undefined}
                        />
                      )
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <Accordion key="as-field">
                <AccordionSummary
                  expandIcon={<FiChevronDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <b>
                      <i>{typeInfo[activeType]?.name || "Unrecognized"}</i>
                    </b>{" "}
                    as a Field
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2D2D2D" : "#D2D2D2",
                    padding: 1,
                  }}
                >
                  <Stack spacing={1}>
                    {references.length === 0 && (
                      <Typography
                        style={{ textAlign: "center" }}
                        color="text.secondary"
                      >
                        This block is not used anywhere
                      </Typography>
                    )}
                    {references.map((block) => (
                      <>
                        <Divider>
                          <TypeLink
                            label={typeInfo[block.parent]?.name}
                            color={blockSpecQuery(
                              typeInfo[block.parent],
                              "color"
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              if (typeInfo[block.parent]) {
                                handleLinkClick(block.parent);
                              }
                            }}
                          />
                        </Divider>
                        {block.fields.map((field: string) => (
                          <FieldInfoSection
                            key={`${block.parent}-${field}`}
                            parent={block.parent}
                            field={field}
                            typeInfo={typeInfo}
                            handleLinkClick={handleLinkClick}
                          />
                        ))}
                      </>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <Accordion key="connections">
                <AccordionSummary
                  expandIcon={<FiChevronDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Connections</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2D2D2D" : "#D2D2D2",
                    padding: 1,
                  }}
                >
                  {connections.length > 0 ? (
                    connections.map((blockType, i) => (
                      <>
                        <Divider>
                          <span
                            style={{
                              fontFamily: "Helvetica",
                              textTransform: "capitalize",
                            }}
                          >
                            {blockType.replace("Block", "")}
                          </span>
                        </Divider>
                        {Object.entries(connectionData[i]).map(
                          ([side, connectInfo]) => (
                            <ConnectionInfoSection
                              side={side as Position}
                              connectionInfo={connectInfo as ConnectionInfo}
                              typeInfo={typeInfo}
                              handleLinkClick={handleLinkClick}
                            />
                          )
                        )}
                      </>
                    ))
                  ) : (
                    <Typography
                      style={{ textAlign: "center" }}
                      color="text.secondary"
                    >
                      This block has no connections
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </div>
        {/* Content for {data.name} */}
      </ScrollRegion>
      <CardActions>
        <IconTextButton
          size="small"
          title="Close"
          onClick={() => setActiveDoc(data.id, false)}
        >
          Close
        </IconTextButton>
      </CardActions>
    </div>
  );
};

// export const Doc = ()=>null
