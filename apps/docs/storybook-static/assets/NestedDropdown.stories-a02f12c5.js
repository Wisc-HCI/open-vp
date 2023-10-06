import{j as p,a as n}from"./jsx-runtime-1a918e22.js";import{d as l,T as d,c as i,C as s,e as m,f as c}from"./index-7b0d1335.js";import"./index-453e6029.js";import"./assertThisInitialized-f7a5ec5c.js";import"./index-0bd5c6fd.js";const R={component:l,decorators:[e=>p(d,{theme:i(),children:[n(s,{}),n(e,{})]})]},r={render:e=>n(l,{...e}),name:"Static Dropdown",args:{data:{name:"Red Star",color:"red"},label:"Dropdown",icon:n(m,{}),inner:[{type:"HEADER",label:"My Label"},{type:"ENTRY",label:"Toggle Mode",left:e=>n(c,{style:{color:e.color}}),onClick:()=>{alert("Clicked Button")},preventCloseOnClick:!0},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`},{type:"DIVIDER"},{type:"ENTRY",label:"More...",inner:[{type:"HEADER",label:"Inner Menu"},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`}]}]}};var a,o,t;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
        label: (d: DataType) => \`Piped Name: \${d.name}\`
      }]
    }]
  }
}`,...(t=(o=r.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};const T=["Primary"];export{r as Primary,T as __namedExportsOrder,R as default};
//# sourceMappingURL=NestedDropdown.stories-a02f12c5.js.map
