import Ball from "./ball.js";

const canvas = document.createElement("canvas");
canvas.id = "target";

const width = 1000;
const height = 800;
canvas.width = width;
canvas.height = height;

let currentTarget;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const RADIAN = Math.PI / 180;

let dragable = false;

const time = 6;

const balls = [];

for (let i = 0; i < time; i++) {
  balls.push(new Ball(getRandomIntInclusive(10, 100), width, height));
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function handleDragging(e) {
  const { offsetX: x, offsetY: y } = e;

  if (!currentTarget) {
    balls.forEach((ball) => {
      if (
        Math.sqrt(Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2)) <=
        ball.RADIUS
      ) {
        currentTarget = ball;
      }
    });
  }

  const diffX = x - currentTarget.x;
  const diffY = y - currentTarget.y;
  currentTarget.x += diffX;
  currentTarget.y += diffY;
}

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function draw() {
  balls.forEach((ball) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.RADIUS, 0, 360 * RADIAN);
    ctx.stroke();
  });
}

function main(t) {
  window.requestAnimationFrame(main);

  clear();
  draw();
}

window.requestAnimationFrame(main);
canvas.addEventListener("mousedown", (e) => {
  dragable = true;
});
canvas.addEventListener("mousemove", (e) => {
  return dragable && handleDragging(e);
});
canvas.addEventListener("mouseup", (e) => {
  dragable = false;
  currentTarget = null;
});
