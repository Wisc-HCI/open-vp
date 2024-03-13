import { TreeView } from '@people_and_robots/open-gui';

export interface DebugSectionProps {
  interactionDisabled?: boolean;
  data: any;
}
export const DebugSection = ({ interactionDisabled, data }: DebugSectionProps) => {

  return (
    <TreeView data={{...data, interactionDisabled}} enclose/>
  )
};
