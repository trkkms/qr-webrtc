if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),d={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fd57e60c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.e648e177.js",revision:"4a15962c355815bb7cd765002a7d9b5d"},{url:"assets/vendor.eec3598d.js",revision:"4453bda6eb35c750b06aa7e4988bbca7"},{url:"index.html",revision:"9555cbc019223ae82f2711e3faf525ae"},{url:"icons/48x48.png",revision:"f53744d7c290ee1c25493abc722c94ea"},{url:"manifest.webmanifest",revision:"207811fa07b859515dd0a6403e57acc4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
