<script setup>
import GameBoard from '@/components/GameBoard.vue'
</script>

<template>
  <main>
    <GameBoard />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
