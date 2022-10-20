import"./jsx-runtime.de9b712e.js";import{D as a,h as E,i as T,j as y,k as O,T as o,m as f,E as t,e as p,n as d,q as m,d as c}from"./index.2e3310d2.js";import{S as u}from"./Synchronizing.2242089e.js";const h={drawers:[{title:"Structures",dataType:a.INSTANCE,objectTypes:["functionType","operationType","blockType"],icon:E},{title:"Functions",dataType:a.CALL,objectType:"functionType",icon:T},{title:"Hats",dataType:a.REFERENCE,objectType:"hatType",icon:y},{title:"Boots",dataType:a.REFERENCE,objectType:"bootType",icon:O}],objectTypes:{programType:{name:"Program",type:o.OBJECT,description:`# The Program
The **program** does things. It also allows you to include [Operations](operationType) in their set of *children*. It does a lot of fancy things:
- Basketball
- Cribbage
- Snorkelling
    1. Eating pie

You should always follow these steps:
1. Live
1. Laugh
1. Love

Equivalent code may look like this in javascript:
  \`\`\`
   function main() {
    // Contents of the program
   }
  \`\`\`
      `,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:f,extras:[{type:t.INDICATOR_TEXT,accessor:e=>e.properties.children.length,label:"Size"},{type:t.INDICATOR_ICON,accessor:e=>u,label:"Status"},{icon:p,type:t.DROPDOWN,label:"Custom More...",contents:[t.DOC_TOGGLE,t.DEBUG_TOGGLE,t.LOCKED_INDICATOR,t.SELECTION_TOGGLE,t.DIVIDER,{label:"More Options",type:t.DROPDOWN,contents:[t.NAME_EDIT_TOGGLE,t.COLLAPSE_TOGGLE,t.LOCKED_INDICATOR,{type:t.INDICATOR_TEXT,accessor:e=>e.properties.children.length,label:"Size"},{type:t.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:d},{type:t.INDICATOR_ICON,accessor:e=>u,label:"Synchronizing"}]}]},t.DIVIDER,t.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0}},parsers:{javascript:({block:e,name:s,depth:n,context:i,storeParser:r})=>`function ${s}() {
${e.properties.children.map(l=>r("javascript",l,n+1,i)).join(`;
`)};
};

`},namePolicy:{javascript:e=>e.name.replace(" ","")}},blockType:{name:"Block",type:o.OBJECT,instanceBlock:{onCanvas:!1,color:"#7f7f7f",icon:m,extras:[t.DOC_TOGGLE,t.COLLAPSE_TOGGLE,t.DEBUG_TOGGLE,{type:t.INDICATOR_TEXT,accessor:e=>e.properties.children.length,label:"Size"},{type:t.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:d},t.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0}}},functionType:{name:"Function",type:o.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:T,extras:[t.LOCKED_INDICATOR,{icon:p,type:t.DROPDOWN,contents:[t.SELECTION_TOGGLE,t.NAME_EDIT_TOGGLE,t.DELETE_BUTTON,t.LOCKED_INDICATOR,t.DEBUG_TOGGLE,{type:t.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:t.ADD_ARGUMENT,argumentType:"hatType"}]},{type:t.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:T,extras:[{icon:p,type:t.DROPDOWN,contents:[t.DEBUG_TOGGLE,t.DELETE_BUTTON]}]},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}},parsers:{javascript:({block:e,name:s,depth:n,context:i,storeParser:r})=>{if(e.dataType===a.INSTANCE)return`function ${s}(${e.arguments.map(l=>r("javascript",l,0,i)).join(", ")}) {
${e.properties.children.map(l=>r("javascript",l,n+1,i)).join(`;
`)};
};

`;if(e.dataType===a.CALL)return`${" ".repeat(n*3)}${s}()`}},namePolicy:{javascript:e=>e.name.replace(" ","")}},operationType:{name:"Operation",description:`# The Operation
The **Operation** does stuff and things. It can be included in a [Program](programType) as a *child*. 

Equivalent code may look like this in javascript:
  \`\`\`
   topic.publish({
    hat,
    boot,
    speed,
    isFancy
  })
  \`\`\`
      `,type:o.OBJECT,instanceBlock:{onCanvas:!1,color:"#629e6c",icon:E,extras:[t.DOC_TOGGLE,{icon:p,type:t.DROPDOWN,contents:[t.DELETE_BUTTON,t.DEBUG_TOGGLE,t.SELECTION_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1,isRequired:!0},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:c.NUMBER,default:1,min:0,max:20,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},doFunky:{name:"Do Funky",type:c.BOOLEAN,default:!1},greeting:{name:"Greeting",type:c.STRING,default:""},time:{name:"Time",type:c.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"}},parsers:{javascript:({block:e,name:s,depth:n,context:i,storeParser:r})=>e.properties.hat&&e.properties.boot?" ".repeat(n*3)+'console.log("While wearing ${'+r("javascript",e.properties.hat,0,i)+"} and ${"+r("javascript",e.properties.boot,0,i)+"} greet by saying "+e.properties.greeting+" in the "+e.properties.time+" with speed "+e.properties.speed+`${e.properties.doFunky?" in a funky way.":"."}")`:e.properties.hat?" ".repeat(n*3)+'console.log("While wearing ${'+r("javascript",e.properties.hat,0,i)+"} greet by saying "+e.properties.greeting+" in the "+e.properties.time+" with speed "+e.properties.speed+`${e.properties.doFunky?" in a funky way.":"."}")`:e.properties.boot?" ".repeat(n*3)+'console.log("While wearing ${'+r("javascript",e.properties.boot,0,i)+"} greet by saying "+e.properties.greeting+" in the "+e.properties.time+" with speed "+e.properties.speed+`${e.properties.doFunky?" in a funky way.":"."}")`:" ".repeat(n*3)+'console.log("Greet by saying '+e.properties.greeting+" in the "+e.properties.time+" with speed "+e.properties.speed+`${e.properties.doFunky?" in a funky way.":"."}")`},namePolicy:{javascript:e=>e.name.replace(" ","")}},hatType:{name:"Hat",type:o.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:y,extras:[t.LOCKED_INDICATOR,{icon:p,type:t.DROPDOWN,contents:[t.DELETE_BUTTON,t.DEBUG_TOGGLE,t.NAME_EDIT_TOGGLE,t.SELECTION_TOGGLE]}]},parsers:{javascript:({block:e,name:s,depth:n,context:i,storeParser:r})=>`let ${s} = {};

`},namePolicy:{javascript:e=>e.name.replace(" ","")}},bootType:{name:"Boot",type:o.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:y,extras:[t.LOCKED_INDICATOR,{icon:p,type:t.DROPDOWN,contents:[t.DELETE_BUTTON,t.DEBUG_TOGGLE,t.SELECTION_TOGGLE]}]},parsers:{javascript:({block:e,name:s,depth:n,context:i,storeParser:r})=>`let ${s} = {};

`},namePolicy:{javascript:e=>e.name.replace(" ","")}}}},g={executionData:{"45535153s":1,"655sssefs":null,"2dfsessfs":e=>Math.sin(e/5e3)/2+.3},programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:a.INSTANCE,properties:{children:["2dfsessfs"]},position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:a.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:0,y:400},canDelete:!0,canEdit:!0,selected:!1,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:a.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:a.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!",time:"am"},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};export{g as a,h as b};
//# sourceMappingURL=basicStarter.f8228e5b.js.map
