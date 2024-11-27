<template>
  <q-page class="flex flex-center">
    <div class="column items-center text-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
      class="logo"
    >
    <p class="q-mt-md welcome-text">
      {{t('messageTest') + userStore.getUser.name}}
    </p>
    </div>
  </q-page>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {useAuthStore} from "stores/auth";

const userStore = useAuthStore()
const { t } = useI18n();

</script>
