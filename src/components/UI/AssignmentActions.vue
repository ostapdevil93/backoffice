<script setup lang="ts">
import {ref} from 'vue';

// Счетчик запросов
const queueCount = ref(10);

// Переключатель для слепой очереди
const blindQueue = ref(false);

// Методы для кнопок
const assignToSelf = () => {
  console.log("Назначить на себя");
  // Логика для назначения на себя
};

const assignToSelfVideo = () => {
  console.log("Назначить на себя VIDEO");
  // Логика для назначения на себя VIDEO
};
</script>

<template>
  <v-card class="py-5 assigment-action">
    <v-row
        align="center"
        justify="space-between"
    >
      <!-- Счетчик запросов и переключатель -->
      <div class="px-7  d-flex align-center">
        <span class="font-weight-bold">Запросы в очереди:</span>
        <span class="ml-2 mr-4">{{ queueCount }}</span>
        <v-switch
            v-model="blindQueue"
            class="d-flex font-weight-bold "
            color="pink"
            label="Слепая очередь"
        ></v-switch>
      </div>

      <!-- Кнопки действий -->
      <div
          class="px-7"
          v-if="blindQueue"
      >
        <v-btn
            color="primary assigment-action__buttons"
            class="mr-2"
            @click="assignToSelf"
        >
          НАЗНАЧИТЬ НА СЕБЯ
        </v-btn>
        <v-btn
            color="pink"
            dark
            @click="assignToSelfVideo"
        >
          НАЗНАЧИТЬ НА СЕБЯ VIDEO
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<style
    scoped
    lang="scss"
>
.assigment-action {
  .font-weight-bold {
    font-weight: bold;
  }

  .v-btn {
    min-width: 200px;
    @media (max-width: 600px) {
      width: 100%;
      margin: 10px;
    }
  }

}

</style>
