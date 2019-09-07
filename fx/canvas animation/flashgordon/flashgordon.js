var canvas,
    ctx,
    width = 600,
    height = 600,
    enemyTotal = 5,
    enemies = [],
    enemy_x = 50,
    enemy_y = -45,
    enemy_w = 50,
    enemy_h = 50,
    speed = 3,
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 50;

for (var i = 0; i < enemyTotal; i++) {
 enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
 enemy_x += enemy_w + 60;
}

function clearCanvas() {
 ctx.clearRect(0,0,width,height);
}

function drawEnemies() {
	var t = 'བཀྲ་ཤིས་བདེ་ལེགས།';
	for (var i = 0; i < enemies.length; i++) {
		ctx.fillStyle = '#f00';
		ctx.fillRect(enemies[i][0], enemies[i][1], enemy_w, enemy_h);
		ctx.font = "30px Arial";
		ctx.fillText(t,enemies[i][0], enemies[i][1]+30);
		ctx.strokeText(t,enemies[i][0], enemies[i][1]+30);
   }
}

function drawShip() {
 if (rightKey) ship_x += 5;
 else if (leftKey) ship_x -= 5;
 if (upKey) ship_y -= 5;
 else if (downKey) ship_y += 5;
 if (ship_x <= 0) ship_x = 0;
 if ((ship_x + ship_w) >= width) ship_x = width - ship_w;
  if (ship_y <= 0) ship_y = 0;
 if ((ship_y + ship_h) >= height) ship_y = height - ship_h;
  ctx.fillStyle = '#0f0';
  ctx.fillRect(ship_x, ship_y, ship_w, ship_h);
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
   if (enemies[i][1] < height) {
     enemies[i][1] += enemies[i][4];
   } else if (enemies[i][1] > height - 1) {
      enemies[i][1] = -45;
    }
  }
}

function init() {
  canvas = document.getElementById('questions');
  ctx = canvas.getContext('2d');
  setInterval(gameLoop, 25);
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
}
function gameLoop() {
  clearCanvas();
  moveEnemies();
  drawEnemies();
  drawShip();
}

function keyDown(e) {
  if (e.keyCode == 39) rightKey = true;
  else if (e.keyCode == 37) leftKey = true;
  if (e.keyCode == 38) upKey = true;
  else if (e.keyCode == 40) downKey = true;
}

function keyUp(e) {
  if (e.keyCode == 39) rightKey = false;
  else if (e.keyCode == 37) leftKey = false;
  if (e.keyCode == 38) upKey = false;
  else if (e.keyCode == 40) downKey = false;
}

window.onload = init;
