if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),f={module:{uri:t},exports:o,require:d};s[t]=Promise.all(n.map((e=>f[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-21445d85"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.0d5d072e.js",revision:"49e8ef6ba54452f81a95ff94ef56d0fc"},{url:"assets/vendor.36d518d7.js",revision:"1a4f0b6912158ea7b9502d1de653da12"},{url:"index.html",revision:"a6576adeff34fa43207505d0e7aceab5"},{url:"icons/48x48.png",revision:"f53744d7c290ee1c25493abc722c94ea"},{url:"manifest.webmanifest",revision:"207811fa07b859515dd0a6403e57acc4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
