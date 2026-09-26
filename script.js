// ===================== DEEN CLOTHING SETTINGS =====================
// Replace the values below with the boutique's real information.
const BUSINESS = {
  whatsapp: "234", // WhatsApp number WITHOUT + or spaces
  phone: "+234 800 000 0000",
  address: "Deen Clothing, Yola, Adamawa, Nigeria",
  mapsQuery: "Deen Clothing, Yola, Adamawa, Nigeria"
};

// Add/edit your products here. For a real product photo, put the image in
// the assets folder and set image to "assets/your-photo.jpg".
const products = [
  {id:1,name:"Classic Dress",category:"Dresses",price:25000,image:"assets/deen1.jpg",badge:"NEW"},
  {id:2,name:"Everyday Top",category:"Tops",price:12000,image:"assets/deen2.jpg",badge:""},
  {id:3,name:"Elegant Two-Piece",category:"Sets",price:30000,image:"assets/deen3.jpg",badge:"POPULAR"},
  {id:4,name:"Statement Bag",category:"Accessories",price:18000,image:"assets/deen4.jpg",badge:""},
  {id:5,name:"Occasion Dress",category:"Dresses",price:35000,image:"assets/deen5.jpg",badge:"NEW"},
  {id:6,name:"Premium Top",category:"Tops",price:15000,image:"assets/deen6.jpg",badge:""},
  {id:7,name:"Modest Set",category:"Sets",price:28000,image:"assets/deen7.jpg",badge:""},
  {id:8,name:"Fashion Scarf",category:"Accessories",price:8000,image:"assets/deen8.jpg",badge:""}
];

const gallery = [
  {title:"New arrivals",image:""},
  {title:"Everyday style",image:"",wide:true},
  {title:"Occasion wear",image:"",tall:true},
  {title:"Details",image:""},
  {title:"Your next look",image:""},
  {title:"Deen Clothing",image:"",wide:true}
];

let activeCategory="All";
let cart=[];

const money = n => "₦" + n.toLocaleString("en-NG");

function productImage(item){
  return item.image
    ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
    : `<div class="placeholder-label">ADD PHOTO</div>`;
}
function renderProducts(){
  const list=products.filter(p=>activeCategory==="All"||p.category===activeCategory);
  document.getElementById("products").innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-image">${productImage(p)}${p.badge?`<span class="badge">${p.badge}</span>`:""}</div>
      <div class="product-info">
        <h3>${p.name}</h3><p>${p.category}</p>
        <div class="product-bottom"><span class="price">${money(p.price)}</span>
        <button class="add" onclick="addToCart(${p.id})">ADD TO BAG</button></div>
      </div>
    </article>`).join("");
}
function renderGallery(){
  document.getElementById("galleryGrid").innerHTML=gallery.map(g=>`
    <div class="gallery-item ${g.wide?"wide":""} ${g.tall?"tall":""}">
      ${g.image?`<img src="${g.image}" alt="${g.title}" loading="lazy">`:`<span class="placeholder-label">ADD PHOTO</span>`}
      <span class="gallery-caption">${g.title}</span>
    </div>`).join("");
}
function addToCart(id){
  const item=products.find(p=>p.id===id); const found=cart.find(x=>x.id===id);
  if(found) found.qty++; else cart.push({...item,qty:1});
  renderCart(); document.getElementById("cartOverlay").classList.add("open");
  toast(item.name+" added to your bag");
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`
    <div class="cart-item"><div class="cart-thumb">${x.image?`<img src="${x.image}" style="width:100%;height:100%;object-fit:cover">`:"PHOTO"}</div>
    <div><h4>${x.name}</h4><p>${x.qty} × ${money(x.price)}</p></div>
    <button class="remove" onclick="removeFromCart(${x.id})">Remove</button></div>`).join(""):`<p class="empty">Your bag is empty.</p>`;
  document.getElementById("cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}
function orderOnWhatsApp(){
  if(!cart.length){toast("Add an item to your bag first");return;}
  let msg="Hello Deen Clothing! I would like to order:%0A%0A";
  cart.forEach(x=>msg+=`• ${x.name} — ${x.qty} × ${money(x.price)}%0A`);
  msg+=`%0AEstimated total: ${money(cart.reduce((a,x)=>a+x.price*x.qty,0))}%0A%0APlease confirm availability, sizes/colours and delivery details.`;
  window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`,"_blank");
}
function toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts();
}));
document.getElementById("cartBtn").onclick=()=>document.getElementById("cartOverlay").classList.add("open");
document.getElementById("closeCart").onclick=()=>document.getElementById("cartOverlay").classList.remove("open");
document.getElementById("cartOverlay").addEventListener("click",e=>{if(e.target.id==="cartOverlay")e.currentTarget.classList.remove("open")});
document.getElementById("orderBtn").onclick=orderOnWhatsApp;
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");

document.getElementById("whatsappLink").href=`https://wa.me/${BUSINESS.whatsapp}?text=Hello%20Deen%20Clothing%2C%20I%20would%20like%20to%20make%20an%20enquiry.`;
document.getElementById("phoneLink").href=`tel:${BUSINESS.phone.replace(/[^+\d]/g,"")}`;
document.getElementById("mapLink").href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapsQuery)}`;
document.getElementById("displayWhatsapp").textContent="+"+BUSINESS.whatsapp;
document.getElementById("displayPhone").textContent=BUSINESS.phone;
document.getElementById("displayAddress").textContent=BUSINESS.address;
document.getElementById("year").textContent=new Date().getFullYear();

renderProducts();renderGallery();renderCart();
