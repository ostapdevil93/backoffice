<script
    setup
    lang="ts"
>
import {onBeforeMount} from 'vue';
import {usePartnersStore} from "@/stores/backofficeStores/PartnersStore";
import {storeToRefs} from "pinia";
import UploadFiles from "@/components/UI/UploadFiles.vue";

const partnersStore = usePartnersStore();

const {partnersOptions} = storeToRefs(partnersStore);

const {getPartners} = partnersStore;

onBeforeMount(() => {
  getPartners();
})
</script>

<template>
  <v-container
      fluid
      class="pa-6 mx-4"
  >
    <UploadFiles
        pageType="registerPartners"
        title="Импорт реестра клиентов по партнерам"
        buttonText="ЗАГРУЗИТЬ РЕЕСТР"
        :items="partnersOptions"
    />
  </v-container>
</template>

<style
    lang="scss"
    scoped
>

</style>
