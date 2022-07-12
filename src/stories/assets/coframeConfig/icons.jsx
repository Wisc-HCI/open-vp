// These icons need to be readjusted for Simple-VP
import { ReactComponent as LocationIcon } from './CustomIcons/Location.svg';
import { ReactComponent as PrimitiveIcon } from './CustomIcons/Primitive.svg';
import { ReactComponent as MachineIcon } from './CustomIcons/Machine.svg';
import { ReactComponent as SkillIcon } from './CustomIcons/Skill.svg';
import { ReactComponent as ThingIcon } from './CustomIcons/Thing.svg';
import { ReactComponent as WaypointIcon } from './CustomIcons/Waypoint.svg';
import { ReactComponent as ContainerIcon } from './CustomIcons/Container.svg';
import { ReactComponent as ProcessIcon } from './CustomIcons/Process.svg';
import { ReactComponent as InputOutputIcon } from './CustomIcons/InputOutput.svg';
import { ReactComponent as ToolIcon } from './CustomIcons/Tool.svg';
import { ReactComponent as FixtureIcon } from './CustomIcons/Fixture.svg';
import { ReactComponent as ZoneIcon } from './CustomIcons/Zone.svg';
import { ReactComponent as LinkIcon } from './CustomIcons/Link.svg';
import {
    FiAlertTriangle,
    FiAlertOctagon,
    FiRefreshCw,
    FiThumbsUp,
  } from "react-icons/fi";
import { STATUS } from './Constants';

export const LocationIconStyled = ()=><LocationIcon style={{color:'white',width:18,height:18,fill:'white'}}/>
export const PrimitiveIconStyled = ()=><PrimitiveIcon style={{color:'white',width:18,height:18,fill:'white'}}/>
export const MachineIconStyled = ()=><MachineIcon style={{color:'white',width:18,height:18,fill:'white'}}/>
export const SkillIconStyled = ()=><SkillIcon style={{color:'white',width:18,height:18,fill:'white'}}/>
export const ThingIconStyled = ()=><ThingIcon style={{color:'white',width:18,height:18,fill:'white'}}/>
export const WaypointIconStyled = ()=><WaypointIcon style={{color:'white',width:18,height:18,fill:'white'}}/>
export const ContainerIconStyled = ()=><ContainerIcon style={{color:'white',width:18,height:17,fill:'white'}}/>
export const ProcessIconStyled = ()=><ProcessIcon style={{color:'white',width:18,height:17,fill:'white'}}/>
export const InputOutputIconStyled = ()=><InputOutputIcon style={{color:'white',width:18,height:17,fill:'white'}}/>
export const ToolIconStyled = ()=><ToolIcon style={{color:'white',width:18,height:17,fill:'white'}}/>
export const FixtureIconStyled = ()=><FixtureIcon style={{color:'white',width:18,height:17,fill:'white'}}/>
export const ZoneIconStyled = ()=><ZoneIcon style={{color:'white',width:18,height:17,fill:'white'}}/>
export const LinkIconStyled = ()=><LinkIcon style={{color:'white',width:18,height:17,fill:'white'}}/>

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