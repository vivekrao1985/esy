"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[1374],{3284:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>d});var i=s(5893),c=s(1151);const l={id:"how-it-works",title:"How esy works"},a=void 0,t={id:"contributing/how-it-works",title:"How esy works",description:"This document describes esy internals.",source:"@site/../docs/contributing/how-it-works.md",sourceDirName:"contributing",slug:"/contributing/how-it-works",permalink:"/docs/contributing/how-it-works",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/contributing/how-it-works.md",tags:[],version:"current",lastUpdatedBy:"prometheansacrifice",lastUpdatedAt:1702216504,formattedLastUpdatedAt:"Dec 10, 2023",frontMatter:{id:"how-it-works",title:"How esy works"},sidebar:"docs",previous:{title:"Offline Builds",permalink:"/docs/offline"},next:{title:"Building from source",permalink:"/docs/contributing/building-from-source"}},o={},d=[{value:"Overview",id:"overview",level:2},{value:"Pipeline",id:"pipeline",level:2},{value:"Solve Dependencies",id:"solve-dependencies",level:3},{value:"Fetch Dependencies",id:"fetch-dependencies",level:3},{value:"Crawl Package Graph",id:"crawl-package-graph",level:3},{value:"Produce Task Graph",id:"produce-task-graph",level:3},{value:"Build Task Graph",id:"build-task-graph",level:3},{value:"Caches",id:"caches",level:2},{value:"Global Installation Cache",id:"global-installation-cache",level:3},{value:"Location &amp; Structure",id:"location--structure",level:4},{value:"Cache Key",id:"cache-key",level:4},{value:"Global Build Store",id:"global-build-store",level:3},{value:"Location &amp; Structure",id:"location--structure-1",level:4},{value:"Cache Key",id:"cache-key-1",level:4},{value:"Local Build Store",id:"local-build-store",level:3},{value:"Local Sandbox Cache",id:"local-sandbox-cache",level:3}];function r(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"This document describes esy internals."}),"\n",(0,i.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsxs)(n.p,{children:["Almost every esy command operates in context of a ",(0,i.jsx)(n.a,{href:"concepts.md#sandbox",children:"project\nsandbox"})," which is defined by a sandbox\n",(0,i.jsx)(n.a,{href:"/docs/concepts#manifest",children:"manifest"})," (usually ",(0,i.jsx)(n.code,{children:"package.json"})," but ",(0,i.jsx)(n.code,{children:"esy.json"})," is also\nsupported)."]}),"\n",(0,i.jsx)(n.h2,{id:"pipeline",children:"Pipeline"}),"\n",(0,i.jsx)(n.p,{children:"The typical pipeline from having a clean checkout of an esy project to the\npoint where all artifacts are built consists of the following steps:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Solve Dependencies"})}),"\n",(0,i.jsxs)(n.p,{children:["Produces ",(0,i.jsx)(n.code,{children:"esy.lock"})," solution lock out of ",(0,i.jsx)(n.code,{children:"package.json"}),".  This step is\noptional as ",(0,i.jsx)(n.code,{children:"esy.lock"})," can be already present in a fresh checkout."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Fetch Dependencies"})}),"\n",(0,i.jsxs)(n.p,{children:["Ensures all packages mentioned in ",(0,i.jsx)(n.code,{children:"esy.lock"})," is in the ",(0,i.jsx)(n.a,{href:"#global-installation-cache",children:"Global\nInstallation Cache"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Crawl Package Graph"})}),"\n",(0,i.jsxs)(n.p,{children:["Crawls the sandbox's lockfile and linked packages and read them into\n",(0,i.jsx)(n.code,{children:"BuildManifest.t"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Produce Task Graph"})}),"\n",(0,i.jsxs)(n.p,{children:["Folds over the ",(0,i.jsx)(n.code,{children:"BuildManifest.t"})," and produces the ",(0,i.jsx)(n.code,{children:"Plan.Task.t"})," structures."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Build Task Graph"})}),"\n",(0,i.jsxs)(n.p,{children:["For each ",(0,i.jsx)(n.code,{children:"Plan.Task.t"})," exeute build commands in the corresponding environment\nusing ",(0,i.jsx)(n.code,{children:"esy-build-package"})," command."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solve-dependencies",children:"Solve Dependencies"}),"\n",(0,i.jsxs)(n.p,{children:["This step produces a ",(0,i.jsx)(n.a,{href:"/docs/concepts#solution",children:"solution"})," out of dependency\ndeclarations found in a project's root ",(0,i.jsx)(n.a,{href:"/docs/concepts#manifest",children:"manifest"})," and all\ntransitively dependent packages' manifests."]}),"\n",(0,i.jsx)(n.p,{children:"First, a package universe (a transitive closure of all dependencies' versions)\nis constructed by consulting package registries (npm and opam currently) and\nother sources (remote URLs, local paths and various git repositories hostings)."}),"\n",(0,i.jsxs)(n.p,{children:["The constructed package universe is then encoded as ",(0,i.jsx)(n.a,{href:"/docs/concepts#CUDF",children:"CUDF"})," and\nis fed to a CUDF solver (provided by the ",(0,i.jsx)(n.code,{children:"esy-solve-cudf"})," npm package\nwhich uses ",(0,i.jsx)(n.a,{href:"http://www.i3s.unice.fr/~cpjm/misc/mccs.html",children:"mccs"})," solver underneath)."]}),"\n",(0,i.jsxs)(n.p,{children:["The result of the solver is then decoded and serialized on disk as ",(0,i.jsx)(n.code,{children:"esy.lock"}),".\nIt is advised to commit this file to version control as it captures the current\nstate of the project's dependencies. This allows us to reproduce the\nexact same environment anywhere."]}),"\n",(0,i.jsx)(n.p,{children:"Modules of interest:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esyi/Universe"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esyi/Resolver"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esyi/Solver"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esyi/Solution"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"fetch-dependencies",children:"Fetch Dependencies"}),"\n",(0,i.jsxs)(n.p,{children:["This step consumes a ",(0,i.jsx)(n.a,{href:"/docs/concepts#solution",children:"solution"})," produced by the previous\n",(0,i.jsx)(n.a,{href:"#solve-dependencies",children:"Solve Dependencies"})," step and ensures that all packages\nmentioned in the solution are fetched and cached in the ",(0,i.jsx)(n.a,{href:"#global-installation-cache",children:"Global Installation Cache"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"How it works:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Traverse the solution"}),"\n",(0,i.jsxs)(n.li,{children:["For each record of the solution:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Fetch source (either a tarball or a git repo or ...)"}),"\n",(0,i.jsx)(n.li,{children:"Apply all needed patches"}),"\n",(0,i.jsxs)(n.li,{children:["Pack as a ",(0,i.jsx)(n.code,{children:"*.tgz"})," and store in a cache"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Modules of interest:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esyi/Fetch"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esyi/Solution"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"crawl-package-graph",children:"Crawl Package Graph"}),"\n",(0,i.jsxs)(n.p,{children:["This step crawls the sandbox's lockfile and linked packages and read them into\n",(0,i.jsx)(n.code,{children:"BuildManifest.t"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Node of this graph are package metadata. Edges are instances of dependency\nrelations between packages. The dependency relations are defined by the following\nfields in a package's manifest:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:'"dependencies"'})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'"peerDependencies"'})," - same as ",(0,i.jsx)(n.code,{children:'"dependencies"'})," from the point of view of ",(0,i.jsx)(n.code,{children:"esy"}),",\nwas used by the legacy implementation of ",(0,i.jsx)(n.code,{children:"esy install"})," command to defer\ninstalling dependencies to the root package."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'"optDependencies"'})," - this models optional dependencies (if they are installed\nthey are used, otherwise - ignored), an analogue to opam's ",(0,i.jsx)(n.code,{children:"depopts"})," which are\nbeing discouraged now."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Modules of interest:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esy/Plan"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esy/BuildManifest"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"produce-task-graph",children:"Produce Task Graph"}),"\n",(0,i.jsxs)(n.p,{children:["This step consumes ",(0,i.jsx)(n.code,{children:"BuildManifest.t"})," structures and produces ",(0,i.jsx)(n.code,{children:"Plan.Task.t"}),"\nstructures."]}),"\n",(0,i.jsxs)(n.p,{children:["The resulted graph is topologically isomorphic to the original\n",(0,i.jsx)(n.code,{children:"Solution.Package.t"})," graph but contains much more information about the build\nprocess for each of the packages in a sandbox:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"A list of ready to execute commands"}),"\n",(0,i.jsx)(n.li,{children:"An environment which is needed to execute build commands"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Modules of interest:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esy/Plan"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"build-task-graph",children:"Build Task Graph"}),"\n",(0,i.jsxs)(n.p,{children:["After ",(0,i.jsx)(n.code,{children:"Task.t"})," is constructed, it's time to build it."]}),"\n",(0,i.jsxs)(n.p,{children:["Each ",(0,i.jsx)(n.code,{children:"Task.t"})," is serialized into a JSON format called ",(0,i.jsx)(n.a,{href:"concepts.md#build-plan",children:"Build\nPlan"})," which is then used to invoke the ",(0,i.jsx)(n.code,{children:"esy-build-package"}),"\nexecutable."]}),"\n",(0,i.jsx)(n.p,{children:"Modules of interest:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esy/Build"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esy/PackageBuilder"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"esy-build-package/Builder"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"caches",children:"Caches"}),"\n",(0,i.jsx)(n.p,{children:"There are multiple levels of caches used by esy."}),"\n",(0,i.jsx)(n.h3,{id:"global-installation-cache",children:"Global Installation Cache"}),"\n",(0,i.jsxs)(n.p,{children:["This cache stores sources of concrete package versions. It can be cleaned with\nthe ",(0,i.jsx)(n.code,{children:"esy cleanup"})," command. See ",(0,i.jsx)(n.code,{children:"esy cleanup --help"})," for details. This was\npreviously known as ",(0,i.jsx)(n.code,{children:"esy gc"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"location--structure",children:"Location & Structure"}),"\n",(0,i.jsxs)(n.p,{children:["The default location for the cache is ",(0,i.jsx)(n.code,{children:"~/.esy/esyi/tarballs"})," and can be\nindirectly controlled by the ",(0,i.jsx)(n.code,{children:"--cache-path"})," option of ",(0,i.jsx)(n.code,{children:"esyi"})," executable."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"% tree ~/.esy/source/i\n\u251c\u2500\u2500 esy-installer__0.0.0.tgz\n\u2514\u2500\u2500 substs__0.0.1.tgz\n...\n"})}),"\n",(0,i.jsx)(n.h4,{id:"cache-key",children:"Cache Key"}),"\n",(0,i.jsx)(n.p,{children:"The cache key used for the cache consists of:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Package name"}),"\n",(0,i.jsx)(n.li,{children:"Package version"}),"\n",(0,i.jsx)(n.li,{children:"Package source (needed if package was fetched not from a registry but a git\nrepository or other source)"}),"\n",(0,i.jsx)(n.li,{children:"A hash of all contents of patches and additional files (if those are defined\nfor the package, currently used by the opam overrides infra)."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"global-build-store",children:"Global Build Store"}),"\n",(0,i.jsx)(n.p,{children:"This cache stores built artifacts of esy packages and related metadata."}),"\n",(0,i.jsx)(n.h4,{id:"location--structure-1",children:"Location & Structure"}),"\n",(0,i.jsxs)(n.p,{children:["The default location for the cache is ",(0,i.jsx)(n.code,{children:"~/.esy/3<prefix>"})," and can be\nindirectly controlled by the ",(0,i.jsx)(n.code,{children:"--store-path"})," option of ",(0,i.jsx)(n.code,{children:"esy"})," executable."]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"<prefix>"})," part of the path consists of a number of underscore characters\n",(0,i.jsx)(n.code,{children:"_"})," which pads the store path so that the length of the path to the ",(0,i.jsx)(n.code,{children:"ocamlrun"}),"\nexecutable in the store is exactly 128 characters."]}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["The number 128 comes from the fact that on some systems a path mentioned in a\nshebang line (first line of executable which starts with ",(0,i.jsx)(n.code,{children:"#!"}),") is limited to\n128 characters. Thus the current limit ensure that OCaml bytecode executables\ncan be run from the store.\nNote, however, that global build store doesn't need the underscores. With large source trees,\nartifacts get created at very deep paths, and this can cause failures on Windows.\nThis is why we eventually shortened build paths to just ",(0,i.jsx)(n.code,{children:"~/.esy/3/b"})," in ",(0,i.jsx)(n.a,{href:"https://github.com/esy/esy/pull/969",children:"PR#969"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The padding is needed to allow relocating built artifacts between stores."}),"\n",(0,i.jsx)(n.p,{children:"The cache looks like:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"% tree ~/.esy/3_*\n\u251c\u2500\u2500 b\n\u2502\xa0\xa0 \u251c\u2500\u2500 ocaml-4.6.1-4f6b0960\n\u2502\xa0\xa0 \u251c\u2500\u2500 ocaml-4.6.1-4f6b0960.info\n\u2502\xa0\xa0 \u251c\u2500\u2500 ocaml-4.6.1-4f6b0960.log\n\u2502\xa0\xa0 ...\n\u251c\u2500\u2500 i\n\u2502\xa0\xa0 \u251c\u2500\u2500 ocaml-4.6.1-4f6b0960\n\u2502\xa0\xa0 ...\n\u2514\u2500\u2500 s\n"})}),"\n",(0,i.jsx)(n.p,{children:"Where"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"b/<key>"})," is a directory which is used as a build root for a corresponding\npackage."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"b/<key>.log"})," is log file for the build process of a package which corresponds\nto the ",(0,i.jsx)(n.code,{children:"<key>"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"b/<key>.info"})," contains information about the corresponding build process such\ntimer ellapsed and so on."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"s/<key>"})," is a stage directory for built artifact installation (packages\ninstall their own artifacts there and then esy moves ",(0,i.jsx)(n.code,{children:"s/<key>"})," to ",(0,i.jsx)(n.code,{children:"i/<key>"})," so\nthat the changes to the store are executed atomically."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"i/<key>"})," is an installation directory, this is the directory which hosts\nbuilt artifacts of the package which corresponds to the ",(0,i.jsx)(n.code,{children:"<key>"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"cache-key-1",children:"Cache Key"}),"\n",(0,i.jsx)(n.p,{children:"The cache key used for the cache consists of:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Package name"}),"\n",(0,i.jsx)(n.li,{children:"Package version"}),"\n",(0,i.jsx)(n.li,{children:"Hash of all build/install commands and other esy specific metadata from a\npackage manifest"}),"\n",(0,i.jsx)(n.li,{children:"Hash of all dependencies' cache keys"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"local-build-store",children:"Local Build Store"}),"\n",(0,i.jsxs)(n.p,{children:["Local Build Store follows exactly the same layout and cache key as the Global\nBuild Store but it is local to a sandbox and located at\n",(0,i.jsx)(n.code,{children:"<sandboxPath>/_esy/default/store"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"It is used to store artifacts of packages which don't have a stable build\nidentity (unreleased software which changes often and doesn't warrant sorting\nits artifacts in a Global Build Store)."}),"\n",(0,i.jsx)(n.h3,{id:"local-sandbox-cache",children:"Local Sandbox Cache"}),"\n",(0,i.jsxs)(n.p,{children:["Local Sandbox Cache stores a computed package and build task graph. It is\nlocated at ",(0,i.jsx)(n.code,{children:"<sandboxPath>/_esy/default/cache/sandbox-<hash>"}),", where ",(0,i.jsx)(n.code,{children:"<hash>"}),"\nis a hash of:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Store Path"}),"\n",(0,i.jsx)(n.li,{children:"Sandbox Path"}),"\n",(0,i.jsx)(n.li,{children:"Local Store Path"}),"\n",(0,i.jsx)(n.li,{children:"Version of esy"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["The cache is stored in a format readable by the OCaml ",(0,i.jsx)(n.a,{href:"https://caml.inria.fr/pub/docs/manual-ocaml/libref/Marshal.html",children:"Marshal"})," module."]}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Reading the cache file with a version of esy which has different\n",(0,i.jsx)(n.code,{children:"SandboxInfo.t"})," layout than the one with which the cache was produced with\nusually results in a Segmentation Fault."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(r,{...e})}):r(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>t,a:()=>a});var i=s(7294);const c={},l=i.createContext(c);function a(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:a(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);