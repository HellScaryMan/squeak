<template>
  <div v-if="user">
    👋 Привіт, {{ user.first_name }} {{ user.last_name }}
    <br />
    <button @click="sendLocal">Локальна кнопка</button>
  </div>
  <div v-else>
    ⛔ Відкрий мене через Telegram WebApp
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
  const tg = window.Telegram?.WebApp
  if (!tg) {
    console.warn('❌ Не в Telegram WebApp')
    return
  }

  tg.ready()
  user.value = tg.initDataUnsafe?.user || null

  tg.MainButton.setText('🔥 Надіслати в бот')
  tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify({ from: 'mainButton', time: Date.now() }))
  })
  tg.MainButton.show()
})

function sendLocal() {
  const tg = window.Telegram?.WebApp
  tg?.sendData(JSON.stringify({ from: 'localClick' }))
}
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 16px;
}
</style>
