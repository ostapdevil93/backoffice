<script
    lang="ts"
    setup
>
import ExportStatistics from "@/components/UI/ExportStatistics.vue";
import {usePartnersStore} from "@/stores/backofficeStores/PartnersStore";
import {storeToRefs} from "pinia";
import {onBeforeMount} from "vue";

const partnersStore = usePartnersStore();

const {partnersOptions} = storeToRefs(partnersStore);

const {getPartners} = partnersStore;

onBeforeMount(() => {
  getPartners();
})
</script>

<template>
  <v-main class="act-page pa-0">
    <export-statistics
        statistic-for="act"
        :partners="partnersOptions"
    />
  </v-main>
</template>

<style lang="scss">

</style>
