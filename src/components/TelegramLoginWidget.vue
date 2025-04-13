<template>
  <div>
    <!-- Телеграм віджет буде ініціалізовано в mounted() -->
  </div>
</template>

<script>
export default {
  mounted() {
    // Додаємо скрипт Telegram після того, як компонент змонтовано
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'Vintonebot');  // Вказуємо ваш логін Telegram бота
    script.setAttribute('data-size', 'medium');  // Розмір кнопки
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');  // Функція для обробки авторизації
    document.body.appendChild(script);  // Додаємо скрипт до body
  },
  methods: {
    // Функція, яка викликається після авторизації користувача через Telegram
    onTelegramAuth(user) {
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    },
  },
};
</script>

<style scoped>
/* Ваші стилі тут */
</style>