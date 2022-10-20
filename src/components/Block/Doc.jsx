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
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { emphasize, styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { useState } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import shallow from "zustand/shallow";
import ReactMarkdown from "react-markdown";
import {
  FiChevronDown,
  FiCircle,
  FiCode,
  FiList,
  FiPaperclip,
  FiStar,
} from "react-icons/fi";
import { SIMPLE_PROPERTY_TYPES } from "../Constants";

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
  let references = [];
  Object.keys(typeSpec).forEach((typeValue) => {
    let entry = { parent: typeValue, fields: [] };
    if (typeSpec[typeValue].properties) {
      Object.keys(typeSpec[typeValue].properties).forEach((prop) => {
        if (typeSpec[typeValue].properties[prop].accepts?.includes(usedType)) {
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

const ChipMimic = styled("button")(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    display: "inline-block",
    backgroundColor,
    // paddingTop: 3,
    // paddingBottom: 3,
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
    // "&:active": {
    //   boxShadow: theme.shadows[1],
    //   backgroundColor: emphasize(backgroundColor, 0.12),
    // },
  };
});

const FieldInfo = ({ parent, field, typeInfo, handleLinkClick }) => {
  const fieldInfo = typeInfo[parent]?.properties?.[field];
  const variant = fieldInfo?.accepts
    ? "block"
    : SHOWN_SIMPLE_TYPES.includes(fieldInfo?.type)
    ? "simple"
    : "none";

  if (variant === "none") {
    return null;
  }

  return (
    <Card sx={{ padding: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="h5" color="text.primary">
            {fieldInfo.name}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontSize: 14, textAlign: "center", fontStyle: "italic" }}
            color="text.secondary"
            gutterBottom={false}
          >
            {fieldInfo.accepts ? "Accepts" : fieldInfo.type}
          </Typography>
        </Grid>
        {fieldInfo.accepts && (
          <>
            <Grid item xs={4}>
              <Masonry spacing={1} columns={2}>
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
                        backgroundColor: "coral",
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
                        backgroundColor: "lightblue",
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
                        backgroundColor: "goldenrod",
                      }}
                    >
                      <FiStar />
                    </Avatar>
                  </Tooltip>
                )}
              </Masonry>
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
              {fieldInfo?.accepts?.map((t) => (
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
      {/* <Stack direction="row" spacing={1}>
        <Stack
          spacing={1}
          style={{ alignContent: "center", flex: 1 }}
          divider={<Divider flexItem />}
        >
          
        </Stack>
        {variant === "block" && (
          <Card sx={{ padding: 2, flex: 2 }} variant="outlined">
            <Divider flexItem />
            
          </Card>
        )}
      </Stack> */}
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

export const Doc = forwardRef(({ data }, ref) => {
  const { zoom } = useViewport();
  const [path, setPath] = useState([data.type]);
  const activeType = path[path.length - 1];

  const featuredDoc = useProgrammingStore(
    (state) =>
      typeof state.featuredDocs[data.id] === "string"
        ? state.featuredDocs[data.id]
        : null,
    shallow
  );
  const tabs = featuredDoc
    ? ["featured", "description", "usage"]
    : ["description", "usage"];
  const [tab, setTab] = useState(tabs[0]);
  const typeInfo = useProgrammingStore(
    (state) => state.programSpec.objectTypes,
    shallow
  );

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
              if (tab === "featured" && props.href !== data.type) {
                setTab("description");
              }
            }
          }}
        />
      );
    },
    code: ({ node, ...props }) => (
      <Box
        style={{
          backgroundColor: "#444",
          borderRadius: 4,
          padding: 5,
        }}
      >
        <pre>
          <code {...props} />
        </pre>
      </Box>
    ),
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
          icon={color === "quiet" ? <FiPaperclip /> : undefined}
        >
          <span children={cleaned} />
        </Alert>
      );
    },
  };

  return (
    <Card
      ref={ref}
      className="nodrag nowheel"
      sx={{
        // borderRadius: 4,
        color: "white",
        marginLeft: 2,
        transform: `scale(${1 / zoom})`,
        zIndex: 100,
        transformOrigin: "left",
        minWidth: 200,
        maxWidth: 350,
        boxShadow: "1px 1px 10px 0px #bbbbbbaa",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, tab) => setTab(tab)}
        indicatorColor="primary"
        textColor="inherit"
        //   variant="fullWidth"
        aria-label="full width tabs example"
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
          <ReactMarkdown components={componentLookup}>
            {featuredDoc}
          </ReactMarkdown>
        )}
        {tab === "description" && (
          <ReactMarkdown components={componentLookup}>
            {typeInfo[activeType]?.description}
          </ReactMarkdown>
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
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </>
        )}

        {/* Content for {data.name} */}
      </Box>
    </Card>
  );
});
