<template>
  <router-view />
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style>
.backgroud-radiant {
  background: linear-gradient(135deg, #1a73e8 0%, #833ab4 100%);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

body{
  background: linear-gradient(135deg, #0b2e61 0%, #500b78 100%);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  max-width: 600px;
}

.logo {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.custom-button {
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 25px;
  padding: 10px 20px;
}

.register-button {
  background: linear-gradient(90deg, #ff7eb3, #ff758c);
}

.login-button {
  background: linear-gradient(90deg, #42a5f5, #00c6ff);
}
</style>
