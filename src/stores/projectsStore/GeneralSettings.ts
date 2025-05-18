import {defineStore} from 'pinia';
import {GeneralSettings} from "@/stores/types/projectTypes/GeneralSettingsType";

export const useGeneralSettings = defineStore('generalSettings', {
    state: () =>
        <GeneralSettings>{
            drawer: false,
            loader: false,
            currentSlug: '',
            openChat: false,
            dialog: false,
            openClientDetails: false,
        },
    getters: {},
    actions: {
        formatDateString(dateString: string): string {
            if (!dateString) return 'Нет данных';

            // Преобразуем строку даты в объект Date
            const date = new Date(dateString);

            // Проверяем, является ли дата корректной
            if (isNaN(date.getTime())) return 'Неверный формат даты';

            // Форматируем дату
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${month}/${day}/${year} ${hours}:${minutes}`;
        }
    }
});


