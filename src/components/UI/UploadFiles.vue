<script
    lang="ts"
    setup
>
import {defineProps, ref} from 'vue';
import {useUploadStore} from '@/stores/backofficeStores/UploadStore.ts';
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import ErrorDisplay from "./ErrorDisplay.vue";


const uploadStore = useUploadStore();
const {sendFile} = uploadStore;

const errorStore = useErrorStore();
const {addError} = errorStore;

const file = ref<File | null>(null);
const selectedPartner = ref<number | string>('');
const error = ref({
  text: false,
  select: false
})

defineProps({
  pageType: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: []
  },
  buttonText: {
    type: String,
    default: 'Загрузить'
  }
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files ? target.files[0] : null;
  error.value.text = false
};

const clearFile = () => {
  file.value = null;
};


const uploadFile = () => {
  if (file.value === null && selectedPartner.value === '') {
    addError(null, 'Пожалуйста выберите сапециалиста и файл');
    error.value.text = true;
    error.value.select = true;
  } else if (file.value === null) {
    error.value.text = true;
    addError(null, 'Пожалуйста выберите файл');
  } else if (selectedPartner.value === '') {
    error.value.select = true;
    addError(null, 'Пожалуйста выберите сапециалиста');
  } else {
    sendFile(file.value, selectedPartner.value)
    error.value.text = false;
    error.value.select = false;
    file.value = null;
    selectedPartner.value = '';
  }
}
</script>

<template>
  <error-display />
  <v-card
      class="pa-6"
      outlined
  >
    <v-card-title class="text-h5 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="pageType === 'registerPartners'">
      Файл для импорта реестра должен содержать следующие header поля:
      <strong>phone, first_name, last_name, email, locality, address, package, order_id, timestamp</strong>.
      Если не задано <strong>timestamp</strong>, будет использовано текущее время.
    </v-card-subtitle>

    <v-divider class="my-4"></v-divider>

    <v-row class="mb-4 flex-column">
      <v-col
          cols="12"
          md="6"
      >
        <v-select
            v-if="items.length > 0"
            v-model="selectedPartner"
            :items="items"
            label="Выберите партнера"
            outlined
            dense
            clearable
            no-data-text="Идет загрузка"
            :class="{'error-input': error.select}"
        ></v-select>
      </v-col>

      <v-col
          cols="12"
          md="6"
      >
        <div class="file-upload-wrapper">
          <label
              for="file-upload"
              class="file-upload-button"
          >
            Выберите файл
            <input
                id="file-upload"
                type="file"
                class="file-input"
                accept=".csv"
                @change="handleFileUpload"
            />
          </label>
          <span
              class="file-name"
              :class="{'error-input': error.text}"
          >
            {{ file?.name || 'Файл не выбран' }}
          </span>
          <v-btn
              v-if="file"
              small
              color="error"
              outlined
              class="ml-2"
              @click="clearFile"
          >
            Удалить файл
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-btn
        color="primary"
        class="text-white"
        @click="uploadFile"
    >
      {{ buttonText }}
    </v-btn>
  </v-card>
</template>


<style lang="scss">
.file-upload-wrapper {
  display: flex;
  align-items: center;

  .file-upload-button {
    display: inline-block;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    margin-right: 8px;

    &:hover {
      background-color: #e0e0e0;
    }

    &:active {
      background-color: #d6d6d6;
    }
  }

  .file-input {
    display: none;
  }

  .file-name {
    color: #757575;
    font-size: 14px;
    margin-left: 8px;
  }

  .error-input {
    border-color: red !important;
    color: red !important;
  }
}
</style>
