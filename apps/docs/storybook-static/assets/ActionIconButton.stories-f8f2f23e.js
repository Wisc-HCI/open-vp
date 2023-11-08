import{j as t}from"./GlobalStyles-230a7ae9.js";import{A as l,d as B,i as f}from"./index-d1360396.js";import"./assertThisInitialized-ce093588.js";import"./index-e135e482.js";const h={component:l},o={render:e=>t(l,{...e}),name:"Text Button",args:{title:"Button Title",onClick:()=>alert("Button Was Clicked"),disabled:!1,placement:"bottom",toggled:!1,canToggle:!1,size:"small",children:"Button Contents"}},a={render:e=>t(l,{...e}),name:"Icon Button",args:{title:"Button Title",onClick:()=>alert("Button Was Clicked"),disabled:!1,placement:"bottom",toggled:!1,canToggle:!1,children:t(B,{})}},r={render:e=>t(l,{...e}),name:"Toggle Button",args:{title:"Button Title",disabled:!1,placement:"bottom",toggled:!1,canToggle:!0,children:t(f,{})}};var n,s,c;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: props => <ActionIconButton {...props} />,
  name: "Text Button",
  args: {
    title: "Button Title",
    onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: false,
    size: 'small',
    children: "Button Contents"
  }
}`,...(c=(s=o.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var i,d,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: props => <ActionIconButton {...props} />,
  name: "Icon Button",
  args: {
    title: "Button Title",
    onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: false,
    children: <FiMoreHorizontal />
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,p,u;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: props => <ActionIconButton {...props} />,
  name: "Toggle Button",
  args: {
    title: "Button Title",
    // onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: true,
    children: <FiPlay />
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const y=["Primary","Secondary","Toggle"];export{o as Primary,a as Secondary,r as Toggle,y as __namedExportsOrder,h as default};
//# sourceMappingURL=ActionIconButton.stories-f8f2f23e.js.map
