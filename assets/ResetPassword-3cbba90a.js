import{u as m,j as _,o as f,a as w,c as h,b as o,d as s,f as v,t as g,e as n,w as x,n as C,F,p as b,h as y}from"./index-4a7e1513.js";import{_ as R,u as S,a as k,b as P,B,H as I,A as D,F as M}from"./FooterComponent-0fde2f88.js";import{F as V}from"./FormComponent-d7d800b6.js";const q=a=>(b("data-v-32a1932e"),a=a(),y(),a),N={class:"wrapper"},z={class:"form-wrapper"},A={class:"form-title"},H=q(()=>s("h3",null,"Reset Password",-1)),L={class:"email-text"},T=["onSubmit"],j={__name:"ResetPassword",setup(a){const i=m(),d=S(),e=k(),l=P(),u=_();d.messageInitialization(),f(()=>{if(l.isUser)return i.push("/");e.formClass="",e.email="",e.password="";const t=u.query.email;e.email=t});const c=async t=>{const r=u.query.token;if(!t.target.checkValidity())return t.preventDefault();await l.resetPassword(r)||i.push("/user/login")};return(t,r)=>(w(),h(F,null,[o(I),s("div",N,[s("div",z,[s("div",A,[H,o(D)]),s("div",L,[v(" 您的重置帳號信箱: "),s("span",null,g(n(e).email),1)]),s("form",{onSubmit:x(c,["prevent"]),class:C(n(e).formClass),novalidate:""},[o(V,{"label-for":"password","label-text":"新密碼","span-text":"※注意請填寫4-50字密碼","input-placeholder":"請輸入新密碼","input-type":"password","min-length":"4","max-length":"50",inputRequired:"true","invalid-text":"此項目為必填，字數限制4-50",value:n(e).password},null,8,["value"]),s("div",null,[o(B,{msg:"next",backgroundColor:"background-color:#FFBD9D",type:"submit",onClick:r[0]||(r[0]=p=>n(e).addFormClass())})])],42,T)])]),o(M)],64))}},J=R(j,[["__scopeId","data-v-32a1932e"]]);export{J as default};