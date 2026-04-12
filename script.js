// 1. PAGE SWITCHER
function showPage(pageId) {
    console.log("Switching to page:", pageId); // For debugging
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active-page'));

    // Show the selected one
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active-page');
    }

    // Cart visibility
    const cart = document.getElementById('cart-drawer');
    if (pageId === 'menu') {
        cart.classList.remove('hidden');
    } else {
        cart.classList.add('hidden');
    }

    window.scrollTo(0, 0);
}

// SPARKLE CLICK INTERACTION
document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SUMMARY') {
        confetti({
            particleCount: 5,
            spread: 20,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#ffc1d6', '#ff85a2'],
            ticks: 50
        });
    }
});

// 2. SHOPPING LOGIC
let total = 0;

function addToCart(name, price) {
    total += price;
    
    const audio = new Audio('https://www.soundjay.com/magic/magic-chime-01.mp3');
    audio.volume = 0.2;
    audio.play();

    const list = document.getElementById("cart-items-list");
    const entry = document.createElement("li");
    entry.innerHTML = `<span>${name}</span> <span>Rp ${price.toLocaleString()}</span>`;
    list.appendChild(entry);
    
    document.getElementById("cart-total").innerText = "Rp " + total.toLocaleString();

    let itemCount = list.getElementsByTagName("li").length;
    document.title = `(${itemCount}) BURE BAKES 🥐`;

    const drawer = document.getElementById('cart-drawer');
    drawer.style.transform = "scale(1.05)";
    setTimeout(() => drawer.style.transform = "scale(1)", 200);
}

function checkout() {
    if (total === 0) {
        const drawer = document.getElementById('cart-drawer');
        drawer.classList.add('shake');
        setTimeout(() => drawer.classList.remove('shake'), 500);
        alert("Your basket is empty! 🥐 Grab some bread first!");
    } else {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffc1d6', '#ff85a2', '#ffffff']
        });

        setTimeout(() => {
            alert("BURE BAKES: ORDER SUCCESS! ✨\nTotal: Rp " + total.toLocaleString() + "\nSee you at Maggiore Junction, bestie! 🎀");
            location.reload(); 
        }, 500);
    }
}

function addBobaToCart() {
    const select = document.getElementById("boba-flavour");
    const flavour = select.value;

    if (!flavour) {
        alert("Please select a flavour first! 🧋");
        return;
    }

    addToCart("Bubble Tea (" + flavour + ")", 32000);
}

function updateFlavourColor(select) {
    const colors = {
        "Milk Tea": "#c69c6d",
        "Strawberry": "#ff6b9a",
        "Matcha": "#7bc96f",
        "Chocolate": "#6b3e26",
        "Banana": "#f2d16b"
    };

    select.style.backgroundColor = colors[select.value] || "white";
    select.style.color = select.value ? "white" : "black";
}