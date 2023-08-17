import{_ as y,b as x,B as h,u as b,H as I,A as w,F as S}from"./FooterComponent-0fde2f88.js";import{u as k}from"./product-4d1425c3.js";import{u as F}from"./cart-product-2b7633de.js";import{a as u,c as _,q as C,d as t,l as B,t as m,e,y as D,m as Q,F as P,k as H,z as f,r as K,b as i,g as L,n as v,p as N,h as z,o as A}from"./index-4a7e1513.js";const M=["onClick"],V={class:"product-text"},q={class:"product-name"},E={class:"product-text"},O={class:"product-price"},j={class:"price"},G={__name:"ProductComponent",setup(d){const a=x(),n=k(),c=F(),l=o=>{H.push(`/product/${o}`)};return(o,r)=>(u(!0),_(P,null,C(e(n).products,s=>(u(),_("div",{class:"product-wrapper",key:s.id},[t("div",{class:"product-img",style:B(`background-image: url('${s.avatar}')`),onClick:g=>l(s.id)},null,12,M),t("div",V,[t("div",q,m(s.name),1),t("div",E,m(s.description),1)]),t("div",O,[t("div",j," $ "+m(s.price),1),e(a).cartButtonOn?(u(),D(h,{key:0,msg:"加入購物車",backgroundColor:"background-color:#FF9797",onClick:g=>e(c).postCart(s.id)},null,8,["onClick"])):Q("",!0)])]))),128))}},J=y(G,[["__scopeId","data-v-020ce283"]]);const $=d=>(N("data-v-39068c5d"),d=d(),z(),d),R={"aria-label":"Page navigation example"},T={class:"pagination"},U=$(()=>t("a",{class:"page-link",href:"","aria-label":"Previous"},[t("span",{"aria-hidden":"true"},"«")],-1)),W=[U],X=["onClick"],Y={class:"page-link",href:""},Z=$(()=>t("a",{class:"page-link",href:"","aria-label":"Next"},[t("span",{"aria-hidden":"true"},"»")],-1)),tt=[Z],et={__name:"PaginationComponent",setup(d){const a=k(),n=f(null),c=f(null),l=(r,s)=>{n.value.classList.contains("disabled")||a.getProducts(r,s)},o=(r,s)=>{c.value.classList.contains("disabled")||a.getProducts(r,s)};return(r,s)=>{const g=K("router-link");return u(),_("div",null,[i(g,{class:"paginaton",to:"/home"},{default:L(()=>[t("nav",R,[t("ul",T,[t("li",{class:v(["page-item",{disabled:e(a).currentPage===1}]),ref_key:"prev",ref:n,onClick:s[0]||(s[0]=p=>l(e(a).currentPage-1))},W,2),(u(!0),_(P,null,C(e(a).pages,p=>(u(),_("li",{class:v(["page-item",{active:e(a).currentPage===p}]),onClick:kt=>e(a).getProducts(p),key:p},[t("a",Y,m(p),1)],10,X))),128)),t("li",{class:v(["page-item",{disabled:e(a).currentPage===e(a).totalPage}]),ref_key:"next",ref:c,onClick:s[1]||(s[1]=p=>o(e(a).currentPage+1))},tt,2)])])]),_:1})])}}},ot=y(et,[["__scopeId","data-v-39068c5d"]]);const nt={class:"home-wrapper"},st={class:"search-wrapper"},at={action:"",class:"form-wrapper"},rt={class:"form-item"},ct=["value"],it={class:"form-item"},lt=["value"],ut={class:"form-item"},dt=["value"],pt={class:"form-item"},_t=["value"],mt={class:"form-item"},gt=["value"],vt={class:"button-wrapper"},ht={class:"products-wrapper"},yt={__name:"HomePage",setup(d){const a=b(),n=k();a.messageInitialization(),A(async()=>{await n.getProducts(1)});const c=l=>{const o=l.target.value,r=l.target.id;n.setChangeInput(r,o)};return(l,o)=>(u(),_(P,null,[i(I),t("div",nt,[i(w),t("div",st,[t("form",at,[t("div",rt,[t("input",{class:"form-input",type:"text",maxlength:"50",id:"keyword",name:"keyword",value:e(n).keyword,onInput:c,onKeyup:o[0]||(o[0]=r=>e(n).getProducts(1)),placeholder:"輸入關鍵字"},null,40,ct)]),t("div",it,[t("input",{class:"form-input",type:"number",maxlength:"50",id:"minQuantity",name:"minQuantity",value:e(n).minQuantity,onInput:c,onKeyup:o[1]||(o[1]=r=>e(n).getProducts(1)),placeholder:"輸入最小存貨量"},null,40,lt)]),t("div",ut,[t("input",{class:"form-input",type:"number",maxlength:"50",id:"maxQuantity",name:"maxQuantity",value:e(n).maxQuantity,onInput:c,onKeyup:o[2]||(o[2]=r=>e(n).getProducts(1)),placeholder:"輸入最大存貨量"},null,40,dt)]),t("div",pt,[t("input",{class:"form-input",type:"number",maxlength:"50",id:"min",name:"min",value:e(n).min,onInput:c,onKeyup:o[3]||(o[3]=r=>e(n).getProducts(1)),placeholder:"輸入最小金額"},null,40,_t)]),t("div",mt,[t("input",{class:"form-input",type:"number",maxlength:"50",id:"max",name:"max",value:e(n).max,onInput:c,onKeyup:o[4]||(o[4]=r=>e(n).getProducts(1)),placeholder:"輸入最大金額"},null,40,gt)]),t("div",vt,[i(h,{class:"search-button",msg:"搜尋",backgroundColor:"background-color:#D0D0D0",type:"button",onClick:o[5]||(o[5]=r=>e(n).getProducts(1))}),i(h,{class:"clear-button",msg:"清除",backgroundColor:"background-color:	#FFAD86",type:"button",onClick:o[6]||(o[6]=r=>e(n).clearSearch())})])])]),t("div",ht,[i(J)]),i(ot,{currentPage:e(n).currentPage},null,8,["currentPage"])]),i(S)],64))}},xt=y(yt,[["__scopeId","data-v-dec6565c"]]);export{xt as default};