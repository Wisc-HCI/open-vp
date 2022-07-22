// These icons need to be readjusted for Simple-VP
import { LocationIcon } from './CustomIcons/Location';
import { PrimitiveIcon } from './CustomIcons/Primitive';
// import { ReactComponent as MachineIcon } from './CustomIcons/Machine.svg';
import { MachineIcon } from './CustomIcons/Machine';
import { SkillIcon } from './CustomIcons/Skill';
import { ThingIcon } from './CustomIcons/Thing';
import { WaypointIcon } from './CustomIcons/Waypoint';
import { ContainerIcon } from './CustomIcons/Container';
import { ProcessIcon } from './CustomIcons/Process';
import { InputOutputIcon } from './CustomIcons/InputOutput';
import { ToolIcon } from './CustomIcons/Tool';
import { FixtureIcon } from './CustomIcons/Fixture';
import { ZoneIcon } from './CustomIcons/Zone';
import { LinkIcon } from './CustomIcons/Link';
import {
    FiAlertTriangle,
    FiAlertOctagon,
    FiRefreshCw,
    FiThumbsUp,
  } from "react-icons/fi";
import { STATUS } from './Constants';

export const LocationIconStyled = LocationIcon;
export const PrimitiveIconStyled = PrimitiveIcon;
export const MachineIconStyled = MachineIcon;
export const SkillIconStyled = SkillIcon;
export const ThingIconStyled = ThingIcon;
export const WaypointIconStyled = WaypointIcon;
export const ContainerIconStyled = ContainerIcon;
export const ProcessIconStyled = ProcessIcon;
export const InputOutputIconStyled = InputOutputIcon;
export const ToolIconStyled = ToolIcon;
export const FixtureIconStyled = FixtureIcon;
export const ZoneIconStyled = ZoneIcon;
export const LinkIconStyled = LinkIcon;

export const statusIcon = (data) => {
    if ([data.properties?.status,data.refData?.properties?.status].includes(STATUS.FAILED)) {
      return <FiAlertOctagon color="white" fill="red" />;
    } else if ([data.properties?.status,data.refData?.properties?.status].includes(STATUS.VALID)) {
      return <FiThumbsUp color="white" />;
    } else if ([data.properties?.status,data.refData?.properties?.status].includes(STATUS.WARN)) {
      return <FiAlertTriangle color="white" fill="#ff7300" />;
    } else if ([data.properties?.status,data.refData?.properties?.status].includes(STATUS.PENDING)) {
      return <FiRefreshCw className="rotate" />;
    }
  }