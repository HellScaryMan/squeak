<template>
  <div>
    <!-- Місце для віджет Telegram -->
    <div id="telegram-login-container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Динамічно створюємо <script> тег і додаємо його до сторінки
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'Vintone');  // Ваш логін Telegram бота
    script.setAttribute('data-size', 'medium');  // Розмір кнопки
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');  // Функція для обробки авторизації
    document.getElementById('telegram-login-container').appendChild(script);  // Додаємо скрипт в DOM
  },
  methods: {
    // Функція для обробки авторизації користувача через Telegram
    onTelegramAuth(user) {
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    },
  },
};
</script>

<style scoped>
/* Ваші стилі тут */
</style>