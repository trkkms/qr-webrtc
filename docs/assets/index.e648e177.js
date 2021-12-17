import{a as se,b as ve,c as Z,u as v,r as u,n as re,d as R,t as $,l as G,s as A,e as ae,j as a,f as l,g as b,R as U,h as Ce,F as H,i as Se,k as ce,m as q,G as xe,o as P,P as Ae,v as ke,p as De}from"./vendor.eec3598d.js";const _e=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};_e();const K=se(!1),z=ve("as","host",{replaceState:!0,serialize:e=>e,deserialize:e=>e==="host"?"host":"guest"}),ie=Z([]),Be=()=>R(ie),S=()=>{const e=v(ie),n=o=>u.exports.useCallback(t=>{console[o==="info"||o==="success"?"log":o](t);const r=new Date,c=re();return e(i=>{i.unshift({message:t,timestamp:r,level:o,id:c})})},[]);return{info:n("info"),warn:n("warn"),error:n("error"),success:n("success")}},E=()=>{const e=R(z),n={main:"#282828",dark:"#000000",light:"#404040"},o={main:"#81d4fa",light:"#b6ffff",dark:"#4ba3c7",text:"#202020"},t={main:"#ffee58",light:"#ffff8b",dark:"#c9bc1f",text:"#202020"};return{color:{background:n,primary:e==="host"?o:t,secondary:e==="host"?t:o,text:"#E8E8E8"}}},F=e=>{let n=new Audio;n.muted=!0,n.srcObject=e,n.addEventListener("canplaythrough",()=>{n=null})},ee=(e,n,o,t,s)=>{"ontrack"in e?(t.info("set ontrack event"),e.ontrack=r=>{t.info("ontrack event detected");for(const c of r.streams)t.info("loop on stream"),F(c),n.createMediaStreamSource(c).connect(o),s(o.stream).then(()=>{t.info("update stream")})}):(t.info("set onaddstream event"),e.onaddstream=r=>{t.info("onaddstream event detected"),F(r.stream),n.createMediaStreamSource(r.stream).connect(o),s(o.stream).then(()=>{t.info("update stream")})})},W=()=>{let e=()=>{};const n=new Promise(o=>{e=o});return[o=>e(o),()=>n]},Ee=$({type:G("acceptGuest"),guestId:A,others:ae(A)}),ue=$({type:G("offer"),from:A,to:A,sdp:A}),Re=$({type:G("acceptHost"),guestId:A,name:A,offers:ae(ue)}),le=$({type:G("answer"),from:A,to:A,sdp:A}),Fe=(e,n,o,t)=>{const s=new Map,[r,c]=W();return n().then(async i=>{i.onmessage=async d=>{const f=JSON.parse(d.data);if(Ee.is(f)){t.info("accepted by host");const g=f.guestId;r(f.guestId);const p=[];for(const x of f.others){const m=new RTCPeerConnection({iceServers:[]});o(m),s.set(x,m),await m.setLocalDescription(await m.createOffer());const B=await new Promise(y=>{m.onicecandidate=w=>{!w.candidate&&m.localDescription&&y(m.localDescription.sdp)}});p.push({type:"offer",from:g,to:x,sdp:B})}const C={type:"acceptHost",guestId:g,offers:p,name:e};i.send(JSON.stringify(C))}if(ue.is(f)){t.info("received offer request");const g=await c(),p=new RTCPeerConnection({iceServers:[]});o(p),s.set(f.from,p),await p.setRemoteDescription({type:"offer",sdp:f.sdp}),await p.setLocalDescription(await p.createAnswer());const C=await new Promise(m=>{p.onicecandidate=B=>{!B.candidate&&p.localDescription&&m(p.localDescription.sdp)}}),x={type:"answer",from:g,to:f.from,sdp:C};i.send(JSON.stringify(x))}if(le.is(f)){t.info("received answer");const g=s.get(f.from);if(g==null)return;await g.setRemoteDescription({type:"answer",sdp:f.sdp})}}}),{}},Te=(e,n)=>(o,t)=>{if(Re.is(t)){n.info(`${t.guestId.slice(0,5)} / accepted by guest`);const s=e.get(t.guestId);if(s==null)return;s.setName(t.name);for(const r of t.offers){n.info(`${r.to.slice(0,5)} / sending offer`);const c=e.get(r.to);c!=null&&c.sendMessage(r)}}if(le.is(t)){const s=e.get(t.to);if(n.info(`${t.to.slice(0,5)} / sending answer from ${t.from.slice(0,5)}`),s==null)return;s.sendMessage(t)}},Pe=async(e,n,o)=>{const t=new Map,s=new AudioContext,r=s.createMediaStreamDestination(),c=await navigator.mediaDevices.getUserMedia({video:!1,audio:{latency:.01,echoCancellation:!0}});F(c),await e(r.stream);const i=Te(t,n);return{createPeer:async()=>{const p=re(),[C,x]=W(),m=new RTCPeerConnection({iceServers:[]}),B=c.clone();F(B);for(const D of B.getTracks())m.addTrack(D,B);ee(m,s,r,n,e),m.onconnectionstatechange=()=>{n.info(`${p.slice(0,5)} / connection state change: ${m.connectionState}`),o()};const y=m.createDataChannel("host-to-guest"),[w,k]=W();y.onopen=()=>{n.info(`${p.slice(0,5)} / data channel established`),w(y)},y.onmessage=D=>{i(p,JSON.parse(D.data))},await m.setLocalDescription(await m.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!1}));const X=await new Promise(D=>{m.onicecandidate=j=>{!j.candidate&&m.localDescription&&D(m.localDescription.sdp)}}),oe={id:p,sdp:X,connect:async D=>{const j=new Promise(be=>{m.onconnectionstatechange=()=>{n.info(`${p.slice(0,5)} / connection state change: ${m.connectionState}`),o(),m.connectionState==="connected"&&be()}});return await m.setRemoteDescription({type:"answer",sdp:D}),j},close:()=>{m.close(),t.delete(p),o()},getConnectionState:()=>m.connectionState,sendMessage:async D=>{(await k()).send(JSON.stringify(D))},data:y,setName:C,getName:x};return t.set(p,oe),oe},getPeer:p=>t.get(p),getPeers:()=>t}},T=Z([]),de=se({}),Le=()=>{const e=v(de);return u.exports.useCallback(()=>{e(Symbol())},[])},Me=()=>{R(de)},Ie=({setService:e,setCurrentPeer:n,playAudio:o})=>{const{color:t}=E(),s=v(K),r=v(T),c=S(),i=Le();return a("div",{css:l({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:a("button",{type:"button",css:l({padding:"0.5rem 1rem",outline:"none",border:"none",background:t.primary.main,color:t.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const d=await Pe(o,c,i),f=await d.createPeer();e(d),s(!0),n(f),r(g=>{g.push({stage:1,sdp:f.sdp})})},children:"\u63A5\u7D9A\u958B\u59CB"})})},fe=({audioRef:e})=>a("div",{children:a("audio",{autoPlay:!0,ref:e})});let h,pe=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});pe.decode();let Q=null;function L(){return(Q===null||Q.buffer!==h.memory.buffer)&&(Q=new Uint8Array(h.memory.buffer)),Q}function te(e,n){return pe.decode(L().subarray(e,e+n))}let M=0,J=new TextEncoder("utf-8");const Oe=typeof J.encodeInto=="function"?function(e,n){return J.encodeInto(e,n)}:function(e,n){const o=J.encode(e);return n.set(o),{read:e.length,written:o.length}};function Ne(e,n,o){if(o===void 0){const i=J.encode(e),d=n(i.length);return L().subarray(d,d+i.length).set(i),M=i.length,d}let t=e.length,s=n(t);const r=L();let c=0;for(;c<t;c++){const i=e.charCodeAt(c);if(i>127)break;r[s+c]=i}if(c!==t){c!==0&&(e=e.slice(c)),s=o(s,t,t=c+e.length*3);const i=L().subarray(s+c,s+t);c+=Oe(e,i).written}return M=c,s}let V=null;function I(){return(V===null||V.buffer!==h.memory.buffer)&&(V=new Int32Array(h.memory.buffer)),V}function He(e,n){return L().subarray(e/1,e/1+n)}function We(e){try{const r=h.__wbindgen_add_to_stack_pointer(-16);var n=Ne(e,h.__wbindgen_malloc,h.__wbindgen_realloc),o=M;h.compress(r,n,o);var t=I()[r/4+0],s=I()[r/4+1];let c;return t!==0&&(c=He(t,s).slice(),h.__wbindgen_free(t,s*1)),c}finally{h.__wbindgen_add_to_stack_pointer(16)}}function me(e,n){const o=n(e.length*1);return L().set(e,o/1),M=e.length,o}function je(e,n){try{const c=h.__wbindgen_add_to_stack_pointer(-16);var o=me(e,h.__wbindgen_malloc),t=M;h.into_svg(c,o,t,n);var s=I()[c/4+0],r=I()[c/4+1];let i;return s!==0&&(i=te(s,r).slice(),h.__wbindgen_free(s,r*1)),i}finally{h.__wbindgen_add_to_stack_pointer(16)}}function ge(e){try{const r=h.__wbindgen_add_to_stack_pointer(-16);var n=me(e,h.__wbindgen_malloc),o=M;h.inflate(r,n,o);var t=I()[r/4+0],s=I()[r/4+1];let c;return t!==0&&(c=te(t,s).slice(),h.__wbindgen_free(t,s*1)),c}finally{h.__wbindgen_add_to_stack_pointer(16)}}async function $e(e,n){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,n)}catch(t){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t);else throw t}const o=await e.arrayBuffer();return await WebAssembly.instantiate(o,n)}else{const o=await WebAssembly.instantiate(e,n);return o instanceof WebAssembly.Instance?{instance:o,module:e}:o}}async function he(e){typeof e=="undefined"&&(e=new URL("/qr-webrtc/assets/wasm_bg.8832fa6e.wasm",self.location));const n={};n.wbg={},n.wbg.__wbg_alert_f5393de24ed74e50=function(s,r){alert(te(s,r))},(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:o,module:t}=await $e(await e,n);return h=o.exports,he.__wbindgen_wasm_module=t,h}const ye=({src:e,cacheKey:n})=>{const o=u.exports.useRef({}),t=S(),s=u.exports.useMemo(()=>{const r=o.current[n];if(r)return r;const c=je(e,300);return c===void 0?(t.error("QR Code creation failed for some reason."),""):(o.current[n]=c,c)},[e,n]);return u.exports.useEffect(()=>{console.log(`${n} generate:`),console.log(e)},[e,n]),a("div",{dangerouslySetInnerHTML:{__html:s}})},O=({backTitle:e,nextTitle:n,onBack:o,onNext:t})=>{const{color:s}=E();return b("ul",{css:l({display:"grid",gridTemplateColumns:"50% 50%",width:"100%",padding:"2rem",gap:"1rem",maxWidth:"400px"}),children:[e!=null&&a("li",{children:a("button",{type:"button",css:l({width:"100%",height:"2rem",border:"none",outline:"none",background:s.primary.main}),onClick:o,children:e})}),n&&a("li",{css:l({display:"flex",justifyContent:"center",alignItems:"center"}),children:a("button",{type:"button",css:l({width:"100%",height:"2rem",border:"none",outline:"none",background:s.primary.main}),onClick:t,children:n})})]})},_=({title:e,children:n})=>b("section",{css:l({display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%",padding:"1rem"}),children:[a("h2",{css:l({width:"100%",marginBottom:"1rem",fontSize:"larger"}),children:e}),n]}),we=(e,n,o,t,s)=>{const r=u.exports.useMemo(()=>{const c=We(e);if(c==null){o.error("Failed to compress sdp.");return}return new Uint8Array(c)},t);return u.exports.useMemo(()=>r==null?void 0:n===1?r.subarray(0,r.length/2):r.subarray(r.length/2),s)},Ge=U.memo(function({stage:n}){const o=v(T),[t,s]=u.exports.useState(1),r=S(),c=u.exports.useCallback(()=>{t===2?s(1):o(()=>[{stage:5}])},[t]),i=u.exports.useCallback(()=>{t===1?s(2):o(g=>{g.push({stage:2})})},[t]),d=t===1?"1.\u30AA\u30D5\u30A1\u30FC(\u524D\u534A)":"1.\u30AA\u30D5\u30A1\u30FC(\u5F8C\u534A)",f=we(n.sdp,t,r,[n],[n,t]);return b(_,{title:d,children:[f&&a("div",{css:l({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:a(ye,{src:f,cacheKey:`host-offer-${t}`})}),a("p",{css:l({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:a("span",{children:"\u63A5\u7D9A\u3059\u308B\u30B2\u30B9\u30C8\u306B\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002"})}),t===2&&a("p",{css:l({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:"\u300C\u6B21\u3078\u300D\u3092\u62BC\u3059\u3068\u30AB\u30E1\u30E9\u304C\u8D77\u52D5\u3057\u307E\u3059\u3002"}),a(O,{backTitle:t===2?"\u623B\u308B":"\u30B2\u30B9\u30C8\u4E00\u89A7",nextTitle:"\u6B21\u3078",onBack:c,onNext:i})]})}),Y=({onResult:e})=>{const n=u.exports.useRef(null),o=S();return u.exports.useEffect(()=>{const s=(async()=>{const r=document.createElement("video"),c=n.current;if(c==null){o.error("Failed to get canvas element.");return}const i=c.getContext("2d");if(i==null){o.error("Failed to get canvas context");return}const d=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",width:{ideal:640},height:{ideal:480}}});return r.srcObject=d,await r.play(),requestAnimationFrame(function g(){const p=n.current;if(p==null||r.readyState!==r.HAVE_ENOUGH_DATA)return;p.width=r.videoWidth,p.height=r.videoHeight,i.drawImage(r,0,0,p.width,p.height);const C=i.getImageData(0,0,p.width,p.height),x=Ce(C.data,C.width,C.height,{inversionAttempts:"dontInvert"});if(!x){requestAnimationFrame(g);return}e(x),d.getTracks().forEach(m=>{m.readyState==="live"&&m.stop()})}),d})().catch(r=>{o.error(`Cannot get video stream: ${String(r)}`)});return()=>{s.then(r=>{r&&r.getTracks().forEach(c=>{c.readyState==="live"&&c.stop()})})}},[]),a("div",{children:a("canvas",{ref:n})})},Ue=()=>{const[e,n]=u.exports.useState(void 0),o=v(T),t=u.exports.useCallback(c=>{console.log("answer1 received:"),console.log(c.binaryData),n(c.binaryData)},[]),s=u.exports.useCallback(()=>{o(c=>{c.pop()})},[]),r=u.exports.useCallback(()=>{e!=null&&o(c=>{c.push({stage:3,halfAnswer:e})})},[e]);return b(_,{title:"2.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&a(Y,{onResult:t}),a(O,{backTitle:"\u623B\u308B",onBack:s,nextTitle:e!=null?"\u6B21\u3078":void 0,onNext:r})]})},qe=({stage:e})=>{const[n,o]=u.exports.useState(void 0),t=v(T),s=S(),r=u.exports.useCallback(i=>{console.log("answer2 received:"),console.log(i.binaryData);const d=ge(new Uint8Array([...e.halfAnswer.slice(5),...i.binaryData.slice(5)]));d!=null?(o(d),t(f=>{f.push({stage:4,sdp:d})})):s.error("Decoding SDP Failed")},[]),c=u.exports.useCallback(()=>{t(i=>{o(void 0),i.pop()})},[]);return b(_,{title:"3.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[n==null&&a(Y,{onResult:r}),a(O,{backTitle:"\u623B\u308B",onBack:c})]})},ze=({stage:e,peer:n,service:o})=>{const t=S(),s=v(T);return u.exports.useEffect(()=>{(async()=>{await n.connect(e.sdp);const c={type:"acceptGuest",guestId:n.id,others:Array.from(o.getPeers().keys()).filter(i=>i!==n.id)};await n.sendMessage(c),s(()=>[{stage:5}])})().catch(c=>{t.error(`Failed to receive answer: ${String(c)}`)})},[]),a(_,{title:"4. \u63A5\u7D9A\u4E2D",children:a("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},Qe=({textP:e})=>{const[n,o]=u.exports.useState(void 0);return u.exports.useEffect(()=>{e.then(t=>{o(t)})},[]),a(H,{children:n!=null?n:""})},Je=({service:e})=>{const n=e.getPeers(),o=v(T);Me();const{color:t}=E();return u.exports.useEffect(()=>{for(const s of n.values())s.getConnectionState()!=="connected"&&s.close()},[]),a(_,{title:"\u30B2\u30B9\u30C8\u4E00\u89A7",children:b("div",{children:[n.size===0&&a("p",{css:l({marginBottom:"5rem"}),children:"\u307E\u3060\u63A5\u7D9A\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}),a("div",{css:l({display:"flex",justifyContent:"center"}),children:a("button",{type:"button",css:l({border:"none",outline:"none",padding:"0.5rem 1rem",background:t.primary.main}),onClick:async()=>{const s=await e.createPeer();o(()=>[{stage:1,sdp:s.sdp}])},children:"\u65B0\u898F\u63A5\u7D9A"})}),n.size>0&&a("ol",{css:l({display:"flex",flexWrap:"wrap",padding:"1rem",width:"100%"}),children:[...n.values()].map(s=>b("li",{css:l({display:"flex",justifyContent:"space-between",width:"100%"}),children:[a("span",{css:l({marginRight:"1rem"}),children:s.id.slice(0,6)}),a("span",{css:l({marginRight:"1rem"}),children:a(Qe,{textP:s.getName()})}),a("span",{children:s.getConnectionState()}),a("button",{type:"button",css:l({border:"none",outline:"none",width:"2rem",background:t.secondary.dark}),onClick:()=>{s.close()},children:"\xD7"})]},s.id))})]})})},Ve=({service:e,peer:n})=>{const o=R(T),t=o[o.length-1];return t==null?null:t.stage===1?a(Ge,{stage:t}):t.stage===2?a(Ue,{}):t.stage===3?a(qe,{stage:t}):t.stage===4?a(ze,{service:e,stage:t,peer:n}):t.stage===5?a(Je,{service:e}):a(H,{})},Ye=()=>{const[e,n]=u.exports.useState(),[o,t]=u.exports.useState(),s=S(),r=u.exports.useRef(null),c=u.exports.useCallback(async i=>{if(r.current==null){s.warn("ignore playAudio() since no audio element found.");return}r.current.srcObject=i,await r.current.play(),r.current.volume=1},[]);return b("main",{css:l({width:"100%",height:"100%",maxWidth:1200}),children:[!e&&a(Ie,{setService:n,setCurrentPeer:t,playAudio:c}),e&&o!=null&&a(Ve,{service:e,peer:o}),a(fe,{audioRef:r})]})},Xe=async(e,n,o)=>{const t=new AudioContext,s=t.createMediaStreamDestination(),r=await navigator.mediaDevices.getUserMedia({video:!1,audio:{latency:.01,echoCancellation:!0}});F(r),await e(s.stream);const[c,i]=W(),[d,f]=W(),g=async()=>{const y=new RTCPeerConnection({iceServers:[]}),w=r.clone();F(w);for(const k of w.getTracks())y.addTrack(k,w);return ee(y,t,s,n,e),y.onconnectionstatechange=()=>{n.info(`host connection state change: ${y.connectionState}`)},y.ondatachannel=k=>{n.info("data channel established"),c(k.channel)},d(y),y},p=async y=>{const w=await f();await w.setRemoteDescription({type:"offer",sdp:y});const k=await w.createAnswer();return await w.setLocalDescription(k),new Promise(X=>{w.onicecandidate=ne=>{!ne.candidate&&w.localDescription!=null&&X(w.localDescription.sdp)}})},C=async y=>{const w=await f();w.onconnectionstatechange=()=>{w.connectionState==="connected"&&(n.info("connected to host"),y())}},m=Fe(o,i,y=>{const w=r.clone();F(w);for(const k of w.getTracks())y.addTrack(k);ee(y,t,s,n,e)},n);return{createAnswer:p,setOnConnect:C,close:async()=>(await f()).close(),signalService:m,createHostPeer:g}},Ze=Se("guestName","\u306A\u306A\u3057\u3055\u3093"),N=Z([]),Ke=({setService:e,playAudio:n})=>{const o=S(),{color:t}=E(),s=v(K),[r,c]=ce(Ze),i=v(N);return a("div",{css:l({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:b("div",{css:l({width:"100%",padding:"2rem"}),children:[a("div",{css:l({display:"flex",width:"100%",justifyContent:"center",marginBottom:"3rem"}),children:a("input",{type:"text",css:l({outline:"none",border:"none",fontSize:"1rem",padding:"0.25rem 0.5rem",height:"3rem",width:"14rem"}),onChange:d=>{c(d.target.value)},value:r})}),a("div",{css:l({display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}),children:a("button",{type:"button",css:l({padding:"0.5rem 1rem",outline:"none",border:"none",background:t.primary.main,color:t.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const d=await Xe(n,o,r);e(d),s(!0),i(f=>{f.push({stage:1})})},children:"\u63A5\u7D9A\u958B\u59CB"})})]})})},et=()=>{const[e,n]=u.exports.useState(void 0),o=v(N),t=u.exports.useCallback(r=>{console.log("offer1 received:"),console.log(r.binaryData),n(r.binaryData)},[]),s=u.exports.useCallback(()=>{e!=null&&o(r=>{r.push({stage:2,halfOffer:e})})},[e]);return b(_,{title:"1.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&a(Y,{onResult:t}),e&&a(O,{nextTitle:"\u6B21\u3078",onNext:s})]})},tt=({stage:e,service:n})=>{const[o,t]=u.exports.useState(void 0),s=v(N),r=u.exports.useCallback(async i=>{console.log("offer2 received:"),console.log(i.binaryData);const d=ge(new Uint8Array([...e.halfOffer.slice(5),...i.binaryData.slice(5)]));if(console.log(d),t(d),d!=null){t(d),await n.createHostPeer();const f=await n.createAnswer(d);s(g=>{g.push({stage:3,sdp:f})})}},[]),c=u.exports.useCallback(()=>{t(void 0),s(i=>{i.pop()})},[]);return b(_,{title:"2.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[o==null&&a(Y,{onResult:r}),a(O,{backTitle:"\u623B\u308B",onBack:c})]})},nt=({stage:e,service:n})=>{const o=v(N),[t,s]=u.exports.useState(1),r=S(),c=t===1?"3.\u30A2\u30F3\u30B5\u30FC(\u524D\u534A)":"3.\u30A2\u30F3\u30B5\u30FC(\u5F8C\u534A)",i=we(e.sdp,t,r,[e],[e,t]),d=u.exports.useCallback(()=>{t===1&&s(2)},[]),f=u.exports.useCallback(()=>{if(t===2){s(1);return}o(g=>{g.pop(),g.pop()})},[]);return u.exports.useLayoutEffect(()=>{n.setOnConnect(()=>{o(g=>{g.push({stage:4})})})},[]),b(_,{title:c,children:[i&&a("div",{css:l({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:a(ye,{src:i,cacheKey:`guest-answer-${t}`})}),a("p",{css:l({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:a("span",{children:`\u30DB\u30B9\u30C8\u306BQR\u30B3\u30FC\u30C9\u3092${t===2?"\u3082\u3046\u4E00\u5EA6":""}\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002`})}),a(O,{backTitle:"\u623B\u308B",nextTitle:t===1?"\u6B21\u3078":void 0,onNext:d,onBack:f})]})},ot=()=>{const e=v(N);return u.exports.useEffect(()=>{e(()=>[{stage:5}])},[]),a(_,{title:"4. \u63A5\u7D9A\u4E2D",children:a("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},st=({children:e})=>a("p",{css:l({fontSize:"smaller"}),children:e!=null?e:"This Component is not implemented yet."}),rt=({service:e})=>{const n=R(N),o=n[n.length-1];return o==null?null:o.stage===1?a(et,{}):o.stage===2?a(tt,{stage:o,service:e}):o.stage===3?a(nt,{stage:o,service:e}):o.stage===4?a(ot,{}):o.stage===5?a(st,{}):a(H,{})},at=()=>{const e=u.exports.useRef(null),n=S(),[o,t]=u.exports.useState(void 0),s=u.exports.useCallback(async r=>{if(e.current==null){n.warn("ignore playAudio() since no audio element found.");return}e.current.srcObject=r,await e.current.play(),e.current.volume=1},[]);return b("main",{css:l({width:"100%",height:"100%",maxWidth:1200}),children:[o==null&&a(Ke,{setService:t,playAudio:s}),o&&a(rt,{service:o}),a(fe,{audioRef:e})]})},ct=()=>{const[e,n]=ce(z),o=R(K),t=S(),{color:s}=E(),r=e==="host"?"\u30DB\u30B9\u30C8":"\u30B2\u30B9\u30C8",c=e==="host"?"\u30B2\u30B9\u30C8":"\u30DB\u30B9\u30C8";return a("button",{className:q({started:o}),css:l({width:"9rem",border:"none",outline:"none",padding:"0.125rem 0.5rem",background:`linear-gradient(135deg, ${s.primary.main} 50%, ${s.secondary.main} 50%)`,color:s.primary.text,"&.started":{background:s.background.dark,color:s.text}}),type:"button",onClick:()=>{if(o){t.warn("\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u958B\u59CB\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u30E2\u30FC\u30C9\u3092\u5909\u66F4\u3067\u304D\u307E\u305B\u3093\u3002");return}n(i=>i==="host"?"guest":"host")},disabled:o,children:o?a("span",{children:r}):b(H,{children:[a("span",{css:l({fontWeight:"bolder"}),children:`[${r}]`})," \u21D2 ",a("span",{children:c})]})})},it=()=>{const{color:e}=E(),[n,o]=u.exports.useState("");return u.exports.useEffect(()=>{const t=Array.from(document.getElementsByTagName("script"));for(const s of t){const r=/index\.([^.]+)\.js$/.exec(s.src);if(r){o(r[1]);break}}},[]),b("header",{css:l({display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%",paddingLeft:"0.5rem",paddingRight:"1rem",background:e.background.light}),children:[b("span",{children:["QR WebRTC",n?` -${n}`:""]}),a(ct,{})]})},ut=U.memo(function({item:n}){const{timestamp:o,level:t,message:s}=n,c=`${[o.getHours(),o.getMinutes(),o.getSeconds()].map(i=>i.toString(10).padStart(2,"0")).join(":")} [${t.toUpperCase()}] ${s}`;return a("li",{className:t,css:l({fontFamily:"monospace","&.info":{color:"#bdbdbd"},"&.warn":{color:"#ffa726"},"&.error":{color:"#ef5350"},"&.success":{color:"#29b6f6"}}),children:c})}),lt=U.memo(function({items:n}){return a("ul",{css:l({height:"100%",paddingLeft:"0.5rem"}),children:n.map(o=>a(ut,{item:o},o.id))})}),dt=()=>{const[e,n]=u.exports.useState(!1),{color:o}=E(),t=Be(),s=t.length>0&&t[t.length-1].level==="error";return u.exports.useEffect(()=>{s&&n(!0)},[s]),b("footer",{className:q({open:e}),css:l({display:"grid",height:"1.5rem",gridTemplateRows:"1.5rem 1fr",overflow:"hidden",transition:"all 0.5s","&.open":{height:"12rem"},background:o.background.dark,color:o.text}),children:[b("button",{type:"button",className:q({error:s}),css:l({display:"flex",justifyContent:"right",alignItems:"center",width:"100%",height:"100%",paddingRight:"1rem",border:"none",outline:"none",background:o.background.dark,color:o.text,"&.error":{background:"#b61827"}}),onClick:()=>n(r=>!r),children:[a("span",{css:l({marginRight:"0.75rem"}),children:"\u30ED\u30B0"}),a("span",{className:q({open:e}),css:l({display:"inline-block",height:"0.75rem",width:"0.75rem",borderLeft:"0.375rem solid transparent",borderBottom:"0.75rem solid white",borderRight:"0.375rem solid transparent",transition:"all 0.5s","&.open":{transform:"rotate(-180deg)"}})})]}),a("div",{css:l({height:"100%",overflowY:"scroll",borderTop:`1px solid ${o.primary.dark}`,scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),children:a(lt,{items:t})})]})},ft=({children:e})=>{const{color:n}=E();return b(H,{children:[b("div",{css:l({display:"grid",width:"100%",height:"100vh",gridTemplateRows:"2.5rem 1fr auto"}),children:[a("div",{css:l({height:"100%"}),children:a(it,{})}),a("div",{css:l({height:"100%",display:"flex",justifyContent:"center"}),children:e}),a("div",{css:l({height:"100%"}),children:a(dt,{})})]}),a(xe,{styles:l({"*":{boxSizing:"border-box",margin:0,padding:0},"ul, ol":{margin:0,padding:0,listStyleType:"none"},body:{background:n.background.main,color:n.text,margin:0,padding:0}})})]})},pt=()=>{const e=R(z),n=v(z);return u.exports.useLayoutEffect(()=>{he().catch(s=>{console.error(s)});const t=new URLSearchParams(window.location.hash.substring(1)).get("as")||"host";n(t==="host"?"host":"guest")},[]),P(ft,{children:e==="host"?P(Ye,{}):P(at,{})})},mt=({children:e})=>a(Ae,{children:e});function gt(e={}){const{immediate:n=!1,onNeedRefresh:o,onOfflineReady:t,onRegistered:s,onRegisterError:r}=e;let c;const i=async(d=!0)=>{};return"serviceWorker"in navigator&&(c=new ke("/qr-webrtc/sw.js",{scope:"/qr-webrtc/"}),c.addEventListener("activated",d=>{d.isUpdate?window.location.reload():t==null||t()}),c.register({immediate:n}).then(d=>{s==null||s(d)}).catch(d=>{r==null||r(d)})),i}gt({onNeedRefresh(){}});De.render(P(U.StrictMode,{children:P(mt,{children:P(pt,{})})}),document.getElementById("root"));