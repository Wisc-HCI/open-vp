[@people_and_robots/open-core](../README.md) / [Exports](../modules.md) / Timer

# Class: Timer

## Table of contents

### Constructors

- [constructor](Timer.md#constructor)

### Properties

- [\_currentTime](Timer.md#_currenttime)
- [\_delta](Timer.md#_delta)
- [\_elapsed](Timer.md#_elapsed)
- [\_fixedDelta](Timer.md#_fixeddelta)
- [\_pageVisibilityHandler](Timer.md#_pagevisibilityhandler)
- [\_previousTime](Timer.md#_previoustime)
- [\_timescale](Timer.md#_timescale)
- [\_useFixedDelta](Timer.md#_usefixeddelta)
- [\_usePageVisibilityAPI](Timer.md#_usepagevisibilityapi)

### Methods

- [\_now](Timer.md#_now)
- [disableFixedDelta](Timer.md#disablefixeddelta)
- [dispose](Timer.md#dispose)
- [enableFixedDelta](Timer.md#enablefixeddelta)
- [fromJson](Timer.md#fromjson)
- [getDelta](Timer.md#getdelta)
- [getElapsed](Timer.md#getelapsed)
- [getFixedDelta](Timer.md#getfixeddelta)
- [getTimescale](Timer.md#gettimescale)
- [reset](Timer.md#reset)
- [setFixedDelta](Timer.md#setfixeddelta)
- [setTimescale](Timer.md#settimescale)
- [toJSON](Timer.md#tojson)
- [update](Timer.md#update)

## Constructors

### constructor

• **new Timer**(`useFixedDelta`, `fixedDelta`, `timescale`): [`Timer`](Timer.md)

A timer utility class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useFixedDelta` | `undefined` \| `boolean` | If set, the delta value is fixed. |
| `fixedDelta` | `undefined` \| `number` | The fixed delta value. |
| `timescale` | `undefined` \| `number` | A time multiplier. |

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:23](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L23)

## Properties

### \_currentTime

• **\_currentTime**: `number`

#### Defined in

[timer.ts:7](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L7)

___

### \_delta

• **\_delta**: `number`

#### Defined in

[timer.ts:8](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L8)

___

### \_elapsed

• **\_elapsed**: `number`

#### Defined in

[timer.ts:9](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L9)

___

### \_fixedDelta

• **\_fixedDelta**: `number`

#### Defined in

[timer.ts:12](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L12)

___

### \_pageVisibilityHandler

• **\_pageVisibilityHandler**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[timer.ts:14](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L14)

___

### \_previousTime

• **\_previousTime**: `number`

#### Defined in

[timer.ts:6](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L6)

___

### \_timescale

• **\_timescale**: `number`

#### Defined in

[timer.ts:10](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L10)

___

### \_useFixedDelta

• **\_useFixedDelta**: `boolean`

#### Defined in

[timer.ts:11](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L11)

___

### \_usePageVisibilityAPI

• **\_usePageVisibilityAPI**: `boolean`

#### Defined in

[timer.ts:13](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L13)

## Methods

### \_now

▸ **_now**(): `number`

#### Returns

`number`

#### Defined in

[timer.ts:153](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L153)

___

### disableFixedDelta

▸ **disableFixedDelta**(): [`Timer`](Timer.md)

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:52](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L52)

___

### dispose

▸ **dispose**(): [`Timer`](Timer.md)

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:60](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L60)

___

### enableFixedDelta

▸ **enableFixedDelta**(): [`Timer`](Timer.md)

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:72](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L72)

___

### fromJson

▸ **fromJson**(`«destructured»`): [`Timer`](Timer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `timescale` | `undefined` \| `number` |

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:165](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L165)

___

### getDelta

▸ **getDelta**(): `number`

#### Returns

`number`

#### Defined in

[timer.ts:80](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L80)

___

### getElapsed

▸ **getElapsed**(): `number`

#### Returns

`number`

#### Defined in

[timer.ts:86](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L86)

___

### getFixedDelta

▸ **getFixedDelta**(): `number`

#### Returns

`number`

#### Defined in

[timer.ts:92](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L92)

___

### getTimescale

▸ **getTimescale**(): `number`

#### Returns

`number`

#### Defined in

[timer.ts:98](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L98)

___

### reset

▸ **reset**(): [`Timer`](Timer.md)

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:104](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L104)

___

### setFixedDelta

▸ **setFixedDelta**(`fixedDelta`): [`Timer`](Timer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fixedDelta` | `number` |

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:112](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L112)

___

### setTimescale

▸ **setTimescale**(`timescale`): [`Timer`](Timer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `timescale` | `number` |

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:120](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L120)

___

### toJSON

▸ **toJSON**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `timescale` | `number` |

#### Defined in

[timer.ts:159](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L159)

___

### update

▸ **update**(): [`Timer`](Timer.md)

#### Returns

[`Timer`](Timer.md)

#### Defined in

[timer.ts:128](https://github.com/Wisc-HCI/open-vp/blob/c25824e2/packages/open-core/src/timer.ts#L128)
