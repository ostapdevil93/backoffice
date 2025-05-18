import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

// Определяем массив маршрутов с типом RouteRecordRaw
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'RequestsPage',
        component: () => import('@/pages/RequestsPage.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/users',
        name: 'UsersPage',
        component: () => import('@/pages/CustomersPage.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/reports',
        name: 'ReportsPage',
        component: () => import('@/pages/ReportsPage.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/packages',
        name: 'PackagesPage',
        component: () => import('@/pages/PackagesPage.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/offline-request',
        name: 'OfflineRequestPage',
        component: () => import('@/pages/OfflineRequestPage.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/register-partners',
        name: 'RegisterPartners',
        component: () => import('@/pages/RegisterPartners.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/act',
        name: 'ActPage',
        component: () => import('@/pages/ActPage.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/act',
        name: 'ActPage',
        component: () => import('@/pages/ActPage.vue'),
        meta: {requiresAuth: true},
    },{
        path: '/settings',
        name: 'SettingsPage',
        component: () => import('@/pages/SettingsPage.vue'),
        meta: {requiresAuth: true},
    },
];

// Создание роутера с использованием Vite-конфигурации
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, // routes: routes
});

export default router;
