import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";
import {useAuthStore} from "stores/auth";
const userStore = useAuthStore()


export default boot(({ app }) => {
  const i18n = createI18n({
    locale: userStore.getDefaultLanguage || "it-IT",
    globalInjection: true,
    messages,
  });

  app.use(i18n);
});
