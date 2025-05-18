<script
    setup
    lang="ts"
>
import DataTable from "@/components/UI/table/DataTable.vue";
import AssignmentActions from "@/components/UI/AssignmentActions.vue";
import {onBeforeMount, watch, defineAsyncComponent, computed} from "vue";
import {storeToRefs} from "pinia";
import {useFiltersStore} from "@/stores/backofficeStores/FiltersStore";
import {useRequestStore} from "@/stores/backofficeStores/RequestStore";
import {useCustomerStore} from "@/stores/backofficeStores/CustomerStore";
import {usePackageStore} from "@/stores/backofficeStores/PackageStore";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import ModalAction from "@/components/ModalWindow/ModalAction.vue";
import ErrorDisplay from "@/components/UI/ErrorDisplay.vue";

const RequestDetails = defineAsyncComponent(() =>
    import("@/components/RequestDetails/RequestDetails.vue")
);

const filtersStore = useFiltersStore();
const requestStore = useRequestStore();
const customerStore = useCustomerStore();
const packageStore = usePackageStore();
const GeneralSettings = useGeneralSettings();

const {count, titles, requests} = storeToRefs(requestStore);
const {requestsFilters, requestsQueryString} = storeToRefs(filtersStore);
const {loader, currentSlug, openChat} = storeToRefs(GeneralSettings);

const {getStatuses, getPreOrder} = requestStore;
const {getCustomers} = customerStore;
const {getPackages} = packageStore;
const {getRequests} = requestStore;

const employers = computed(() => {
  return titles.value[6].options
});

onBeforeMount(() => {
  loadRequestsData();
});

const loadRequestsData = () => {
  getPackages("requests");
  getRequests(`page[offset]=${requestsFilters.value.page.offset}&page[limit]=${requestsFilters.value.page.limit}`);
  getStatuses();
  getCustomers(`page[offset]=${requestsFilters.value.page.offset}&page[limit]=${requestsFilters.value.page.limit}`, "requests");
};

const buildQuery = (): string => {
  let query = requestsQueryString.value;

  switch (currentSlug.value) {
    case "requests":
      getRequests(query);
      break;
    case "freelance":
      query += `+&filters[${encodeURIComponent("is_freelance")}]=${encodeURIComponent(true)}`;
      getRequests(query);
      break;
    case "video-requests":
      query += `+&filters[${encodeURIComponent("is_video_conference")}]=${encodeURIComponent("true")}`;
      getRequests(query);
      break;
    case "pre-requests":
      getPreOrder(query);
      break;
    default:
      getRequests(query);
      break;
  }


  return query;
};

watch(currentSlug, buildQuery, {deep: true});
</script>

<template>
  <v-main class="requests-page h-100 pa-0">
    <error-display />
    <div v-if="!openChat">
      <AssignmentActions />
      <DataTable
          class="mt-14"
          tableType="requests"
          title="Запросы"
          :count="count"
          :titles="titles"
          :requests="requests"
          :loader="loader"
      />
    </div>
    <modal-action :options="employers" />
    <component :is="openChat ? RequestDetails : null" />
  </v-main>
</template>
