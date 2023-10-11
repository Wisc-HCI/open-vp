import{j as i,a as n}from"./jsx-runtime-ada97359.js";import{d as l,T as s,c as p,C as d,e as m,f as c}from"./index-06d8f9c4.js";import"./index-453e6029.js";import"./assertThisInitialized-f7a5ec5c.js";import"./index-0bd5c6fd.js";const R={component:l,decorators:[e=>i(s,{theme:p(),children:[n(d,{}),n(e,{})]})]},a={render:e=>n(l,{...e}),name:"Static Dropdown",args:{data:{name:"Red Star",color:"red"},label:"Dropdown",icon:n(m,{}),inner:[{type:"HEADER",label:"My Label"},{type:"ENTRY",label:"Toggle Mode",left:e=>n(c,{style:{color:e.color}}),onClick:()=>{alert("Clicked Button")},preventCloseOnClick:!0},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`},{type:"DIVIDER"},{type:"ENTRY",label:"More...",inner:[{type:"HEADER",label:"Inner Menu"},{type:"ENTRY",right:"⇧+⌘+N",label:e=>`Piped Name: ${e.name}`}]}]}};var r,t,o;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(o=(t=a.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const T=["Primary"];export{a as Primary,T as __namedExportsOrder,R as default};
//# sourceMappingURL=NestedDropdown.stories-daf15e1d.js.map
