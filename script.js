let time = 100;
let timerId;
let textTitle = [];
let selectImageNow = 1;
let firstplay = true;
loadingCount = 4;
function updateTimer() {
  timerId = setTimeout(updateTimer, 25);
  time -= 0.5;
  if (time <= 0) {
    selectImage();
    time = 100;
  }
  document.querySelector(".progress").style.width = time + "%";
}
function selectImage() {
  time = 100;
  document.querySelector(".progress").style.width = time + "%";
  selectImageNow++;
  if (selectImageNow > 4) {
    selectImageNow = 1;
  }
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.classList.remove("active");
    if (image.id === "img" + selectImageNow) {
      image.classList.add("active");
    }
  });
  const mainImg = document.getElementById("mainImg");
  mainImg.src = document.querySelector(".active").src;
  mainImg.nextElementSibling.textContent = textTitle[selectImageNow - 1];
}
//функция перезагрузки изображения
function reFresh() {
  for (let i = 0; i < 4; i++) {
    document.querySelectorAll("img")[i].classList.remove("active");
  }
  selectImageNow = 1;
  loadingCount = 4;
  const page = Math.floor(Math.random() * 50);
  fetch(
    "https://jsonplaceholder.typicode.com/photos?_start=" + page + "&_limit=4"
  )
    .then((respone) => respone.json())
    .then((data) => {
      const images = document.querySelectorAll("img");
      images.forEach((image, i) => {
        image.src = data[i].url;
        image.classList.add("loading");
        textTitle[i] = data[i].title;
      });
    });
}
function loaded(event) {
  loadingCount--;
  if (loadingCount === 0) {
    firstImage();
  }
  event.target.classList.remove("loading");
}
//функция переключения
function InMain(event) {
  if (event.target.tagName === "IMG") {
    for (let i = 0; i < 4; i++) {
      document.querySelectorAll("img")[i].classList.remove("active");
    }
    event.target.classList.toggle("active");
    const urlImg = event.target.src;
    const mainImg = document.getElementById("mainImg");
    mainImg.src = urlImg;
    if (event.target.id === "img1") {
      selectImageNow = 1;
      mainImg.nextElementSibling.textContent = textTitle[0];
    }
    if (event.target.id === "img2") {
      selectImageNow = 2;
      mainImg.nextElementSibling.textContent = textTitle[1];
    }
    if (event.target.id === "img3") {
      selectImageNow = 3;
      mainImg.nextElementSibling.textContent = textTitle[2];
    }
    if (event.target.id === "img4") {
      selectImageNow = 4;
      mainImg.nextElementSibling.textContent = textTitle[3];
    }
  }
}
function firstImage() {
  console.log(textTitle[0]);
  document.querySelectorAll("img")[0].classList.add("active");
  const mainImg = document.getElementById("mainImg");
  mainImg.nextElementSibling.textContent = textTitle[0];
  mainImg.src = document.querySelectorAll("img")[0].src;
}
function stopTimer() {
  document.querySelector(".stopTimer").textContent = "Play";
  document.querySelector(".stopTimer").classList.add("playTimer");
  document.querySelector(".stopTimer").classList.remove("stopTimer");
  document.querySelector(".playTimer").onclick = playTimer;

  clearTimeout(timerId);
}
function playTimer() {
  document.querySelector(".playTimer").textContent = "Stop";
  document.querySelector(".playTimer").classList.add("stopTimer");
  document.querySelector(".playTimer").classList.remove("playTimer");
  document.querySelector(".stopTimer").onclick = stopTimer;
  updateTimer();
}

//функция инициализации
function init() {
  reFresh();
  updateTimer();
  document.querySelector(".updateImages").onclick = reFresh;
  document.querySelector(".stopTimer").onclick = stopTimer;

  document.querySelector(".imageConteiner").addEventListener("click", InMain);
  document.querySelectorAll("img").forEach((image) => {
    image.onload = loaded;
  });
}
//инициализация
window.addEventListener("DOMContentLoaded", init);
