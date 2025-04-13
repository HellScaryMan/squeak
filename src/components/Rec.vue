<template>
  <div class="recorder">
    <button @click="startRecording" :disabled="recording">🎙️ Почати запис</button>
    <button @click="stopRecording" :disabled="!recording">🛑 Зупинити</button>

    <div v-if="audioUrl">
      <h3>Запис:</h3>
      <audio :src="audioUrl" controls></audio>
      <a :href="audioUrl" download="recording.webm">⬇️ Завантажити</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const recording = ref(false);
const audioUrl = ref(null);
let mediaRecorder = null;
let audioChunks = [];

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioChunks = [];
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (e) => {
    audioChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    audioUrl.value = URL.createObjectURL(audioBlob);
  };

  mediaRecorder.start();
  recording.value = true;
};

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    recording.value = false;
  }
};
</script>

<style scoped>
.recorder {
  background: #111;
  padding: 20px;
  border-radius: 12px;
  color: white;
}
button {
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
}
</style>
