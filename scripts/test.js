alert("bbq burger")

javascript: images = ['images/Freaky Casper.png', 'images/money dollar.gif', 'images/John Mugshot.jpg', 'images/John Mews.png', 'images/Group Photo.jpg', 'images/car-crash.gif', 'images/Group walk.png', 'images/Deep Fried Casper.png', 'images/casper.png', 'images/Casper on Mount Everest.jpg']; stuff = document.getElementsByTagName("img"); for (var i = 0; i<stuff.length; i++) {stuff[i].src = 'https://22231casper.github.io/' + images[Math.floor(Math.random()*images.length)];} void 0

