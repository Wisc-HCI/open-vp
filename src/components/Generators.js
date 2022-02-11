import { DATA_TYPES } from './Constants';

export const instanceTemplateFromSpec = (type, objectSpec, isArg) => {
    let data = { 
        id: type, 
        type, 
        dataType: DATA_TYPES.INSTANCE, 
        properties:{}, 
        name: `${objectSpec.instanceBlock.hideNewPrefix ? '' : 'New '}${objectSpec.name}${isArg ? ' Argument':''}`,
        canDelete: true,
        canEdit: true,
        editing: false,
        selected: false
    };
    if (objectSpec.properties) {
        Object.entries(objectSpec.properties).forEach(([propKey, propInfo]) => {
            data.properties[propKey] = propInfo.default
        })
    }
    if (objectSpec.instanceBlock?.onCanvas) {
        data.position = { x: 0, y: 0 };
    }
    return data;
};

export const referenceTemplateFromSpec = (type, instanceReference, objectSpec) => {
    let data = { 
        id: type, 
        type, 
        ref: instanceReference.id, 
        dataType: DATA_TYPES.REFERENCE,
        name: instanceReference.name,
        canDelete: true,
        canEdit: true,
        editing: false,
        selected: false
    };
    if (objectSpec.referenceBlock.onCanvas) {
        data.position = { x: 0, y: 0 };
    }
    return data;
};

export const callTemplateFromSpec = (type, functionReference, objectSpec) => {
    let data = { 
        id: type, 
        type, 
        ref: functionReference.id, 
        dataType: DATA_TYPES.CALL, 
        name: functionReference.name,
        properties:{},
        canDelete: true,
        canEdit: true,
        editing: false,
        selected: false
    };
    if (objectSpec.callBlock.onCanvas) {
        data.position = { x: 0, y: 0 };
    }
    functionReference.arguments && Object.entries(functionReference.arguments).forEach(([argKey, argInfo]) => {
        data.properties[argKey] = argInfo.default
    })
    return data;
};