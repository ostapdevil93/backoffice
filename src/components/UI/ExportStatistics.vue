<script
    setup
    lang="ts"
>
import {computed, ref} from 'vue';
import {useStatisticStore} from "@/stores/backofficeStores/StatisticsStore";
import {storeToRefs} from "pinia";
import {defineProps} from 'vue';

const statisticStore = useStatisticStore();

const {statisticDateRange} = storeToRefs(statisticStore);

const {getStatistics, getActStatistic, getWorkersGraphic} = statisticStore;

const selectedPartners = ref<string[]>([]);
const selectedPackage = ref<string | null>(null);
const dateMenuBefore = ref(false);
const dateMenuAfter = ref(false);
const partnersForAct = ref<Number | null>(null);

const props = defineProps({
  statisticFor: {
    type: String,
    default: ''
  },
  packages: {
    type: Array,
    default: []
  },
  partners: {
    type: Array,
    default: []
  },
  title: {
    type: String,
    default: 'Экспорт статистики'
  }
});

const handleStartDateChange = computed({
  get: () => {
    return statisticDateRange.value.start_date ? new Date(statisticDateRange.value.start_date) : null;
  },
  set: (newDate: Date | string | null) => {
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      statisticDateRange.value.start_date = formatDate(newDate);
    } else {
      statisticDateRange.value.start_date = null;
    }
    dateMenuBefore.value = false;
  }
});

const handleEndDateChange = computed({
  get: () => {
    return statisticDateRange.value.end_date ? new Date(statisticDateRange.value.end_date) : null;
  },
  set: (newDate: Date | string | null) => {
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      statisticDateRange.value.end_date = formatDate(newDate);
    } else {
      statisticDateRange.value.end_date = null;
    }
    dateMenuAfter.value = false;
  }
});

const returnActualFunction = () => {
  switch (props.statisticFor) {
    case 'act':
      return fetchActStatistics();
    case 'settings':
      return fetchWorkersGraphic();
    default:
      return getStatistics();
  }
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const rules = {
  required: (value: string) => !!value || 'Обязательное поле',
};

const resetForm = () => {
  statisticDateRange.value.start_date = null;
  statisticDateRange.value.end_date = null;
  selectedPartners.value = [];
  selectedPackage.value = null;
};

const reverseDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`
}

const fetchActStatistics = () => {
  if (partnersForAct.value !== null && statisticDateRange.value.start_date !== null && statisticDateRange.value.end_date !== null) {
    getActStatistic(`purchase_date_start=${reverseDate(statisticDateRange.value.start_date as string)}&purchase_date_end=${reverseDate(statisticDateRange.value.end_date as string)}&partner_id=${partnersForAct.value}`)
  }
}

const fetchWorkersGraphic = () => {
  if (statisticDateRange.value.start_date !== null && statisticDateRange.value.end_date !== null) {
    getWorkersGraphic(`start_date=${statisticDateRange.value.start_date}&end_date=${statisticDateRange.value.end_date}`);
  }
}

</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <span>{{ title }}</span>
        <v-icon right>mdi-download</v-icon>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card class="px-5 py-4 bg-light-grey">
          <v-row dense>
            <!-- Поле для выбора даты "Покупка С" -->
            <v-col
                cols="12"
                sm="4"
            >
              <v-date-input
                  label="Покупка c"
                  v-model:menu="dateMenuBefore"
                  v-model="handleStartDateChange"
                  :rules="[rules.required]"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  clearable
                  dense
              />
            </v-col>

            <!-- Поле для выбора даты "Покупка По" -->
            <v-col
                cols="12"
                sm="4"
            >
              <v-date-input
                  label="Покупка по"
                  v-model:menu="dateMenuAfter"
                  v-model="handleEndDateChange"
                  :rules="[rules.required]"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  clearable
                  dense
              />
            </v-col>

            <!-- Поле для выбора партнеров с возможностью множественного выбора -->
            <v-col
                cols="12"
                sm="4"
            >
              <v-select
                  v-if="statisticFor ==='report'"
                  v-model="selectedPartners"
                  :items="partners"
                  label="Выберите партнера"
                  multiple
                  dense
                  chips
                  deletable-chips
                  chip-color="primary"
                  item-value="partner"
                  item-text="partner"
                  item-color="primary"
                  :menu-props="{ closeOnContentClick: false }"
                  prepend-inner-icon="mdi-account-group"
              ></v-select>
              <v-select
                  v-if="statisticFor ==='act'"
                  v-model="partnersForAct"
                  :items="partners"
                  :rules="[rules.required]"
                  label="Выберите партнера"
                  dense
                  chips
                  deletable-chips
                  chip-color="primary"
                  item-color="primary"
                  :menu-props="{ closeOnContentClick: false }"
                  prepend-inner-icon="mdi-account-group"
              ></v-select>
            </v-col>

            <template v-if="props.statisticFor === 'package'">
              <v-col
                  cols="12"
                  sm="4"
              >
                <v-select
                    v-model="selectedPackage"
                    label="Название пакета"
                    dense
                    prepend-inner-icon="mdi-package-variant-closed"
                ></v-select>
              </v-col>

              <!-- Поле для выбора партнера -->
              <v-col
                  cols="12"
                  sm="4"
              >
                <v-select
                    v-model="selectedPartners"
                    :items="partners"
                    label="Партнер"
                    multiple
                    dense
                    chips
                    deletable-chips
                    chip-color="primary"
                    prepend-inner-icon="mdi-handshake"
                    :menu-props="{ closeOnContentClick: false }"
                ></v-select>
              </v-col>
            </template>
          </v-row>

          <v-row class="mt-4 justify-space-between">
            <!-- Кнопка для экспорта в XLSX -->
            <v-col
                cols="6"
                sm="3"
            >
              <v-btn
                  color="primary"
                  block
                  @click="returnActualFunction()"
              >
                ЭКСПОРТ В XLSX
              </v-btn>
            </v-col>

            <!-- Кнопка для сброса формы -->
            <v-col
                cols="12"
                sm="6"
                class="d-flex justify-end"
            >
              <v-btn
                  class="text-light-blue font-weight-bold"
                  @click="resetForm"
              >
                СБРОСИТЬ ФОРМУ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style
    scoped
    lang="scss"
>
.bg-light-grey {
  background-color: $soft-gray; /* Светло-серый фон */
}
</style>
