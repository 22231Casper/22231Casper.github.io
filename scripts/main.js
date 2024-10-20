var CBDisplays;
var cartNumDisplays;
var mode = "light";
var buttonChecks = [];
var muted = false;

var sounds = {
    "click": new Audio("/audio/Better Clicker Sound.mp3"),
    "upgrade": new Audio("/audio/Better Clicker Sound.mp3"),
    "boowomp": new Audio("/audio/boowomp.mp3"),
    "buy": new Audio("/audio/money.mp3"),
    "lottery": new Audio("/audio/lottery.mp3"),
    "flare": new Audio("/audio/flare_launch.mp3"),
    "evil": new Audio("/audio/evil-laugh.mp3"),
    "dunk": new Audio("/audio/dunk.mp3"),
    "giggle": new Audio("/audio/giggle.mp3"),
    "nummy pobcorn": new Audio("/audio/i-got-nummy-pobcorn.mp3"),
    "drink": new Audio("/audio/noah-drink.mp3"),
    "cappabot": new Audio("/audio/cappabot.mp3"),
    "crash1": new Audio("/audio/crash1.mp3"),
    "crash2": new Audio("/audio/crash2.mp3"),
    "crash3": new Audio("/audio/crash3.mp3"),
    "crash4": new Audio("/audio/crash4.mp3"),
    "crash5": new Audio("/audio/crash5.mp3"),
    "whip": new Audio("/audio/whip.mp3"),
    "prank": new Audio("/audio/funny-prank.mp3"),
    "prank2": new Audio("/audio/bathroom-prank2.mp3"),
    "prank3": new Audio("/audio/bathroom-prank3.mp3"),
    "vine boom": new Audio("/audio/vine-boom.mp3"),
    "jungle": new Audio("audio/audiojungle-watermark-sound-[AudioTrimmer.com].mp3"),
    "holy": new Audio("/audio/holy.mp3")
};

function playSound(soundName) {
    if (!muted) {
        let sound = sounds[soundName];
        if (Math.random() > 0.98) {
            sound = sounds["jungle"];
        }
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
}

function evilNoise() {
    // Do the thing
    setTimeout(function() {
        playSound("crash3")
    }, 1000)

    setTimeout(function() {
        playSound("crash1")
    }, 6000)

    setTimeout(function() {
        playSound("crash2")
    }, 11000)

    setTimeout(function() {
        playSound("crash4")
    }, 16000)
}

// Update the CappaBucks displays to show the current amount
function updateCBDisplays() {
    for (let i = 0; i < CBDisplays.length; i++) {
        CBDisplays[i].innerHTML = "CB: $" + getCB();
    }
}

// Return the current amount of CappaBucks
function getCB() {
    return parseFloat(localStorage.getItem("CappaBucks"));
}

// Set the current amount of CappaBucks to the given amount
function setCB(amount) {
    localStorage.setItem("CappaBucks", Math.floor(amount));
    updateCBDisplays();
}

// Add the given amount to the current amount of CappaBucks
function changeCB(amount) {
    setCB(parseFloat(getCB()) + amount);
}

function CBDisplaysInit() {
    if (!localStorage.getItem("CappaBucks")) {
        setCB(1);
    }
    // Get all displays on the page
    CBDisplays = document.getElementsByClassName("CBDisplay");

    // Update CappaBucks display once at the start
    updateCBDisplays();
}

// Cart
function cartNumDisplaysInit() {
    cartNumDisplays = document.getElementsByClassName("cartNumDisplay");
    if (!localStorage.getItem("cart")) {
        resetCart();
    }
    updateCartNumDisplays();
}

function resetCart() {
    localStorage.setItem("cart", JSON.stringify([]));
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

function addToCart(productName) {
    cart = getCart();

    cartIndex = 0;
    if (cart.length) {
        cartIndex = cart.length;
    }

    if (cartIndex >= 10) {
        alert("Too many item in cart :(");
    } else {
        cart[cartIndex] = productName;
        // Update local storage
        localStorage.setItem("cart", JSON.stringify(cart));
    
        let cartPopup = document.getElementById("cartPopup");
        cartPopup.style.display = "block";
    
        setTimeout(function() {
            cartPopup.style.display = "none";
        }, 6969);
    
        updateCartNumDisplays();
    }
}

function buyProducts() {
    if (check(cartTotal)) {
        changeCB(-cartTotal);
        playSound("buy");
        let cart = getCart();
        for (let i = 0; i < cart.length; i++) {
            setTimeout(function() {download("/images/" + cart[i]);}, 500)
        }
        removeAllFromCart();
    }
}

function removeAllFromCart() {
    resetCart();
    updateCartDisplay();
}

function updateCartNumDisplays() {
    cart = getCart();
    for (let i = 0; i < cartNumDisplays.length; i++) {
        cartNumDisplays[i].innerHTML = "Cart (" + cart.length + ")";
    }
}

function updateCartTotal(cartTotal) {
    document.getElementById("cartTotal").innerHTML = "$CB: " + cartTotal;
    cartPriceCheck(cartTotal);
}

function cartPriceCheck(cartTotal) {
    var cartButton = document.getElementById("buyButton");
    if (check(cartTotal)) {
        cartButton.classList.remove("disabled");
    } else {
        cartButton.classList.add("disabled");
    }
}

function productClick(productName) {
    playSound("click")
    console.log("Clicked " + productName);
}

function check(amount) {
    return getCB() >= amount;
}

function buyButton() {
    buyProducts();
}

function download(file) {
    let element = document.createElement("a");
    element.setAttribute("href", file);
    element.setAttribute("download", file);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

function activateMoney() {
    playSound("lottery")
    let moneys = document.getElementsByClassName("money");

    // Mega money jumpscare fr
    activateCoins();
    for (let i = 0; i < moneys.length; i++) {
        moneys[i].style.display = "block";

        setTimeout(function () {
            moneys[i].style.display = "none";
        }, 3700);
    }
}

function activateCoins() {
    // Get the coin image names
    let coinNames = ["burger-coin.png", "coin.png", "coin2.png", "dabloon.png", "happy-coin.png", "big money.jpg", "gfgfg.jpg", "nfhf.jpg", "cart.jpg", "ai.webp", "gggggg.png", "ffffff.webp", "sash.webp"];

    let totalTime = 3; // In seconds
    let totalCoins = 100; // Spawn 100 coins
    // Make *a few* coins on the page using random coin names
    for (let i = 0; i < totalCoins; i++) {
        setTimeout(function() {makeCoin("/images/coin/" + coinNames[Math.floor(Math.random() * coinNames.length)]);}
                   , (i-1) * totalTime*1000/totalCoins);
    }
}

function makeCoin(coinName) {
    let x = Math.floor(Math.random() * 100);
    let y = -25;
    let xv = Math.random() - 0.5;
    let yv = 1;

    var boingus = 0;
    var gravity = 0.15;

    if (coinName == undefined) {
        coinName = "/images/coin/coin.png";
    }

    let coin = document.createElement("img");
    
    coin.src = coinName;
    coin.classList.add("coin");
    coin.style.top = "-69%"
    document.body.appendChild(coin);
    
    let coinInterval = setInterval(function () {
        // Collision left and right
        /*if (x > 100 || x < 0) {
            xv *= -1 - boingus;
        }*.

        // Collision for the ground
        /*if (y > 100) {
            yv *= -1 - boingus;
        }*/
        
        yv += gravity;
        
        y += yv;
        x += xv;
        
        coin.style.left = x + "%";
        coin.style.top = y + "%";
    }, 25)
    
    // Remove the coin after a bit of time
    setTimeout(function () {
        clearInterval(coinInterval)
        document.body.removeChild(coin);
    }, 4000);
}

// Dark and light mode
function changeMode(mode) {
    // window.matchMedia('(prefers-color-scheme: dark)').matches
    let root = document.querySelector(':root');

    let keys =         ["--white", "--grey", "--greyer", "--black", "--light", "--lightish", "--dark", "--darker"];
    
    let lightColours = ["#FFFFFF", "#696969", "#424242", "#000000", "#ECEEFE", "#D4DEFF", "#5061FF", "#4051DF"];
    
    let darkColours =  ["#000000", "#696969", "#424242", "#FFFFFF", "#29369C", "#1D2567", "#4956BC", "#3D4587"];

    let lowContrast =  ["#000000", "#000001", "#000002", "#000003", "#000003", "#000004", "#000005", "#000006"];

    let colours = [];

    if (mode == "light") {
        colours = lightColours;
    } else if (mode == "dark") {
        colours = darkColours;
    } else if (mode == "yup") {
        colours = lowContrast;
    } else {
        console.log("Invalid mode");
    }
    
    // set css variable
    for (let i = 0; i < keys.length; i++) {
        root.style.setProperty(keys[i], colours[i]);
    }

    // update localStorage
    localStorage.setItem("mode", mode)
}

// The main function that runs on every page
function main() {
    var page = window.location.pathname.split("/").pop();
    console.log("Main is running at " + page);

    // Initialise displays
    CBDisplaysInit();
    cartNumDisplaysInit();

    // Change to preffered mode
    let mode = localStorage.getItem("mode");
    if (!mode) {
        mode = "light";
    }
    changeMode(mode);

    // Change all delay_name scripts to actual scripts
    var allScripts = document.getElementsByTagName("script");
    for (let i = 0; i < allScripts.length; i++) {
        let scriptID = allScripts[i].id;
        if (!scriptID) {
            continue;
        }
        if (scriptID.substring(0, 6) == "delay_") {
            allScripts[i].setAttribute(
                "src",
                "/scripts/" + scriptID.substring(6) + ".js",
            );
        }
    }
}

// Run main
setTimeout(main, 500)