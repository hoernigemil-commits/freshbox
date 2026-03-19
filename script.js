const productData = {
"Italian Pasta Box": { price: 12.99, cal: 650 },
"Burger Box": { price: 13.99, cal: 850 },
"Veggie Box": { price: 11.99, cal: 500 },
"Fitness Protein Box": { price: 14.99, cal: 700 },
"Family Dinner Box": { price: 19.99, cal: 1200 },
"Sushi Home Kit": { price: 24.99, cal: 450 },
"Taco Night Box": { price: 15.99, cal: 750 },
"Smoothie Pack": { price: 9.99, cal: 250 }
};

let cart = JSON.parse(localStorage.getItem('freshbox_cart')) || [];

/* ADD TO CART */
function addToCart(name, price){
const item = cart.find(i=>i.name===name);
if(item){ item.qty++; }
else{ cart.push({name,price,qty:1}); }
updateUI();
showToast(name + " hinzugefügt!");
}

/* UPDATE UI */
function updateUI(){
localStorage.setItem("freshbox_cart",JSON.stringify(cart));

const count = cart.reduce((a,b)=>a+b.qty,0);
document.querySelectorAll("#cart-count").forEach(el=>{
el.innerText = count;
});

const container = document.getElementById("cart-items");

if(container){
let html = "";
let total = 0;

cart.forEach((item,index)=>{
total += item.price * item.qty;

html += `
<div class="cart-item-row">
<span>${item.name}</span>
<div>
<button onclick="changeQty(${index},-1)">-</button>
<span>${item.qty}</span>
<button onclick="changeQty(${index},1)">+</button>
</div>
<span>€${(item.price*item.qty).toFixed(2)}</span>
</div>
`;
});

if(!cart.length){
html="<p>Warenkorb ist leer.</p>";
}

container.innerHTML = html;

const totalEl = document.getElementById("cart-total");
if(totalEl){
totalEl.innerText = total.toFixed(2);
}
}
}

/* CHANGE QTY */
function changeQty(index,delta){
cart[index].qty += delta;
if(cart[index].qty<=0){
cart.splice(index,1);
}
updateUI();
}

/* SEARCH */
function filterProducts(){
const q = document.getElementById("searchBar").value.toLowerCase();
document.querySelectorAll(".product-card").forEach(card=>{
const title = card.querySelector("h3").innerText.toLowerCase();
card.style.display = title.includes(q) ? "block" : "none";
});
}

/* CHECKOUT */
function startCheckout(){

if(!cart.length){
alert("Warenkorb leer!");
return;
}

const overlay = document.createElement("div");
overlay.className="checkout-overlay";

overlay.innerHTML=`
<div class="checkout-modal">
<div class="spinner"></div>
<h2 id="st">Zahlung wird geprüft...</h2>
</div>
`;

document.body.appendChild(overlay);

const steps=[
"Zahlung bestätigt",
"Zutaten werden vorbereitet",
"Paket wird verpackt",
"Kurier unterwegs",
"Geliefert"
];

steps.forEach((msg,i)=>{
setTimeout(()=>{
document.getElementById("st").innerText=msg;

if(i===steps.length-1){
setTimeout(()=>{
generateInvoice();
alert("Bestellung erfolgreich!");
cart=[];
updateUI();
overlay.remove();
},1500);
}

},(i+1)*1500);
});
}

/* INVOICE */
function generateInvoice(){
let text="FreshBox Rechnung\n\n";
cart.forEach(item=>{
text += item.name + " x" + item.qty + "\n";
});
const blob = new Blob([text],{type:"text/plain"});
const link=document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download="rechnung.txt";
link.click();
}

/* TOAST */
function showToast(msg){
const t=document.createElement("div");
t.className="toast";
t.innerText=msg;
document.body.appendChild(t);
setTimeout(()=>{ t.remove(); },3000);
}

/* FAKE ORDERS */
const cities=["Berlin","Hamburg","Paris","Madrid","London","New York"];

function fakeOrders(){
const products = Object.keys(productData);
const city=cities[Math.floor(Math.random()*cities.length)];
const product=products[Math.floor(Math.random()*products.length)];
showToast("Neue Bestellung aus "+city+": "+product);
}

setInterval(fakeOrders,10000);

/* START */
document.addEventListener("DOMContentLoaded",()=>{
updateUI();
});
 // COUNTDOWN TIMER
function startCountdown() {
    let time = 7200; // 2 Stunden in Sekunden

    const el = document.getElementById("countdown");
    if (!el) return;

    setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        el.innerText =
            String(hours).padStart(2, '0') + ":" +
            String(minutes).padStart(2, '0') + ":" +
            String(seconds).padStart(2, '0');

        if (time > 0) time--;
    }, 1000);
}

startCountdown();
// FAKE LIVE BESTELLUNGEN
// FAKE LIVE BESTELLUNGEN (UPDATE: länger sichtbar)
function fakeOrders() {
    const names = ["Max", "Lisa", "Tom", "Anna", "Leon", "Sophie"];
    const cities = ["Berlin", "Hamburg", "München", "Köln"];
    const products = ["Pasta Box", "Burger Box", "Sushi Kit", "Taco Box", "Smoothie Pack", "Veggie Box"];

    setInterval(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const product = products[Math.floor(Math.random() * products.length)];

        const div = document.createElement("div");
        div.className = "live-order";
        div.innerText = `${name} aus ${city} hat gerade ${product} bestellt`;

        document.body.appendChild(div);

        // Länger sichtbar: 7 Sekunden statt 4
        setTimeout(() => div.remove(), 7000);
    }, 5000); // alle 5 Sekunden neue Bestellung
}

fakeOrders();// FAKE LIVE BESTELLUNGEN (UPDATE: länger sichtbar)
function fakeOrders() {
    const names = ["Max", "Lisa", "Tom", "Anna", "Leon", "Sophie"];
    const cities = ["Berlin", "Hamburg", "München", "Köln"];
    const products = ["Pasta Box", "Burger Box", "Sushi Kit", "Taco Box", "Smoothie Pack", "Veggie Box"];

    setInterval(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const product = products[Math.floor(Math.random() * products.length)];

        const div = document.createElement("div");
        div.className = "live-order";
        div.innerText = `${name} aus ${city} hat gerade ${product} bestellt`;

        document.body.appendChild(div);

        // Länger sichtbar: 7 Sekunden statt 4
        setTimeout(() => div.remove(), 7000);
    }, 5000); // alle 5 Sekunden neue Bestellung
}

fakeOrders();// FAKE LIVE BESTELLUNGEN (UPDATE: länger sichtbar)
function fakeOrders() {
    const names = ["Max", "Lisa", "Tom", "Anna", "Leon", "Sophie"];
    const cities = ["Berlin", "Hamburg", "München", "Köln"];
    const products = ["Pasta Box", "Burger Box", "Sushi Kit", "Taco Box", "Smoothie Pack", "Veggie Box"];

    setInterval(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const product = products[Math.floor(Math.random() * products.length)];

        const div = document.createElement("div");
        div.className = "live-order";
        div.innerText = `${name} aus ${city} hat gerade ${product} bestellt`;

        document.body.appendChild(div);

        // Länger sichtbar: 7 Sekunden statt 4
        setTimeout(() => div.remove(), 7000);
    }, 5000); // alle 5 Sekunden neue Bestellung
}

fakeOrders();// FAKE LIVE BESTELLUNGEN (UPDATE: länger sichtbar)
function fakeOrders() {
    const names = ["Leo Eulitz", "Alfred Kackt Geld", "Tom Black", "Felix Thiele", "Rainer Wilnkler", "Dirk Pezolt"];
    const cities = ["Leos Mistfarm", "Reichenviertel", "Buxtehude", "Drachenschantze"];
    const products = ["Pasta Box", "Burger Box", "Sushi Kit", "Taco Box", "Smoothie Pack", "Veggie Box"];

    setInterval(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const product = products[Math.floor(Math.random() * products.length)];

        const div = document.createElement("div");
        div.className = "live-order";
        div.innerText = `${name} aus ${city} hat gerade ${product} bestellt`;

        document.body.appendChild(div);

        // Länger sichtbar: 7 Sekunden statt 4
        setTimeout(() => div.remove(), 7000);
    }, 5000); // alle 5 Sekunden neue Bestellung
}

fakeOrders();
// FAKE CHECKOUT
function startCheckout() {
    if (!cart.length) return alert("Warenkorb ist leer!");

    const overlay = document.createElement('div');
    overlay.className = 'checkout-overlay';
    overlay.innerHTML = `
        <div class="checkout-modal">
            <div class="spinner"></div>
            <h2 id="checkout-text">Verbinde mit Global-Logistics...</h2>
        </div>`;
    document.body.appendChild(overlay);

    const messages = [
        "Zahlung wird autorisiert...",
        "Bestätigung aus Lager Dortmund...",
        "Kurier zugewiesen...",
        "Bestellung abgeschlossen!"
    ];

    messages.forEach((msg, i) => {
        setTimeout(() => {
            document.getElementById('checkout-text').innerText = msg;

            // Nach letzter Nachricht
            if (i === messages.length - 1) {
                setTimeout(() => {
                    // TXT automatisch erstellen
                    if (cart.length) {
                        let content = "=== FreshBox Bestellung ===\n\n";
                        let total = 0;
                        cart.forEach(item => {
                            content += `${item.name} x${item.qty} - €${(item.price*item.qty).toFixed(2)}\n`;
                            total += item.price * item.qty;
                        });
                        content += `\nGesamtsumme: €${total.toFixed(2)}\n`;
                        content += "=========================\n";

                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'Bestellung_FreshBox.txt';
                        a.click();
                        URL.revokeObjectURL(url);
                    }

                    alert("Bestellung erfolgreich!");
                    cart = [];
                    updateUI();
                    overlay.remove();
                }, 1000);
            }
        }, (i + 1) * 1500);
    });
}
// WARENKORB ALS TXT HERUNTERLADEN
function exportCartAsTXT() {
    if (!cart.length) return alert("Warenkorb ist leer!");

    let content = "=== FreshBox Bestellung ===\n\n";
    let total = 0;

    cart.forEach(item => {
        content += `${item.name} x${item.qty} - €${(item.price*item.qty).toFixed(2)}\n`;
        total += item.price * item.qty;
    });

    content += `\nGesamtsumme: €${total.toFixed(2)}\n`;
    content += "=========================\n";

    // Datei erstellen
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bestellung_FreshBox.txt';
    a.click();

    URL.revokeObjectURL(url);
}

