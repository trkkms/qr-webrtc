import{a as ee,b as be,c as Y,u as C,r as d,n as te,d as E,t as W,l as j,s as k,e as ne,j as c,f as l,g as w,R as H,h as ve,F as M,i as Ce,k as oe,m as $,G as Se,o as F,P as xe,v as Ae,p as ke,q as De}from"./vendor.36d518d7.js";const _e=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};_e();const se=ee(!1),G=be("as","host",{replaceState:!0,serialize:e=>e,deserialize:e=>e==="host"?"host":"guest"}),re=Y([]),Be=()=>E(re),x=()=>{const e=C(re),n=o=>d.exports.useCallback(t=>{console[o==="info"||o==="success"?"log":o](t);const r=new Date,a=te();return e(i=>{i.unshift({message:t,timestamp:r,level:o,id:a})})},[]);return{info:n("info"),warn:n("warn"),error:n("error"),success:n("success")}},B=()=>{const e=E(G),n={main:"#282828",dark:"#000000",light:"#404040"},o={main:"#81d4fa",light:"#b6ffff",dark:"#4ba3c7",text:"#202020"},t={main:"#ffee58",light:"#ffff8b",dark:"#c9bc1f",text:"#202020"};return{color:{background:n,primary:e==="host"?o:t,secondary:e==="host"?t:o,text:"#E8E8E8"}}},K=(e,n,o,t,s)=>{"ontrack"in e?(t.info("set ontrack event"),e.ontrack=r=>{t.info("ontrack event detected");for(const a of r.streams){let i=new Audio;i.muted=!0,i.srcObject=a,i.addEventListener("canplaythrough",()=>{i=null}),n.createMediaStreamSource(a).connect(o),s(o.stream).then(()=>{t.info("update stream")})}}):(t.info("set onaddstream event"),e.onaddstream=r=>{t.info("onaddstream event detected");let a=new Audio;a.muted=!0,a.srcObject=r.stream,a.addEventListener("canplaythrough",()=>{a=null}),n.createMediaStreamSource(r.stream).connect(o),s(o.stream).then(()=>{t.info("update stream")})})},U=()=>{let e=()=>{};const n=new Promise(o=>{e=o});return[o=>e(o),()=>n]},Ee=W({type:j("acceptGuest"),guestId:k,others:ne(k)}),ae=W({type:j("offer"),from:k,to:k,sdp:k}),Re=W({type:j("acceptHost"),guestId:k,name:k,offers:ne(ae)}),ce=W({type:j("answer"),from:k,to:k,sdp:k}),Fe=(e,n,o,t)=>{const s=new Map,[r,a]=U();return n().then(async i=>{i.onmessage=async f=>{const u=JSON.parse(f.data);if(Ee.is(u)){t.info("accepted by host");const g=u.guestId;r(u.guestId);const h=[];for(const S of u.others){const b=new RTCPeerConnection({iceServers:[]});o(b),s.set(S,b),await b.setLocalDescription(await b.createOffer());const p=await new Promise(A=>{b.onicecandidate=v=>{!v.candidate&&b.localDescription&&A(b.localDescription.sdp)}});h.push({type:"offer",from:g,to:S,sdp:p})}const m={type:"acceptHost",guestId:g,offers:h,name:e};i.send(JSON.stringify(m))}if(ae.is(u)){t.info("received offer request");const g=await a(),h=new RTCPeerConnection({iceServers:[]});o(h),s.set(u.from,h),await h.setRemoteDescription({type:"offer",sdp:u.sdp}),await h.setLocalDescription(await h.createAnswer());const m=await new Promise(b=>{h.onicecandidate=p=>{!p.candidate&&h.localDescription&&b(h.localDescription.sdp)}}),S={type:"answer",from:g,to:u.from,sdp:m};i.send(JSON.stringify(S))}if(ce.is(u)){t.info("received answer");const g=s.get(u.from);if(g==null)return;await g.setRemoteDescription({type:"answer",sdp:u.sdp})}}}),{}},Pe=(e,n)=>(o,t)=>{if(Re.is(t)){n.info(`${t.guestId.slice(0,5)} / accepted by guest`);const s=e.get(t.guestId);if(s==null)return;s.setName(t.name);for(const r of t.offers){n.info(`${r.to.slice(0,5)} / sending offer`);const a=e.get(r.to);a!=null&&a.sendMessage(r)}}if(ce.is(t)){const s=e.get(t.to);if(n.info(`${t.to.slice(0,5)} / sending answer from ${t.from.slice(0,5)}`),s==null)return;s.sendMessage(t)}},Te=async(e,n,o)=>{const t=new Map,s=new AudioContext,r=s.createMediaStreamDestination(),a=await navigator.mediaDevices.getUserMedia({video:!1,audio:{echoCancellation:!0}});await e(r.stream);const i=()=>{const m=s.createOscillator();m.type="sine",m.frequency.value=440,m.connect(r),m.start()},f=Pe(t,n);return{createPeer:async()=>{const m=te(),[S,b]=U(),p=new RTCPeerConnection({iceServers:[]});p.onconnectionstatechange=()=>{n.info(`${m.slice(0,5)} / connection state change: ${p.connectionState}`),o()};const A=a;for(const D of A.getTracks())p.addTrack(D,A);const v=p.createDataChannel("host-to-guest"),[V,he]=U();v.onopen=()=>{n.info(`${m.slice(0,5)} / data channel established`),V(v)},v.onmessage=D=>{f(m,JSON.parse(D.data))},K(p,s,r,n,e),await p.setLocalDescription(await p.createOffer());const ye=await new Promise(D=>{p.onicecandidate=N=>{!N.candidate&&p.localDescription&&D(p.localDescription.sdp)}}),Z={id:m,sdp:ye,connect:async D=>{const N=new Promise(we=>{p.onconnectionstatechange=()=>{n.info(`${m.slice(0,5)} / connection state change: ${p.connectionState}`),o(),p.connectionState==="connected"&&we()}});return await p.setRemoteDescription({type:"answer",sdp:D}),N},close:()=>{p.close(),t.delete(m),o()},getConnectionState:()=>p.connectionState,sendMessage:async D=>{(await he()).send(JSON.stringify(D))},data:v,setName:S,getName:b};return t.set(m,Z),Z},getPeer:m=>t.get(m),getPeers:()=>t,oscillateLocal:i}},R=Y([]),ie=ee({}),Le=()=>{const e=C(ie);return d.exports.useCallback(()=>{e(Symbol())},[])},Ie=()=>{E(ie)},Me=({setService:e,setCurrentPeer:n,playAudio:o})=>{const{color:t}=B(),s=C(se),r=C(R),a=x(),i=Le();return c("div",{css:l({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:c("button",{type:"button",css:l({padding:"0.5rem 1rem",outline:"none",border:"none",background:t.primary.main,color:t.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const f=await Te(o,a,i),u=await f.createPeer();e(f),s(!0),n(u),r(g=>{g.push({stage:1,sdp:u.sdp})})},children:"\u63A5\u7D9A\u958B\u59CB"})})},ue=({audioRef:e})=>c("div",{children:c("audio",{autoPlay:!0,ref:e})});let y,le=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});le.decode();let q=null;function P(){return(q===null||q.buffer!==y.memory.buffer)&&(q=new Uint8Array(y.memory.buffer)),q}function X(e,n){return le.decode(P().subarray(e,e+n))}let T=0,z=new TextEncoder("utf-8");const Oe=typeof z.encodeInto=="function"?function(e,n){return z.encodeInto(e,n)}:function(e,n){const o=z.encode(e);return n.set(o),{read:e.length,written:o.length}};function Ne(e,n,o){if(o===void 0){const i=z.encode(e),f=n(i.length);return P().subarray(f,f+i.length).set(i),T=i.length,f}let t=e.length,s=n(t);const r=P();let a=0;for(;a<t;a++){const i=e.charCodeAt(a);if(i>127)break;r[s+a]=i}if(a!==t){a!==0&&(e=e.slice(a)),s=o(s,t,t=a+e.length*3);const i=P().subarray(s+a,s+t);a+=Oe(e,i).written}return T=a,s}let Q=null;function L(){return(Q===null||Q.buffer!==y.memory.buffer)&&(Q=new Int32Array(y.memory.buffer)),Q}function We(e,n){return P().subarray(e/1,e/1+n)}function je(e){try{const r=y.__wbindgen_add_to_stack_pointer(-16);var n=Ne(e,y.__wbindgen_malloc,y.__wbindgen_realloc),o=T;y.compress(r,n,o);var t=L()[r/4+0],s=L()[r/4+1];let a;return t!==0&&(a=We(t,s).slice(),y.__wbindgen_free(t,s*1)),a}finally{y.__wbindgen_add_to_stack_pointer(16)}}function de(e,n){const o=n(e.length*1);return P().set(e,o/1),T=e.length,o}function He(e,n){try{const a=y.__wbindgen_add_to_stack_pointer(-16);var o=de(e,y.__wbindgen_malloc),t=T;y.into_svg(a,o,t,n);var s=L()[a/4+0],r=L()[a/4+1];let i;return s!==0&&(i=X(s,r).slice(),y.__wbindgen_free(s,r*1)),i}finally{y.__wbindgen_add_to_stack_pointer(16)}}function fe(e){try{const r=y.__wbindgen_add_to_stack_pointer(-16);var n=de(e,y.__wbindgen_malloc),o=T;y.inflate(r,n,o);var t=L()[r/4+0],s=L()[r/4+1];let a;return t!==0&&(a=X(t,s).slice(),y.__wbindgen_free(t,s*1)),a}finally{y.__wbindgen_add_to_stack_pointer(16)}}async function $e(e,n){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,n)}catch(t){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t);else throw t}const o=await e.arrayBuffer();return await WebAssembly.instantiate(o,n)}else{const o=await WebAssembly.instantiate(e,n);return o instanceof WebAssembly.Instance?{instance:o,module:e}:o}}async function pe(e){typeof e=="undefined"&&(e=new URL("/qr-webrtc/assets/wasm_bg.8832fa6e.wasm",self.location));const n={};n.wbg={},n.wbg.__wbg_alert_f5393de24ed74e50=function(s,r){alert(X(s,r))},(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:o,module:t}=await $e(await e,n);return y=o.exports,pe.__wbindgen_wasm_module=t,y}const ge=({src:e,cacheKey:n})=>{const o=d.exports.useRef({}),t=x(),s=d.exports.useMemo(()=>{const r=o.current[n];if(r)return r;const a=He(e,300);return a===void 0?(t.error("QR Code creation failed for some reason."),""):(o.current[n]=a,a)},[e,n]);return d.exports.useEffect(()=>{console.log(`${n} generate:`),console.log(e)},[e,n]),c("div",{dangerouslySetInnerHTML:{__html:s}})},I=({backTitle:e,nextTitle:n,onBack:o,onNext:t})=>{const{color:s}=B();return w("ul",{css:l({display:"grid",gridTemplateColumns:"50% 50%",width:"100%",padding:"2rem",gap:"1rem",maxWidth:"400px"}),children:[e!=null&&c("li",{children:c("button",{type:"button",css:l({width:"100%",height:"2rem",border:"none",outline:"none",background:s.primary.main}),onClick:o,children:e})}),n&&c("li",{css:l({display:"flex",justifyContent:"center",alignItems:"center"}),children:c("button",{type:"button",css:l({width:"100%",height:"2rem",border:"none",outline:"none",background:s.primary.main}),onClick:t,children:n})})]})},_=({title:e,children:n})=>w("section",{css:l({display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%",padding:"1rem"}),children:[c("h2",{css:l({width:"100%",marginBottom:"1rem",fontSize:"larger"}),children:e}),n]}),me=(e,n,o,t,s)=>{const r=d.exports.useMemo(()=>{const a=je(e);if(a==null){o.error("Failed to compress sdp.");return}return new Uint8Array(a)},t);return d.exports.useMemo(()=>r==null?void 0:n===1?r.subarray(0,r.length/2):r.subarray(r.length/2),s)},Ge=H.memo(function({stage:n}){const o=C(R),[t,s]=d.exports.useState(1),r=x(),a=d.exports.useCallback(()=>{t===2?s(1):o(()=>[{stage:5}])},[t]),i=d.exports.useCallback(()=>{t===1?s(2):o(g=>{g.push({stage:2})})},[t]),f=t===1?"1.\u30AA\u30D5\u30A1\u30FC(\u524D\u534A)":"1.\u30AA\u30D5\u30A1\u30FC(\u5F8C\u534A)",u=me(n.sdp,t,r,[n],[n,t]);return w(_,{title:f,children:[u&&c("div",{css:l({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:c(ge,{src:u,cacheKey:`host-offer-${t}`})}),c("p",{css:l({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:c("span",{children:"\u63A5\u7D9A\u3059\u308B\u30B2\u30B9\u30C8\u306B\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002"})}),t===2&&c("p",{css:l({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:"\u300C\u6B21\u3078\u300D\u3092\u62BC\u3059\u3068\u30AB\u30E1\u30E9\u304C\u8D77\u52D5\u3057\u307E\u3059\u3002"}),c(I,{backTitle:t===2?"\u623B\u308B":"\u30B2\u30B9\u30C8\u4E00\u89A7",nextTitle:"\u6B21\u3078",onBack:a,onNext:i})]})}),J=({onResult:e})=>{const n=d.exports.useRef(null),o=x();return d.exports.useEffect(()=>{const s=(async()=>{const r=document.createElement("video"),a=n.current;if(a==null){o.error("Failed to get canvas element.");return}const i=a.getContext("2d");if(i==null){o.error("Failed to get canvas context");return}const f=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",width:{ideal:640},height:{ideal:480}}});return r.srcObject=f,await r.play(),requestAnimationFrame(function g(){const h=n.current;if(h==null||r.readyState!==r.HAVE_ENOUGH_DATA)return;h.width=r.videoWidth,h.height=r.videoHeight,i.drawImage(r,0,0,h.width,h.height);const m=i.getImageData(0,0,h.width,h.height),S=ve(m.data,m.width,m.height,{inversionAttempts:"dontInvert"});if(!S){requestAnimationFrame(g);return}e(S),f.getTracks().forEach(b=>{b.readyState==="live"&&b.stop()})}),f})().catch(r=>{o.error(`Cannot get video stream: ${String(r)}`)});return()=>{s.then(r=>{r&&r.getTracks().forEach(a=>{a.readyState==="live"&&a.stop()})})}},[]),c("div",{children:c("canvas",{ref:n})})},Ue=()=>{const[e,n]=d.exports.useState(void 0),o=C(R),t=d.exports.useCallback(a=>{console.log("answer1 received:"),console.log(a.binaryData),n(a.binaryData)},[]),s=d.exports.useCallback(()=>{o(a=>{a.pop()})},[]),r=d.exports.useCallback(()=>{e!=null&&o(a=>{a.push({stage:3,halfAnswer:e})})},[e]);return w(_,{title:"2.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&c(J,{onResult:t}),c(I,{backTitle:"\u623B\u308B",onBack:s,nextTitle:e!=null?"\u6B21\u3078":void 0,onNext:r})]})},qe=({stage:e})=>{const[n,o]=d.exports.useState(void 0),t=C(R),s=x(),r=d.exports.useCallback(i=>{console.log("answer2 received:"),console.log(i.binaryData);const f=fe(new Uint8Array([...e.halfAnswer.slice(5),...i.binaryData.slice(5)]));f!=null?(o(f),t(u=>{u.push({stage:4,sdp:f})})):s.error("Decoding SDP Failed")},[]),a=d.exports.useCallback(()=>{t(i=>{o(void 0),i.pop()})},[]);return w(_,{title:"3.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[n==null&&c(J,{onResult:r}),c(I,{backTitle:"\u623B\u308B",onBack:a})]})},ze=({stage:e,peer:n,service:o})=>{const t=x(),s=C(R);return d.exports.useEffect(()=>{(async()=>{await n.connect(e.sdp);const a={type:"acceptGuest",guestId:n.id,others:Array.from(o.getPeers().keys()).filter(i=>i!==n.id)};await n.sendMessage(a),s(()=>[{stage:5}])})().catch(a=>{t.error(`Failed to receive answer: ${String(a)}`)})},[]),c(_,{title:"4. \u63A5\u7D9A\u4E2D",children:c("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},Qe=({textP:e})=>{const[n,o]=d.exports.useState(void 0);return d.exports.useEffect(()=>{e.then(t=>{o(t)})},[]),c(M,{children:n!=null?n:""})},Je=({service:e})=>{const n=e.getPeers(),o=C(R);Ie();const{color:t}=B();return d.exports.useEffect(()=>{for(const s of n.values())s.getConnectionState()!=="connected"&&s.close()},[]),c(_,{title:"\u30B2\u30B9\u30C8\u4E00\u89A7",children:w("div",{children:[n.size===0&&c("p",{css:l({marginBottom:"5rem"}),children:"\u307E\u3060\u63A5\u7D9A\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}),c("div",{css:l({display:"flex",justifyContent:"center"}),children:c("button",{type:"button",css:l({border:"none",outline:"none",padding:"0.5rem 1rem",background:t.primary.main}),onClick:async()=>{const s=await e.createPeer();o(()=>[{stage:1,sdp:s.sdp}])},children:"\u65B0\u898F\u63A5\u7D9A"})}),n.size>0&&c("ol",{css:l({display:"flex",flexWrap:"wrap",padding:"1rem",width:"100%"}),children:[...n.values()].map(s=>w("li",{css:l({display:"flex",justifyContent:"space-between",width:"100%"}),children:[c("span",{css:l({marginRight:"1rem"}),children:s.id.slice(0,6)}),c("span",{css:l({marginRight:"1rem"}),children:c(Qe,{textP:s.getName()})}),c("span",{children:s.getConnectionState()}),c("button",{type:"button",css:l({border:"none",outline:"none",width:"2rem",background:t.secondary.dark}),onClick:()=>{s.close()},children:"\xD7"})]},s.id))})]})})},Ve=({service:e,peer:n})=>{const o=E(R),t=o[o.length-1];return t==null?null:t.stage===1?c(Ge,{stage:t}):t.stage===2?c(Ue,{}):t.stage===3?c(qe,{stage:t}):t.stage===4?c(ze,{service:e,stage:t,peer:n}):t.stage===5?c(Je,{service:e}):c(M,{})},Ye=()=>{const[e,n]=d.exports.useState(),[o,t]=d.exports.useState(),s=x(),r=d.exports.useRef(null),a=d.exports.useCallback(async i=>{if(r.current==null){s.warn("ignore playAudio() since no audio element found.");return}r.current.srcObject=i,await r.current.play(),r.current.volume=1},[]);return w("main",{css:l({width:"100%",height:"100%",maxWidth:1200}),children:[!e&&c(Me,{setService:n,setCurrentPeer:t,playAudio:a}),e&&o!=null&&c(Ve,{service:e,peer:o}),c(ue,{audioRef:r})]})},Ke=async(e,n,o)=>{const t=new AudioContext,s=t.createMediaStreamDestination(),r=await navigator.mediaDevices.getUserMedia({video:!1,audio:{echoCancellation:!0}});await e(s.stream);const[a,i]=U(),u=await(async()=>{const p=new RTCPeerConnection({iceServers:[]}),A=r;p.ondatachannel=v=>{n.info("data channel established"),a(v.channel)};for(const v of A.getTracks())p.addTrack(v);return K(p,t,s,n,e),p})(),g=async p=>{await u.setRemoteDescription({type:"offer",sdp:p});const A=await u.createAnswer();return await u.setLocalDescription(A),new Promise(v=>{u.onicecandidate=V=>{!V.candidate&&u.localDescription!=null&&v(u.localDescription.sdp)}})},h=p=>{u.onconnectionstatechange=()=>{u.connectionState==="connected"&&(n.info("connected to host"),p())}},S=Fe(o,i,p=>{const A=r.clone();for(const v of A.getTracks())p.addTrack(v);K(p,t,s,n,e)},n);return{host:u,createAnswer:g,setOnConnect:h,close:()=>u.close(),signalService:S}},Xe=Ce("guestName","\u306A\u306A\u3057\u3055\u3093"),O=Y([{stage:1}]),Ze=({setService:e,playAudio:n})=>{const o=x(),{color:t}=B(),[s,r]=oe(Xe);return c("div",{css:l({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:w("div",{css:l({width:"100%",padding:"2rem"}),children:[c("div",{css:l({display:"flex",width:"100%",justifyContent:"center",marginBottom:"3rem"}),children:c("input",{type:"text",css:l({outline:"none",border:"none",fontSize:"1rem",padding:"0.25rem 0.5rem",height:"3rem",width:"14rem"}),onChange:a=>{r(a.target.value)},value:s})}),c("div",{css:l({display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}),children:c("button",{type:"button",css:l({padding:"0.5rem 1rem",outline:"none",border:"none",background:t.primary.main,color:t.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const a=await Ke(n,o,s);e(a)},children:"\u63A5\u7D9A\u958B\u59CB"})})]})})},et=()=>{const[e,n]=d.exports.useState(void 0),o=C(O),t=d.exports.useCallback(r=>{console.log("offer1 received:"),console.log(r.binaryData),n(r.binaryData)},[]),s=d.exports.useCallback(()=>{e!=null&&o(r=>{r.push({stage:2,halfOffer:e})})},[e]);return w(_,{title:"1.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&c(J,{onResult:t}),e&&c(I,{nextTitle:"\u6B21\u3078",onNext:s})]})},tt=({stage:e,service:n})=>{const[o,t]=d.exports.useState(void 0),s=C(O),r=d.exports.useCallback(async i=>{console.log("offer2 received:"),console.log(i.binaryData);const f=fe(new Uint8Array([...e.halfOffer.slice(5),...i.binaryData.slice(5)]));if(console.log(f),t(f),f!=null){t(f);const u=await n.createAnswer(f);s(g=>{g.push({stage:3,sdp:u})})}},[]),a=d.exports.useCallback(()=>{t(void 0),s(i=>{i.pop()})},[]);return w(_,{title:"2.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[o==null&&c(J,{onResult:r}),c(I,{backTitle:"\u623B\u308B",onBack:a})]})},nt=({stage:e,service:n})=>{const o=C(O),[t,s]=d.exports.useState(1),r=x(),a=t===1?"3.\u30A2\u30F3\u30B5\u30FC(\u524D\u534A)":"3.\u30A2\u30F3\u30B5\u30FC(\u5F8C\u534A)",i=me(e.sdp,t,r,[e],[e,t]),f=d.exports.useCallback(()=>{t===1&&s(2)},[]),u=d.exports.useCallback(()=>{if(t===2){s(1);return}o(g=>{g.pop(),g.pop()})},[]);return d.exports.useLayoutEffect(()=>{n.setOnConnect(()=>{o(g=>{g.push({stage:4})})})},[]),w(_,{title:a,children:[i&&c("div",{css:l({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:c(ge,{src:i,cacheKey:`guest-answer-${t}`})}),c("p",{css:l({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:c("span",{children:`\u30DB\u30B9\u30C8\u306BQR\u30B3\u30FC\u30C9\u3092${t===2?"\u3082\u3046\u4E00\u5EA6":""}\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002`})}),c(I,{backTitle:"\u623B\u308B",nextTitle:t===1?"\u6B21\u3078":void 0,onNext:f,onBack:u})]})},ot=()=>{const e=C(O);return d.exports.useEffect(()=>{e(()=>[{stage:5}])},[]),c(_,{title:"4. \u63A5\u7D9A\u4E2D",children:c("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},st=({children:e})=>c("p",{css:l({fontSize:"smaller"}),children:e!=null?e:"This Component is not implemented yet."}),rt=({service:e})=>{const n=E(O),o=n[n.length-1];return o==null?null:o.stage===1?c(et,{}):o.stage===2?c(tt,{stage:o,service:e}):o.stage===3?c(nt,{stage:o,service:e}):o.stage===4?c(ot,{}):o.stage===5?c(st,{}):c(M,{})},at=()=>{const e=d.exports.useRef(null),n=x(),[o,t]=d.exports.useState(void 0),s=d.exports.useCallback(async r=>{if(e.current==null){n.warn("ignore playAudio() since no audio element found.");return}e.current.srcObject=r,await e.current.play(),e.current.volume=1},[]);return w("main",{css:l({width:"100%",height:"100%",maxWidth:1200}),children:[o==null&&c(Ze,{setService:t,playAudio:s}),o&&c(rt,{service:o}),c(ue,{audioRef:e})]})},ct=()=>{const[e,n]=oe(G),o=E(se),t=x(),{color:s}=B(),r=e==="host"?"\u30DB\u30B9\u30C8":"\u30B2\u30B9\u30C8",a=e==="host"?"\u30B2\u30B9\u30C8":"\u30DB\u30B9\u30C8";return c("button",{className:$({started:o}),css:l({width:"9rem",border:"none",outline:"none",padding:"0.125rem 0.5rem",background:`linear-gradient(135deg, ${s.primary.main} 50%, ${s.secondary.main} 50%)`,color:s.primary.text,"&.started":{background:s.background.dark,color:s.text}}),type:"button",onClick:()=>{if(o){t.warn("\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u958B\u59CB\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u30E2\u30FC\u30C9\u3092\u5909\u66F4\u3067\u304D\u307E\u305B\u3093\u3002");return}n(i=>i==="host"?"guest":"host")},disabled:o,children:o?c("span",{children:r}):w(M,{children:[c("span",{css:l({fontWeight:"bolder"}),children:`[${r}]`})," \u21D2 ",c("span",{children:a})]})})},it=()=>{const{color:e}=B();return w("header",{css:l({display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%",paddingLeft:"0.5rem",paddingRight:"1rem",background:e.background.light}),children:[c("span",{children:"QR WebRTC"}),c(ct,{})]})},ut=H.memo(function({item:n}){const{timestamp:o,level:t,message:s}=n,a=`${[o.getHours(),o.getMinutes(),o.getSeconds()].map(i=>i.toString(10).padStart(2,"0")).join(":")} [${t.toUpperCase()}] ${s}`;return c("li",{className:t,css:l({fontFamily:"monospace","&.info":{color:"#bdbdbd"},"&.warn":{color:"#ffa726"},"&.error":{color:"#ef5350"},"&.success":{color:"#29b6f6"}}),children:a})}),lt=H.memo(function({items:n}){return c("ul",{css:l({height:"100%",paddingLeft:"0.5rem"}),children:n.map(o=>c(ut,{item:o},o.id))})}),dt=()=>{const[e,n]=d.exports.useState(!1),{color:o}=B(),t=Be(),s=t.length>0&&t[t.length-1].level==="error";return d.exports.useEffect(()=>{s&&n(!0)},[s]),w("footer",{className:$({open:e}),css:l({display:"grid",height:"1.5rem",gridTemplateRows:"1.5rem 1fr",overflow:"hidden",transition:"all 0.5s","&.open":{height:"12rem"},background:o.background.dark,color:o.text}),children:[w("button",{type:"button",className:$({error:s}),css:l({display:"flex",justifyContent:"right",alignItems:"center",width:"100%",height:"100%",paddingRight:"1rem",border:"none",outline:"none",background:o.background.dark,color:o.text,"&.error":{background:"#b61827"}}),onClick:()=>n(r=>!r),children:[c("span",{css:l({marginRight:"0.75rem"}),children:"\u30ED\u30B0"}),c("span",{className:$({open:e}),css:l({display:"inline-block",height:"0.75rem",width:"0.75rem",borderLeft:"0.375rem solid transparent",borderBottom:"0.75rem solid white",borderRight:"0.375rem solid transparent",transition:"all 0.5s","&.open":{transform:"rotate(-180deg)"}})})]}),c("div",{css:l({height:"100%",overflowY:"scroll",borderTop:`1px solid ${o.primary.dark}`,scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),children:c(lt,{items:t})})]})},ft=({children:e})=>{const{color:n}=B();return w(M,{children:[w("div",{css:l({display:"grid",width:"100%",height:"100vh",gridTemplateRows:"2.5rem 1fr auto"}),children:[c("div",{css:l({height:"100%"}),children:c(it,{})}),c("div",{css:l({height:"100%",display:"flex",justifyContent:"center"}),children:e}),c("div",{css:l({height:"100%"}),children:c(dt,{})})]}),c(Se,{styles:l({"*":{boxSizing:"border-box",margin:0,padding:0},"ul, ol":{margin:0,padding:0,listStyleType:"none"},body:{background:n.background.main,color:n.text,margin:0,padding:0}})})]})},pt=()=>{const e=E(G),n=C(G);return d.exports.useLayoutEffect(()=>{pe().catch(s=>{console.error(s)});const t=new URLSearchParams(window.location.hash.substring(1)).get("as")||"host";n(t==="host"?"host":"guest")},[]),F(ft,{children:e==="host"?F(Ye,{}):F(at,{})})},gt=({children:e})=>c(xe,{children:e});function mt(e={}){const{immediate:n=!1,onNeedRefresh:o,onOfflineReady:t,onRegistered:s,onRegisterError:r}=e;let a,i;const f=async(u=!0)=>{u&&(a==null||a.addEventListener("controlling",g=>{g.isUpdate&&window.location.reload()})),i&&i.waiting&&await ke(i.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){a=new Ae("/qr-webrtc/sw.js",{scope:"/qr-webrtc/"}),a.addEventListener("activated",u=>{u.isUpdate||t==null||t()});{const u=()=>{o==null||o()};a.addEventListener("waiting",u),a.addEventListener("externalwaiting",u)}a.register({immediate:n}).then(u=>{i=u,s==null||s(u)}).catch(u=>{r==null||r(u)})}return f}mt();De.render(F(H.StrictMode,{children:F(gt,{children:F(pt,{})})}),document.getElementById("root"));
