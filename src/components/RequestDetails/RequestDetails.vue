<script
    lang="ts"
    setup
>
import ChatComponent from "@/components/RequestDetails/ChatComponent.vue";
import UserInfo from "@/components/RequestDetails/UserInfo.vue";
import CommentsSpecialist from "@/components/RequestDetails/CommentsSection.vue";
import AvailableServices from "@/components/RequestDetails/AvailableServices.vue";
import PurchasedPackages from "@/components/RequestDetails/PurchasedPackages.vue";
import OrderServices from "@/components/RequestDetails/OrderServices.vue";
import {storeToRefs} from "pinia";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {ref, watch} from "vue";
import {
  CustomerInfo,
  ListAvailableServices,
  ListPurchasedPackages,
  ListOrderServices
} from "@/stores/types/backofficeType/RequestDetailsType";
import {
  AvailableService,
  OrderedService,
  PurchasedPackage
} from "@/api/Customers/models/CustomersResponse";

const requestDetailsStore = useRequestDetailsStore();
const generalSettingsStore = useGeneralSettings();

const {renderInfo, request, customer, customerId} = storeToRefs(requestDetailsStore);
const {loader} = storeToRefs(generalSettingsStore);

const {formatDateTime} = requestDetailsStore;


const customerInfo = ref({} as CustomerInfo);
const listAvailableServices = ref([{}] as ListAvailableServices[]);
const listPurchasedPackages = ref([{}] as ListPurchasedPackages[]);
const listOrderServices = ref([{}] as ListOrderServices[]);


const updateAvailableServices = () => {
  if (customer.value?.available_services) {
    listAvailableServices.value = customer.value.available_services.map((service:AvailableService) => ({
      serviceName: service.service_name,
      leftQuantity: service.left_quantity
    }));
  }
};
const updatePurchasedPackages = () => {
  if (customer.value?.purchased_packages) {
    listPurchasedPackages.value = customer.value.purchased_packages.map((packages:PurchasedPackage) => ({
      name: packages.package_name,
      purchaseDate: formatDateTime(packages.dt_start),
      expiryDate: formatDateTime(packages.dt_end),
    }))
  }
};
const updateOrderServices = () => {
  if (customer.value?.ordered_services) {
    listOrderServices.value = customer.value.ordered_services.map((service:OrderedService) => ({
      id: service.request_id,
      name: service.service_name,
      status: service.service_status.name,
      manager: service.employee_name,
      date: formatDateTime(service.service_start)
    }))
  }
}


watch([request, customer], () => {
  switch (renderInfo.value) {
    case 'all':
      if (request.value && customer.value) {
        customerInfo.value = {
          customerName: request.value.user_full_name || '-',
          customerPhone: request.value.phone || '-',
          customerEmail: customer.value.customer_email || '-',
          customerBirthDay: customer.value.customer_birth_datetime || '-',
          customerCountry: customer.value.customer_country || '-',
          customerAddress: customer.value.customer_address || '-',
          sessionDuration: request.value.duration || '-',
          serviceName: request.value.service_name || '-',
          status: request.value.status.name || 'Неизвестный статус',
          assignedEmployee: request.value.assigned_employee || 'Не назначен',
          dtCreated: request.value.dt_created || '-',
        }
      }
      break;
    case 'onlyCustomer':
      if (customer.value) {
        customerInfo.value = {
          customerName: customer.value.customer_full_name || '-',
          customerPhone: customer.value.customer_phone || '-',
          customerEmail: customer.value.customer_email || '-',
          customerBirthDay: customer.value.customer_birth_datetime || '-',
          customerCountry: customer.value.customer_country || '-',
          customerAddress: customer.value.customer_address || '-',
        };
      }
      break;
  }

}, {deep: true});

watch(
    customer,
    () => {
      updateAvailableServices();
      updatePurchasedPackages();
      updateOrderServices();
    },
    {immediate: true}
);

</script>

<template>
  <v-container
      fluid
      class="chat-component d-flex flex-wrap"
  >
    <v-row>
      <v-col
          v-if="renderInfo !=='onlyCustomer'"
          class="chat-component__item"
      >
        <chat-component />
      </v-col>
      <v-col
          class="chat-component__item"
      >
        <v-card>
          <v-progress-linear
              v-if="loader"
              indeterminate
              color="primary"
          />
          <user-info
              :customer-info="customerInfo"
              :render-info="renderInfo"
          />
          <comments-specialist :customer-id="customerId" />
          <v-divider></v-divider>
          <available-services :listAvailableServices="listAvailableServices" />
          <v-divider></v-divider>
          <purchased-packages :listPurchasedPackages="listPurchasedPackages" />
          <v-divider></v-divider>
          <order-services :list-order-services="listOrderServices" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.chat-component {
  &__item {
    min-width: 438px;
  }
}
</style>
