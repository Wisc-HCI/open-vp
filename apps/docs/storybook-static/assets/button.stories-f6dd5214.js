import{a as l}from"./jsx-runtime-1a918e22.js";import"./index-453e6029.js";function e({children:r,...s}){return l("button",{type:"button",...s,children:r})}e.displayName="Button";const i={component:e,argTypes:{type:{control:{type:"radio"},options:["button","submit","reset"]}}},o={render:r=>l(e,{...r,onClick:()=>{alert("Hello from Turborepo!")},children:"Hello"}),name:"Button",args:{children:"Hello",type:"button",style:{color:"blue",border:"1px solid gray",padding:10,borderRadius:10}}};var n,t,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: props => <Button {...props} onClick={(): void => {
    // eslint-disable-next-line no-alert -- alert for demo
    alert("Hello from Turborepo!");
  }}>
      Hello
    </Button>,
  name: "Button",
  args: {
    children: "Hello",
    type: "button",
    style: {
      color: "blue",
      border: "1px solid gray",
      padding: 10,
      borderRadius: 10
    }
  }
}`,...(a=(t=o.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const u=["Primary"];export{o as Primary,u as __namedExportsOrder,i as default};
//# sourceMappingURL=button.stories-f6dd5214.js.map
