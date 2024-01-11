"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[9499],{4639:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>t,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var o=n(5893),r=n(1151);const i={id:"using-repo-sources-workflow",title:"Using Unreleased Packages"},t=void 0,c={id:"using-repo-sources-workflow",title:"Using Unreleased Packages",description:"esy allows to use unreleased versions of packages hosted in their development",source:"@site/../docs/using-dev-sources-workflow.md",sourceDirName:".",slug:"/using-repo-sources-workflow",permalink:"/docs/using-repo-sources-workflow",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/using-dev-sources-workflow.md",tags:[],version:"current",lastUpdatedBy:"prometheansacrifice",lastUpdatedAt:1702216504,formattedLastUpdatedAt:"Dec 10, 2023",frontMatter:{id:"using-repo-sources-workflow",title:"Using Unreleased Packages"},sidebar:"docs",previous:{title:"Getting started",permalink:"/docs/getting-started"},next:{title:"Linking Packages in Development",permalink:"/docs/linking-workflow"}},a={},l=[{value:"With esy packages",id:"with-esy-packages",level:2},{value:"With opam packages",id:"with-opam-packages",level:2}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.p,{children:"esy allows to use unreleased versions of packages hosted in their development\nrepositories. This is useful as it allows to try new package versions before\nthey are released."}),"\n",(0,o.jsx)(s.h2,{id:"with-esy-packages",children:"With esy packages"}),"\n",(0,o.jsxs)(s.p,{children:["To use an unreleased version of an esy package specify a dependency resolution\nin ",(0,o.jsx)(s.a,{href:"/docs/configuration#resolutions",children:(0,o.jsx)(s.code,{children:"resolutions"})})," field alongside the dependency declaration:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-json",children:'"dependencies": {\n  "reason": "*"\n},\n"resolutions": {\n  "reason": "facebook/reason#abcdef"\n}\n'})}),"\n",(0,o.jsxs)(s.p,{children:["This will fetch ",(0,o.jsx)(s.code,{children:"reason"})," package sources from ",(0,o.jsx)(s.a,{href:"https://github.com/facebook/reason",children:"facebook/reason"})," GitHub\nrepository."]}),"\n",(0,o.jsxs)(s.blockquote,{children:["\n",(0,o.jsxs)(s.p,{children:["Why ",(0,o.jsx)(s.code,{children:"resolutions"}),"?"]}),"\n",(0,o.jsxs)(s.p,{children:["This is because in case any other package in the project's sandbox depends on\n",(0,o.jsx)(s.code,{children:"reason"})," package then it will probably conflict with ",(0,o.jsx)(s.code,{children:"facebook/reason"}),"\ndeclaration (it's most likely others will depend on an already released\nversion of reason instead)."]}),"\n",(0,o.jsxs)(s.p,{children:["Thus we use ",(0,o.jsx)(s.code,{children:"resolutions"})," so that constraint solver is forced to use\n",(0,o.jsx)(s.code,{children:"facebook/reason"})," declaration in every place ",(0,o.jsx)(s.code,{children:"reason"})," package is required."]}),"\n"]}),"\n",(0,o.jsx)(s.p,{children:"Other options are:"}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"user/repo#<commit>"})," will fetch sources from a GitHub's user/repo repository."]}),"\n",(0,o.jsxs)(s.p,{children:["The ",(0,o.jsx)(s.code,{children:"<commit>"})," is mandatory and should point to a specific commit (this will\nbe lifted in the future)."]}),"\n",(0,o.jsx)(s.p,{children:"Examples:"}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsx)(s.li,{children:(0,o.jsx)(s.code,{children:"facebook/reason#7ada18f"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"git://example.com/repo.git#<commit>"})," will fetch sources from a specified git\nrepository."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(s.h2,{id:"with-opam-packages",children:"With opam packages"}),"\n",(0,o.jsxs)(s.blockquote,{children:["\n",(0,o.jsxs)(s.p,{children:["This corresponds to opam's ",(0,o.jsx)(s.code,{children:"opam pin"})," workflow."]}),"\n"]}),"\n",(0,o.jsx)(s.p,{children:"The same workflow is supported for opam packages."}),"\n",(0,o.jsx)(s.p,{children:"One can use an unreleased opam package by specifying its development\nrepository. The only difference is that one should also specify an opam package\nname."}),"\n",(0,o.jsx)(s.p,{children:"Example:"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-json",children:'"dependencies": {\n  "@opam/lwt": "*",\n  "@opam/lwt_ppx": "*"\n},\n"resolutions": {\n  "@opam/lwt": "ocsigen/lwt:lwt.opam#abc342",\n}\n'})}),"\n",(0,o.jsxs)(s.p,{children:["Here we fetch ",(0,o.jsx)(s.code,{children:"@opam/lwt"})," and ",(0,o.jsx)(s.code,{children:"@opam/lwt_ppx"})," packages from the single\n",(0,o.jsx)(s.code,{children:"ocsigen/lwt"})," GitHub repository but refer to different opam manifests ",(0,o.jsx)(s.code,{children:"lwt.opam"}),"\nand ",(0,o.jsx)(s.code,{children:"lwt_ppx.opam"})," to use corresponding packages."]})]})}function p(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>c,a:()=>t});var o=n(7294);const r={},i=o.createContext(r);function t(e){const s=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),o.createElement(i.Provider,{value:s},e.children)}}}]);