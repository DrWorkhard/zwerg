const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const tileWidth = 64;
const tileHeight = 32;
const mapWidth = 10;
const mapHeight = 10;

// player position in tile coordinates
let player = { x: 5, y: 5 };

// keyboard handling
const keys = {};
window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

function update() {
  if (keys['w']) player.y -= 0.1;
  if (keys['s']) player.y += 0.1;
  if (keys['a']) player.x -= 0.1;
  if (keys['d']) player.x += 0.1;

  player.x = Math.max(0, Math.min(mapWidth - 1, player.x));
  player.y = Math.max(0, Math.min(mapHeight - 1, player.y));
}

function tileToScreen(x, y) {
  return {
    x: (x - y) * tileWidth / 2 + canvas.width / 2,
    y: (x + y) * tileHeight / 2
  };
}

function drawTile(x, y, color) {
  const p = tileToScreen(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x + tileWidth / 2, p.y + tileHeight / 2);
  ctx.lineTo(p.x, p.y + tileHeight);
  ctx.lineTo(p.x - tileWidth / 2, p.y + tileHeight / 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw floor tiles
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      drawTile(x, y, '#2d6');
    }
  }

  // draw player as red diamond
  drawTile(player.x, player.y, '#e33');
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
