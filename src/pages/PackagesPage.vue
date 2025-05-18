<script
    lang="ts"
    setup
>
import {defineAsyncComponent, onBeforeMount} from "vue";
import {storeToRefs} from "pinia";
import {usePackageStore} from "@/stores/backofficeStores/PackageStore";
import {useFiltersStore} from "@/stores/backofficeStores/FiltersStore";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {usePartnersStore} from "@/stores/backofficeStores/PartnersStore";
import DataTable from "@/components/UI/table/DataTable.vue";
// import ExportStatistics from "@/components/UI/ExportStatistics.vue";

const ClientDetails = defineAsyncComponent(() =>
    import("@/components/ModalWindow/ClientDetails.vue")
);


const packagesStore = usePackageStore();
const partnersStore = usePartnersStore();
const filtersStore = useFiltersStore();
const generalSettings = useGeneralSettings();

const {canceledPackages, canceledPackagesTitles} = storeToRefs(packagesStore);
const {packagesFilters} = storeToRefs(filtersStore)
const {loader, openClientDetails} = storeToRefs(generalSettings);

const {getPackages, getCanceledPackages} = packagesStore;
const {getPartners} = partnersStore;

const loadPackagesData = () => {
  getCanceledPackages(`_page=${encodeURIComponent(packagesFilters.value.page.offset)}&_limit=${encodeURIComponent(packagesFilters.value.page.limit)}`);
  getPackages('packages');
  getPartners();
}

onBeforeMount(() => {
  loadPackagesData();
})

</script>

<template>
  <v-main class="packages-page pa-0">
    <!--    <export-statistics-->
    <!--        statisticFor="package"-->
    <!--        :packages="packages"-->
    <!--    />-->
    <suspense>
      <template #default>
        <component
            v-if="openClientDetails"
            :is="ClientDetails"
        />
      </template>
      <template #fallback>
        <div>Загрузка...</div>
      </template>
    </suspense>
    <DataTable
        class="mt-14"
        tableType="packages"
        title="Отмененные пакеты"
        :count="canceledPackages.total"
        :titles="canceledPackagesTitles"
        :requests="canceledPackages.data"
        :loader="loader"
    />
  </v-main>
</template>

<style lang="scss">

</style>
