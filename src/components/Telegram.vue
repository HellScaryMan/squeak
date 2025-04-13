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


  const userId = tg.initDataUnsafe?.user?.id;
  const messagesDiv = document.getElementById('messages');

  if (!userId) {
    messagesDiv.innerHTML = "❌ Не вдалося отримати ID користувача.";
  } else {
    fetch('https://your-backend.com/api/messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({telegram_user_id: userId})
    })
        .then(res => res.json())
        .then(messages => {
          if (!messages.length) {
            messagesDiv.innerHTML = "Повідомлень поки нема 😿";
            return;
          }

          messagesDiv.innerHTML = '';
          messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'msg';
            div.innerText = msg.text || '[немає тексту]';
            messagesDiv.appendChild(div);
          });
        })
        .catch(err => {
          console.error(err);
          messagesDiv.innerHTML = "⚠️ Помилка при завантаженні повідомлень.";
        });
  }
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
