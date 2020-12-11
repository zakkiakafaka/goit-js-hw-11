import colors from "../data/colors.js";

const refs = {
  body: document.querySelector("body"),
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
};

let intervalId = null;
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () => {
  refs.body.style.backgroundColor =
    colors[randomIntegerFromInterval(0, colors.length)];
};

const startChangeColor = () => {
  intervalId = setInterval(randomColor, 1000);
  refs.startBtn.removeEventListener("click", startChangeColor);
};

const stopChangeColor = () => {
  clearInterval(intervalId);
  refs.startBtn.addEventListener("click", startChangeColor);
};

refs.startBtn.addEventListener("click", startChangeColor);
refs.stopBtn.addEventListener("click", stopChangeColor);
