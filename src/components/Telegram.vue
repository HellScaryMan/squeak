<template>
  <div v-if="user">
    👋 Привіт, {{ user.first_name }} {{ user.last_name }}
    <br />
    <button @click="sendData">Надіслати</button>
  </div>
  <div v-else>
    🚫 Запусти через Telegram
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
  const tg = window.Telegram?.WebApp
  console.log('window.Telegram:', tg)

  if (!tg) {
    // 👇 Для локальної розробки в браузері (тест)
    user.value = {
      id: 123456,
      first_name: 'Dev',
      last_name: 'Test',
      username: 'devtest',
      language_code: 'uk',
      is_premium: false,
    }
    return
  }

  tg.ready()
  user.value = tg.initDataUnsafe?.user || null

  tg.MainButton.setText('🔥 Надіслати')
  tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify({ msg: 'Привіт з кнопки!' }))
  })
  tg.MainButton.show()
})

function sendData() {
  const tg = window.Telegram?.WebApp
  if (tg) {
    tg.sendData(JSON.stringify({ msg: 'Привіт з локальної кнопки!' }))
  }
}
</script>

<style scoped>
div {
  font-size: 1.2rem;
  padding: 1rem;
}
button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  font-weight: bold;
}
</style>