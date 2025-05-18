<script
    lang="ts"
    setup
>

import {defineProps} from "vue";
import {AvailableServicesProps} from "@/stores/types/backofficeType/RequestDetailsType";

defineProps<AvailableServicesProps>()
</script>

<template>
  <v-card-text class="available-services">
    <v-row class="mb-4">
      <v-col>
        <h3 class="text-h6 font-weight-medium">Доступные услуги</h3>
      </v-col>
    </v-row>

    <v-list
        dense
        v-if="listAvailableServices.length"
    >
      <v-list-item
          v-for="(service, index) in listAvailableServices"
          :key="index"
          class="py-0"
          style="padding-inline: 0"
      >
        <v-row no-gutters align="center" dense>
          <v-col
              class="text-body-2 grey--text text--darken-1"
              cols="auto"
              style="white-space: nowrap; margin-right: 4px;"
          >
            Сервис :
          </v-col>
          <v-col class="text-body-2" style="white-space: nowrap;" cols="auto">
            {{ service.serviceName }}
          </v-col>

          <v-spacer></v-spacer>

          <v-col
              class="text-body-2 grey--text text--darken-1"
              cols="auto"
              style="margin-right: 4px;"
          >
            Осталось :
          </v-col>
          <v-col class="text-body-2" cols="auto">
            {{ service.leftQuantity }}
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-list-item-title class="mb-4" v-else>
        <p class="d-flex justify-center">Нет доступных услуг</p>
    </v-list-item-title>

  </v-card-text>
</template>

<style lang="scss">

</style>
