<script
    lang="ts"
    setup
>
import UploadFiles from "@/components/UI/UploadFiles.vue";
import ExportStatistics from "@/components/UI/ExportStatistics.vue";
</script>

<template>
  <v-container
      class="pa-6 mx-4 d-flex flex-column ga-15"
      fluid
  >
    <UploadFiles
        title="Импорт рабочего графика для сотрудников, работающих с видеозаявками"
    />
    <ExportStatistics
        title="Экспорт рабочего графика сотрудников, работающих с видеозаявками"
        statisticFor="settings"
    />
  </v-container>
</template>

<style lang="scss">

</style>
