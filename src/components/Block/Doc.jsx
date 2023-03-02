import { useViewport } from "reactflow";
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
  Tooltip,
  Divider,
  Avatar,
  CardHeader,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { darken, emphasize, styled } from "@mui/material/styles";
import { forwardRef, useState, useCallback } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import shallow from "zustand/shallow";
import { Remark } from "react-remark";
import {
  FiChevronDown,
  FiCircle,
  FiCode,
  FiLogIn,
  FiList,
  FiLogOut,
  FiPaperclip,
  FiStar,
  FiDownload,
  FiSquare
} from "react-icons/fi";
import {
  TYPES,
  DATA_TYPES,
  CONNECTIONS,
  DOC_FLAG_COLORS,
  SIMPLE_PROPERTY_TYPES,
} from "../Constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { functionTypeSpec } from "./Utility";
import { pickBy } from "lodash";

const SHOWN_SIMPLE_TYPES = [
  SIMPLE_PROPERTY_TYPES.BOOLEAN,
  SIMPLE_PROPERTY_TYPES.NUMBER,
  SIMPLE_PROPERTY_TYPES.STRING,
  SIMPLE_PROPERTY_TYPES.OPTIONS,
  SIMPLE_PROPERTY_TYPES.VECTOR3,
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

const getColor = (spec) => {
  return (
    spec?.instanceBlock?.color ||
    spec?.referenceBlock?.color ||
    spec?.callBlock?.color ||
    "#bbb"
  );
};

const getReferences = (typeSpec, usedType) => {
  const referent = typeSpec[usedType].specificType || usedType
  let references = [];
  Object.keys(typeSpec).forEach((typeValue) => {
    let entry = { parent: typeValue, fields: [] };
    if (typeSpec[typeValue].properties) {
      Object.keys(typeSpec[typeValue].properties).forEach((prop) => {
        if (typeSpec[typeValue].properties[prop].accepts?.includes(referent)) {
          entry.fields.push(prop);
        }
      });
    }
    if (entry.fields.length > 0) {
      references.push(entry);
    }
  });
  return references;
};

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
    }
  };
});

const FieldInfo = ({ parent, field, typeInfo, handleLinkClick }) => {
  const fieldInfo = typeInfo[parent]?.properties?.[field];
  const fullAccepts = fieldInfo?.accepts 
    ? fieldInfo.accepts.map(a=>{
      if (typeInfo[a]) {
        return [a]
      } else {
        return Object.keys(pickBy(typeInfo,(info)=>info.specificType === a))
      }
    }).reduce((accumulator,currentValue)=>[...accumulator,...currentValue],[])
    : [];
  const variant = fieldInfo?.accepts
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
        title={fieldInfo.name}
        sx={{ padding: 0 }}
        action={
          fieldInfo.accepts ? (
            <Stack direction="row" gap={0.5}>
              {fieldInfo.isList && (
                <Tooltip
                  title="This property accepts a set of entries as a list"
                  sx={{ fontSize: 20 }}
                  arrow
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
                  title="This property spans the width of the block"
                  sx={{ fontSize: 20 }}
                  arrow
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
                  title="This property is required"
                  sx={{ fontSize: 20 }}
                  arrow
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
                  title="This is an argument to the function"
                  sx={{ fontSize: 20 }}
                  arrow
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
              {fieldInfo.isFunctionBlockField && (
                <Tooltip
                  title="This is a property of this function block"
                  sx={{ fontSize: 20 }}
                  arrow
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
      {fieldInfo?.accepts && (
        <CardContent
          sx={{
            bgcolor: "#252525",
            borderRadius: 1,
            padding: 0.5,
            lineHeight: 1.75,
          }}
        >
          {fullAccepts?.map((t) => (
            <TypeLink
              key={t}
              label={typeInfo[t]?.name || "Unrecognized"}
              color={getColor(typeInfo[t])}
              onClick={(e) => {
                e.preventDefault();
                if (typeInfo[t]) {
                  handleLinkClick(t);
                }
              }}
            />
          ))}
        </CardContent>
      )}
    </Card>
  );
};

const ConnectionInfo = ({
  side,
  connectionInfo,
  typeInfo,
  handleLinkClick,
}) => {
  return (
    <Card sx={{ padding: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography
            variant="h5"
            color="text.primary"
            style={{ textTransform: "capitalize" }}
          >
            {side}
          </Typography>
        </Grid>
        <Grid item xs={8}>
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
            <Grid item xs={4}>
              <Tooltip
                title={
                  connectionInfo.direction === CONNECTIONS.OUTBOUND
                    ? "This connection is outbound"
                    : "This connection is inbound"
                }
                sx={{ fontSize: 20 }}
                arrow
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor:
                      connectionInfo.direction === CONNECTIONS.OUTBOUND
                        ? DOC_FLAG_COLORS.OUTBOUND_CONNECTION
                        : DOC_FLAG_COLORS.INBOUND_CONNECTION,
                  }}
                >
                  {connectionInfo.direction === CONNECTIONS.OUTBOUND ? (
                    <FiLogOut />
                  ) : (
                    <FiLogIn />
                  )}
                </Avatar>
              </Tooltip>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                bgcolor: "#252525",
                borderRadius: 1,
                padding: 3,
                lineHeight: 1.75,
              }}
            >
              {connectionInfo.allowed?.map((t) => (
                <TypeLink
                  label={typeInfo[t].name}
                  color={getColor(typeInfo[t])}
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

const TypeLink = ({ label, color, onClick }) => {
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

export const TypeDescription = ({ type }) => {
  const info = useProgrammingStore(
    useCallback((state) => state.programSpec.objectTypes[type], [type]),
    shallow
  );
  return (
    <TypeLink label={info?.name || "Unknown Block"} color={getColor(info)} />
  );
};

export const Doc = forwardRef(({ data, inDrawer }, ref) => {
  const { zoom } = useViewport();
  // console.log(data);
  const typeKey = data?.typeSpec?.type === TYPES.FUNCTION 
    ? data.id 
    : data.dataType === DATA_TYPES.CALL 
    ? data.ref
    : data.type;
  const [path, setPath] = useState([typeKey]);
  const activeType = path[path.length - 1];
  const typeInfo = useProgrammingStore(
    (state) =>
      functionTypeSpec(state.programSpec.objectTypes, state.programData),
    shallow
  );
  const haloColor = darken(getColor(typeInfo[activeType]), 0.5);

  const setActiveDoc = useProgrammingStore(
    (state) => state.setActiveDoc,
    shallow
  );
  const featuredDoc = useProgrammingStore(
    (state) =>
      typeof state.featuredDocs[data.id] === "string"
        ? state.featuredDocs[data.id]
        : typeof state.featuredDocs[data.refData?.id] === "string"
        ? state.featuredDocs[data.refData?.id]
        : null,
    shallow
  );
  const tabs = featuredDoc
    ? ["featured", "description", "usage"]
    : ["description", "usage"];
  const [tab, setTab] = useState(tabs[0]);

  const references = getReferences(typeInfo, activeType);

  const handleLinkClick = (value) => {
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
    h1: ({ node, ...props }) => <Typography variant="h3" {...props} />,
    h2: ({ node, ...props }) => <Typography variant="h4" {...props} />,
    h3: ({ node, ...props }) => <Typography variant="h5" {...props} />,
    h4: ({ node, ...props }) => <Typography variant="h6" {...props} />,
    h5: ({ node, ...props }) => <Typography variant="body1" {...props} />,
    h6: ({ node, ...props }) => <Typography variant="body1" {...props} />,
    p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
    a: ({ node, ...props }) => {
      return (
        <TypeLink
          label={props.children[0]}
          color={getColor(typeInfo[props.href])}
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
            backgroundColor: "#444",
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
    ol: ({ node, ordered, ...props }) => (
      <ol
        {...props}
        style={{
          fontFamily: "helvetica",
          backgroundColor: "#44444444",
          borderRadius: 4,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      />
    ),
    ul: ({ node, ordered, ...props }) => (
      <ul
        {...props}
        style={{
          fontFamily: "helvetica",
          backgroundColor: "#44444480",
          borderRadius: 4,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      />
    ),
    blockquote: ({ node, ...props }) => {
      let severity = "info";
      let color = "quiet";
      let cleaned = [];
      props.children.forEach((child) => {
        if (typeof child === "object" && child.props?.children) {
          child.props.children.forEach((innerChild, idx) => {
            if (
              typeof innerChild === "string" &&
              innerChild.includes("[info]")
            ) {
              severity = "info";
              color = "info";
              child.props.children[idx] = innerChild.replace("[info]", "");
            } if (
              typeof innerChild === "string" &&
              innerChild.includes("[primary]")
            ) {
              severity = "info";
              color = "primary";
              child.props.children[idx] = innerChild.replace("[primary]", "");
            } else if (
              typeof innerChild === "string" &&
              innerChild.includes("[success]")
            ) {
              severity = "success";
              color = "success";
              child.props.children[idx] = innerChild.replace("[success]", "");
            } else if (
              typeof innerChild === "string" &&
              innerChild.includes("[warn]")
            ) {
              severity = "warning";
              color = "warning";
              child.props.children[idx] = innerChild.replace("[warn]", "");
            } else if (
              typeof innerChild === "string" &&
              innerChild.includes("[error]")
            ) {
              severity = "error";
              color = "error";
              child.props.children[idx] = innerChild.replace("[error]", "");
            } else {
            }
          });
        }
        cleaned.push(child);
      });
      return (
        <Alert
          variant="filled"
          severity={severity}
          color={color}
          icon={color === "quiet" || color === "primary" ? <FiPaperclip /> : undefined}
        >
          <span children={cleaned} />
        </Alert>
      );
    },
  };

  const connections = ["instanceBlock", "referenceBlock", "callBlock"].filter(
    (blockType) =>
      typeInfo[activeType]?.[blockType]?.onCanvas &&
      typeInfo[activeType]?.[blockType]?.connections
  );

  return (
    <Card
      ref={ref}
      className="nodrag nowheel"
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragStartCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrag={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={() => console.log("typeinfo", typeInfo)}
      sx={{
        // borderRadius: 4,
        userDrag: "none",
        color: "white",
        marginLeft: 2,
        transform: inDrawer ? `scale(1)` : `scale(${1 / zoom})`,
        zIndex: 100,
        transformOrigin: "left",
        minWidth: 200,
        maxWidth: 350,
        // boxShadow: `0px 0px 3px 3px ${haloColor}`,
        // backgroundColor: darken(getColor(typeInfo[activeType]),0.5)
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, tab) => setTab(tab)}
        indicatorColor="primary"
        textColor="inherit"
        //   variant="fullWidth"
        aria-label="full width tabs example"
        sx={{ backgroundColor: haloColor }}
      >
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} value={tab} />
        ))}
      </Tabs>
      {(tab === "description" || tab === "usage") && (
        <Box style={{ padding: 2, backgroundColor: "#252525" }}>
          <Breadcrumbs>
            {path.map((item) => (
              <StyledBreadcrumb
                key={item}
                underline="hover"
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
                      fill: getColor(typeInfo[item]),
                    }}
                  />
                }
              />
            ))}
          </Breadcrumbs>
        </Box>
      )}
      <Box
        style={{
          minHeight: 100,
          maxHeight: 400,

          padding: 10,
          overflowY: "scroll",
        }}
      >
        {tab === "featured" && (
          <Remark
            rehypeReactOptions={{
              components: componentLookup,
            }}
          >
            {featuredDoc}
          </Remark>
        )}
        {tab === "description" && (
          <Remark
            rehypeReactOptions={{
              components: componentLookup,
            }}
          >
            {typeInfo[activeType]?.description || "No Description"}
          </Remark>
        )}
        {tab === "usage" && (
          <>
            <Accordion sx={{ backgroundColor: "#333" }}>
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
              <AccordionDetails sx={{ backgroundColor: "#2D2D2D", padding: 1 }}>
                {Object.keys(typeInfo[activeType]?.properties || {}).length ===
                  0 && (
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
                      <FieldInfo
                        key={key}
                        parent={activeType}
                        field={key}
                        typeInfo={typeInfo}
                        handleLinkClick={handleLinkClick}
                      />
                    )
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: "#333" }}>
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
              <AccordionDetails sx={{ backgroundColor: "#2D2D2D", padding: 1 }}>
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
                          color={getColor(typeInfo[block.parent])}
                          onClick={(e) => {
                            e.preventDefault();
                            if (typeInfo[block.parent]) {
                              handleLinkClick(block.parent);
                            }
                          }}
                        />
                      </Divider>
                      {block.fields.map((field) => (
                        <FieldInfo
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
            <Accordion sx={{ backgroundColor: "#333" }}>
              <AccordionSummary
                expandIcon={<FiChevronDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Connections</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#2D2D2D", padding: 1 }}>
                {connections.length > 0 ? (
                  connections.map((blockType) => (
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
                      {Object.entries(
                        typeInfo[activeType][blockType].connections
                      ).map(([side, connectInfo]) => (
                        <ConnectionInfo
                          side={side}
                          connectionInfo={connectInfo}
                          typeInfo={typeInfo}
                          handleLinkClick={handleLinkClick}
                        />
                      ))}
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

        {/* Content for {data.name} */}
      </Box>
      <CardActions style={{ borderTop: "1px solid #444" }}>
        <Button
          size="small"
          style={{ flex: 1 }}
          onClick={() => setActiveDoc(data.id, false)}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
});

// export const Doc = ()=>null
