import{_,u as i,a as l,t as m,b as g,H as f,A as k,B as S,F as v}from"./FooterComponent-537da39a.js";import{p as h}from"./product-6bcecdb4.js";import{S as C}from"./StoreProduct-e74db080.js";import{o as c,k as x,a as B,b as F,c as P,d as e,e as o,g as b,F as w}from"./index-917c549d.js";const H={class:"store-wrapper"},E={class:"add-wrapper"},M={class:"add-button"},y={class:"products-wrapper"},T={__name:"StorePage",setup(A){const t=i(),d=h(),r=l();return t.clearErrorMessages(),c(()=>{if(r.user.role!=="seller")return x.push("/")}),c(async()=>{const a=m.putTokenToHeader(),n=await g.GET("/api/v1/stores",void 0,a),{success:s,message:p,data:u}=n.data;return s?(r.isSelfUser=!0,d.setProduct(u.products)):t.setError(p)}),(a,n)=>{const s=B("router-link");return F(),P(w,null,[e(f),o("div",H,[e(k),o("div",E,[o("div",M,[e(s,{to:"/addStore"},{default:b(()=>[e(S,{msg:"上架商品",backgroundColor:"background-color:#FFBD9D"})]),_:1})])]),o("div",y,[e(C)])]),e(v)],64)}}},G=_(T,[["__scopeId","data-v-52f90258"]]);export{G as default};
