import{j as a}from"./GlobalStyles-230a7ae9.js";import{f as l,d as i,g as p}from"./index-d1360396.js";import"./assertThisInitialized-ce093588.js";import"./index-e135e482.js";const y={component:l},n={render:e=>a(l,{...e}),name:"Static Dropdown",args:{data:{name:"Red Star",color:"red"},label:"Dropdown",icon:a(i,{}),inner:[{type:"HEADER",label:"My Label"},{type:"ENTRY",label:"Toggle Mode",left:e=>a(p,{style:{color:e.color}}),onClick:()=>{alert("Clicked Button")},preventCloseOnClick:!0},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`},{type:"DIVIDER"},{type:"ENTRY",label:"More...",inner:[{type:"HEADER",label:"Inner Menu"},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`}]}]}};var r,t,o;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: props => <NestedDropdown {...props} />,
  name: "Static Dropdown",
  args: {
    data: {
      name: 'Red Star',
      color: "red"
    },
    label: "Dropdown",
    icon: <FiMoreHorizontal />,
    inner: [{
      type: "HEADER",
      label: "My Label"
    }, {
      type: "ENTRY",
      label: "Toggle Mode",
      /* @ts-ignore */
      left: (data: DataType) => <FiStar style={{
        color: data.color
      }} />,
      // eslint-disable-line no-eval
      onClick: () => {
        alert("Clicked Button");
      },
      preventCloseOnClick: true
    }, {
      type: "ENTRY",
      right: "⇧+⌘+N",
      /* @ts-ignore */
      label: (data: DataType) => \`Piped Name: \${data.name}\` // eslint-disable-line no-eval
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
        label: (data: DataType) => \`Piped Name: \${data.name}\` // eslint-disable-line no-eval
      }]
    }]
  }
}`,...(o=(t=n.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const b=["Primary"];export{n as Primary,b as __namedExportsOrder,y as default};
//# sourceMappingURL=NestedDropdown.stories-a3cd7196.js.map
