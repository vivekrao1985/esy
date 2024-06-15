"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[9889],{2682:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=t(5893),i=t(1151);const r={id:"repository-structure",title:"Repository Structure"},o=void 0,a={id:"contributing/repository-structure",title:"Repository Structure",description:"The following snippet lists esy repository structured (omitting irrelevant or",source:"@site/../docs/contributing/repository-structure.md",sourceDirName:"contributing",slug:"/contributing/repository-structure",permalink:"/docs/contributing/repository-structure",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/contributing/repository-structure.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1718263340,formattedLastUpdatedAt:"Jun 13, 2024",frontMatter:{id:"repository-structure",title:"Repository Structure"},sidebar:"docs",previous:{title:"Building from source",permalink:"/docs/contributing/building-from-source"},next:{title:"Running Tests",permalink:"/docs/contributing/running-tests"}},c={},l=[];function u(e){const n={code:"code",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"The following snippet lists esy repository structured (omitting irrelevant or\nobvious items) with further explanations:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'\n    \u251c\u2500\u2500 CHANGELOG.md\n    \u251c\u2500\u2500 LICENSE\n    \u251c\u2500\u2500 README.md\n    \u2502\n    \u251c\u2500\u2500 Makefile (unmaintained)\n    \u2502   Common tasks and workflows for esy development.\n    \u2502\n    \u251c\u2500\u2500 bin/esy\n    \u2502   symlink (wrapper on Windows) for esy command, used for running tests\n    \u2502\n    \u251c\u2500\u2500 bin/esyInstallRelease.js\n    \u2502   postinstall step for npm releases produced with `esy npm-release`\n    \u2502   command. This is a built JS file which is developed in a separate flow\n    \u2502   inside `esy-install-npm-release/` subdirectory (see below).\n    \u2502\n    \u251c\u2500\u2500 docs\n    \u2502   esy end user documentation in markdown format.\n    \u2502\n    \u251c\u2500\u2500 dune\n    \u251c\u2500\u2500 dune-project\n    \u2502\n    \u251c\u2500\u2500 esy\n    \u2502   This dune library implements sandbox builder - a routine which builds\n    \u2502   the entire dependency graph and provides other introspection APIs.\n    \u2502\n    \u251c\u2500\u2500 esy/bin\n    \u2502   This dune executable implements "esy" command.\n    \u2502\n    \u251c\u2500\u2500 esy-solve\n    \u2502   This dune library implements solver.\n    \u2502\n    \u251c\u2500\u2500 esy-fetch\n    \u2502   This dune library implements installer - fetching and installing of package sources\n    \u2502\n    \u251c\u2500\u2500 esy-build-package\n    \u2502   This dune library implements package builder. esy library uses this to\n    \u2502   build each package.\n    \u2502\n    \u251c\u2500\u2500 esy-build-package/bin\n    \u2502   This dune executable implements "esy-build-package" command.\n    \u2502\n    \u251c\u2500\u2500 esy-install-npm-release\n    \u2502   Sources for `bin/esyInstallRelease.js`.\n    \u2502\n    \u251c\u2500\u2500 esy-command-expression\n    \u2502   Parser for #{...} syntax used in esy manifests.\n    \u2502\n    \u251c\u2500\u2500 esy-shell-expansion\n    \u2502   A simple shell expansion.\n    \u2502\n    \u251c\u2500\u2500 esy-lib\n    \u2502   A collection of utility modules shared between other libraries.\n    \u2502\n    \u251c\u2500\u2500 site\n    \u2502   Sources for https://esy.sh\n    \u2502\n    \u251c\u2500\u2500 esy.lock\n    \u2502   Lock files. Esy uses itself for development\n    \u2502\n    \u251c\u2500\u2500 package.json\n    \u2502   Manifest for yarn to manage NPM dependencies of this project\n    \u2502\n    \u251c\u2500\u2500 scripts\n    \u2502\n    \u251c\u2500\u2500 test\n    \u2502   Unit tests.\n    \u2502\n    \u251c\u2500\u2500 test-e2e-slow\n    \u2502   End-to-end test suite which takes a significant amount of time since they\'re \n    \u2502   not mocked or rarely so.\n    \u2502   We execute it on CI by placing `@slowtest` token in commit messages.\n    \u2502\n    \u2514\u2500\u2500 test-e2e\n        End-to-end test suite that dont need the network. Heavily mocked\n\n'})})]})}function d(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(7294);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);