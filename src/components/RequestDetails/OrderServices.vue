<script
    lang="ts"
    setup
>
import {defineProps, ref} from "vue";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";
import {storeToRefs} from "pinia";
import {OrderServicesProps, ListOrderServices} from "@/stores/types/backofficeType/RequestDetailsType";

const requestDetailsStore = useRequestDetailsStore();
const {renderInfo, requestId} = storeToRefs(requestDetailsStore);

defineProps<OrderServicesProps>();

const activeService = ref({} as ListOrderServices);


const setActiveService = (service: ListOrderServices) => {
  renderInfo.value = 'all';
  activeService.value = service;
  requestId.value = service.id;
};

</script>

<template>
  <section class="order-services v-card-text">

    <h3 class="text-h6 font-weight-medium">
      Заказаные услуги
    </h3>
    <ul class="order-services__list v-list">
      <li
          v-for="service in listOrderServices"
          :key="service.id"
          class="mt-5 pa-2"
          @click="setActiveService(service)"
      >
        <div
            class="order-services__list__container pa-3 position-relative border rounded"
            :class="{'active-service': requestId === service.id, 'inactive-service':  requestId !== service.id}"
        >
          <p class="pt-7">
            {{ service.id }}
            <span class="text-grey text-subtitle-1">
            Услуга
          </span>
            <span class="text-body-2">
            {{ service.name }}
          </span>
          </p>
          <p>
          <span class="text-grey text-subtitle-1">
            Статус
          </span>
            <span class="text-body-2">
            {{ service.status }}
          </span>
          </p>
          <p>
          <span class="text-grey text-subtitle-1">
            Mенеджер
          </span>
            <span class="text-body-2">
            {{ service.manager }}
          </span>
          </p>
          <v-chip class="order-services__date position-absolute text-green">
            {{ service.date }}
          </v-chip>
        </div>
      </li>
    </ul>

  </section>
</template>

<style lang="scss">
.order-services {
  &__list{
    li {
      cursor: pointer;
    }
    &__container{
      border: 1px solid #e0e0e0;
      box-shadow: 0 0 25px rgba(0, 0, 0, .1);
      transition: transform .3s;

      &:hover {
        box-shadow: 0 0 25px rgb(0 0 0 / 20%);
        transform: scale(1.01);
      }
    }
  }

  &__date {
    top: 7px;
    right: 8px;
  }

  .active-service {
    border-color: $royal-blue !important;
  }

  .inactive-service {
    border: #e0e0e0;
  }
}
</style>
