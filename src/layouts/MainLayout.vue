<template>
  <q-layout view="HHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <LanguageSelection />
        <q-avatar>
          <img :src="userStore.getUser.url || ''">
        </q-avatar>
        <q-btn flat round dense icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          @click="goTo(link.link)"
          :title="link.title"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed} from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import {useAuthStore} from "stores/auth";
import {useQuasar} from "quasar";
import {useI18n} from "vue-i18n";
import LanguageSelection from "components/LanguageSelection.vue";

const userStore = useAuthStore()
const isAuthenticate = computed(()=>userStore.isAuthenticated)
const $q = useQuasar()
const { t } = useI18n();

const router = useRouter()
const logout = () => {
  userStore.logout()
  $q.notify({icon: "success",position:'center',message:t('logoutSuccess'),timeout:500})
  goTo('login')
}
const goTo = (routeName) => {
  router.push({ name: routeName })
}

const essentialLinks = [
  {
    title: 'Shopping',
    caption: 'quasar.dev',
    icon: 'pricing',
    link: 'shopping'
  },
  {
    title: 'About',
    caption: 'quasar.dev',
    icon: 'about',
    link: 'about'
  }
]

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
