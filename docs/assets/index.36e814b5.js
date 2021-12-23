import{a as se,b as Fe,c as Q,u as C,r as d,n as fe,d as T,t as V,l as J,s as D,e as me,j as a,f as u,g as h,R as Y,h as Re,i as M,F as $,k as Pe,m as K,G as Ie,o as N,P as Me,v as Le,p as $e,q as Ne}from"./vendor.9d411574.js";const Oe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};Oe();const re=se(!1),X=Fe("as","host",{replaceState:!0,serialize:e=>e,deserialize:e=>e==="host"?"host":"guest"}),pe=Q([]),We=()=>T(pe),A=()=>{const e=C(pe),t=n=>d.exports.useCallback(o=>{console[n==="info"||n==="success"?"log":n](o);const r=new Date,c=fe();return e(i=>{i.unshift({message:o,timestamp:r,level:n,id:c})})},[]);return{info:t("info"),warn:t("warn"),error:t("error"),success:t("success")}},ae=Q({mic:{volume:1,muted:!1},speaker:{volume:1,muted:!1}}),O=se(void 0),F=()=>{const e=T(X),t={main:"#282828",dark:"#000000",light:"#404040"},n={main:"#81d4fa",light:"#b6ffff",dark:"#4ba3c7",text:"#202020"},o={main:"#ffee58",light:"#ffff8b",dark:"#c9bc1f",text:"#202020"};return{color:{background:t,primary:e==="host"?n:o,secondary:e==="host"?o:n,text:"#E8E8E8"}}},R=e=>{let t=new Audio;t.muted=!0,t.srcObject=e,t.addEventListener("canplaythrough",()=>{t=null})},ce=(e,t,n,o,s)=>{"ontrack"in e?(o.info("set ontrack event"),e.ontrack=r=>{o.info("ontrack event detected");for(const c of r.streams)o.info("loop on stream"),R(c),t.createMediaStreamSource(c).connect(n),s(n.stream).then(()=>{o.info("update stream")})}):(o.info("set onaddstream event"),e.onaddstream=r=>{o.info("onaddstream event detected"),R(r.stream),t.createMediaStreamSource(r.stream).connect(n),s(n.stream).then(()=>{o.info("update stream")})})},ge=(e,t)=>{const n=e.createGain(),o=e.createMediaStreamDestination();return e.createMediaStreamSource(t).connect(n),n.connect(o),[c=>{n.gain.setValueAtTime(c,e.currentTime)},o.stream]},Z=async()=>await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",width:{ideal:640},height:{ideal:480}}}),q=()=>{let e=()=>{};const t=new Promise(n=>{e=n});return[n=>e(n),()=>t]},je=V({type:J("acceptGuest"),guestId:D,others:me(V({id:D,name:D}))}),he=V({type:J("offer"),from:D,name:D,to:D,sdp:D}),He=V({type:J("acceptHost"),guestId:D,name:D,offers:me(he)}),ye=V({type:J("answer"),from:D,to:D,sdp:D}),Ge=(e,t,n,o,s)=>{const r=new Map,[c,i]=q();return t().then(async m=>{m.onmessage=async f=>{const l=JSON.parse(f.data);if(je.is(l)){o.info("accepted by host");const p=l.guestId;c(l.guestId);const g=[];for(const k of l.others){const x=new RTCPeerConnection({iceServers:[]});n(x);const y={peer:x,id:k.id,name:k.name};r.set(k.id,y),await x.setLocalDescription(await x.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!1}));const P=await new Promise(I=>{x.onicecandidate=S=>{!S.candidate&&x.localDescription&&I(x.localDescription.sdp)}});g.push({type:"offer",from:p,to:k.id,name:e,sdp:P}),x.onconnectionstatechange=()=>{o.info(`connection state change to ${y.id}: ${x.connectionState}`),s()}}const b={type:"acceptHost",guestId:p,offers:g,name:e};m.send(JSON.stringify(b))}if(he.is(l)){o.info(`received offer from: ${l.from}`);const p=await i(),g=new RTCPeerConnection({iceServers:[]});n(g),r.set(l.from,{id:l.from,peer:g,name:l.name}),await g.setRemoteDescription({type:"offer",sdp:l.sdp}),await g.setLocalDescription(await g.createAnswer()),g.onconnectionstatechange=()=>{o.info(`connection state change to ${l.from}: ${g.connectionState}`),s()};const b=await new Promise(x=>{g.onicecandidate=y=>{!y.candidate&&g.localDescription&&x(g.localDescription.sdp)}}),k={type:"answer",from:p,to:l.from,sdp:b};m.send(JSON.stringify(k))}if(ye.is(l)){o.info(`received answer from ${l.from}`);const p=r.get(l.from);if(p==null)return;p.peer.onconnectionstatechange=()=>{o.info(`connection state change to ${l.from}: ${p.peer.connectionState}`),s()},await p.peer.setRemoteDescription({type:"answer",sdp:l.sdp})}}}),{peers:r}},Ue=(e,t)=>(n,o)=>{if(He.is(o)){t.info(`${o.guestId.slice(0,5)} / accepted by guest`);const s=e.get(o.guestId);if(s==null)return;s.setName(o.name);for(const r of o.offers){t.info(`${r.to.slice(0,5)} / sending offer`);const c=e.get(r.to);c!=null&&c.sendMessage(r)}}if(ye.is(o)){const s=e.get(o.to);if(t.info(`${o.to.slice(0,5)} / sending answer from ${o.from.slice(0,5)}`),s==null)return;s.sendMessage(o)}},Ve=async(e,t,n)=>{const o=new Map,s=new AudioContext,r=s.createMediaStreamDestination(),c=await navigator.mediaDevices.getUserMedia({video:!1,audio:{latency:.01,echoCancellation:!0}});R(c);const[i,m]=ge(s,c);await e(r.stream);const f=Ue(o,t);return{createPeer:async()=>{const b=fe(),[k,x]=q(),y=new RTCPeerConnection({iceServers:[]}),P=m.clone();R(P);for(const E of P.getTracks())y.addTrack(E,P);ce(y,s,r,t,e),y.onconnectionstatechange=()=>{t.info(`${b.slice(0,5)} / connection state change: ${y.connectionState}`),n()};const I=y.createDataChannel("host-to-guest"),[S,v]=q();I.onopen=()=>{t.info(`${b.slice(0,5)} / data channel established`),S(I)},I.onmessage=E=>{f(b,JSON.parse(E.data))},await y.setLocalDescription(await y.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!1}));const B=await new Promise(E=>{y.onicecandidate=z=>{!z.candidate&&y.localDescription&&E(y.localDescription.sdp)}}),le={id:b,sdp:B,connect:async E=>{const z=new Promise(Te=>{y.onconnectionstatechange=()=>{t.info(`${b.slice(0,5)} / connection state change: ${y.connectionState}`),n(),y.connectionState==="connected"&&Te()}});return await y.setRemoteDescription({type:"answer",sdp:E}),z},close:()=>{y.close(),o.delete(b),n()},getConnectionState:()=>y.connectionState,sendMessage:async E=>{(await v()).send(JSON.stringify(E))},data:I,setName:k,getName:x};return o.set(b,le),le},getPeer:b=>o.get(b),getPeers:()=>o,changeVolume:i}},L=Q([]),we=se({}),be=()=>{const e=C(we);return d.exports.useCallback(()=>{e(Symbol())},[])},ve=()=>{T(we)},qe=({setService:e,setCurrentPeer:t,playAudio:n})=>{const{color:o}=F(),s=C(re),r=C(L),c=A(),i=be();return a("div",{css:u({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:a("button",{type:"button",css:u({padding:"0.5rem 1rem",outline:"none",border:"none",background:o.primary.main,color:o.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const m=await Ve(n,c,i),f=await m.createPeer();e(m),s(!0),t(f),r(l=>{console.log("offer sdp:",f.sdp),l.push({stage:1,sdp:f.sdp})})},children:"\u63A5\u7D9A\u958B\u59CB"})})},Se=({audioRef:e})=>{const t=T(ae);return d.exports.useEffect(()=>{e.current&&(e.current.volume=t.speaker.muted?0:t.speaker.volume)},[t.speaker.volume,t.speaker.muted]),a("div",{children:a("audio",{autoPlay:!0,ref:e})})};let w,Ce=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});Ce.decode();let ee=null;function W(){return(ee===null||ee.buffer!==w.memory.buffer)&&(ee=new Uint8Array(w.memory.buffer)),ee}function ie(e,t){return Ce.decode(W().subarray(e,e+t))}let j=0,te=new TextEncoder("utf-8");const ze=typeof te.encodeInto=="function"?function(e,t){return te.encodeInto(e,t)}:function(e,t){const n=te.encode(e);return t.set(n),{read:e.length,written:n.length}};function Qe(e,t,n){if(n===void 0){const i=te.encode(e),m=t(i.length);return W().subarray(m,m+i.length).set(i),j=i.length,m}let o=e.length,s=t(o);const r=W();let c=0;for(;c<o;c++){const i=e.charCodeAt(c);if(i>127)break;r[s+c]=i}if(c!==o){c!==0&&(e=e.slice(c)),s=n(s,o,o=c+e.length*3);const i=W().subarray(s+c,s+o);c+=ze(e,i).written}return j=c,s}let ne=null;function H(){return(ne===null||ne.buffer!==w.memory.buffer)&&(ne=new Int32Array(w.memory.buffer)),ne}function Je(e,t){return W().subarray(e/1,e/1+t)}function Ye(e){try{const r=w.__wbindgen_add_to_stack_pointer(-16);var t=Qe(e,w.__wbindgen_malloc,w.__wbindgen_realloc),n=j;w.compress(r,t,n);var o=H()[r/4+0],s=H()[r/4+1];let c;return o!==0&&(c=Je(o,s).slice(),w.__wbindgen_free(o,s*1)),c}finally{w.__wbindgen_add_to_stack_pointer(16)}}function xe(e,t){const n=t(e.length*1);return W().set(e,n/1),j=e.length,n}function Ke(e,t){try{const c=w.__wbindgen_add_to_stack_pointer(-16);var n=xe(e,w.__wbindgen_malloc),o=j;w.into_svg(c,n,o,t);var s=H()[c/4+0],r=H()[c/4+1];let i;return s!==0&&(i=ie(s,r).slice(),w.__wbindgen_free(s,r*1)),i}finally{w.__wbindgen_add_to_stack_pointer(16)}}function Ae(e){try{const r=w.__wbindgen_add_to_stack_pointer(-16);var t=xe(e,w.__wbindgen_malloc),n=j;w.inflate(r,t,n);var o=H()[r/4+0],s=H()[r/4+1];let c;return o!==0&&(c=ie(o,s).slice(),w.__wbindgen_free(o,s*1)),c}finally{w.__wbindgen_add_to_stack_pointer(16)}}async function Xe(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(o){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",o);else throw o}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}else{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}async function ke(e){typeof e=="undefined"&&(e=new URL("/qr-webrtc-dev/assets/wasm_bg.37a669e8.wasm",self.location));const t={};t.wbg={},t.wbg.__wbg_alert_f5393de24ed74e50=function(s,r){alert(ie(s,r))},(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:o}=await Xe(await e,t);return w=n.exports,ke.__wbindgen_wasm_module=o,w}const De=({src:e,cacheKey:t})=>{const n=d.exports.useRef({}),o=A(),s=d.exports.useMemo(()=>{const r=n.current[t];if(r)return r;const c=Ke(e,300);return c===void 0?(o.error("QR Code creation failed for some reason."),""):(n.current[t]=c,c)},[e,t]);return d.exports.useEffect(()=>{console.log(`${t} generate:`),console.log(e)},[e,t]),a("div",{dangerouslySetInnerHTML:{__html:s}})},G=({backTitle:e,nextTitle:t,onBack:n,onNext:o})=>{const{color:s}=F();return h("ul",{css:u({display:"grid",gridTemplateColumns:"50% 50%",width:"100%",padding:"2rem",gap:"1rem",maxWidth:"400px"}),children:[e!=null&&a("li",{children:a("button",{type:"button",css:u({width:"100%",height:"2rem",border:"none",outline:"none",background:s.primary.main}),onClick:n,children:e})}),t&&a("li",{css:u({display:"flex",justifyContent:"center",alignItems:"center"}),children:a("button",{type:"button",css:u({width:"100%",height:"2rem",border:"none",outline:"none",background:s.primary.main}),onClick:o,children:t})})]})},_=({title:e,children:t})=>h("section",{css:u({display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%",padding:"1rem"}),children:[a("h2",{css:u({width:"100%",marginBottom:"1rem",fontSize:"larger"}),children:e}),t]}),_e=(e,t,n,o,s)=>{const r=d.exports.useMemo(()=>{const c=Ye(e);if(c==null){n.error("Failed to compress sdp.");return}return new Uint8Array(c)},o);return d.exports.useMemo(()=>(console.log("original bytes",new Blob([e]).size),console.log("compressed",r),r==null?void 0:t===1?r.subarray(0,r.length/2):r.subarray(r.length/2)),s)},Ze=Y.memo(function({stage:t}){const n=C(L),[o,s]=d.exports.useState(1),r=A(),c=C(O),i=d.exports.useCallback(()=>{o===2?s(1):n(()=>[{stage:5}])},[o]),m=d.exports.useCallback(async()=>{o===1?s(2):(c(await Z()),n(p=>{p.push({stage:2})}))},[o]),f=o===1?"1.\u30AA\u30D5\u30A1\u30FC(\u524D\u534A)":"1.\u30AA\u30D5\u30A1\u30FC(\u5F8C\u534A)",l=_e(t.sdp,o,r,[t],[t,o]);return h(_,{title:f,children:[l&&a("div",{css:u({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:a(De,{src:l,cacheKey:`host-offer-${o}`})}),a("p",{css:u({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:a("span",{children:"\u63A5\u7D9A\u3059\u308B\u30B2\u30B9\u30C8\u306B\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002"})}),o===2&&a("p",{css:u({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:"\u300C\u6B21\u3078\u300D\u3092\u62BC\u3059\u3068\u30AB\u30E1\u30E9\u304C\u8D77\u52D5\u3057\u307E\u3059\u3002"}),a(G,{backTitle:o===2?"\u623B\u308B":"\u30B2\u30B9\u30C8\u4E00\u89A7",nextTitle:"\u6B21\u3078",onBack:i,onNext:m})]})}),oe=({onResult:e,stream:t})=>{const n=d.exports.useRef(null),o=A();return d.exports.useEffect(()=>{const r=(async()=>{const c=document.createElement("video"),i=n.current;if(i==null){o.error("Failed to get canvas element.");return}const m=i.getContext("2d");if(m==null){o.error("Failed to get canvas context");return}return c.srcObject=t,await c.play(),requestAnimationFrame(function l(){const p=n.current;if(p==null||c.readyState!==c.HAVE_ENOUGH_DATA)return;p.width=c.videoWidth,p.height=c.videoHeight,m.drawImage(c,0,0,p.width,p.height);const g=m.getImageData(0,0,p.width,p.height),b=Re(g.data,g.width,g.height,{inversionAttempts:"dontInvert"});if(!b){requestAnimationFrame(l);return}e(b),t.getTracks().forEach(k=>{k.readyState==="live"&&k.stop()})}),t})().catch(c=>{o.error(`Cannot get video stream: ${String(c)}`)});return()=>{r.then(c=>{c&&c.getTracks().forEach(i=>{i.readyState==="live"&&i.stop()})})}},[]),a("div",{css:u({width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}),children:a("canvas",{css:u({width:"80%"}),ref:n})})},et=()=>{const[e,t]=d.exports.useState(void 0),n=C(L),[o,s]=M(O),r=A(),c=d.exports.useCallback(f=>{r.info("answer1 received:"),s(void 0),t(f.binaryData)},[]),i=d.exports.useCallback(()=>{n(f=>{f.pop()})},[]),m=d.exports.useCallback(async()=>{e!=null&&(s(await Z()),n(f=>{f.push({stage:3,halfAnswer:e})}))},[e]);return h(_,{title:"2.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&o&&a(oe,{onResult:c,stream:o}),a(G,{backTitle:"\u623B\u308B",onBack:i,nextTitle:e!=null?"\u6B21\u3078":void 0,onNext:m})]})},tt=({stage:e})=>{const[t,n]=d.exports.useState(void 0),o=C(L),[s,r]=M(O),c=A(),i=d.exports.useCallback(f=>{c.info("answer2 received:"),r(void 0);const l=Ae(new Uint8Array([...e.halfAnswer,...f.binaryData]));l!=null?(n(l),o(p=>{p.push({stage:4,sdp:l})})):c.error("Decoding SDP Failed")},[]),m=d.exports.useCallback(()=>{o(f=>{n(void 0),f.pop()})},[]);return h(_,{title:"3.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[t==null&&s&&a(oe,{onResult:i,stream:s}),a(G,{backTitle:"\u623B\u308B",onBack:m})]})},nt=({stage:e,peer:t,service:n})=>{const o=A(),s=C(L);return console.log("here"),d.exports.useEffect(()=>{(async()=>{await t.connect(e.sdp);const c={type:"acceptGuest",guestId:t.id,others:await Promise.all(Array.from(n.getPeers().values()).filter(i=>i.id!==t.id).map(async i=>({id:i.id,name:await i.getName()})))};await t.sendMessage(c),s(()=>[{stage:5}])})().catch(c=>{o.error(`Failed to receive answer: ${String(c)}`)})},[]),a(_,{title:"4. \u63A5\u7D9A\u4E2D",children:a("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},ot=({textP:e})=>{const[t,n]=d.exports.useState(void 0);return d.exports.useEffect(()=>{e.then(o=>{n(o)})},[]),a($,{children:t!=null?t:""})},st=({service:e,setCurrentPeer:t})=>{const n=e.getPeers(),o=C(L);ve();const{color:s}=F();return d.exports.useEffect(()=>{for(const r of n.values())r.getConnectionState()!=="connected"&&r.close()},[]),a(_,{title:"\u30B2\u30B9\u30C8\u4E00\u89A7",children:h("div",{children:[n.size===0&&a("p",{css:u({marginBottom:"5rem"}),children:"\u307E\u3060\u63A5\u7D9A\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}),a("div",{css:u({display:"flex",justifyContent:"center"}),children:a("button",{type:"button",css:u({border:"none",outline:"none",padding:"0.5rem 1rem",background:s.primary.main}),onClick:async()=>{const r=await e.createPeer();t(r),o(()=>[{stage:1,sdp:r.sdp}])},children:"\u65B0\u898F\u63A5\u7D9A"})}),n.size>0&&a("ol",{css:u({display:"flex",flexWrap:"wrap",padding:"1rem",width:"100%"}),children:[...n.values()].map(r=>h("li",{css:u({display:"flex",justifyContent:"space-between",width:"100%"}),children:[a("span",{css:u({marginRight:"1rem"}),children:r.id.slice(0,6)}),a("span",{css:u({marginRight:"1rem"}),children:a(ot,{textP:r.getName()})}),a("span",{children:r.getConnectionState()}),a("button",{type:"button",css:u({border:"none",outline:"none",width:"2rem",background:s.secondary.dark}),onClick:()=>{r.close()},children:"\xD7"})]},r.id))})]})})},rt=({service:e,peer:t,setCurrentPeer:n})=>{const o=T(L),s=o[o.length-1];return s==null?null:s.stage===1?a(Ze,{stage:s}):s.stage===2?a(et,{}):s.stage===3?a(tt,{stage:s}):s.stage===4?a(nt,{service:e,stage:s,peer:t}):s.stage===5?a(st,{service:e,setCurrentPeer:n}):a($,{})},Be=({service:e})=>{const t=T(ae);return d.exports.useEffect(()=>{e.changeVolume(t.mic.muted?0:t.mic.volume)},[t.mic.volume,t.mic.muted]),a($,{})},at=()=>{const[e,t]=d.exports.useState(),[n,o]=d.exports.useState(),s=A(),r=d.exports.useRef(null),c=d.exports.useCallback(async i=>{if(r.current==null){s.warn("ignore playAudio() since no audio element found.");return}r.current.srcObject=i,await r.current.play()},[]);return h("main",{css:u({width:"100%",height:"100%",maxWidth:1200}),children:[!e&&a(qe,{setService:t,setCurrentPeer:o,playAudio:c}),e&&n!=null&&a(rt,{service:e,peer:n,setCurrentPeer:o}),a(Se,{audioRef:r}),e&&a(Be,{service:e})]})},ct=async(e,t,n,o)=>{const s=new AudioContext,r=s.createMediaStreamDestination(),c=await navigator.mediaDevices.getUserMedia({video:!1,audio:{latency:.01,echoCancellation:!0}});R(c);const[i,m]=ge(s,c);R(m),await e(r.stream);const[f,l]=q(),[p,g]=q(),b=async()=>{const S=new RTCPeerConnection({iceServers:[]}),v=m.clone();R(v);for(const B of v.getTracks())S.addTrack(B,v);return ce(S,s,r,t,e),S.onconnectionstatechange=()=>{t.info(`host connection state change: ${S.connectionState}`)},S.ondatachannel=B=>{t.info("data channel established"),f(B.channel)},p(S),S},k=async S=>{const v=await g();await v.setRemoteDescription({type:"offer",sdp:S});const B=await v.createAnswer();return await v.setLocalDescription(B),new Promise(ue=>{v.onicecandidate=de=>{!de.candidate&&v.localDescription!=null&&ue(v.localDescription.sdp)}})},x=async S=>{const v=await g();v.onconnectionstatechange=()=>{v.connectionState==="connected"&&(t.info("connected to host"),S())}},P=Ge(n,l,S=>{const v=m.clone();R(v);for(const B of v.getTracks())S.addTrack(B,v);ce(S,s,r,t,e)},t,o);return{createAnswer:k,setOnConnect:x,close:async()=>(await g()).close(),signalService:P,createHostPeer:b,changeVolume:i}},it=Pe("guestName","\u306A\u306A\u3057\u3055\u3093"),U=Q([]),ut=({setService:e,playAudio:t})=>{const n=A(),{color:o}=F(),s=C(re),[r,c]=M(it),i=C(U),m=be(),f=C(O);return a("div",{css:u({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:h("div",{css:u({width:"100%",padding:"2rem"}),children:[a("div",{css:u({display:"flex",width:"100%",justifyContent:"center",marginBottom:"3rem"}),children:a("input",{type:"text",css:u({outline:"none",border:"none",fontSize:"1rem",padding:"0.25rem 0.5rem",height:"3rem",width:"14rem"}),onChange:l=>{c(l.target.value)},value:r})}),a("div",{css:u({display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}),children:a("button",{type:"button",css:u({padding:"0.5rem 1rem",outline:"none",border:"none",background:o.primary.main,color:o.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const l=await ct(t,n,r,m);e(l),s(!0),f(await Z()),i(p=>{p.push({stage:1})})},children:"\u63A5\u7D9A\u958B\u59CB"})})]})})},dt=()=>{const[e,t]=d.exports.useState(void 0),n=C(U),o=A(),s=d.exports.useCallback(async m=>{o.info("offer1 received:"),c(void 0),t(m.binaryData)},[]),[r,c]=M(O),i=d.exports.useCallback(async()=>{e!=null&&(c(await Z()),n(m=>{m.push({stage:2,halfOffer:e})}))},[e]);return h(_,{title:"1.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&r&&a(oe,{onResult:s,stream:r}),e&&a(G,{nextTitle:"\u6B21\u3078",onNext:i})]})},lt=({stage:e,service:t})=>{const[n,o]=d.exports.useState(void 0),s=C(U),r=A(),[c,i]=M(O),m=d.exports.useCallback(async l=>{r.info("offer2 received:"),i(void 0);const p=Ae(new Uint8Array([...e.halfOffer,...l.binaryData]));if(o(p),p!=null){o(p),await t.createHostPeer();const g=await t.createAnswer(p);s(b=>{console.log("answer sdp:",g),b.push({stage:3,sdp:g})})}},[]),f=d.exports.useCallback(()=>{o(void 0),s(l=>{l.pop()})},[]);return h(_,{title:"2.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[n==null&&c&&a(oe,{onResult:m,stream:c}),a(G,{backTitle:"\u623B\u308B",onBack:f})]})},ft=({stage:e,service:t})=>{const n=C(U),[o,s]=d.exports.useState(1),r=A(),c=o===1?"3.\u30A2\u30F3\u30B5\u30FC(\u524D\u534A)":"3.\u30A2\u30F3\u30B5\u30FC(\u5F8C\u534A)",i=_e(e.sdp,o,r,[e],[e,o]),m=d.exports.useCallback(()=>{o===1&&s(2)},[]),f=d.exports.useCallback(()=>{if(o===2){s(1);return}n(l=>{l.pop(),l.pop()})},[]);return d.exports.useLayoutEffect(()=>{t.setOnConnect(()=>{n(l=>{l.push({stage:4})})})},[]),h(_,{title:c,children:[i&&a("div",{css:u({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:a(De,{src:i,cacheKey:`guest-answer-${o}`})}),a("p",{css:u({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:a("span",{children:`\u30DB\u30B9\u30C8\u306BQR\u30B3\u30FC\u30C9\u3092${o===2?"\u3082\u3046\u4E00\u5EA6":""}\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002`})}),a(G,{backTitle:"\u623B\u308B",nextTitle:o===1?"\u6B21\u3078":void 0,onNext:m,onBack:f})]})},mt=()=>{const e=C(U);return console.log("here"),d.exports.useEffect(()=>{e(()=>[{stage:5}])},[]),a(_,{title:"4. \u63A5\u7D9A\u4E2D",children:a("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},pt=({service:e})=>{const t=e.signalService.peers;return ve(),a(_,{title:"\u63A5\u7D9A\u4E00\u89A7",children:h("ol",{children:[a("li",{children:"\u30DB\u30B9\u30C8"}),Array.from(t.values()).map(n=>a("li",{children:`${n.id.slice(0,6)} ${n.name}`},n.id))]})})},gt=({service:e})=>{const t=T(U),n=t[t.length-1];return n==null?null:n.stage===1?a(dt,{}):n.stage===2?a(lt,{stage:n,service:e}):n.stage===3?a(ft,{stage:n,service:e}):n.stage===4?a(mt,{}):n.stage===5?a(pt,{service:e}):a($,{})},ht=()=>{const e=d.exports.useRef(null),t=A(),[n,o]=d.exports.useState(void 0),s=d.exports.useCallback(async r=>{if(e.current==null){t.warn("ignore playAudio() since no audio element found.");return}e.current.srcObject=r,await e.current.play()},[]);return h("main",{css:u({width:"100%",height:"100%",maxWidth:1200}),children:[n==null&&a(ut,{setService:o,playAudio:s}),n&&a(gt,{service:n}),a(Se,{audioRef:e}),n&&a(Be,{service:n})]})},yt=()=>{const[e,t]=M(X),n=T(re),o=A(),{color:s}=F(),r=e==="host"?"\u30DB\u30B9\u30C8":"\u30B2\u30B9\u30C8",c=e==="host"?"\u30B2\u30B9\u30C8":"\u30DB\u30B9\u30C8";return a("button",{className:K({started:n}),css:u({width:"9rem",border:"none",outline:"none",padding:"0.125rem 0.5rem",background:`linear-gradient(135deg, ${s.primary.main} 50%, ${s.secondary.main} 50%)`,color:s.primary.text,"&.started":{background:s.background.dark,color:s.text}}),type:"button",onClick:()=>{if(n){o.warn("\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u958B\u59CB\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u30E2\u30FC\u30C9\u3092\u5909\u66F4\u3067\u304D\u307E\u305B\u3093\u3002");return}t(i=>i==="host"?"guest":"host")},disabled:n,children:n?a("span",{children:r}):h($,{children:[a("span",{css:u({fontWeight:"bolder"}),children:`[${r}]`})," \u21D2 ",a("span",{children:c})]})})},wt=()=>{const{color:e}=F(),[t,n]=d.exports.useState("");return d.exports.useEffect(()=>{const o=Array.from(document.getElementsByTagName("script"));for(const s of o){const r=/index\.([^.]+)\.js$/.exec(s.src);if(r){n(r[1]);break}}},[]),h("header",{css:u({display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%",paddingLeft:"0.5rem",paddingRight:"1rem",background:e.background.light}),children:[h("span",{children:["QR WebRTC",t?` -${t}`:""]}),a(yt,{})]})},bt=Y.memo(function({item:t}){const{timestamp:n,level:o,message:s}=t,c=`${[n.getHours(),n.getMinutes(),n.getSeconds()].map(i=>i.toString(10).padStart(2,"0")).join(":")} [${o.toUpperCase()}] ${s}`;return a("li",{className:o,css:u({fontFamily:"monospace","&.info":{color:"#bdbdbd"},"&.warn":{color:"#ffa726"},"&.error":{color:"#ef5350"},"&.success":{color:"#29b6f6"}}),children:c})}),vt=Y.memo(function({items:t}){return a("ul",{css:u({height:"100%",paddingLeft:"0.5rem"}),children:t.map(n=>a(bt,{item:n},n.id))})}),Ee=({value:e,setValue:t,onMuteClick:n,icon:o})=>h("div",{css:u({display:"block"}),children:[a("input",{type:"range",step:.01,min:0,max:1,value:e,onChange:s=>{t(s.currentTarget.value)}}),a("button",{css:u({outline:"none",border:"none",background:"transparent"}),type:"button",onClick:n,children:o})]}),St=()=>{const[e,t]=M(ae);return h("div",{css:u({display:"flex",alignItems:"center",justifyContent:"space-around",width:"100%"}),children:[a("div",{css:u({display:"block"}),children:a(Ee,{value:e.mic.volume,onMuteClick:()=>{t(n=>{n.mic.muted=!n.mic.muted})},setValue:n=>{t(o=>{o.mic.volume=Number(n)})},icon:e.mic.muted?"\u{1F515}":"\u{1F3A4}"})}),a("div",{css:u({display:"block"}),children:a(Ee,{value:e.speaker.volume,onMuteClick:()=>{t(n=>{n.speaker.muted=!n.speaker.muted})},setValue:n=>{t(o=>{o.speaker.volume=Number(n)})},icon:e.speaker.muted?"\u{1F507}":"\u{1F50A}"})})]})},Ct=()=>{const[e,t]=d.exports.useState(!1),{color:n}=F(),o=We(),s=o.length>0&&o[o.length-1].level==="error";return d.exports.useEffect(()=>{s&&t(!0)},[s]),h("footer",{className:K({open:e}),css:u({display:"grid",height:"3.5rem",gridTemplateRows:"2rem 1.5rem 1fr",overflow:"hidden",transition:"all 0.5s","&.open":{height:"12rem"},background:n.background.dark,color:n.text}),children:[a("div",{css:u({display:"flex",alignItems:"center",borderBottom:`1px solid ${n.primary.dark}`,width:"100%"}),children:a(St,{})}),h("button",{type:"button",className:K({error:s}),css:u({display:"flex",justifyContent:"right",alignItems:"center",width:"100%",height:"100%",paddingRight:"1rem",border:"none",outline:"none",background:n.background.dark,color:n.text,"&.error":{background:"#b61827"}}),onClick:()=>t(r=>!r),children:[a("span",{css:u({marginRight:"0.75rem"}),children:"\u30ED\u30B0"}),a("span",{className:K({open:e}),css:u({display:"inline-block",height:"0.75rem",width:"0.75rem",borderLeft:"0.375rem solid transparent",borderBottom:"0.75rem solid white",borderRight:"0.375rem solid transparent",transition:"all 0.5s","&.open":{transform:"rotate(-180deg)"}})})]}),a("div",{css:u({height:"100%",overflowY:"scroll",borderTop:`1px solid ${n.primary.dark}`,scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),children:a(vt,{items:o})})]})},xt=({children:e})=>{const{color:t}=F();return h($,{children:[h("div",{css:u({display:"grid",width:"100%",height:"100%",gridTemplateRows:"2.5rem 1fr auto"}),children:[a("div",{css:u({height:"100%"}),children:a(wt,{})}),a("div",{css:u({height:"100%",display:"flex",justifyContent:"center"}),children:e}),a("div",{css:u({height:"100%"}),children:a(Ct,{})})]}),a(Ie,{styles:u({"html, body, #root":{height:"100%"},"*":{boxSizing:"border-box",margin:0,padding:0},"ul, ol":{margin:0,padding:0,listStyleType:"none"},body:{background:t.background.main,color:t.text,margin:0,padding:0}})})]})},At=()=>{const e=T(X),t=C(X);return d.exports.useLayoutEffect(()=>{ke().catch(s=>{console.error(s)});const o=new URLSearchParams(window.location.hash.substring(1)).get("as")||"host";t(o==="host"?"host":"guest")},[]),N(xt,{children:e==="host"?N(at,{}):N(ht,{})})},kt=({children:e})=>a(Me,{children:e});function Dt(e={}){const{immediate:t=!1,onNeedRefresh:n,onOfflineReady:o,onRegistered:s,onRegisterError:r}=e;let c,i;const m=async(f=!0)=>{f&&(c==null||c.addEventListener("controlling",l=>{l.isUpdate&&window.location.reload()})),i&&i.waiting&&await $e(i.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){c=new Le("/qr-webrtc-dev/sw.js",{scope:"/qr-webrtc-dev/"}),c.addEventListener("activated",f=>{f.isUpdate||o==null||o()});{const f=()=>{n==null||n()};c.addEventListener("waiting",f),c.addEventListener("externalwaiting",f)}c.register({immediate:t}).then(f=>{i=f,s==null||s(f)}).catch(f=>{r==null||r(f)})}return m}Dt();Ne.render(N(Y.StrictMode,{children:N(kt,{children:N(At,{})})}),document.getElementById("root"));
