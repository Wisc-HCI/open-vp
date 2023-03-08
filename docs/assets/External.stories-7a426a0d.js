import{r as m}from"./index-f1f749bf.js";import{j as r,y as h,P as u,z as f,A as y,B as w,G as x,H as E,J as b,V as B,h as i,K as S,i as k,k as D,a as v}from"./ErrorFallback-164632d3.js";import{b as P,a as T}from"./basicStarter-83d9b218.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./Synchronizing-d6bc1bf5.js";const C=t=>{const[e,a]=x(m.useCallback(n=>b(n,t.data,null),[t.data]),E);return r(B,{...t,...{x:0,z:0,scale:1,onCanvas:!1,interactionDisabled:!0,bounded:!0,fieldInfo:"outside",parentId:"outside"},data:e,typeSpec:a})},j=({highlightColor:t,data:e,style:a,context:o})=>r(f,{backend:y,options:w,children:r(C,{highlightColor:t,data:e,style:{...a},context:o})}),l=({store:t,highlightColor:e,data:a,style:o,context:n})=>r(h,{highlightColor:e,children:r(u,{store:t,children:r(j,{highlightColor:e,data:a,style:{...o},context:n})})}),K={title:"External",component:l},F=t=>{const{drawers:e,objectTypes:a,programData:o,highlightColor:n}=t;m.useEffect(()=>{i.setState({programSpec:{drawers:e,objectTypes:a},programData:o})},[e,a,o]);const g=S("hatType",o["6dewwwwww"],a.hatType);return r(k,{FallbackComponent:D,children:v("div",{style:{width:300,padding:4},children:[r("div",{style:{paddingBottom:4},children:r(l,{store:i,data:o["2dfsessfs"],highlightColor:n,context:{}})}),r("div",{style:{paddingBottom:4},children:r(l,{store:i,data:g,highlightColor:n,context:{}})})]})})},s=F.bind({});s.args={highlightColor:"#ff00ff",drawerWidth:235,...P,...T};var d,c,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const {
    drawers,
    objectTypes,
    programData,
    highlightColor
  } = args;
  useEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: {
        drawers,
        objectTypes
      },
      programData
    });
  }, [drawers, objectTypes, programData]);
  const instRef = referenceTemplateFromSpec('hatType', programData['6dewwwwww'], objectTypes.hatType);
  return <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div style={{
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
      
    </div>
    </ErrorBoundary>;
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const O=["External"];export{s as External,O as __namedExportsOrder,K as default};
//# sourceMappingURL=External.stories-7a426a0d.js.map
