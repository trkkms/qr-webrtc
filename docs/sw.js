if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const f=e=>i(e,t),c={module:{uri:t},exports:o,require:f};s[t]=Promise.all(n.map((e=>c[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-21445d85"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.e131ecef.js",revision:"bdc4f588e13ff75a1f5970b15d7f58b1"},{url:"assets/vendor.a1b1faed.js",revision:"91f323f03fcb84a614d8683069abe026"},{url:"index.html",revision:"1b9a1e7b937aba6d8cd03726a9ce3a7b"},{url:"registerSW.js",revision:"afce8bc95548fdf2907f06f3d28b5476"},{url:"icons/48x48.png",revision:"f53744d7c290ee1c25493abc722c94ea"},{url:"manifest.webmanifest",revision:"6dd320a21075cc9cb7565be92ee23d0a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
