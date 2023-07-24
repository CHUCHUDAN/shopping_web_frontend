import{q as b,s as C,o as v,k as P,a as T,b as c,c as i,d as u,e as s,l as H,j as e,f as o,t as r,m as _,g as k,F as N}from"./index-10f80346.js";import{_ as E,u as F,a as M,t as g,b as S,H as U,A as B,F as V}from"./FooterComponent-603db2d7.js";import{S as $}from"./StoreProduct-50576f22.js";import{p as I}from"./product-b0ec1fbb.js";const A=b("user",{state:()=>({user:{}}),getters:{},actions:{}});const G={class:"users-wrapper"},L={class:"user-wrapper"},j={class:"user-head"},q={class:"user-text"},z={class:"user-name"},D={class:"text-span"},R={class:"user-account"},J={class:"text-span"},K={class:"user-role"},O={class:"text-span"},Q={key:0,class:"user-email"},W={class:"text-span"},X={key:1,class:"user-phone"},Y={class:"text-span"},Z={class:"user-created-time"},ss={class:"text-span"},es={key:2,class:"user-product-count"},ts={class:"text-span"},os={class:"user-button"},rs={key:0,class:"fa-solid fa-pen edit"},as={key:0,class:"fa-solid fa-lock password"},ns={class:"products-wrapper"},cs={__name:"SellerProfilePage",setup(is){const m=F(),t=A(),d=M(),x=I(),h=C();m.clearErrorMessages(),m.clearSuccessMessages(),v(async()=>{const l=h.params.seller_id,a=g.putTokenToHeader(),n=await S.GET(`/api/v1/users/${l}`,void 0,a),{success:p,data:f}=n.data;return p||P.push("/"),t.user=f.seller}),v(async()=>{const l=Number(h.params.seller_id),a=g.putTokenToHeader(),n=await S.GET(`/api/v1/stores/${l}`,void 0,a),{success:p,message:f,data:w}=n.data;return p?(x.setProduct(w.products),l!==d.user.id?d.isSelfUser=!1:d.isSelfUser=!0):m.setError(f)});const y=()=>{window.history.back()};return(l,a)=>{const n=T("router-link");return c(),i(N,null,[u(U),s("div",G,[u(B),s("div",L,[s("div",j,[s("div",{class:"user-img",style:H(`background-image: url('${e(t).user.avatar}')`)},null,4),s("div",q,[s("div",z,[o("名稱: "),s("span",D,r(e(t).user.name),1)]),s("div",R,[o("帳號: "),s("span",J,r(e(t).user.account),1)]),s("div",K,[o("帳號類型: "),s("span",O,r(e(t).user.role),1)]),e(t).user.email?(c(),i("div",Q,[o(" email: "),s("span",W,r(e(t).user.email),1)])):_("",!0),e(t).user.phone?(c(),i("div",X,[o(" phone: "),s("span",Y,r(e(t).user.phone),1)])):_("",!0),s("div",Z,[o(" 加入時間: "),s("span",ss,r(e(t).user.createdTimeFromNow),1)]),e(t).user.productsCount?(c(),i("div",es,[o(" 商品數量: "),s("span",ts,r(e(t).user.productsCount),1)])):_("",!0)])]),s("div",os,[s("i",{class:"fa-solid fa-circle-arrow-left back",onClick:a[0]||(a[0]=p=>y())}),u(n,{to:"/user/profile/edit"},{default:k(()=>[e(d).isSelfUser?(c(),i("i",rs)):_("",!0)]),_:1}),u(n,{to:"/user/password/edit"},{default:k(()=>[e(d).isSelfUser?(c(),i("i",as)):_("",!0)]),_:1})])]),s("div",ns,[u($)])]),u(V)],64)}}},ps=E(cs,[["__scopeId","data-v-b4711529"]]);export{ps as default};
