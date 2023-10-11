import{j as i,a as n}from"./jsx-runtime-ada97359.js";import{g as l,T as d,c as s,C as p,f as c}from"./index-06d8f9c4.js";import"./index-453e6029.js";import"./assertThisInitialized-f7a5ec5c.js";import"./index-0bd5c6fd.js";const E={component:l,decorators:[e=>i(d,{theme:s(),children:[n(p,{}),n(e,{})]})]},r={render:e=>n(l,{...e}),name:"Static Dropdown",args:{data:{name:"Red Star",color:"red"},children:n("div",{style:{width:100,height:100,backgroundColor:"lightblue",borderRadius:3},children:"Left-Click"}),inner:[{type:"HEADER",label:"My Label"},{type:"ENTRY",label:"Toggle Mode",left:e=>n(c,{style:{color:e.color}}),onClick:()=>{alert("Clicked Button")},preventCloseOnClick:!0},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`},{type:"DIVIDER"},{type:"ENTRY",label:"More...",inner:[{type:"HEADER",label:"Inner Menu"},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`}]}]}};var t,a,o;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(o=(a=r.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const u=["Primary"];export{r as Primary,u as __namedExportsOrder,E as default};
//# sourceMappingURL=NestedContextMenu.stories-71aef927.js.map
