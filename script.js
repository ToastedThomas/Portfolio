const closeBtn = document.getElementsByClassName('close');
const modalMain = document.getElementById('modal');

const projectTiles = [document.getElementById('cc'), document.getElementById('fs'), document.getElementById('dr'), document.getElementById('pi'), document.getElementById('gb'), document.getElementById('r2s'), document.getElementById('yt'), document.getElementById('ss')]
const modalContent = [document.getElementById('ccModal'), document.getElementById('fsModal'), document.getElementById('drModal'), document.getElementById('piModal'), document.getElementById('gbModal'), document.getElementById('artModal1'), document.getElementById('artModal2'), document.getElementById('ssModal')]


// array.from takes the Dom collection and turns it into an array to use
Array.from(closeBtn).forEach((element) => {
  element.onclick = function() {
    modalMain.style.animation = "disappear 0.25s";
    setTimeout(function() {
      modalMain.style.display = "none";
      modalContent.forEach(element => {element.style.display = "none";})
      modalMain.style.animation = "none";
    }, 240);
  };
});


projectTiles.forEach((element, index) => {
  element.onclick = function() {
    modalMain.style.animation = "disappear 0.25s reverse";
    setTimeout(function() {
      modalMain.style.animation = "none";
    }, 240);
    modalMain.style.display = "block";
    modalContent[index].style.display = "block";
  }
});

// sandbox code below 
let width = 130;
let height = 70;
let cellSize = 10;
const cvs = document.getElementById('cvs');
cvs.width = width * cellSize;
cvs.height = height * cellSize;
const ctx = cvs.getContext('2d');
let buffer = [];
const EMPTY = 0;
const WALL = 1;
const COFFEE = 2;
const colors = {};
colors[EMPTY] = '#252525';
colors[WALL] = '#ADADAD';
colors[COFFEE] = '#1F140E';

for (var i = 0; i < width * height; i++)
    buffer[i] = EMPTY;

function setBuf(x, y, val) {
  buffer[x + y * width] = val;
}

function getBuf(x, y) {
  if (x < 0 || x >= width ||
      y < 0 || y >= height)
      return EMPTY;
  return buffer[x + y * width];
}

// setting the walls
for (var x = -10; x <= 10; x++)
  setBuf(Math.floor(width / 2) + x, height - 10, WALL);

for (var y = height - 10; y > height - 40; y--) {
  setBuf(Math.floor(width / 2) - 10, y, WALL);
  setBuf(Math.floor(width / 2) + 10, y, WALL);
}

setBuf(76, 52, WALL);
setBuf(76, 51, WALL);
setBuf(77, 50, WALL);
setBuf(78, 49, WALL);
setBuf(79, 48, WALL);
setBuf(80, 47, WALL);
setBuf(81, 46, WALL);
setBuf(82, 45, WALL);
setBuf(83, 44, WALL);
setBuf(83, 43, WALL);
setBuf(83, 42, WALL);
setBuf(82, 41, WALL);
setBuf(81, 40, WALL);
setBuf(80, 40, WALL);
setBuf(79, 40, WALL);
setBuf(78, 40, WALL);
setBuf(77, 41, WALL);
setBuf(76, 42, WALL);

const emptyOrLiquid = [EMPTY, COFFEE];

function think() {
  for (var y = height - 1; y >= 0; y--) {
    for (var x = 0; x < width; x++) {
      var dir = Math.random() < 0.5 ? -1 : 1;
      if (getBuf(x, y) == COFFEE) {
        if (getBuf(x, y + 1) == EMPTY) {
          setBuf (x, y, getBuf(x, y +1));
          setBuf(x, y + 1, COFFEE);
        } else if (getBuf(x + dir, y) == EMPTY) {
          setBuf(x, y, getBuf(x + dir, y));
          setBuf(x + dir, y, COFFEE);
        }
      }
    }
  }
}

function draw() {
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
        ctx.fillStyle = colors[getBuf(x, y)];
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

let placingInterval;
let cursorX;
let cursorY;
let marginVal = parseInt(getComputedStyle(cvs).getPropertyValue('margin-left'));

cvs.onmousemove = function(event) {
  //tracking mouse location for placing
  cursorX = event.clientX;
  cursorY = event.clientY;
}
cvs.onmousedown = function(event) {
  //setting the rate at how fast elements are placed
  document.getElementById('clickToPour').style.animation = 'disappear 2s both';
  placingInterval = setInterval(placing, 20, event);
}

function placing(event) {
  marginVal = parseInt(getComputedStyle(cvs).getPropertyValue('margin-left'));
  setBuf((Math.floor(cursorX/10) - 1 - Math.floor(marginVal/10)) /* + (Math.floor(Math.random() * 3) - 1)*/, Math.floor(cursorY/10) - 8, COFFEE);
  //console.log(Math.floor(cursorX/10) - 1)
  //console.log(Math.floor(cursorY/10) - 1)
}

cvs.onmouseup = function() {
  //turns off the placing loop
  clearInterval(placingInterval);
  placingInterval = null;
}
cvs.onmouseleave = function() {
  //also turns off the placing loop
  clearInterval(placingInterval);
  placingInterval = null;
}

function tick() {
  think();
  draw();
}

// draw a frame every 0.01 second
setInterval(tick, 10);