import{r as m}from"./index-f1f749bf.js";import{j as t,w as h,P as u,x as f,M as y,H as w,y as x,z as S,A as E,V as b,h as i,B as T,a as v}from"./Environment-097b9b63.js";import{b as B,a as D}from"./basicStarter-db076a9c.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./Synchronizing-96a3523f.js";const P=e=>{const[r,a]=x(m.useCallback(n=>E(n,e.data,null),[e.data]),S);return t(b,{...e,...{x:0,z:0,scale:1,onCanvas:!1,interactionDisabled:!0,bounded:!0,fieldInfo:"outside",parentId:"outside"},data:r,typeSpec:a})},k=({highlightColor:e,data:r,style:a,context:o})=>t(f,{backend:y,options:w,children:t(P,{highlightColor:e,data:r,style:{...a},context:o})}),d=({store:e,highlightColor:r,data:a,style:o,context:n})=>t(h,{highlightColor:r,children:t(u,{store:e,children:t(k,{highlightColor:r,data:a,style:{...o},context:n})})}),q={title:"External",component:d},C=e=>{const{drawers:r,objectTypes:a,programData:o,highlightColor:n}=e;m.useLayoutEffect(()=>{i.setState({programSpec:{drawers:r,objectTypes:a},programData:o})});const g=T("hatType",o["6dewwwwww"],a.hatType);return v("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(d,{store:i,data:o["2dfsessfs"],highlightColor:n,context:{}})}),t("div",{style:{paddingBottom:4},children:t(d,{store:i,data:g,highlightColor:n,context:{}})})]})},s=C.bind({});s.args={highlightColor:"#ff00ff",drawerWidth:235,...B,...D};var l,c,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  const {
    drawers,
    objectTypes,
    programData,
    highlightColor
  } = args;
  useLayoutEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: {
        drawers,
        objectTypes
      },
      programData
    });
  });
  const instRef = referenceTemplateFromSpec('hatType', programData['6dewwwwww'], objectTypes.hatType);
  return <div style={{
    width: 300,
    padding: 4
  }}>
      <div style={{
      paddingBottom: 4
    }}>
        <ExternalBlock store={useDefaultProgrammingStore} data={programData['2dfsessfs']} highlightColor={highlightColor} context={{}} />
      </div>
      <div style={{
      paddingBottom: 4
    }}>
        <ExternalBlock store={useDefaultProgrammingStore} data={instRef} highlightColor={highlightColor} context={{}} />
      </div>
      
    </div>;
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const A=["External"];export{s as External,A as __namedExportsOrder,q as default};
//# sourceMappingURL=External.stories-80b810d5.js.map
