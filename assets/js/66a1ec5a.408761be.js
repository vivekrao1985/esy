"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[2532],{8459:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>r});var t=s(5893),l=s(1151);const i={id:"offline",title:"Offline Builds"},c=void 0,o={id:"offline",title:"Offline Builds",description:"esy supports workflow where builds should happen on a machine which is",source:"@site/../docs/offline.md",sourceDirName:".",slug:"/offline",permalink:"/docs/offline",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/offline.md",tags:[],version:"current",lastUpdatedBy:"prometheansacrifice",lastUpdatedAt:1702216504,formattedLastUpdatedAt:"Dec 10, 2023",frontMatter:{id:"offline",title:"Offline Builds"},sidebar:"docs",previous:{title:"Workflow for C/C++ Packages",permalink:"/docs/c-workflow"},next:{title:"How esy works",permalink:"/docs/contributing/how-it-works"}},a={},r=[];function d(e){const n={code:"code",li:"li",ol:"ol",p:"p",pre:"pre",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"esy supports workflow where builds should happen on a machine which is\ncompletely offline (doesn't have network access)."}),"\n",(0,t.jsxs)(n.p,{children:["To do that you need to use ",(0,t.jsx)(n.code,{children:"--cache-tarballs-path"})," option when running ",(0,t.jsx)(n.code,{children:"esy install"})," command:"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"On a machine which has network access execute:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"% esy install --cache-tarballs-path=./_esyinstall\n"})}),"\n",(0,t.jsxs)(n.p,{children:["this will create ",(0,t.jsx)(n.code,{children:"_esyinstall"})," directory with all downloaded dependencies'\nsources."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Tranfer an entire project directory along with ",(0,t.jsx)(n.code,{children:"_esyinstall"})," to a machine\nwhich doesn't have access to an external network."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Execute the same installation command"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"% esy install --cache-tarballs-path=./_esyinstall\n"})}),"\n",(0,t.jsx)(n.p,{children:"which will unpack all source tarballs into cache."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Run"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"% esy build\n"})}),"\n",(0,t.jsx)(n.p,{children:"and other esy commands."}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>c});var t=s(7294);const l={},i=t.createContext(l);function c(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);