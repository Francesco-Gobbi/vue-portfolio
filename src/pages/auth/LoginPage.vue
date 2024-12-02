<script setup>
import { reactive, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "stores/auth";
import {useRouter} from "vue-router";

import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'

const { t } = useI18n();
const authStore = useAuthStore();
const $q = useQuasar();
const router = useRouter();

const user = reactive({
  email: undefined,
  password: undefined
})

const userFormRules = {
  email: {
    requiredField: helpers.withMessage(t('validation.required'), required),
    emailField: helpers.withMessage(t('validation.invalidEmail'), email)
  },
  password: {
    passwordField: helpers.withMessage(t('validation.required'), required)
  }
}

const v$ = useVuelidate(userFormRules, user, { $autoDirty: false })

const state = reactive({
  email: "",
  username: "",
  password: "",
  repassword: "",
  passwordFieldType: "password",
  visibility: false,
  visibilityIcon: "visibility",
  btnLabel: t("loginMsg"),
  title: t("login"),
});

const tab = ref("login");

watch(tab, (newTab) => {
  if (newTab === "login") {
    state.title = t("login");
    state.btnLabel = t("loginMsg");
  } else if (newTab === "register") {
    state.title = t("register");
    state.btnLabel = t("registerMsg");
  }
});

const rules = {
  required: (val) => (val && val.length > 0) || t("requiredField"),
  diffPassword: (val) => (val && val === state.password) || t("differentPassword"),
  short: (val) => (val && val.length > 3) || t("shortPassword"),
  isEmail: (val) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(val) || t("invalidEmail");
  },
};

const submit = () => {
  const validations = [
    { value: state.email, rules: [rules.required, rules.isEmail] },
    { value: state.password, rules: [rules.required, rules.short] },
  ];

  if (tab.value === "register") {
    validations.push(
      { value: state.repassword, rules: [rules.required, rules.diffPassword] }
    );
  }

  const hasErrors = validations.some(({ value, rules }) =>
    rules.some((rule) => rule(value) !== true)
  );

  if (hasErrors) {
    $q.notify({ icon: "error", color: "negative", message: t("formNegative") });
    return;
  }

  if(!authStore.isAuthenticated){
    authStore.setToken(Math.random()*10000)
    authStore.createUser({name:state.email.toString().split("@")[0] ,url:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"})
    console.log(authStore.isAuthenticated);
  }
  console.log(authStore.isAuthenticated);
  console.log('auth success')
  $q.notify({icon: "success",position:'center',message:t('loginSuccess'),color:"green",timeout:500})
  router.push({name: 'home'})
};

const switchVisibility = () => {
  state.visibility = !state.visibility;
  state.passwordFieldType = state.visibility ? "text" : "password";
  state.visibilityIcon = state.visibility ? "visibility_off" : "visibility";
};
</script>

<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
      <q-page-container class="backgroud-radiant">
        <q-page class="window-height window-width row justify-center items-center">
          <div class="column q-pa-lg">
            <div class="row">
              <q-card square class="shadow-24 form-radiant" style="width: 400px; height: 540px;">
                <q-card-section style="background-color: gray; padding: 0px">
                  <q-tabs
                    v-model="tab"
                    align="justify"
                    narrow-indicator
                    class="q-mb-lg"
                    style="color: white;"
                  >
                    <q-tab class="text-gray" name="login" :label="t('login')" style="padding: 20px" />
                    <q-tab class="text-gray" name="register" :label="t('register')" />
                  </q-tabs>

                  <q-tab-panels
                    v-model="tab"
                    animated
                    transition-prev="scale"
                    transition-next="scale"
                    class="text-black text-center"
                  >
                    <q-tab-panel name="login">
                      <q-form class="q-px-sm q-pt-xl">

                        <q-input
                          clearable
                          v-model="state.email"
                          type="email"
                          lazy-rules
                          :rules="[rules.required, rules.isEmail]"
                          label="Email"
                        >
                          <template v-slot:prepend>
                            <q-icon name="email" />
                          </template>
                        </q-input>
                        <q-input
                          clearable
                          v-model="state.password"
                          :type="state.passwordFieldType"
                          lazy-rules
                          :rules="[rules.required, rules.short]"
                          label="Password"
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="state.visibilityIcon"
                              @click="switchVisibility"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </q-form>
                    </q-tab-panel>

                    <q-tab-panel name="register">
                      <q-form class="q-px-sm q-pt-xl">
                        <q-input
                          clearable
                          v-model="state.email"
                          type="email"
                          lazy-rules
                          :rules="[rules.required, rules.isEmail]"
                          label="Email"
                        >
                          <template v-slot:prepend>
                            <q-icon name="email" />
                          </template>
                        </q-input>
                        <q-input
                          clearable
                          v-model="state.password"
                          :type="state.passwordFieldType"
                          lazy-rules
                          :rules="[rules.required, rules.short]"
                          label="Password"
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="state.visibilityIcon"
                              @click="switchVisibility"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                        <q-input
                          clearable
                          v-model="state.repassword"
                          :type="state.passwordFieldType"
                          lazy-rules
                          :rules="[rules.required, rules.diffPassword]"
                          :label="t('confirmPassword')"
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                        </q-input>
                      </q-form>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card-section>
                <q-card-section>
                  <q-card-actions class="q-px-lg">
                    <q-btn
                      unelevated
                      size="lg"
                      color="secondary"
                      @click="submit"
                      class="full-width text-white"
                      :label="state.btnLabel"
                    />
                  </q-card-actions>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
