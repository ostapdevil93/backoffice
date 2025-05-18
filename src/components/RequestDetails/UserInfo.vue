<script
    lang="ts"
    setup
>

import {defineProps} from "vue";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";
import {storeToRefs} from "pinia";

const requestDetailsStore = useRequestDetailsStore();

const {prevStatus, status, requestId} = storeToRefs(requestDetailsStore);

const {changeStatus, formatDateTime, sendMessage, sendReviewRequest} = requestDetailsStore;


defineProps({
  customerInfo: {
    type: Object
  },
  renderInfo: {
    type: String,
    default: 'all'
  }
})

const closeDetails = () => {
  status.value = prevStatus.value
}

const sendSaleMessage = () => {
  sendMessage({
    chat_id: requestId.value,
    content: 'Поздравляем с первой сессией и дарим скидку 20% на следующую сессию по коду “ADVA10”',
    file_ids: []
  });
}
</script>

<template>
  <v-card-text class="user-info pa-0">
    <v-card-title>Информация о клиенте</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-list
          dense
          v-if="customerInfo"
      >
        <v-list-item
            class="pa-0"
            :min-height="35"
        >
          <v-list-item-title>Пользователь: {{ customerInfo.customerName }}</v-list-item-title>
        </v-list-item>
        <v-list-item
            class="pa-0"
            :min-height="35"

        >
          <v-list-item-title>
            Телефон: <a :href="`tel:${customerInfo.customerPhone}`">{{ customerInfo.customerPhone }}</a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item
            class="pa-0"
            :min-height="35"
        >
          <v-list-item-title>
            Email: <a :href="`mailto:${customerInfo.customerEmail}`">{{ customerInfo.customerEmail }}</a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item
            class="pa-0"
            :min-height="35"
        >
          <v-list-item-title>День рождения: {{
              formatDateTime(customerInfo.customerBirthDay, false)
            }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
            class="pa-0"
            :min-height="35"
        >
          <v-list-item-title>Страна: {{ customerInfo.customerCountry }}</v-list-item-title>
        </v-list-item>
        <v-list-item
            class="pa-0"
            :min-height="35"
        >
          <v-list-item-title>Адрес: {{ customerInfo.customerAddress }}</v-list-item-title>
        </v-list-item>
        <div v-if="renderInfo ==='all'">
          <v-list-item
              class="pa-0"
              :min-height="35"
          >
            <v-list-item-title>Длительность: {{ customerInfo.sessionDuration }}</v-list-item-title>
          </v-list-item>
          <v-list-item
              class="pa-0"
              :min-height="35"
          >
            <v-list-item-title>Сервис: {{ customerInfo.serviceName }}</v-list-item-title>
          </v-list-item>
          <v-list-item
              class="pa-0"
              :min-height="35"
          >
            <v-list-item-title>Статус: {{ customerInfo.status }}</v-list-item-title>
          </v-list-item>
          <v-list-item
              class="pa-0"
              :min-height="35"
          >
            <v-list-item-title>Менеджер: {{ customerInfo.assignedEmployee }}</v-list-item-title>
          </v-list-item>
          <v-list-item
              class="pa-0"
              :min-height="35"
          >
            <v-list-item-title>Заявка подана: {{ formatDateTime(customerInfo.dtCreated) }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>

    <!-- Кнопки действий -->
    <v-card-actions class="user-info__action-buttons">
      <v-btn
          color="light-blue"
          block
          @click="sendSaleMessage"
      >
        Отправить сообщение о скидке
      </v-btn>
      <v-btn
          color="cyan"
          block
          @click="sendReviewRequest(requestId)"
      >
        Отправить запрос на отзыв
      </v-btn>
      <div v-if="prevStatus !== 'succeeded'">
        <div
            v-if="status === 'on_review'"
            class="d-flex justify-space-between"
        >
          <v-btn
              color="orange"
              block
              :min-width="'auto'"
              :flex="0"
              @click="changeStatus"
          >
            Подтвердить
          </v-btn>
          <v-btn
              color="red"
              block
              :min-width="'auto'"
              :flex="0"
              @click="closeDetails"
          >
            Закрыть
          </v-btn>
        </div>
        <v-btn
            v-else
            color="grey darken-1"
            block
            @click="changeStatus"
        >
          Закрыть
        </v-btn>
      </div>
      <v-btn
          color="green"
          block
      >
        Клиенту совершается звонок
      </v-btn>
      <v-btn
          color="blue lighten-3"
          block
      >
        Поставить заявку в ожидание
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
  </v-card-text>
</template>

<style lang="scss">
.user-info {

  &__action-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 50%;
    margin: 0 auto;

  }
}
</style>