(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f0f4b4a"],{"13d5":function(e,t,l){"use strict";var a=l("23e7"),o=l("d58f").left,n=l("a640"),c=l("2d00"),r=l("605d"),u=n("reduce"),d=!r&&c>79&&c<83;a({target:"Array",proto:!0,forced:!u||d},{reduce:function(e){var t=arguments.length;return o(this,e,t,t>1?arguments[1]:void 0)}})},"448f":function(e,t,l){"use strict";l.r(t);var a=l("7a23");const o={class:"student-wrapper"},n={class:"student-header"},c={class:"student-table"};function r(e,t,l,r,u,d){const i=Object(a["resolveComponent"])("TButton"),s=Object(a["resolveComponent"])("StudentFilter"),m=Object(a["resolveComponent"])("TFilter"),b=Object(a["resolveComponent"])("TTable"),p=Object(a["resolveComponent"])("Create"),f=Object(a["resolveComponent"])("TModal"),v=Object(a["resolveComponent"])("Edit"),h=Object(a["resolveComponent"])("Delete");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",o,[Object(a["createElementVNode"])("div",n,[Object(a["createVNode"])(i,{title:"新增",type:"primary",class:"n-mb-md",icon:e.Add12Filled,onClick:e.openCreate},null,8,["icon","onClick"]),Object(a["createVNode"])(m,{onClear:e.clearFilter,onSubmit:e.submitFilter},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{ref:"refFilter",form:e.formValue,"onUpdate:form":t[0]||(t[0]=t=>e.formValue=t)},null,8,["form"])]),_:1},8,["onClear","onSubmit"])]),Object(a["createElementVNode"])("div",c,[Object(a["createVNode"])(b,{loading:e.loading,columns:e.columns,tableKey:e.tableKey,data:e.studentData,filterFrom:e.filterFrom,"onUpdate:sorter":e.handleUpdateSorter},null,8,["loading","columns","tableKey","data","filterFrom","onUpdate:sorter"])]),Object(a["createVNode"])(f,{showModal:e.showModal.create,"onUpdate:showModal":t[1]||(t[1]=t=>e.showModal.create=t),title:"新增學生",onCancel:t[2]||(t[2]=t=>e.showModal.create=!1),onSubmit:e.addStudent},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(p,{ref:"refCreate"},null,512)]),_:1},8,["showModal","onSubmit"]),Object(a["createVNode"])(f,{showModal:e.showModal.edit,"onUpdate:showModal":t[3]||(t[3]=t=>e.showModal.edit=t),title:"編輯學生",onCancel:e.cancelEdit,onSubmit:e.updateStudent},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(v,{ref:"refEdit",data:e.currentModalData},null,8,["data"])]),_:1},8,["showModal","onCancel","onSubmit"]),Object(a["createVNode"])(f,{showModal:e.showModal.delete,"onUpdate:showModal":t[4]||(t[4]=t=>e.showModal.delete=t),title:"刪除學生",onCancel:e.cancelDelete,onSubmit:e.deleteStudent},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(h,{ref:"refDelete",data:e.currentModalData},null,8,["data"])]),_:1},8,["showModal","onCancel","onSubmit"])])}l("13d5"),l("14d9");var u=l("65e2"),d=l("6dc9"),i=l("3519"),s=l("0b62"),m=l("269c");const b={class:"n-pt-md"};var p={__name:"Filter",props:{form:{type:Object,default(){return{}}}},setup(e,{expose:t}){const l=e,o={school:Object(m["a"])()},n=Object(a["computed"])(()=>o.school.list.map(e=>({label:e.name,value:e.id}))),c=Object(a["ref"])(null),r=Object(a["computed"])({get:()=>l.form,set:e=>emit("update:form",e)}),u=["name","phone","email","fromSchool"],d=Object(a["reactive"])({}),i=()=>{u.forEach(e=>{var t;switch(e){case"name":case"phone":case"email":const l=new RegExp(""+(null!==(t=r.value[e])&&void 0!==t?t:""));d[e]=e=>l.test(e);break;case"fromSchool":if(r.value[e]){const t=r.value[e];d[e]=e=>{const l=e.$findIndex(e=>e===t);return l>-1}}else d[e]=e=>!0;break;default:d[e]=e=>!0;break}})};return t({setData:i,getData:()=>d}),(e,t)=>{const l=Object(a["resolveComponent"])("n-input"),o=Object(a["resolveComponent"])("n-form-item"),u=Object(a["resolveComponent"])("n-select"),d=Object(a["resolveComponent"])("n-form");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",b,[Object(a["createVNode"])(d,{ref_key:"formRef",ref:c,model:Object(a["unref"])(r)},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(o,{label:"名稱",path:"name"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:Object(a["unref"])(r).name,"onUpdate:value":t[0]||(t[0]=e=>Object(a["unref"])(r).name=e),placeholder:"输入名稱"},null,8,["value"])]),_:1}),Object(a["createVNode"])(o,{label:"電話",path:"phone"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:Object(a["unref"])(r).phone,"onUpdate:value":t[1]||(t[1]=e=>Object(a["unref"])(r).phone=e),placeholder:"输入電話"},null,8,["value"])]),_:1}),Object(a["createVNode"])(o,{label:"Email",path:"email"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:Object(a["unref"])(r).email,"onUpdate:value":t[2]||(t[2]=e=>Object(a["unref"])(r).email=e),placeholder:"輸入Email"},null,8,["value"])]),_:1}),Object(a["createVNode"])(o,{label:"學校",path:"fromSchool"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,{value:Object(a["unref"])(r).fromSchool,"onUpdate:value":t[3]||(t[3]=e=>Object(a["unref"])(r).fromSchool=e),placeholder:"輸入學校",options:Object(a["unref"])(n)},null,8,["value","options"])]),_:1})]),_:1},8,["model"])])}}};const f=p;var v=f,h={__name:"Create",setup(e,{expose:t}){const l={school:Object(m["a"])()},o=Object(a["computed"])(()=>l.school.list.map(e=>({label:e.name,value:e.id}))),n=Object(a["ref"])(null),c=Object(a["ref"])({name:null,phone:null,email:null,fromSchool:[]});return t({setData(e){c.value=e},getData(){return c.value},upload(e){return Object(s["a"])({url:"/student",method:"post",data:e},{fakeData:null,getFakeData:!0})}}),(e,t)=>{const l=Object(a["resolveComponent"])("n-input"),r=Object(a["resolveComponent"])("n-form-item"),u=Object(a["resolveComponent"])("n-select"),d=Object(a["resolveComponent"])("n-form");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[Object(a["createVNode"])(d,{ref_key:"formRef",ref:n,model:c.value},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(r,{label:"名稱",path:"name"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:c.value.name,"onUpdate:value":t[0]||(t[0]=e=>c.value.name=e),placeholder:"输入名稱"},null,8,["value"])]),_:1}),Object(a["createVNode"])(r,{label:"電話",path:"phone"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:c.value.phone,"onUpdate:value":t[1]||(t[1]=e=>c.value.phone=e),placeholder:"输入電話"},null,8,["value"])]),_:1}),Object(a["createVNode"])(r,{label:"Email",path:"email"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:c.value.email,"onUpdate:value":t[2]||(t[2]=e=>c.value.email=e),placeholder:"輸入Email"},null,8,["value"])]),_:1}),Object(a["createVNode"])(r,{label:"學校",path:"fromSchool"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,{value:c.value.fromSchool,"onUpdate:value":t[3]||(t[3]=e=>c.value.fromSchool=e),placeholder:"輸入學校",options:Object(a["unref"])(o),multiple:""},null,8,["value","options"])]),_:1})]),_:1},8,["model"])])}}};const O=h;var j=O,w={__name:"Edit",props:{data:{type:Object,default(){return{id:null,name:null,phone:null,email:null,fromSchool:[]}}}},setup(e,{expose:t}){const l=e,o=Object(a["ref"])(null),n={school:Object(m["a"])()},c=Object(a["computed"])(()=>n.school.list.map(e=>({label:e.name,value:e.id}))),r=Object(a["ref"])({id:null,name:null,phone:null,email:null,fromSchool:[]});return Object(a["onMounted"])(()=>{l.data.$forEach((e,t)=>{r.value[t]=e})}),t({setData(e){r.value=e},getData(){return r.value},upload(e,t){return Object(s["a"])({url:"/student/"+t,method:"put",data:e},{fakeData:null,getFakeData:!0})}}),(e,t)=>{const l=Object(a["resolveComponent"])("n-input"),n=Object(a["resolveComponent"])("n-form-item"),u=Object(a["resolveComponent"])("n-select"),d=Object(a["resolveComponent"])("n-form");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[Object(a["createVNode"])(d,{ref_key:"formRef",ref:o,model:r.value},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(n,{label:"名稱",path:"name"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:r.value.name,"onUpdate:value":t[0]||(t[0]=e=>r.value.name=e),placeholder:"输入名稱"},null,8,["value"])]),_:1}),Object(a["createVNode"])(n,{label:"電話",path:"phone"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:r.value.phone,"onUpdate:value":t[1]||(t[1]=e=>r.value.phone=e),placeholder:"输入電話"},null,8,["value"])]),_:1}),Object(a["createVNode"])(n,{label:"Email",path:"email"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{value:r.value.email,"onUpdate:value":t[2]||(t[2]=e=>r.value.email=e),placeholder:"輸入Email"},null,8,["value"])]),_:1}),Object(a["createVNode"])(n,{label:"學校",path:"fromSchool"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,{value:r.value.fromSchool,"onUpdate:value":t[3]||(t[3]=e=>r.value.fromSchool=e),placeholder:"輸入學校",options:Object(a["unref"])(c),multiple:""},null,8,["value","options"])]),_:1})]),_:1},8,["model"])])}}};const C=w;var k=C;const S={class:"delete-title"};var V={__name:"Delete",props:{data:{type:Object,default(){return{id:null,name:null,phone:null,email:null}}}},setup(e,{expose:t}){const l=e,o=Object(a["computed"])(()=>{var e,t;return null!==(e=null===(t=l.data)||void 0===t?void 0:t.name)&&void 0!==e?e:""});return t({getData(){return l.data},upload(e,t){return Object(s["a"])({url:"/student/"+t,method:"delete",data:e},{fakeData:null,getFakeData:!0})}}),(e,t)=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",S,Object(a["toDisplayString"])(`確定刪除 ${Object(a["unref"])(o)} 嗎?`),1))}},N=(l("d71f"),l("6b0d")),g=l.n(N);const D=g()(V,[["__scopeId","data-v-30b5e2d2"]]);var x=D,_=l("56c1");const y=[{id:1,name:"學生1",phone:"0987654321",email:"testStudent123@gmail.com",fromSchool:[1,2],key:1},{id:2,name:"學生2",phone:"0987679921",email:"testStudent222@gmail.com",fromSchool:[1,2],key:2},{id:3,name:"學生3",phone:"0987677321",email:"testStudent789@gmail.com",fromSchool:[1,2,4],key:3}];var E=l("98922"),M=Object(a["defineComponent"])({components:{StudentFilter:v,Create:j,Edit:k,Delete:x},setup(){const e=Object(a["ref"])(!1),t=Object(a["ref"])(0),l={school:Object(m["a"])(),student:Object(_["a"])()},o=e=>{var t;const a=l.school.list.find(t=>t.id===e);return null!==(t=null===a||void 0===a?void 0:a.name)&&void 0!==t?t:`無此學校 ${e} ID`},n=Object(a["ref"])(null),c=Object(a["reactive"])({name:null,phone:null,email:null,fromSchool:null}),r=Object(a["reactive"])({});function b(e){e.$forEach((e,t)=>{r[t]=e})}const p=()=>{c.name=null,c.phone=null,c.email=null,c.fromSchool=null;const e=n.value.getData();b(e),t.value++},f=()=>{n.value.setData();const e=n.value.getData();b(e),t.value++},v=Object(a["ref"])([]),h=Object(a["computed"])(()=>v.value.reduce((e,{columnKey:t,order:l})=>(e[t]=l,e),{}));function O(e){v.value=[].concat(e)}const j=Object(a["computed"])(()=>[{key:"name",title:"名稱",width:150},{title:"電話",key:"phone",width:150},{title:"E-mail",key:"email",minWidth:200,sortOrder:h.value.email||!1,sorter:(e,t)=>e.email.length-t.email.length},{title:"學校",key:"fromSchool",minWidth:200,sortOrder:h.value.fromSchool||!1,sorter:(e,t)=>e.fromSchool.length-t.fromSchool.length,render(e){const t=e.fromSchool.map(e=>Object(a["h"])(d["a"],{style:{marginRight:"6px"},type:"info",bordered:!1},{default:()=>o(e)}));return t}},{title:"管理",key:"actions",width:150,render(e){return Object(a["h"])("div",{class:"n-ga-md flex-row"},{default:()=>[Object(a["h"])(i["b"],{size:"small",onClick:()=>{F(e)}},{default:()=>"編輯"}),Object(a["h"])(i["b"],{size:"small",onClick:()=>{H(e)},type:"error"},{default:()=>"刪除"})]})}}]),w=Object(a["reactive"])([]),C=async()=>{await Object(s["a"])({url:"/student",method:"get"},{fakeData:y,getFakeData:!0}).then(e=>{e.forEach(e=>{w.push({key:e.id,...e})})})},k=async()=>{e.value=!0,w.splice(0),await Promise.all([C(),l.student.init()]),e.value=!1};Object(a["onMounted"])(()=>{k()});const S=Object(a["ref"])(null),V=Object(a["reactive"])({create:!1,edit:!1,delete:!1}),N=Object(E["a"])(),g=Object(a["ref"])(null),D=()=>{V.create=!0},x=()=>{const e=g.value.getData(),t=g.value.upload(e);t.then(()=>{const e="success";N[e]({content:"成功",meta:"資料更新",duration:1500,keepAliveOnHover:!0}),k(),V.create=!1})},M=Object(a["ref"])(null),F=e=>{V.edit=!0,S.value=e},U=()=>{V.edit=!1,S.value=null},B=()=>{const e=M.value.getData(),t=e.id,l=M.value.upload(e,t);l.then(()=>{const e="success";N[e]({content:"成功",meta:"資料更新",duration:1500,keepAliveOnHover:!0}),k(),V.edit=!1})},A=Object(a["ref"])(null),H=e=>{V.delete=!0,S.value=e},R=()=>{V.delete=!1,S.value=null},T=()=>{const e=A.value.getData(),t=e.id,l=A.value.upload(e,t);l.then(()=>{const e="success";N[e]({content:"成功",meta:"資料更新",duration:1500,keepAliveOnHover:!0}),k(),V.delete=!1})};return{loading:e,Add12Filled:u["a"],tableKey:t,store:l,getSchoolName:o,formValue:c,filterFrom:r,refFilter:n,clearFilter:p,submitFilter:f,columns:j,studentData:w,handleUpdateSorter:O,currentModalData:S,showModal:V,refCreate:g,openCreate:D,addStudent:x,refEdit:M,openEdit:F,cancelEdit:U,updateStudent:B,refDelete:A,openDelete:H,cancelDelete:R,deleteStudent:T}}});l("4fc9");const F=g()(M,[["render",r],["__scopeId","data-v-537650c2"]]);t["default"]=F},"4fc9":function(e,t,l){"use strict";l("8cd8")},"57d9":function(e,t,l){},"605d":function(e,t,l){var a=l("c6b6"),o=l("da84");e.exports="process"==a(o.process)},"65e2":function(e,t,l){"use strict";var a=l("7a23");const o={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 12 12"},n=Object(a["createElementVNode"])("g",{fill:"none"},[Object(a["createElementVNode"])("path",{d:"M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75z",fill:"currentColor"})],-1),c=[n];t["a"]=Object(a["defineComponent"])({name:"Add12Filled",render:function(e,t){return Object(a["openBlock"])(),Object(a["createElementBlock"])("svg",o,c)}})},"8cd8":function(e,t,l){},a640:function(e,t,l){"use strict";var a=l("d039");e.exports=function(e,t){var l=[][e];return!!l&&a((function(){l.call(null,t||function(){return 1},1)}))}},d58f:function(e,t,l){var a=l("59ed"),o=l("7b0b"),n=l("44ade"),c=l("07fa"),r=TypeError,u=function(e){return function(t,l,u,d){a(l);var i=o(t),s=n(i),m=c(i),b=e?m-1:0,p=e?-1:1;if(u<2)while(1){if(b in s){d=s[b],b+=p;break}if(b+=p,e?b<0:m<=b)throw r("Reduce of empty array with no initial value")}for(;e?b>=0:m>b;b+=p)b in s&&(d=l(d,s[b],b,i));return d}};e.exports={left:u(!1),right:u(!0)}},d71f:function(e,t,l){"use strict";l("57d9")}}]);
//# sourceMappingURL=chunk-8f0f4b4a.bf69f2a7.js.map