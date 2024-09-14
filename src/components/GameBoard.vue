<template>
  <div class="container">
    <aside class="sidebar">
      <h1>Connect4</h1>
      <h2>Partida {{ gameId }}</h2>
      <p class="players">{{ winnerText }}</p>
      <button @click="resetGame">Reiniciar</button>
      <button @click="endGame">Encerrar</button>
    </aside>
    <div class="game-board">
      <div class="board">
        <div
          v-for="(col, colIndex) in board"
          :key="colIndex"
          class="column"
          @click="handleColumnClick(colIndex)"
        >
          <div v-for="(cell, rowIndex) in col" :key="rowIndex" class="cell">
            <div
              class="circle"
              :class="{
                red: cell === 'red',
                yellow: cell === 'yellow',
                'winner-circle': winningPositions.some(
                  (pos) => pos.col === colIndex && pos.row === rowIndex
                )
              }"
              :style="{ backgroundColor: cell || '#eee' }"
            >
              <svg
                v-if="winningPositions.some((pos) => pos.col === colIndex && pos.row === rowIndex)"
                class="winner-x"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  cols: {
    type: Number,
    default: 7
  },
  rows: {
    type: Number,
    default: 6
  },
  gameId: {
    type: Number,
    required: true
  }
})

const board = ref(Array.from({ length: props.cols }, () => Array(props.rows).fill(null)))
const currentColor = ref('red')
const winner = ref(null)
const winningPositions = ref([])

const router = useRouter()

const checkWinner = (colIndex, rowIndex) => {
  const color = board.value[colIndex][rowIndex]
  if (!color) return false

  const directions = [
    { x: 1, y: 0 }, // horizontal
    { x: 0, y: 1 }, // vertical
    { x: 1, y: 1 }, // diagonal bottom-left to top-right
    { x: 1, y: -1 } // diagonal top-left to bottom-right
  ]

  for (const { x, y } of directions) {
    let count = 0
    const positions = []

    for (let i = -3; i <= 3; i++) {
      const newX = colIndex + i * x
      const newY = rowIndex + i * y

      if (
        newX >= 0 &&
        newX < props.cols &&
        newY >= 0 &&
        newY < props.rows &&
        board.value[newX][newY] === color
      ) {
        count++
        positions.push({ col: newX, row: newY })
        if (count === 4) {
          winningPositions.value = positions
          return true
        }
      } else {
        count = 0
        positions.length = 0
      }
    }
  }

  return false
}

const handleColumnClick = (colIndex) => {
  if (winner.value) return

  for (let rowIndex = props.rows - 1; rowIndex >= 0; rowIndex--) {
    if (!board.value[colIndex][rowIndex]) {
      board.value[colIndex][rowIndex] = currentColor.value
      if (checkWinner(colIndex, rowIndex)) {
        winner.value = currentColor.value
      }
      currentColor.value = currentColor.value === 'red' ? 'yellow' : 'red'
      break
    }
  }
}

const resetGame = () => {
  board.value = Array.from({ length: props.cols }, () => Array(props.rows).fill(null))
  currentColor.value = 'red'
  winner.value = null
  winningPositions.value = []
}

const endGame = () => {
  router.push('/')
}

const winnerText = computed(() => {
  if (winner.value) {
    return winner.value === 'red' ? 'Player1 venceu' : 'Player2 venceu'
  }
  return 'Player1 VS Player2'
})
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-right: 20px;
}
.sidebar h1 {
  margin-bottom: 10px;
}
.sidebar h2 {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #555;
}
.sidebar .players {
  margin: 5px 0;
  font-size: 0.9em;
  color: #777;
}
.sidebar button {
  margin: 10px 0;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.sidebar button:hover {
  background-color: #0056b3;
}
.game-board {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.board {
  display: flex;
  flex-direction: row;
  background-color: #d3d3d3; /* Light gray background for the board */
  border-radius: 8px;
  padding: 8px;
}
.column {
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s;
}
.column:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
.cell {
  background-color: white;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white; /* White background for empty circles */
}
.circle.red {
  background-color: red; /* Red background for player 1 */
}
.circle.yellow {
  background-color: yellow; /* Yellow background for player 2 */
}
.winner-circle {
  box-shadow: 0 0 5px #ffd700;
}
.winner-x {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #ffd700;
}
</style>
