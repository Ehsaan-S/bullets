let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

function RandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomColour() {
  return `#` + Math.floor(Math.random() * 16777215).toString(16);
}

let targets = [];

let player = {
  x: 400,
  y: 550,
  radius: 20,
  speed: 5,
  colour: "red",
};

function addTargets(count) {
  for (let i = 0; i < count; i++) {
    targets.push({
      x: RandomNum(0, cnv.width),
      y: RandomNum(0, 500 - 5),
      radius: RandomNum(10, 25),
      xspeed: RandomNum(-1, 1),
      yspeed: RandomNum(-1, 1),
      colour: getRandomColour(),
    });
  }
}
addTargets(20);

function drawPlayer(player) {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.colour;
  ctx.fill();

  ctx.stroke();
  ctx.closePath();
}

function drawtargets() {
  for (let i = 0; i < targets.length; i++) {
    let target = targets[i];
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    ctx.fillStyle = target.colour;
    ctx.fill();
    ctx.closePath();
    target.x += target.xspeed;
    target.y += target.yspeed;
  }
}
function bounceTargets() {
  for (let i = 0; i < targets.length; i++) {
    let target = targets[i];
    if (target.x + target.radius > cnv.width) {
      target.xspeed = -target.xspeed;
    }
    if (target.x - target.radius < 0) {
      target.xspeed = -target.xspeed;
    }
    if (target.y + target.radius > 500 - target.radius) {
      target.yspeed = -target.yspeed;
    }
    if (target.y - target.radius < 0) {
      target.yspeed = -target.yspeed;
    }
  }
}
function DrawLine() {
  ctx.beginPath();
  ctx.moveTo(0, 501);
  ctx.lineTo(cnv.width, 500);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

function gameLoop() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  drawPlayer(player);
  drawtargets();
  bounceTargets();
  DrawLine();
  requestAnimationFrame(gameLoop);
}
gameLoop();
