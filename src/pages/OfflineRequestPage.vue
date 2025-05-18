<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
});

// Функция для обработки отправки формы
const handleSubmit = () => {
  console.log('Форма отправлена', form.value);
};
</script>

<template>
  <v-container fluid class="pa-6 mx-4">
    <v-card class="pa-4">
      <v-card-title class="text-h6 font-weight-bold">
        Ручное создание пакета
      </v-card-title>
      <v-card-subtitle class="text-subtitle-2">
        <span class="text-danger">*</span> Все поля обязательны для заполнения
      </v-card-subtitle>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.firstName"
                label="Имя"
                placeholder="Имя"
                required
                hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.lastName"
                label="Фамилия"
                placeholder="Фамилия"
                required
                hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.phone"
                label="Телефон"
                placeholder="+7"
                required
                hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.email"
                label="Email"
                placeholder="Email"
                required
                hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.city"
                label="Город"
                placeholder="Город"
                required
                hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.address"
                label="Адрес"
                placeholder="Адрес"
                required
                hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
            color="#9c27b0"
            rounded
            @click="handleSubmit"
        >
          СОЗДАТЬ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.text-danger {
  color: red;
}
</style>
