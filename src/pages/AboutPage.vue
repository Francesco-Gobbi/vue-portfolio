<script setup>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const cards = [
  {
    title: 'Card 1',
    colors: {
      from: '#35a2ff',
      to: '#014a88'
    }
  },
  {
    title: 'Card 2',
    colors: {
      from: '#ff6f61',
      to: '#e94e2b'
    }
  },
  {
    title: 'Card 3',
    colors: {
      from: '#57e32c',
      to: '#1a8e1a'
    }
  }]

defineComponent({
  name: 'AboutPage',
  props: {
    title: {
      type: String,
      default: 'default'
    }
  }
})
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="(card, index) in cards"
      :key="index"
      class="my-card text-white"
      :style="{
        background: `radial-gradient(circle, ${card.colors.from} 0%, ${card.colors.to} 100%)`
      }"
    >
      <q-card-section>
        <div class="text-h6">{{ card.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ t("messaggio") }}
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.my-card {
  width: 300px;
  height: 200px;
}
</style>
