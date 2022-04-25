# Simple-VP
*A highly customizable visual programming environment for React*

Try out examples in the [Storybook](https://wisc-hci.github.io/simple-vp/)

## Usage

### Environment
The main entry for the editor is the `Environment` component:

```javascript
<Environment
    drawerWidth={235} // Number, defaults to 235, width of the drawers when expanded
    height={300} // Number or string, height of the component
    width={400} // Number or string, width of the component
    store={useStore} // A zustand store. Not supplying a store uses the internal store.
    highlightColor='#d604f2' // Highlight color, used for button, input, and block highlighting
/>
```

The environment uses a [Zustand](https://github.com/pmndrs/zustand) store to contian the data. This is where you will specify what the drawers, types, and entries are. If you compose your store with slices, you can use the existing store as a starting point by importing the `Programming Slice` from the library:

```javascript
import {ProgrammingSlice} from 'simple-vp';
import produce from "immer";
import create from 'zustand';

// Not defined here, but generates a middleware for immer
const immer = (config)=>(set,get,api)=> config({...}) 

const wholeStore = (get,set) => ({
    ...SomeOtherSlice,
    ...ProgrammingSlice
})

export const useStore = create(immer(wholeStore))
```
### Constants

A number of useful constants are exported as enums. They are as follows:

*TYPES*: Either `FUNCTION` or `OBJECT`. These are the main types that your defined types can inherit from.

*DATA_TYPES*: The type of data that is encoded by a given data entry. For example, for a given type that has been defined by the user, you can have an `INSTANCE` or `ARGUMENT` of that type, or `REFERENCE` or a reference to either of the others. `INSTANCES` behave similarly, except that `REFERENCE` doesn't appear in the drawer, and can only be instantiated from a function. For things that inherit from `TYPES.FUNCTION`, you can either have a `DATA_TYPE` of `INSTANCE` or `CALL`. 

*SIMPLE_PROPERTY_TYPES*: A number of simple properties that can be specified as fields in a user-defined type (as opposed to another block argument). These include `BOOLEAN` (true/false), `NUMBER` (numerical value), `STRING` (text), `OPTIONS` (one-of-multiple), or `IGNORED` (not visible, useful if you have non-rendered data you are tracking).

*EXTRA_TYPES* A large number of options for what buttons and behaviors can be engaged from the "Extra Bar" at the top-right of each block. These are as follows:

| Enum Value            | Notes/Description                                | Usage |
|-----------------------|--------------------------------------------------|-------|
| `LOCKED_INDICATOR`    | Shows if the block data `canEdit` is false       | `EXTRA_TYPES.LOCKED_INDICATOR` |
| `NAME_EDIT_TOGGLE`    | Allows the user to edit the name of the instance | `EXTRA_TYPES.NAME_EDIT_TOGGLE` |
| `SELECTION_TOGGLE`    | Allows the user to select/deselect the block     | `EXTRA_TYPES.SELECTION_TOGGLE` |
| `COLLAPSE_TOGGLE`     | Allows the user to collapse/expand the block     | `EXTRA_TYPES.COLLAPSE_TOGGLE` |
| `FUNCTION_BUTTON`     | Allows the user to execute a function in the store from the block | `{type: EXTRA_TYPES.FUNCTION_BUTTON, onClick: 'updateItemBlockColors', label: 'Cycle Color', icon: FiFeather}` |
| `INDICATOR_TEXT`      | Pipe simple information into a pill | `{type: EXTRA_TYPES.INDICATOR_TEXT, accessor: (data)=>data.properties.children.length, label: 'Size' }` |
| `INDICATOR_ICON`      | Pipe icon into block | `{type: EXTRA_TYPES.INDICATOR_ICON, accessor: (data)=>data.properties.children.length, label: 'Size' }` |
| `DROPDOWN`            | Creates a dropdown with nested extras inside (can be nested in other dropdowns) | `{ icon: FiMoreHorizontal, label: 'More Options', type: EXTRA_TYPES.DROPDOWN, contents: [ EXTRA_TYPES.NAME_EDIT_TOGGLE, EXTRA_TYPES.COLLAPSE_TOGGLE ] }` |
| `DELETE_BUTTON`       | Allows the user to delete the block or instance | `EXTRA_TYPES.DELETE_BUTTON` |
| `ADD_ARGUMENT`        | Allows the user add an argument to a function definition | `{type: EXTRA_TYPES.ADD_ARGUMENT, argumentType: 'hatType'}` |
| `ADD_ARGUMENT_GROUP`  | A macro for specifying arguments that can be added to a function definition | `{type: EXTRA_TYPES.ADD_ARGUMENT_GROUP, allowed: ['hatType','bootType']}` |
| `DEBUG_TOGGLE`        | Shows the data for a given block, useful in debugging | `EXTRA_TYPES.DEBUG_TOGGLE` |

### Store Data

The structure of the data in the store is as follows:

```javascript
const initialStoreData = {
    activeDrawer: null,
    programSpec: {
        drawers: [],
        objectTypes: {}
    },
    programData: {},
    /* 
        There are also functions which support modifying the store data that are needed.
        See the default store for more details if looking to replicate the behavior.
    */
}
```

Drawers are specified as entries in the `drawers` field. They have the following structure:

_Instance Drawers_
Show a set of instances. When one of these is dragged from the drawer into the canvas and placed, a new item is spawned in the programData of the store.

```javascript
const instanceDrawer = { 
    title: "Structures", 
    dataType: DATA_TYPES.INSTANCE, 
    objectTypes: ["functionType", "operationType", "blockType"], 
    icon: FiClipboard 
}
```

_Function Call Drawers_
Show a set of calls to available functions. The current set of entries that belong to that function type will automatically populate the drawer. Note, you can actually define multiple different function sub-types, and thereby have different acceptance logic based on that, and show them in separate drawers.

```javascript
const functionCallDrawer = { 
    title: "Functions", 
    dataType: DATA_TYPES.CALL, 
    objectType: 'functionType', 
    icon: FiLogOut }
```

_Reference Drawers_
Show a set of references that can be dragged into the canvas. These are populated based on the entries in the programData of the store that are an instance of the specified `objectType`. Thus, for every entry of dataType:`DATA_TYPE.INSTANCE`, a spawnable entry of the same type but of dataType:`DATA_TYPE.REFERENCE` is created in the drawer.

```javascript
const functionDrawer = { 
    title: "Hats", 
    dataType: DATA_TYPES.REFERENCE, 
    objectType: 'hatType', 
    icon: FiGrid }
```

### Object Type Specification

The main fields of each objectType are as follows: 

| Field | Notes |
|-------|-------|
|`name`   | The human-readable name of that type (e.g. "Hat") |
|`type`   | The parent type (`TYPE.OBJECT` or `TYPE.FUNCTION`) |
|`properties`| Where you define the properties that this objectType can take |
|`instanceBlock`| The specification section for how an instance of this type is shown. For `OBJECT` types, this is the instance, and for `FUNCTION` types this specifies the appearance of function body |
|`referenceBlock`| Relevant only for `OBJECT` types, how references to an instance are rendered |
|`callBlock`| Relevant only for `FUNCTION` types, how calls to a function are rendered |

#### Properties

An example set of properties for an `OBJECT`-based type is as follows:

```javascript
const properties = {
    /* A field called 'Hat' that stores a value in 
    each instance's `properties.hat` field. It accepts 
    blocks of `hatType` and is by default null.
     */
    hat: {
        name: "Hat",
        accepts: ["hatType"],
        default: null,
        isList: false
    },
    /* A field called 'Boot' that stores a value in 
    each instance's `properties.boot` field. It accepts 
    blocks of `bootType` and is by default null.
     */
    boot: {
        name: "Boot",
        accepts: ["bootType"],
        default: null,
        isList: false
    },
    /* A list-based set of block values called 'Children'
    that stores its values in each instance's `properties.children`
    field. It accepts types of `functionType`, `blockType`, 
    and `operationType` and defaults to an empty list. 
    It takes up the full width of the block.
     */
    children: {
        name: 'Children',
        accepts: ['functionType', 'blockType', 'operationType'],
        default: [],
        isList: true,
        fullWidth: true
    }
    /* A field called 'Speed' that stores a numerical 
    value in each instance's `properties.speed` field. 
    It must be between 0 and 2, and is by default 1.
     */
    speed: {
        name: "Speed",
        type: SIMPLE_PROPERTY_TYPES.NUMBER,
        default: 1,
        min: 0,
        max: 2
    },
    /* A field called 'Do Funky' that stores a boolean 
    value in each instance's `properties.doFunky` field. 
    It is by default false.
     */
    doFunky: {
        name: "Do Funky",
        type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
        default: false
    },
    /* A field called 'Greeting' that stores a text 
    value in each instance's `properties.greeting` field. 
    It is by default the empty string ''.
     */
    greeting: {
        name: "Greeting",
        type: SIMPLE_PROPERTY_TYPES.STRING,
        default: ''
    },
    /* A field called 'Time' that stores a text 
    value in each instance's `properties.time` field. 
    It must be either 'am' or 'pm' and default is 'am'.
     */
    time: {
        name: "Time",
        type: SIMPLE_PROPERTY_TYPES.OPTIONS,
        options: [{value:'am',label:'AM'},{value:'pm',label:'PM'}],
        default: 'am'
    },
    /* A hidden field called 'Description' that stores 
    some value in each instance's `properties.description` 
    field. It defaults to the value specified.
     */
    description: {
        name: "Description",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: 'Some description text'
    }
}
```

#### Instance Block Specification

```javascript
const instanceBlock = {
    /* This block is tied to the canvas
    and cannot be dragged into other blocks.
    */
    onCanvas: true,
    /* The color of the block */
    color: "#62869e",
    /* The icon shown in the top-left */
    icon: FiLogOut,
    /* Extras shown in the top-right */
    extras: [
        /* Show a locked icon if you can't edit */
        EXTRA_TYPES.LOCKED_INDICATOR,
        /* Show a dropdown for the rest */
        {
            type: EXTRA_TYPES.DROPDOWN,
            icon: FiMoreHorizontal,
            contents: [
                EXTRA_TYPES.SELECTION_TOGGLE,
                EXTRA_TYPES.NAME_EDIT_TOGGLE,
                EXTRA_TYPES.DELETE_BUTTON
            ]
        }
    ]
    /* In the drawer, whether to prevent automatically 
    pre-pending "New" in front of each instance that 
    can be dragged in.
    */
    hideNewPrefix: true
}
```

#### Reference Block Specification

```javascript
const referenceBlock = {
    /* This block is must be dragged
    into another block.
    */
    onCanvas: false,
    /* The color of the block */
    color: "#AD1FDE",
    /* The icon shown in the top-left */
    icon: FiGrid,
    /* Extras shown in the top-right */
    extras: [
        EXTRA_TYPES.LOCKED_INDICATOR,
        {
        type: EXTRA_TYPES.DROPDOWN,
        icon: FiMoreHorizontal,
        contents: [
            /* In the drawer, this deletes the instance */
            EXTRA_TYPES.DELETE_BUTTON,
            /* Renames the corresponding referenced instance */
            EXTRA_TYPES.NAME_EDIT_TOGGLE
        ]
        }
    ]
}
```

#### Call Block Specification

```javascript 
const callBlock = {
    /* This block is must be dragged
    into another block.
    */
    onCanvas: false,
    /* The color of the block */
    color: "#62869e",
    /* The icon shown in the top-left */
    icon: FiLogOut,
    /* Extras shown in the top-right */
    extras:[
        {
            type: EXTRA_TYPES.DROPDOWN,
            icon: FiMoreHorizontal,
            contents:[
                EXTRA_TYPES.DEBUG_TOGGLE
            ]
        }
    ]
},
```

## Contributing

Interested in helping out? Send a pull request or create an issue!