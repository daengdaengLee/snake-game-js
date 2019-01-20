import { UP, RIGHT, DOWN, LEFT, BLOCK_COUNT } from "../../constants.js";

// Actions
export const CHANGE_DIRECTION = "CHANGE_DIRECTION";
export const MOVE = "MOVE";

// Init state
const initState = {
  direction: RIGHT,
  snake: [[4, 4], [3, 4], [2, 4], [1, 4], [0, 4]],
  target: [3, 3]
};

// Reducer
export default function gamesReducer(state = initState, action = {}) {
  switch (action.type) {
    case CHANGE_DIRECTION:
      return applyChangeDirection(state, action);
    case MOVE:
      return applyMove(state, action);
    default:
      return state;
  }
}

// Helpers
function moveSnake(snake, direction) {
  const dx = direction === RIGHT ? 1 : direction === LEFT ? -1 : 0;
  const dy = direction === DOWN ? 1 : direction === UP ? -1 : 0;

  let headX = snake[0][0] + dx;
  if (headX < 0) headX = BLOCK_COUNT - 1;
  else if (headX >= BLOCK_COUNT) headX = 0;

  let headY = snake[0][1] + dy;
  if (headY < 0) headY = BLOCK_COUNT - 1;
  else if (headY >= BLOCK_COUNT) headY = 0;

  return [[headX, headY], ...snake.slice(0, snake.length - 1)];
}

function checkDie(snake) {
  const headX = snake[0][0];
  const headY = snake[0][1];

  for (let i = 1; i < snake.length; i++) {
    if (snake[i][0] === headX && snake[i][1] === headY) return false;
  }

  return true;
}

// Reducer functions
function applyChangeDirection(state, { direction }) {
  if (state.direction === direction) return state;

  if (direction === UP) {
    if (state.direction === DOWN) return state;
    return Object.assign({}, state, { direction: UP });
  } else if (direction === RIGHT) {
    if (state.direction === LEFT) return state;
    return Object.assign({}, state, { direction: RIGHT });
  } else if (direction === DOWN) {
    if (state.direction === UP) return state;
    return Object.assign({}, state, { direction: DOWN });
  } else if (direction === LEFT) {
    if (state.direction === RIGHT) return state;
    return Object.assign({}, state, { direction: LEFT });
  }

  return state;
}

function applyMove(state) {
  const snake = moveSnake(state.snake, state.direction);

  if (!checkDie(snake)) {
    return initState;
  }

  let target = state.target;

  const headX = snake[0][0];
  const headY = snake[0][1];

  if (headX === target[0] && headY === target[1]) {
    let targetX = Math.floor(Math.random() * BLOCK_COUNT);
    let targetY = Math.floor(Math.random() * BLOCK_COUNT);
    while (snake.find(([x, y]) => x === targetX && y === targetY)) {
      targetX = Math.floor(Math.random() * BLOCK_COUNT);
      targetY = Math.floor(Math.random() * BLOCK_COUNT);
    }
    target = [targetX, targetY];

    const tail = snake[state.snake.length - 1];
    const tailX = tail[0];
    const tailY = tail[1];

    switch (state.direction) {
      case UP:
        snake.push([tailX, tailY - 1 < 0 ? BLOCK_COUNT - 1 : tailY - 1]);
        break;
      case RIGHT:
        snake.push([tailX + 1 > 19 ? 0 : tailX + 1, tailY]);
        break;
      case DOWN:
        snake.push([tailX, tailY + 1 > 19 ? 0 : tailY + 1]);
        break;
      case LEFT:
        snake.push([tailX - 1 < 0 ? BLOCK_COUNT - 1 : tailX - 1, tailY]);
        break;
      default:
    }
  }

  return Object.assign({}, state, { snake, target });
}

// Action creators
export const changeDirection = direction => ({
  type: CHANGE_DIRECTION,
  direction
});

export const move = () => ({
  type: MOVE
});
