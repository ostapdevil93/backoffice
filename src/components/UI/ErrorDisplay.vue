<script
    setup
    lang="ts"
>
import {useErrorStore} from '@/stores/backofficeStores/ErrorStore';
import {storeToRefs} from 'pinia';
import {computed, watch} from 'vue';
import {ErrorType} from "@/stores/types/backofficeType/ErrorType";

const errorStore = useErrorStore();
const {errors, successMessage} = storeToRefs(errorStore);
const {clearErrors, clearSuccessMessage} = errorStore;

const formattedErrors = computed(() => {
  return errors.value.map((error: ErrorType) =>
      error.field ? `${error.field}: ${error.message}` : error.message
  );
});

// Функция для удаления ошибки через 3 секунды
const autoDismissError = () => {
  setTimeout(() => {
    clearErrors();
    clearSuccessMessage();
  }, 3000);
};

// Запуск автоудаления при появлении новой ошибки
watch([formattedErrors, clearSuccessMessage], (newErrors) => {
  if (newErrors.length > 0) {
    autoDismissError();
  }
}, { immediate: true });

</script>

<template>
  <div class="error-display">
    <v-alert
        v-if="successMessage"
        type="success"
        class="mb-3"
        dense
        :text="successMessage"
        :transition="'slide-x-reverse-transition bg-green-lighten-2'"
        prominent
        @click="clearErrors"
    />

    <v-alert
        v-for="(error, index) in formattedErrors"
        :key="index"
        type="error"
        class="mb-2"
        dense
        :text="error"
        prominent
        :transition="'slide-x-reverse-transition'"
        @click.prevent="clearErrors"
    />
  </div>
</template>

<style
    scoped
    lang="scss"
>
.error-display {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000000000000000;

  .v-alert {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}
</style>
