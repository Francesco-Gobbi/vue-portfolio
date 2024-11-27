<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import {useAuthStore} from "stores/auth";

const userStore = useAuthStore()
const { locale, t } = useI18n()
const $q = useQuasar()

const availableLocales = {
  'it-IT': {},
  'en-US': {}
}
const currentLocale = computed(() => locale.value)

const changeLocale = (newLocale) => {
  locale.value = newLocale
  userStore.setLanguage(newLocale)
  $q.notify({
    message: 'Language changed',
    color: 'positive'
  })
}

const initLanguage = () => {
  const savedLocale = userStore.getDefaultLanguage
  if (savedLocale && availableLocales[savedLocale]) {
    locale.value = savedLocale
  }
}

initLanguage()
</script>

<template>
  <q-btn-dropdown
    flat
    dense
    icon="language"
    class="q-ml-md"
  >
    <q-list>
      <q-item
        v-for="(lang, key) in availableLocales"
        :key="key"
        clickable
        v-close-popup
        @click="changeLocale(key)"
        :class="{ 'bg-primary text-white': key === currentLocale }"
      >
        <q-item-section avatar>
          <q-icon
            v-if="key === currentLocale"
            name="check"
            color="white"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ t(`languages.${key.split('-')[0]}`) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
