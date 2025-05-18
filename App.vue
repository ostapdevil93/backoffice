<script setup>
import {useAuthStore} from "@/stores/backofficeStores/AuthStore";
import {storeToRefs} from "pinia";
import {defineAsyncComponent} from "vue";

const authStore = useAuthStore();
const {isRegistered} = storeToRefs(authStore);

const MainContent = defineAsyncComponent(() => import('@/components/layouts/MainLayout.vue'));
const AuthModal = defineAsyncComponent(() => import('@/components/modal/AuthModal.vue'));


</script>


<template>
  <v-layout :class="{ 'main-screen bg-grey-lighten-2 h-100': isRegistered }">
    <component :is="isRegistered ? MainContent : AuthModal" />
  </v-layout>
</template>
<style
    scoped
    lang="scss"
>
.main-screen {
  min-height: 100vh;
}

.v-main {
  padding: 0 !important;
}
</style>
