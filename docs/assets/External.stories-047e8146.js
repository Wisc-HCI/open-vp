import{r as c}from"./index-f1f749bf.js";import{j as t,w as m,P as g,x as h,M as u,H as f,y,z as w,A as x,V as S,h as i,B as E,a as b}from"./Environment-63cc62ed.js";import{b as T,a as v}from"./basicStarter-3f30d77a.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./Synchronizing-9383ae29.js";const B=e=>{const[r,a]=y(c.useCallback(n=>x(n,e.data,null),[e.data]),w);return t(S,{...e,...{x:0,z:0,scale:1,onCanvas:!1,interactionDisabled:!0,bounded:!0,fieldInfo:"outside",parentId:"outside"},data:r,typeSpec:a})},D=({highlightColor:e,data:r,style:a,context:o})=>t(h,{backend:u,options:f,children:t(B,{highlightColor:e,data:r,style:{...a},context:o})}),l=({store:e,highlightColor:r,data:a,style:o,context:n})=>t(m,{highlightColor:r,children:t(g,{store:e,children:t(D,{highlightColor:r,data:a,style:{...o},context:n})})}),V={title:"External",component:l},P=e=>{const{drawers:r,objectTypes:a,programData:o,highlightColor:n}=e;c.useLayoutEffect(()=>{i.setState({programSpec:{drawers:r,objectTypes:a},programData:o})});const p=E("hatType",o["6dewwwwww"],a.hatType);return b("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(l,{store:i,data:o["2dfsessfs"],highlightColor:n,context:{}})}),t("div",{style:{paddingBottom:4},children:t(l,{store:i,data:p,highlightColor:n,context:{}})})]})},s=P.bind({});s.args={highlightColor:"#ff00ff",drawerWidth:235,...T,...v};var d;s.parameters={...s.parameters,storySource:{source:`args => {
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
}`,...(d=s.parameters)==null?void 0:d.storySource}};const W=["External"];export{s as External,W as __namedExportsOrder,V as default};
//# sourceMappingURL=External.stories-047e8146.js.map
