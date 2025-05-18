
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Импорт стилей Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

export default vuetify;
