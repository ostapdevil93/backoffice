<script
    lang="ts"
    setup
>
import DataTable from "@/components/UI/table/DataTable.vue";
import {defineAsyncComponent, onBeforeMount} from "vue";
import {useCustomerStore} from "@/stores/backofficeStores/CustomerStore";
import {storeToRefs} from "pinia";
import {useFiltersStore} from "@/stores/backofficeStores/FiltersStore";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";

const RequestDetails = defineAsyncComponent(() =>
    import("@/components/RequestDetails/RequestDetails.vue")
);

const customersStore = useCustomerStore();
const filtersStore = useFiltersStore();
const generalSettings = useGeneralSettings();

const {titles, customers, count} = storeToRefs(customersStore);
const {requestsQueryString} = storeToRefs(filtersStore);
const {loader, openChat} = storeToRefs(generalSettings);


const {getCustomers} = customersStore;

onBeforeMount(() => {
  getCustomers(requestsQueryString.value, 'customers');
})

</script>

<template>
  <v-main class="users-page pa-0">
    <data-table
        v-if="!openChat"
        class="mt-14"
        title="Пользователи"
        :count="count"
        :titles="titles"
        :requests="customers"
        :loader="loader"
        tableType="customers"
    />
    <component
        :is="openChat ? RequestDetails : null"
    />
  </v-main>
</template>
