'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
const C=createContext(null);
const safeParse=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
export function StoreProvider({children}){
 const [cart,setCart]=useState([]); const [wishlist,setWishlist]=useState([]); const [user,setUser]=useState(null); const [orders,setOrders]=useState([]); const [ready,setReady]=useState(false);
 useEffect(()=>{setCart(safeParse('stylenest-cart',[]));setWishlist(safeParse('stylenest-wishlist',[]));setUser(safeParse('stylenest-user',null));setOrders(safeParse('stylenest-orders',[]));setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem('stylenest-cart',JSON.stringify(cart))},[cart,ready]);
 useEffect(()=>{if(ready)localStorage.setItem('stylenest-wishlist',JSON.stringify(wishlist))},[wishlist,ready]);
 useEffect(()=>{if(ready){if(user)localStorage.setItem('stylenest-user',JSON.stringify(user));else localStorage.removeItem('stylenest-user')}},[user,ready]);
 useEffect(()=>{if(ready)localStorage.setItem('stylenest-orders',JSON.stringify(orders))},[orders,ready]);
 const addToCart=(product,quantity=1,size='')=>setCart(x=>{const key=product.slug+'|'+size;const old=x.find(i=>i.key===key);return old?x.map(i=>i.key===key?{...i,quantity:i.quantity+quantity}:{...i}):[...x,{key,product,quantity,size}]});
 const removeFromCart=key=>setCart(x=>x.filter(i=>i.key!==key));
 const updateQty=(key,quantity)=>setCart(x=>x.map(i=>i.key===key?{...i,quantity:Math.max(1,quantity)}:i));
 const clearCart=()=>setCart([]);
 const toggleWishlist=p=>setWishlist(x=>x.some(i=>i.slug===p.slug)?x.filter(i=>i.slug!==p.slug):[...x,p]);
 const login=(email,password)=>{const users=safeParse('stylenest-users',[]);const found=users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password);if(!found)return {ok:false,error:'Email or password is incorrect.'};const session={id:found.id,name:found.name,email:found.email};setUser(session);return {ok:true,user:session}};
 const register=(name,email,password)=>{const users=safeParse('stylenest-users',[]);if(users.some(u=>u.email.toLowerCase()===email.toLowerCase()))return {ok:false,error:'An account with this email already exists.'};const newUser={id:'user-'+Date.now(),name,email,password};localStorage.setItem('stylenest-users',JSON.stringify([...users,newUser]));const session={id:newUser.id,name,email};setUser(session);return {ok:true,user:session}};
 const logout=()=>setUser(null);
 const createOrder=({shippingAddress,deliveryMethod,paymentMethod})=>{const shipping=subtotal>=100?0:10;const order={id:'ORD-'+Date.now().toString().slice(-6),customerId:user?.id||'guest',customerName:user?.name||shippingAddress.name,customerEmail:user?.email||shippingAddress.email,items:cart.map(i=>({productId:i.product.slug,name:i.product.name,image:i.product.image,quantity:i.quantity,size:i.size,price:i.product.price})),subtotal,shipping,total:subtotal+shipping,status:'Pending',shippingAddress,deliveryMethod,paymentMethod,createdAt:new Date().toISOString()};setOrders(x=>[order,...x]);setCart([]);return order};
 const cartCount=cart.reduce((s,i)=>s+i.quantity,0),subtotal=cart.reduce((s,i)=>s+i.product.price*i.quantity,0);
 const value=useMemo(()=>({cart,wishlist,user,orders,addToCart,removeFromCart,updateQty,clearCart,toggleWishlist,login,register,logout,createOrder,cartCount,subtotal}),[cart,wishlist,user,orders,cartCount,subtotal]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useStore=()=>useContext(C);
