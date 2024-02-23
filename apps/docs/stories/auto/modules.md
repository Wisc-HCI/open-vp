[@people_and_robots/open-core](README.md) / Exports

# @people_and_robots/open-core

## Table of contents

### Enumerations

- [ClipboardAction](enums/ClipboardAction.md)
- [ConnectionDirection](enums/ConnectionDirection.md)
- [ConnectionType](enums/ConnectionType.md)
- [DrawerType](enums/DrawerType.md)
- [ExtraType](enums/ExtraType.md)
- [MetaType](enums/MetaType.md)
- [PrimitiveType](enums/PrimitiveType.md)
- [PropertyType](enums/PropertyType.md)

### Classes

- [Timer](classes/Timer.md)

### Interfaces

- [ProgrammingProviderProps](interfaces/ProgrammingProviderProps.md)

### Type Aliases

- [AddArgumentExtra](modules.md#addargumentextra)
- [AddArgumentGroupExtra](modules.md#addargumentgroupextra)
- [ArgumentData](modules.md#argumentdata)
- [BlockData](modules.md#blockdata)
- [BlockFieldInfo](modules.md#blockfieldinfo)
- [BlockSpec](modules.md#blockspec)
- [ClipboardProps](modules.md#clipboardprops)
- [CommentData](modules.md#commentdata)
- [ConnectionData](modules.md#connectiondata)
- [DrawerSpec](modules.md#drawerspec)
- [DropdownExtra](modules.md#dropdownextra)
- [ExecutionState](modules.md#executionstate)
- [Extra](modules.md#extra)
- [FieldInfo](modules.md#fieldinfo)
- [FunctionButtonExtra](modules.md#functionbuttonextra)
- [FunctionCallData](modules.md#functioncalldata)
- [FunctionDeclarationData](modules.md#functiondeclarationdata)
- [FunctionTypeSpec](modules.md#functiontypespec)
- [IndicatorExtra](modules.md#indicatorextra)
- [NumberConnectionData](modules.md#numberconnectiondata)
- [ObjectData](modules.md#objectdata)
- [ObjectDrawerSpec](modules.md#objectdrawerspec)
- [ObjectReferenceData](modules.md#objectreferencedata)
- [ObjectTypeSpec](modules.md#objecttypespec)
- [ParserProps](modules.md#parserprops)
- [ProgramSpec](modules.md#programspec)
- [ProgrammingState](modules.md#programmingstate)
- [ProgrammingStateActions](modules.md#programmingstateactions)
- [ProgrammingStateStructures](modules.md#programmingstatestructures)
- [ProgrammingStore](modules.md#programmingstore)
- [ReferenceDrawerSpec](modules.md#referencedrawerspec)
- [RegionInfo](modules.md#regioninfo)
- [SimpleBooleanFieldInfo](modules.md#simplebooleanfieldinfo)
- [SimpleFieldInfo](modules.md#simplefieldinfo)
- [SimpleMetadataFieldInfo](modules.md#simplemetadatafieldinfo)
- [SimpleNumberFieldInfo](modules.md#simplenumberfieldinfo)
- [SimpleOptionsFieldInfo](modules.md#simpleoptionsfieldinfo)
- [SimpleStringFieldInfo](modules.md#simplestringfieldinfo)
- [SimpleVector3FieldInfo](modules.md#simplevector3fieldinfo)
- [StringConnectionData](modules.md#stringconnectiondata)
- [Tab](modules.md#tab)
- [TypeSpec](modules.md#typespec)

### Variables

- [CANVAS](modules.md#canvas)
- [OUTSIDE](modules.md#outside)
- [ProgrammingContext](modules.md#programmingcontext)
- [SPAWNER](modules.md#spawner)

### Functions

- [ProgrammingProvider](modules.md#programmingprovider)
- [combinedBlockData](modules.md#combinedblockdata)
- [createProgrammingStore](modules.md#createprogrammingstore)
- [functionInstanceAsType](modules.md#functioninstanceastype)
- [generateId](modules.md#generateid)
- [instanceTemplateFromSpec](modules.md#instancetemplatefromspec)
- [referenceTemplateFromSpec](modules.md#referencetemplatefromspec)
- [useProgrammingStore](modules.md#useprogrammingstore)

## Type Aliases

### AddArgumentExtra

Ƭ **AddArgumentExtra**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `argumentType` | `string` |
| `icon` | `IconName` \| (`block`: [`BlockData`](modules.md#blockdata)) => `IconName` |
| `label` | `string` |
| `type` | [`AddArgument`](enums/ExtraType.md#addargument) |

#### Defined in

[types.ts:22](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L22)

___

### AddArgumentGroupExtra

Ƭ **AddArgumentGroupExtra**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allowed` | `string`[] |
| `icon` | `IconName` \| (`block`: [`BlockData`](modules.md#blockdata)) => `IconName` |
| `label` | `string` |
| `type` | [`AddArgumentGroup`](enums/ExtraType.md#addargumentgroup) |

#### Defined in

[types.ts:29](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L29)

___

### ArgumentData

Ƭ **ArgumentData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canDelete` | `boolean` |
| `canEdit` | `boolean` |
| `docActive` | `boolean` |
| `editing` | `boolean` |
| `id` | `string` |
| `metaType` | [`Argument`](enums/MetaType.md#argument) |
| `name` | `string` |
| `selected` | `boolean` |
| `type` | `string` |

#### Defined in

[types.ts:107](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L107)

___

### BlockData

Ƭ **BlockData**: [`ObjectData`](modules.md#objectdata) \| [`FunctionDeclarationData`](modules.md#functiondeclarationdata) \| [`FunctionCallData`](modules.md#functioncalldata) \| [`ObjectReferenceData`](modules.md#objectreferencedata) \| [`ArgumentData`](modules.md#argumentdata)

#### Defined in

[types.ts:150](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L150)

___

### BlockFieldInfo

Ƭ **BlockFieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accepts` | `string`[] |
| `default` | `any` |
| `fullWidth?` | `boolean` |
| `id` | `string` |
| `isFunctionArgument?` | `boolean` |
| `isList?` | `boolean` |
| `isRequired?` | `boolean` |
| `name` | `string` \| [`SimpleOptionsFieldInfo`](modules.md#simpleoptionsfieldinfo) |
| `type` | [`Block`](enums/PropertyType.md#block) |

#### Defined in

[types.ts:260](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L260)

___

### BlockSpec

Ƭ **BlockSpec**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `color` | `string` |
| `connections?` | \{ [key in Position]?: Object } |
| `extras` | [`Extra`](modules.md#extra)[] |
| `hideNewPrefix?` | `boolean` |
| `icon` | `IconName` |
| `minified?` | `boolean` |
| `onCanvas` | `boolean` |
| `style?` | `CSSProperties` |

#### Defined in

[types.ts:157](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L157)

___

### ClipboardProps

Ƭ **ClipboardProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `context?` | `string`[] |
| `coordinates?` | \{ `x`: `number` ; `y`: `number`  } |
| `coordinates.x` | `number` |
| `coordinates.y` | `number` |
| `data?` | [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata) |
| `regionInfo?` | [`RegionInfo`](modules.md#regioninfo) |
| `tab?` | `string` |
| `typeSpec?` | [`TypeSpec`](modules.md#typespec) |

#### Defined in

[types.ts:61](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L61)

___

### CommentData

Ƭ **CommentData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editing` | `boolean` |
| `id` | `string` |
| `metaType` | [`Comment`](enums/MetaType.md#comment) |
| `text` | `string` |
| `type` | [`Comment`](enums/MetaType.md#comment) |

#### Defined in

[types.ts:70](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L70)

___

### ConnectionData

Ƭ **ConnectionData**: [`NumberConnectionData`](modules.md#numberconnectiondata) \| [`StringConnectionData`](modules.md#stringconnectiondata)

#### Defined in

[types.ts:191](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L191)

___

### DrawerSpec

Ƭ **DrawerSpec**: [`ObjectDrawerSpec`](modules.md#objectdrawerspec) \| [`ReferenceDrawerSpec`](modules.md#referencedrawerspec)

#### Defined in

[types.ts:314](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L314)

___

### DropdownExtra

Ƭ **DropdownExtra**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contents` | [`Extra`](modules.md#extra)[] |
| `icon?` | `IconName` \| (`block`: [`BlockData`](modules.md#blockdata)) => `IconName` |
| `label?` | `string` |
| `type` | [`Dropdown`](enums/ExtraType.md#dropdown) |

#### Defined in

[types.ts:15](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L15)

___

### ExecutionState

Ƭ **ExecutionState**: `number` \| ``"indeterminite"`` \| (`currentTime`: `number`) => `number` \| ``"indeterminite"``

#### Defined in

[types.ts:321](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L321)

___

### Extra

Ƭ **Extra**: [`SelectionToggle`](enums/ExtraType.md#selectiontoggle) \| [`DocToggle`](enums/ExtraType.md#doctoggle) \| [`CollapseToggle`](enums/ExtraType.md#collapsetoggle) \| [`DeleteButton`](enums/ExtraType.md#deletebutton) \| [`CopyButton`](enums/ExtraType.md#copybutton) \| [`CutButton`](enums/ExtraType.md#cutbutton) \| [`Divider`](enums/ExtraType.md#divider) \| [`DebugToggle`](enums/ExtraType.md#debugtoggle) \| [`AddArgumentExtra`](modules.md#addargumentextra) \| [`AddArgumentGroupExtra`](modules.md#addargumentgroupextra) \| [`DropdownExtra`](modules.md#dropdownextra) \| [`FunctionButtonExtra`](modules.md#functionbuttonextra) \| [`IndicatorExtra`](modules.md#indicatorextra)

#### Defined in

[types.ts:46](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L46)

___

### FieldInfo

Ƭ **FieldInfo**: [`BlockFieldInfo`](modules.md#blockfieldinfo) \| [`SimpleFieldInfo`](modules.md#simplefieldinfo)

#### Defined in

[types.ts:272](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L272)

___

### FunctionButtonExtra

Ƭ **FunctionButtonExtra**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `icon` | `IconName` \| (`block`: [`BlockData`](modules.md#blockdata)) => `IconName` |
| `label` | `string` |
| `onClick` | `string` \| (`block`: [`BlockData`](modules.md#blockdata)) => `void` |
| `type` | [`FunctionButton`](enums/ExtraType.md#functionbutton) |

#### Defined in

[types.ts:8](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L8)

___

### FunctionCallData

Ƭ **FunctionCallData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canDelete` | `boolean` |
| `canEdit` | `boolean` |
| `docActive` | `boolean` |
| `editing` | `boolean` |
| `id` | `string` |
| `metaType` | [`FunctionCall`](enums/MetaType.md#functioncall) |
| `name` | `string` |
| `position?` | \{ `x`: `number` ; `y`: `number`  } |
| `position.x` | `number` |
| `position.y` | `number` |
| `properties` | `any` |
| `ref` | `string` |
| `selected` | `boolean` |
| `type` | `string` |

#### Defined in

[types.ts:119](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L119)

___

### FunctionDeclarationData

Ƭ **FunctionDeclarationData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `arguments` | `string`[] |
| `canDelete` | `boolean` |
| `canEdit` | `boolean` |
| `docActive` | `boolean` |
| `editing` | `boolean` |
| `id` | `string` |
| `metaType` | [`FunctionDeclaration`](enums/MetaType.md#functiondeclaration) |
| `name` | `string` |
| `position?` | \{ `x`: `number` ; `y`: `number`  } |
| `position.x` | `number` |
| `position.y` | `number` |
| `properties` | `any` |
| `selected` | `boolean` |
| `type` | `string` |

#### Defined in

[types.ts:135](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L135)

___

### FunctionTypeSpec

Ƭ **FunctionTypeSpec**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `callBlock` | [`BlockSpec`](modules.md#blockspec) |
| `description` | `string` |
| `functionBlock` | [`BlockSpec`](modules.md#blockspec) |
| `name` | `string` |
| `namePolicy` | \{ `[key: string]`: (`data`: [`BlockData`](modules.md#blockdata)) => `string`;  } |
| `parsers` | \{ `[key: string]`: (`props`: [`ParserProps`](modules.md#parserprops)) => `string`;  } |
| `primitiveType` | [`Function`](enums/PrimitiveType.md#function) |
| `properties` | \{ `[key: string]`: [`FieldInfo`](modules.md#fieldinfo);  } |

#### Defined in

[types.ts:285](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L285)

___

### IndicatorExtra

Ƭ **IndicatorExtra**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `icon` | ``null`` \| `undefined` \| `IconName` \| (`block`: [`BlockData`](modules.md#blockdata)) => `IconName` |
| `label` | `string` \| `React.ReactNode` \| (`block`: [`BlockData`](modules.md#blockdata)) => `React.ReactNode` |
| `type` | [`Indicator`](enums/ExtraType.md#indicator) |

#### Defined in

[types.ts:36](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L36)

___

### NumberConnectionData

Ƭ **NumberConnectionData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `child` | \{ `handle`: `Position` ; `id`: `string`  } |
| `child.handle` | `Position` |
| `child.id` | `string` |
| `id` | `string` |
| `metaType` | [`Connection`](enums/MetaType.md#connection) |
| `parent` | \{ `handle`: `Position` ; `id`: `string`  } |
| `parent.handle` | `Position` |
| `parent.id` | `string` |
| `type` | [`Number`](enums/ConnectionType.md#number) |
| `value` | `number` |

#### Defined in

[types.ts:173](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L173)

___

### ObjectData

Ƭ **ObjectData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canDelete` | `boolean` |
| `canEdit` | `boolean` |
| `docActive` | `boolean` |
| `editing` | `boolean` |
| `id` | `string` |
| `metaType` | [`ObjectInstance`](enums/MetaType.md#objectinstance) |
| `name` | `string` |
| `position?` | \{ `x`: `number` ; `y`: `number`  } |
| `position.x` | `number` |
| `position.y` | `number` |
| `properties` | `any` |
| `selected` | `boolean` |
| `type` | `string` |

#### Defined in

[types.ts:78](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L78)

___

### ObjectDrawerSpec

Ƭ **ObjectDrawerSpec**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `icon` | `IconName` |
| `metaType` | [`ObjectInstance`](enums/MetaType.md#objectinstance) \| [`FunctionDeclaration`](enums/MetaType.md#functiondeclaration) |
| `objectTypes` | `string`[] |
| `title` | `string` |
| `type` | [`Multiple`](enums/DrawerType.md#multiple) |

#### Defined in

[types.ts:298](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L298)

___

### ObjectReferenceData

Ƭ **ObjectReferenceData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canDelete` | `boolean` |
| `canEdit` | `boolean` |
| `docActive` | `boolean` |
| `editing` | `boolean` |
| `id` | `string` |
| `metaType` | [`ObjectReference`](enums/MetaType.md#objectreference) |
| `name` | `string` |
| `position?` | \{ `x`: `number` ; `y`: `number`  } |
| `position.x` | `number` |
| `position.y` | `number` |
| `ref` | `string` |
| `selected` | `boolean` |
| `type` | `string` |

#### Defined in

[types.ts:92](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L92)

___

### ObjectTypeSpec

Ƭ **ObjectTypeSpec**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `instanceBlock` | [`BlockSpec`](modules.md#blockspec) |
| `name` | `string` |
| `namePolicy` | \{ `[key: string]`: (`data`: [`BlockData`](modules.md#blockdata)) => `string`;  } |
| `parsers` | \{ `[key: string]`: (`props`: [`ParserProps`](modules.md#parserprops)) => `string`;  } |
| `primitiveType` | [`Object`](enums/PrimitiveType.md#object) |
| `properties` | \{ `[key: string]`: [`FieldInfo`](modules.md#fieldinfo);  } |
| `referenceBlock` | [`BlockSpec`](modules.md#blockspec) |

#### Defined in

[types.ts:274](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L274)

___

### ParserProps

Ƭ **ParserProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block` | [`BlockData`](modules.md#blockdata) |
| `context` | \{ `[key: string]`: [`BlockData`](modules.md#blockdata);  } |
| `depth` | `number` |
| `name` | `string` |
| `storeParser` | (`language`: `string`, `nodeId`: `undefined` \| `string`, `depth`: `number`, `context`: \{ `[key: string]`: [`BlockData`](modules.md#blockdata);  }) => `string` |

#### Defined in

[types.ts:193](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L193)

___

### ProgramSpec

Ƭ **ProgramSpec**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `drawers` | [`DrawerSpec`](modules.md#drawerspec)[] |
| `objectTypes` | \{ `[key: string]`: [`TypeSpec`](modules.md#typespec);  } |

#### Defined in

[types.ts:316](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L316)

___

### ProgrammingState

Ƭ **ProgrammingState**: [`ProgrammingStateStructures`](modules.md#programmingstatestructures) & [`ProgrammingStateActions`](modules.md#programmingstateactions)

#### Defined in

[types.ts:421](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L421)

___

### ProgrammingStateActions

Ƭ **ProgrammingStateActions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addArgument` | (`parentFunctionId`: `string`, `argumentType`: `string`) => `void` |
| `addInstance` | (`instanceType`: `string`) => `void` |
| `addTab` | (`id`: `string`, `title`: `string`, `visible`: `boolean`) => `void` |
| `copy` | (`clipboardProps`: [`ClipboardProps`](modules.md#clipboardprops)) => `void` |
| `createEdge` | (`source`: `string`, `sourceHandle`: `Position`, `target`: `string`, `targetHandle`: `Position`) => `void` |
| `createPlacedBlock` | (`data`: [`BlockData`](modules.md#blockdata), `x`: `number`, `y`: `number`) => `void` |
| `cut` | (`clipboardProps`: [`ClipboardProps`](modules.md#clipboardprops)) => `void` |
| `deleteBlock` | (`data`: [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata), `parentId`: `string`, `fieldInfo`: [`FieldInfo`](modules.md#fieldinfo)) => `void` |
| `deleteEdge` | (`id`: `string`) => `void` |
| `getTabViewport` | (`id`: `string`) => `Viewport` \| `undefined` |
| `moveBlocks` | (`changes`: `NodeChange`[]) => `void` |
| `onOffVPEClick` | (`entryInfo`: `any`) => `void` |
| `onVPEClick` | (`entryInfo`: [`BlockData`](modules.md#blockdata) \| [`ConnectionData`](modules.md#connectiondata) \| [`CommentData`](modules.md#commentdata)) => `void` |
| `parse` | (`language`: `string`, `nodeId?`: `string`, `depth?`: `number`, `context?`: \{ `[key: string]`: [`BlockData`](modules.md#blockdata);  }) => `string` |
| `paste` | (`clipboardProps`: [`ClipboardProps`](modules.md#clipboardprops)) => `void` |
| `pause` | () => `void` |
| `play` | (`speed`: `number`) => `void` |
| `removeTab` | (`id`: `string`) => `void` |
| `renameTab` | (`id`: `string`, `name`: `string`) => `void` |
| `reset` | (`time`: `number`) => `void` |
| `setActiveDoc` | (`id`: `string`, `value`: `boolean`) => `void` |
| `setActiveDrawer` | (`activeDrawer`: `string` \| ``null``) => `void` |
| `setActiveTab` | (`tab`: [`Tab`](modules.md#tab)) => `void` |
| `setClipboardBlock` | (`block`: [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata)) => `void` |
| `setConnectionInfo` | (`info`: `OnConnectStartParams` \| ``null``) => `void` |
| `setSelections` | (`selections`: `string`[]) => `void` |
| `setTabViewport` | (`id`: `string`, `viewport`: `Viewport`) => `void` |
| `setTabVisibility` | (`id`: `string`, `visible`: `boolean`) => `void` |
| `setTabs` | (`newTabs`: [`Tab`](modules.md#tab)[]) => `void` |
| `toggleEdgeMode` | (`id`: `string`) => `void` |
| `transferBlock` | (`data`: [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata), `sourceInfo`: [`RegionInfo`](modules.md#regioninfo), `destInfo`: [`RegionInfo`](modules.md#regioninfo)) => `void` |
| `updateCommentText` | (`id`: `string`, `value`: `string`) => `void` |
| `updateEdgeValue` | (`id`: `string`, `value`: `string`) => `void` |
| `updateItemEditing` | (`id`: `string`, `value`: `boolean`) => `void` |
| `updateItemName` | (`id`: `string`, `value`: `string`) => `void` |
| `updateItemSelected` | (`id`: `string`, `value`: `boolean`) => `void` |
| `updateItemSimpleProperty` | (`id`: `string`, `property`: `string`, `value`: `any`) => `void` |
| `validateEdge` | (`source`: `string`, `sourceHandle`: `Position`, `target`: `string`, `targetHandle`: `Position`) => `boolean` |

#### Defined in

[types.ts:357](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L357)

___

### ProgrammingStateStructures

Ƭ **ProgrammingStateStructures**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `activeDoc` | `string` \| ``null`` |
| `activeDrawer` | `string` \| ``null`` |
| `activeTab` | `string` \| ``null`` |
| `clipboard` | \{ `action?`: [`ClipboardAction`](enums/ClipboardAction.md) ; `block?`: [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata) ; `context?`: `string`[] ; `onCanvas?`: `boolean` ; `regionInfo?`: [`RegionInfo`](modules.md#regioninfo)  } |
| `clipboard.action?` | [`ClipboardAction`](enums/ClipboardAction.md) |
| `clipboard.block?` | [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata) |
| `clipboard.context?` | `string`[] |
| `clipboard.onCanvas?` | `boolean` |
| `clipboard.regionInfo?` | [`RegionInfo`](modules.md#regioninfo) |
| `clock` | [`Timer`](classes/Timer.md) |
| `connectionInfo` | `OnConnectStartParams` \| ``null`` |
| `executionData` | \{ `[key: string]`: [`ExecutionState`](modules.md#executionstate);  } |
| `featuredDocs` | \{ `[key: string]`: `string`;  } |
| `programData` | \{ `[key: string]`: [`BlockData`](modules.md#blockdata) \| [`ConnectionData`](modules.md#connectiondata) \| [`CommentData`](modules.md#commentdata);  } |
| `programSpec` | [`ProgramSpec`](modules.md#programspec) |
| `tabs` | [`Tab`](modules.md#tab)[] |

#### Defined in

[types.ts:337](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L337)

___

### ProgrammingStore

Ƭ **ProgrammingStore**: typeof `DefaultStore`

#### Defined in

[types.ts:424](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L424)

___

### ReferenceDrawerSpec

Ƭ **ReferenceDrawerSpec**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `icon` | `IconName` |
| `metaType` | [`ObjectReference`](enums/MetaType.md#objectreference) \| [`FunctionCall`](enums/MetaType.md#functioncall) |
| `objectType` | `string` |
| `title` | `string` |
| `type` | [`Singular`](enums/DrawerType.md#singular) |

#### Defined in

[types.ts:306](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L306)

___

### RegionInfo

Ƭ **RegionInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fieldInfo` | [`FieldInfo`](modules.md#fieldinfo) |
| `idx?` | `number` |
| `parentId` | `string` |

#### Defined in

[types.ts:331](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L331)

___

### SimpleBooleanFieldInfo

Ƭ **SimpleBooleanFieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `boolean` |
| `id` | `string` |
| `name` | `string` |
| `type` | [`Boolean`](enums/PropertyType.md#boolean) |

#### Defined in

[types.ts:205](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L205)

___

### SimpleFieldInfo

Ƭ **SimpleFieldInfo**: [`SimpleBooleanFieldInfo`](modules.md#simplebooleanfieldinfo) \| [`SimpleNumberFieldInfo`](modules.md#simplenumberfieldinfo) \| [`SimpleStringFieldInfo`](modules.md#simplestringfieldinfo) \| [`SimpleOptionsFieldInfo`](modules.md#simpleoptionsfieldinfo) \| [`SimpleMetadataFieldInfo`](modules.md#simplemetadatafieldinfo) \| [`SimpleVector3FieldInfo`](modules.md#simplevector3fieldinfo)

#### Defined in

[types.ts:252](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L252)

___

### SimpleMetadataFieldInfo

Ƭ **SimpleMetadataFieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `any` |
| `id` | `string` |
| `name` | `string` |
| `type` | [`Metadata`](enums/PropertyType.md#metadata) |

#### Defined in

[types.ts:238](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L238)

___

### SimpleNumberFieldInfo

Ƭ **SimpleNumberFieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `number` |
| `id` | `string` |
| `max?` | `number` |
| `min?` | `number` |
| `name` | `string` |
| `step?` | `number` |
| `type` | [`Number`](enums/PropertyType.md#number) |
| `units?` | `string` |

#### Defined in

[types.ts:212](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L212)

___

### SimpleOptionsFieldInfo

Ƭ **SimpleOptionsFieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `string` |
| `id` | `string` |
| `name` | `string` |
| `options` | \{ `label`: `string` ; `value`: `string`  }[] |
| `type` | [`Options`](enums/PropertyType.md#options) |

#### Defined in

[types.ts:230](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L230)

___

### SimpleStringFieldInfo

Ƭ **SimpleStringFieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `string` |
| `id` | `string` |
| `name` | `string` |
| `type` | [`String`](enums/PropertyType.md#string) |

#### Defined in

[types.ts:223](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L223)

___

### SimpleVector3FieldInfo

Ƭ **SimpleVector3FieldInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `number`[] |
| `id` | `string` |
| `name` | `string` |
| `type` | [`Vector3`](enums/PropertyType.md#vector3) |

#### Defined in

[types.ts:245](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L245)

___

### StringConnectionData

Ƭ **StringConnectionData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `child` | \{ `handle`: `Position` ; `id`: `string`  } |
| `child.handle` | `Position` |
| `child.id` | `string` |
| `id` | `string` |
| `metaType` | [`Connection`](enums/MetaType.md#connection) |
| `parent` | \{ `handle`: `Position` ; `id`: `string`  } |
| `parent.handle` | `Position` |
| `parent.id` | `string` |
| `type` | [`String`](enums/ConnectionType.md#string) |
| `value` | `string` |

#### Defined in

[types.ts:182](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L182)

___

### Tab

Ƭ **Tab**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blocks` | `string`[] |
| `id` | `string` |
| `title` | `string` |
| `viewport?` | `Viewport` |
| `visible` | `boolean` |

#### Defined in

[types.ts:323](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L323)

___

### TypeSpec

Ƭ **TypeSpec**: [`ObjectTypeSpec`](modules.md#objecttypespec) \| [`FunctionTypeSpec`](modules.md#functiontypespec)

#### Defined in

[types.ts:296](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/types.ts#L296)

## Variables

### CANVAS

• `Const` **CANVAS**: ``"CANVAS"``

#### Defined in

[constants.ts:2](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/constants.ts#L2)

___

### OUTSIDE

• `Const` **OUTSIDE**: ``"OUTSIDE"``

#### Defined in

[constants.ts:3](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/constants.ts#L3)

___

### ProgrammingContext

• `Const` **ProgrammingContext**: `Context`\<``null`` \| `UseBoundStore`\<`Write`\<`StoreApi`\<[`ProgrammingState`](modules.md#programmingstate)\>, `StoreSubscribeWithSelector`\<[`ProgrammingState`](modules.md#programmingstate)\>\>\>\>

#### Defined in

[context.tsx:6](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/context.tsx#L6)

___

### SPAWNER

• `Const` **SPAWNER**: ``"SPAWNER"``

#### Defined in

[constants.ts:1](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/constants.ts#L1)

## Functions

### ProgrammingProvider

▸ **ProgrammingProvider**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ProgrammingProviderProps`](interfaces/ProgrammingProviderProps.md) |

#### Returns

`Element`

#### Defined in

[context.tsx:19](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/context.tsx#L19)

___

### combinedBlockData

▸ **combinedBlockData**(`programData`, `executionData`, `objectTypes`, `info`): [``null`` \| [`BlockData`](modules.md#blockdata) \| [`ConnectionData`](modules.md#connectiondata) \| [`CommentData`](modules.md#commentdata), ``null`` \| [`TypeSpec`](modules.md#typespec), ``null`` \| [`ExecutionState`](modules.md#executionstate), ``null`` \| [`BlockData`](modules.md#blockdata)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `programData` | `Object` |
| `executionData` | `Object` |
| `objectTypes` | `Object` |
| `info` | `string` \| [`BlockData`](modules.md#blockdata) \| [`CommentData`](modules.md#commentdata) |

#### Returns

[``null`` \| [`BlockData`](modules.md#blockdata) \| [`ConnectionData`](modules.md#connectiondata) \| [`CommentData`](modules.md#commentdata), ``null`` \| [`TypeSpec`](modules.md#typespec), ``null`` \| [`ExecutionState`](modules.md#executionstate), ``null`` \| [`BlockData`](modules.md#blockdata)]

#### Defined in

[generators.ts:183](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/generators.ts#L183)

___

### createProgrammingStore

▸ **createProgrammingStore**(`initProps`): `UseBoundStore`\<`Write`\<`StoreApi`\<[`ProgrammingState`](modules.md#programmingstate)\>, `StoreSubscribeWithSelector`\<[`ProgrammingState`](modules.md#programmingstate)\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `initProps` | `Partial`\<[`ProgrammingStateStructures`](modules.md#programmingstatestructures)\> |

#### Returns

`UseBoundStore`\<`Write`\<`StoreApi`\<[`ProgrammingState`](modules.md#programmingstate)\>, `StoreSubscribeWithSelector`\<[`ProgrammingState`](modules.md#programmingstate)\>\>\>

#### Defined in

[store.ts:945](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/store.ts#L945)

___

### functionInstanceAsType

▸ **functionInstanceAsType**(`functionTypeSpec`, `functionInstance`, `programData`): [`TypeSpec`](modules.md#typespec)

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionTypeSpec` | [`TypeSpec`](modules.md#typespec) |
| `functionInstance` | [`FunctionDeclarationData`](modules.md#functiondeclarationdata) |
| `programData` | `Object` |

#### Returns

[`TypeSpec`](modules.md#typespec)

#### Defined in

[generators.ts:148](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/generators.ts#L148)

___

### generateId

▸ **generateId**(`type`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`string`

#### Defined in

[functions.ts:18](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/functions.ts#L18)

___

### instanceTemplateFromSpec

▸ **instanceTemplateFromSpec**(`type`, `typeSpec`, `isArg`): [`ObjectData`](modules.md#objectdata) \| [`ArgumentData`](modules.md#argumentdata) \| [`FunctionDeclarationData`](modules.md#functiondeclarationdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `typeSpec` | [`TypeSpec`](modules.md#typespec) |
| `isArg` | `boolean` |

#### Returns

[`ObjectData`](modules.md#objectdata) \| [`ArgumentData`](modules.md#argumentdata) \| [`FunctionDeclarationData`](modules.md#functiondeclarationdata)

#### Defined in

[generators.ts:19](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/generators.ts#L19)

___

### referenceTemplateFromSpec

▸ **referenceTemplateFromSpec**(`type`, `instanceReference`, `typeSpec`): [`FunctionCallData`](modules.md#functioncalldata) \| [`ObjectReferenceData`](modules.md#objectreferencedata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `instanceReference` | [`ObjectData`](modules.md#objectdata) \| [`ArgumentData`](modules.md#argumentdata) \| [`FunctionDeclarationData`](modules.md#functiondeclarationdata) \| [`FunctionCallData`](modules.md#functioncalldata) \| [`ObjectReferenceData`](modules.md#objectreferencedata) |
| `typeSpec` | [`TypeSpec`](modules.md#typespec) |

#### Returns

[`FunctionCallData`](modules.md#functioncalldata) \| [`ObjectReferenceData`](modules.md#objectreferencedata)

#### Defined in

[generators.ts:103](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/generators.ts#L103)

___

### useProgrammingStore

▸ **useProgrammingStore**(`selector`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | (`state`: [`ProgrammingState`](modules.md#programmingstate)) => `any` |

#### Returns

`any`

#### Defined in

[context.tsx:8](https://github.com/Wisc-HCI/open-vp/blob/7dd5e238/packages/open-core/src/context.tsx#L8)
