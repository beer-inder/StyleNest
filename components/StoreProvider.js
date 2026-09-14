'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
const C=createContext(null);
export function StoreProvider({children}){
 const [cart,setCart]=useState([]); const [wishlist,setWishlist]=useState([]); const [ready,setReady]=useState(false);
 useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem('stylenest-cart')||'[]'));setWishlist(JSON.parse(localStorage.getItem('stylenest-wishlist')||'[]'));}catch{} setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem('stylenest-cart',JSON.stringify(cart))},[cart,ready]);
 useEffect(()=>{if(ready)localStorage.setItem('stylenest-wishlist',JSON.stringify(wishlist))},[wishlist,ready]);
 const addToCart=(product,quantity=1,size='')=>setCart(x=>{const key=product.slug+'|'+size;const old=x.find(i=>i.key===key);return old?x.map(i=>i.key===key?{...i,quantity:i.quantity+quantity}:{...i}):[...x,{key,product,quantity,size}]});
 const removeFromCart=key=>setCart(x=>x.filter(i=>i.key!==key));
 const updateQty=(key,quantity)=>setCart(x=>x.map(i=>i.key===key?{...i,quantity:Math.max(1,quantity)}:i));
 const toggleWishlist=p=>setWishlist(x=>x.some(i=>i.slug===p.slug)?x.filter(i=>i.slug!==p.slug):[...x,p]);
 const cartCount=cart.reduce((s,i)=>s+i.quantity,0),subtotal=cart.reduce((s,i)=>s+i.product.price*i.quantity,0);
 const value=useMemo(()=>({cart,wishlist,addToCart,removeFromCart,updateQty,toggleWishlist,cartCount,subtotal}),[cart,wishlist,cartCount,subtotal]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useStore=()=>useContext(C);
