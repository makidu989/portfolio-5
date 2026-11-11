// V5 public bridge. Reads only published/site; never reads drafts.
import {initializeApp,getApps} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {getFirestore,doc,onSnapshot} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
const cfg={apiKey:"AIzaSyASJ4W8V3J4lLqmAz9Ltdtr8cu7neOOgKQ",authDomain:"portfolio-admin-289e9.firebaseapp.com",projectId:"portfolio-admin-289e9",appId:"1:491353592649:web:a020e93356bded60064098"};
const app=getApps().find(a=>a.name==="v5-public")||initializeApp(cfg,"v5-public");
const $=s=>document.querySelector(s);
const node=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=String(txt);return n};
const safeUrl=(raw)=>{try{const u=new URL(raw,location.href);return ["https:","http:"].includes(u.protocol)?u.href:null}catch{return null}};
function apply(content){
if(!content||typeof content!=="object")return;
if(typeof content.name==="string"&&content.name.trim()){const h=$("#top h1");if(h)h.textContent=content.name;}
if(typeof content.headline==="string"){const e=$("#top .hero-role");if(e)e.textContent=content.headline;}
if(typeof content.about==="string"){const e=$("#about .lead");if(e)e.textContent=content.about;}
if(Array.isArray(content.skills)){const wrap=$("#skills .skills-wrap");if(wrap)wrap.replaceChildren(...content.skills.map(x=>node("span","skill",x)))}
if(Array.isArray(content.projects)&&content.projects.length){const wrap=$("#projects .project-grid");if(wrap){const cards=content.projects.filter(p=>p?.title).map((p,i)=>{const a=node("article","project-card"),top=node("div","project-top");top.append(node("span","project-number","PROJECT "+String(i+1).padStart(2,"0")),node("span","project-type","프로젝트"));a.append(top,node("h3","",p.title),node("p","",p.description||""));if(p.image){const url=safeUrl(p.image);if(url){const link=node("a","resource-action","관련 자료 보기 ↗");link.href=url;link.target="_blank";link.rel="noopener noreferrer";a.append(link)}}return a});wrap.replaceChildren(...cards)}}
}
onSnapshot(doc(getFirestore(app),"published","site"),snap=>{if(snap.exists())apply(snap.data().content)},err=>console.warn("공개 포트폴리오 데이터 로딩 실패:",err.code));
