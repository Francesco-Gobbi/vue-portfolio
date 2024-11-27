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
  background: radial-gradient(
  circle at bottom left,
  #515151,
  #9a9a9a,
  #ffffff
  );
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100vw;
}


.form-radiant {
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(259, 259, 259, 0.3);
}
</style>
