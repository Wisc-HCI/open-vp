import{a as c}from"./index.839b8c6b.js";import{j as t,w as m,P as g,x as h,M as u,H as f,y,z as x,A as w,V as S,h as i,B as b,a as E}from"./Environment.086f458e.js";import{b as T,a as v}from"./basicStarter.cbd96cd9.js";import"./_commonjsHelpers.712cc82f.js";import"./assertThisInitialized.1f262959.js";import"./index.63e724c3.js";import"./debounce.d0c7c84f.js";import"./isSymbol.e585a1e8.js";import"./Synchronizing.6c7ab017.js";const B=e=>{const[r,a]=y(c.exports.useCallback(n=>w(n,e.data,null),[e.data]),x);return t(S,{...e,...{x:0,z:0,scale:1,onCanvas:!1,interactionDisabled:!0,bounded:!0,fieldInfo:"outside",parentId:"outside"},data:r,typeSpec:a})},D=({highlightColor:e,data:r,style:a,context:o})=>t(h,{backend:u,options:f,children:t(B,{highlightColor:e,data:r,style:{...a},context:o})}),l=({store:e,highlightColor:r,data:a,style:o,context:n})=>t(m,{highlightColor:r,children:t(g,{store:e,children:t(D,{highlightColor:r,data:a,style:{...o},context:n})})}),z={title:"External",component:l},P=e=>{const{drawers:r,objectTypes:a,programData:o,highlightColor:n}=e;c.exports.useLayoutEffect(()=>{i.setState({programSpec:{drawers:r,objectTypes:a},programData:o})});const p=b("hatType",o["6dewwwwww"],a.hatType);return E("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(l,{store:i,data:o["2dfsessfs"],highlightColor:n,context:{}})}),t("div",{style:{paddingBottom:4},children:t(l,{store:i,data:p,highlightColor:n,context:{}})})]})},s=P.bind({});s.args={highlightColor:"#ff00ff",drawerWidth:235,...T,...v};var d;s.parameters={...s.parameters,storySource:{source:`args => {
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
}`,...(d=s.parameters)==null?void 0:d.storySource}};const H=["External"];export{s as External,H as __namedExportsOrder,z as default};
//# sourceMappingURL=External.stories.e1a63289.js.map
