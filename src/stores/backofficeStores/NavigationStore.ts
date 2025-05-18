import {defineStore} from 'pinia';
import {Navigations} from "@/stores/types/backofficeType/NavigationsType";

export const useNavigationsStore = defineStore('Navigations', {
    state: (): Navigations => ({
        navItems: [
            {
                title: 'Все запросы',
                icon: 'mdi-file-document-edit',
                path: '/',
                subMenu: [
                    { text: 'Запросы', slug: 'requests', parentPath: '/' },
                    { text: 'Запросы для Фрилансеров', slug: 'freelance', parentPath: '/' },
                    { text: 'Запросы VIDEO', slug: 'video-requests', parentPath: '/' },
                    { text: 'Пред-запросы', slug: 'pre-requests', parentPath: '/' }
                ]
            },
            { title: 'Пользователи', icon: 'mdi-account', path: '/users' },
            { title: 'Отчеты', icon: 'mdi-application', path: '/reports' },
            { title: 'Пакеты', icon: 'mdi-application', path: '/packages' },
            { title: 'Офлайн запрос', icon: 'mdi-application', path: '/offline-request' },
            { title: 'Реестр партнеров', icon: 'mdi-star-outline', path: '/register-partners' },
            { title: 'Кабинет партнеров', icon: 'mdi-star-outline', path: '/contact' },
            { title: 'Акт выполненных работ', icon: 'mdi-star-outline', path: '/act' },
            { title: 'Настройки', icon: 'mdi-cog', path: '/settings' }
        ]
    }),
});
