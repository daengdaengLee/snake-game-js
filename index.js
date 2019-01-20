import { BLOCK_SIZE, BLOCK_MARGIN, GAME_CONSOLE_SIZE } from "./constants.js";
import store from "./ducks/index.js";
import { move, changeDirection } from "./ducks/modules/games.js";

function init() {
  const gameConsole = document.querySelector("#game-console");

  gameConsole.width = GAME_CONSOLE_SIZE;
  gameConsole.height = GAME_CONSOLE_SIZE;

  store.subscribe(draw);

  setInterval(() => store.dispatch(move()), 500);

  document.addEventListener("keydown", ({ keyCode }) =>
    store.dispatch(changeDirection(keyCode))
  );
}

function draw() {
  const gameConsole = document.querySelector("#game-console");
  const ctx = gameConsole.getContext("2d");

  const { target, snake } = store.getState();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, GAME_CONSOLE_SIZE, GAME_CONSOLE_SIZE);

  ctx.fillStyle = "red";
  ctx.fillRect(
    BLOCK_SIZE * target[0] + BLOCK_MARGIN * target[0],
    BLOCK_SIZE * target[1] + BLOCK_MARGIN * target[1],
    BLOCK_SIZE,
    BLOCK_SIZE
  );

  ctx.fillStyle = "lime";
  for (const [x, y] of snake) {
    ctx.fillRect(
      BLOCK_SIZE * x + BLOCK_MARGIN * x,
      BLOCK_SIZE * y + BLOCK_MARGIN * y,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }
}

window.onload = init;
