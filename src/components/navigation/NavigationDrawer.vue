<script
    setup
    lang="ts"
>
import {ref} from 'vue';
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import { NavItem, SubMenu } from "@/stores/types/backofficeType/NavigationsType";
import {useNavigationsStore} from "@/stores/backofficeStores/NavigationStore";

const route = useRoute();
const router = useRouter();

const generalSettings = useGeneralSettings();
const navigationsStore = useNavigationsStore();

const {drawer, currentSlug, openChat} = storeToRefs(generalSettings);
const {navItems} = storeToRefs(navigationsStore);
const openedGroups = ref([]);

//const closeBurgerElement = ref<Element | null>(null);


// onMounted(() => {
//   closeBurgerElement.value = document.querySelector('.close-burger');
// });

// const drawerWidth = computed(() => {
//   return (drawer.value || openedGroups.value.length !== 0) ? '256px' : '50px';
// });

// watch(drawer, (newVal) => {
//   if (!newVal) openedGroups.value = [];
// });

// const updateDrawer = () => {
//   drawer.value = !drawer.value;
// };

// const closeDrawer = (event: Event) => {
//   const target = event.target as HTMLElement | null;
//   if (drawer.value && target && !target.closest('.close-burger')) {
//     drawer.value = false;
//   }
// };

// const include = () => {
//   return closeBurgerElement.value ? [closeBurgerElement.value] : [];
// };

const navigationInspector = (item: NavItem | SubMenu) => {
  if ('parentPath' in item) {
    currentSlug.value = item.slug;
    if (item.parentPath && route.path !== item.parentPath) router.push(item.parentPath);
  } else {
    if (item.path && route.path !== item.path) router.push(item.path);
    currentSlug.value = item.subMenu?.[0]?.slug || '';
  }
  openChat.value = false;
};

</script>

<template>
  <v-navigation-drawer
      :value="drawer"
      :absolute="false"
      :fixed="false"
      stateless
      class="static-drawer mt-4 ml-2 top-10"
      style="position: sticky !important; height: fit-content !important;"
  >
    <v-list
        density="compact"
        class="pa-0"
        nav
        v-model:opened="openedGroups"
    >
      <div
          class="navigation-drawer__container text-decoration-none text-black border d-flex"
          v-for="(item, index) in navItems"
          :key="index"
      >
        <v-list-item
            v-if="!item.hasOwnProperty('subMenu')"
            :prepend-icon="item.icon"
            @click.stop="navigationInspector(item)"
        >
          <v-list-item-title v-text="item.title" />
        </v-list-item>
        <v-list-group
            v-else
            class="w-100"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                :title="item.title"
                :prepend-icon="item.icon"
                @click.stop="navigationInspector(item)"
            ></v-list-item>
          </template>
          <v-list-item
              v-for="(elem, i) in item.subMenu"
              :key="i"
              :title="elem.text"
              :value="elem.text"
              @click="navigationInspector(elem)"
          />
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.static-drawer {
  position: static !important;
  transform: none !important;
  top: 70px !important;
  left: auto !important;
  z-index: auto !important;
  box-shadow: none !important;

  // Используем :deep() для всех вложенных селекторов
  :deep(.v-list-item__spacer) {
    width: 8px;
    min-width: 8px;
    flex-grow: 0;
  }

  :deep(.v-list-item__prepend) {
    margin-right: 8px !important;
  }

  // Исправленные селекторы
  :deep(.v-navigation-drawer__content) {
    overflow: visible !important;
  }

  :deep(.v-navigation-drawer__border) {
    display: none !important;
  }

  // Селектор для spacer
  :deep(.v-list-item__spacer) {
    width: 20px;
  }
}
</style>
