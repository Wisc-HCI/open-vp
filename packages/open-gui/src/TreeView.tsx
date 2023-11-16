import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { TreeView as MuiTreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderRadius: 3,
    width: "unset",
    marginTop: 2,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .label-value`]: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: "#33333355",
  },
}));

const BoolPill = styled('span')<{value: boolean}>(({ theme, value }) => ({
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 18,
    color: value ? theme.palette.success.contrastText : theme.palette.error.contrastText,
    backgroundColor: value ? theme.palette.success.main : theme.palette.error.main,
  }));

interface DataNodeProps {
  dataKey: string;
  data: any;
}
const DataNode = ({ dataKey, data }: DataNodeProps) => {
  if (typeof data === "object" && data !== null) {
    return (
      <StyledTreeItem
        key={dataKey}
        nodeId={dataKey}
        label={`${dataKey} `}
        disabled={Object.keys(data).length === 0}
      >
        {Object.keys(data).map((d) => (
          <DataNode key={d} dataKey={d} data={data[d]} />
        ))}
      </StyledTreeItem>
    );
  } else if (typeof data === "string") {
    return (
      <StyledTreeItem
        key={dataKey}
        nodeId={dataKey}
        label={
          <span>
            {dataKey}: <span className="label-value">"{data}"</span>
          </span>
        }
      />
    );
  } else if (typeof data === "number") {
    return (
      <StyledTreeItem
        key={dataKey}
        nodeId={dataKey}
        label={
          <span>
            {dataKey}: <span className="label-value">{data}</span>
          </span>
        }
      />
    );
  } else if (typeof data === "boolean") {
    return (
      <StyledTreeItem
        key={dataKey}
        nodeId={dataKey}
        label={
          <span>
            {dataKey}:{" "}
            <BoolPill value={data}>{data ? "true" : "false"}</BoolPill>
          </span>
        }
      />
    );
  } else if (data === null) {
    return (
      <StyledTreeItem
        key={dataKey}
        nodeId={dataKey}
        label={
          <span>
            {dataKey}: <span className="label-value">null</span>
          </span>
        }
      />
    );
  } else {
    return (
      <StyledTreeItem
        key={dataKey}
        nodeId={dataKey}
        label={
          <span>
            {dataKey}: <span className="label-value">UNKNOWN</span>
          </span>
        }
      />
    );
  }
};

const Wrapper = styled(Box)({
  whiteSpace: "pre",
  fontFamily: "monospace",
  margin: "3px",
  padding: "5px",
  borderRadius: 4,
},({theme})=>({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

export interface TreeViewProps {
  data: any;
  enclose?: boolean;
}
export const TreeView = ({
  data,
  enclose,
}: TreeViewProps) => {

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <MuiTreeView
        sx={{ flex: 1 }}
        defaultCollapseIcon={<ChevronDownIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {enclose ? (
          <DataNode dataKey="root" data={data} />
        ) : typeof data === "object" ? 
          Object.entries(data).map(([k, d]: [number|string,any]) => (
            <DataNode key={k} dataKey={k.toString()} data={d} />
          )
        ) : (
          <DataNode dataKey="root" data={data} />
        )}
      </MuiTreeView>
    </Wrapper>
  );
};
