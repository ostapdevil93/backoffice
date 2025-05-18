<script setup>
import {ref, watch} from 'vue';
import AppBar from '@/components/header/AppBar.vue';
import NavigationDrawer from '@/components/navigation/NavigationDrawer.vue';
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {storeToRefs} from "pinia";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";

const requestDetailsStore = useRequestDetailsStore();
const generalSettings = useGeneralSettings();

const {drawer} = storeToRefs(generalSettings);
const {requestId, customerId} = storeToRefs(requestDetailsStore);

const {getRequestDetails, getCustomerDetails} = requestDetailsStore;

watch(requestId, () => {
  getRequestDetails();
});
watch(customerId, () => {
  getCustomerDetails();
})

</script>

<template>
  <AppBar />
  <v-main class="px-0 d-flex">
    <NavigationDrawer
        :drawer="drawer"
        @update:drawer="drawer = $event"
    />
    <div
        class="pa-4 position-md-relative"
        style="max-width: 83vw"
    >
      <router-view />
    </div>
  </v-main>
</template>

<style
    lang="scss"
    scoped
>
.v-main {
  padding: 60px 20px 20px 40px;
}
</style>
