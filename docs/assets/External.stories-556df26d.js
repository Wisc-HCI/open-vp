import{j as r,r as m,a as h}from"./isSymbol-fd368dfe.js";import{p as u,P as f,q as y,r as w,s as x,t as b,v as E,w as S,V as B,a as i,x as k,b as v,c as D}from"./ErrorFallback-52e841ee.js";import{b as P,a as T}from"./basicStarter-92cb24b4.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-f2aa7f15.js";import"./index-58d3fd43.js";import"./debounce-c4e1af20.js";import"./Synchronizing-93cb1a38.js";const C=t=>{const[e,a]=b(m.useCallback(n=>S(n,t.data,null),[t.data]),E);return r(B,{...t,...{x:0,z:0,scale:1,onCanvas:!1,interactionDisabled:!0,bounded:!0,fieldInfo:"outside",parentId:"outside"},data:e,typeSpec:a})},j=({highlightColor:t,data:e,style:a,context:o})=>r(y,{backend:w,options:x,children:r(C,{highlightColor:t,data:e,style:{...a},context:o})}),l=({store:t,highlightColor:e,data:a,style:o,context:n})=>r(u,{highlightColor:e,children:r(f,{store:t,children:r(j,{highlightColor:e,data:a,style:{...o},context:n})})}),U={title:"External",component:l},F=t=>{const{drawers:e,objectTypes:a,programData:o,highlightColor:n}=t;m.useEffect(()=>{i.setState({programSpec:{drawers:e,objectTypes:a},programData:o})},[e,a,o]);const g=k("hatType",o["6dewwwwww"],a.hatType);return r(v,{FallbackComponent:D,children:h("div",{style:{width:300,padding:4},children:[r("div",{style:{paddingBottom:4},children:r(l,{store:i,data:o["2dfsessfs"],highlightColor:n,context:{}})}),r("div",{style:{paddingBottom:4},children:r(l,{store:i,data:g,highlightColor:n,context:{}})})]})})},s=F.bind({});s.args={highlightColor:"#ff00ff",drawerWidth:235,...P,...T};var d,c,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
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
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const A=["External"];export{s as External,A as __namedExportsOrder,U as default};
//# sourceMappingURL=External.stories-556df26d.js.map
