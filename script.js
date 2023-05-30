const projectModals = [
  {
    title: "Pachinko Builder",
    node: document.getElementById('pb'),
    desc: "This was a project I submitted for the 'Made with Defold 2023' game jam. This jam lasted seven days in total, and the rules stated that submissions must be made with the Defold game engine. This was a challenging experience for me because I had never used Defold before that point, nor did I have any knowledge about Lua, which is what Defold used as its programming language.",
    imgUrl: "images/captures/pbScreen1.png",
    link: "https://toastedthomas.itch.io/pachinko-builder",
    skills: ["Lua", "Time management", "Defold"]
  },
  {
    title: "Better Exchange",
    node: document.getElementById('be'),
    desc: "Better Exchange is a web application that uses the official Runescape Wiki API to grab information about any item listed on the Grand Exchange. This program provides up to date prices on items, daily volumes, alchemy values, and much more. The application also calculates the potential profits that could be made from various activities in game such as cooking or fletching.",
    imgUrl: "images/captures/beScreen1.png",
    link: "https://toastedthomas.github.io/BetterExchange",
    skills: ["APIs", "JavaScript", "HTML"]
  },
  {
    title: "Crop Clicker",
    node: document.getElementById('cc'),
    desc: "This was my first project I began work on while I taught myself programming. Crop clicker is a web browser game that is heavily inspired from Cookie Clicker by Orteil. I used this project as a way to build on my HTML, CSS, and JavaScript knowledge, as well as to learn other skills such as launching, updating, and bug fixing a live website. I also made all the art and sound for this project myself.",
    imgUrl: "images/captures/ccScreen1.png",
    link: "https://www.cropclicker.com",
    skills: ["JavaScript", "CSS", "Git", "Adobe Photoshop"]
  },
  {
    title: "Falling Sand",
    node: document.getElementById('fs'),
    desc: "Falling Sand is a simulator of exactly what it says, falling sand. This project was meant to refine my skills as a JavaScript developer, making me think logically and creatively.",
    imgUrl: "images/captures/fsScreen1.png",
    link: "https://toastedthomas.github.io/Falling-Sand/",
    skills: ["JavaScript", "HTML"]
  },
  {
    title: "Dice Roller",
    node: document.getElementById('dr'),
    desc: "I originally started this project to mess around with arrays and random number generation. As time went on I added multiple dice types and dice statistics. My goal with this project is to add more customization options and features while keeping this tool lightweight and fast. During experimental testing, I was able to roll 250,000 dice at once!",
    imgUrl: "images/captures/drScreen1.png",
    link: "https://toastedthomas.github.io/Dice-Roller-Js/",
    skills: ["JavaScript", "CSS", "HTML"]
  },
  {
    title: "PokeInfo",
    node: document.getElementById('pi'),
    desc: "This project was my introduction to working with APIs and working with other peoples documentation. My goal was to take in data from the PokeAPI database and display the information in an easy to understand format. Reading and fully understanding someone else's code is a very important skill to have, and working on this project helped refine that skill for me.",
    imgUrl: "images/captures/piScreen1.png",
    link: "https://toastedthomas.github.io/PokeInfo/",
    skills: ["APIs", "JavaScript", "CSS"]
  },
  {
    title: "Sample Survey Form",
    node: document.getElementById('ss'),
    desc: "This is a basic survey that showcases some of my skills I learned while taking the 'Responsive Web Design' course at freeCodeCamp.",
    imgUrl: "images/captures/ssScreen1.png",
    link: "https://toastedthomas.github.io/Sample-Survey/",
    skills: ["CSS", "WCAG", "HTML"]
  }
]

projectModals.forEach((element, index) => {
  element.node.addEventListener("click", function() { createModal(element) })
  element.node.addEventListener("mouseenter", function(e) {
    e.target.childNodes[1].src = "gifs/" + e.target.id + ".gif";
    e.target.childNodes[1].style.objectFit = "cover";
  });
  element.node.addEventListener("mouseleave", function(e) {
    e.target.childNodes[1].src = "images/captures/" + e.target.id + "Tile.png";
    e.target.childNodes[1].style.objectFit = "fill";
  });
})

function createModal(element) {
  //creating modal elements
  const modalOverlay = document.createElement('div');
  modalOverlay.id = "modal";
  document.getElementById('body').appendChild(modalOverlay);

  const modalBox = document.createElement('div');
  modalBox.classList.add("center");
  modalBox.classList.add("modalContent");
  modalOverlay.appendChild(modalBox);

  const closeButton = document.createElement('p');
  closeButton.addEventListener("click", function() { deleteModal(); });
  closeButton.classList.add("close");
  closeButton.innerHTML = "x";
  modalBox.appendChild(closeButton);

  const flexBox = document.createElement('div');
  flexBox.classList.add("modalFlex");
  modalBox.appendChild(flexBox);

  const section1 = document.createElement('div');
  flexBox.appendChild(section1);

  const title = document.createElement('h1');
  title.innerHTML = element.title;
  section1.appendChild(title);

  const desc = document.createElement('p');
  desc.classList.add("modalP1")
  desc.innerHTML = element.desc;
  section1.appendChild(desc);
  
  const skillBox = document.createElement('div');
  skillBox.classList.add('skillBox');
  element.skills.forEach(skillTxt => {
    const skill = document.createElement('p');
    skill.classList.add('skillBubble');
    skill.innerHTML = skillTxt
    skillBox.appendChild(skill);
  });
  section1.appendChild(skillBox)

  const img = document.createElement('img');
  img.src = element.imgUrl;
  flexBox.appendChild(img);

  const linkDesc = document.createElement('h2');
  linkDesc.innerHTML = "Check out " + element.title + " ";
  modalBox.appendChild(linkDesc);

  const link = document.createElement('a');
  link.innerHTML = "here!"
  link.target = "_blank";
  link.href = element.link;
  linkDesc.appendChild(link);

}

function deleteModal() {
  document.getElementById("modal").remove();
}

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