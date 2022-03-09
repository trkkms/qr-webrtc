var Ve=Object.defineProperty;var we=Object.getOwnPropertySymbols;var ze=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable;var ve=(e,t,n)=>t in e?Ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ie=(e,t)=>{for(var n in t||(t={}))ze.call(t,n)&&ve(e,n,t[n]);if(we)for(var n of we(t))qe.call(t,n)&&ve(e,n,t[n]);return e};import{a as ue,b as Qe,c as Z,u as k,r as d,n as Se,d as L,t as J,l as ee,s as B,e as Ce,j as s,f as u,g as h,h as K,F as D,R as te,i as Je,k as Ke,m as de,G as Ye,o as j,P as Xe,v as Ze,p as et,q as tt}from"./vendor.890c8c1f.js";const nt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}};nt();const le=ue(!1),ne=Qe("as","host",{replaceState:!0,serialize:e=>e,deserialize:e=>e==="host"?"host":"guest"}),ke=Z([]),ot=()=>L(ke),A=()=>{const e=k(ke),t=n=>d.exports.useCallback(o=>{console[n==="info"||n==="success"?"log":n](o);const c=new Date,a=Se();return e(i=>{i.unshift({message:o,timestamp:c,level:n,id:a})})},[]);return{info:t("info"),warn:t("warn"),error:t("error"),success:t("success")}},fe=Z({mic:{volume:1,muted:!1},speaker:{volume:1,muted:!1,unlockLimit:!1}});ue(void 0);const T=()=>{const e=L(ne),t={main:"#282828",dark:"#000000",light:"#404040"},n={main:"#81d4fa",light:"#b6ffff",dark:"#4ba3c7",text:"#202020"},o={main:"#ffee58",light:"#ffff8b",dark:"#c9bc1f",text:"#202020"};return{color:{background:t,primary:e==="host"?n:o,secondary:e==="host"?o:n,alert:{main:"#ff8a65",light:"#ffbb93",dark:"#c75b39",text:"#202020"},text:"#E8E8E8"}}},P=e=>{let t=new Audio;t.muted=!0,t.srcObject=e,t.addEventListener("canplaythrough",()=>{t=null})},me=(e,t,n,o,r,c,a)=>{"ontrack"in e?(r.info("set ontrack event"),e.ontrack=i=>{r.info("ontrack event detected");for(const m of i.streams)r.info("loop on stream"),P(m),t.createMediaStreamSource(m).connect(n),c(o.stream).then(()=>{r.info("update stream")})}):(r.info("set onaddstream event"),e.onaddstream=i=>{r.info("onaddstream event detected"),P(i.stream),t.createMediaStreamSource(i.stream).connect(n),c(o.stream).then(()=>{r.info("update stream")})})},xe=(e,t)=>{const n=e.createGain(),o=e.createMediaStreamDestination();return e.createMediaStreamSource(t).connect(n),n.connect(o),[a=>{n.gain.setValueAtTime(a,e.currentTime)},o.stream]},rt=async()=>await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",width:{ideal:640},height:{ideal:480}}}),H=()=>{let e=()=>{};const t=new Promise(n=>{e=n});return[n=>e(n),()=>t]},st=J({type:ee("acceptGuest"),guestId:B,others:Ce(J({id:B,name:B}))}),Ae=J({type:ee("offer"),from:B,name:B,to:B,sdp:B}),ct=J({type:ee("acceptHost"),guestId:B,name:B,offers:Ce(Ae)}),De=J({type:ee("answer"),from:B,to:B,sdp:B}),at=(e,t,n,o,r)=>{const c=new Map,[a,i]=H();return t().then(async m=>{m.onmessage=async l=>{const f=JSON.parse(l.data);if(st.is(f)){o.info("accepted by host");const b=f.guestId;a(f.guestId);const C=[];for(const w of f.others){const S=new RTCPeerConnection({iceServers:[]});n(S);const _={peer:S,id:w.id,name:w.name};c.set(w.id,_),await S.setLocalDescription(await S.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!1}));const N=await new Promise(ae=>{S.onicecandidate=Y=>{!Y.candidate&&S.localDescription&&ae(S.localDescription.sdp)}});C.push({type:"offer",from:b,to:w.id,name:e,sdp:N}),S.onconnectionstatechange=()=>{o.info(`connection state change to ${_.id}: ${S.connectionState}`),r()}}const F={type:"acceptHost",guestId:b,offers:C,name:e};m.send(JSON.stringify(F))}if(Ae.is(f)){o.info(`received offer from: ${f.from}`);const b=await i(),C=new RTCPeerConnection({iceServers:[]});n(C),c.set(f.from,{id:f.from,peer:C,name:f.name}),await C.setRemoteDescription({type:"offer",sdp:f.sdp}),await C.setLocalDescription(await C.createAnswer()),C.onconnectionstatechange=()=>{o.info(`connection state change to ${f.from}: ${C.connectionState}`),r()};const F=await new Promise(S=>{C.onicecandidate=_=>{!_.candidate&&C.localDescription&&S(C.localDescription.sdp)}}),w={type:"answer",from:b,to:f.from,sdp:F};m.send(JSON.stringify(w))}if(De.is(f)){o.info(`received answer from ${f.from}`);const b=c.get(f.from);if(b==null)return;b.peer.onconnectionstatechange=()=>{o.info(`connection state change to ${f.from}: ${b.peer.connectionState}`),r()},await b.peer.setRemoteDescription({type:"answer",sdp:f.sdp})}}}),{peers:c}},it=(e,t)=>(n,o)=>{if(ct.is(o)){t.info(`${o.guestId.slice(0,5)} / accepted by guest`);const r=e.get(o.guestId);if(r==null)return;r.setName(o.name);for(const c of o.offers){t.info(`${c.to.slice(0,5)} / sending offer`);const a=e.get(c.to);a!=null&&a.sendMessage(c)}}if(De.is(o)){const r=e.get(o.to);if(t.info(`${o.to.slice(0,5)} / sending answer from ${o.from.slice(0,5)}`),r==null)return;r.sendMessage(o)}},ut=async(e,t,n)=>{const o=new Map,r=new AudioContext,c=r.createGain(),a=r.createMediaStreamDestination();c.connect(a);const i=r.createMediaStreamDestination(),m=await navigator.mediaDevices.getUserMedia({video:!1,audio:{latency:.01,echoCancellation:!0}}),[l,f]=H();P(m);const b=m.clone();P(b),r.createMediaStreamSource(b).connect(i);const[F,w]=xe(r,m),S=async p=>{t.info(`speaker volume set to ${p}`),!(p<=1)&&(c.gain.value=p,await e(a.stream))};await e(a.stream);const _=it(o,t);return{createPeer:async()=>{const p=Se(),[g,R]=H(),v=new RTCPeerConnection({iceServers:[]}),$=w.clone();P($);for(const E of $.getTracks())v.addTrack(E,$);me(v,r,c,a,t,e),v.onconnectionstatechange=()=>{t.info(`${p.slice(0,5)} / connection state change: ${v.connectionState}`),n()};const x=v.createDataChannel("host-to-guest"),[X,ye]=H();x.onopen=()=>{t.info(`${p.slice(0,5)} / data channel established`),X(x)},x.onmessage=E=>{_(p,JSON.parse(E.data))},await v.setLocalDescription(await v.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!1}));const be=await new Promise(E=>{v.onicecandidate=I=>{!I.candidate&&v.localDescription&&E(v.localDescription.sdp)}}),O={id:p,sdp:be,connect:async E=>{const I=new Promise(Ue=>{v.onconnectionstatechange=()=>{t.info(`${p.slice(0,5)} / connection state change: ${v.connectionState}`),n(),v.connectionState==="connected"&&Ue()}});return await v.setRemoteDescription({type:"answer",sdp:E}),I},close:()=>{v.close(),o.delete(p),n()},getConnectionState:()=>v.connectionState,sendMessage:async E=>{(await ye()).send(JSON.stringify(E))},data:x,setName:g,getName:R};return o.set(p,O),O},getPeer:p=>o.get(p),getPeers:()=>o,changeVolume:F,startRecording:()=>{const p=i.stream.clone();P(p);const g=r.createMediaStreamSource(p);g.connect(i);const R=i.stream;l(g);const[v,$]=MediaRecorder.isTypeSupported("audio/mp4")?["mp4","audio/mp4"]:["webm","audio/webm"],x=new MediaRecorder(R,{mimeType:$,audioBitsPerSecond:64e3}),X=[];return x.ondataavailable=O=>{X.push(O.data)},x.start(1e3),{stopRecording:()=>{x.pause()},save:()=>{const O=new Blob(X,{type:$}),E=URL.createObjectURL(O),I=document.createElement("a");I.download=`recorded.${v}`,I.href=E,I.target="_blank",I.click()},clear:async()=>{(x.state==="paused"||x.state==="recording")&&(x.stop(),(await f()).disconnect(i))},getRecordState:()=>x.state,pause:()=>{x.pause()},resume:()=>{x.resume()}}},changeSpeakerVolume:S}},W=Z([]),Be=ue({}),_e=()=>{const e=k(Be);return d.exports.useCallback(()=>{e(Symbol())},[])},Re=()=>{L(Be)},dt=({setService:e,setCurrentPeer:t,playAudio:n})=>{const{color:o}=T(),r=k(le),c=k(W),a=A(),i=_e();return s("div",{css:u({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:s("button",{type:"button",css:u({padding:"0.5rem 1rem",outline:"none",border:"none",background:o.primary.main,color:o.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const m=await ut(n,a,i),l=await m.createPeer();e(m),r(!0),t(l),c(f=>{f.push({stage:1,sdp:l.sdp})})},children:"\u63A5\u7D9A\u958B\u59CB"})})},Ee=({audioRef:e})=>{const t=L(fe);return d.exports.useEffect(()=>{if(e.current){const n=t.speaker.volume>1?1:t.speaker.volume;e.current.volume=t.speaker.muted?0:n}},[t.speaker.volume,t.speaker.muted]),s("div",{children:s("audio",{autoPlay:!0,ref:e})})};let y,Fe=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});Fe.decode();let oe=null;function G(){return(oe===null||oe.buffer!==y.memory.buffer)&&(oe=new Uint8Array(y.memory.buffer)),oe}function pe(e,t){return Fe.decode(G().subarray(e,e+t))}let U=0,re=new TextEncoder("utf-8");const lt=typeof re.encodeInto=="function"?function(e,t){return re.encodeInto(e,t)}:function(e,t){const n=re.encode(e);return t.set(n),{read:e.length,written:n.length}};function ft(e,t,n){if(n===void 0){const i=re.encode(e),m=t(i.length);return G().subarray(m,m+i.length).set(i),U=i.length,m}let o=e.length,r=t(o);const c=G();let a=0;for(;a<o;a++){const i=e.charCodeAt(a);if(i>127)break;c[r+a]=i}if(a!==o){a!==0&&(e=e.slice(a)),r=n(r,o,o=a+e.length*3);const i=G().subarray(r+a,r+o);a+=lt(e,i).written}return U=a,r}let se=null;function V(){return(se===null||se.buffer!==y.memory.buffer)&&(se=new Int32Array(y.memory.buffer)),se}function mt(e,t){return G().subarray(e/1,e/1+t)}function pt(e){try{const c=y.__wbindgen_add_to_stack_pointer(-16);var t=ft(e,y.__wbindgen_malloc,y.__wbindgen_realloc),n=U;y.compress(c,t,n);var o=V()[c/4+0],r=V()[c/4+1];let a;return o!==0&&(a=mt(o,r).slice(),y.__wbindgen_free(o,r*1)),a}finally{y.__wbindgen_add_to_stack_pointer(16)}}function Te(e,t){const n=t(e.length*1);return G().set(e,n/1),U=e.length,n}function ht(e,t){try{const a=y.__wbindgen_add_to_stack_pointer(-16);var n=Te(e,y.__wbindgen_malloc),o=U;y.into_svg(a,n,o,t);var r=V()[a/4+0],c=V()[a/4+1];let i;return r!==0&&(i=pe(r,c).slice(),y.__wbindgen_free(r,c*1)),i}finally{y.__wbindgen_add_to_stack_pointer(16)}}function Pe(e){try{const c=y.__wbindgen_add_to_stack_pointer(-16);var t=Te(e,y.__wbindgen_malloc),n=U;y.inflate(c,t,n);var o=V()[c/4+0],r=V()[c/4+1];let a;return o!==0&&(a=pe(o,r).slice(),y.__wbindgen_free(o,r*1)),a}finally{y.__wbindgen_add_to_stack_pointer(16)}}async function gt(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(o){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",o);else throw o}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}else{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}async function Me(e){typeof e=="undefined"&&(e=new URL("/qr-webrtc/assets/wasm_bg.5810598b.wasm",self.location));const t={};t.wbg={},t.wbg.__wbg_alert_f5393de24ed74e50=function(r,c){alert(pe(r,c))},(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:o}=await gt(await e,t);return y=n.exports,Me.__wbindgen_wasm_module=o,y}const Ie=({src:e,cacheKey:t})=>{const n=d.exports.useRef({}),o=A(),r=d.exports.useMemo(()=>{const c=n.current[t];if(c)return c;const a=ht(e,300);return a===void 0?(o.error("QR Code creation failed for some reason."),""):(n.current[t]=a,a)},[e,t]);return d.exports.useEffect(()=>{},[e,t]),s("div",{dangerouslySetInnerHTML:{__html:r}})},z=({backTitle:e,nextTitle:t,onBack:n,onNext:o})=>{const{color:r}=T();return h("ul",{css:u({display:"grid",gridTemplateColumns:"50% 50%",width:"100%",padding:"2rem",gap:"1rem",maxWidth:"400px"}),children:[e!=null&&s("li",{children:s("button",{type:"button",css:u({width:"100%",height:"2rem",border:"none",outline:"none",background:r.primary.main}),onClick:n,children:e})}),t&&s("li",{css:u({display:"flex",justifyContent:"center",alignItems:"center"}),children:s("button",{type:"button",css:u({width:"100%",height:"2rem",border:"none",outline:"none",background:r.primary.main}),onClick:o,children:t})})]})},M=({title:e,children:t})=>h("section",{css:u({display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%",padding:"1rem"}),children:[s("h2",{css:u({width:"100%",marginBottom:"1rem",fontSize:"larger"}),children:e}),t]}),Le=(e,t,n,o,r)=>{const c=d.exports.useMemo(()=>{const a=pt(e);if(a==null){n.error("Failed to compress sdp.");return}return new Uint8Array(a)},o);return d.exports.useMemo(()=>c==null?void 0:t===1?c.subarray(0,c.length/2):c.subarray(c.length/2),r)},q=({count:e,titles:t})=>{const n=T();return s(D,{children:s("ol",{css:u({listStyleType:"none",position:"relative",margin:"20px 0 0",padding:0,display:"flex",flexWrap:"wrap",justifyContent:"space-between","& > li":{position:"relative",textAlign:"center",width:"24%",color:"#B0B0B0",fontWeight:"bold",counterIncrement:"steps",fontSize:"small"},"& > li:before":{display:"block",width:"26px",height:"26px",margin:"7px auto 20px auto",lineHeight:"26px",fontSize:"12px",textAlign:"center",borderRadius:"50%",backgroundColor:"#808080",content:"counter(steps)"},"& > li:after":{position:"absolute",zIndex:-1,top:"15px",left:"-50%",width:"100%",height:"2px",content:'""',backgroundColor:"#808080"},"& > li:first-of-type:after":{content:"none"},"& > li.active:before":{backgroundColor:n.color.primary.main,color:n.color.primary.text},"& > li.complete:before":{backgroundColor:n.color.primary.main,color:n.color.primary.text},"& > li.active:after":{backgroundColor:n.color.primary.main},"& > li.complete:after":{backgroundColor:n.color.primary.main}}),children:t.map((o,r)=>{const c=r<e;return s("li",{className:K({active:r===e,complete:c}),children:o},o)})})})},yt=te.memo(function({stage:t}){const n=k(W),[o,r]=d.exports.useState(1),c=A(),a=d.exports.useCallback(()=>{o===2?r(1):n(()=>[{stage:5}])},[o]),i=d.exports.useCallback(async()=>{o===1?r(2):n(f=>{f.push({stage:2})})},[o]),m=o===1?"1.\u30AA\u30D5\u30A1\u30FC(\u524D\u534A)":"2.\u30AA\u30D5\u30A1\u30FC(\u5F8C\u534A)",l=Le(t.sdp,o,c,[t],[t,o]);return h(D,{children:[s(q,{count:o-1,titles:he}),h(M,{title:m,children:[l&&s("div",{css:u({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:s(Ie,{src:l,cacheKey:`host-offer-${o}`})}),s("p",{css:u({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:s("span",{children:"\u63A5\u7D9A\u3059\u308B\u30B2\u30B9\u30C8\u306B\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002"})}),o===2&&s("p",{css:u({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:"\u300C\u6B21\u3078\u300D\u3092\u62BC\u3059\u3068\u30AB\u30E1\u30E9\u304C\u8D77\u52D5\u3057\u307E\u3059\u3002"}),s(z,{backTitle:o===2?"\u623B\u308B":"\u30B2\u30B9\u30C8\u4E00\u89A7",nextTitle:"\u6B21\u3078",onBack:a,onNext:i})]})]})}),ce=({onResult:e})=>{const t=d.exports.useRef(null),n=d.exports.useRef(null),o=A(),[r,c]=d.exports.useState(void 0),{color:a}=T();return d.exports.useEffect(()=>{const m=(async()=>{if(!r)return;const l=n.current;if(!l)return;const f=t.current;if(f==null){o.error("Failed to get canvas element.");return}const b=f.getContext("2d");if(b==null){o.error("Failed to get canvas context");return}return requestAnimationFrame(function F(){const w=t.current;if(w==null)return;if(l.readyState!==l.HAVE_ENOUGH_DATA){setTimeout(()=>{F()},200);return}w.width=l.videoWidth,w.height=l.videoHeight,b.drawImage(l,0,0,w.width,w.height);const S=b.getImageData(0,0,w.width,w.height),_=Je(S.data,S.width,S.height,{inversionAttempts:"dontInvert"});if(!_){requestAnimationFrame(F);return}e(_),r.getTracks().forEach(N=>{N.readyState==="live"&&N.stop()})}),r})().catch(l=>{o.error(`Cannot get video stream: ${String(l)}`)});return()=>{m.then(l=>{l&&l.getTracks().forEach(f=>{f.readyState==="live"&&f.stop()})})}},[r]),h("div",{css:u({width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}),children:[s("video",{css:u({display:"block",width:"80%"}),ref:n,autoPlay:!0,muted:!0,playsInline:!0}),s("div",{css:u({width:"100%"}),children:s("canvas",{css:u({display:"none",width:"100%"}),ref:t})}),s("div",{css:u({width:"100%",display:"flex",justifyContent:"center"}),children:!r&&s("button",{css:u({width:"50%",height:"2rem",border:"none",outline:"none",background:a.primary.main}),onClick:()=>{rt().then(i=>{o.info("stream acquired."),n.current&&(o.info("attached to video."),n.current.srcObject=i,n.current.play().then(()=>{o.info("video started")})),c(i)})},children:"\u30AB\u30E1\u30E9\u3092\u8D77\u52D5\u3059\u308B"})})]})},bt=()=>{const[e,t]=d.exports.useState(void 0),n=k(W),o=A(),r=d.exports.useCallback(i=>{o.info("answer1 received:"),t(i.binaryData)},[]),c=d.exports.useCallback(()=>{n(i=>{i.pop()})},[]),a=d.exports.useCallback(async()=>{e!=null&&n(i=>{i.push({stage:3,halfAnswer:e})})},[e]);return h(D,{children:[s(q,{count:2,titles:he}),h(M,{title:"3.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&s(ce,{onResult:r}),s(z,{backTitle:"\u623B\u308B",onBack:c,nextTitle:e!=null?"\u6B21\u3078":void 0,onNext:a})]})]})},wt=({stage:e})=>{const[t,n]=d.exports.useState(void 0),o=k(W),r=A(),c=d.exports.useCallback(i=>{r.info("answer2 received:");const m=Pe(new Uint8Array([...e.halfAnswer,...i.binaryData]));m!=null?(n(m),o(l=>{l.push({stage:4,sdp:m})})):r.error("Decoding SDP Failed")},[]),a=d.exports.useCallback(()=>{o(i=>{n(void 0),i.pop()})},[]);return h(D,{children:[s(q,{count:2,titles:he}),h(M,{title:"4.\u30A2\u30F3\u30B5\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[t==null&&s(ce,{onResult:c}),s(z,{backTitle:"\u623B\u308B",onBack:a})]})]})},vt=({stage:e,peer:t,service:n})=>{const o=A(),r=k(W);return d.exports.useEffect(()=>{(async()=>{await t.connect(e.sdp);const a={type:"acceptGuest",guestId:t.id,others:await Promise.all(Array.from(n.getPeers().values()).filter(i=>i.id!==t.id).map(async i=>({id:i.id,name:await i.getName()})))};await t.sendMessage(a),r(()=>[{stage:5}])})().catch(a=>{o.error(`Failed to receive answer: ${String(a)}`)})},[]),s(M,{title:"5. \u63A5\u7D9A\u4E2D",children:s("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},St=({textP:e})=>{const[t,n]=d.exports.useState(void 0);return d.exports.useEffect(()=>{e.then(o=>{n(o)})},[]),s(D,{children:t!=null?t:""})},Ct=({service:e,setCurrentPeer:t})=>{const n=e.getPeers(),[o,r]=d.exports.useState(void 0),c=k(W);Re();const{color:a}=T();return d.exports.useEffect(()=>{for(const i of n.values())i.getConnectionState()!=="connected"&&i.close()},[]),h(M,{title:"\u30B2\u30B9\u30C8\u4E00\u89A7",children:[h("div",{children:[n.size===0&&s("p",{css:u({marginBottom:"5rem"}),children:"\u307E\u3060\u63A5\u7D9A\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}),s("div",{css:u({display:"flex",justifyContent:"center"}),children:s("button",{type:"button",css:u({border:"none",outline:"none",padding:"0.5rem 1rem",background:a.primary.main}),onClick:async()=>{const i=await e.createPeer();t(i),c(()=>[{stage:1,sdp:i.sdp}])},children:"\u65B0\u898F\u63A5\u7D9A"})}),n.size>0&&s("ol",{css:u({display:"flex",flexWrap:"wrap",padding:"1rem",width:"100%"}),children:[...n.values()].map(i=>h("li",{css:u({display:"flex",justifyContent:"space-between",width:"100%"}),children:[s("span",{css:u({marginRight:"1rem"}),children:i.id.slice(0,6)}),s("span",{css:u({marginRight:"1rem"}),children:s(St,{textP:i.getName()})}),s("span",{children:i.getConnectionState()}),s("button",{type:"button",css:u({border:"none",outline:"none",width:"2rem",background:a.secondary.dark}),onClick:()=>{i.close()},children:"\xD7"})]},i.id))})]}),h("div",{css:u({display:"none",justifyContent:"center",width:"100%"}),children:[s("button",{type:"button",css:u({border:"none",outline:"none",padding:"0.5rem 1rem",background:a.primary.main}),onClick:()=>{if(o==null){const i=e.startRecording();r(i);return}o.getRecordState()==="paused"&&(o.resume(),r(ie({},o))),o.getRecordState()==="recording"&&(o.pause(),r(ie({},o)))},children:o?"\u9332\u97F3\u505C\u6B62":"\u9332\u97F3\u958B\u59CB"}),o&&s("button",{type:"button",css:u({border:"none",outline:"none",padding:"0.5rem 1rem",background:a.primary.main}),onClick:()=>{o.clear(),r(void 0)},children:"\u30AF\u30EA\u30A2"}),o&&o.getRecordState()==="paused"&&s("button",{type:"button",css:u({border:"none",outline:"none",padding:"0.5rem 1rem",background:a.primary.main}),onClick:()=>{o.save()},children:"\u4FDD\u5B58"})]})]})},kt=({service:e,peer:t,setCurrentPeer:n})=>{const o=L(W),r=o[o.length-1];return r==null?null:r.stage===1?s(yt,{stage:r}):r.stage===2?s(bt,{}):r.stage===3?s(wt,{stage:r}):r.stage===4?s(vt,{service:e,stage:r,peer:t}):r.stage===5?s(Ct,{service:e,setCurrentPeer:n}):s(D,{})},he=["\u9001\u4FE1(\u524D\u534A)","\u9001\u4FE1(\u5F8C\u534A)","\u53D7\u4FE1(\u524D\u534A)","\u53D7\u4FE1(\u5F8C\u534A)"],$e=({service:e})=>{const t=L(fe);return d.exports.useEffect(()=>{e.changeVolume(t.mic.muted?0:t.mic.volume)},[t.mic.volume,t.mic.muted]),d.exports.useEffect(()=>{e.changeSpeakerVolume(t.mic.muted?0:t.mic.volume)},[t.speaker.volume,t.speaker.muted]),s(D,{})},xt=()=>{const[e,t]=d.exports.useState(),[n,o]=d.exports.useState(),r=A(),c=d.exports.useRef(null),a=d.exports.useCallback(async i=>{if(c.current==null){r.warn("ignore playAudio() since no audio element found.");return}c.current.srcObject=i,await c.current.play()},[]);return h("main",{css:u({width:"100%",height:"100%",maxWidth:1200}),children:[!e&&s(dt,{setService:t,setCurrentPeer:o,playAudio:a}),e&&n!=null&&s(kt,{service:e,peer:n,setCurrentPeer:o}),s(Ee,{audioRef:c}),e&&s($e,{service:e})]})},At=async(e,t,n,o)=>{const r=new AudioContext,c=r.createGain(),a=r.createMediaStreamDestination();c.connect(a);const i=await navigator.mediaDevices.getUserMedia({video:!1,audio:{latency:.01,echoCancellation:!0}});P(i);const[m,l]=xe(r,i),f=async p=>{t.info(`speaker volume set to ${p}`),!(p<=1)&&(c.gain.value=p,await e(a.stream))};P(l),await e(a.stream);const[b,C]=H(),[F,w]=H(),S=async()=>{const p=new RTCPeerConnection({iceServers:[]}),g=l.clone();P(g);for(const R of g.getTracks())p.addTrack(R,g);return me(p,r,c,a,t,e),p.onconnectionstatechange=()=>{t.info(`host connection state change: ${p.connectionState}`)},p.ondatachannel=R=>{t.info("data channel established"),b(R.channel)},F(p),p},_=async p=>{const g=await w();await g.setRemoteDescription({type:"offer",sdp:p});const R=await g.createAnswer();return await g.setLocalDescription(R),new Promise(v=>{g.onicecandidate=$=>{!$.candidate&&g.localDescription!=null&&v(g.localDescription.sdp)}})},N=async p=>{const g=await w();g.onconnectionstatechange=()=>{g.connectionState==="connected"&&(t.info("connected to host"),p())}},Y=at(n,C,p=>{const g=l.clone();P(g);for(const R of g.getTracks())p.addTrack(R,g);me(p,r,c,a,t,e)},t,o);return{createAnswer:_,setOnConnect:N,close:async()=>(await w()).close(),signalService:Y,createHostPeer:S,changeVolume:m,changeSpeakerVolume:f}},ge=["\u53D7\u4FE1(\u524D\u534A)","\u53D7\u4FE1(\u5F8C\u534A)","\u9001\u4FE1(\u524D\u534A)","\u9001\u4FE1(\u5F8C\u534A)"],Dt=Ke("guestName","\u306A\u306A\u3057\u3055\u3093"),Q=Z([]),Bt=({setService:e,playAudio:t})=>{const n=A(),{color:o}=T(),r=k(le),[c,a]=de(Dt),i=k(Q),m=_e();return s("div",{css:u({display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}),children:h("div",{css:u({width:"100%",padding:"2rem"}),children:[s("div",{css:u({display:"flex",width:"100%",justifyContent:"center",marginBottom:"3rem"}),children:s("input",{type:"text",css:u({outline:"none",border:"none",fontSize:"1rem",padding:"0.25rem 0.5rem",height:"3rem",width:"14rem"}),onChange:l=>{a(l.target.value)},value:c})}),s("div",{css:u({display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}),children:s("button",{type:"button",css:u({padding:"0.5rem 1rem",outline:"none",border:"none",background:o.primary.main,color:o.primary.text,fontSize:"1.5rem",width:"14rem"}),onClick:async()=>{const l=await At(t,n,c,m);e(l),r(!0),i(f=>{f.push({stage:1})})},children:"\u63A5\u7D9A\u958B\u59CB"})})]})})},_t=()=>{const[e,t]=d.exports.useState(void 0),n=k(Q),o=A(),r=d.exports.useCallback(async a=>{o.info("offer1 received:"),t(a.binaryData)},[]),c=d.exports.useCallback(async()=>{e!=null&&n(a=>{a.push({stage:2,halfOffer:e})})},[e]);return h(D,{children:[s(q,{count:0,titles:ge}),h(M,{title:"1.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u524D\u534A)",children:[e==null&&s(ce,{onResult:r}),e&&s(z,{nextTitle:"\u6B21\u3078",onNext:c})]})]})},Rt=({stage:e,service:t})=>{const[n,o]=d.exports.useState(void 0),r=k(Q),c=A(),a=d.exports.useCallback(async m=>{c.info("offer2 received:");const l=Pe(new Uint8Array([...e.halfOffer,...m.binaryData]));if(o(l),l!=null){o(l),await t.createHostPeer();const f=await t.createAnswer(l);r(b=>{b.push({stage:3,sdp:f})})}},[]),i=d.exports.useCallback(()=>{o(void 0),r(m=>{m.pop()})},[]);return h(D,{children:[s(q,{count:1,titles:ge}),h(M,{title:"2.\u30AA\u30D5\u30A1\u30FC\u53D7\u4FE1(\u5F8C\u534A)",children:[n==null&&s(ce,{onResult:a}),s(z,{backTitle:"\u623B\u308B",onBack:i})]})]})},Et=({stage:e,service:t})=>{const n=k(Q),[o,r]=d.exports.useState(1),c=A(),a=o===1?"3.\u30A2\u30F3\u30B5\u30FC(\u524D\u534A)":"4.\u30A2\u30F3\u30B5\u30FC(\u5F8C\u534A)",i=Le(e.sdp,o,c,[e],[e,o]),m=d.exports.useCallback(()=>{o===1&&r(2)},[]),l=d.exports.useCallback(()=>{if(o===2){r(1);return}n(f=>{f.pop(),f.pop()})},[]);return d.exports.useLayoutEffect(()=>{t.setOnConnect(()=>{n(f=>{f.push({stage:4})})})},[]),h(D,{children:[s(q,{count:1+o,titles:ge}),h(M,{title:a,children:[i&&s("div",{css:u({display:"flex",justifyContent:"center",width:"100%",marginBottom:"1rem"}),children:s(Ie,{src:i,cacheKey:`guest-answer-${o}`})}),s("p",{css:u({width:"100%",fontFamily:"monospace",paddingLeft:"1rem"}),children:s("span",{children:`\u30DB\u30B9\u30C8\u306BQR\u30B3\u30FC\u30C9\u3092${o===2?"\u3082\u3046\u4E00\u5EA6":""}\u63D0\u793A\u3057\u3066\u304F\u3060\u3055\u3044\u3002`})}),s(z,{backTitle:"\u623B\u308B",nextTitle:o===1?"\u6B21\u3078":void 0,onNext:m,onBack:l})]})]})},Ft=()=>{const e=k(Q);return d.exports.useEffect(()=>{e(()=>[{stage:5}])},[]),s(M,{title:"5. \u63A5\u7D9A\u4E2D",children:s("p",{children:"\u63A5\u7D9A\u4E2D\u3067\u3059..."})})},Tt=({service:e})=>{const t=e.signalService.peers;return Re(),s(M,{title:"\u63A5\u7D9A\u4E00\u89A7",children:h("ol",{children:[s("li",{children:"\u30DB\u30B9\u30C8"}),Array.from(t.values()).map(n=>s("li",{children:`${n.id.slice(0,6)} ${n.name}`},n.id))]})})},Pt=({service:e})=>{const t=L(Q),n=t[t.length-1];return n==null?null:n.stage===1?s(_t,{}):n.stage===2?s(Rt,{stage:n,service:e}):n.stage===3?s(Et,{stage:n,service:e}):n.stage===4?s(Ft,{}):n.stage===5?s(Tt,{service:e}):s(D,{})},Mt=()=>{const e=d.exports.useRef(null),t=A(),[n,o]=d.exports.useState(void 0),r=d.exports.useCallback(async c=>{if(e.current==null){t.warn("ignore playAudio() since no audio element found.");return}e.current.srcObject=c,await e.current.play()},[]);return h("main",{css:u({width:"100%",height:"100%",maxWidth:1200}),children:[n==null&&s(Bt,{setService:o,playAudio:r}),n&&s(Pt,{service:n}),s(Ee,{audioRef:e}),n&&s($e,{service:n})]})},It=()=>{const[e,t]=de(ne),n=L(le),o=A(),{color:r}=T(),c=e==="host"?"\u30DB\u30B9\u30C8":"\u30B2\u30B9\u30C8",a=e==="host"?"\u30B2\u30B9\u30C8":"\u30DB\u30B9\u30C8";return s("button",{className:K({started:n}),css:u({width:"9rem",border:"none",outline:"none",padding:"0.125rem 0.5rem",background:`linear-gradient(135deg, ${r.primary.main} 50%, ${r.secondary.main} 50%)`,color:r.primary.text,"&.started":{background:r.background.dark,color:r.text}}),type:"button",onClick:()=>{if(n){o.warn("\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u958B\u59CB\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u30E2\u30FC\u30C9\u3092\u5909\u66F4\u3067\u304D\u307E\u305B\u3093\u3002");return}t(i=>i==="host"?"guest":"host")},disabled:n,children:n?s("span",{children:c}):h(D,{children:[s("span",{css:u({fontWeight:"bolder"}),children:`[${c}]`})," \u21D2 ",s("span",{children:a})]})})},Lt=()=>{const{color:e}=T(),[t,n]=d.exports.useState("");return d.exports.useEffect(()=>{const o=Array.from(document.getElementsByTagName("script"));for(const r of o){const c=/index\.([^.]+)\.js$/.exec(r.src);if(c){n(c[1]);break}}},[]),h("header",{css:u({display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%",paddingLeft:"0.5rem",paddingRight:"1rem",background:e.background.light}),children:[h("span",{children:["QR WebRTC",t?` -${t}`:""]}),s(It,{})]})},$t=te.memo(function({item:t}){const{timestamp:n,level:o,message:r}=t,a=`${[n.getHours(),n.getMinutes(),n.getSeconds()].map(i=>i.toString(10).padStart(2,"0")).join(":")} [${o.toUpperCase()}] ${r}`;return s("li",{className:o,css:u({fontFamily:"monospace","&.info":{color:"#bdbdbd"},"&.warn":{color:"#ffa726"},"&.error":{color:"#ef5350"},"&.success":{color:"#29b6f6"}}),children:a})}),Nt=te.memo(function({items:t}){return s("ul",{css:u({height:"100%",paddingLeft:"0.5rem"}),children:t.map(n=>s($t,{item:n},n.id))})}),Ne=({value:e,setValue:t,onMuteClick:n,icon:o,unlock:r})=>h("div",{css:u({display:"block"}),children:[s("input",{type:"range",step:r?.1:.01,min:0,max:r?8:1,value:e,onChange:c=>{t(c.currentTarget.value)}}),s("button",{css:u({outline:"none",border:"none",background:"transparent"}),type:"button",onClick:n,children:o})]}),Ot=()=>{const[e,t]=de(fe);return h("div",{css:u({display:"flex",alignItems:"center",justifyContent:"space-around",width:"100%"}),children:[s("div",{css:u({display:"block"}),children:s(Ne,{value:e.mic.volume,onMuteClick:()=>{t(n=>{n.mic.muted=!n.mic.muted})},setValue:n=>{t(o=>{o.mic.volume=Number(n)})},icon:e.mic.muted?"\u{1F515}":"\u{1F3A4}",unlock:!1})}),s("div",{css:u({display:"block"}),children:s(Ne,{value:e.speaker.volume,onMuteClick:()=>{t(n=>{n.speaker.muted=!n.speaker.muted})},setValue:n=>{t(o=>{o.speaker.volume=Number(n)})},icon:e.speaker.muted?"\u{1F507}":"\u{1F50A}",unlock:e.speaker.unlockLimit})})]})},Wt=()=>{const[e,t]=d.exports.useState(!1),{color:n}=T(),o=ot(),r=o.length>0&&o[o.length-1].level==="error";return d.exports.useEffect(()=>{r&&t(!0)},[r]),h("footer",{className:K({open:e}),css:u({display:"grid",height:"3.5rem",gridTemplateRows:"2rem 1.5rem 1fr",overflow:"hidden",transition:"all 0.5s","&.open":{height:"12rem"},background:n.background.dark,color:n.text}),children:[s("div",{css:u({display:"flex",alignItems:"center",borderBottom:`1px solid ${n.primary.dark}`,width:"100%"}),children:s(Ot,{})}),h("button",{type:"button",className:K({error:r}),css:u({display:"flex",justifyContent:"right",alignItems:"center",width:"100%",height:"100%",paddingRight:"1rem",border:"none",outline:"none",background:n.background.dark,color:n.text,"&.error":{background:"#b61827"}}),onClick:()=>t(c=>!c),children:[s("span",{css:u({marginRight:"0.75rem"}),children:"\u30ED\u30B0"}),s("span",{className:K({open:e}),css:u({display:"inline-block",height:"0.75rem",width:"0.75rem",borderLeft:"0.375rem solid transparent",borderBottom:"0.75rem solid white",borderRight:"0.375rem solid transparent",transition:"all 0.5s","&.open":{transform:"rotate(-180deg)"}})})]}),s("div",{css:u({height:"100%",overflowY:"scroll",borderTop:`1px solid ${n.primary.dark}`,scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),children:s(Nt,{items:o})})]})},jt=({children:e})=>{const{color:t}=T();return h(D,{children:[h("div",{css:u({display:"grid",width:"100%",height:"100%",gridTemplateRows:"2.5rem 1fr auto"}),children:[s("div",{css:u({height:"100%"}),children:s(Lt,{})}),s("div",{css:u({height:"100%",display:"flex",justifyContent:"center"}),children:e}),s("div",{css:u({height:"100%"}),children:s(Wt,{})})]}),s(Ye,{styles:u({"html, body, #root":{height:"100%"},"*":{boxSizing:"border-box",margin:0,padding:0},"ul, ol":{margin:0,padding:0,listStyleType:"none"},body:{background:t.background.main,color:t.text,margin:0,padding:0}})})]})},Ht=()=>{const e=L(ne),t=k(ne);return d.exports.useLayoutEffect(()=>{Me().catch(r=>{console.error(r)});const o=new URLSearchParams(window.location.hash.substring(1)).get("as")||"host";t(o==="host"?"host":"guest")},[]),j(jt,{children:e==="host"?j(xt,{}):j(Mt,{})})},Gt=({children:e})=>s(Xe,{children:e});function Ut(e={}){const{immediate:t=!1,onNeedRefresh:n,onOfflineReady:o,onRegistered:r,onRegisterError:c}=e;let a,i;const m=async(l=!0)=>{l&&(a==null||a.addEventListener("controlling",f=>{f.isUpdate&&window.location.reload()})),i&&i.waiting&&await et(i.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){a=new Ze("/qr-webrtc/sw.js",{scope:"/qr-webrtc/"}),a.addEventListener("activated",l=>{l.isUpdate||o==null||o()});{const l=()=>{n==null||n()};a.addEventListener("waiting",l),a.addEventListener("externalwaiting",l)}a.register({immediate:t}).then(l=>{i=l,r==null||r(l)}).catch(l=>{c==null||c(l)})}return m}Ut();tt.render(j(te.StrictMode,{children:j(Gt,{children:j(Ht,{})})}),document.getElementById("root"));