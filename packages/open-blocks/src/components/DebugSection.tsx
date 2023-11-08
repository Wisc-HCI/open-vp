import React from "react";
import { styled } from '@mui/material/styles';
import { Collapse, Box } from "@mui/material";
import { TreeView } from '@people_and_robots/open-gui';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export interface DebugSectionProps {
  interactionDisabled?: boolean;
  data: any;
}
export const DebugSection = ({ interactionDisabled, data }: DebugSectionProps) => {

  return (
    <TreeView data={{...data, interactionDisabled}} enclose/>
  )
};
