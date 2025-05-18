<script
    lang="ts"
    setup
>

import {useFiltersStore} from "@/stores/backofficeStores/FiltersStore";
import {computed, defineProps, ref, watch} from "vue";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore();

const {requestsFilters} = storeToRefs(filtersStore);


const currentPage = ref(1);

const props = defineProps({
  count: {
    type: Number,
    default: 1
  }
})

const totalPages = computed(() => Math.ceil(props.count / requestsFilters.value.page.limit));

const pageRange = computed(() => {
  const start = (currentPage.value - 1) * requestsFilters.value.page.limit + 1;
  const end = Math.min(currentPage.value * requestsFilters.value.page.limit, <number>props.count);
  return `${start} - ${end} из ${props.count}`;
});

watch(currentPage, (newPage) => {
  requestsFilters.value.page.offset = (newPage - 1) * requestsFilters.value.page.limit;
});
</script>

<template>
  <div class="pagination-container d-flex justify-end align-center ga-5 px-5 py-3">
    <!-- Выбор количества строк на странице -->
    <v-select
        v-model="requestsFilters.page.limit"
        :items="[20, 50, 100]"
        label="Строк на странице"
        dense
        hide-details
        style="max-width: 180px;"
    />

    <!-- Компонент пагинации с органами управления -->
    <div class="pagination-controls d-flex align-center">
      <span>{{ pageRange }}</span>
      <v-btn
          icon
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          :style="currentPage === 1 ? 'background-color: transparent; box-shadow: none;' : ''"
      >
        <v-icon>mdi-page-first</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="currentPage -= 1"
          :disabled="currentPage === 1"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="currentPage += 1"
          :disabled="currentPage === totalPages"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
      >
        <v-icon>mdi-page-last</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">

</style>
