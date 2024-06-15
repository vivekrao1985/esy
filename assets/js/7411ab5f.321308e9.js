"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[234],{7467:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>r});var o=t(5893),s=t(1151);const i={id:"linking-workflow",title:"Linking Packages in Development"},a=void 0,c={id:"linking-workflow",title:"Linking Packages in Development",description:"esy allows to link a package in development to a project so that changes to the",source:"@site/../docs/linking-workflow.md",sourceDirName:".",slug:"/linking-workflow",permalink:"/docs/linking-workflow",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/linking-workflow.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1718263340,formattedLastUpdatedAt:"Jun 13, 2024",frontMatter:{id:"linking-workflow",title:"Linking Packages in Development"},sidebar:"docs",previous:{title:"Using Unreleased Packages",permalink:"/docs/using-repo-sources-workflow"},next:{title:"Concepts",permalink:"/docs/concepts"}},l={},r=[{value:"With esy packages",id:"with-esy-packages",level:2},{value:"With opam packages",id:"with-opam-packages",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:'esy allows to link a package in development to a project so that changes to the\nlinked package are observed in "real time" without the need to keep\nre-installing it.'}),"\n",(0,o.jsx)(n.p,{children:"When building a project esy will check & rebuild linked packages on any changes\nin their source trees."}),"\n",(0,o.jsx)(n.h2,{id:"with-esy-packages",children:"With esy packages"}),"\n",(0,o.jsxs)(n.p,{children:["To link a package to the project add a special ",(0,o.jsx)(n.code,{children:"link:"})," resolution to project's\n",(0,o.jsx)(n.a,{href:"configuration.html#resolutions",children:(0,o.jsx)(n.code,{children:"resolutions"})})," field alongside the dependency declaration:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'"dependencies": {\n  "reason": "*"\n},\n"resolutions": {\n  "reason": "link:../path/to/reason/checkout"\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["If you are linking to a folder with many esy packages in it, use the path to the\n",(0,o.jsx)(n.code,{children:"json"})," file that will be use to resolve the dependency, for example:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'"dependencies": {\n  "refmterr": "*",\n},\n"resolutions": {\n  "refmterr": "link:../reason-native/refmterr.json"\n}\n'})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["Why ",(0,o.jsx)(n.code,{children:"resolutions"}),"?"]}),"\n",(0,o.jsxs)(n.p,{children:["This is because in case any other package in the project's sandbox depends on\n",(0,o.jsx)(n.code,{children:"reason"})," package then it will certainly conflict with ",(0,o.jsx)(n.code,{children:"link:"})," declaration\n(nothing conforms to ",(0,o.jsx)(n.code,{children:"link:"})," except the same link)."]}),"\n",(0,o.jsxs)(n.p,{children:["Thus we use ",(0,o.jsx)(n.code,{children:"resolutions"})," so that constraint solver is forced to use ",(0,o.jsx)(n.code,{children:"link:"}),"\ndeclaration in every place ",(0,o.jsx)(n.code,{children:"reason"})," package is required."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"with-opam-packages",children:"With opam packages"}),"\n",(0,o.jsxs)(n.p,{children:["It is also possible to link an opam package, the mechanism is the similar but\nyou need to specify a path to an ",(0,o.jsx)(n.code,{children:"*.opam"})," file in a ",(0,o.jsx)(n.code,{children:"link:"})," resolution:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'"dependencies": {\n  "@opam/lwt": "*",\n  "@opam/lwt_ppx": "*"\n},\n"resolutions": {\n  "@opam/lwt": "link:../path/to/lwt/checkout/lwt.opam",\n  "@opam/lwt_ppx": "link:../path/to/lwt/checkout/lwt_ppx.opam"\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["The need to specify an ",(0,o.jsx)(n.code,{children:"*.opam"})," file is because an opam package development repository can contain multiple packages."]})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>a});var o=t(7294);const s={},i=o.createContext(s);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);