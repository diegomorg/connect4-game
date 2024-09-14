<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { startNewGame } from '@/services/api'

const router = useRouter()

const player1 = ref('')
const player2 = ref('')
const color1 = ref('#f00')
const color2 = ref('#ff0')

const startGame = async () => {
  if (!player1.value || !player2.value) {
    alert('Both player names must be provided.')
    return
  }

  if (!color1.value || !color2.value) {
    alert('Both player colors must be selected.')
    return
  }

  try {
    const response = await startNewGame({
      player1: player1.value,
      player2: player2.value,
      color1: color1.value,
      color2: color2.value
    })
    console.log('Game started successfully:', response.data)
    router.push(`/game/${response.data.id}`)
  } catch (error) {
    console.error('Error starting game:', error)
  }
}
</script>

<template>
  <main>
    <h3>Informe os nomes dos participantes e selecionem suas cores</h3>

    <section>
      <div class="player">
        <input type="text" v-bind="player1" placeholder="Jogador 1" />
        <input type="color" v-bind="color1" />
      </div>

      <div class="player">
        <input type="text" v-bind="player2" placeholder="Jogador 2" />
        <input type="color" v-bind="color2" />
      </div>

      <button @click="startGame">Iniciar</button>
    </section>
  </main>
</template>

<style scoped>
.player {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

input[type='text'] {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-right: 10px;
}

input[type='color'] {
  margin-left: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
