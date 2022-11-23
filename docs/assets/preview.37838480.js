import{e as s,L as m,w as g}from"./iframe.9b0cc893.js";var h="storybook/highlight",n="storybookHighlight",p=`${h}/add`,u=`${h}/reset`,{document:l}=g,x=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,c=e=>({outline:`2px dashed ${e}`,outlineOffset:2,boxShadow:"0 0 0 6px rgba(255,255,255,0.6)"});module&&module.hot&&module.hot.decline&&module.hot.decline();var d=s.getChannel(),$=e=>{let t=n;i();let a=Array.from(new Set(e.elements)),o=l.createElement("style");o.setAttribute("id",t),o.innerHTML=a.map(r=>`${r}{
          ${x(e.color,e.style)}
         }`).join(" "),l.head.appendChild(o)},i=()=>{let e=n,t=l.getElementById(e);t&&t.parentNode.removeChild(t)};d.on(m,i);d.on(u,i);d.on(p,$);export{c as highlightObject,x as highlightStyle};
//# sourceMappingURL=preview.37838480.js.map
