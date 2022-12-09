import"./index.839b8c6b.js";import{D as a,i as f,k as d,m as y,n as C,T as l,o as N,E as e,f as c,p as D,v as I,e as E}from"./Environment.709c8827.js";import{S as m}from"./Synchronizing.5ac012fe.js";const _={drawers:[{title:"Structures",dataType:a.INSTANCE,objectTypes:["functionType","operationType","blockType"],icon:f},{title:"Functions",dataType:a.CALL,objectType:"functionType",icon:d},{title:"Hats",dataType:a.REFERENCE,objectType:"hatType",icon:y},{title:"Boots",dataType:a.REFERENCE,objectType:"bootType",icon:C}],objectTypes:{programType:{name:"Program",type:l.OBJECT,description:`# The Program
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
  \`\`\`javascript
function main() {
    // Contents of the program
}
  \`\`\`
      `,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:N,extras:[{type:e.INDICATOR_TEXT,accessor:t=>t.properties.children.length,label:"Size"},{type:e.INDICATOR_ICON,accessor:t=>m,label:"Status"},{icon:c,type:e.DROPDOWN,label:"Custom More...",contents:[e.DOC_TOGGLE,e.DEBUG_TOGGLE,e.LOCKED_INDICATOR,e.SELECTION_TOGGLE,e.DIVIDER,{label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.INDICATOR_TEXT,accessor:t=>t.properties.children.length,label:"Size"},{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:D},{type:e.INDICATOR_ICON,accessor:t=>m,label:"Synchronizing"}]}]},e.DIVIDER,e.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0}},parsers:{javascript:({block:t,name:s,depth:i,context:n,storeParser:o})=>`function ${s}() {
${t.properties.children.map(r=>o("javascript",r,i+1,n)).join(`;
`)};
};

`},namePolicy:{javascript:t=>t.name.replace(" ","")}},blockType:{name:"Block",type:l.OBJECT,instanceBlock:{onCanvas:!1,color:"#7f7f7f",icon:I,extras:[e.DOC_TOGGLE,e.COLLAPSE_TOGGLE,e.DEBUG_TOGGLE,{type:e.INDICATOR_TEXT,accessor:t=>t.properties.children.length,label:"Size"},{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:D},e.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0}}},functionType:{name:"Function",type:l.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:d,extras:[e.LOCKED_INDICATOR,{icon:c,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.NAME_EDIT_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DEBUG_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:d,extras:[{icon:c,type:e.DROPDOWN,contents:[e.DEBUG_TOGGLE,e.DELETE_BUTTON]}]},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}},parsers:{javascript:({block:t,name:s,depth:i,context:n,storeParser:o})=>{if(t.dataType===a.INSTANCE)return`function ${s}(${t.arguments.map(r=>o("javascript",r,0,n)).join(", ")}) {
${t.properties.children.map(r=>o("javascript",r,i+1,n)).join(`;
`)}
};

`;if(t.dataType===a.CALL){const r=n[t.ref];return console.log({inst:r,block:t}),`${" ".repeat(i*3)}${s}(${r.arguments.map(T=>t.properties[T]?o("javascript",t.properties[T],0,n):"undefined").join(", ")})`}}},namePolicy:{javascript:t=>t.name.replace(" ","")}},operationType:{name:"Operation",description:`# The Operation
The **Operation** does stuff and things. It can be included in a [Program](programType) as a *child*. 

Equivalent code may look like this in javascript:
  \`\`\`javascript
topic.publish({
    hat,
    boot,
    speed,
    isFancy
})
  \`\`\`
      `,type:l.OBJECT,instanceBlock:{onCanvas:!1,color:"#629e6c",icon:f,extras:[e.DOC_TOGGLE,{icon:c,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1,isRequired:!0},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:E.NUMBER,default:1,min:0,max:20,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},doFunky:{name:"Do Funky",type:E.BOOLEAN,default:!1},greeting:{name:"Greeting",type:E.STRING,default:""},time:{name:"Time",type:E.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"}},parsers:{javascript:({block:t,name:s,depth:i,context:n,storeParser:o})=>{var u,O;const r=t.properties.hat?o("javascript",(u=t.properties)==null?void 0:u.hat,0,n):"undefined",T=t.properties.boot?o("javascript",(O=t.properties)==null?void 0:O.boot,0,n):"undefined",p=" ".repeat((i+1)*3);return" ".repeat(i*3)+`console.log("${s}",{
${p}hat:${r},
${p}boot:${T},
${p}speed:${t.properties.speed},
${p}doFunky:${t.properties.doFunky},
${p}greeting:"${t.properties.greeting}",
${p}time:"${t.properties.time}"
${" ".repeat(i*3)}})`}},namePolicy:{javascript:t=>t.name.replace(" ","")}},hatType:{name:"Hat",type:l.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:y,extras:[e.LOCKED_INDICATOR,{icon:c,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]},parsers:{javascript:({block:t,name:s,depth:i,context:n,storeParser:o})=>`let ${s} = {};

`},namePolicy:{javascript:t=>t.name.replace(" ","")}},bootType:{name:"Boot",type:l.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:y,extras:[e.LOCKED_INDICATOR,{icon:c,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]},parsers:{javascript:({block:t,name:s,depth:i,context:n,storeParser:o})=>`let ${s} = {};

`},namePolicy:{javascript:t=>t.name.replace(" ","")}}}},g={executionData:{"45535153s":1,"655sssefs":null,"2dfsessfs":t=>Math.sin(t/5e3)/2+.3},tabs:[{title:"Main",id:"default",visible:!0,blocks:["45535153s","655sssefs"]},{title:"Declarations",id:"declarations",visible:!0,blocks:["6dewwwwww","pspssse32"]}],activeTab:"default",programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:a.INSTANCE,properties:{children:["2dfsessfs"]},position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:a.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:0,y:400},canDelete:!0,canEdit:!0,selected:!1,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:a.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:a.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!",time:"am"},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};export{g as a,_ as b};
//# sourceMappingURL=basicStarter.a7b13499.js.map
