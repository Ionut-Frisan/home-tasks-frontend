import{k,l as f,o as i,c as v,u as a,t as $,b as w,e as g,a as u,h as y,q as V,x as B,y as p,F as C,d as E}from"./index.f1833a4c.js";import{a as T,s as m}from"./inputtext.esm.d8163646.js";const S={class:"task"},I=u("i",{class:"pi pi-code",style:{"padding-right":"10px"}},null,-1),N={key:0,class:"name"},U={class:"task-actions"},D={__name:"Task",props:{task:Object,isEditable:{type:Boolean,default:!1}},emits:["updateTask","removeTask"],setup(h,{emit:n}){const s=h,o=k(s.task.name),d=k(!1),_=f(()=>(console.log(o.value),{...s.task,name:o.value})),r=f(()=>s.isEditable&&d.value),e=f(()=>r.value?"pi pi-times-circle":"pi pi-pencil"),l=()=>{n("updateTask",s.task.id,_),d.value=!1},t=b=>{o.value=b.target.value};return(b,c)=>(i(),v("div",S,[I,a(r)?w("",!0):(i(),v("span",N,$(s.task.name),1)),a(r)?(i(),g(a(T),{key:1,value:o.value,onInput:t,type:"text",class:"p-inputtext-sm",style:{width:"60%"}},null,8,["value"])):w("",!0),u("div",U,[a(r)?(i(),g(a(m),{key:0,icon:"pi pi-save",class:"p-button-rounded p-button-text",onClick:l})):w("",!0),y(a(m),{icon:a(e),class:"p-button-rounded p-button-text",onClick:c[0]||(c[0]=x=>d.value=!d.value)},null,8,["icon"]),y(a(m),{icon:"pi pi-trash",class:"p-button-rounded p-button-text p-button-danger",onClick:c[1]||(c[1]=x=>n("removeTask",s.task.id))})])]))}},F={class:"section-wrapper"},M={class:"task",style:{"margin-bottom":"20px"}},j=u("i",{class:"pi pi-code",style:{"padding-right":"10px"}},null,-1),q={class:"p-float-label",style:{width:"100%"}},A=u("label",{for:"name"},"Add new task",-1),L={class:"task-actions"},z={__name:"Tasks",setup(h){const n=V(),s=k([]),o=k({name:""});B(async()=>{s.value=(await p.get("/tasks")).data});const d=async e=>{(await p.delete(`/tasks/${e}`)).status===200?(s.value=s.value.filter(t=>t.id!==e),n.add({severity:"success",summary:"Task was removed.",life:3e3})):n.add({severity:"error",summary:"Something went wrong.",life:3e3})},_=async(e,l)=>{const t=await p.put(`/tasks/${e}`,{task:l.value});t.status===200?(s.value=t.data,n.add({severity:"success",summary:"Task was updated.",life:3e3})):n.add({severity:"error",summary:"Something went wrong.",life:3e3})},r=async()=>{const e=await p.post("/tasks",{task:o.value}),l=s.value;s.value=e.data||l,e!=null&&e.data?(o.value.name="",n.add({severity:"success",summary:"Task was added.",life:3e3})):n.add({severity:"error",summary:"Something went wrong.",life:3e3})};return(e,l)=>(i(),v("div",F,[u("div",M,[j,u("span",q,[y(a(T),{id:"name",type:"text",modelValue:o.value.name,"onUpdate:modelValue":l[0]||(l[0]=t=>o.value.name=t),style:{width:"160%"}},null,8,["modelValue"]),A]),u("div",L,[y(a(m),{icon:"pi pi-plus",class:"p-button-rounded p-button-text",onClick:r})])]),(i(!0),v(C,null,E(s.value,t=>(i(),g(D,{task:t,isEditable:!0,onRemoveTask:d,onUpdateTask:_},null,8,["task"]))),256))]))}};export{z as default};