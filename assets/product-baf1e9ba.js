import{s as r}from"./index-55c79f46.js";const c=r("product",{state:()=>({products:[],totalAmount:0}),getters:{},actions:{setProduct(t){this.products=t},setTotalAmount(t){this.totalAmount=t},setProductQuantity(t,u){const o=this.products.find(i=>i.id===u),s=o.Product.inventory_quantity;t==="plus"&&o.quantity<s&&(o.quantity+=1),t==="minus"&&o.quantity>1&&(o.quantity-=1),this.totalAmountCount()},totalAmountCount(){let t=0;this.products.forEach(u=>{t+=u.quantity*u.Product.price}),this.totalAmount=t},deleteProducts(t){const u=this.products.filter(o=>o.product_id!==t);this.products=u},deleteStoreShop(t){const u=this.products.filter(o=>o.id!==t);this.products=u},productCheckout(){this.products=[]}}});export{c as p};
