import{f as M,k as E,w as L,o as b,K as y}from"./iframe.9b0cc893.js";var c="backgrounds",{document:s,window:A}=L,B=()=>A.matchMedia("(prefers-reduced-motion: reduce)").matches,H=(r,e=[],t)=>{if(r==="transparent")return"transparent";if(e.find(a=>a.value===r))return r;let n=e.find(a=>a.name===t);if(n)return n.value;if(t){let a=e.map(o=>o.name).join(", ");M.warn(E`
        Backgrounds Addon: could not find the default color "${t}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `)}return"transparent"},k=r=>{(Array.isArray(r)?r:[r]).forEach(T)},T=r=>{let e=s.getElementById(r);e&&e.parentElement.removeChild(e)},I=(r,e)=>{let t=s.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let n=s.createElement("style");n.setAttribute("id",r),n.innerHTML=e,s.head.appendChild(n)}},z=(r,e,t)=>{let n=s.getElementById(r);if(n)n.innerHTML!==e&&(n.innerHTML=e);else{let a=s.createElement("style");a.setAttribute("id",r),a.innerHTML=e;let o=`addon-backgrounds-grid${t?`-docs-${t}`:""}`,d=s.getElementById(o);d?d.parentElement.insertBefore(a,d):s.head.appendChild(a)}},C=(r,e)=>{var g;let{globals:t,parameters:n}=e,a=(g=t[c])==null?void 0:g.value,o=n[c],d=b(()=>o.disable?"transparent":H(a,o.values,o.default),[o,a]),i=b(()=>d&&d!=="transparent",[d]),p=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=b(()=>{let l="transition: background-color 0.3s;";return`
      ${p} {
        background: ${d} !important;
        ${B()?"":l}
      }
    `},[d,p]);return y(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!i){k(l);return}z(l,u,e.viewMode==="docs"?e.id:null)},[i,u,e]),r()},F=(r,e)=>{var x,v,h;let{globals:t,parameters:n}=e,a=n[c].grid,o=((x=t[c])==null?void 0:x.grid)===!0&&a.disable!==!0,{cellAmount:d,cellSize:i,opacity:p}=a,u=e.viewMode==="docs",g=n.layout===void 0||n.layout==="padded"?16:0,l=(v=a.offsetX)!=null?v:u?20:g,$=(h=a.offsetY)!=null?h:u?20:g,f=b(()=>{let m=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",w=[`${i*d}px ${i*d}px`,`${i*d}px ${i*d}px`,`${i}px ${i}px`,`${i}px ${i}px`].join(", ");return`
      ${m} {
        background-size: ${w} !important;
        background-position: ${l}px ${$}px, ${l}px ${$}px, ${l}px ${$}px, ${l}px ${$}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${p}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${p}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${p/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${p/2}) 1px, transparent 1px) !important;
      }
    `},[i]);return y(()=>{let m=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!o){k(m);return}I(m,f)},[o,f,e]),r()},S=[F,C],K={[c]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},N={[c]:null};export{S as decorators,N as globals,K as parameters};
//# sourceMappingURL=preview.db895a98.js.map
