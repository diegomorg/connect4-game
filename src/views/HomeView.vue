<script setup>
import GamesList from '@/components/GamesList.vue'

// import OldGamesList from '@/components/OldGamesList'
</script>

<template>
  <main>
    <header>
      <h1>Bem-vindo ao Connect4</h1>

      <RouterLink to="/new-game">Nova partida</RouterLink>
    </header>

    <GamesList />
  </main>
</template>

<style scoped>
main {
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
