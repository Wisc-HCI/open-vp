import{j as r}from"./GlobalStyles-230a7ae9.js";import{h as o,g as i}from"./index-d1360396.js";import"./assertThisInitialized-ce093588.js";import"./index-e135e482.js";const m={component:o},n={render:e=>r(o,{...e}),name:"Static Dropdown",args:{data:{name:"Red Star",color:"red"},children:r("div",{style:{width:100,height:100,backgroundColor:"lightblue",borderRadius:3},children:"Left-Click"}),inner:[{type:"HEADER",label:"My Label"},{type:"ENTRY",label:"Toggle Mode",left:e=>r(i,{style:{color:e.color}}),onClick:()=>{alert("Clicked Button")},preventCloseOnClick:!0},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`},{type:"DIVIDER"},{type:"ENTRY",label:"More...",inner:[{type:"HEADER",label:"Inner Menu"},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`}]}]}};var t,a,l;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: props => <NestedContextMenu {...props} />,
  name: "Static Dropdown",
  args: {
    data: {
      name: 'Red Star',
      color: "red"
    },
    children: <div style={{
      width: 100,
      height: 100,
      backgroundColor: 'lightblue',
      borderRadius: 3
    }}>Left-Click</div>,
    inner: [{
      type: "HEADER",
      label: "My Label"
    }, {
      type: "ENTRY",
      label: "Toggle Mode",
      /* @ts-ignore */
      left: (d: DataType) => <FiStar style={{
        color: d.color
      }} />,
      onClick: () => {
        alert("Clicked Button");
      },
      preventCloseOnClick: true
    }, {
      type: "ENTRY",
      right: "⇧+⌘+N",
      /* @ts-ignore */
      label: (d: DataType) => \`Piped Name: \${d.name}\`
    }, {
      type: "DIVIDER"
    }, {
      type: "ENTRY",
      label: "More...",
      inner: [{
        type: "HEADER",
        label: "Inner Menu"
      }, {
        type: "ENTRY",
        right: "⇧+⌘+N",
        /* @ts-ignore */
        label: (d: DataType) => \`Piped Name: \${d.name}\`
      }]
    }]
  }
}`,...(l=(a=n.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const y=["Primary"];export{n as Primary,y as __namedExportsOrder,m as default};
//# sourceMappingURL=NestedContextMenu.stories-8ea918b6.js.map
