import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VDateInput } from 'vuetify/labs/VDateInput';

const app = createApp(App);
const pinia = createPinia();

const vuetify = createVuetify({
    components: {
        ...components,
        VDateInput
    },
    directives,
});

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
