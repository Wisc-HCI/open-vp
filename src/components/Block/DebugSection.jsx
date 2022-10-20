import React from "react";
import { styled } from '@mui/material/styles';
import { Collapse, Box } from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const StyledTreeItem = styled(TreeItem)(({theme})=>({
  color:'#ddd',
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderRadius: 3,
    width:'unset',
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .label-value`]: {
    paddingTop:3,
    paddingBottom:3,
    paddingRight:8,
    paddingLeft:8,
    borderRadius:8,
    backgroundColor:'#33333355',
  }
}))

const dataToNode = (key,data) => {
  if (typeof data === 'object' && data !== null) {
    return (
      <StyledTreeItem key={key} nodeId={key} label={`${key} `} disabled={Object.keys(data).length === 0}>
        {Object.keys(data).map(d=>dataToNode(d,data[d]))}
      </StyledTreeItem>
    )
  } else if (typeof data === 'string') {
    return <StyledTreeItem key={key} nodeId={key} label={<span>{key}:{' '}<span className='label-value'>"{data}"</span></span>}/>
  } else if (typeof data === 'number') {
    return <StyledTreeItem key={key} nodeId={key} label={<span>{key}:{' '}<span className='label-value'>{data}</span></span>}/>
  } else if (typeof data === 'boolean') {
    return <StyledTreeItem key={key} nodeId={key} label={<span>{key}:{' '}<span style={{boxShadow:`0px 0px 2px 1px inset ${data?'lime':'red'}`}} className='label-value'>{data?'true':'false'}</span></span>}/>
  } else if (typeof data === 'null') {
    return <StyledTreeItem key={key} nodeId={key} label={<span>{key}:{' '}<span className='label-value'>null</span></span>}/>
  }
}

export const DebugSection = ({ interactionDisabled, data }) => {

  const renderedData = {
    ...data,
    interactionDisabled: interactionDisabled ? true : false,
  }

  console.log(renderedData)

  return (
    <Box
      onClick={(e)=>e.stopPropagation()}
      style={{
        whiteSpace: "pre",
        color: "white",
        fontFamily: "monospace",
        backgroundColor:"#00000044",
        margin:'3px',
        padding:'5px',
        borderRadius:4
      }}
    >
      <TreeView sx={{flex:1}} defaultCollapseIcon={<FiChevronDown/>} defaultExpandIcon={<FiChevronRight/>}>
        {dataToNode('root',renderedData)}
      </TreeView>
    </Box>
  );
};
