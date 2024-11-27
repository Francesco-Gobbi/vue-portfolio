import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import persistentStore from 'pinia-plugin-persistedstate'

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()
  pinia.use(persistentStore)

  return pinia
})
