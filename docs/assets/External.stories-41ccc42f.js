import{r as m}from"./index-c6eaa83f.js";import{j as r,x as h,P as u,y as f,z as y,A as w,B as x,G as E,H as b,V as B,h as i,J as S,i as k,k as D,a as v}from"./ErrorFallback-6667445a.js";import{b as P,a as T}from"./basicStarter-49197769.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-fabc4dd5.js";import"./index-4d501b15.js";import"./debounce-9eb28277.js";import"./isSymbol-344a5b50.js";import"./Synchronizing-3d59c7c4.js";const C=t=>{const[e,a]=x(m.useCallback(n=>b(n,t.data,null),[t.data]),E);return r(B,{...t,...{x:0,z:0,scale:1,onCanvas:!1,interactionDisabled:!0,bounded:!0,fieldInfo:"outside",parentId:"outside"},data:e,typeSpec:a})},j=({highlightColor:t,data:e,style:a,context:o})=>r(f,{backend:y,options:w,children:r(C,{highlightColor:t,data:e,style:{...a},context:o})}),l=({store:t,highlightColor:e,data:a,style:o,context:n})=>r(h,{highlightColor:e,children:r(u,{store:t,children:r(j,{highlightColor:e,data:a,style:{...o},context:n})})}),H={title:"External",component:l},F=t=>{const{drawers:e,objectTypes:a,programData:o,highlightColor:n}=t;m.useEffect(()=>{i.setState({programSpec:{drawers:e,objectTypes:a},programData:o})},[e,a,o]);const g=S("hatType",o["6dewwwwww"],a.hatType);return r(k,{FallbackComponent:D,children:v("div",{style:{width:300,padding:4},children:[r("div",{style:{paddingBottom:4},children:r(l,{store:i,data:o["2dfsessfs"],highlightColor:n,context:{}})}),r("div",{style:{paddingBottom:4},children:r(l,{store:i,data:g,highlightColor:n,context:{}})})]})})},s=F.bind({});s.args={highlightColor:"#ff00ff",drawerWidth:235,...P,...T};var d,c,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
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
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const J=["External"];export{s as External,J as __namedExportsOrder,H as default};
//# sourceMappingURL=External.stories-41ccc42f.js.map
