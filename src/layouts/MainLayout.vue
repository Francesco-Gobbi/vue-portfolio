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

        <div v-if="isAuthenticate">
          Ciao {{userStore.user.name}}
        </div>
        <div v-else @click="goTo('login')">
          Effettua il login
        </div>
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

const userStore = useAuthStore()
const isAuthenticate = computed(()=>userStore.isAuthenticated)

const router = useRouter()
const goTo = (routeName) => {
  router.push({ name: routeName })
}
console.log("Main page");

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
