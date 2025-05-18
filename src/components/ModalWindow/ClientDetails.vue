<script
    setup
    lang="ts"
>

import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {storeToRefs} from "pinia";
import {usePackageStore} from "@/stores/backofficeStores/PackageStore";


const packagesStore = usePackageStore();
const generalSettings = useGeneralSettings();

const {clientData} = storeToRefs(packagesStore);
const {openClientDetails} = storeToRefs(generalSettings);


const closeClientDetails = () => {
  openClientDetails.value = false
}
</script>

<template>
  <v-dialog
      v-model="openClientDetails"
      persistent
      max-width="500px"
  >
    <v-card v-if="clientData">
      <v-card-title class="text-h6 font-weight-bold d-flex justify-space-between">
        Реквизиты клиента
        <v-btn
            icon
            class="close-btn"
            :rounded="0"
            color="transparent"
            variant="flat"
            @click="closeClientDetails"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-4">
        <div class="mb-4 d-fle flex-column">
          <strong>ФИО клиента:</strong> {{ clientData.full_name }}
        </div>
        <div class="mb-4 d-fle flex-column">
          <strong>ФИО получателя:</strong> {{ clientData.full_name }}
        </div>
        <div class="mb-4">
          <strong>ИНН получателя:</strong> {{ clientData.taxpayer_number }}
        </div>
        <div class="mb-4">
          <strong>Корреспондентский счет:</strong> {{ clientData.cor_acc }}
        </div>
        <div class="mb-4">
          <strong>Номер банковского счета получателя:</strong> {{ clientData.bank_acc }}
        </div>
        <div class="mb-4">
          <strong>БИК Банка получателя:</strong> {{ clientData.bank_bik }}
        </div>
        <div class="mb-4">
          <strong>Банк:</strong> {{ clientData.bank }}
        </div>
        <div class="mb-4">
          <strong>Ссылка на заявление в .pdf:</strong>
          <a
              :href="clientData.application"
              target="_blank"
              class="text-primary"
          >
            {{ clientData.application }}
          </a>
        </div>
        <div>
          <strong>Сумма:</strong> {{ clientData.price }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-text div {
  font-size: 14px;
}

.v-card-text strong {
  font-weight: bold;
}
</style>
