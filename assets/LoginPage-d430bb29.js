import{u as g,o as f,r as h,a as x,c as v,b as e,d as t,w as b,n as C,e as c,f as p,g as F,F as k,p as w,h as S}from"./index-7215024e.js";import{_ as y,u as B,a as L,b as I,B as R,H as M,A as V,F as D}from"./FooterComponent-cc28d71c.js";import{F as u}from"./FormComponent-323e5de0.js";const N=o=>(w("data-v-04b47976"),o=o(),S(),o),P={class:"wrapper"},q={class:"form-wrapper"},z={class:"form-title"},A=N(()=>t("h3",null,"Login",-1)),H=["onSubmit"],E={class:"login-text"},T={__name:"LoginPage",setup(o){const r=g(),d=B(),s=L(),i=I(),m=["登出成功","註冊成功"];d.messageInitialization(m),f(()=>{if(i.isUser)return r.push("/");s.formClass=""});const _=async n=>{if(!n.target.checkValidity())return n.preventDefault();await i.login()||r.push("/")};return(n,a)=>{const l=h("router-link");return x(),v(k,null,[e(M),t("div",P,[t("div",q,[t("div",z,[A,e(V)]),t("form",{onSubmit:b(_,["prevent"]),class:C(c(s).formClass),novalidate:""},[e(u,{"label-for":"account","label-text":"帳號","span-text":"※注意請填寫3-50字的帳號","input-placeholder":"請輸入帳號","input-type":"text","min-length":"3","max-length":"50",inputRequired:"true","invalid-text":"此項目為必填，字數限制3-50"}),e(u,{"label-for":"password","label-text":"密碼","span-text":"※注意請填寫4-50長度的密碼","input-placeholder":"請輸入有效密碼","input-type":"password","min-length":"4","max-length":"50",inputRequired:"true","invalid-text":"此項目為必填，字數限制4-50"}),t("div",null,[e(R,{msg:"login",backgroundColor:"background-color:#FFBD9D",type:"submit",onClick:a[0]||(a[0]=U=>c(s).addFormClass())})]),t("div",E,[p(" 還沒有帳號 ? "),e(l,{to:"/user/register",class:"login-text-link"},{default:F(()=>[p("註冊")]),_:1})])],42,H)])]),e(D)],64)}}},J=y(T,[["__scopeId","data-v-04b47976"]]);export{J as default};