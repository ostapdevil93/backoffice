<script setup lang="ts">
import { ref, ComponentPublicInstance } from "vue";
// import { useGeneralSettings } from "@/stores/projectsStore/GeneralSettings";
// import { storeToRefs } from "pinia";

// const generalSettings = useGeneralSettings();
// const { drawer } = storeToRefs(generalSettings);

// Состояние для отображения всплывающего окна
const isMenuOpen = ref(false);
const menuActivatorRef = ref<(string & {}) | Element | 'parent' | ComponentPublicInstance>();

// Пример функции для смены языка
const switchLanguage = (lang: string) => {
  console.log(`Language switched to: ${lang}`);
};

// const toggleDrawer = () => {
//   drawer.value = !drawer.value;
// };

const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};
</script>

<template>
  <v-app-bar theme="dark" class="appBar">
    <v-app-bar-title v-text="'ADVA RU Administrator'" class="ml-2" />

    <v-spacer class="flex-grow-0" />
    <div class="appBar__button-container">
      <v-btn
          text="RU"
          class="lang-button px-0"
          @click.stop="switchLanguage('ru')"
      />
      <v-btn
          text="ENG"
          class="lang-button px-0"
          @click.stop="switchLanguage('en')"
      />
    </div>

    <!-- Всплывающее окно -->
    <v-menu
        v-model="isMenuOpen"
        :close-on-content-click="false"
        :activator="menuActivatorRef"
        offset-y
    >
      <template #activator="{ props }">
        <v-btn
            v-bind="props"
            ref="menuActivatorRef"
            @click="isMenuOpen = !isMenuOpen"
        >
          <v-icon class="mr-2 appBar__login">mdi-account</v-icon>
          <span>userName</span>
        </v-btn>
      </template>
      <v-card
          class="popup-card"
          height="fit-content"
      >
        <v-card-text>
          <p>
            Вы уверены, что хотите выйти?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="logout">
            Log out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<style scoped lang="scss">
.appBar {
  &__button-container {
    padding: 0 10px;
    border-left: 1px solid $white;
    border-right: 1px solid $white;
    display: flex;
    gap: 10px;
    @media (max-width: 768px) {
      border: unset;
      padding: unset;
    }
  }

  .lang-button {
    min-width: unset;
    font-size: calc(10rem / 16 + (14 - 10) * ((100vw - 500rem / 16) / (1920 - 500)));

    @media (min-width: 1920px) {
      font-size: 14px;
    }
    @media (max-width: 768px) {
      min-width: unset;
    }
    @media (max-width: 500px) {
      font-size: 10px;
    }

    &:hover {
      color: $aqua-blue;
      opacity: 1;
    }
  }

  .v-btn:hover > .v-btn__overlay {
    opacity: 1;
  }

  .v-toolbar-title {
    font-size: calc(16rem / 16 + (30 - 16) * ((100vw - 425rem / 16) / (1920 - 425)));
    @media (min-width: 1920px) {
      font-size: 30rem / 16;
    }
  }

  &__login {
    @media (max-width: 500px) {
      display: none;
    }
  }

  .v-btn__content {
    span {
      font-size: calc(10rem / 16 + (14 - 10) * ((100vw - 500rem / 16) / (1920 - 500)));
      @media (min-width: 1920px) {
        font-size: 14px;
      }
      @media (max-width: 500px) {
        font-size: 10px;
      }
    }
  }
}

.popup-card {
  width: 290px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  right: -12px;
  height: fit-content;
  top: 12px;
}
</style>
