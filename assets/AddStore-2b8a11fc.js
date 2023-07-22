import{u as b,r as g,o as y,b as S,c as F,d as e,e as s,w as C,n as k,F as w,p as B,h as H}from"./index-4e7a4945.js";import{_ as M,u as R,t as m,a as _,H as T,A as q,B as A,F as D}from"./FooterComponent-8e6b8674.js";import{u as E}from"./FormComponent.vue_vue_type_style_index_0_scoped_161ebfa4_lang-bdaf0ac9.js";import{F as r}from"./FormComponent-215363b0.js";const I=n=>(B("data-v-ce296755"),n=n(),H(),n),V={class:"wrapper"},N={class:"form-wrapper"},z={class:"form-title"},G=I(()=>s("h3",null,"上架商品",-1)),O=["onSubmit"],P={__name:"AddStore",setup(n){const p=b(),i=R(),a=E();i.clearErrorMessages(),i.clearSuccessMessages();const u=g(""),f=()=>{u.value="was-validated"};y(async()=>{const t=m.putTokenToHeader(),o=await _.GET("/api/v1/users",void 0,t),{success:l,user:c}=o.data;if(!l||c.role!=="seller")return p.push("/")});const v=t=>{const o=t.target.files[0];a.avatar=o},h=async t=>{if(!t.target.checkValidity())return t.preventDefault();const l=m.putTokenToHeader(),c=await _.formDataPOST("/api/v1/stores",{name:a.name,price:a.price,inventory:a.inventory,avatar:a.avatar,description:a.description},l),{success:x,message:d}=c.data;if(!x)return i.setError(d);i.setSuccess(d),p.push("/stores")};return(t,o)=>(S(),F(w,null,[e(T),s("div",V,[s("div",N,[s("div",z,[G,e(q)]),s("form",{onSubmit:C(h,["prevent"]),class:k(u.value),novalidate:""},[e(r,{"label-for":"name","label-text":"商品名稱","span-text":"※填寫1-100字商品名稱","input-placeholder":"請輸入商品名稱","input-type":"text","min-length":"1","max-length":"100",inputRequired:"true","invalid-text":"此項目為必填，字數限制1-100"}),e(r,{"label-for":"price","label-text":"售價","span-text":"※注意售價為必填","input-placeholder":"請輸入售價","input-type":"number",inputRequired:"true","invalid-text":"此項目為必填"}),e(r,{"label-for":"inventory","label-text":"存貨量","span-text":"※注意存貨量為必填","input-placeholder":"請輸入存貨量","input-type":"number",inputRequired:"true","invalid-text":"此項目為必填"}),e(r,{"label-for":"avatar","label-text":"商品圖片","span-text":"※注意商品圖片為必填","input-placeholder":"",onChange:v,"input-type":"file",inputRequired:"true","invalid-text":"此項目為必填"}),e(r,{"label-for":"description","label-text":"商品描述","span-text":"※注意商品描述為必填","input-placeholder":"請輸入商品描述","input-type":"textarea","min-length":"1","max-length":"400",inputRequired:"true","invalid-text":"此項目為必填"}),s("div",null,[e(A,{msg:"上架",backgroundColor:"background-color:#FFBD9D",type:"submit",onClick:f})])],42,O)])]),e(D)],64))}},Q=M(P,[["__scopeId","data-v-ce296755"]]);export{Q as default};