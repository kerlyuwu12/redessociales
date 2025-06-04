// Variables para el jugador
const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 60,
  height: 60,
  speed: playerSpeed,
  dx: 0,
};

// Control de teclado para mover al jugador
function keyDownHandler(e) {
  if (e.key === 'ArrowRight') {
    player.dx = player.speed;
  } else if (e.key === 'ArrowLeft') {
    player.dx = -player.speed;
  }
}

function keyUpHandler(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    player.dx = 0;
  }
}

// Dibuja el jugador
function drawPlayer() {
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Actualiza posición del jugador
function updatePlayer() {
  player.x += player.dx;
  // Limitar al canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Limpia el canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función principal del juego (loop)
function gameLoop() {
  if (!gameRunning) return; // Para el juego si no está activo

  clear();
  updatePlayer();
  drawPlayer();

  // Aquí agregarías lógica para objetos (ventajas, desventajas, colisiones...)

  requestAnimationFrame(gameLoop);
}

// Iniciar el juego
function startGame() {
  if (gameRunning) return; // Si ya está corriendo, no hacer nada

  score = 0;
  health = 100;
  scoreDisplay.textContent = score;
  healthDisplay.textContent = health;
  player.x = canvas.width / 2 - player.width / 2;
  gameRunning = true;
  startButton.style.display = 'none';
  restartButton.style.display = 'inline-block';

  // Ajustar tamaño del canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Agregar listeners de teclado
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);

  gameLoop();
}

// Reiniciar el juego
function restartGame() {
  gameRunning = false;
  startGame();
}

// Eventos botones
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
