import { lighten } from "@mui/system";
import {
  PrimitiveType,
  ConnectionDirection,
  ExtraType,
  PropertyType,
  MetaType,
  ParserProps,
  BlockData,
  TypeSpec,
  DrawerSpec,
  DrawerType,
  BlockSpec
} from "@people_and_robots/open-core";
import { IconName } from "@people_and_robots/open-gui";

const EVENT = "eventType";
const ACTION = "actionType";
const STATE = "stateType";

const EVENT_IS = "eventIsType";
const EVENT_AND_STATE = "eventAndStateType";
const EVENT_UNARY = "eventUnaryType";
const EVENT_BINARY = "eventBinaryType";

const STATE_IS = "stateIsType";
const STATE_UNARY = "stateUnaryType";
const STATE_BINARY = "stateBinaryType";

const ACTION_REPEAT = "repeatActionType";
const ACTION_BINARY = "actionBinaryType";

const CONSTANT_TYPE = "constantType";

const EVENT_EXPRESSIONS = [EVENT,EVENT_UNARY, EVENT_BINARY, EVENT_IS, EVENT_AND_STATE];
const STATE_EXPRESSIONS = [STATE,STATE_UNARY, STATE_BINARY, STATE_IS];
const ACTION_EXPRESSIONS = [ACTION, ACTION_REPEAT, ACTION_BINARY];

const WHEN_TRIGGER = "triggerWhenType";

const WHEN = "whenType"

const WHILE = "whileType";

const RULES = [WHILE, WHEN, WHEN_TRIGGER];


export const triggerDrawers: DrawerSpec[] = [
  {
    title: "Rules",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: RULES,
    icon: "PlaylistAddCircleRounded",
  },
  {
    title: "Actions",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: ACTION_EXPRESSIONS,
    icon: "PlayCircleOutlineRounded",
  },
  {
    title: "States",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: STATE_EXPRESSIONS,
    icon: "PublicRounded",
  },
  {
    title: "Events",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: EVENT_EXPRESSIONS,
    icon: "AccessTimeRounded",
  },
  {
    title: "Constants",
    type: DrawerType.Singular,
    metaType: MetaType.ObjectReference,
    objectType: CONSTANT_TYPE,
    icon: "AdjustRounded"
  },

]

function nameonly_factory(name: string, icon: IconName, color: string): TypeSpec {
  return {
    name,
    primitiveType: PrimitiveType.Object,
    description: ``,
    instanceBlock: {
      onCanvas: false,
      color,
      icon,
      extras: [
        {
          type: ExtraType.Dropdown,
          label: "More",
          contents: [
            ExtraType.CollapseToggle,
            ExtraType.SelectionToggle,
            ExtraType.DeleteButton,
            ExtraType.DocToggle,
          ],
        },
      ],
    },
    referenceBlock: {
      onCanvas: false,
      color,
      icon,
      extras: []
    },
    properties: {},
    parsers: {
      "dsl": (props: ParserProps) => {
        return props.name;
      }
    },
    namePolicy: {
      "dsl": (block: BlockData) => {
        return block.name;
      }
    }
  }
}

function unary_factory(name: string, icon: IconName, color: string, label: string, accepts: string[], options?: {value: string, label: string}[]): TypeSpec {
  return {
    name,
    primitiveType: PrimitiveType.Object,
    description: ``,
    instanceBlock: {
      minified: true,
      onCanvas: false,
      color,
      icon,
      extras: [
        {
          type: ExtraType.Dropdown,
          label: "More",
          contents: [
            ExtraType.SelectionToggle,
            ExtraType.DeleteButton,
            ExtraType.DocToggle,
          ],
        },
      ],
    },
    referenceBlock: {
      minified: true,
      onCanvas: false,
      color,
      icon,
      extras: []
    },
    properties: {
      value: {
        id: "value",
        name: {
          id: "variant",
          name: label,
          type: PropertyType.Options,
          options: options ? options : [{value:'not',label:'Not'}],
          default: 'not',
        },
        type: PropertyType.Block,
        accepts,
        default: null,
        isList: false
      }
    },
    parsers: {
      "dsl": (props: ParserProps) => {
        if (props.block.metaType !== MetaType.ObjectInstance) return "error";
        return `${props.block.properties.variant} ${props.storeParser("dsl", props.block.properties.value, props.depth, props.context)}`;
      }
    },
    namePolicy: {
      "dsl": (block: BlockData) => {
        if (block.metaType !== MetaType.ObjectInstance) return "error";
        return `${block.properties.variant} ${block.properties.value}`;
      }
    }
  }
}

function binary_factory(name: string, icon: IconName, color: string, label1: string, label2: string, accepts1: string[], accepts2: string[]): TypeSpec {
  return {
    name,
    primitiveType: PrimitiveType.Object,
    description: ``,
    instanceBlock: {
      minified: true,
      onCanvas: false,
      color,
      icon,
      extras: [
        {
          type: ExtraType.Dropdown,
          label: "More",
          contents: [
            ExtraType.SelectionToggle,
            ExtraType.DeleteButton,
            ExtraType.DocToggle,
          ],
        },
      ],
    },
    referenceBlock: {
      minified: true,
      onCanvas: false,
      color,
      icon,
      extras: []
    },
    properties: {
      value1: {
        id: "value1",
        name: label1,
        type: PropertyType.Block,
        accepts: accepts1,
        default: null,
        isList: false,
        fullWidth: true
      },
      value2: {
        id: "value2",
        name: {
          id: "variant",
          name: label2,
          type: PropertyType.Options,
          options: [{value:'and',label:'And'},{value:'or',label:'Or'}],
          default: 'and',
        },
        type: PropertyType.Block,
        accepts: accepts2,
        default: null,
        isList: false
      }
    },
    parsers: {
      "dsl": (props: ParserProps) => {
        if (props.block.metaType !== MetaType.ObjectInstance) return "error";
        return `${props.block.properties.variant} ${props.storeParser("dsl", props.block.properties.value, props.depth, props.context)}`;
      }
    },
    namePolicy: {
      "dsl": (block: BlockData) => {
        if (block.metaType !== MetaType.ObjectInstance) return "error";
        return `${block.properties.variant} ${block.properties.value}`;
      }
    }
  }
}

function is_factory(name: string, icon: IconName, color: string, label1: string, accepts: string[]): TypeSpec {
  return {
    name,
    primitiveType: PrimitiveType.Object,
    description: ``,
    instanceBlock: {
      minified: true,
      onCanvas: false,
      color,
      icon,
      extras: [
        {
          type: ExtraType.Dropdown,
          label: "More",
          contents: [
            ExtraType.SelectionToggle,
            ExtraType.DeleteButton,
            ExtraType.DocToggle,
          ],
        },
      ],
    },
    referenceBlock: {
      minified: true,
      onCanvas: false,
      color,
      icon,
      extras: []
    },
    properties: {
      value1: {
        id: "value1",
        name: label1,
        type: PropertyType.Block,
        accepts,
        default: null,
        isList: false,
        fullWidth: true
      },
      value2: {
        id: "value2",
        name: `Is`,
        type: PropertyType.Block,
        accepts: [CONSTANT_TYPE],
        default: null,
        isList: false
      }
    },
    parsers: {
      "dsl": (props: ParserProps) => {
        if (props.block.metaType !== MetaType.ObjectInstance) return "error";
        return `${props.storeParser("dsl", props.block.properties.value1, props.depth, props.context)} is ${props.storeParser("dsl", props.block.properties.value2, props.depth, props.context)}`;
      }
    },
    namePolicy: {
      "dsl": (block: BlockData) => {
        if (block.metaType !== MetaType.ObjectInstance) return "error";
        return ``;
      }
    }
  }
}

const RULE_COLOR = "#fe9979";
const ACTION_COLOR = "#746af9";
const STATE_COLOR = "#af6cf6";
const EVENT_COLOR = "#e56ae7";
const CONSTANT_COLOR = "#3f3f3f";

const LIGHT_ACTION = lighten(ACTION_COLOR, 0.25);
const LIGHT_STATE = lighten(STATE_COLOR, 0.25);
const LIGHT_EVENT = lighten(EVENT_COLOR, 0.25);

const CONSTANTBLOCK: TypeSpec = nameonly_factory("Constant", "AdjustRounded", CONSTANT_COLOR);
const STATEBLOCK: TypeSpec = nameonly_factory("State", "PublicRounded", STATE_COLOR);
const EVENTBLOCK: TypeSpec = nameonly_factory("Event", "AccessTimeRounded", EVENT_COLOR);
const ACTIONBLOCK: TypeSpec = nameonly_factory("Action", "PlayCircleOutlineRounded", ACTION_COLOR);

const EVENTUNARYBLOCK: TypeSpec = unary_factory(
  "Unary Event", 
  "AccessTimeRounded", 
  LIGHT_EVENT, 
  "Event",
  EVENT_EXPRESSIONS
);

const STATEUNARYBLOCK: TypeSpec = unary_factory(
  "Unary State", 
  "PublicRounded", 
  LIGHT_STATE,
  "State", 
  STATE_EXPRESSIONS
);

const EVENTBINARYBLOCK: TypeSpec = binary_factory(
  "Binary Event", 
  "AccessTimeRounded", 
  LIGHT_EVENT, 
  "Event 1",
  "Event 2",
  EVENT_EXPRESSIONS,
  EVENT_EXPRESSIONS
);

const STATEBINARYBLOCK: TypeSpec = binary_factory(
  "Binary State", 
  "PublicRounded", 
  LIGHT_STATE, 
  "State 1",
  "State 2",
  STATE_EXPRESSIONS,
  STATE_EXPRESSIONS
);

const ACTIONREPEATBLOCK: TypeSpec = unary_factory(
  "Repeat Action", 
  "PlayCircleOutlineRounded", 
  LIGHT_ACTION, 
  "Action",
  ACTION_EXPRESSIONS,
  [{value:'repeat',label:'Repeat'}]
);

const ACTIONBINARYBLOCK: TypeSpec = binary_factory(
  "Binary Action", 
  "PlayCircleOutlineRounded", 
  LIGHT_ACTION, 
  "Action 1",
  "Action 2",
  ACTION_EXPRESSIONS,
  ACTION_EXPRESSIONS
);

const EVENTISBLOCK: TypeSpec = is_factory(
  "Event Is", 
  "AccessTimeRounded", 
  LIGHT_EVENT, 
  "Event",
  EVENT_EXPRESSIONS
);

const STATEISBLOCK: TypeSpec = is_factory(
  "State Is", 
  "PublicRounded", 
  LIGHT_STATE, 
  "State",
  STATE_EXPRESSIONS
);

const WHENBLOCK: TypeSpec = {
  name: "When Rule",
  primitiveType: PrimitiveType.Object,
  description: ``,
  instanceBlock: {
    onCanvas: true,
    color: RULE_COLOR,
    icon: "PlaylistAddCircleRounded",
    extras: [
      {
        type: ExtraType.Dropdown,
        label: "More",
        contents: [
          ExtraType.CollapseToggle,
          ExtraType.SelectionToggle,
          ExtraType.DeleteButton,
          ExtraType.DocToggle,
        ],
      },
    ],
  },
  referenceBlock: {
    onCanvas: false,
    color: RULE_COLOR,
    icon: "PlaylistAddCircleRounded",
    extras: []
  },
  properties: {
    eventExpression: {
      id: "eventExpression",
      name: {
        id: "listenFor",
        name:'Event',
        type:PropertyType.Options,
        options: [{value:'first',label:'First'},{value:'all',label:'All'}],
        default: 'first'
      },
      type: PropertyType.Block,
      accepts: EVENT_EXPRESSIONS,
      default: null,
      isList: false,
      fullWidth: false
    },
    actionExpression: {
      id: "actionExpression",
      name: 'Do',
      type: PropertyType.Block,
      accepts: ACTION_EXPRESSIONS,
      default: null,
      isList: false,
      fullWidth: true
    }
  },
  parsers: {
    "dsl": (props: ParserProps) => {
      if (props.block.metaType !== MetaType.ObjectInstance) return "error";
      return `${props.storeParser("dsl", props.block.properties.listenFor, props.depth, props.context)} ${props.storeParser("dsl", props.block.properties.eventExpression, 0, props.context)} ${props.storeParser("dsl", props.block.properties.actionExpression, 0, props.context)}`;
    }
  },
  namePolicy: {
    "dsl": (block: BlockData) => {
      if (block.metaType !== MetaType.ObjectInstance) return "error";
      return ``;
    }
  }
}

export const triggerTypes: { [key: string]: TypeSpec } = {
  [CONSTANT_TYPE]: CONSTANTBLOCK,
  [EVENT]: EVENTBLOCK,
  [STATE]: STATEBLOCK,
  [ACTION]: ACTIONBLOCK,
  [EVENT_UNARY]: EVENTUNARYBLOCK,
  [STATE_UNARY]: STATEUNARYBLOCK,
  [ACTION_REPEAT]: ACTIONREPEATBLOCK,
  [EVENT_BINARY]: EVENTBINARYBLOCK,
  [STATE_BINARY]: STATEBINARYBLOCK,
  [ACTION_BINARY]: ACTIONBINARYBLOCK,
  [EVENT_IS]: EVENTISBLOCK,
  [STATE_IS]: STATEISBLOCK,
  [WHEN]: WHENBLOCK
};
