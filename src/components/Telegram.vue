<template>
  <div v-if="user">
    Привіт, {{ user.first_name }} {{ user.last_name }}
    <br />
    <button @click="sendData">Надіслати</button>
  </div>
  <div v-else>
    Запусти в Telegram
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const user = ref<Telegram.WebAppUser | null>(null);

onMounted(() => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.warn('Telegram WebApp не знайдено. Запусти через Telegram.');
    return;
  }

  tg.ready();
  user.value = tg.initDataUnsafe?.user ?? null;

  tg.MainButton.setText('⚡ Надіслати hello');
  tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify({ hello: 'world' }));
  });
  tg.MainButton.show();
});

function sendData() {
  window.Telegram?.WebApp.sendData(JSON.stringify({ localClick: true }));
}
</script>
