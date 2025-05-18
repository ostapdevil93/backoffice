<script
    setup
    lang="ts"
>
import {storeToRefs} from "pinia";
import {useAuthStore} from '@/stores/backofficeStores/AuthStore';
import ErrorDisplay from "@/components/UI/ErrorDisplay.vue";

const authStore = useAuthStore();
const {authData, isLogin, isForgotPassword} = storeToRefs(authStore);
const {login, resetPassword, showForgotPassword, showLogin} = authStore;


const handleLogin = () => {
  login();
};
</script>

<template>
  <div class="auth-modal ma-auto d-flex w-100 px-15">
    <ErrorDisplay />

    <!-- Форма Входа -->
    <form
        v-if="isLogin"
        class="auth-form w-50 ma-auto"
    >
      <h2 class="mb-2">Вход</h2>

      <v-text-field
          v-model="authData.email"
          label="Email"
          autocomplete="on"
          required
      />
      <v-text-field
          v-model="authData.password"
          label="Пароль"
          type="password"
          required
          autocomplete="on"
      ></v-text-field>
      <div class="auth-modal__action-container">
        <v-btn
            color="primary"
            @click="handleLogin"
        >Войти
        </v-btn>
        <a
            @click="showForgotPassword"
            class="text-right"
        >Забыли пароль?</a>
      </div>
    </form>

    <!-- Форма Восстановления пароля -->
    <form
        v-if="isForgotPassword"
        class="auth-form w-50 ma-auto"
    >
      <h2>Восстановление пароля</h2>
      <v-text-field
          v-model="authData.email"
          class="mt-5"
          label="Email"
          required
      ></v-text-field>
      <div class="auth-modal__action-container">
        <v-btn
            color="primary"
            @click="resetPassword"
        >Восстановить пароль
        </v-btn>
        <p>Вспомнили пароль? <a @click="showLogin">Войти</a></p>
      </div>
    </form>
  </div>
</template>

<style
    scoped
    lang="scss"
>
.auth-modal {
  &__action-container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
}

.auth-form {
  p {
    margin-top: 10px;
    text-align: center;
  }

  a {
    color: $royal-blue;
    cursor: pointer;
  }
}
</style>
