import './chunk-NNAAFZ4U.mjs';
import { addons } from '@storybook/preview-api';
import { global } from '@storybook/global';
import { FORCE_REMOUNT, STORY_RENDER_PHASE_CHANGED } from '@storybook/core-events';
import { instrument } from '@storybook/instrumenter';
import { ModuleMocker } from 'jest-mock';

var JestMock=new ModuleMocker(global),fn=JestMock.fn.bind(JestMock),{action}=instrument({action:fn},{retain:!0}),channel=addons.getChannel(),seen=new Set,spies=[];channel.on(FORCE_REMOUNT,()=>spies.forEach(mock=>mock?.mockClear?.()));channel.on(STORY_RENDER_PHASE_CHANGED,({newPhase})=>{newPhase==="loading"&&spies.forEach(mock=>mock?.mockClear?.());});var addSpies=(id,val,key)=>{if(seen.has(val))return val;seen.add(val);try{if(Object.prototype.toString.call(val)==="[object Object]"){for(let[k,v]of Object.entries(val))val[k]=addSpies(id,v,k);return val}if(Array.isArray(val))return val.map((item,index)=>addSpies(id,item,`${key}[${index}]`));if(typeof val=="function"&&val.isAction){Object.defineProperty(val,"name",{value:key,writable:!1}),Object.defineProperty(val,"__storyId__",{value:id,writable:!1});let spy=action(val);return spies.push(spy),spy}}catch{}return val},addActionsFromArgTypes=({id,initialArgs})=>addSpies(id,initialArgs),argsEnhancers=[addActionsFromArgTypes],{step:runStep}=instrument({step:(label,play,context)=>play(context)},{intercept:!0}),parameters={throwPlayFunctionExceptions:!1};

export { argsEnhancers, parameters, runStep };
