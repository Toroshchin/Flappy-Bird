var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var bgMenu = new Image();
var buttonStart = new Image();
var windowScore = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
bgMenu.src = "img/bgMenu.png";
buttonStart.src = "img/buttonStart.png";
windowScore.src = "img/windowScore.png";


/*
// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
*/
var gap = 100;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);
document.addEventListener("touchend", moveUp);

function moveUp() {
  yPos -= 25;
  // fly.play();
}

// Создание блоков
var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;
let bestScore = 0;
let status = false;

function renderMenu() {


  if (score > bestScore) {
    bestScore = score;;
  }
  cancelAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgMenu, 0, 0);
  ctx.drawImage(buttonStart, 65, 430);
  ctx.drawImage(windowScore, 83, 200);
  ctx.fillText(score, 155, 260);
  ctx.fillText(bestScore, 155, 310)

  score = 0;
  xPos = 10;
  yPos = 150;
  grav = 1.5;
  pipe = [];
  pipe[
    0] = {
    x: cvs.width,
    y: 0
  }
}

function draw() {
  status = true;
  ctx.drawImage(bg, 0, 0);
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;
    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    // Отслеживание прикосновений
    if (xPos + bird.width >= pipe[i].x &&
      xPos <= pipe[i].x + pipeUp.width &&
      (yPos <= pipe[i].y + pipeUp.height ||
        yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
      // Прорисовка меню
      renderMenu();
      status = false;
      return;
    }

    if (pipe[i].x == 5) {
      score++;
      // score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);
  yPos += grav;
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}

windowScore.onload = renderMenu;






canvas.addEventListener("click", e => {
  if (e.offsetX < 215 && e.offsetX > 65 && e.offsetY > 430 && e.offsetY < 483 && status == false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
  }
});
