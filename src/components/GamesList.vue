<script setup>
import { ref, onMounted } from 'vue'
import { listOldGames } from '@/services/api'

const games = ref([])

const fetchGames = async () => {
  try {
    games.value = await listOldGames()
  } catch (error) {
    console.error('Error fetching games:', error)
  }
}

onMounted(fetchGames)
</script>

<template>
  <table v-if="games.length">
    <thead>
      <tr>
        <th>ID</th>
        <th>Jogador 1</th>
        <th>Jogador 2</th>
        <th>Vencedor</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in games" :key="game.id">
        <td>{{ game.id }}</td>
        <td>{{ game.player1 }}</td>
        <td>{{ game.player2 }}</td>
        <td>{{ game.winner }}</td>
        <td><button @click="viewDetails(game.id)">Detalhes</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
function viewDetails(gameId) {
  // Implement the logic to view game details
  console.log('View details for game:', gameId)
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
