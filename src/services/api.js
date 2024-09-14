import axios from 'axios'

const api = axios.create({
  baseURL: 'https://your-api-base-url.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const listOldGames = async () => {
  try {
    const response = await api.get('/games')
    return response.data
  } catch (error) {
    console.error('Error listing old games:', error)
    throw error
  }
}

export const startNewGame = async ({ player1, player2, color1, color2 }) => {
  try {
    const response = await api.post('/games', {
      player1,
      player2,
      color1,
      color2
    })
    return response.data
  } catch (error) {
    console.error('Error starting new game:', error)
    throw error
  }
}
