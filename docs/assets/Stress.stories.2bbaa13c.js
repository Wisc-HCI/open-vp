import{a as h}from"./index.839b8c6b.js";import{g as f,D as t,i as c,k as i,m as l,n as I,T as a,o as B,E as e,f as o,p as d,e as n,v as A,u as S,h as T,j as y}from"./Environment.35bb5516.js";import"./_commonjsHelpers.712cc82f.js";import"./assertThisInitialized.1f262959.js";import"./index.63e724c3.js";import"./debounce.d0c7c84f.js";import"./isSymbol.e585a1e8.js";const v={title:"Stress",component:f},L=s=>{const{drawers:E,objectTypes:m,programData:D,drawerWidth:N,tabs:C,activeTab:O,...g}=s,[b,p]=S();return h.exports.useLayoutEffect(()=>{T.setState({programSpec:{drawers:E,objectTypes:m},tabs:C,activeTab:O,programData:D})}),y("div",{ref:b,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:y(f,{...g,store:T,height:p.height,width:p.width,drawerWidth:N})})},r=L.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,drawers:[{title:"Structures and Other Blocks",dataType:t.INSTANCE,objectTypes:["functionType","operationType","blockType"],icon:c},{title:"Functions",dataType:t.CALL,objectType:"functionType",icon:i},{title:"Hats",dataType:t.REFERENCE,objectType:"hatType",icon:l},{title:"Boots",dataType:t.REFERENCE,objectType:"bootType",icon:I}],objectTypes:{programType:{name:"Program",type:a.OBJECT,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:B,extras:[{type:e.INDICATOR_TEXT,accessor:s=>s.properties.children.length,label:"Size"},{icon:o,type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.LOCKED_INDICATOR,{icon:o,label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.INDICATOR_TEXT,accessor:s=>s.properties.children.length,label:"Size"},{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:d}]}]},e.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0},description:{name:"Description",type:n.IGNORED,default:"Some description text"}}},blockType:{name:"Block",type:a.OBJECT,instanceBlock:{onCanvas:!1,color:"#7f7f7f",icon:A,extras:[e.COLLAPSE_TOGGLE,{type:e.INDICATOR_TEXT,accessor:s=>s.properties.children.length,label:"Size"},{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:d},e.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0}}},functionType:{name:"Function",type:a.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:i,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DEBUG_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:i},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}}},operationType:{name:"Operation",type:a.OBJECT,instanceBlock:{onCanvas:!1,color:"#629e6c",icon:c,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:n.NUMBER,default:1,min:0,max:2,visualScaling:100},doFunky:{name:"Do Funky",type:n.BOOLEAN,default:!1},greeting:{name:"Greeting",type:n.STRING,default:""},time:{name:"Time",type:n.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"},description:{name:"Description",type:n.IGNORED,default:"Some description text"}}},hatType:{name:"Hat",type:a.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:l,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE]}]}},bootType:{name:"Boot",type:a.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:l,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE]}]}}},tabs:[{title:"Main",id:"default",visible:!0,blocks:["45535153s","655sssefs"]}],activeTab:"default",programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:t.INSTANCE,properties:{children:["2dfsessfs"]},position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:t.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:400,y:10},canDelete:!0,canEdit:!0,selected:!0,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:t.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:t.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!"},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse64:{id:"pspssse64",name:"Leather Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},sdfsdsq64:{id:"sdfsdsq64",name:"Funky Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"8423ljdso8s3":{id:"8423ljdso8s3",name:"Magenta Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"p-pspssse32":{id:"p-pspssse32",name:"Pricy Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"55pspssse64":{id:"55pspssse64",name:"Fast Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6556sdfsdsq64":{id:"6556sdfsdsq64",name:"Jazzy Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"448423ljdso8s3":{id:"448423ljdso8s3",name:"Cute Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"45p-pspssse32":{id:"45p-pspssse32",name:"Black Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},bb55pspssse64:{id:"bb55pspssse64",name:"Brown Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},yy6556sdfsdsq64:{id:"yy6556sdfsdsq64",name:"Ugly Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"44448423ljdso8s3":{id:"44448423ljdso8s3",name:"Ugg Boots",type:"bootType",dataType:t.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};var u;r.parameters={...r.parameters,storySource:{source:`args => {
  const {
    drawers,
    objectTypes,
    programData,
    drawerWidth,
    tabs,
    activeTab,
    ...otherArgs
  } = args;
  const [ref, bounds] = useMeasure();
  useLayoutEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: {
        drawers,
        objectTypes
      },
      tabs,
      activeTab,
      programData
    });
  });
  return <div ref={ref} style={{
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
    backgroundColor: '#333'
  }}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
    </div>;
}`,...(u=r.parameters)==null?void 0:u.storySource}};const U=["Stress"];export{r as Stress,U as __namedExportsOrder,v as default};
//# sourceMappingURL=Stress.stories.2bbaa13c.js.map