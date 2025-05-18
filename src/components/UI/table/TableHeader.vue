<script
    setup
    lang="ts"
>
import {defineProps, ref, computed} from 'vue';
import {storeToRefs} from 'pinia';
import {useFiltersStore} from '@/stores/backofficeStores/FiltersStore';
import {parse, isValid} from 'date-fns';
import {TableHeaderProps} from "@/stores/types/backofficeType/TableRowType";
import {RequestFiltersType, PackagesFiltersType} from "@/stores/types/backofficeType/FiltersType";
import {useCustomerStore} from "@/stores/backofficeStores/CustomerStore";
import {useRequestStore} from "@/stores/backofficeStores/RequestStore";
import {usePackageStore} from "@/stores/backofficeStores/PackageStore";

// Подключение хранилища
const filtersStore = useFiltersStore();
const customersStore = useCustomerStore();
const requestsStore = useRequestStore();
const packagesStore = usePackageStore();

const {requestsFilters, packagesFilters, requestsQueryString, packagesQueryString} = storeToRefs(filtersStore);

const {clearAllFilters} = filtersStore;
const {getCustomers} = customersStore;
const {getRequests} = requestsStore;
const {getCanceledPackages} = packagesStore;

const activeDateField = ref<string | null>(null);

// Получение входных данных
const props = defineProps<TableHeaderProps>();

// Контроль состояния меню для v-date-input (динамическое меню для каждого поля)
const dateMenus = ref<Record<string, boolean>>({});

// Форматирование даты в строку
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const handleValueChange = computed<RequestFiltersType | PackagesFiltersType>(() => {
  switch (props.tableType) {
    case 'requests':
    case 'customers':
      return requestsFilters.value;
    case 'packages':
      return packagesFilters.value;
    default:
      return {filters: {}} as RequestFiltersType | PackagesFiltersType;
  }
});

const getDateValue = (field: string): Date | null => {
  const filters = handleValueChange.value.filters as Record<string, string | null>;
  const dateStr = filters[field];
  if (!dateStr) return null;
  const date = parse(dateStr, 'dd.MM.yyyy', new Date());
  return isValid(date) ? date : null;
};

const setDateValue = (field: string, newDate: Date | string | null): void => {
  const filters = handleValueChange.value.filters as Record<string, string | null>;
  if (newDate instanceof Date && isValid(newDate)) {
    filters[field] = formatDate(newDate);
  } else {
    filters[field] = null;
  }
  dateMenus.value[field] = false;
};

// Очистка значения поля даты
const clearDateValue = (field: string) => {
  handleValueChange.value.filters[field] = null;
};

// Установка активного поля даты
const setActiveDateField = (field: string) => {
  activeDateField.value = field;
};

// Получение значения для отображения
const getDisplayValue = (field: string): string => {
  const dateStr = String(handleValueChange.value.filters[field]);
  return dateStr || ''; // Возвращаем форматированный текст или пустую строку
};

const sendFiltersData = () => {
  switch (props.tableType) {
    case 'requests':
      getRequests(requestsQueryString.value);
      break;
    case 'customers':
      getCustomers(requestsQueryString.value, 'customers');
      break;
    case 'packages':
      getCanceledPackages(packagesQueryString.value);
      break;
  }
}

const clearFilterData = () => {
  clearAllFilters();
  sendFiltersData();
}

</script>

<template>
  <thead class="table-row">
  <!-- Заголовок таблицы -->
  <tr :class="`py-3 px-5 grid-layout grid-layout__${tableType}`">
    <th
        v-for="title in titles"
        :key="title.value"
    >
      {{ title.text }}
    </th>
  </tr>
  <!-- Фильтры -->
  <tr :class="`py-3 px-5 grid-layout grid-layout__${tableType}`">
    <th
        v-for="(title, index) in titles"
        :key="index"
        height="100%"
    >
      <!-- Текстовые поля для фильтрации -->
      <v-text-field
          class="input-field no-background"
          v-if="title.filterable && !title.isDate"
          v-model="handleValueChange.filters[title.value]"
          :label="title.label"
          hide-details
          clearable
          dense
      />

      <!-- Селекты -->
      <v-select
          v-if="title.selectable && title.value !== 'partner'"
          v-model="handleValueChange.filters[title.value]"
          :items="title.options"
          :label="title.label"
          hide-details
          clearable
          dense
          class="input-field no-background"
          no-data-text="Идет загрузка"
      />

      <v-select
          v-if="title.value === 'partner'"
          v-model="handleValueChange.filters[title.value]"
          :items="title.options"
          :label="title.label"
          hide-details
          clearable
          dense
          class="input-field no-background"
          no-data-text="Идет загрузка"
      />

      <!-- Поля с датами -->
      <v-date-input
          v-if="title.isDate"
          :label="title.label"
          :model-value="getDateValue(title.value)"
          :display-value="getDisplayValue(title.value)"
          :menu="dateMenus[title.value]"
          @update:model-value="(newDate) => setDateValue(title.value, newDate)"
          @update:menu="dateMenus[title.value] = $event"
          @focus="setActiveDateField(title.value)"
          @click:clear="clearDateValue(title.value)"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          clearable
          dense
      />

      <div
          v-if="title.value ==='actions'"
          class="actions d-flex ga-2 h-100"
      >
        <v-btn
            width="50%"
            height="100%"
            text="Фильтровать"
            color="primary font-weight-bold"
            @click="sendFiltersData"
        />

        <v-btn
            width="50%"
            height="100%"
            text="Очистить"
            color="pink font-weight-bold"
            @click="clearFilterData"
        />
      </div>

    </th>
  </tr>
  </thead>
</template>

<style lang="scss">
.table-row {
  .v-input__details {
    position: absolute;
  }
}
</style>
