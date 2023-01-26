const closeBtn = document.getElementsByClassName('close');
const modalMain = document.getElementById('modal');

const projectTiles = [document.getElementById('cc'), document.getElementById('fs'), document.getElementById('dr'), document.getElementById('pi'), document.getElementById('gb'), document.getElementById('r2s'), document.getElementById('yt'), document.getElementById('ss')/*, document.getElementById('rain')*/]
const myWorkTiles = [document.getElementById('cc'), document.getElementById('fs'), document.getElementById('dr'), document.getElementById('pi'), document.getElementById('gb'), document.getElementById('ss')];
const modalContent = [document.getElementById('ccModal'), document.getElementById('fsModal'), document.getElementById('drModal'), document.getElementById('piModal'), document.getElementById('gbModal'), document.getElementById('artModal1'), document.getElementById('artModal2'), document.getElementById('ssModal'), document.getElementById('artModal3')]

//document.getElementById('rain').play();

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

for(let e of myWorkTiles) {
  e.addEventListener("mouseenter", function(e) {
    e.target.childNodes[1].src = "gifs/" + e.target.id + ".gif";
    e.target.childNodes[1].style.objectFit = "cover";
  });
  e.addEventListener("mouseleave", function(e) {
    e.target.childNodes[1].src = "images/captures/" + e.target.id + "Tile.png";
    e.target.childNodes[1].style.objectFit = "fill";
  });
}

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

//code for grid effect

let tileVisible = false;

let columns = Math.floor(document.body.clientWidth / 100);
let rows = Math.floor(document.body.clientHeight / 200);
const wrapper = document.getElementById("tiles");

const handleOnClick = index => {
  opactiyToggle();
  tileVisible = !tileVisible;
  anime({
    targets: ".tile",
    opacity: tileVisible ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
   })
}

const opactiyToggle = () => {
  document.body.classList.toggle("toggled");
}

const createTile = index => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.onclick = element => handleOnClick(index);
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  })
}

createTiles(columns * rows);

const createGrid = () => {
  wrapper.innerHTML = "";

  columns = Math.floor(document.body.clientWidth / 100);
  rows = Math.floor(document.body.clientHeight / 200);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
}

window.onresize = () => createGrid();
window.onload = () => createGrid();